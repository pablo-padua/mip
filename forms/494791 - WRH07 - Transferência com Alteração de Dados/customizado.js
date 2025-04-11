$(function(){
	var atividadeAtual = buscarAtividadeAtual();
	$("[name^=btDeletePerguntas]").hide();
	
	if ((atividadeAtual == INICIO_0 || atividadeAtual == INICIO) && (FORM_MODE != "NONE")){
		atividadeInicial();
	}  
	else if (atividadeAtual == APROV_GERENTE && FORM_MODE == "MOD"){
		aprovacaoGerente();
	}
	else if (atividadeAtual == APLICA_TESTE && FORM_MODE == "MOD"){
		aplicaTestes();
	}
	else if (atividadeAtual == APROV_GERSEDE && FORM_MODE == "MOD"){
		aprovacaoGerSede();
	}
	else if (atividadeAtual == APROV_TESTE && FORM_MODE == "MOD"){
		aprovaTestes();
		infoTesteSolda();
	}
	else if (atividadeAtual == ACEITA_TRANSF && FORM_MODE == "MOD"){
		aceitaGerente();
	}
	else if (atividadeAtual == APROV_DIRETORIA && FORM_MODE == "MOD"){
		aprovacaoDiretor();
		infoTesteSolda();
	}
	else if (atividadeAtual == ACEITAR_DIRETORIA && FORM_MODE == "MOD"){
		aceitaDiretor();
		infoTesteSolda();
	}
	else if (atividadeAtual == APROV_PRESID && FORM_MODE == "MOD"){
		aprovacaoPresidente();
	}
	else if (atividadeAtual == REALIZA_EXAMES && FORM_MODE == "MOD"){
		realizarExames();
	}
	else if (atividadeAtual == VALIDA_DADOS_OBRA && FORM_MODE == "MOD"){
		validaDados();
	}
	else if (atividadeAtual == VALIDAR_SALARIO && FORM_MODE == "MOD"){
		validarSalario();
		setTimeout(function() {
			var filtro = "CODCOLIGADA," +$("[name=codColigadaDestino]").val();
			reloadZoomFilterValues("motMudancaSalarial", filtro);
		}, 2000);
		$(".motMudancaSalarial").show();
	}
	else if (atividadeAtual == EFETIVAR_ALTERACAO && FORM_MODE == "MOD"){
		efetivarAlteracao();
	}
	else if (atividadeAtual == SUPORTE_TI && FORM_MODE == "MOD"){		
		suporteTI();
	} 
	else if (atividadeAtual == ATUALIZAR_CADASTRO){		
		viewAtividades();
		$(".atualizarCadastro").show();
		$("#avaliacao").hide();
		removerLixeira();
	}
	if (FORM_MODE == "VIEW"){
		viewAtividades();
		$("[name^=salarioOrigem]").hide();
		$("[name^=salarioProposto]").hide();
		$("[name^=salarioAtual]").hide();
		$("[name^=salarioTabela]").hide();
		removerLixeira();
		$(".filtroCentroCustoProp").hide();
	}
	
});

function viewCampos(){
	if ($("[name=motMudancaFuncao]").val() == ""){
		$(".motMudancaFuncao").hide();
	} else {
		$(".motMudancaFuncao").show();
	}
	
	if ($("[name=motMudancaSalarial]").val() == ""){
		$(".motMudancaSalarial").hide();
	} else {
		setTimeout(function() {
			var filtro = "CODCOLIGADA," +$("[name=codColigadaDestino]").val();
			reloadZoomFilterValues("motMudancaSalarial", filtro);
		}, 2000);
		
		
	
		$(".motMudancaSalarial").show();
	}
}

function viewAtividades(){
	
	if ($("[name=motivoDemissaoRM]").val() == ""){
		$("#avaliacao").hide();
	} else {
		$("#avaliacao").show();
		if ($("[name=temAvalQuestionario]").val() == "sim"){
			$(".perguntas").show();
		} else {
			$(".perguntas").hide();
		}
	}
	
	if ($("[name=aprovacaoTransferencia]").val() == ""){
		$(".aprovacaoTransferencia").hide();
	} else {
		$(".aprovacaoTransferencia").show();
	}
	
	if ($("[name=aceitarTransf]").val() == ""){
		$(".aceitarTransf").hide();
	} else {
		$(".aceitarTransf").show();
	}
	
	if ($("[name=aprovacaoTestes]").val() == ""){
		$(".aprovacaoTestes").hide();
	} else {
		$(".aprovacaoTestes").show();
	}
	
	if ($("[name=aprovacaoGerSede]").val() == ""){
		$(".aprovacaoGerSede").hide();
	} else {
		$(".aprovacaoGerSede").show();
	}
	
	if ($("[name=aprovTestesValida]").val() == ""){
		$(".aprovacaoTestesValida").hide();
	} else {
		$(".aprovacaoTestesValida").show();
	}
	
	if ($("[name=aprovDiretoria]").val() == ""){
		$(".aprovacaoDiretoria").hide();
	} else {
		$(".aprovacaoDiretoria").show();
	}
	
	if ($("[name=aceitarTransfDiretoria]").val() == ""){
		$(".aceitarTransfDiretoria").hide();
	} else {
		$(".aceitarTransfDiretoria").show();
	}
	
	if ($("[name=aprovPresidente]").val() == ""){
		$(".aprovacaoPresidente").hide();
	} else {
		$(".aprovacaoPresidente").show();
	}
	
	if ($("[name=aprovExames]").val() == ""){
		$(".aprovacaoExames").hide();
	} else {
		$(".aprovacaoExames").show();
	}
	
	if ($("[name=aprovValidDadosObra]").val() == ""){
		$(".validarDadosObra").hide();
	} else {
		$(".validarDadosObra").show();
	}
	
	if ($("[name=atualizarCadastro]").val() == ""){
		$(".atualizarCadastro").hide();
	} else {
		$(".atualizarCadastro").show();
	}
	
	if ($("[name=aprovValidarSalario]").val() == ""){
		$(".validarSalario").hide();
	} else {
		$(".validarSalario").show();
	}
	
	if ($("[name=alteracaoEfetivada]").val() == ""){
		$(".efetivar").hide();
	} else {
		$(".efetivar").show();
	}
	
}

