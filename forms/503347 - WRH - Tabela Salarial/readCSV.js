var loadingCSV = FLUIGC.loading("#loadingCSV");
var arrayFuncoes = new Array;

$(document).ready(function(){
    $("#fileCSV").on('change', handleFileSelectFunc);
});

// FUNÇÃO QUE VALIDA ARQUIVO
function handleFileSelectFunc(evt) {

    var files = evt.target.files;
    var file = files[0];
    var r =  /\.(CSV)$/;
    
    if(r.test(file.name.toUpperCase())){
        readfileFunc(file);
    }else{
        FLUIGC.toast({title: 'Por Favor:', message: 'Envie um arquivo no formato CSV (.csv)', type: 'warning'});
    }
}

// FAZ LEITURA CSV
function readfileFunc(file){
	
    var reader = new FileReader();
    reader.readAsText(file,'windows-1252');
    reader.onload = function(event){
        var csv = event.target.result;
        tratarCSV(csv);
    };

}

//REALIZA TRATAMENTO DAS INFORMAÇÕES
function tratarCSV(arr){
	var jsonObj = [];
	
    var aLine = arr.split(/\r?\n|\r/);
    var headers = aLine[0].split(";"); 
	var cont = 0;
	for(var i = 1; i < aLine.length; i++) {
		if(aLine[i] != ""){
			 var data = aLine[i].split(';');
			  var obj = {};
			  for(var j = 0; j < data.length; j++) {
			     obj[headers[j].trim()] = data[j].trim();
			  }
			  if(obj.CODFUNCAO != ''){
				 
				  jsonObj.push(obj);
				  
			  }else{
				  cont ++;
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
	 
		if(cont == 0){
			
			loadingCSV.show();
			
			setTimeout(function() {

				JSON.stringify(jsonObj);
				
			    for(var k = 0; k < jsonObj.length; k++) {
			    	adicionaItem(jsonObj[k]);
			    }

			    loadingCSV.hide();			    

			}, 100);

		}

}

// PREENCHE CAMPO COM AS INFORMAÇÕES DO CSV
function adicionaItem(obj){
	
	var CODCOLIGADA = $("[name=codColigada]").val();
	var CODFUNCAO = addZeroEsqueda(obj.CODFUNCAO, 4);
	var CODSECAO = obj.CODSECAO;
	
 	if(validarDuplicidade(arrayFuncoes, CODFUNCAO) == false){
 		
 		FLUIGC.message.alert({
					message : "Função: " + obj.CODFUNCAO + " em duplicidade. Apenas o primeiro registro foi considerado.",
					title : "Aten\u00e7\u00e3o",
					label : 'Ciente'
				}, function(el, ev) {});
 		
 	}else{
 		
 		var funcao = getFuncao(CODCOLIGADA, CODFUNCAO);
 		if(funcao != false){

			arrayFuncoes.push(funcao.CODFUNCAO);
			let index = aberturaFuncaoNovaTabela();
			
			$("#codNivelFuncTabelaNova___"+index).val(funcao.CODFUNCAO);
			window["nivelFuncTabelaNova___"+index].setValue(funcao.NOME);
			
			setSalarioCSV("salarioFuncTabelaNova", index, obj)
 	        
			var secao = getSecao(CODCOLIGADA, CODSECAO);
 	       
 	       if(secao != false && secao.NROCENCUSTOCONT.substring(0, 11) == $("[name=codCCObraSetor]").val() ){
	 	       $("#codSecaoFuncTabelaNova___"+index).val(secao.CODSECAO);
	 	       window["secaoFuncTabelaNova___"+index].setValue(secao.NOME);
 	       }
 			
 		}

	}

	$(".fileCSV").hide();

}

function getDatasetParam (name, fields, constraints, order) {
	return {
		"name" : name,
		"fields" : fields,
		"constraints" : constraints,
		"order" : order
	};
}
    
function addZeroEsqueda(number, size){
    var s = String(number);
    while (s.length < size) {
        s = "0" + s;
    }
    return s;
}

function removeZeroEsquerda(valor){

	return valor.replace(/^0+/, '');
	
}

function validarDuplicidade(array, item) {

    if (array.toString().indexOf(item) === -1) {
        return true;
    } else if (array.indexOf(item) > -1) {
        return false;
    }
}

function getFuncao(CODCOLIGADA, CODFUNCAO){

 	var funcao = new Object();
	
	// Verifica função cadastrada no RM
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("CODCOLIGADA", CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("CODIGO", CODFUNCAO, CODFUNCAO, ConstraintType.MUST));

    var dataset = DatasetFactory.getDataset("ds_Corpore_VwMIP_FLUIG_PFUNCAO", null, constraints, null);
			
	if(dataset.values.length > 0 && dataset.values[0]["CODIGO"] == CODFUNCAO){
		
		funcao.CODFUNCAO = dataset.values[0]["CODIGO"];
		funcao.NOME = dataset.values[0]["FUNCAO"];
		
		return funcao;
	 	
	} else {
		FLUIGC.message.alert(
				{
					message : "Função: " + CODFUNCAO + " - Não foi localizada na base de dados do RM",
					title : "Aten\u00e7\u00e3o",
					label : 'OK'
				}, function(el, ev) {
		});
		
		return false;
	}
	
}

function getSecao(CODCOLIGADA, CODSECAO){
	
	var secao = new Object();
	
	// Verifica função cadastrada no RM
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("CODCOLIGADA", CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("CODIGO", CODSECAO, CODSECAO, ConstraintType.MUST));

    var dataset = DatasetFactory.getDataset("ds_Corpore_VwMIP_FLUIG_PSECAO", null, constraints, null);
			
	if(dataset.values.length > 0 && dataset.values[0]["CODIGO"] == CODSECAO){
		
		secao.CODSECAO = dataset.values[0]["CODIGO"];
		secao.NOME = dataset.values[0]["DESCRICAO"];
		secao.NROCENCUSTOCONT = dataset.values[0]["NROCENCUSTOCONT"];
		
		return secao;
	 	
	} else {

		return false;
	}	
	
	return secao;
}

function setSalarioCSV(campo, indice, linhaCSV){

	var arrayFaixaSalarial = JSON.parse($("#arrayFaixaSalarial").val());
	var arraySalario = [];

	for(var i=0; i < arrayFaixaSalarial.length; i++){

		var salario = 0;
		var codFaixa = arrayFaixaSalarial[i].CODFAIXA;

		if(linhaCSV[codFaixa] == undefined)
			salario = linhaCSV[removeZeroEsquerda(codFaixa)];
		else
			salario = linhaCSV[codFaixa];
		
		salario = formatNumber(getValor(salario), 2, 3, ".", ",");
		$("#" + campo + "_" + codFaixa + "___" + indice).val(salario);

	}
	
	setSalarioJSON(campo, indice);
	
}