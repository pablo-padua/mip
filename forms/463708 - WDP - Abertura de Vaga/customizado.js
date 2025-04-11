var underline = "___";
var tipoFuncao = 0;
var indiceRateio = "";

setTimeout(function() {
	init();
}, 1500);

function init() {
	var atividadeAtual = buscarAtividadeAtual();
	
	$('#myModal').hide();

	if (atividadeAtual == INICIO_0 && FORM_MODE == "ADD"){
		$(".aprovacao").hide();
		var matrSolicitante = $("[name=matrSolicitante]").val();	
		preencheChapa(matrSolicitante, "chapaSolicitante");
		adicionarVaga();
	} 
	else if(atividadeAtual == 53 && FORM_MODE == "MOD"){
		$(".aprovacao").show();
	} 
	else if(atividadeAtual == 26 && FORM_MODE == "MOD"){
		removerLixeira();
		carregaTipoSelecaoCandidato();
		/*$("[name=aprovacao]").val("");
		$("[name=hiddenAprovacao]").val("");
		$("[name=justificativa]").val("");*/
		var matrAprovador = $("[name=matrAprovador]").val();	
		preencheChapa(matrAprovador, "chapaAprovador");
		$(".aprovacao").show();
		//excluiTabela('tbVaga', 'numEfetivo');
		alertaIndicadoAptoRestricao();
	} 
	else if (FORM_MODE == "VIEW"){
		removerLixeira();
		$(".aprovacao").hide();
		carregaTipoSelecaoCandidato();
		//excluiTabela('tbVaga', 'numEfetivo');
	}
	else{
		removerLixeira();
		$(".aprovacao").hide();
		carregaTipoSelecaoCandidato();
		//excluiTabela('tbVaga', 'numEfetivo');
	}
	
	getQtdIndicacao();
	
}

