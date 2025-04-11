$(function(){
	var atividadeAtual = buscarAtividadeAtual();
	
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
	else if (atividadeAtual == APROV_DIRETORIA && FORM_MODE == "MOD"){
		aprovacaoDiretor();
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
		$(".motMudancaSalarial").show();
	}
	else if (atividadeAtual == EFETIVAR_ALTERACAO && FORM_MODE == "MOD"){
		efetivarAlteracao();
	}
	else if (atividadeAtual == SUPORTE_TI && FORM_MODE == "MOD"){
		suporteTI();
	}
	if (FORM_MODE == "VIEW"){
		viewAtividades();
		$("[name^=salarioOrigem]").hide();
		$("[name^=salarioProposto]").hide();
		$("[name^=variacaoSalario]").hide();
		$("[name^=salarioAtual]").hide();
		$("[name^=salarioTabela]").hide();
		$(".efetivar").hide();
		removerLixeira();
		$(".filtroCentroCustoProp").hide();
	}
	
});

function viewAtividades(){
	if ($("[name=aprovacaoAlteracao]").val() == ""){
		$(".aprovacaoAlteracao").hide();
	} else {
		$(".aprovacaoAlteracao").show();
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
	viewAtividades();
	$(".efetivar").hide();
	$(".justAbsMed").hide();
	$(".justAbsPro").hide();
	$(".justPrazo").hide();
	FLUIGC.calendar("#dataAlteracao", {minDate: new Date()});	
	$("[name=matrSolicitante]").val(buscarMatriculaUsuarioLogado());
	//preencheChapa(buscarMatriculaUsuarioLogado(), "chapaSolicitante");
	preencheChapaSolicitante(buscarMatriculaUsuarioLogado());
	papelRHUsuarioLogado();	
	regraSolicitante();
	changeFiltroCentroCustoProp();

}

function aprovacaoGerente(){
	viewAtividades();
	removerLixeira();
	$(".aprovacaoAlteracao").show();
	$(".efetivar").hide();
	preencheChapaAprovador(buscarMatriculaUsuarioLogado());
	$(".filtroCentroCustoProp").hide();

}

function aplicaTestes(){
	viewAtividades();
	removerLixeira();
	$(".aprovacaoTestes").show();
	$(".efetivar").hide();
	$("[name=resultadoLaudoProva]").val(verificaLaudoProva(true, "danger", ""));
	$(".filtroCentroCustoProp").hide();
	
}

function aprovacaoGerSede(){
	viewAtividades();
	removerLixeira();
	$(".aprovacaoGerSede").show();
	$(".efetivar").hide();
	$(".filtroCentroCustoProp").hide();
	
}

function aprovaTestes(){
	viewAtividades();
	removerLixeira();
	$(".aprovacaoTestesValida").show();	
	$(".efetivar").hide();
	$("[name=resultadoLaudoProva]").val(verificaLaudoProva(true, "danger", ""));
	$(".filtroCentroCustoProp").hide();
	$(".divManterAddTraf").show();
		
}

function aprovacaoDiretor(){
	viewAtividades();
	removerLixeira();
	$(".aprovacaoDiretoria").show();
	$(".efetivar").hide();
	//preencheChapa(buscarMatriculaUsuarioLogado(), "chapaAprovador");
	preencheChapaAprovador(buscarMatriculaUsuarioLogado());
	$(".filtroCentroCustoProp").hide();

}

function aprovacaoPresidente(){
	viewAtividades();
	removerLixeira();
	$(".aprovacaoPresidente").show();
	$(".efetivar").hide();
	$(".filtroCentroCustoProp").hide();

}

function realizarExames(){
	viewAtividades();
	removerLixeira();
	verificaExame();
	$(".salarioOrigem").hide();
	$(".salarioProposto").hide();
	$(".variacaoSalario").hide();
	$(".aprovacaoExames").show();
	$(".efetivar").hide();
	$(".filtroCentroCustoProp").hide();
	$(".validarSalario").hide();
	
}

function validaDados(){
	viewAtividades();
	removerLixeira();
	$(".validarDadosObra").show();
	$(".efetivar").hide();
	$(".filtroCentroCustoProp").hide();
	$(".validarSalario").hide();
	if($("#possuiAddTranf").val() == 'Sim'){
		$(".divManterAddTraf").show();
		}else{
		$(".divManterAddTraf").hide();
		}
}

function validarSalario(){
	viewAtividades();
	removerLixeira();
	getSalario()
	$("#avaliacao").hide();
	$(".validarSalario").show();
	$(".filtroCentroCustoProp").hide();

}

function efetivarAlteracao(){
	viewAtividades();
	removerLixeira();
	$(".efetivar").show();	
	//verificaExame();
	verificaStatusReq();
	$(".filtroCentroCustoProp").hide();	

}

function suporteTI(){
	$(".salarioOrigem").hide();
	$(".salarioProposto").hide();
	$(".variacaoSalario").hide();
	$(".aprovacaoAlteracao").hide();
	$(".aprovacaoTestes").hide();
	$(".aprovacaoGerSede").hide();
	$(".aprovacaoTestesValida").hide();
	$(".aprovacaoDiretoria").hide();
	$(".aprovacaoPresidente").hide();
	$(".aprovacaoExames").hide();
	$(".validarDadosObra").hide();
	$(".validarSalario").hide();
	$(".efetivar").hide();
	removerLixeira();
	$(".filtroCentroCustoProp").hide();
}

/* ########### FIM VIEW DAS ATIVIADES ############ */


/* ########### INICIO FUNCOES ZOOMS ############ */

function aberturaRateio(){
	
	var indice = wdkAddChild('tbRateioProp');
	$("#percentProp___" + indice).val("100");
	
	var filtroCusto = getFiltroRateio();
	
	reloadZoomFilterValues("centroCustoProp___" + indice, "CODCOLIGADA," + $("[name=codColigada]").val() + ",CODCCUSTO," + $("[name=codCCObraSetor]").val() + ",CODSECAO," + $("[name=codSecao]").val() + ",FILTROCUSTO," + filtroCusto);
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
	} else {
		FLUIGC.toast({
			title : '',
			message : '\u00c9 necess\u00e1rio inserir pelo menos um Rateio no Centro de Custo Proposto.',
			type : 'danger'
		});
	}	
}

