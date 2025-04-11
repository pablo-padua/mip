var aIdsGerentes = [];
var loadingPlanilha = FLUIGC.loading(window, { textMessage: 'Aguarde, processando arquivo...' });

var reader = null;
$(document).ready(function(){
	reader = null;
   // $("#fileCSVTerc").on('change', handleFileSelectTerc);
});

// FUNÇÃO QUE VALIDA ARQUIVO
function handleFileSelectTerc(evt) {

    $("#itensImportadosExelTerc").val("sim");

    var files = evt.target.files;
    var file = files[0];
    var r =  /\.(CSV)$/;
    
    if(r.test(file.name.toUpperCase())){
        readfileTerc(file);
    }else{
        FLUIGC.toast({title: 'Por Favor:', message: 'Envie um arquivo no formato CSV (.csv)', type: 'warning'});
    }
}

// FAZ LEITURA CSV
function readfileTerc(file){
    var reader = new FileReader();
    reader.readAsText(file,'windows-1252');
    reader.onload = function(event){
        var csv = event.target.result;
        adicionaPrevsTerc(csv);
    };

}

//REALIZA TRATAMENTO DAS INFORMAÇÕES
async function adicionaPrevsTerc(arr){
	var jsonObj = [];
    var aLine = arr.split(/\r?\n|\r/);  
    var headers = aLine[0].split(";"); 
	var contTerc = 0;

	for(var i = 1; i < aLine.length; i++) {
		if(aLine[i] != ""){
			 var data = aLine[i].split(';');
			  var obj = {};
			  for(var j = 0; j < data.length; j++) {
			     obj[headers[j].trim()] = data[j].trim();
			  }
			  if(obj.CPF != '' && obj.NOME != ''){
				 
				  jsonObj.push(obj);
				  
			  }else{
				  $(".fileCSVTerc").hide();				  
				  contTerc ++;
					FLUIGC.message
					.alert(
							{
								message : "Existe campo obrigat&oacute;rio n&otilde;o preenchido no arquivo importado!!! linha: "+i+"",
								title : "Aten\u00e7\u00e3o",
								label : 'OK'
							}, function(el, ev) {
					});
		
			  }
			}
		}
	
	if(contTerc == 0){
		JSON.stringify(jsonObj);

	try {
		loadingPlanilha.show();
		for(var k = 0; k < jsonObj.length; k++) {
			await addPrevsTerc(jsonObj[k]);
		 }
	} catch (error) {
		loadingPlanilha.hide();
		console.log(error);
	} finally {
		loadingPlanilha.hide();
	}
    
	}
}

function addPrevsTerc1(obj){
	var CPF = obj.CPF;
	CPF = CPF.replace(/[^0-9]/g, '').toString();
	CPF = addZeroEsqueda(CPF, 11);
	var NOME = obj.NOME;

	if(validacaoCPF(CPF)) {
		var arrayCpfTerc = [];
		var arrayCpfFunc = [];

		// Pega todos os CPFs já inseridos na tabela de terceiros
		$("input[name^='hidden_CPF_TERC___']").each(function() {
			var index = this.id.substring(this.id.lastIndexOf("___") + 1);
			arrayCpfTerc.push($(this).val());
		});

		// Pega todos os CPFs já inseridos na tabela de funcionários
		$("input[name^='hidden_CPF___']").each(function() {
			var index = this.id.substring(this.id.lastIndexOf("___") + 1);
			arrayCpfFunc.push($(this).val());
		});

		// Verifica se já existe como funcionário
		if (arrayCpfFunc.includes(CPF)) {
			FLUIGC.message.alert({
				message : "CPF: "+CPF+" - Já adicionado como Funcionário. Não pode ser incluído como Terceiro.",
				title : "Atenção",
				label : 'OK'
			});
			return; // Interrompe a execução
		}

		// Verifica se já existe como terceiro
		if(validarExistenciaTerc(arrayCpfTerc, CPF)){
			var constraints = [];
			constraints.push(DatasetFactory.createConstraint("FILTRO", CPF, CPF, ConstraintType.MUST));
			var params = getDatasetParam('ds_RM_QUERY_SELECT_ValidarCpfBaseRmFuncEmAdmissao', null, constraints, null);

			$.ajax({
				url: '/api/public/ecm/dataset/datasets',
				data: JSON.stringify(params),
				dataType: 'json',
				type: "POST",
				contentType: 'application/json',
				async: false,
				success:function(result) {
					if (result.content.values.length > 0) {
						FLUIGC.message.alert({
							message : "CPF: "+CPF+" - Localizado Como Funcionário. deverá ser lançado na tabela de Funcionários",
							title : "Atenção",
							label : 'OK'
						});
					} else {
						arrayCpfTerc.push(CPF);
						let index = wdkAddChild('tablenameTerceiros');
						carregaNumeracaoTerceiro();

						$("#hidden_indexTerceiro___"+index).val(index);
						$("#cpfTerceiro___"+index).val(CPF);
						$("#hidden_CPF_TERC___"+index).val(CPF);
						$("#nomeEmpresaTerceiro___"+index).val(NOME);

						if(obj.LOCAL_ENTREGA != ''){
							$("#localEntregaTerc___"+index).val(obj.LOCAL_ENTREGA);
						}

						if(obj.CAFE_MANHA.toUpperCase() == 'X'){
							$("#checkboxCafeTerc___"+index).prop('checked', true);
							$("#hidden_checkboxCafeTerc___"+index).val('sim');
						}
						if(obj.ALMOCO.toUpperCase() == 'X'){
							$("#checkboxAlmocoTerc___"+index).prop('checked', true);
							$("#hidden_checkboxAlmocoTerc___"+index).val('sim');
						}
						if(obj.ALMOCO_PEQUENO.toUpperCase() == 'X'){
							$("#checkboxAlmocoTercPeq___"+index).prop('checked', true);
							$("#hidden_checkboxAlmocoTercPeq___"+index).val('sim');
						}
						if(obj.JANTAR.toUpperCase() == 'X'){
							$("#checkboxJantarTerc___"+index).prop('checked', true);
							$("#hidden_checkboxJantarTerc___"+index).val('sim');
						}
						if(obj.JANTAR_PEQUENO.toUpperCase() == 'X'){
							$("#checkboxJantarTercPeq___"+index).prop('checked', true);
							$("#hidden_checkboxJantarTercPeq___"+index).val('sim');
						}

						$("#vlrVoucherDescontoTerc___"+index).val('');
						$("#vlrVoucherAcrescimoTerc___"+index).val('');
					}
				},
				error: function(xhr, status, error){
					console.log(error);	
				}
			});
		} else {
			FLUIGC.message.alert({
				message : "CPF: "+CPF+" em duplicidade. Apenas o primeiro registro foi considerado.",
				title : "Atenção",
				label : 'Ciente'
			});
		}

		aplicarManscaraCampos();
		ativarChangeDescontosTerc();
		ativarChangeAcrescimosTerc();
		recalcularValoresTerceiro();
		$(".fileCSVTerc").hide();

	} else {
		FLUIGC.message.alert({
			message : "Favor corrigir o CPF informado: "+CPF,
			title : "Atenção",
			label : 'OK'
		});
	}
}

    
function addZeroEsqueda(number, size){
    var s = String(number);
    while (s.length < size) {
        s = "0" + s;
    }
    return s;
}

function getDatasetParam (name, fields, constraints, order) {
	return {
		"name" : name,
		"fields" : fields,
		"constraints" : constraints,
		"order" : order
	};
}