/* ########### INICIO VIEW DAS ATIVIADES ############ */ 

function atividadeInicial(){
	$("#avaliacao").hide();
	viewAtividades();
	$(".justAbsMed").hide();
	$(".justAbsPro").hide();
	$(".justPrazo").hide();
	FLUIGC.calendar("#dataAlteracao", {minDate: new Date()});	
	$("[name=matrSolicitante]").val(buscarMatriculaUsuarioLogado());
	preencheChapa(buscarMatriculaUsuarioLogado(), "chapaSolicitante");	
	papelRHUsuarioLogado();	
	regraSolicitante();
	changeFiltroCentroCustoProp();
}

function aprovacaoGerente(){
	viewCampos();
	viewAtividades();
	removerLixeira();
	$(".aprovacaoTransferencia").show();
	$(".filtroCentroCustoProp").hide();
}

function aplicaTestes(){
	viewCampos();
	viewAtividades();
	removerLixeira();
	$(".aprovacaoTestes").show();
	$("[name=resultadoLaudoProva]").val(verificaLaudoProva(true, "danger", ""));
	$(".filtroCentroCustoProp").hide();
}

function aprovacaoGerSede(){
	viewCampos();
	viewAtividades();
	removerLixeira();
	$(".aprovacaoGerSede").show();
	$(".efetivar").hide();
	$(".filtroCentroCustoProp").hide();
}

function aprovaTestes(){
	viewCampos();
	viewAtividades();
	removerLixeira();
	$(".aprovacaoTestesValida").show();
	$("[name=resultadoLaudoProva]").val(verificaLaudoProva(true, "danger", ""));
	$(".filtroCentroCustoProp").hide();
}

function aceitaGerente(){
	viewCampos();
	viewAtividades();
	removerLixeira();
	$(".aceitarTransf").show();
	$(".filtroCentroCustoProp").hide();
}

function aprovacaoDiretor(){
	viewCampos();
	viewAtividades();
	removerLixeira();
	$(".aprovacaoDiretoria").show();
	preencheChapa(buscarMatriculaUsuarioLogado(), "chapaAprovador");
	$(".filtroCentroCustoProp").hide();	
}

function aceitaDiretor(){
	viewCampos();
	viewAtividades();
	removerLixeira();
	$("#avaliacao").show();
	$(".aceitarTransfDiretoria").show();
	preencheChapa(buscarMatriculaUsuarioLogado(), "chapaAprovador");
	$(".filtroCentroCustoProp").hide();
}

function aprovacaoPresidente(){
	viewCampos();
	viewAtividades();
	removerLixeira();
	$(".aprovacaoPresidente").show();
	$(".filtroCentroCustoProp").hide();
}

function realizarExames(){
	viewCampos();
	viewAtividades();
	verificaExame();
	removerLixeira();
	$("#avaliacao").hide();
	$("[name^=salarioOrigem]").hide();
	$("[name^=salarioProposto]").hide();
	$("[name^=variacaoSalario]").hide();
	$(".aprovacaoExames").show();	
	$(".validarDadosObra").hide();
	$(".filtroCentroCustoProp").hide();
	$(".validarSalario").hide();
}

function validaDados(){
	viewCampos();
	viewAtividades();
	removerLixeira();
	$("#avaliacao").hide();
	$(".validarDadosObra").show();
	$(".filtroCentroCustoProp").hide();
	$(".validarSalario").hide();
}

function validarSalario(){
	viewCampos();
	viewAtividades();
	removerLixeira();
	getSalario();
	$("#avaliacao").hide();
	$(".validarSalario").show();
	$(".filtroCentroCustoProp").hide();
}

function efetivarAlteracao(){
	viewCampos();
	viewAtividades();
	removerLixeira();
	$("#avaliacao").hide();
	$(".efetivar").show();
	//verificaExame();
	verificaStatusReq();
	$(".filtroCentroCustoProp").hide();
}

function suporteTI(){
	$("[name^=salarioOrigem]").hide();
	$("[name^=salarioProposto]").hide();
	$(".aprovacaoAlteracao").hide();
	$(".aprovacaoTestes").hide();
	$(".aprovacaoTestesValida").hide();
	$(".aprovacaoDiretoria").hide();
	$(".aprovacaoPresidente").hide();
	$(".aprovacaoExames").hide();
	$(".validarDadosObra").hide();
	$(".validarSalario").hide();
	$(".efetivar").hide();
	$("#avaliacao").hide();
	viewCampos();
	removerLixeira();
	viewAtividades();
	$(".filtroCentroCustoProp").hide();
}

/* ########### FIM VIEW DAS ATIVIADES ############ */


/* ########### INICIO FUNCOES ZOOMS ############ */

function aberturaRateio(){
	
	var indice = wdkAddChild('tbRateioProp'); 
	$("#percentProp___" + indice).val("100");
	
	var filtroCusto = getFiltroRateio();
	
	reloadZoomFilterValues("centroCustoProp___" + indice, "CODCOLIGADA," + $("[name=codColigadaDestino]").val() + ",CODCCUSTO," + $("[name=codCCObraSetorDestino]").val() + ",CODSECAO," + $("[name=codSecaoDestino]").val() + ",FILTROCUSTO," + filtroCusto);
	
}

function getFiltroRateio(){
	
	var filtroPadrao = $("[name=hiddenfiltroCentroCustoProp]").val();
	
	if(filtroPadrao == "true")
		return "0"; // mostra CCusto padrao
	else
		return "1"; // mostra todos
	
}