function removerLixeira(){
	$("[name=botaoAddRateio]").hide();	
	$("#tbRateioProp tbody tr:gt(0)").each(function() {
		console.log("Remover lixeira");
		var img = $(this).find(".btDeleteRateio");
		img.remove();
	});
}

function preencheCCustoOrigem(){
	var coligada = $("[name=codColigada]").val();
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
/*
function preencheChapa(matricula, campo){
	var c1 = DatasetFactory.createConstraint("USER_CODE", matricula, matricula, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_chapa", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		$("[name=cargoSolicitante]").val(dataset.values[i].CARGO);
		$("[name=funcaoSolicitante]").val(dataset.values[i].GESTAO);
		$("[name=codUsuario]").val(dataset.values[i].CODUSUARIO);
		$("[name=codColigadaSolic]").val(dataset.values[i].CODCOLIGADA);
		$("[name=codSecaoSolicitante]").val(dataset.values[i].CODSECAO);		
		chapa = dataset.values[i].CHAPA;
		$("[name="+campo+"]").val(chapa);
	}
}
*/
function preencheChapaSolicitante(matricula){

	var c1 = DatasetFactory.createConstraint("USER_CODE", matricula, matricula, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_chapa", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		$("[name=cargoSolicitante]").val(dataset.values[i].CARGO);
		$("[name=funcaoSolicitante]").val(dataset.values[i].GESTAO);
		$("[name=codUsuario]").val(dataset.values[i].CODUSUARIO);
		$("[name=codColigadaSolic]").val(dataset.values[i].CODCOLIGADA);
		$("[name=codSecaoSolicitante]").val(dataset.values[i].CODSECAO);
		$("[name=chapaSolicitante]").val(dataset.values[i].CHAPA);
	}
}

function preencheChapaAprovador(matricula){

	var c1 = DatasetFactory.createConstraint("USER_CODE", matricula, matricula, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_chapa", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		$("[name=codColigadaAprovador]").val(dataset.values[i].CODCOLIGADA);
		$("[name=chapaAprovador]").val(dataset.values[i].CHAPA);
	}
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
	}  
}