function buscaCCSolicitante(codCentroCusto){
	var chapa = $("[name=chapaSolicitante]").val();
	var coligada = $("[name=codColigada]").val();
	var c1 = DatasetFactory.createConstraint("CHAPA", chapa, chapa, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_centroCustoSolicitante", null, constraints, null);
	var cont = 0;
	for(var i=0; i < dataset.values.length; i++) {
		ccusto = dataset.values[i].CODCCUSTO;
		if (ccusto == codCentroCusto){
			//$("[name=ccustoSolicitante]").val(ccusto);
			cont ++;			
		}
	}
	if (cont == 0){
		window["obraSetor"].clear();
		FLUIGC.toast({
			title : '',
			message : 'Voc\u00ea n\u00e3o tem permiss\u00e3o nesta Obra/Setor.',
			type : 'danger'
		});
		
		return false;
	}
	
	return true;
}

function papelRHUsuarioLogado(){
	var retorno = false;
	var IdUser = buscarMatriculaUsuarioLogado();
	var c1 = DatasetFactory.createConstraint("USUARIO", IdUser, IdUser, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("PAPEL", "28", "28", ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var datasetRM = DatasetFactory.getDataset("ds_FLUIG_retorna_papeisUsuarios", null, constraints, null);
	try{
		for(var i=0; i < datasetRM.values.length; i++) {
			retorno = true;
			$("[name=solicitanteRH]").val(true);
		}
		return retorno;
	}
	catch(e){
		retorno = false;
		$("[name=solicitanteRH]").val(false);
		return retorno;
	}
}

function papelDirOpUsuarioLogado(){
	var retorno = false;
	var IdUser = buscarMatriculaUsuarioLogado();
	var c1 = DatasetFactory.createConstraint("USUARIO", IdUser, IdUser, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("PAPEL", "44", "44", ConstraintType.MUST); // papel exclusivo para Dir. Op.
	var constraints = new Array(c1, c2);
	var datasetRM = DatasetFactory.getDataset("ds_FLUIG_retorna_papeisUsuarios", null, constraints, null);
	try{
		for(var i=0; i < datasetRM.values.length; i++) {
			retorno = true;
			$("[name=solicitanteDirOp]").val(true);
		}
		return retorno;
	}
	catch(e){
		retorno = false;
		$("[name=solicitanteDirOp]").val(false);
		return retorno;
	}
}

function preencheChapa(matricula, campo){
	var c1 = DatasetFactory.createConstraint("USER_CODE", matricula, matricula, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_chapa", null, constraints, null);
	
	for(var i=0; i < dataset.values.length; i++) {
		
		if(campo == "chapaSolicitante"){
			$("[name=cargoSolicitante]").val(dataset.values[i].CARGO);
			$("[name=codUsuario]").val(dataset.values[i].CODUSUARIO);
			$("[name=codColigadaSolic]").val(dataset.values[i].CODCOLIGADA);
		}else if(campo == "chapaAprovador"){
			$("[name=codUsuario]").val(dataset.values[i].CODUSUARIO);
			$("[name=codColigadaAprovador]").val(dataset.values[i].CODCOLIGADA);			
		}

		chapa = dataset.values[i].CHAPA;
		$("[name="+campo+"]").val(chapa);
	}
}

function changeFuncao(indice, funcaoTipoMO){
	//var indice = rowIndex['tbVaga'];
	var coligada = $('[name=codColigada]').val();
	var codFuncao = $('#codFuncao' + underline + indice).val();
	var funcao = $('#funcao' + underline + indice).val();	
	var codSecao = $('#codSecao' + underline + indice).val();
	var secao = $('#secao' + underline + indice).val();
	var custoTipoMO = $('#codCentroCusto' + underline + indice).val().substring(9, 11);
	
	if (codFuncao != "" && coligada != "" && codSecao != ""){
		
		var valLotacao = validacaoLotacao(codSecao, coligada, codFuncao);
		var valTabSal = validacaoTabelaSalarial(codSecao, coligada, codFuncao);
		
		var valTipoMO = "";
		
		if(codFuncao != "A002") /* Não valida AJUDANTE */
			valTipoMO = validacaoTipoMO(custoTipoMO, funcaoTipoMO);			
		else
			valTipoMO = "";
					
		if(valLotacao == false || valTabSal == false || valTipoMO != ""){
			
			var msgFuncao = "<div style='text-align: left;'";
 
			msgFuncao += "<br><b>Fun\u00e7\u00e3o: </b>" + codFuncao + " - " + funcao;
			msgFuncao += "<br><b>Se\u00e7\u00e3o: </b>" + codSecao + " - " + secao;		
		
			if(valLotacao == false)
				msgFuncao += "<br><br>Verificar a vincula\u00e7\u00e3o de Lota\u00e7\u00e3o para a fun\u00e7\u00e3o e se\u00e7\u00e3o.";
		
			if(valTabSal == false){
				
				msgFuncao += "<br><br>A lota\u00e7\u00e3o proposta n\u00e3o foi encontrada na Tabela Salarial. Verifique se a fun\u00e7\u00e3o desejada \u00e9 permitida nesta se\u00e7\u00e3o.";
				msgFuncao += "<br><br>Caso seja necess\u00e1rio solicite a inclus\u00e3o da lota\u00e7\u00e3o atrav\u00e9s do Processo WRH09 - Tabela Salarial.";
				
			}			
				
			if(valTipoMO != "")
				msgFuncao += "<br><br>" + valTipoMO;

			msgFuncao += "</div>";
			
			FLUIGC.toast({
				title : '',
				message : msgFuncao,
				type : 'danger'
			});			
		}
		
	} else {
		$('#codFuncao' + underline + indice).val("");
		window["funcao" + underline + indice].clear();
	}
}

function validacaoLotacao(secao, coligada, funcao){
	var c1 = DatasetFactory.createConstraint("CODSECAO", secao, secao, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODFUNCAO", funcao, funcao, ConstraintType.MUST);	
	var constraints = new Array(c1, c2, c3);
	var dataset = DatasetFactory.getDataset("ds_RM_WS073_retornaExistenciaDeLotacao", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {	
		CODCOLIGADA = dataset.values[i].CODCOLIGADA;
		
		if (CODCOLIGADA == "" || CODCOLIGADA == null || CODCOLIGADA == undefined){
			$('#codFuncao' + underline + indice).val("");
			window["funcao" + underline + indice].clear();	

			return false;

		}
	}

	return true;
}

function validacaoTabelaSalarial(secao, coligada, funcao){
	var c1 = DatasetFactory.createConstraint("CODSECAO", secao, secao, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODFUNCAO", funcao, funcao, ConstraintType.MUST);	
	var constraints = new Array(c1, c2, c3);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_salario", null, constraints, null);

	if(dataset == null || dataset == undefined){
		return false;
	} else {
		
		var salario = dataset.values[0].SALARIO;
		
		if (salario == "" || salario == null || salario == undefined){
			$('#codFuncao' + underline + indice).val("");
			window["funcao" + underline + indice].clear();	

			return false;

		}
	}
	
	return true;
}

function adicionarVaga(){
	var index = wdkAddChild("tbVaga");
	reloadZoomFilterValues("centroCusto___"+index, "CODCOLIGADA," + $("[name=codColigada]").val()+ ',CODCCUSTO,' + $("[name=codCCSetor]").val());
	ativarChangedivulgacaoVaga();
}

function fnCustomDelete(oElement, nameTable, classFieldSet) {
	var qtdDeLinhasTableName = $("#tbVaga tbody tr").length;
	if (qtdDeLinhasTableName > 2) {
		fnWdkRemoveChild(oElement);	
		novoAprovador();
	} else {
		FLUIGC.toast({
			title : '',
			message : 'Deve ser inserido no mínimo 1 vaga.',
			type : 'danger'
		});
	}
}

function removerLixeira(){
	$("#tbVaga tbody tr:gt(0)").each(function() {
		//console.log("Remover lixeira");
		var img = $(this).find(".lixeiraCustomizada");
		img.remove();
	});
	$('[name=botaoAdd]').hide();
}

function formatacaoMonetaria(val){
	var valor = val.split(".");
	real = valor[0];
	cent = valor[1].substring(0,2);	
	return real+","+cent;
	
}

function formatar(src, mask){
	var i = src.value.length;
	var saida = mask.substring(0,1);
	var texto = mask.substring(i);
	if(texto.substring(0,1) != saida){
		src.value += texto.substring(0,1);
	}
}

function formatarTelefone(campo){
	$(campo).mask("(00) 0000-00009");
}

function aplicarManscaraCampos(){
	$('.telefone').mask("(00) 0000-00009");

}

function aberturaRateio() { 
	indice = wdkAddChild('tbIndicacao');
	copiarEColarnoCampoCPFCNPJ(indice);
	$("[name=contemRateio]").val(true);	
	aplicarManscaraCampos();
}

function fecharModal(campo) {
	limparPaiFilhoModal(campo);
	$("[name=contemRateio]").val(false); 
}

function limparPaiFilhoModal(campo) {
	var contadorPaiFilhoModal = 0;
	$("[name^=cpf___]").each(function() {
		var idValor = $(this).attr("id");
		var index = idValor.split(underline)[1];
		var cpf = $("[name=cpf" + underline + index + "]").val();
		var nome = $("[name=nome" + underline + index + "]").val();
		var telefone = $("[name=telefone" + underline + index + "]").val();
		if (nome == "" || telefone == "" || cpf == "") {
			$("#camposModal" + underline + index).val("");
			$("#btDeleteIndicacao" + underline + index).trigger("click");
			preencherHidden(campo);
			contadorPaiFilhoModal--;
		}
		contadorPaiFilhoModal++;
	});
	if (contadorPaiFilhoModal < 1) {
		$("[name=contemRateio]").val(false); 
		$('#myModal').hide();
	} 
}

function fnCustomDeleteIndicacao(oElement, nameTable, classFieldSet) {
	fnWdkRemoveChild(oElement);		
}

function preencherHidden(campo) {
	var valores = new Array();
	$("#tbIndicacao tr :input").each(function() {
		if (this.id.indexOf("___") > -1) {
			var indice = this.id.split("___")[1];
			var id = this.id.split("___")[0];

			if (id == "cpf") {
				valores.push("indice" + indice);
				valores.push(this.value);
			}
			if (id == "nome") {
				valores.push(this.value);
			}
			if (id == "email") {
				valores.push(this.value);
			}
			if (id == "telefone") {
				valores.push(this.value);
			}
			if (id == "telefone2") {
				valores.push(this.value);
			}	
			//if (id == "pis") {
			//	valores.push(this.value);
			//}
			if (id == "ultFuncao") {
				valores.push(this.value);
			}
			if (id == "ultSecao") {
				valores.push(this.value);
			}	
		}
	});
	
	var valorModal = JSON.stringify(valores);
	$("#camposModal___" + indiceRateio).val(valorModal);
	$("#numNetos___" + indiceRateio).val(valores.length);
	
	var valorOkSaldo1 = 0;
	var valorOkSaldo2 = 0;
	var valorOkSaldo3 = 0;
	var indice = 0;
	var variavel = "";
	var arrayValidacao = new Array();
	
	$("[name^=cpf___]").each(function() {
		var idValor = $(this).attr("id");
		var index = idValor.split(underline)[1];
		//var valorCPF = $("[name=cpf" + underline + index + "]").val();
		var valorNome = $("[name=nome" + underline + index + "]").val();
		var valorTelefone = $("[name=telefone" + underline + index + "]").val();
		indice++;
		/*if (valorCPF == "") {
			FLUIGC.toast({
				title : '',
				message : 'O Campo "CPF" da linha ' + indice + ' est\u00e1 vazio.',
				type : 'danger'
			});
			valorOkSaldo1 = 0;
			arrayValidacao.push(valorOkSaldo1);
		} else {
			valorOkSaldo1 = 1;
			arrayValidacao.push(valorOkSaldo1);
		}*/
		if (valorNome == "") {
			FLUIGC.toast({
				title : '',
				message : 'O Campo "Nome" da linha ' + indice + ' est\u00e1 vazio.',
				type : 'danger'
			});
			valorOkSaldo2 = 0;
			arrayValidacao.push(valorOkSaldo2);
		} else {
			valorOkSaldo2 = 1;
			arrayValidacao.push(valorOkSaldo2);
		}
		if (valorTelefone == "") {
			FLUIGC.toast({
				title : '',
				message : 'O Campo "Telefone" da linha ' + indice + ' est\u00e1 vazio.',
				type : 'danger'
			});
			valorOkSaldo3 = 0;
			arrayValidacao.push(valorOkSaldo3);
		} else {
			valorOkSaldo3 = 1;
			arrayValidacao.push(valorOkSaldo3);
		}
		
	});

	for (var i = 0; i < arrayValidacao.length; i++) {
		if (arrayValidacao[i] == 0) {
			variavel = "erro";
		}
	}
	if (variavel != "erro") {
		$('#myModal').hide();
	}
	
	getQtdIndicacao();
}

function verIndicacao(obj){	
	var atividadeAtual = buscarAtividadeAtual();
	if (atividadeAtual == 0 || atividadeAtual == 20 || atividadeAtual == 53) { 
		if(FORM_MODE == "VIEW"){
			$("[name^=botaoAddRateioNeto]").hide();
			$("[name^=btDeleteIndicacao]").hide();
		}
	} else {		
		$("[name^=botaoAddRateioNeto]").hide();
		$("[name^=btDeleteIndicacao]").hide();
	}
	
	var elemento = $(obj).siblings()[0].id;
	var campo = elemento.split("___");
	var indice = campo[1];
	
	indiceRateio = indice;
	var tabela = "tbIndicacao";
	
	//console.log("indice : " + indice);
	
	limparPaiFilho(tabela);
	$('#myModal').show();
	//console.log("netos indice = " + indice);
	//console.log("netos camposModal___ = " + $("#camposModal___" + indice).val());

	try {
		var netos = JSON.parse($("#camposModal___" + indice).val());
	}
	catch(e){
		var netos = 0;
	}
	
	$("#numNetos___" + indice).val(netos.length);
	
	//console.log(netos);

	var contador = 0;
	for (var x = 0; x < netos.length; x++) {
		//console.log("entrou For");
		var index;
		if (contador == 8) {
			//console.log("contador 5");
			contador = 0;
		}
		if (contador == 0) {
			//console.log("contador 0");
			index = wdkAddChild("tbIndicacao");

			//console.log("index === " + index);
			
			indice = netos[x];

			//console.log("indice == " + indice);
			//console.log("Saiu contador 0");
		}
		if (contador == 1) {
			//console.log("entrou contador 1" + netos[x]);
			$("#cpf___" + index).val(netos[x]);
			//console.log("Saiu contador 1");
		}
		if (contador == 2) {
			//console.log("entrou contador 2" + netos[x]);
			$("#nome___" + index).val(netos[x]);
			//console.log("Saiu contador 2");
		}
			
		if (contador == 3) {
			//console.log("entrou contador 3" + netos[x]);
			$("#email___" + index).val(netos[x]);
			//console.log("Saiu contador 3");
		}
		
		if (contador == 4) {
			//console.log("entrou contador " + netos[x]);
			$("#telefone___" + index).val(netos[x]);
			//console.log("Saiu contador ");
		}
		
		if (contador == 5) {
			//console.log("entrou contador 5" + netos[x]);
			$("#telefone2___" + index).val(netos[x]);
			//console.log("Saiu contador 5");
		}
		
		//if (contador == 6) {
			//console.log("entrou contador 5" + netos[x]);
			//$("#pis___" + index).val(netos[x]);
			//console.log("Saiu contador 5");
		//}
		
		if (contador == 6) {
			//console.log("entrou contador 6" + netos[x]);
			$("#ultFuncao___" + index).val(netos[x]);
			//console.log("Saiu contador 4");
		}
		
		if (contador == 7) {
			//console.log("entrou contador 7" + netos[x]);
			$("#ultSecao___" + index).val(netos[x]);
			//console.log("Saiu contador 7");
		}
		
		
		contador++;
	}
	//console.log("antes mask init");
	MaskEvent.init(); // Atualiza os campos com 'mask'
	//console.log("antes aprovFinanc");
	if (atividadeAtual == 26 || atividadeAtual == 69)  {
		enableContainer($("#tbIndicacao"), false);
		$(".addRateioNeto").hide();
		$(".btDeleteRateioNeto").hide();
		$(".colunaLixeira").hide();
	}	
}

function limparPaiFilho(tabela) {
	var inputs_itens = $("#" + tabela + " :input");
	for (var i = 0; i < inputs_itens.length; i++) {
		if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("cpf___") != -1) {
			fnWdkRemoveChild(inputs_itens[i]);
		}
	}
}

function validarCpfCnpj() {
	var obj_A2_CGC = $("[name=cpf]");
	var valorCGC = obj_A2_CGC.val();

	// Retirar enter quando colado do excel
	var find = new RegExp('\r?\n', 'g');
	valorCGC = valorCGC.replace(find, '');

	var descTipoDocumento = '';

	// CPF
	if (valorTipo == valorPessoaFisica) {
		descTipoDocumento = 'CPF';
		
	if (obj_A2_CGC.validarCPF()) {
		//setA2_CGC(valorCGC);
		return true;
	} else {
		alert("Digite um " + descTipoDocumento + " vÃ¡lido");
		$("[name=cpf]").val("");
		return false;
	}
		
	}	
}

function consultaCPF(cpf){
	var index = getIndice(cpf);
	
	var valCPF = $(cpf);
	
	if(valCPF.validarCPF() == true){
		
		try{
		    var num = $(cpf).val();
		    var v1 = num.split(".");
		    var v2 = v1[2];
		    var v3 = v2.split("-");
			cpf = v1[0] + v1[1] + v3[0] + v3[1];
			var c1 = DatasetFactory.createConstraint("CPF", cpf, cpf, ConstraintType.MUST);
			var constraints = new Array(c1);
			var dataset = DatasetFactory.getDataset("ds_RM_retorna_candidatoIndicado", null, constraints, null);
			
			var permiteReadmissao = excecaoReadmissao(cpf);
			
			for(var i=0; i < dataset.values.length; i++) {
				$("#nome___" + index).val(dataset.values[i].NOME);
				$("#email___" + index).val(dataset.values[i].EMAIL);
				$("#telefone___" + index).val(dataset.values[i].TELEFONE);
				$("#telefone2___" + index).val(dataset.values[i].TELEFONE2);
				$("#ultFuncao___" + index).val(dataset.values[i].FUNCAO);
				$("#ultSecao___" + index).val(dataset.values[i].SECAO);
				if(dataset.values[i].CLASSIFICACAO == 'Inapto'){
					$("#btDeleteIndicacao___" + index).trigger( "click" );
					FLUIGC.toast({
						title : '',
						message : "Entre em contato com RH.",
						type : 'danger'
					});
				} else if(permiteReadmissao == false && dataset.values[i].DATADEMISSAO == "" && dataset.values[i].CPF != "" && dataset.values[i].CPF != undefined && dataset.values[i].CARGO.toUpperCase() == "ENGENHEIRO"){
					$("#btDeleteIndicacao___" + index).trigger( "click" );
					FLUIGC.toast({
						title : '',
						message : "Candidato já é funcionário: " + dataset.values[i].CHAPA + " - " + dataset.values[i].NOME + ".<br><br>Não é permitido a readmissão de ENGENHEIROS no período de 6 meses após o desligamento.",
						type : 'danger'
					});
				} else if(permiteReadmissao == false && dataset.values[i].DATADEMISSAO != "" && dataset.values[i].TEMPO_READMISSAO < 180 && dataset.values[i].CARGO.toUpperCase() == "ENGENHEIRO"){
					$("#btDeleteIndicacao___" + index).trigger( "click" );
					FLUIGC.toast({
						title : '',
						message : dataset.values[i].NOME + " foi desligado dia " + dataset.values[i].DATADEMISSAO + ".<br><br>Não é permitido a readmissão de ENGENHEIROS no período de 6 meses após o desligamento.",
						type : 'danger'
					});
				}else if(dataset.values[i].CLASSIFICACAO == 'Apto com restrições'){
					
					var c = $("[name=cargoSolicitante]").val();
					if(c == 'Engenheiro' || c == 'Coordenador' || c == 'Gerente' || c == 'Diretor' || c == 'Supervisor Administrativo' || c == 'Superintendente') {
					
						FLUIGC.toast({
							title : '',
							message : "Apto com restrições - Verifique a Avaliação da Pessoa",
							type : 'danger'
						});
					
					}
				}
			}
		}
		catch(e){
			$("#nome___" + index).val("");
			$("#email___" + index).val("");
			$("#telefone___" + index).val("");
			$("#telefone2___" + index).val("");
			$("#ultFuncao___" + index).val("");
			$("#ultSecao___" + index).val("");
		}
	} else if ($(cpf).val() != "") {
		
		$("#cpf___" + index).val("");
		$("#nome___" + index).val("");
		$("#email___" + index).val("");
		$("#telefone___" + index).val("");
		$("#telefone2___" + index).val("");
		$("#ultFuncao___" + index).val("");
		$("#ultSecao___" + index).val("");
		
		FLUIGC.toast({
			title : '',
			message : "CPF inválido",
			type : 'danger'
		});
		
	}
}

function copiarEColarnoCampoCPFCNPJ(index) {
	$("#cpf___" + index).keydown(function(event) {
		if (event.ctrlKey == true && (event.which == '118' || event.which == '86')) {
			alert('N\u00e3o \u00e9 possivel colar o CPF, por favor digite o CPF');
			event.preventDefault();
		}
	});
}

function regraSolicitante(funcCargo, funcGestao, indice){
	var cargoSolicitante = $("[name=cargoSolicitante]").val();
	var solicitanteRH = $("[name=solicitanteRH]").val();
	var solicitanteDirOp = $("[name=solicitanteDirOp]").val();
	
	if ($("[name=tipoVaga]").val() == "sede"){
		if (cargoSolicitante != "Diretor" && solicitanteRH == "false"){
			if ( (funcCargo == "Gerente" || funcCargo == "Superintendente") && solicitanteRH == "false" && cargoSolicitante != "Diretor"){
				$('#funcao' + underline + indice).val("");
				$('#codFuncao' + underline + indice).val("");
				$('#funcGestao' + underline + indice).val("");
				$('#cargo' + underline + indice).val("");
				FLUIGC.toast({
					title : '',
					message : "Voc\u00ea n\u00e3o tem permiss\u00e3o para solicitar abertura de vaga para esta fun\u00e7\u00e3o.",
					type : 'danger'
				});
				return false;
			} else if ((funcCargo == "Diretor" || funcCargo == "Conselho") && solicitanteRH == "false"){
				$('#funcao' + underline + indice).val("");
				$('#codFuncao' + underline + indice).val("");
				$('#funcGestao' + underline + indice).val("");
				$('#cargo' + underline + indice).val("");
				FLUIGC.toast({
					title : '',
					message : "Voc\u00ea n\u00e3o tem permiss\u00e3o para solicitar abertura de vaga para esta fun\u00e7\u00e3o.",
					type : 'danger'
				});
				return false;
			} else if ((funcCargo != "Diretor" && funcCargo != "Conselho" && funcCargo != "Gerente" && cargoSolicitante != "Gerente" && cargoSolicitante != "Superintendente" && solicitanteRH == "false")){
				$('#funcao' + underline + indice).val("");
				$('#codFuncao' + underline + indice).val("");
				$('#funcGestao' + underline + indice).val("");
				$('#cargo' + underline + indice).val("");
				FLUIGC.toast({
					title : '',
					message : "Voc\u00ea n\u00e3o tem permiss\u00e3o para solicitar abertura de vaga para esta fun\u00e7\u00e3o.",
					type : 'danger'
				});
				return false;
			} 
		}
	} else if ($("[name=tipoVaga]").val() == "obra"){
		
		
		if(solicitanteDirOp == "false" && cargoSolicitante != "Gerente" && cargoSolicitante != "Diretor"){
			if (funcGestao == "1" && solicitanteDirOp == "false" && cargoSolicitante != "Gerente" && cargoSolicitante != "Diretor" && solicitanteRH == "false"){
				$('#funcao' + underline + indice).val("");
				$('#codFuncao' + underline + indice).val("");
				$('#funcGestao' + underline + indice).val("");
				$('#cargo' + underline + indice).val("");
				FLUIGC.toast({
					title : '',
					message : "Voc\u00ea n\u00e3o tem permiss\u00e3o para solicitar abertura de vaga para esta fun\u00e7\u00e3o.",
					type : 'danger'
				});
				return false;
			} else if (funcGestao != "1" && cargoSolicitante != "Coordenador" && cargoSolicitante != "Engenheiro" && cargoSolicitante != "Supervisor Administrativo" && solicitanteRH == "false"){
				$('#funcao' + underline + indice).val("");
				$('#codFuncao' + underline + indice).val("");
				$('#funcGestao' + underline + indice).val("");
				$('#cargo' + underline + indice).val("");
				FLUIGC.toast({
					title : '',
					message : "Voc\u00ea n\u00e3o tem permiss\u00e3o para solicitar abertura de vaga para esta fun\u00e7\u00e3o.",
					type : 'danger'
				});
				return false;
			} 
		}

		
	}
	
	return true;
}

function novoAprovador(){
	var aprovador = 0;
	if ($("[name=tipoVaga]").val() == "sede"){		
		var arrayLinhas = $("input[id^='cargo___']");
		for (var i = 0; i < arrayLinhas.length; i++) {
			var nomeCampo = arrayLinhas[i].id;
			var valorCampo = $("#" + nomeCampo).val();
			if (valorCampo == "Gerente" || valorCampo == "Superintendente" || valorCampo == "Diretor" || valorCampo == "Conselho"){
				aprovador += 1; // presidente
			} else {
				aprovador += 0; // outros
			}
		}
		if(aprovador > 0){
			var presid = $("[name=codAprovadorPresid]").val();
			$("[name=aprovadorSolic]").val(presid);
			//console.log("Func aprovador: " + presid);
			solicitanteAprovador(presid);
		} else {
			var diretor = $("[name=codAprovadorVaga]").val();
			$("[name=aprovadorSolic]").val(diretor);
			//console.log("Func aprovador: " + diretor);
			var aprovadorSolicitante = $("[name=aprovadorSolic]").val();
			aprovadorSolicitante = aprovadorSolicitante.split(":");
			aprovadorSolicitante = aprovadorSolicitante[2];
			solicitanteAprovador(aprovadorSolicitante);
		}
		
	} else if ($("[name=tipoVaga]").val() == "obra"){
		var vaga = $("[name=codAprovadorVaga]").val();
		var diretor = $("[name=codAprovadorDiretor]").val();
		var arrayLinhas = $("input[id^='funcGestao___']");
		for (var i = 0; i < arrayLinhas.length; i++) {
			var nomeCampo = arrayLinhas[i].id;
			var valorCampo = $("#" + nomeCampo).val();
			//console.log("funcGestao: " + valorCampo);
			if (valorCampo == "1"){
				aprovador += 1; // presidente
			} else {
				aprovador += 0; // outros
			}
		}
		if(aprovador > 0){
			$("[name=aprovadorSolic]").val(diretor);
			//console.log("Func aprovador: " + diretor);
		} else {
			$("[name=aprovadorSolic]").val(vaga);
			//console.log("Func aprovador: " + vaga);
		}
		var aprovadorSolicitante = $("[name=aprovadorSolic]").val();
		aprovadorSolicitante = aprovadorSolicitante.split(":");
		aprovadorSolicitante = aprovadorSolicitante[2];
		solicitanteAprovador(aprovadorSolicitante);
	}
		
}


function aprovadores(indice, funcCargo, funcGestao){
	if ($("[name=tipoVaga]").val() == "sede"){		
		if (funcCargo == "Gerente" || funcCargo == "Superintendente" || funcCargo == "Diretor" || funcCargo == "Conselho"){
			var presid = $("[name=codAprovadorPresid]").val();
			$("[name=aprovadorSolic]").val(presid);
			//console.log("Func aprovador: " + presid);
		} else {
			var diretor = $("[name=codAprovadorVaga]").val();
			$("[name=aprovadorSolic]").val(diretor);
			//console.log("Func aprovador: " + diretor);
		}
		
	} else if ($("[name=tipoVaga]").val() == "obra"){
		var vaga = $("[name=codAprovadorVaga]").val();
		var diretor = $("[name=codAprovadorDiretor]").val();
		//var presid = $("[name=codAprovadorPresid]").val();
		//console.log("funcGestao: " + funcGestao);
		if (funcGestao == "1"){			
			//if (diretor != ""){
				$("[name=aprovadorSolic]").val(diretor);
				//console.log("Func aprovador: " + diretor);
			/*} 
			else {
				$("[name=aprovadorSolic]").val(presid);
			}*/			
		} else {
			$("[name=aprovadorSolic]").val(vaga);
			//console.log("Func aprovador: " + vaga);
		}
	}
	
	var aprovadorSolicitante = $("[name=aprovadorSolic]").val();
	aprovadorSolicitante = aprovadorSolicitante.split(":");
	aprovadorSolicitante = aprovadorSolicitante[2];
	solicitanteAprovador(aprovadorSolicitante);
}

function solicitanteAprovador(aprovadorSolicitante){
	if ($("[name=matrSolicitante]").val() == $("[name=codAprovadorPresid]").val()){
		solicitant = $("[name=matrSolicitante]").val();
		$("[name=aprovadorSolic]").val(solicitant);
		chapaSolicitante = $("[name=chapaSolicitante]").val();
		codColigadaSolic = $("[name=codColigadaSolic]").val();
		$("[name=chapaAprovador]").val(chapaSolicitante);
		$("[name=codColigadaAprovador]").val(codColigadaSolic);
	} else {
		var IdUser = buscarMatriculaUsuarioLogado();
		var c1 = DatasetFactory.createConstraint("USUARIO", IdUser, IdUser, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("PAPEL", aprovadorSolicitante, aprovadorSolicitante, ConstraintType.MUST);
		var constraints = new Array(c1, c2);
		var datasetRM = DatasetFactory.getDataset("ds_FLUIG_retorna_papeisUsuarios", null, constraints, null);	
		if (datasetRM.values != undefined && datasetRM.values != null){	
			for(var i=0; i < datasetRM.values.length; i++) {
				solicitant = $("[name=matrSolicitante]").val();
				$("[name=aprovadorSolic]").val(solicitant);
				chapaSolicitante = $("[name=chapaSolicitante]").val();
				codColigadaSolic = $("[name=codColigadaSolic]").val();
				$("[name=chapaAprovador]").val(chapaSolicitante);
				$("[name=codColigadaAprovador]").val(codColigadaSolic);
			}
		}
	}	
}

/* Exibe Avaliação de Comportamento */
function fnAvaliacao(oElement) {
	
	var matricula = buscarMatriculaUsuarioLogado();
	var cargo = retornaCargo(matricula);
	
	if(cargo == 'Engenheiro' || cargo == 'Coordenador' || cargo == 'Gerente' || cargo == 'Superintendente' || cargo == 'Diretor' || cargo == 'Supervisor Administrativo') {
		
		var idIndicacao = getIndice(oElement);
		
		var cpf = $("#cpf___" + idIndicacao).val();
		
		if(cpf == "") {
		
			FLUIGC.message.alert({
			    message: 'Preencha o CPF antes de consultar a Avaliação.',
			    title: 'Avaliação',
			    label: 'Fechar'
			}, function(el, ev) {
			    //Callback action executed by the user...	     
			    //el: Element (button) clicked...
			    //ev: Event triggered...	     
			    //this.someFunc();
			});
		
		}else{
			
			try{	  
			    var num = cpf;
			    var v1 = num.split(".");
			    var v2 = v1[2];
			    var v3 = v2.split("-");
				cpf = v1[0] + v1[1] + v3[0] + v3[1];
				var c1 = DatasetFactory.createConstraint("CPF", cpf, cpf, ConstraintType.MUST);
				var constraints = new Array(c1);
				var dataset = DatasetFactory.getDataset("ds_RM_retorna_candidatoIndicado", null, constraints, null);
				var i = 0
						
				if(dataset.values[i].CPF == "") {

					mensagem('Esta pessoa não possui nenhuma Avaliação de Comportamento.', 'Avaliação', 'Fechar');
					
				} else if(dataset.values[i].CLASSIFICACAO != 'Inapto'){
						
					FLUIGC.modal({
					    title: 'Avaliação: ' + dataset.values[i].NOME,
					    content: dataset.values[i].AVALIACAO.replace(/#13/g, "<br>"),
					    id: 'modalAvaliacao',
					    size: 'large',
					    actions: [{
					        'label': 'Fechar',
					        'autoClose': true
					    }]
					}, function(err, data) {
					    if(err) {
					        // do error handling
					    } else {
					        // do something with data
					    }
					});
				}
			}
			catch(e){
	
				mensagem('Não foi possível consultar a Avaliação. Entre em contato com o TI.', 'Avaliação', 'Fechar');
				
			}
		}
	}else {
		
		mensagem('A Avaliação é restrita a Engenheiros, Coordenadores, Gerentes, Superintendentes e Diretores', 'Avaliação', 'Fechar');
		
	}
}

function retornaCargo(matricula){
	
	var c1 = DatasetFactory.createConstraint("USER_CODE", matricula, matricula, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_chapa", null, constraints, null);
	
	return dataset.values[0].CARGO;	
	
}

function alertaIndicadoAptoRestricao() {
	
	var IndicadosRestricao = "";
	var contRestricao = 0;
	
	$("[name^=camposModal___]").each(function() {
		
		var idValor = $(this).attr("id");
		var index = idValor.split(underline)[1];
		var camposModal = $("[name=camposModal" + underline + index + "]").val();

		try {
			var netos = JSON.parse(camposModal);
		}
		catch(e){
			var netos = 0;
		}

		// 7 colunas - CPF nas posições 1, 8, 15, 22, ....... 
		for (var x = 1; x < netos.length; x=x+7) {

			var cpfIndicado = netos[x];
	        cpfIndicado = cpfIndicado.replace(/\./g, "");
	    	cpfIndicado = cpfIndicado.replace(/-/g, "");
	    	
	    	var c1 = DatasetFactory.createConstraint("CPF", cpfIndicado, cpfIndicado, ConstraintType.MUST);
	    	var constraints = new Array(c1);
	    	var dataset = DatasetFactory.getDataset("ds_RM_retorna_candidatoIndicado", null, constraints, null);
	    	
	    	if(dataset.values[0].CLASSIFICACAO == "Apto com restrições") {

	    		IndicadosRestricao = IndicadosRestricao + dataset.values[0].NOME + "<br>";
	    		contRestricao = contRestricao + 1;

	    	}

		}

	});
	
	if(contRestricao > 0) {

		FLUIGC.toast({
			title : "",
			message : "Atenção! Indicação de Apto com Restrição. <br> Antes de aprovar confira a Avaliação de: <br><br>" + IndicadosRestricao,
			type : "danger"
		});
	}
}

function abrirModalLotacao(){
	
	if($("[name=obraSetor]").val() == ""){
		
		FLUIGC.toast({
			title : '',
			message : "Selecione Obra/Setor para visulizar o Quadro de Lotação",
			type : 'danger'
		});		
		
	}else{
		
		var selectSecao = montaSelectSecao();
		
		var html = selectSecao + '<div id="tbLotacao"></div>';
		
		FLUIGC.modal({
		    title: 'Quadro de Lotação',
		    content: html,
		    id: 'myModalLotacao',
		    size: 'full',
		    actions: [{
		        'label': 'Fechar',
		        'autoClose': true
		    }]
		}, function(err, data) {
		    if(err) {
		        // do error handling
		    } else {
			
				dtLotacao.init();
	
		    }
		});

	}
	
}

var dtLotacao = new Object({
    myTable: null,
    tableData: null,
    dataInit: null,
 
    init: function() {
        this.loadTable();
    },
 
    loadTable: function() {
        var that = this;

		var codcoligada = $("[name=codColigada]").val();
		var codccusto = $("[name=codCCSetor]").val();
		
		var codsecao = "";		
		if($("#selectSecao").val() == "") 
			codsecao = '%';
		else 
			codsecao = $("#selectSecao").val();
		 
		var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codcoligada, codcoligada, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("CODCCUSTO", codccusto, codccusto, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("CODSECAO", codsecao, codsecao, ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint("CODFUNCAO", "%", "%", ConstraintType.MUST);
		var constraints = new Array(c1, c2, c3, c4);

        that.myTable = FLUIGC.datatable('#tbLotacao', {
            dataRequest: DatasetFactory.getDataset('ds_RM_WS077_QuadroLotacao', null, constraints, null).values,
            renderContent: ['SECAO', 'FUNCAO', 'EFETIVO', 'REQPENDENTES'],
            header: [
                {'title': 'Seção / Coordenação '},
                {'title': 'Função'},
                {'title': 'Efetivo Atual'},
                {'title': 'Requisições Pendentes'}
            ],
            search: {
                enabled: true,
                onlyEnterkey: true,
                onSearch: function(res) {
                    if (!res) {
                        that.myTable.reload(dataInit);
                    }
                    var dataAll = that.myTable.getData();
                    var search = dataAll.filter(function(el) {
                        return el.FUNCAO.toUpperCase().indexOf(res.toUpperCase()) >= 0;
                    });
                    if (search && search.length) {
                        that.myTable.reload(search);
                    } else {
                        FLUIGC.toast({
                            title: 'Pesquisando: ',
                            message: 'Não encontrado',
                            type: 'success'
                        });
                    }
                }
            },
			reload: function(el, ev) {
			    this.myTable.reload();
			},
            navButtons: {
                enabled: false,
            },
        }, function(err, data) {
            if(data) {
                dataInit = data;
            }
            else if (err) {
                FLUIGC.toast({
                    message: err,
                    type: 'danger'
                });
            }
        });
    }
});

function montaSelectSecao(){
	
	var select = '';
	select = select + '<div><label for="selectSecao">Seção / Coordenação</label><select id="selectSecao" onchange="onchangeSecao()" class="form-control"><option value="">Todos</option>';	
	
	var codcoligada = $("[name=codColigada]").val();
	var codccusto = $("[name=codCCSetor]").val();
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codcoligada, codcoligada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCCUSTO", codccusto, codccusto, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODCCUSTOMO", codccusto, codccusto, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3);

	var dataset = DatasetFactory.getDataset("ds_RM_retorna_secao", null, constraints, null);
	
	var optgroup = '';
	
	for(var i=0; i < dataset.values.length; i++) {
		
		codSecao = dataset.values[i].CODIGO;
		descricao = dataset.values[i].DESCRICAO;
		
		if(codSecao.substring(3, 10) != optgroup){
			
			if(optgroup != '')
				select = select + '</optgroup>';
			
			select = select + '<optgroup label="' + codSecao.substring(3, 10) + '">';
			optgroup = codSecao.substring(3, 10);
			
		}
		
		select = select + '<option value="' + codSecao + '">' + descricao + '</option>';

	}
	
	select = select + "</select></div>";
	
	return select;
	
}

function onchangeSecao(){
	
	dtLotacao.init();
		
}

function carregaTipoSelecaoCandidato(){

	$("[name^=divulgacaoVaga___]").each(function() {
		var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
		var hidden_divulgacaoVaga = $('#hidden_divulgacaoVaga___' + index).val()
		$('#divulgacaoVaga___' + index).val(hidden_divulgacaoVaga);
	});		
}

function getQtdIndicacao(){

	$("[name^=numNetos___]").each(function() {
		var idValor = $(this).attr("id");
		var index = idValor.split(underline)[1];
		var numNetos = $("[name=numNetos" + underline + index + "]").val();
		
		if(numNetos == "")
			numNetos = "0";

		$("#numNetos" + underline + index).next()[0].textContent = numNetos/8;
	});		
}

function validacaoTipoMO(custoTipoMO, funcaoTipoMO){
	
	msgRetorno = "";
	
	if(custoTipoMO == ".2" && funcaoTipoMO != "2"){ /* Tipo de Mão de Obra = Indireta */
		
		$('#codFuncao' + underline + indice).val("");
		$('#salario' + underline + indice).val("");
		window["funcao" + underline + indice].clear();		
		
		msgRetorno = "Não é permitido classificar o Tipo de Mão de Obra desta Função como 'Indireta'";
		
	} else if(custoTipoMO == ".4" && funcaoTipoMO != "4"){ /* Tipo de Mão de Obra = Direta */
		
		$('#codFuncao' + underline + indice).val("");
		$('#salario' + underline + indice).val("");
		window["funcao" + underline + indice].clear();
		
		msgRetorno = "Não é permitido classificar o Tipo de Mão de Obra desta Função como 'Direta'";
		
	}
		
	return msgRetorno;
	
}

function excecaoReadmissao(cpf){
	
	var c1 = DatasetFactory.createConstraint("cpCPF", cpf, cpf, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("dsWRH_Excecao_Readmissao", null, constraints, null);
			
	var permite = false;
			
	for(var i=0; i < dataset.values.length; i++) {
		
		var now = new Date();
		var datalimite = dataset.values[i].dataLimite;
		var dia = datalimite.split("/")[0];
		var mes = datalimite.split("/")[1];
		var ano = datalimite.split("/")[2];

		var data = new Date(ano, mes-1, dia, 23, 59, 59);

		if(data >= now)
			permite = true;
		
	}
	
	return permite;
	
}



function ativarChangedivulgacaoVaga() {
	$(".divulgacaoVaga").change(
			function() {
				var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
				var valor = this.value;
				$('#hidden_divulgacaoVaga___' + index).val(valor);
			});
}

function excluiTabela(tabela, chave) {

	var tabela = document.getElementById(tabela);
	var itens = tabela.getElementsByTagName("input");
	var ListaExclusao = new Array();

	for (var i = 0; i < itens.length; i++) {
		if (itens[i].id != null && itens[i].id.indexOf(chave + "___") != -1) {
			
				ListaExclusao.push(itens[i]);
		
			
		}
	}

	for (var j = 0; j < ListaExclusao.length; j++) {
		fnWdkRemoveChild(ListaExclusao[j]);

	}
}