function fnCustomDelete(oElement, nameTable, classFieldSet) {
	var qtdDeLinhasTableName = $("#tbRateioProp tbody tr").length;
	if (qtdDeLinhasTableName > 2) {
		fnWdkRemoveChild(oElement);		
	} /*else {
		FLUIGC.toast({
			title : '',
			message : '\u00c9 necess\u00e1rio inserir pelo menos um Rateio no Centro de Custo Proposto.',
			type : 'danger'
		});
	}*/	
}


function removerLixeira(){
	$("[name=botaoAddRateio]").hide();	
	$("#tbRateioProp tbody tr:gt(0)").each(function() {
		var img = $(this).find(".btDeleteRateio");
		img.remove();
	});
}

function preencheCCustoOrigem(){
	var coligada = $("[name=codColigadaOrigem]").val();
	var chapa = $("[name=chapa]").val();
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPAFUNC", chapa, chapa, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_centroCustoFunc", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		var index = wdkAddChild('tbRateioOrigem'); 
		$("#codCentroCustoOrigem___" + index).val(dataset.values[i].CODCCUSTO);
		$("#centroCustoOrigem___" + index).val(dataset.values[i].NOME);
		$("#percentualOrigem___" + index).val(dataset.values[i].PERCENTUAL);
	}
}


/* ########### FIM FUNCOES ZOOMS ############ */


/* ########### INICIO REGRAS SOLICITANTE ############ */

function preencheChapa(matricula, campo){
	var c1 = DatasetFactory.createConstraint("USER_CODE", matricula, matricula, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_chapa", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		$("[name=cargoSolicitante]").val(dataset.values[i].CARGO);
		$("[name=funcaoSolicitante]").val(dataset.values[i].GESTAO);
		$("[name=codUsuario]").val(dataset.values[i].CODUSUARIO);
		chapa = dataset.values[i].CHAPA;
		$("[name="+campo+"]").val(chapa);
	}
}