function retornaAbsenteismo(){
	var chapa = $("[name=chapa]").val();
	var coligada = $("[name=codColigada]").val();
	var c1 = DatasetFactory.createConstraint("CHAPA", chapa, chapa, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_absenteismo", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		$("[name=absenteismoMedico]").val(dataset.values[i].ABSMEDICO);
		$("[name=absenteismoProdutiv]").val(dataset.values[i].ABSPRODUTIVIDADE);		
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
		if(dataset.values[i].processoDadosFuncionais != 'on' && dataset.values[i].codColigada == codColigada && dataset.values[i].codCentroCusto == codCentroCusto){
			window["obraSetor"].clear();	
			FLUIGC.toast({
				title : '',
				message : "A Obra/Setor selecionada n\u00e3o possui Al\u00e7ada de Aprova\u00e7\u00e3o configurada para este processo. Favor contatar a TI.",
				type : 'danger'
			});			
		}
	}
}

/* ########### FIM REGRAS SOLICITANTE ############ */

function changeDataAlteracao(data){
	var dia = data.value.split("/")[0];
	if (dia >= "23" && dia <= "31"){
		$("[name=dataAlteracao]").val("");
		FLUIGC.toast({
			title : '',
			message : 'Solicita\u00e7\u00f5es realizadas entre os dias 23 e 31 somente ser\u00e3o processadas na compet\u00eancia seguinte. Favor selecianar uma data referente a pr\u00f3xima compet\u00eancia.',
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
	var codColigada = $("[name=codColigada]").val();
	var chapa = $("[name=chapaFuncionario]").val();
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", chapa, chapa, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_resultadoExameAlteracaoDados", null, constraints, null);
	if(dataset.values[i].EXAME != ""){
		$("[name^=resultadoExames]").val(dataset.values[i].EXAME);
	} else {		
		FLUIGC.toast({
			title : '',
			message : 'Exame ainda n\u00e3o cadastrado.',
			type : 'danger'
		});
	}
}

function verificaStatusReq(){
	var codColigada = $("[name=codColigada]").val();
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
	var codColigada = $("[name=codColigada]").val();
	var codSecao = $("[name=codSecao]").val();
	var nomeSecao = $("[name=nomeSecao]").val();
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
				variacaoSalarial();
				aberturaRateio();
			} else {
				window["funcaoProposto"].clear();
				$("[name=codFuncaoProposto]").val("");
				FLUIGC.toast({
					title : "",
					message : "N\u00e3o \u00e9 permitido reduzir o sal\u00e1rio do colaborador, solicite atualiza\u00e7\u00e3o da tabela salarial ou proponha outra fun\u00e7\u00e3o para este colaborador.",
					type : "danger"
				});
			}
		} else {
			window["funcaoProposto"].clear();	
			$("[name=codFuncaoProposto]").val("");
			$("[name=salarioProposto]").val("");
			FLUIGC.toast({
				title : "",
				message : "Solicitar ao Setor de Pessoal a vincula\u00e7\u00e3o da lota\u00e7\u00e3o (Fun\u00e7\u00e3o x Se\u00e7\u00e3o).",
				type : "danger"
			});
		}		
	} else {
		window["nomeFaixaProposto"].clear();	
		$("[name=codFaixaProposto]").val("");
		$("[name=codTabelaProposto]").val("");
		
		var msg = "<div style='text-align: left;'";
		msg += "<br><b>Fun\u00e7\u00e3o: </b>" + codFuncaoProposto + " - " + funcaoProposto;
		msg += "<br><b>Se\u00e7\u00e3o: </b>" + codSecao + " - " + nomeSecao;		
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
		//var variacao = arredondar((valProposto / valAtual * 100) - 100);
		var variacao = ((valProposto / valAtual * 100) - 100).toFixed(2);
		$("[name=variacaoSalario]").val(variacao + "%");
		if(valAtual == valProposto){ //if (variacao == 0){
			$(".motMudancaSalarial").hide();
		} else{
			$(".motMudancaSalarial").show();
		}
	} 
}

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
				type : 'warning',
				timeout	: 60000
			});
			
			$(".justPrazo").show();
	    }
	
	}	
	
}