function buscaCCSolicitante(codCentroCusto){
	var chapa = $("[name=chapaSolicitante]").val();
	var coligada = $("[name=codColigadaOrigem]").val();
	var c1 = DatasetFactory.createConstraint("CHAPA", chapa, chapa, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_centroCustoSolicitante", null, constraints, null);
	var cont = 0;
	for(var i=0; i < dataset.values.length; i++) {
		ccusto = dataset.values[i].CODCCUSTO;
		if (ccusto == codCentroCusto){
			cont ++;			
		}
	}
	if (cont == 0){
		window["obraSetorOrigem"].clear();
		FLUIGC.toast({
			title : '',
			message : 'Voc\u00ea n\u00e3o tem permiss\u00e3o nesta Obra/Setor.',
			type : 'danger'
		});
	} 
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

function regraSolicitante(){
	var papelRH = $("[name=solicitanteRH]").val();
	var funcGestao = $("[name=funcaoSolicitante]").val();
	
	if (funcGestao == "1" 
		|| papelRH == "true"){
	} else {	
		$(".cabecalho").hide();
		$(".dadosSolicitante").hide();
		$(".dadosOrigem").hide();
		$(".dadosPropostos").hide();
		$(".avaliacao").hide();		
		FLUIGC.toast({
			title : '',
			message : 'Voc\u00ea n\u00e3o tem permiss\u00e3o para abrir esse tipo de solicita\u00e7\u00e3o.',
			type : 'danger'
		});
	}
}

function validaAlcadaAprovacao(codColigada, codCentroCusto){	
	var c1 = DatasetFactory.createConstraint("codColigada", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("codCentroCusto", codCentroCusto, codCentroCusto, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_Busca_Alcada_Aprovacao", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		if(dataset.values[i].processoTransferencia != 'on' && dataset.values[i].codColigada == codColigada && dataset.values[i].codCentroCusto == codCentroCusto){
			window["obraSetorOrigem"].clear();	
			FLUIGC.toast({
				title : '',
				message : "A Obra/Setor selecionada n\u00e3o possui Al\u00e7ada de Aprova\u00e7\u00e3o configurada para este processo. Favor contatar a TI.",
				type : 'danger'
			});			
		}
	}
}

/* ########### FIM REGRAS SOLICITANTE ############ */


/* ########### INICIO AVALIACAO ############ */

function retornaPerguntas(chapa){
	$(".tbAvaliacao").hide();
	apagaPerguntas();
	var coligada = $("[name=codColigadaOrigem]").val();
	var funcaoFunc = $("[name=cargoFunc]").val();
	var codFilialOrigem = $("[name=codFilialOrigem]").val();
	var codFilialDestino = $("[name=codFilialDestino]").val();
	if (funcaoFunc == "Diretor" || funcaoFunc == "Conselho"){
		$("[name=temAvalQuestionario]").val("nao");
		$(".tbAvaliacao").hide();
	} else if (codFilialOrigem != codFilialDestino){
		$("#avaliacao").show();
		var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("CHAPA", chapa, chapa, ConstraintType.MUST);
		var fieldAsConstraint = new Array(c1, c2);
		var dataset = DatasetFactory.getDataset("ds_RM_retorna_avaliacao", null, fieldAsConstraint, null);
		if (dataset.values.length >  1){
			$(".tbAvaliacao").show();
			$(".perguntas").show();
			$("[name=temAvalQuestionario]").val("sim");
			for (var i = 0; i < dataset.values.length; i++) {
				var index = wdkAddChild("tbAvaliacao");
				$("#btDeletePerguntas___" + index).hide();
				$("#codQuestionario___" + index).val(dataset.values[i].CODIGO_QUESTIONARIO);
				$("#codQuestao___" + index).val(dataset.values[i].CODIGO_QUESTAO);
				$("#perguntas___" + index).val(dataset.values[i].TEXTO);
				$("[name=notaAvaliacao___" + index + "]").val(dataset.values[i].RESPOSTA);
			}
		} else {
			$("[name=temAvalQuestionario]").val("nao");
			$(".tbAvaliacao").hide();
			$(".perguntas").hide();
		}
	}
		
}

function apagaPerguntas(){
	$('table[tablename=tbAvaliacao] tbody tr').not(':first').remove();
}

function validaAvaliacao(){
	var arrayPaiFilho = $(".valorAvaliacao");
	var cont = arrayPaiFilho.length;
	for (var i = 0; i < arrayPaiFilho.length; i++){
		var elementoCompleto = arrayPaiFilho[i].name;
		if ($('[name='+elementoCompleto+']').is(":checked") == false){
			cont --;
		}
	}
	
	if (cont == ((arrayPaiFilho.length - 4))){
		$("[name=validaAvaliacao]").val(true);
	} else {
		$("[name=validaAvaliacao]").val(false);
	}
	
}

function manipulaRestricoes(){
	
	//$("[name=motivoDemissaoRM]").prop('disabled', true);
	$("[name=semRestricao]").prop("checked", true);
	$("[name=semRestricao]").prop('disabled', true);
	$("[name=justaCausa]").prop("checked", false);
	$("[name=justaCausa]").prop('disabled', true);
	$("[name=regraDeOuro]").prop("checked", false);
	$("[name=regraDeOuro]").prop('disabled', true);
	$("[name=assiduidade]").prop("checked", false);
	$("[name=assiduidade]").prop('disabled', true);
	$("[name=pontualidade]").prop("checked", false);
	$("[name=pontualidade]").prop('disabled', true);
	$("[name=produtividade]").prop("checked", false);
	$("[name=produtividade]").prop('disabled', true);
	$("[name=comprometimento]").prop("checked", false);
	$("[name=comprometimento]").prop('disabled', true);
	$("[name=indisciplina]").prop("checked", false);
	$("[name=indisciplina]").prop('disabled', true);
	$("[name=seguranca]").prop("checked", false);
	$("[name=seguranca]").prop('disabled', true);
}

/* ########### FIM AVALIACAO ############ */

function validaDataAlteracao(data){
	var dia = data.value.split("/")[0];
	if (dia >= "23" && dia <= "31"){
		$("[name=dataAlteracao]").val("");
		FLUIGC.toast({
			title : '',
			message : 'Solicita\u00e7\u00f5es realizadas entre os dias 23 e 31 somente ser\u00e3o processadas na compet\u00eancia seguinte. Favor selecianar uma data referente a pr\u00f3xima compet\u00eancia.',
			type : 'danger'
		});
	} else {
		var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])      [\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;

	    if (!((data.value.match(RegExPattern)) && (data.value!=''))) {        
	        $("[name=dataAlteracao]").val("");
			FLUIGC.toast({
				title : '',
				message : 'Valor informado no campo Data de Altera\u00e7\u00e3o n\u00e3o corresponde a uma data v\u00e1lida.',
				type : 'danger'
			});
	    }
	}

	var dataSel = new Date(data.value.split("/")[2], data.value.split("/")[1] - 1, data.value.split("/")[0]);
	var now = new Date();
	now.setHours(0, 0, 0, 0);
	
	if(dataSel < now){
		
		$("[name=dataAlteracao]").val("");
		FLUIGC.toast({
			title : '',
			message : 'Não é permitido alteração retroativa.',
			type : 'danger'
		});
		
	}
	
}

function validaMudancaFuncao(){
	if ($("[name=codFuncaoOrigem]").val() == $("[name=codFuncaoProposto]").val()){
		$(".motMudancaFuncao").hide();
	} else {
		$(".motMudancaFuncao").show();
	}
}

function validarTotalRateio(){
	var total = 0;
	var arrayLinhas = $("input[id^='percentProp___']");
	for (var i = 0; i < arrayLinhas.length; i++) {
		var nomeCampo = arrayLinhas[i].id;
		var valorCampo = $("#" + nomeCampo).val();
		total = parseInt(total) + parseInt(valorCampo);
		if (total > 100){
			$("#" + nomeCampo).val("");
			FLUIGC.toast({
				title : '',
				message : 'A soma do Rateio n\u00e3o pode ultrapassar a 100%.',
				type : 'danger'
			});
		}
	}
	if (total < 100){
		$("[name=totalRateio]").val(false);
	} else {
		$("[name=totalRateio]").val(true);
	}
}

function verificaExame(){
	var codColigada = $("[name=codColigadaOrigem]").val();
	var chapa = $("[name=chapaFuncionario]").val();
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", chapa, chapa, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_resultadoExameAlteracaoDados", null, constraints, null);
	if(dataset.values[i].EXAME != ""){
		$("[name=resultadoExames]").val(dataset.values[i].EXAME);
		$("[name=resultadoExame]").val(dataset.values[i].EXAME);
	} else {
		$("[name=resultadoExames]").val("");
		$("[name=resultadoExame]").val("");
		FLUIGC.toast({
			title : '',
			message : 'Exame ainda n\u00e3o cadastrado.',
			type : 'danger'
		});
	}
}

function retornaAbsenteismo(){
	var chapa = $("[name=chapa]").val();
	var coligada = $("[name=codColigadaOrigem]").val();
	var c1 = DatasetFactory.createConstraint("CHAPA", chapa, chapa, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_absenteismo", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		$("[name=absenteismoMedico]").val(dataset.values[i].ABSMEDICO);
		$("[name=absenteismoProdutiv]").val(dataset.values[i].ABSPRODUTIVIDADE);		
	}
}

function verificaStatusReq(){
	var codColigada = $("[name=codColigadaOrigem]").val();
	var idReq = $("[name=idReq]").val();
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDREQ", idReq, idReq, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_statusReqAlteracaoDados", null, constraints, null);
	if(dataset.values[0].CODSTATUS != ""){
		$("[name=statusReq]").val(dataset.values[0].CODSTATUS);
		$("[name=alteracaoEfetivada]").val(dataset.values[0].STATUSREQ);
		if(dataset.values[i].CODSTATUS == "6"){	
			FLUIGC.toast({
				title : '',
				message : 'Requisição Cancelada no RM, ao Enviar a solicita\u00e7\u00e3o ser\u00e1 finalizada com cancelamento.',
				type : 'danger'
			});
		}
	} else {
		$("[name=statusReq]").val("");
		$("[name=alteracaoEfetivada]").val("");
	}
}

/*
function salarioProposto(){
	var codColigada = $("[name=codColigadaDestino]").val();
	var codSecao = $("[name=codSecaoDestino]").val();
	var secaoDestino = $("[name=secaoDestino]").val();
	var faixaOrigem = $("[name=faixaOrigem]").val();
	var codFuncaoProposto = $("[name=codFuncaoProposto]").val();
	var funcaoProposto = $("[name=funcaoProposto]").val();
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODSECAO", codSecao, codSecao, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("FAIXA", faixaOrigem, faixaOrigem, ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint("CODFUNCAO_PROPOSTA", codFuncaoProposto, codFuncaoProposto, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c4, c5);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_salarioProposto", null, constraints, null);
	if(dataset.values[i].SALARIO != "" && dataset.values[i].SALARIO != "0.0000"){
		if(dataset.values[i].LOTACAO_CADASTRADA == "1"){
			if (parseFloat(dataset.values[i].SALARIO.replace(",", ".")) >= parseFloat(getValor($("[name=salarioOrigem]").val()))){
				$("[name=salarioProposto]").val(getValorMonetario(dataset.values[i].SALARIO));
				$("[name=tabelaSalarialDestino]").val(dataset.values[i].CODTABELA);				
				variacaoSalarial();
				aberturaRateio();
			}else {
				window["funcaoProposto"].clear();	
				$("[name=codFuncaoProposto]").val("");
				FLUIGC.toast({
					title : '',
					message : 'N\u00e3o \u00e9 permitido reduzir o sal\u00e1rio do colaborador, solicite atualiza\u00e7\u00e3o da tabela salarial ou proponha outra fun\u00e7\u00e3o para este colaborador.',
					type : 'danger'
				});
			}
		} else {
			window["funcaoProposto"].clear();	
			$("[name=codFuncaoProposto]").val("");
			$("[name=salarioProposto]").val("");
			$("[name=tabelaSalarialDestino]").val("");
			FLUIGC.toast({
				title : '',
				message : 'Solicitar ao Setor de Pessoal a vincula\u00e7\u00e3o da lota\u00e7\u00e3o (Fun\u00e7\u00e3o x Se\u00e7\u00e3o).',
				type : 'danger'
			});
		}		
	} else {
		window["funcaoProposto"].clear();	
		$("[name=codFuncaoProposto]").val("");
		$("[name=salarioProposto]").val("");
		$("[name=tabelaSalarialDestino]").val("");

		var msg = "<div style='text-align: left;'";
		msg += "<br><b>Fun\u00e7\u00e3o: </b>" + codFuncaoProposto + " - " + funcaoProposto;
		msg += "<br><b>Se\u00e7\u00e3o: </b>" + codSecao + " - " + secaoDestino;		
		msg += "<br><br>A lota\u00e7\u00e3o proposta n\u00e3o foi encontrada na Tabela Salarial. Verifique se a fun\u00e7\u00e3o desejada \u00e9 permitida nesta se\u00e7\u00e3o.";
		msg += "<br><br>Caso seja necess\u00e1rio solicite a inclus\u00e3o da lota\u00e7\u00e3o atrav\u00e9s do Processo WRH09 - Tabela Salarial.";
		msg += "</div>";		
		
		FLUIGC.toast({
			title : "",
			message : msg,
			type : "danger"
		});

	}
}
*/

function variacaoSalarial(){
	var valAtual = getValor($("[name=salarioOrigem]").val());
	var valProposto = getValor($("[name=salarioProposto]").val());
	if (valAtual != ""){
		var variacao = ((valProposto / valAtual * 100) - 100).toFixed(2);
		$("[name=variacaoSalario]").val(variacao + "%");
		if (valAtual == valProposto){
			$(".motMudancaSalarial").hide();
		} else{
			$(".motMudancaSalarial").show();
		}
	} 
	
}

function getValorMonetario(valor) {
	var retorno = valor.split(".");
	var reais = retorno[0];
	var centavos = retorno[1].substring(0,2);
	var valorFormatado = reais + "," + centavos;
	return valorFormatado;
}

function arredondar(nr) {
    nr = parseFloat(nr);
    return Math.floor(nr);
}

function somenteNumeros(num) {
    var er = /[^0-9.]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
      campo.value = "";
    }
}

function validaColigada(){
	var coligadaOrigem = $("[name=codColigadaOrigem]").val();
	var coligadaDestino = $("[name=codColigadaDestino]").val();
	
	if (coligadaOrigem != "" && coligadaOrigem != null && coligadaOrigem != undefined){
		if (coligadaDestino != "" && coligadaDestino != null && coligadaDestino != undefined){
			if (coligadaOrigem != coligadaDestino){
				$("[name=codColigadaDestino]").val("");
				$("[name=codCCObraSetorDestino]").val("");
				$("[name=codDPDestino]").val("");
				$("[name=codRHDestino]").val("");
				$("[name=codMedicinaDestino]").val("");
				$("[name=codSegurancaDestino]").val("");
				$("[name=codTIDestino]").val("");
				$("[name=codLogisticaDestino]").val("");
				$("[name=codAdmDestino]").val("");
				$("[name=codFinanceiroDestino]").val("");
				$("[name=tipoDestino]").val("");
				$('#codSecaoDestino').val("");
				$('#codFilialDestino').val("");
				$('#filialDestino').val("");				
				$("[name=codFuncaoProposto]").val("");
				$("[name=salarioProposto]").val("");
				$("[name=codTabelaProposto]").val("");
				$("[name=variacaoSalario]").val("");
				window["obraSetorDestino"].clear();
				window["secaoDestino"].clear();
				window["funcaoProposto"].clear();
				FLUIGC.toast({
					title : '',
					message : 'N\u00e3o \u00e9 poss\u00edvel realizar transfer\u00eancia entre Empresas diferentes.',
					type : 'danger'
				});
			}
		}
	}
}