function verificaLaudoProva(exibeMensagem, typeMsg, complemento){

	var retorno = "";
	
	var codColigada = $("[name=codColigada]").val();
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
		
		/*if ($("[name=tipo]").val() == "sede"){
			
			$("[name=notaProvaTecnica]").val("Não se aplica");

			if (LAUDO != "1"){
				
				retorno = retorno + "A função proposta exige realização da Avaliação Psicológica de Segurança. <br>";
				
			} else {
				
				if (LAUDOAPTO == "0"){

					retorno = retorno + "Avaliação Psicológica de Segurança: Inapto <br>";

				} else if (LAUDOAPTO == ""){
						
					retorno = retorno + "A função proposta exige realização da Avaliação Psicológica de Segurança. <br>";	
				}				
			}
			
		} else*/
		if ($("[name=tipo]").val() == "obra"){
			
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
			}else
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

	if($("[name=cargoOrigem]").val() != $("[name=cargoProposto]").val() && $("[name=cargoProposto]").val() == "Soldador"){		

		FLUIGC.toast({
				title : '',
				message : 'Para o cargo de Soldador é necessário anexar o Teste de Solda.<br><br>Retorne ao topo da solicitação para acessar o menu de Anexos e "Carregar Arquivos".',
				type : 'warning',
				timeout	: 60000
			});

	}
	
}

function infoTesteSolda(){
	
	if( $("[name=qtdAnexos]").val() > 0 && $("[name=cargoOrigem]").val() != $("[name=cargoProposto]").val() && $("[name=cargoProposto]").val() == "Soldador"){		

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
	
	var CODCOLIGADA_I = $("[name=codColigada]").val();
	var CHAPA = $("[name=chapaFuncionario]").val();
	var SECAO_PROPOSTA = $("[name=codSecao]").val();
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
				message : 'O salário atual do funcionário é maior que o salário da Tabela Salarial. <br><br> É necessário atualizar a Tabela Salarial de destino antes de concluir a solicitação.',
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
		
	} else {
		
		FLUIGC.toast({
			title : '',
			message : 'Erro ao consultar tabela salarial. (ds_RM_WS141_Salarios)',
			type : 'danger'
		});
	}

}

function validarExistenciaAddTranf(codColigada, chapa){


	dataAtual = new Date();
	dataMesAnterior = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0);
	var mesAnterior = dataMesAnterior.getMonth();
	var anoMesAnterior = dataMesAnterior.getFullYear();
	
	var c1 = DatasetFactory.createConstraint("COLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", chapa, chapa, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("ANOCOMP", anoMesAnterior, anoMesAnterior, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("MESCOMP", parseInt(mesAnterior) +1, parseInt(mesAnterior) +1, ConstraintType.MUST);
	
	var constraints = new Array(c1, c2, c3, c4);
	var dataset = DatasetFactory.getDataset("ds_ConsultaRM_WS202_ConsultaEvento0402NaFichaFinanceira", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		var CODEVENTO= dataset.values[i].CODEVENTO;
		if(CODEVENTO != ''){
			$("#possuiAddTranf").val('Sim');
	
		}else{
			$("#possuiAddTranf").val('Não');
	
		}
	}
}