function validaSecao(){
	var codSecaoOrigem = $("[name=codSecaoOrigem]").val();
	var codSecaoDestino = $("[name=codSecaoDestino]").val();	
	if (codSecaoOrigem != "" && codSecaoOrigem != null && codSecaoOrigem != undefined){
		if (codSecaoDestino != "" && codSecaoDestino != null && codSecaoDestino != undefined){
			if (codSecaoOrigem == codSecaoDestino){
				$('#codSecaoDestino').val("");
				$('#codFilialDestino').val("");
				$('#filialDestino').val("");				
				$("[name=codFuncaoProposto]").val("");
				$("[name=salarioProposto]").val("");
				$("[name=codTabelaProposto]").val("");
				$("[name=variacaoSalario]").val("");
				$("[name=codMotMudancaFuncao]").val("");
				$("[name=codMotMudancaSalarial]").val("");
				$("[name=codMotMudancaSecao]").val("");
				window["funcaoProposto"].clear();
				window["secaoDestino"].clear();
				FLUIGC.toast({
					title : '',
					message : 'Para realizar altera\u00e7\u00e3o de dados funcionais sem altera\u00e7\u00e3o de Se\u00e7\u00e3o / Coordena\u00e7\u00e3o, utilize o processo "WRH06 - Altera\u00e7\u00e3o de Dados Funcionais.',
					type : 'danger'
				});
			}
		}
	}
}

function validaMudancaSalarial(valor){	
	var funcaoOrigem = $("[name=codFuncaoOrigem]").val();
	var funcaoDestino = $("[name=codFuncaoProposto]").val();
	if (funcaoOrigem == funcaoDestino){
		if (valor == "DC"){
			window["motMudancaSalarial"].clear();	
			$("[name=codMotMudancaSalarial]").val("");
			FLUIGC.toast({
				title : '',
				message : 'Fun\u00e7\u00e3o proposta \u00e9 igual a fun\u00e7\u00e3o origem. Selecione outro motivo.',
				type : 'danger'
			});
		}
	}
}

function alertasSelecao(){
	
	$(".justAbsMed").hide();
	$(".justAbsPro").hide();
	$(".justPrazo").hide();
	
	if($("[name=variacaoSalario]").val() != "0%" || $("[name=codFuncaoOrigem]").val() != $("[name=codFuncaoProposto]").val() ){

		if (parseFloat($("[name=absenteismoMedico]").val().replace(",", ".")) > parseFloat(1.5)){
			FLUIGC.toast({
				title : '',
				message : "Absenteísmo Médico acima de 1,5%. É obrigatório informar uma Justificativa.",
				type : 'warning',
				timeout	: 60000
			});
			
			$(".justAbsMed").show();
		}
	
		if (parseFloat($("[name=absenteismoProdutiv]").val().replace(",", ".")) > parseFloat(3)){
			FLUIGC.toast({
				title : '',
				message : "Absenteísmo de Produtividade acima de 3%. É obrigatório informar uma Justificativa.",
				type : 'warning',
				timeout	: 60000
			});
			
			$(".justAbsPro").show();
		}
		
		var dataAdmissao = $("[name=dataAdmissao]").val();
		var dataAdmissao = new Date(dataAdmissao.split("/")[2], dataAdmissao.split("/")[1] - 1, dataAdmissao.split("/")[0]);
		var hoje = new Date();
	
		if(DateDiffDays(dataAdmissao, hoje) < 180){
			FLUIGC.toast({
				title : '',
				message : "Admissão ocorreu há menos de 6 meses. É obrigatório informar uma Justificativa.",
				type : 'danger'
			});

			$(".justPrazo").show();
	    }

	}

}

function verificaLaudoProva(exibeMensagem, typeMsg, complemento){
	
	var retorno = "";	
	
	var codColigada = $("[name=codColigadaDestino]").val();
	var chapa = $("[name=chapaFuncionario]").val();
	var codFuncaoProposto = $("[name=codFuncaoProposto]").val();
	var c1 = DatasetFactory.createConstraint("PARAM_COLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("PARAM_FUNCAOPROPOSTO", codFuncaoProposto, codFuncaoProposto, ConstraintType.MUST); 
	var c3 = DatasetFactory.createConstraint("PARAM_CHAPA", chapa, chapa, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3);
	
	var dataset = DatasetFactory.getDataset("ds_RM_WS039_LaudoProvaTecnica", null, constraints, null);	
	
	if(dataset.values[0].EXIGELAUDOOBRA != ""){
		
		var EXIGELAUDOOBRA = dataset.values[0].EXIGELAUDOOBRA;
		var LAUDO = dataset.values[0].LAUDO;
		var LAUDOAPTO = dataset.values[0].LAUDOAPTO;
		var EXIGEPROVA = dataset.values[0].EXIGEPROVA;
		var RESULTADOPROVA = dataset.values[0].RESULTADOPROVA;
		var NOTAPROVA = dataset.values[0].NOTAPROVA;
		
		setDescricaoLaudo(dataset.values[0].EXIGELAUDOOBRA, dataset.values[0].LAUDO, dataset.values[0].LAUDOAPTO);
		
		if(NOTAPROVA != "")
			$("[name=notaProvaTecnica]").val(parseFloat(NOTAPROVA.replace(",", ".")));
	
		/*if ($("[name=tipoDestino]").val() == "sede"){
			
			$("[name=notaProvaTecnica]").val("Não se aplica");
					
			if (LAUDO != "1"){
				
				retorno = retorno + "A função proposta exige realização da Avaliação de Segurança. <br>";
				
			} else {
				if (LAUDOAPTO == "0"){
					
					retorno = retorno + "Avaliação de Segurança: Inapto <br>";
				}
				else if (LAUDOAPTO == ""){
					
					retorno = retorno + "A função proposta exige realização da Avaliação de Segurança. <br>";
				}
			}
			
		} else */
		if ($("[name=tipoDestino]").val() == "obra"){
			
			if (EXIGELAUDOOBRA == "1"){

				if (LAUDO != "1"){

					retorno = retorno + "A função proposta exige realização da Avaliação de Segurança. <br>";
					
				} else {
					if (LAUDOAPTO == "0"){

						retorno = retorno + "Avaliação de Segurança: Inapto <br>";

					}
					else if (LAUDOAPTO == ""){

						retorno = retorno + "A função proposta exige realização da Avaliação de Segurança. <br>";

					}
				}
			}
			
			if (EXIGEPROVA == "1"){
				
				if (RESULTADOPROVA == "0"){

					retorno = retorno + "Candidato Reprovado na Prova Técnica <br>";					

				} else if (RESULTADOPROVA == ""){

					retorno = retorno + "A função proposta exige aprovação em Prova Técnica <br>";
					$("[name=notaProvaTecnica]").val("Não encontrado");
				}									
			} else
				$("[name=notaProvaTecnica]").val("Não se aplica");
		}
		
	}
	
	if(exibeMensagem == true && retorno != "")
		FLUIGC.toast({
			title : '',
			message : retorno + complemento,
			type : typeMsg,
			timeout	: 60000
		});	
	
	if(retorno == "")
		return "aprovado";
	else
		return retorno;
	
}

function verificaSoldador(){

	//document.body.scrollTop = 0;

	if($("[name=cargoFunc]").val() != $("[name=cargoProposto]").val() && $("[name=cargoProposto]").val() == "Soldador"){		

		FLUIGC.toast({
				title : '',
				message : 'Para o cargo de Soldador é necessário anexar o Teste de Solda.<br><br>Retorne ao topo da solicitação para acessar o menu de Anexos e "Carregar Arquivos".',
				type : 'warning',
				timeout	: 60000
			});

	}
	
}

function infoTesteSolda(){
	
	if( $("[name=qtdAnexos]").val() > 0 && $("[name=cargoFunc]").val() != $("[name=cargoProposto]").val() && $("[name=cargoProposto]").val() == "Soldador"){		

		FLUIGC.toast({
				title : '',
				message : 'Esta solicitação possui um Teste de Solda. <br><br> Acesse o menu de Anexos para visualizá-lo.',
				type : 'info',
				timeout	: 60000
			});

	}	
	
}

function changeFiltroCentroCustoProp(){
	
	$("[name=filtroCentroCustoProp]").change(function() {
		
		var filtroPadrao = $("[name=filtroCentroCustoProp]").prop("checked");
		$("[name=hiddenfiltroCentroCustoProp]").val(filtroPadrao);
		
	    reloadRateio();

	});
	
}

function setDescricaoLaudo(exigeLaudo, laudo, laudoApto){
	
	if (exigeLaudo == "1"){
								
		$("[name=exigeLaudo]").val("Sim");
		
		if(laudo == "1")
			$("[name=laudo]").val("Sim");
		else
			$("[name=laudo]").val("Não");
			
		if(laudoApto == "1")
			$("[name=laudoApto]").val("Apto");
		else if(laudoApto == "0")
			$("[name=laudoApto]").val("Inapto");
		else
			$("[name=laudoApto]").val("");
		
	} else {
		
		$("[name=exigeLaudo]").val("Não");
		$("[name=laudo]").val("Não se aplica");
		$("[name=laudoApto]").val("Não se aplica");
		
	}
	
}

function getSalario(){
	
	var CODCOLIGADA_I = $("[name=codColigadaDestino]").val();
	var CHAPA = $("[name=chapaFuncionario]").val();
	var SECAO_PROPOSTA = $("[name=codSecaoDestino]").val();
	var FUNCAO_PROPOSTA = $("[name=codFuncaoProposto]").val();
	var FAIXA_PROPOSTA = $("[name=codFaixaProposto]").val();
	
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA_I", CODCOLIGADA_I, CODCOLIGADA_I, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", CHAPA, CHAPA, ConstraintType.MUST); 
	var c3 = DatasetFactory.createConstraint("SECAO_PROPOSTA", SECAO_PROPOSTA, SECAO_PROPOSTA, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("FUNCAO_PROPOSTA", FUNCAO_PROPOSTA, FUNCAO_PROPOSTA, ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint("FAIXA", FAIXA_PROPOSTA, FAIXA_PROPOSTA, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3, c4, c5);
	
	var dataset = DatasetFactory.getDataset("ds_RM_WS141_Salarios", null, constraints, null);	
	
	if(dataset.values[0].SALARIO_TABELA != ""){
		
		$("[name=salarioTabela]").val(getValorMonetario(dataset.values[0].SALARIO_TABELA));
		$("[name=salarioAtual]").val(getValorMonetario(dataset.values[0].SALARIO_FUNC));
		
		var salarioTabela = parseFloat(dataset.values[0].SALARIO_TABELA);
		var salarioAtual = parseFloat(dataset.values[0].SALARIO_FUNC);
		var salarioProposto = parseFloat(getValor($("[name=salarioProposto]").val()));
		
		if( salarioAtual > salarioTabela ){
			
			FLUIGC.toast({
				title : '',
				message : 'O salário atual do funcionário é maior que o salário da Tabela Salarial. <br><br> É necessário atualizar a Tabela Salarial de destino antes de concluir a transferência.',
				type : 'danger'
			});
			
		}else if(salarioProposto != salarioTabela){

			FLUIGC.toast({
				title : '',
				message : 'O salário proposto está desatualizado com relação a Tabela Salarial. <br><br> O salário será alterado para R$ ' + $("[name=salarioTabela]").val() + ' conforme tabela de destino',
				type : 'info',
				timeout	: 60000
			});

		}
		
		avisoFerias(dataset.values[0].FERIASPROG, dataset.values[0].CODSITUACAO);
		
	} else {
		
		FLUIGC.toast({
			title : '',
			message : 'Erro ao consultar tabela salarial. (ds_RM_WS141_Salarios)',
			type : 'danger'
		});
	}

}

function avisoFerias(FERIASPROG, CODSITUACAO){
	
	if(FERIASPROG > 0 || CODSITUACAO == "F"){
		
		FLUIGC.toast({
			title : '',
			message : 'Atenção! Funcionário em férias ou com férias programadas. Verifique antes de efetivar a transferência.',
			type : 'warning',
			timeout	: 60000
		});
		
	}
}

function changeRestricoes(){
	$("[name=hiddenSemRestricao]").val("0");
	$("[name=hiddenJustaCausa]").val("0");
	$("[name=hiddenRegraDeOuro]").val("0");
	$("[name=hiddenComprometimento]").val("0");
	$("[name=hiddenAssiduidade]").val("0");
	$("[name=hiddenPontualidade]").val("0");
	$("[name=hiddenProdutividade]").val("0");
	$("[name=hiddenSeguranca]").val("0");
	$("[name=hiddenIndisciplina]").val("0");
	
	if ($("[name=semRestricao]").is(":checked") == true){
		
		$("[name=semRestr]").val("1");
		$("[name=hiddenSemRestricao]").val("1");
		
		$("[name=justaCausa]").prop("checked", false);		
		$("[name=regraDeOuro]").prop("checked", false);		
		$("[name=comprometimento]").prop("checked", false);				
		$("[name=assiduidade]").prop("checked", false);		
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);
		$("[name=seguranca]").prop("checked", false);
		
		$("[name=justaCausa]").prop('disabled', true);
		$("[name=regraDeOuro]").prop('disabled', true);
		$("[name=comprometimento]").prop('disabled', true);
		$("[name=assiduidade]").prop('disabled', true);
		$("[name=pontualidade]").prop('disabled', true);
		$("[name=produtividade]").prop('disabled', true);
		$("[name=indisciplina]").prop('disabled', true);
		$("[name=seguranca]").prop('disabled', true);
		
	}else{
		$("[name=semRestr]").val("0");
		
		$("[name=justaCausa]").prop('disabled', false);
		$("[name=regraDeOuro]").prop('disabled', false);
		$("[name=comprometimento]").prop('disabled', false);
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);
	}
	
	if ($("[name=regraDeOuro]").is(":checked") == true){
		$("[name=hiddenRegraDeOuro]").val("1");
		//$("[name=motivoDemissaoRM]").val(4);
		$("[name=semRestricao]").prop('disabled', true);
	}
	
	if ($("[name=comprometimento]").is(":checked") == true){
		$("[name=hiddenComprometimento]").val("1");
	}
	
	if ($("[name=assiduidade]").is(":checked") == true){
		$("[name=hiddenAssiduidade]").val("1");
	}
	
	if ($("[name=produtividade]").is(":checked") == true){
		$("[name=hiddenProdutividade]").val("1");
	}
	
	if ($("[name=pontualidade]").is(":checked") == true){
		$("[name=hiddenPontualidade]").val("1");
	}
	
	if ($("[name=indisciplina]").is(":checked") == true){
		$("[name=hiddenIndisciplina]").val("1");
	}
	
	if ($("[name=seguranca]").is(":checked") == true){
		$("[name=hiddenSeguranca]").val("1");
	}
	
	if ($("[name=justaCausa]").is(":checked") == true){

		$("[name=hiddenJustaCausa]").val("1");
		$("[name=semRestricao]").prop('disabled', true);
		
		//changeMotivDeslig();	
	} 
	
	//É necessário selecionar pelo menos uma restrição.
	if($("[name=semRestricao]").is(":checked") == true
		|| $("[name=justaCausa]").is(":checked") == true
		|| $("[name=regraDeOuro]").is(":checked") == true
		|| $("[name=assiduidade]").is(":checked") == true
		|| $("[name=pontualidade]").is(":checked") == true
		|| $("[name=produtividade]").is(":checked") == true
		|| $("[name=comprometimento]").is(":checked") == true
		|| $("[name=seguranca]").is(":checked") == true
		|| $("[name=indisciplina]").is(":checked") == true){
		
		$("[name=validaResticao]").val(true);
	} else {
		$("[name=validaResticao]").val(false);
	}
	
	if($("[name=justaCausa]").is(":checked") == true
			|| $("[name=regraDeOuro]").is(":checked") == true
			|| $("[name=assiduidade]").is(":checked") == true
			|| $("[name=pontualidade]").is(":checked") == true
			|| $("[name=produtividade]").is(":checked") == true
			|| $("[name=comprometimento]").is(":checked") == true
			|| $("[name=seguranca]").is(":checked") == true
			|| $("[name=indisciplina]").is(":checked") == true){
			
			$("[name=semRestricao]").prop('disabled', true);
		} else {
			$("[name=semRestricao]").prop('disabled', false);
		}
	
	//validaRestricoes();	
	//changeMotivoDemissao();
}