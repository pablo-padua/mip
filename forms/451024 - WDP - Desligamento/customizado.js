
$(function(){
	var atividadeAtual = buscarAtividadeAtual();
	papelUsuarioLogado();
	demissaoUrgente();
	buscaAviso();
	changeData();
	persisteResticoes();
	mostraPaiFilho();
	visibleAvisoPrevio();
	aplicarManscaraCampos();
	ativarChangeValidarDt();	

	$("#foto").attr('src', "foto-padrao.jpeg");
	$("[name^=btDeletePerguntas]").hide();
	
	if(($("[name=motivoDemissaoRM]").val() == '') && (atividadeAtual != 0 || atividadeAtual != 4)){
		$("[name=motivoDemissaoRM]").val($("#hidden_motivoDemissaoRM").val())
	}
	
	if ((atividadeAtual == 0 || atividadeAtual == 4) && (FORM_MODE != "NONE")){
		atividadeInicial();
	} else if (atividadeAtual == 16 && FORM_MODE == "MOD"){
		aprovacao1();
	} else if (atividadeAtual == 319 && FORM_MODE == "MOD"){
		aprovacao2();
	} else if (atividadeAtual == 466 && FORM_MODE == "MOD"){
		aprovacaoSede();
	} else if (atividadeAtual == 453 && FORM_MODE == "MOD"){
		aprovacaoRH();
	} else if (atividadeAtual == 113 && FORM_MODE == "MOD"){
		assinarAviso();
	} else if (atividadeAtual == 429 && FORM_MODE == "MOD"){
		verificarAvaliacao();
	} else if (atividadeAtual == 75 && FORM_MODE == "MOD"){
		exameDemissional();
	} else if (atividadeAtual == 227 && FORM_MODE == "MOD"){
		quitacaoTI();
	} else if (atividadeAtual == 385 && FORM_MODE == "MOD"){
		quitacaoEPI();
	} else if (atividadeAtual == 237 && FORM_MODE == "MOD"){
		quitacaoADM();
	} else if (atividadeAtual == 239 && FORM_MODE == "MOD"){
		quitacaoFIN();
	} else if (atividadeAtual == 254 && FORM_MODE == "MOD"){
		entrevista();
	} else if (atividadeAtual == 243 && FORM_MODE == "MOD"){
		cacularRescisaoSede();
	} else if (atividadeAtual == 341 && FORM_MODE == "MOD"){
		calcularRescisaoObra();
	} else if (atividadeAtual == 356 && FORM_MODE == "MOD"){
		validacaoObra();
	} else if (atividadeAtual == 366 && FORM_MODE == "MOD"){
		validacaoSede();
	} else if (atividadeAtual == 358 && FORM_MODE == "MOD"){
		agendarPagamento();
	} else if (atividadeAtual == 247 && FORM_MODE == "MOD"){
		homologar();
		ativBtnAddPaiFilhoDocumentos();
	} else if (atividadeAtual == 483 && FORM_MODE == "MOD"){
		validarDocAso();
	}else if ((atividadeAtual == 303 || atividadeAtual == 384) && FORM_MODE == "MOD"){
		removerLixeiraTI();
		removerLixeiraEPI();
		removerLixeiraADM();
		removerLixeiraFIN();
		removerLixeiraEvento();
		retirarBlocosNaoRespondidos();
		if ($("[name=solicitanteRH]").val() == "true"){
			$("#avaliacao").show();
			$("#divMotivoDemissao").show();
			$("#aprovacao1").show();
			$("#aprovacao2").show();
			$("#assinarAviso").show();
			$("#entrevista").show();
			$("#quitacaoTI").show();
			$("#quitacaoEPI").show();
			$("#quitacaoADM").show();
			$("#quitacaoFIN").show();
			$("#exames").show();
			$("#divValidarExames").show();
			$("#calcularRescisaoObra").show();
			$("#cacularRescisaoSede").show();
			$("#validacaoObra").show();
			$("#validacaoSede").show();
			$("#divAgendarPagamento").show();
			$("#homologar").show();	
		} else {
			$("#avaliacao").hide();
			$("#divMotivoDemissao").hide();
			$("#aprovacao1").hide();
			$("#aprovacao2").hide();
			$("#assinarAviso").hide();
			$("#entrevista").hide();
			$("#quitacaoTI").hide();
			$("#quitacaoEPI").hide();
			$("#quitacaoADM").hide();
			$("#quitacaoFIN").hide();
			$("#exames").hide();
			$("#divValidarExames").hide();
			$("#calcularRescisaoObra").hide();
			$("#cacularRescisaoSede").hide();
			$("#validacaoObra").hide();
			$("#validacaoSede").hide();
			$("#divAgendarPagamento").hide();
			$("#homologar").hide();	
		}
	}
	if (FORM_MODE == "VIEW"){
		removerLixeiraTI();
		removerLixeiraEPI();
		removerLixeiraADM();
		removerLixeiraFIN();
		removerLixeiraEvento();
		retirarBlocosNaoRespondidos();
		changeFuncionario();
		demissaoUrgente();
		$("[name=botaoAddAnexoDoc]").hide();
		if (papelUsuarioLogado() == true){
			$("#avaliacao").show();
			$("#divMotivoDemissao").show();
			$("#aprovacao1").show();
			$("#aprovacao2").show();
			$("#assinarAviso").show();
			$("#entrevista").show();
			$("#quitacaoTI").show();
			$("#quitacaoEPI").show();
			$("#quitacaoADM").show();
			$("#quitacaoFIN").show();
			$("#exames").show();
			$("#divValidarExames").show();
			$("#calcularRescisaoObra").show();
			$("#cacularRescisaoSede").show();
			$("#validacaoObra").show();
			$("#validacaoSede").show();
			$("#divAgendarPagamento").show();
			$("#homologar").show();	
		} else {
			$("#avaliacao").hide();
			$("#divMotivoDemissao").hide();
			$("#aprovacao1").hide();
			$("#aprovacao2").hide();
			$("#assinarAviso").hide();
			$("#entrevista").hide();
			$("#quitacaoTI").hide();
			$("#quitacaoEPI").hide();
			$("#quitacaoADM").hide();
			$("#quitacaoFIN").hide();
			$("#exames").hide();
			$("#divValidarExames").hide();
			$("#calcularRescisaoObra").hide();
			$("#cacularRescisaoSede").hide();
			$("#validacaoObra").hide();
			$("#validacaoSede").hide();
			$("#divAgendarPagamento").hide();
			$("#homologar").hide();	
		}
	}
		
});

function mostraPaiFilho(){	
	if ($("[name^=descPendenciaTI___]").length > 0){
		$(".pendenciasTI").show();
		
	} else {
		$(".pendenciasTI").hide();;
	}
	
	if ($("[name^=descPendenciaEPI___]").length > 0){
		$(".pendenciasEPI").show();
		
	} else {
		$(".pendenciasEPI").hide();;
	}
	
	if ($("[name^=descPendenciaADM___]").length > 0){
		$(".pendenciasADM").show();
		
	} else {
		$(".pendenciasADM").hide();;
	}
	
	if ($("[name^=descPendenciaFIN___]").length > 0){
		$(".pendenciasFIN").show();
		
	} else {
		$(".pendenciasFIN").hide();;
	}
	
	/*if ($("[name^=valorCalculoObra___]").length > 0){
		$(".eventoCalculoObra").show();
		
	} else {
		$(".eventoCalculoObra").hide();;
	}*/
}

function changeData(){
	//on("keydown", function(e) {
	$("[name=dataPrevistaDemissao]").on("change",function(eval) {		
		 //validarDataSextaFeira();
		 demissaoUrgente();
		
	});
	
	$("[name=dataPagamento]").on("change",function(eval) {	
		data = $("[name=dataPagamento]").val();
		carregaLancamentos(data);
	});
	
	$("[name=dataInicioAviso]").on("change",function(eval) {	
		dataDemissaoPrevista();
	});	
}

function atividadeInicial(){	
	$(".estabilidade").hide();
	$(".avisoAfastamento").hide();
	$(".urgente").hide();
	$("#avaliacao").hide();
	$("#divMotivoDemissao").hide();
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").hide();
	$("#entrevista").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();	
	$("[name=matrSolicitante]").val(buscarMatriculaUsuarioLogado());	
	preencheChapa(buscarMatriculaUsuarioLogado(), "chapaSolicitante");	
	

	FLUIGC.calendar("#dataPrevistaDemissao", {minDate: new Date(), /*daysOfWeekDisabled: [5]*/});
	ativarChangeValidarDt();
	aplicarManscaraCampos();
}

function aprovacao1(){
	changeFuncionario();
	changeMotivoDemissao();
	changeRestricoes();
	preencheChapa(buscarMatriculaUsuarioLogado(), "chapaAprovador2");
	$("[name=aprovadorCoordenacao]").val(buscarMatriculaUsuarioLogado());
	
	$("#aprovacao1").show();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").hide();
	$("#entrevista").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();	
	if ($("[name=aprovacao2]").val() == ""){
		$("#aprovacao2").hide();		
	}
	if($("[name=aberturaDP]").val() == 'sim' && $("[name=temAvalQuestionario]").val() == 'sim'){
		$(".tbAvaliacao").show();
		
	}
	
}

function aprovacao2(){
	changeFuncionario();
	changeMotivoDemissao();
	changeRestricoes();
	preencheChapa(buscarMatriculaUsuarioLogado(), "chapaAprovador2");
	$("[name=aprovadorFinal]").val(buscarMatriculaUsuarioLogado());
	
	$("#aprovacao1").hide();
	$("#aprovacao2").show();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").hide();
	$("#entrevista").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();	
	if ($("[name=aprovacao]").val() == ""){
		$("#aprovacao1").hide();		
	}
	if($("[name=aberturaDP]").val() == 'sim' && $("[name=temAvalQuestionario]").val() == 'sim'){
		$(".tbAvaliacao").show();
		
	}
	
	if(FORM_MODE == "MOD" && resultadoAvaliacao() == "Inapto")
		$(".inapto").show();
}

function verificarAvaliacao(){
	
	changeFuncionario();
	changeMotivoDemissao();
	changeRestricoes();
	$("[name=aprovadorVerAval]").val(buscarMatriculaUsuarioLogado());
	
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").show();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").hide();
	$("#entrevista").hide();
	$("#avaliacao").show();
	$("#tbAvaliacao").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();

	if(FORM_MODE == "MOD" && resultadoAvaliacao() == "Inapto")
		$(".inapto").show();
}

function aprovacaoSede(){
	changeFuncionario();
	if ($("[name=aprovacao]").val() == "")
		$("#aprovacao1").hide();		
	else
		$("#aprovacao1").show();
	
	if ($("[name=aprovacao2]").val() == "")
		$("#aprovacao2").hide();		
	else
		$("#aprovacao2").show();
	
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").show();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").hide();
	$("#entrevista").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();	
	if($("[name=aberturaDP]").val() == 'sim' && $("[name=temAvalQuestionario]").val() == 'sim'){
		$(".tbAvaliacao").show();
		
	}
}


function aprovacaoRH(){
	changeFuncionario();
	if ($("[name=aprovacao]").val() == "")
		$("#aprovacao1").hide();		
	else
		$("#aprovacao1").show();
	
	if ($("[name=aprovacao2]").val() == "")
		$("#aprovacao2").hide();		
	else
		$("#aprovacao2").show();
	
	if ($("[name=aprovacaoSede]").val() == "")
		$("#aprovacaoSede").hide();
	else
		$("#aprovacaoSede").show();
	
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoRH").show();
	$("#assinarAviso").hide();
	$("#entrevista").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();	
	if($("[name=aberturaDP]").val() == 'sim' && $("[name=temAvalQuestionario]").val() == 'sim'){
		$(".tbAvaliacao").show();
		
	}
}

function assinarAviso(){
	changeFuncionario();
	$("#avaliacao").hide();
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").show();
	$("#entrevista").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();	
	changeMotivoDemissao();
	

	if ($("[name=valorAviso]").val() == "nao"){
		$(".dataDemissao").show();
		$(".tipoDemissao").hide();
		$(".dataInicioAviso").hide();
		$(".dataDemissaoPrevista").hide();
		$(".tipoAviso").hide();
		$("[name=dataDemissao]").val($("[name=dataPrevistaDemissao]").val());		
	} else if ($("[name=valorAviso]").val() == "sim"){
		$(".dataDemissao").hide();	
		$(".tipoDemissao").show();		
		dataInicioAviso();
		dataDemissaoPrevista();		
	}
	FLUIGC.calendar("#dataInicioAviso", {minDate: new Date()});
	FLUIGC.calendar("#dataDemissaoPrevista", {minDate: new Date()});
	FLUIGC.calendar("#dataDemissao", {minDate: new Date()});
}

function visibleAvisoPrevio(){
	if ($("[name=valorAviso]").val() == "nao"){
		$(".dataDemissao").show();
		$(".tipoDemissao").hide();
		$(".dataInicioAviso").hide();
		$(".dataDemissaoPrevista").hide();
		$(".tipoAviso").hide();
		
	} else if ($("[name=valorAviso]").val() == "sim"){		
		$(".dataDemissao").hide();	
		$(".tipoDemissao").show();		
	}
}

function dataInicioAviso(){
	var dataDeslig = $("[name=dataPrevistaDemissao]").val();	
	var data = dataDeslig.split("/");	
	var dataInicioAviso =  data[2]+"/"+data[1]+"/"+data[0];
	var d = new Date(dataInicioAviso);
	dataInicioAviso = d.setDate(d.getDate()+1);
	dataInicioAviso = new Date(dataInicioAviso);
	var dia = dataInicioAviso.getDate().toString();
	var mes = (dataInicioAviso.getMonth()+1).toString();
	var ano = dataInicioAviso.getFullYear().toString();
	$("#dataInicioAviso").val(formatarData(dia,mes,ano));		
}

function dataDemissaoPrevista(){
	var dataAviso = $("[name=dataInicioAviso]").val();	
	var data = dataAviso.split("/");
	var dataDemissaoPrevista =  data[2]+"/"+data[1]+"/"+data[0];
	var d = new Date(dataDemissaoPrevista);
	dataDemissaoPrevista = d.setDate(d.getDate()+29);
	dataDemissaoPrevista = new Date(dataDemissaoPrevista);
	var dia = dataDemissaoPrevista.getDate().toString();
	var mes = (dataDemissaoPrevista.getMonth()+1).toString();
	var ano = dataDemissaoPrevista.getFullYear().toString();
	$("#dataDemissaoPrevista").val(formatarData(dia,mes,ano));	
}

function formatarData(dia, mes, ano){
	if(dia.length == 1)
		dia = 0+dia;	
	if(mes.length == 1)
		mes = 0+mes;	
	return dia+"/"+mes+"/"+ano;
}

function exameDemissional(){
	changeFuncionario();
	setarDataLanAtestado();
	$(".substituicao").hide();
	$(".avisoPrevio").hide();
	$(".tipoReducao").hide();
	$("#avaliacao").hide();
	$("#divMotivoDemissao").hide();
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").hide();
	$("#entrevista").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").show();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();	
	FLUIGC.calendar("#dataAgendamento", { pickDate: true, pickTime: false,});

}

function quitacaoTI(){	
	changeFuncionario();

	$(".substituicao").hide();
	$(".avisoPrevio").hide();
	$(".tipoReducao").hide();
	$("#avaliacao").hide();
	$("#divMotivoDemissao").hide();
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").hide();
	$("#entrevista").hide();
	$("#quitacaoTI").show();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();	
}

function quitacaoEPI(){
	changeFuncionario();
	
	$(".substituicao").hide();
	$(".avisoPrevio").hide();
	$(".tipoReducao").hide();
	$("#avaliacao").hide();
	$("#divMotivoDemissao").hide();
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").hide();
	$("#entrevista").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").show();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();	
}

function quitacaoADM(){
	changeFuncionario();

	$(".substituicao").hide();
	$(".avisoPrevio").hide();
	$(".tipoReducao").hide();
	$("#avaliacao").hide();
	$("#divMotivoDemissao").hide();
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").hide();
	$("#entrevista").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").show();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();	
}

function quitacaoFIN(){
	changeFuncionario();

	$(".substituicao").hide();
	$(".avisoPrevio").hide();
	$(".tipoReducao").hide();
	$("#avaliacao").hide();
	$("#divMotivoDemissao").hide();
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").hide();
	$("#entrevista").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").show();
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();	
}

function entrevista(){
	changeFuncionario();	

	$(".substituicao").hide();
	$(".avisoPrevio").hide();
	$(".tipoReducao").hide();
	$("#avaliacao").hide();
	$("#divMotivoDemissao").hide();
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").hide();
	$("#entrevista").show();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();
	
	onChange_EntrevistaRealizada();
	if($("#realizado").val() == "nao")
		$(".motivoEntrevista").show();
	else
		$(".motivoEntrevista").hide();
}

function calcularRescisaoObra(){
	changeFuncionario();
	$("#avaliacao").hide();
	$("#assinarAviso").show();
	$("#entrevista").hide();
	/*$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();*/
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").show();
	if($("[name=hiddenAprovCalculoObra]").val() == '0'){
		$("#cacularRescisaoSede").show();
		$(".divAprovCalculoObra").show();
		
	}else{
		$("#cacularRescisaoSede").hide();

	}
	
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();	
	$("#divTabelaConferenciaRCT").show();	
	//$(".checkboxSede ").prop('disabled', true);
	visibleAvisoPrevio();
	aberturaCalculoObra();
	removerLixeiraTI();
	removerLixeiraEPI();
	removerLixeiraADM();
	removerLixeiraFIN();
	carregaDadosExameDemissional();
	validarExibicaoExameDemissional();
	
	if ($("[name=aprovacao]").val() == ""){
		$("#aprovacao1").hide();
	} else {
		$("#aprovacao1").show();
	}
	if ($("[name=aprovacao2]").val() == ""){
		$("#aprovacao2").hide();
	} else {
		$("#aprovacao2").show();	
	}
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();	
	
}

function cacularRescisaoSede(){
	changeFuncionario();
	visibleAvisoPrevio();
	$("#avaliacao").hide();
	$("#assinarAviso").show();
	$("#entrevista").hide();
	/*$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();*/
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").show();
	$("#divAgendarPagamento").hide();
	$("#divTabelaConferenciaRCT").show();	
	//$(".checkboxObra").prop('disabled', true);
	
	if ($("[name=aprovacao]").val() == ""){
		$("#aprovacao1").hide();
	} else {
		$("#aprovacao1").show();
	}
	if ($("[name=aprovacao2]").val() == ""){
		$("#aprovacao2").hide();
	} else {
		$("#aprovacao2").show();
	}
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	if ($("[name=dataCalculoObra]").val() == ""){
		$("#calcularRescisaoObra").hide();
	} else {
		$("#calcularRescisaoObra").show();
	}
	if ($("[name=justificativaValidacaoSede]").val() == ""){
		$("#validacaoSede").hide();
	} else {
		$("#validacaoSede").show();
	}	
	if ($("[name=justificativaValidacaoObra]").val() == ""){
		$("#validacaoObra").hide();
	} else {
		$("#validacaoObra").show();
	}	
	if($("[name=tipo]").val() == "obra"){
		$(".divAprovCalculoObra").show();
	}
	
	
	$("#homologar").hide();	
	removerLixeiraTI();
	removerLixeiraEPI();
	removerLixeiraADM();
	removerLixeiraFIN();
	removerLixeiraEvento();
	carregaDadosExameDemissional();
	validarExibicaoExameDemissional();
}

function validacaoObra(){
	changeFuncionario();
	visibleAvisoPrevio();
	$("#avaliacao").hide();
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").show();
	$("#entrevista").hide();
	$("#quitacaoTI").show();
	$("#quitacaoEPI").show();
	$("#quitacaoADM").show();
	$("#quitacaoFIN").show();
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").show();
	$("#cacularRescisaoSede").show();
	$("#validacaoObra").show();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();	
	$("#divTabelaConferenciaRCT").show();	
	//$(".checkboxSede ").prop('disabled', true);
	removerLixeiraTI();
	removerLixeiraEPI();
	removerLixeiraADM();
	removerLixeiraFIN();
	removerLixeiraEvento();
	carregaLiquidoRescisao();
	validarExibicaoExameDemissional();
}

function validacaoSede(){
	changeFuncionario();
	visibleAvisoPrevio();
	$("#avaliacao").hide();
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").show();
	$("#entrevista").hide();
	$("#quitacaoTI").show();
	$("#quitacaoEPI").show();
	$("#quitacaoADM").show();
	$("#quitacaoFIN").show();
	$("#exames").hide();
	$("#divValidarExames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").show();
	$("#validacaoObra").hide();
	$("#validacaoSede").show();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();
	$("#divTabelaConferenciaRCT").show();
	//$(".checkboxObra").prop('disabled', true);
	//$(".checkboxSede ").prop('disabled', true);
	//$(".checkboxNa ").prop('disabled', true);
	removerLixeiraTI();
	removerLixeiraEPI();
	removerLixeiraADM();
	removerLixeiraFIN();
	removerLixeiraEvento();
	carregaLiquidoRescisao();
	validarExibicaoExameDemissional();
}

function agendarPagamento(){
	changeFuncionario();
	visibleAvisoPrevio();
	$("#avaliacao").hide();
	$("#divMotivoDemissao").hide();
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").show();
	$("#entrevista").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#divValidarExames").show();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").show();
	$("#homologar").hide();	
	removerLixeiraTI();
	removerLixeiraEPI();
	removerLixeiraADM();
	removerLixeiraFIN();
	removerLixeiraEvento();
	
	carregaDataPagamento();
	carregaExameDemissional();
	FLUIGC.calendar("#dataPagamento", {pickDate: true, pickTime: false});

}

function validarDocAso(){
	changeFuncionario();
	visibleAvisoPrevio();
	$("#avaliacao").hide();
	$("#divMotivoDemissao").hide();
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").show();
	$("#entrevista").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#cacularRescisaoSede").hide();
	$("#calcularRescisaoObra").hide();
	$("#divValidarExames").show();
	
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();

	$("#divAgendarPagamento").hide();
	$("#homologar").hide();

	removerLixeiraTI();
	removerLixeiraEPI();
	removerLixeiraADM();
	removerLixeiraFIN();
	removerLixeiraEvento();
	carregaDadosExameDemissional();	
}

function homologar(){	
	changeFuncionario();
	visibleAvisoPrevio();
	$("#avaliacao").hide();	
	$("#divMotivoDemissao").hide();
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").show();
	$("#entrevista").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").show();
	$("#homologar").show();
	removerLixeiraTI();
	removerLixeiraEPI();
	removerLixeiraADM();
	removerLixeiraFIN();
	removerLixeiraEvento();
	FLUIGC.calendar("#dataAssinatura", { pickDate: true, pickTime: false,});
	
}

function fim(){
	changeFuncionario();
	$(".estabilidade").hide();
	$(".avisoAfastamento").hide();
	$(".urgente").hide();
	$("#avaliacao").hide();
	$("#divMotivoDemissao").hide();
	$("#aprovacao1").hide();
	$("#aprovacao2").hide();
	$("#aprovacaoVerificarAvaliacao").hide();
	$("#aprovacaoSede").hide();
	$("#aprovacaoRH").hide();
	$("#assinarAviso").hide();
	$("#entrevista").hide();
	$("#quitacaoTI").hide();
	$("#quitacaoEPI").hide();
	$("#quitacaoADM").hide();
	$("#quitacaoFIN").hide();
	$("#exames").hide();
	$("#calcularRescisaoObra").hide();
	$("#cacularRescisaoSede").hide();
	$("#validacaoObra").hide();
	$("#validacaoSede").hide();
	$("#divAgendarPagamento").hide();
	$("#homologar").hide();	
}

function removerLixeiraTI(){
	$("#tbQuitacaoTI tbody tr:gt(0)").each(function() {
		var img = $(this).find(".btDeleteQuitacaoTI");
		img.remove();
	});
	$('[name=botaoAddPendenciaTI]').hide();
}

function removerLixeiraEPI(){
	$("#tbQuitacaoEPI tbody tr:gt(0)").each(function() {
		var img = $(this).find(".btDeleteQuitacaoEPI");
		img.remove();
	});
	$('[name=botaoAddPendenciaEPI]').hide();
}

function removerLixeiraADM(){
	$("#tbQuitacaoADM tbody tr:gt(0)").each(function() {
		var img = $(this).find(".btDeleteQuitacaoADM");
		img.remove();
	});
	$('[name=botaoAddPendenciaADM]').hide();
}

function removerLixeiraFIN(){
	$("#tbQuitacaoFIN tbody tr:gt(0)").each(function() {
		var img = $(this).find(".btDeleteQuitacaoFIN");
		img.remove();
	});
	$('[name=botaoAddPendenciaFIN]').hide();
}

function removerLixeiraEvento(){
	$("#tbCalculoObra tbody tr:gt(0)").each(function() {
		var img = $(this).find(".btDeleteCalculoObra");
		img.remove();
	});
	$('[name=botaoAddCalculoObra]').hide();
}

function preencheChapa(matricula, campo){
	var c1 = DatasetFactory.createConstraint("USER_CODE", matricula, matricula, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_chapa", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		chapa = dataset.values[i].CHAPA;
		if(campo == 'chapaSolicitante'){
			$("[name=cargoSolicitante]").val(dataset.values[i].CARGO);
			$("[name=codUsuario]").val(dataset.values[i].CODUSUARIO);
			$("[name=codColigadaSolic]").val(dataset.values[i].CODCOLIGADA);
			$("[name="+campo+"]").val(chapa);
		}else if(campo == 'chapaAprovador2'){
			$("[name="+campo+"]").val(chapa);
			$("[name=codColigadaAprovador]").val(dataset.values[i].CODCOLIGADA);
		}
	}
}



function papelUsuarioLogado(){
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

function changeFuncionario(){
	$("#foto").attr('src', "foto-padrao.jpeg");
	var chapa = $("[name=chapaFuncionario]").val();
	var coligada = $("[name=codColigada]").val();
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", chapa, chapa, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_foto", null, constraints, null);
	if(dataset.values.length > 0){	
		for(var i=0; i < dataset.values.length; i++) {
			var foto = dataset.values[i].IMAGEM;
			if (foto != ""){
				$("#foto").attr('src', 'data:image/jpeg;base64,' + foto);
			}
		}
	} else {
		$("#foto").attr('src', "foto-padrao.jpeg");
	}
}

function demissaoUrgente(){
	$(".estabilidade").hide();
	var dataSolicitacao = $("[name=dataSolicitacao]").val();
	var dataPrevistaDemissao = $("[name=dataPrevistaDemissao]").val();
	
	if (dataSolicitacao != "" && dataPrevistaDemissao != ""){
		
		if ((dataSolicitacao == dataPrevistaDemissao) && $("[name=avisoPrevio]:checked").val() != "sim"){
			$(".urgente").show();
		} else {
			$(".urgente").hide();
		}
		
		if ($("[name=estabilidade]").val() != ""){
			$(".estabilidade").show();
		} else {
			$(".estabilidade").hide();
		}
		
		//if ($("[name=avisoAfastamento]").val() == "1"){
		//	$(".avisoAfastamento").show();
		//} else {
		//	$(".avisoAfastamento").hide();
		//}
	}
}

function clickAviso(){
	
	if($("[name=avisoPrevio]:checked").val() == "sim"){
		$(".tipoReducao").show();
		$("[name=valorAviso]").val("sim");
		//changeMotivoDemissao();
		$(".urgente").hide();
		aplicarRegrasPreenchimentoDP();
	} else{
		$(".tipoReducao").hide();
		$("[name=valorAviso]").val("nao");
		demissaoUrgente();
		aplicarRegrasPreenchimentoDP();
	}
	
	var codMot = $("[name=motivoDemissaoRM]").val();
	if ((codMot == "2"
		|| codMot == "3"
		|| codMot == "9"
		|| codMot == "10") && ($("[name=avisoPrevio]:checked").val() == "sim")){
		$("input[name=avisoPrevio]").attr("checked",false);
		FLUIGC.toast({
			title : '',
			message : "Para este motivo de demiss\u00e3o n\u00e3o \u00e9 permitido aviso pr\u00e9vio trabalhado.",
			type : 'danger'
		});
	}
	changeMotivoDemissao();

}

function aberturaQuitacaoTI() { 	
	
	var indice = wdkAddChild('tbQuitacaoTI'); 
	
	$("#valorPendenciaTI___" + indice).maskMoney({
		showSymbol : true,
		symbol : "R$",
		thousands : '.',
		decimal : ',',
		precision : 2,
		allowNegative : true,
		allowZero : true
	});
}

function aberturaQuitacaoEPI() {
	
	var indice = wdkAddChild('tbQuitacaoEPI'); 
	
	$("#valorPendenciaEPI___" + indice).maskMoney({
		showSymbol : true,
		symbol : "R$",
		thousands : '.',
		decimal : ',',
		precision : 2,
		allowNegative : true,
		allowZero : true
	});
	
}

function aberturaQuitacaoADM() { 
	var indice = wdkAddChild('tbQuitacaoADM'); 
	
	$("#valorPendenciaADM___" + indice).maskMoney({
		showSymbol : true,
		symbol : "R$",
		thousands : '.',
		decimal : ',',
		precision : 2,
		allowNegative : true,
		allowZero : true
	});
}

function aberturaQuitacaoFIN() { 
	
	var indice = wdkAddChild('tbQuitacaoFIN'); 
	
	$("#valorPendenciaFIN___" + indice).maskMoney({
		showSymbol : true,
		symbol : "R$",
		thousands : '.',
		decimal : ',',
		precision : 2,
		allowNegative : true,
		allowZero : true
	});
}

function aberturaCalculoObra() { 
	var index = wdkAddChild('tbCalculoObra');
	reloadZoomFilterValues("eventoCalculoObra___" + index, "CODCOLIGADA," + $("[name=codColigada]").val());
	$("#valorCalculoObra___" + index).maskMoney({
		showSymbol : true,
		symbol : "R$",
		thousands : '.',
		decimal : ',',
		precision : 2,
		allowNegative : true,
		allowZero : true
	});
}

function changeAcaoEvento(campo){
	if ($(campo).val() == "1"){
		$("[name=hiddenAcaoCalculoObra]").val("1");
	} else if ($(campo).val() == "2"){
		$("[name=hiddenAcaoCalculoObra]").val("2");
	} else if ($(campo).val() == "3"){
		$("[name=hiddenAcaoCalculoObra]").val("3");
	} else {
		$("[name=hiddenAcaoCalculoObra]").val("");
	}
}

function fnCustomDelete(oElement, nameTable, classFieldSet) {
	if(oElement.className ==  "lixeiraCustomizada buttaoDeleteDoc"){
		deleteDoGedDoc(oElement);
		fnWdkRemoveChild(oElement);
	
	}else{
		fnWdkRemoveChild(oElement);
	}
		
		
}


function retornaPerguntas(chapa){
	$(".tbAvaliacao").hide();
	apagaPerguntas();
	var coligada = $("[name=codColigada]").val();
	var funcaoFunc = $("[name=cargoFunc]").val();
	if (funcaoFunc == "Diretor" || funcaoFunc == "Conselho"){
		$("[name=temAvalQuestionario]").val("nao");
		$(".tbAvaliacao").hide();
	} else {
		var atividadeAtual = buscarAtividadeAtual();
		$("#avaliacao").show();
		$("#divMotivoDemissao").show();
		var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("CHAPA", chapa, chapa, ConstraintType.MUST);
		var fieldAsConstraint = new Array(c1, c2);
		var dataset = DatasetFactory.getDataset("ds_RM_retorna_avaliacao", null, fieldAsConstraint, null);
		if (dataset.values.length >  1){
			$("[name=temAvalQuestionario]").val("sim");		
				$(".tbAvaliacao").show();
				for (var i = 0; i < dataset.values.length; i++) {
					var index = wdkAddChild("tbAvaliacao");
					$("#btDeletePerguntas___" + index).hide();
					$("#codQuestionario___" + index).val(dataset.values[i].CODIGO_QUESTIONARIO);
					$("#codQuestao___" + index).val(dataset.values[i].CODIGO_QUESTAO);
					$("#perguntas___" + index).val(dataset.values[i].TEXTO);
					$("[name=notaAvaliacao___" + index + "]").val(dataset.values[i].RESPOSTA);
				}
			/*
			else if(atividadeAtual == 429 && FORM_MODE == "MOD"){
				$(".tbAvaliacao").show();
				for (var i = 0; i < dataset.values.length; i++) {
					var index = wdkAddChild("tbAvaliacao");
					$("#btDeletePerguntas___" + index).hide();
					$("#codQuestionario___" + index).val(dataset.values[i].CODIGO_QUESTIONARIO);
					$("#codQuestao___" + index).val(dataset.values[i].CODIGO_QUESTAO);
					$("#perguntas___" + index).val(dataset.values[i].TEXTO);
					$("[name=notaAvaliacao___" + index + "]").val(dataset.values[i].RESPOSTA);
				}
			}
		*/
		} else {
			$("[name=temAvalQuestionario]").val("nao");
			$(".tbAvaliacao").hide();
		}
	}
		
	
	if($("[name=aberturaDP]").val() == 'sim'){
		$(".tbAvaliacao").hide();
	}
	
}

function apagaPerguntas(){
	$("[name^=btDeletePerguntas___]").trigger("click");
	
	/*var numPerguntas = $("[name^=perguntas___]").length;
	while(numPerguntas > 0) {
		$("#btDeletePerguntas___" + numPerguntas).trigger('click');
		numPerguntas --;
	}*/
}

function persisteResticoes(){
	verificaValorRestricoes("semRestricao", "hiddenSemRestricao");
	verificaValorRestricoes("justaCausa", "hiddenJustaCausa");
	verificaValorRestricoes("regraDeOuro", "hiddenRegraDeOuro");
	verificaValorRestricoes("comprometimento", "hiddenComprometimento");
	verificaValorRestricoes("assiduidade", "hiddenAssiduidade");
	verificaValorRestricoes("pontualidade", "hiddenPontualidade");
	verificaValorRestricoes("produtividade", "hiddenProdutividade");
	verificaValorRestricoes("indisciplina", "hiddenIndisciplina");
	verificaValorRestricoes("seguranca", "hiddenSeguranca");
}

function verificaValorRestricoes(restricao, valor){
	if($("[name="+valor+"]").val() == "1"){
		$("[name="+restricao+"]").prop("checked", true);
		$("[name=_"+restricao+"]").prop("checked", true);
	} else {
		$("[name="+restricao+"]").prop("checked", false);
		$("[name=_"+restricao+"]").prop("checked", false);
	}
}



function changeMotivDeslig(){
	
	var codMot = $("[name=motivoDemissaoRM]").val();
	$("#hidden_motivoDemissaoRM").val(codMot);
	
	regraAberturaDemissao();
	switch (codMot){
	case "":
		$("[name=semRestr]").val("0");
		
		$("[name=hiddenSemRestricao]").val("0");
		$("[name=hiddenJustaCausa]").val("0");
		$("[name=hiddenRegraDeOuro]").val("0");
		$("[name=hiddenComprometimento]").val("0");
		$("[name=hiddenAssiduidade]").val("0");
		$("[name=hiddenPontualidade]").val("0");
		$("[name=hiddenProdutividade]").val("0");
		$("[name=hiddenSeguranca]").val("0");
		$("[name=hiddenIndisciplina]").val("0");
		
		$("[name=semRestricao]").prop("checked", false);
		$("[name=justaCausa]").prop("checked", false);
		$("[name=regraDeOuro]").prop("checked", false);
		$("[name=comprometimento]").prop("checked", false);
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);		
		$("[name=seguranca]").prop("checked", false);		
		
		$("[name=semRestricao]").prop('disabled', false);			
		$("[name=justaCausa]").prop('disabled', false);		
		$("[name=regraDeOuro]").prop('disabled', false);		
		$("[name=comprometimento]").prop('disabled', false);	
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);
		break;
	case "0":
		$("[name=semRestr]").val("0");
		
		$("[name=hiddenSemRestricao]").val("0");
		$("[name=hiddenJustaCausa]").val("0");
		$("[name=hiddenRegraDeOuro]").val("0");
		$("[name=hiddenComprometimento]").val("0");
		$("[name=hiddenAssiduidade]").val("0");
		$("[name=hiddenPontualidade]").val("0");
		$("[name=hiddenProdutividade]").val("0");
		$("[name=hiddenSeguranca]").val("0");
		$("[name=hiddenIndisciplina]").val("0");
	
		$("[name=semRestricao]").prop("checked", false);
		$("[name=justaCausa]").prop("checked", false);
		$("[name=regraDeOuro]").prop("checked", false);
		$("[name=comprometimento]").prop("checked", false);
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);		
		$("[name=seguranca]").prop("checked", false);		
		
		$("[name=semRestricao]").prop('disabled', false);			
		$("[name=justaCausa]").prop('disabled', true);		
		$("[name=regraDeOuro]").prop('disabled', true);		
		$("[name=comprometimento]").prop('disabled', false);	
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);
	
	
		break;
	case "1":
		$("[name=semRestr]").val("0");
		
		$("[name=hiddenSemRestricao]").val("0");
		$("[name=hiddenJustaCausa]").val("0");
		$("[name=hiddenRegraDeOuro]").val("0");
		$("[name=hiddenComprometimento]").val("0");
		$("[name=hiddenAssiduidade]").val("0");
		$("[name=hiddenPontualidade]").val("0");
		$("[name=hiddenProdutividade]").val("0");
		$("[name=hiddenSeguranca]").val("0");
		$("[name=hiddenIndisciplina]").val("0");
	
		$("[name=semRestricao]").prop("checked", false);
		$("[name=justaCausa]").prop("checked", false);
		$("[name=regraDeOuro]").prop("checked", false);
		$("[name=comprometimento]").prop("checked", false);
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);		
		$("[name=seguranca]").prop("checked", false);		
		
		$("[name=semRestricao]").prop('disabled', false);			
		$("[name=justaCausa]").prop('disabled', true);		
		$("[name=regraDeOuro]").prop('disabled', true);		
		$("[name=comprometimento]").prop('disabled', false);	
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);
		
		break;
	case "2":
		$("[name=semRestr]").val("0");
		
		$("[name=hiddenSemRestricao]").val("0");
		$("[name=hiddenJustaCausa]").val("0");
		$("[name=hiddenRegraDeOuro]").val("0");
		$("[name=hiddenComprometimento]").val("0");
		$("[name=hiddenAssiduidade]").val("0");
		$("[name=hiddenPontualidade]").val("0");
		$("[name=hiddenProdutividade]").val("0");
		$("[name=hiddenSeguranca]").val("0");
		$("[name=hiddenIndisciplina]").val("0");
	
		$("[name=semRestricao]").prop("checked", false);
		$("[name=justaCausa]").prop("checked", false);
		$("[name=regraDeOuro]").prop("checked", false);
		$("[name=comprometimento]").prop("checked", false);
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);		
		$("[name=seguranca]").prop("checked", false);		
		
		$("[name=semRestricao]").prop('disabled', false);			
		$("[name=justaCausa]").prop('disabled', true);		
		$("[name=regraDeOuro]").prop('disabled', true);		
		$("[name=comprometimento]").prop('disabled', false);	
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);
		
		if ($("[name=avisoPrevio]:checked").val() == "sim"){
			$("[name=motivoDemissaoRM]").val("");
			FLUIGC.toast({
				title : '',
				message : "Para este motivo de demiss\u00e3o n\u00e3o \u00e9 permitido aviso pr\u00e9vio trabalhado.",
				type : 'danger'
			});
		}
		
		break;
	case "3":
	
		$("[name=semRestr]").val("0");
		
		$("[name=hiddenSemRestricao]").val("0");
		$("[name=hiddenJustaCausa]").val("1");
		$("[name=hiddenRegraDeOuro]").val("0");
		$("[name=hiddenComprometimento]").val("0");
		$("[name=hiddenAssiduidade]").val("0");
		$("[name=hiddenPontualidade]").val("0");
		$("[name=hiddenProdutividade]").val("0");
		$("[name=hiddenSeguranca]").val("0");
		$("[name=hiddenIndisciplina]").val("0");
	
		$("[name=semRestricao]").prop("checked", false);
		$("[name=justaCausa]").prop("checked", true);
		$("[name=regraDeOuro]").prop("checked", false);
		$("[name=comprometimento]").prop("checked", false);
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);		
		$("[name=seguranca]").prop("checked", false);		
		
		$("[name=semRestricao]").prop('disabled', true);			
		$("[name=justaCausa]").prop('disabled', true);		
		$("[name=regraDeOuro]").prop('disabled', true);		
		$("[name=comprometimento]").prop('disabled', false);	
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);
		
		
		if ($("[name=avisoPrevio]:checked").val() == "sim"){
			$("[name=motivoDemissaoRM]").val("");
			FLUIGC.toast({
				title : '',
				message : "Para este motivo de demiss\u00e3o n\u00e3o \u00e9 permitido aviso pr\u00e9vio trabalhado.",
				type : 'danger'
			});
		}
		break;
	case "4":
	
$("[name=semRestr]").val("0");
		
		$("[name=hiddenSemRestricao]").val("0");
		$("[name=hiddenJustaCausa]").val("0");
		$("[name=hiddenRegraDeOuro]").val("1");
		$("[name=hiddenComprometimento]").val("0");
		$("[name=hiddenAssiduidade]").val("0");
		$("[name=hiddenPontualidade]").val("0");
		$("[name=hiddenProdutividade]").val("0");
		$("[name=hiddenSeguranca]").val("0");
		$("[name=hiddenIndisciplina]").val("0");
	
		$("[name=semRestricao]").prop("checked", false);
		$("[name=justaCausa]").prop("checked", false);
		$("[name=regraDeOuro]").prop("checked", true);
		$("[name=comprometimento]").prop("checked", false);
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);		
		$("[name=seguranca]").prop("checked", false);		
		
		$("[name=semRestricao]").prop('disabled', true);			
		$("[name=justaCausa]").prop('disabled', true);		
		$("[name=regraDeOuro]").prop('disabled', true);		
		$("[name=comprometimento]").prop('disabled', false);	
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);
		
		
		break;
	case "5":
	
		$("[name=semRestr]").val("0");
		
		$("[name=hiddenSemRestricao]").val("0");
		$("[name=hiddenJustaCausa]").val("0");
		$("[name=hiddenRegraDeOuro]").val("0");
		$("[name=hiddenComprometimento]").val("0");
		$("[name=hiddenAssiduidade]").val("0");
		$("[name=hiddenPontualidade]").val("0");
		$("[name=hiddenProdutividade]").val("0");
		$("[name=hiddenSeguranca]").val("0");
		$("[name=hiddenIndisciplina]").val("0");
		
		$("[name=semRestricao]").prop("checked", false);
		$("[name=justaCausa]").prop("checked", false);
		$("[name=regraDeOuro]").prop("checked", false);
		$("[name=comprometimento]").prop("checked", false);
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);		
		$("[name=seguranca]").prop("checked", false);		
		
		$("[name=semRestricao]").prop('disabled', true);			
		$("[name=justaCausa]").prop('disabled', true);		
		$("[name=regraDeOuro]").prop('disabled', true);		
		$("[name=comprometimento]").prop('disabled', false);	
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);
	
		break;
	case "6":
	
		$("[name=semRestr]").val("0");
		
		$("[name=hiddenSemRestricao]").val("0");
		$("[name=hiddenJustaCausa]").val("0");
		$("[name=hiddenRegraDeOuro]").val("0");
		$("[name=hiddenComprometimento]").val("0");
		$("[name=hiddenAssiduidade]").val("0");
		$("[name=hiddenPontualidade]").val("0");
		$("[name=hiddenProdutividade]").val("0");
		$("[name=hiddenSeguranca]").val("0");
		$("[name=hiddenIndisciplina]").val("0");
		
		$("[name=semRestricao]").prop("checked", false);
		$("[name=justaCausa]").prop("checked", false);
		$("[name=regraDeOuro]").prop("checked", false);
		$("[name=comprometimento]").prop("checked", false);
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);		
		$("[name=seguranca]").prop("checked", false);		
		
		$("[name=semRestricao]").prop('disabled', false);			
		$("[name=justaCausa]").prop('disabled', true);		
		$("[name=regraDeOuro]").prop('disabled', true);		
		$("[name=comprometimento]").prop('disabled', false);	
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);
			aplicarRegrasPreenchimentoDP();
			if($("[name=aberturaDP]").val() != ''){
				$(".tbAvaliacao").hide();
			}
		break;
	case "7":
		
		$("[name=semRestr]").val("0");
		
		$("[name=hiddenSemRestricao]").val("0");
		$("[name=hiddenJustaCausa]").val("0");
		$("[name=hiddenRegraDeOuro]").val("0");
		$("[name=hiddenComprometimento]").val("1");
		$("[name=hiddenAssiduidade]").val("0");
		$("[name=hiddenPontualidade]").val("0");
		$("[name=hiddenProdutividade]").val("0");
		$("[name=hiddenSeguranca]").val("0");
		$("[name=hiddenIndisciplina]").val("0");
		
		$("[name=semRestricao]").prop("checked", false);
		$("[name=justaCausa]").prop("checked", false);
		$("[name=regraDeOuro]").prop("checked", false);
		$("[name=comprometimento]").prop("checked", true);
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);		
		$("[name=seguranca]").prop("checked", false);		
					
		$("[name=semRestricao]").prop('disabled', true);	
		$("[name=justaCausa]").prop('disabled', true);		
		$("[name=regraDeOuro]").prop('disabled', true);		
		$("[name=comprometimento]").prop('disabled', true);	
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);
					
		break;
	case "8":
	
		$("[name=semRestr]").val("0");
		
		$("[name=hiddenSemRestricao]").val("0");
		$("[name=hiddenJustaCausa]").val("0");
		$("[name=hiddenRegraDeOuro]").val("0");
		$("[name=hiddenComprometimento]").val("0");
		$("[name=hiddenAssiduidade]").val("0");
		$("[name=hiddenPontualidade]").val("0");
		$("[name=hiddenProdutividade]").val("0");
		$("[name=hiddenSeguranca]").val("0");
		$("[name=hiddenIndisciplina]").val("0");
	
		$("[name=semRestricao]").prop("checked", false);
		$("[name=justaCausa]").prop("checked", false);
		$("[name=regraDeOuro]").prop("checked", false);
		$("[name=comprometimento]").prop("checked", false);
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);		
		$("[name=seguranca]").prop("checked", false);		
		
		$("[name=semRestricao]").prop('disabled', false);			
		$("[name=justaCausa]").prop('disabled', true);		
		$("[name=regraDeOuro]").prop('disabled', true);		
		$("[name=comprometimento]").prop('disabled', false);	
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);

		break;
	case "9":
		
		$("[name=semRestr]").val("1");
		
		$("[name=hiddenSemRestricao]").val("1");
		$("[name=hiddenJustaCausa]").val("0");
		$("[name=hiddenRegraDeOuro]").val("0");
		$("[name=hiddenComprometimento]").val("0");
		$("[name=hiddenAssiduidade]").val("0");
		$("[name=hiddenPontualidade]").val("0");
		$("[name=hiddenProdutividade]").val("0");
		$("[name=hiddenSeguranca]").val("0");
		$("[name=hiddenIndisciplina]").val("0");
		
		$("[name=semRestricao]").prop("checked", true);
		$("[name=justaCausa]").prop("checked", false);
		$("[name=regraDeOuro]").prop("checked", false);
		$("[name=comprometimento]").prop("checked", false);
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);		
		$("[name=seguranca]").prop("checked", false);		
					
		$("[name=semRestricao]").prop("disabled", true);
		$("[name=justaCausa]").prop('disabled', true);		
		$("[name=regraDeOuro]").prop('disabled', true);		
		$("[name=comprometimento]").prop('disabled', true);	
		$("[name=assiduidade]").prop('disabled', true);
		$("[name=pontualidade]").prop('disabled', true);
		$("[name=produtividade]").prop('disabled', true);
		$("[name=indisciplina]").prop('disabled', true);
		$("[name=seguranca]").prop('disabled', true);
	
		
		if ($("[name=avisoPrevio]:checked").val() == "sim"){
			$("[name=motivoDemissaoRM]").val("");
			FLUIGC.toast({
				title : '',
				message : "Para este motivo de demiss\u00e3o n\u00e3o \u00e9 permitido aviso pr\u00e9vio trabalhado.",
				type : 'danger'
			});
		}
		aplicarRegrasPreenchimentoDP();
		if($("[name=aberturaDP]").val() != ''){
			$(".tbAvaliacao").hide();
		}
		break;
	case "10":
		$("[name=semRestr]").val("0");
		
		$("[name=hiddenSemRestricao]").val("0");
		$("[name=hiddenJustaCausa]").val("0");
		$("[name=hiddenRegraDeOuro]").val("0");
		$("[name=hiddenComprometimento]").val("0");
		$("[name=hiddenAssiduidade]").val("0");
		$("[name=hiddenPontualidade]").val("0");
		$("[name=hiddenProdutividade]").val("0");
		$("[name=hiddenSeguranca]").val("0");
		$("[name=hiddenIndisciplina]").val("0");
	
		$("[name=semRestricao]").prop("checked", false);
		$("[name=justaCausa]").prop("checked", false);
		$("[name=regraDeOuro]").prop("checked", false);
		$("[name=comprometimento]").prop("checked", false);
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);		
		$("[name=seguranca]").prop("checked", false);		
		
		$("[name=semRestricao]").prop('disabled', false);			
		$("[name=justaCausa]").prop('disabled', true);		
		$("[name=regraDeOuro]").prop('disabled', true);		
		$("[name=comprometimento]").prop('disabled', false);	
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);
		
		if ($("[name=avisoPrevio]:checked").val() == "sim"){
			$("[name=motivoDemissaoRM]").val("");
			FLUIGC.toast({
				title : '',
				message : "Para este motivo de demiss\u00e3o n\u00e3o \u00e9 permitido aviso pr\u00e9vio trabalhado.",
				type : 'danger'
			});
		}
		break;
	case "11":
		$("[name=semRestr]").val("0");
		
		$("[name=hiddenSemRestricao]").val("0");
		$("[name=hiddenJustaCausa]").val("0");
		$("[name=hiddenRegraDeOuro]").val("0");
		$("[name=hiddenComprometimento]").val("0");
		$("[name=hiddenAssiduidade]").val("0");
		$("[name=hiddenPontualidade]").val("0");
		$("[name=hiddenProdutividade]").val("0");
		$("[name=hiddenSeguranca]").val("0");
		$("[name=hiddenIndisciplina]").val("0");
	
		$("[name=semRestricao]").prop("checked", false);
		$("[name=justaCausa]").prop("checked", false);
		$("[name=regraDeOuro]").prop("checked", false);
		$("[name=comprometimento]").prop("checked", false);
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);		
		$("[name=seguranca]").prop("checked", false);		
		
		$("[name=semRestricao]").prop('disabled', true);			
		$("[name=justaCausa]").prop('disabled', true);		
		$("[name=regraDeOuro]").prop('disabled', true);		
		$("[name=comprometimento]").prop('disabled', false);	
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);
		break;
	case "12":
		$("[name=semRestr]").val("0");
		
		$("[name=hiddenSemRestricao]").val("0");
		$("[name=hiddenJustaCausa]").val("1");
		$("[name=hiddenRegraDeOuro]").val("0");
		$("[name=hiddenComprometimento]").val("0");
		$("[name=hiddenAssiduidade]").val("0");
		$("[name=hiddenPontualidade]").val("0");
		$("[name=hiddenProdutividade]").val("0");
		$("[name=hiddenSeguranca]").val("0");
		$("[name=hiddenIndisciplina]").val("0");
	
		$("[name=semRestricao]").prop("checked", false);
		$("[name=justaCausa]").prop("checked", true);
		$("[name=regraDeOuro]").prop("checked", false);
		$("[name=comprometimento]").prop("checked", false);
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);		
		$("[name=produtividade]").prop("checked", false);		
		$("[name=indisciplina]").prop("checked", false);		
		$("[name=seguranca]").prop("checked", false);		
		
		$("[name=semRestricao]").prop('disabled', true);			
		$("[name=justaCausa]").prop('disabled', true);		
		$("[name=regraDeOuro]").prop('disabled', true);		
		$("[name=comprometimento]").prop('disabled', false);	
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);
		break;		
	}
	validaRestricoes();
	changeMotivoDemissao();
}

function changeDemaisRestricoes(){
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
	
	if ($("[name=semRestricao]").is(":checked") == true || $("[name=_semRestricao]").is(":checked") == true){
		$("[name=semRestr]").val("1");
		$("[name=hiddenSemRestricao]").val("1");
		$("[name=justaCausa]").prop("checked", false);
		$("[name=justaCausa]").prop('disabled', true);
		$("[name=regraDeOuro]").prop("checked", false);
		$("[name=regraDeOuro]").prop('disabled', true);
		$("[name=comprometimento]").prop("checked", false);
		$("[name=comprometimento]").prop('disabled', true);		
		$("[name=assiduidade]").prop("checked", false);
		$("[name=pontualidade]").prop("checked", false);
		$("[name=produtividade]").prop("checked", false);
		$("[name=indisciplina]").prop("checked", false);
		$("[name=seguranca]").prop("checked", false);
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
	if ($("[name=regraDeOuro]").is(":checked") == true || $("[name=_regraDeOuro]").is(":checked") == true){
		$("[name=hiddenRegraDeOuro]").val("1");
		$("[name=motivoDemissaoRM]").val(4);
		$("[name=semRestricao]").prop('disabled', true);			
		$("[name=justaCausa]").prop('disabled', true);		
		$("[name=regraDeOuro]").prop('disabled', true);	
	}
	if ($("[name=comprometimento]").is(":checked") == true || $("[name=_comprometimento]").is(":checked") == true){
		$("[name=hiddenComprometimento]").val("1");
	}
	if ($("[name=assiduidade]").is(":checked") == true || $("[name=_assiduidade]").is(":checked") == true){
		$("[name=hiddenAssiduidade]").val("1");
	}
	if ($("[name=produtividade]").is(":checked") == true || $("[name=_produtividade]").is(":checked") == true){
		$("[name=hiddenProdutividade]").val("1");
	}
	if ($("[name=pontualidade]").is(":checked") == true || $("[name=_pontualidade]").is(":checked")){
		$("[name=hiddenPontualidade]").val("1");
	}
	if ($("[name=indisciplina]").is(":checked") == true || $("[name=_indisciplina]").is(":checked") == true){
		$("[name=hiddenIndisciplina]").val("1");
	}
	if ($("[name=seguranca]").is(":checked") == true || $("[name=_seguranca]").is(":checked") == true){
		$("[name=hiddenSeguranca]").val("1");
	}
	if ($("[name=justaCausa]").is(":checked") == true || $("[name=_justaCausa]").is(":checked") == true){
		if ($("[name=avisoPrevio]:checked").val() == "sim" || $("[name=_avisoPrevio]:checked").val() == "sim"){
			//$("[name=motivoDemissaoRM]").val("");
			$("[name=justaCausa]").prop("checked", false);
			FLUIGC.toast({
				title : '',
				message : "Para este motivo de demiss\u00e3o n\u00e3o \u00e9 permitido aviso pr\u00e9vio trabalhado.",
				type : 'danger'
			});
		} else {
			$("[name=hiddenJustaCausa]").val("1");
			if ($("[name=motivoDemissaoRM]").val() != 12){
				$("[name=motivoDemissaoRM]").val(3);
			}
			$("[name=semRestricao]").prop('disabled', true);			
			$("[name=justaCausa]").prop('disabled', true);		
			$("[name=regraDeOuro]").prop('disabled', true);	
		}
		//changeMotivDeslig();	
	} 
	
	//É necessário selecionar pelo menos uma restrição.
	if($("[name=semRestricao]").is(":checked") == true || $("[name=_semRestricao]").is(":checked") == true
		|| $("[name=justaCausa]").is(":checked") == true || $("[name=_justaCausa]").is(":checked") == true
		|| $("[name=regraDeOuro]").is(":checked") == true || $("[name=_regraDeOuro]").is(":checked") == true
		|| $("[name=assiduidade]").is(":checked") == true || $("[name=_assiduidade]").is(":checked") == true
		|| $("[name=pontualidade]").is(":checked") == true || $("[name=_pontualidade]").is(":checked") == true
		|| $("[name=produtividade]").is(":checked") == true || $("[name=_produtividade]").is(":checked") == true
		|| $("[name=comprometimento]").is(":checked") == true || $("[name=_comprometimento]").is(":checked") == true
		|| $("[name=seguranca]").is(":checked") == true || $("[name=_seguranca]").is(":checked") == true
		|| $("[name=indisciplina]").is(":checked") == true || $("[name=_indisciplina]").is(":checked") == true){
		
		$("[name=validaResticao]").val(true);
	} else {
		$("[name=validaResticao]").val(false);
	}
	
	validaRestricoes();	
	//changeMotivoDemissao();
}

function validaRestricoes(){
	var arrayPaiFilho = $(".restricoes");
	var cont = arrayPaiFilho.length;
	for (var i = 0; i < arrayPaiFilho.length; i++){
		var elementoCompleto = arrayPaiFilho[i].name;
		if ($('[name='+elementoCompleto+']').is(":checked") == false){
			cont --;
		}
	}
	
	if (cont == 0){
		$("[name=validaResticao]").val(false);
	} else {
		$("[name=validaResticao]").val(true);
	}
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
	
	/*var indice = getIndice(campo);
	var valorAval = $("#valorAvaliacao___" + indice).val();
	$("[name=notaAvaliacao___" + indice +"]").val(valorAval);*/
	
}

function manipulaRestricoes(){
	
	var codMot = $("[name=motivoDemissaoRM]").val();
	if ((codMot == "2"
		|| codMot == "3"
		|| codMot == "9"
		|| codMot == "10") && ($("[name=avisoPrevio]:checked").val() == "sim")){
		//$("[name=motivoDemissaoRM]").val("");
		FLUIGC.toast({
			title : '',
			message : "Para este motivo de demiss\u00e3o n\u00e3o \u00e9 permitido aviso pr\u00e9vio trabalhado.",
			type : 'danger'
		});
	}
	
	if($("[name=avisoPrevio]:checked").val() == "sim"){	
		changeMotivoDemissao();
	}
	
	$("[name=semRestricao]").prop("checked", false);
	$("[name=justaCausa]").prop("checked", false);
	$("[name=regraDeOuro]").prop("checked", false);
	$("[name=assiduidade]").prop("checked", false);
	$("[name=pontualidade]").prop("checked", false);
	$("[name=produtividade]").prop("checked", false);
	$("[name=comprometimento]").prop("checked", false);
	$("[name=indisciplina]").prop("checked", false);
	$("[name=seguranca]").prop("checked", false);
	
	
	//É necessário selecionar pelo menos uma restrição.
	if($("[name=semRestricao]").is(":checked") == false
		&& $("[name=justaCausa]").is(":checked") == false
		&& $("[name=regraDeOuro]").is(":checked") == false
		&& $("[name=assiduidade]").is(":checked") == false
		&& $("[name=pontualidade]").is(":checked") == false
		&& $("[name=produtividade]").is(":checked") == false
		&& $("[name=comprometimento]").is(":checked") == false
		&& $("[name=seguranca]").is(":checked") == false
		&& $("[name=indisciplina]").is(":checked") == false){

	}
	
	if($("[name=semRestricao]").is(":checked") == true 
		&& $("[name=motivoDemissaoRM]").val() != "3" // justaCausa
		&& $("[name=motivoDemissaoRM]").val() != "4" //quebraRegraOuro
		&& $("[name=motivoDemissaoRM]").val() != "5" //baixoDesempenho
		&& $("[name=motivoDemissaoRM]").val() != "7" // forcarDemissao
		&& $("[name=motivoDemissaoRM]").val() != "11" //naoAtendeNormas
		&& $("[name=motivoDemissaoRM]").val() != "12"){ //decisaoJudicial
		
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
	if($("[name=semRestricao]").is(":checked") == false){

		$("[name=justaCausa]").prop('disabled', false);
		$("[name=regraDeOuro]").prop('disabled', false);
		$("[name=assiduidade]").prop('disabled', false);
		$("[name=pontualidade]").prop('disabled', false);
		$("[name=produtividade]").prop('disabled', false);
		$("[name=comprometimento]").prop('disabled', false);
		$("[name=indisciplina]").prop('disabled', false);
		$("[name=seguranca]").prop('disabled', false);
	} 
	if ($("[name=motivoDemissaoRM]").val() == "3" // justaCausa
			|| $("[name=motivoDemissaoRM]").val() == "4" //quebraRegraOuro
			|| $("[name=motivoDemissaoRM]").val() == "5" //baixoDesempenho
			|| $("[name=motivoDemissaoRM]").val() == "7" // forcarDemissao
			|| $("[name=motivoDemissaoRM]").val() == "11" //naoAtendeNormas
			|| $("[name=motivoDemissaoRM]").val() == "12"){ //decisaoJudicial

		$("[name=semRestricao]").prop("checked", false);
		$("[name=semRestricao]").prop('disabled', true);
	}
	
	if ($("[name=motivoDemissaoRM]").val() == "3" // justaCausa
		|| $("[name=motivoDemissaoRM]").val() == "12"){ //decisaoJudicial

		$("[name=justaCausa]").prop("checked", true);
		$("[name=justaCausa]").prop('disabled', true);
	}
	
	if ($("[name=motivoDemissaoRM]").val() == "4"){ //quebraRegraOuro

		$("[name=regraDeOuro]").prop("checked", true);
		$("[name=regraDeOuro]").prop('disabled', true);
	}
		
	if ($("[name=motivoDemissaoRM]").val() == "7"){ // forcarDemissao

		$("[name=comprometimento]").prop("checked", true);
		$("[name=comprometimento]").prop('disabled', true);
	}
	
	if ($("[name=motivoDemissaoRM]").val() == "9"){ // falecimento

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
	
}

function aprovadores(){
	if ($("[name=tipo]").val() == "sede"){
		var PARAM_CODCOLIGADA = $("[name=codColigada]").val();
		var PARAM_CODSECAO = $("[name=codSecao]").val();
		
		var c1 = DatasetFactory.createConstraint("PARAM_CODCOLIGADA", PARAM_CODCOLIGADA, PARAM_CODCOLIGADA, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("PARAM_CODSECAO", PARAM_CODSECAO, PARAM_CODSECAO, ConstraintType.MUST);
	
		var constraints = new Array(c1, c2);
		var dataset = DatasetFactory.getDataset("ds_ConsultaRM_WS084_RetornaAprovadorSedeGerente", null, constraints, null);
			if(dataset.values[0].USERID != ''){
				$("[name=aprovador1Alcada]").val(dataset.values[0].USERID);
			}else{
				window["funcionario"].clear();	
				$("#foto").attr('src', "foto-padrao.jpeg");
				$("[name=chapa]").val("");
				$("[name=funcao]").val("");
				$("[name=dataAdmissao]").val("");
				$("[name=secao]").val("");
				$("[name=centroCusto]").val("");
				$(".tbAvaliacao").hide();
				apagaPerguntas();
				
				FLUIGC.toast({
					title : '',
					message : 'Não foi localizado no cadastro de chefe/supervisor nenhum responsával pela seção. Favor verificar!',
					type : 'danger'
				});
			}
		
		cargo = $("[name=cargoFunc]").val();		
		if (cargo == "Gerente"
			|| cargo == "Diretor"
			|| cargo == "Conselho"){
			var presidente = $("[name=codAprovadorPresid]").val();
			//$("[name=aprovador1Alcada]").val("");
			$("[name=aprovador2Alcada]").val(presidente);
		} else{
			var codAprovador = $("[name=codAprovador]").val();
			//$("[name=aprovador1Alcada]").val("");
			$("[name=aprovador2Alcada]").val(codAprovador);
		}
		
		if($("[name=estabilidade]").val() != ""){
			
			$("[name=aprovador2Alcada]").val("Pool:Role:605");
			
		}
		
	} else if ($("[name=tipo]").val() == "obra"){
		
		var PARAM_CODCOLIGADA = $("[name=codColigada]").val();
		var PARAM_CHAPA = $("[name=chapaFuncionario]").val();
		var PARAM_CODCCUSTO = $("[name=codCCObraSetor]").val();
		
		var c1 = DatasetFactory.createConstraint("CODCOLIGADA", PARAM_CODCOLIGADA, PARAM_CODCOLIGADA, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("CHAPA", PARAM_CHAPA, PARAM_CHAPA, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("CODCCUSTO", PARAM_CODCCUSTO, PARAM_CODCCUSTO, ConstraintType.MUST);
	
		var constraints = new Array(c1, c2, c3);
		var dataset = DatasetFactory.getDataset("ds_RM_WS154_WRH03_Aprovadores", null, constraints, null);

		if (dataset.values.length > 0){
			$("[name=aprovador1Alcada]").val(dataset.values[0].APROVADOR1);
			$("[name=aprovador2Alcada]").val(dataset.values[0].APROVADOR2);
		}
		
		if($("[name=estabilidade]").val() != ""){
			
			$("[name=aprovador2Alcada]").val("Pool:Role:605");
			
		} else if($("[name=gestao]").val() == "1") {
			
			var constraints = [];
			constraints.push(DatasetFactory.createConstraint("codColigada", PARAM_CODCOLIGADA, PARAM_CODCOLIGADA, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("codCentroCusto", PARAM_CODCCUSTO, PARAM_CODCCUSTO, ConstraintType.MUST));
			
			var dataset = DatasetFactory.getDataset("ds_alcada_aprovacao", null, constraints, null);
			
			var codAprovadorDiretor = "Pool:Role:" + dataset.values[0].codAprovadorDiretor;
			$("[name=aprovador2Alcada]").val(codAprovadorDiretor);
			
		}
		
		getGerSede();
		
	}	
}

function changeMotivoDemissao(){
	var coligada = $("[name=codColigada]").val();
	var chapa = $("[name=chapaSolicitante]").val();
	var codMot = $("[name=motivoDemissaoRM]").val();
	var tipoReduc = $("[name=tipoReducao]").val();
	var c1 = DatasetFactory.createConstraint("TIPOREDUCAO", tipoReduc, tipoReduc, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CHAPA", chapa, chapa, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("CODMOTIVODEMISSAO", codMot, codMot, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3, c4);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_tipoDemissao", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		$("[name=codTipoAviso]").val(dataset.values[i].CODTIPOAVISOPREVIO);
		$("[name=tipoAviso]").val(dataset.values[i].TIPOAVISOPREVIO);
		$("[name=codTipoDemissao]").val(dataset.values[i].CODTIPODEMISSAORM);
		$("[name=tipoDemissao]").val(dataset.values[i].TIPODEMISSAORM);
	}		
} 

function changeQuitacaoTI(){
	if($("[name=pendencia]:checked").val() == "sim"){
		$(".pendenciasTI").show();
	}else {
		$(".pendenciasTI").hide();
	}
}

function changeQuitacaoEPI(){
	if($("[name=pendenciaEPI]:checked").val() == "sim"){
		$(".pendenciasEPI").show();
	} else {
		$(".pendenciasEPI").hide();
	}
}

function changeQuitacaoADM(){
	if($("[name=pendenciaADM]:checked").val() == "sim"){
		$(".pendenciasADM").show();
	}else {
		$(".pendenciasADM").hide();
	}
}

function changeQuitacaoFIN(){
	if($("[name=pendenciaFIN]:checked").val() == "sim"){
		$(".pendenciasFIN").show();
	}else {
		$(".pendenciasFIN").hide();
	}
}

function regraAberturaDemissao(){
	
	if($("[name=tipo]").val() == "obra"){
		
		var cargo = $("[name=cargoSolicitante]").val();
		
		if( ( cargo != "Gerente" && cargo != "Diretor" && $("[name=gestao]").val() == '1' ) ){
			if(!($("[name=motivoDemissaoRM]").val() == "6" || $("[name=motivoDemissaoRM]").val() == "9")){
			window["funcionario"].clear();	
			$("#foto").attr('src', "foto-padrao.jpeg");
			$("[name=chapa]").val("");
			$("[name=funcao]").val("");
			$("[name=dataAdmissao]").val("");
			$("[name=secao]").val("");
			$("[name=centroCusto]").val("");
			$(".tbAvaliacao").hide();
			apagaPerguntas();
			FLUIGC.toast({
				title : '',
				message : 'Você não tem permissão para desligar colaborador em cargo de gestão.',
				type : 'danger'
			});
		}
	}
		if(( cargo != "Gerente" && cargo != "Diretor" && $("[name=estabilidade]").val() != '')){
			window["funcionario"].clear();	
			$("#foto").attr('src', "foto-padrao.jpeg");
			$("[name=chapa]").val("");
			$("[name=funcao]").val("");
			$("[name=dataAdmissao]").val("");
			$("[name=secao]").val("");
			$("[name=centroCusto]").val("");
			//$("[name=msgEstabilidade]").val("Funcionário escolhido para ser demitido possui ESTABILIDADE! " + $("[name=estabilidade]").val());			
			FLUIGC.toast({
				title : '',
				message : "Funcionário escolhido para ser demitido possui ESTABILIDADE! " + $("[name=estabilidade]").val(),
				type : 'warning'
			});
		} else if($("[name=estabilidade]").val() != ''){
			$(".estabilidade").show();
			//$("[name=msgEstabilidade]").val("Funcionário escolhido para ser demitido possui ESTABILIDADE! " + $("[name=estabilidade]").val());
			FLUIGC.toast({
				title : '',
				message : "Funcionário escolhido para ser demitido possui ESTABILIDADE! " + $("[name=estabilidade]").val(),
				type : 'danger'
			});
		} 	
		
	} else if ($("[name=tipo]").val() == "sede" ){
		if(!($("[name=motivoDemissaoRM]").val() == "6" || $("[name=motivoDemissaoRM]").val() == "9")){
		if ($("[name=cargoSolicitante]").val() != "Diretor" && $("[name=cargo]").val() == "Gerente"){
			window["funcionario"].clear();	
			$("#foto").attr('src', "foto-padrao.jpeg");
			$("[name=chapa]").val("");
			$("[name=funcao]").val("");
			$("[name=dataAdmissao]").val("");
			$("[name=secao]").val("");
			$("[name=centroCusto]").val("");
			$(".tbAvaliacao").hide();
			apagaPerguntas();
			FLUIGC.toast({
				title : '',
				message : 'Você não tem permissão para desligar colaborador em cargo de gestão.',
				type : 'danger'
			});
		}else if ($("[name=solicitanteRH]").val() == false && ($("[name=cargo]").val() == "Diretor" || $("[name=cargo]").val() == "Conselho")) {
			window["funcionario"].clear();	
			$("#foto").attr('src', "foto-padrao.jpeg");
			$("[name=chapa]").val("");
			$("[name=funcao]").val("");
			$("[name=dataAdmissao]").val("");
			$("[name=secao]").val("");
			$("[name=centroCusto]").val("");
			$(".tbAvaliacao").hide();
			apagaPerguntas();
			FLUIGC.toast({
				title : '',
				message : 'Você não tem permissão para desligar colaborador em cargo de gestão.',
				type : 'danger'
			});
		}
	}
		else if($("[name=estabilidade]").val() != ''){
			$(".estabilidade").show();
			//$("[name=msgEstabilidade]").val("Funcionário escolhido para ser demitido possui ESTABILIDADE! " + $("[name=estabilidade]").val());
			FLUIGC.toast({
				title : '',
				message : "Funcionário escolhido para ser demitido possui ESTABILIDADE! " + $("[name=estabilidade]").val(),
				type : 'danger'
			});
		}
	} 	
}

function carregaLancamentos(campo){
	$("[name=referenciaRescisao]").val("");
	$("[name=historicoRescisao]").val("");
	$("[name=valorRescisao]").val("");
	$("[name=referenciaGRRF]").val("");
	$("[name=historicoGRRF]").val("");
	$("[name=valorGRRF]").val("");
	
	var codColigada = $("[name=codColigada]").val();
	var chapa = $("[name=chapa]").val();
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", chapa, chapa, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("DATA_D", campo, campo, ConstraintType.MUST);
	var constraints = new Array(c1,c2, c3);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_lancamentosRescisao", null, constraints, null);
	if (dataset.values.length > 0){
		for(var i=0; i < dataset.values.length; i++) {
			if (dataset.values[i].TIPO == "FUNC"){
				$("[name=referenciaRescisao]").val(dataset.values[i].IDLAN);
				$("[name=historicoRescisao]").val(dataset.values[i].HISTORICO);
				$("[name=valorRescisao]").val(formataValor(dataset.values[i].VALORORIGINAL));
			} else if (dataset.values[i].TIPO == "GRRF"){
				$("[name=referenciaGRRF]").val(dataset.values[i].IDLAN);
				$("[name=historicoGRRF]").val(dataset.values[i].HISTORICO);
				$("[name=valorGRRF]").val(formataValor(dataset.values[i].VALORORIGINAL));
			} else {
				$("[name=referenciaRescisao]").val("");
				$("[name=historicoRescisao]").val("");
				$("[name=valorRescisao]").val("");
				$("[name=referenciaGRRF]").val("");
				$("[name=historicoGRRF]").val("");
				$("[name=valorGRRF]").val("");
				FLUIGC.toast({
					title : '',
					message : 'Não existem lançamentos para esta data.',
					type : 'danger'
				});
			}	
		} 
	} else {
		$("[name=referenciaRescisao]").val("");
		$("[name=historicoRescisao]").val("");
		$("[name=valorRescisao]").val("");
		$("[name=referenciaGRRF]").val("");
		$("[name=historicoGRRF]").val("");
		$("[name=valorGRRF]").val("");
		FLUIGC.toast({
			title : '',
			message : 'Não existem lançamentos para esta data.',
			type : 'danger'
		});
	}
}

function formataValor(valor){
	var val = valor.split(".");
	var real = val[0];
	var cent = val[1].substring(0,2);
	return "R$ " + real +","+ cent;
}

function buscaAviso(){
	if($("[name=valorAviso]").val() == "sim"){
		$(".tipoReducao").show();
		$(".urgente").hide();
	} else{
		$(".tipoReducao").hide();	
		demissaoUrgente();		
	}
}

function retirarBlocosNaoRespondidos(){
	if ($("[name=aprovacao]").val() == ""){
		$("#aprovacao1").hide();		
	}
	if ($("[name=aprovacao2]").val() == ""){
		$("#aprovacao2").hide();		
	}
	if ($("[name=aprovacaoVerificarAvaliacao]").val() == ""){
		$("#aprovacaoVerificarAvaliacao").hide();
	}
	if ($("[name=aprovacaoSede]").val() == ""){
		$("#aprovacaoSede").hide();
	}
	if ($("[name=aprovacaoRH]").val() == ""){
		$("#aprovacaoRH").hide();		
	}		
	if ($("[name=validacaoSede]").val() == ""){
		$("#validacaoSede").hide();		
	}	
	if ($("[name=aprovValidacaoObra]").val() == ""){
		$("#validacaoObra").hide();		
	}
	
	var indice = rowIndex['tbCalculoObra'];
	if (indice > 0){
		$("#calcularRescisaoObra").show();		
	} else {
		$("#calcularRescisaoObra").hide();	
	}
		
}
function changeAprovCalculoObra(){
	if ($("[name=aprovCalculoObra]").val() == "sim"){
		$("[name=hiddenAprovCalculoObra]").val("1");
	} else if ($("[name=aprovCalculoObra]").val() == "nao"){
		$("[name=hiddenAprovCalculoObra]").val("0");
	}
}

function changeAprovCalculoObra(){
	if ($("[name=aprovCalculoObra]").val() == "sim"){
		$("[name=hiddenAprovCalculoObra]").val("1");
	} else if ($("[name=aprovCalculoObra]").val() == "nao"){
		$("[name=hiddenAprovCalculoObra]").val("0");
	}
}

function changeCompRealizarExames(){
	$("[name=hiddenCompRealizarExames]").val($("[name=compRealizarExames]").val());
}
function changeValidacaoObra(){
	if ($("[name=aprovValidacaoObra]").val() == "sim"){
		$("[name=hiddenValidacaoObra]").val("1");
	} else if ($("[name=aprovValidacaoObra]").val() == "nao"){
		$("[name=hiddenValidacaoObra]").val("0");
	}
}
function ativBtnAddPaiFilhoDocumentos() {
	$("[name=botaoAddAnexoDoc]").click(function() {
			var index = wdkAddChild('anexosDoc');	
				$("#botaoAddAnexoDoc___"+index).prop('disabled', false);
			    $("#indice_linhaDoc___"+index).val(index);
			    $("#visualizarFileDoc___"+index).hide();
			    $("#deleteFileDoc___"+index).hide();
			    
			  
	});
}

function deleteDoGedDoc(obj) {
	var elemento = $(obj).parent("td").siblings().children("input")[0]
	if(elemento === undefined){
	var indexPaiFilho = obj.id.substring(obj.id.lastIndexOf("_") + 1,
			obj.id.length);
	}else{
	var indexPaiFilho = elemento.id.substring(elemento.id.lastIndexOf("_") + 1,
			elemento.id.length);	
	}
	
	var idDoc = $("#numDocGed___" + indexPaiFilho).val();
	$.ajax({
		async : false,
		type : "POST",
		contentType : "application/json",
		url : '/api/public/ecm/document/remove',
		data : JSON.stringify({
			"id" : idDoc,
		}),
		error : function(e) {
			var attachments = parent.WKFViewAttachment.attachmentsDocs;
			var aindaEstaAnexo = false;
			if (aindaEstaAnexo == false) {
				$("#numDocGed___" + indexPaiFilho).val("");
			}

		},
		success : function(data) {
			console.info("Documento " + idDoc + " removido com sucesso");
			FLUIGC.toast({
				title : '',
				message : "Documento " + idDoc + " removido com sucesso",
				type : 'success'
			});

			$("#numDocGed___" + indexPaiFilho).val("");
			$("#nm_arquivoDoc___"+ indexPaiFilho).val("");
			$("#vl_tparquivoDoc___"+ indexPaiFilho).val("");
			$("#vl_tamanhoDoc___"+ indexPaiFilho).val("");
			$("#visualizarFileDoc___" + indexPaiFilho).hide();
			$("#deleteFileDoc___" + indexPaiFilho).hide();
		},
	});
}

//FUNCOES RELACIONADAS AOS CAMPOS DE DATAS
function aplicarManscaraCampos(){
	$('.data').mask('00/00/0000');
}

function ativarChangeValidarDt() {
	$(".data").change(
			function() {
				var data = this.value;
				if (data != "") {
					var qtdCaracter = this.value.length;
					if (qtdCaracter < 10 || !validaData(data)) {
						FLUIGC
						.toast({
							title : '',
							message : "Data Informada Não é Válida.",
							type : 'danger'
						});
						$("#" + this.id).val("");
					}
				}
			});
}

function validaData(valor) {
	var date = valor;
	var ardt = new Array;
	var ExpReg = new RegExp(
			"(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
	ardt = date.split("/");
	erro = false;
	if (date.search(ExpReg) == -1) {
		erro = true;
	} else if (((ardt[1] == 4) || (ardt[1] == 6) || (ardt[1] == 9) || (ardt[1] == 11))
			&& (ardt[0] > 30))
		erro = true;
	else if (ardt[1] == 2) {
		if ((ardt[0] > 28) && ((ardt[2] % 4) != 0))
			erro = true;
		if ((ardt[0] > 29) && ((ardt[2] % 4) == 0))
			erro = true;
	}
	if (erro) {

		return false;
	}
	return true;
}

function carregaLiquidoRescisao(){

	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", $("[name=codColigada]").val(), $("[name=codColigada]").val(), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", $("[name=chapa]").val(), $("[name=chapa]").val(), ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("NROPERIODO", '14', '14', ConstraintType.MUST);

	
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_vlrLiquidoRescisaoDataPagamento", null, new Array(c1,c2,c3), null);
	var dataPgto = dataset.values[0].DTPAGTORESCISAO;
	var vlrLiquido = dataset.values[0].LIQUIDO;
	
	if(vlrLiquido == ''){
		$(".semCalculoRescisaoRM").show();
		//SE FOR PARA BLOQUEAR NO VALIDATEFORM
	}

	$("[name=vlrLiquidoRescisaoObra]").val(converteFormatMoney(vlrLiquido));
	$("[name=vlrLiquidoRescisaoSede]").val(converteFormatMoney(vlrLiquido));
	$("[name=dataPgtoObra]").val(AjustaData(dataPgto));
	$("[name=dataPgtoSede]").val(AjustaData(dataPgto));
	
}
function AjustaData(getdate){
	if(getdate == "" || getdate == null){
		return "";
	}else{
	var ConvDate = new Date(getdate);
	var dd = ConvDate.getDate();
	var mm = ConvDate.getMonth()+1; 
	var yyyy = ConvDate.getFullYear();
	if(dd<10) {
	   dd='0'+dd;
	} 
	if(mm<10) {
	    mm='0'+mm;
	} 

	return dd+'/'+mm+'/'+yyyy;
	}
}

function converteFormatMoney(n, c, d, t) {
	if (n == "") {
		return "0,0000";
	} else if(n == 0 || n == "0"){
		return "0,0000";
	}else {
	c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d,
			t = t == undefined ? "." : t, s = n < 0 ? "-" : "",
			i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
			j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "")
			+ i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
			+ (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	}
}

function ConvertReal(valorNumero) {
	if (valorNumero == "") {
		return "";
	}else if(valorNumero == "0,0000" || valorNumero == "0,00" || valorNumero == "0"){
		return "0";
	} else {
		var valorNumeroStr = new String(valorNumero);
		valorNumeroStr = valorNumeroStr.replace(/\./g, "");
		valorNumeroStr = valorNumeroStr.replace(",", ".");
	}
	return valorNumeroStr;
}

function carregaDadosExameDemissional(){
	var EXAME_DEMISSIONAL = '';
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", $("[name=codColigada]").val(), $("[name=codColigada]").val(), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", $("[name=chapa]").val(), $("[name=chapa]").val(), ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_exameDemissional", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		EXAME_DEMISSIONAL = dataset.values[i].EXAME_DEMISSIONAL;
		$("[name=apto]").val(EXAME_DEMISSIONAL);
	}
	if(buscarAtividadeAtual() == 483){
	if(EXAME_DEMISSIONAL == ''){
		var prazoLancamento = $("#dataLimiteAtestado").val();
		FLUIGC.message
		.alert(
				{
					message : "Exames Demissionais ainda não foram lançados",
					title : "Aten\u00e7\u00e3o",
					label : 'Ciente'
				}, function(el, ev) {
		});
	} 
	}
}
function validarExibicaoExameDemissional(){
	if($("[name=hiddenCompRealizarExames]").val() == 'nao'){
		$(".semExameDemissional").show();
	}	
}

function validarAberturaEspecialDP(){
	var cargoSolicitante = $("[name=cargoSolicitante]").val();
	//if((cargoSolicitante != 'Engenheiro') && (cargoSolicitante != 'Coordenador') && (cargoSolicitante != 'Gerente') && (cargoSolicitante != 'Diretor')){
	if((cargoSolicitante != 'Conselho') && (cargoSolicitante != 'Gerente') && (cargoSolicitante != 'Diretor')&& ($("[name=SolicitanteChefeSupervisor]").val() == '0')){
		$("#motivoDemissaoRM  option[value='0']").remove();
		$("#motivoDemissaoRM  option[value='1']").remove();
		$("#motivoDemissaoRM  option[value='2']").remove();
		$("#motivoDemissaoRM  option[value='3']").remove();
		$("#motivoDemissaoRM  option[value='4']").remove();
		$("#motivoDemissaoRM  option[value='5']").remove();
		$("#motivoDemissaoRM  option[value='7']").remove();
		$("#motivoDemissaoRM  option[value='8']").remove();
		$("#motivoDemissaoRM  option[value='10']").remove();
		$("#motivoDemissaoRM  option[value='11']").remove();
		$("#motivoDemissaoRM  option[value='12']").remove();
		$("[name=aberturaDP]").val('sim');
	}
}
function aplicarRegrasPreenchimentoDP(){
	var motivoDemissaoRM = $("[name=motivoDemissaoRM]").val();
	var avisoPrevio = $("[name=avisoPrevio]:checked").val();
	var dataPrevistaDemissao = $("[name=dataPrevistaDemissao]").val();
	if(motivoDemissaoRM != "" && avisoPrevio != "" && dataPrevistaDemissao != ""){
		$("#assinarAviso").show();
		
		 $("[name=dataAviso]").val($("[name=dataSolicitacao]").val());
		 $("[name=responsavelAviso]").val($("[name=nomeSolicitante]").val());
		changeMotivoDemissao();

		if ($("[name=valorAviso]").val() == "nao"){
			$(".dataDemissao").show();
			$(".tipoDemissao").hide();
			$(".dataInicioAviso").hide();
			$(".dataDemissaoPrevista").hide();
			$(".tipoAviso").hide();
			$("[name=dataDemissao]").val($("[name=dataPrevistaDemissao]").val());		
		} else if ($("[name=valorAviso]").val() == "sim"){
			$(".dataDemissao").hide();	
			$(".tipoDemissao").show();		
			dataInicioAviso();
			dataDemissaoPrevista();		
		}
		FLUIGC.calendar("#dataInicioAviso", {minDate: new Date()});
		FLUIGC.calendar("#dataDemissaoPrevista", {minDate: new Date()});
		FLUIGC.calendar("#dataDemissao", {minDate: new Date()});
		
	}
}
function setarDataLanAtestado(){
	var dataDemissao = $("[name=dataDemissao]").val();
	
	var data = dataDemissao.split("/");
	var dataLimAtestado =  data[2]+"/"+data[1]+"/"+data[0];
	var d = new Date(dataLimAtestado);
	dataLimAtestado = d.setDate(d.getDate()+5);
	dataLimAtestado = new Date(dataLimAtestado);
	var dia = dataLimAtestado.getDate().toString();
	var mes = (dataLimAtestado.getMonth()+1).toString();
	var ano = dataLimAtestado.getFullYear().toString();
	$("#dataLimiteAtestado").val(dia +"/"+ mes +"/"+ ano);	
	
	
}

function carregaExameDemissional(){
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", $("[name=codColigada]").val(), $("[name=codColigada]").val(), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", $("[name=chapa]").val(), $("[name=chapa]").val(), ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_exameDemissional", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		$("[name=apto]").val(dataset.values[i].EXAME_DEMISSIONAL);
	} 
}


function carregaDataPagamento(){
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", $("[name=codColigada]").val(), $("[name=codColigada]").val(), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", $("[name=chapa]").val(), $("[name=chapa]").val(), ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	var dataset = DatasetFactory.getDataset("ds_ConsultaRM_WS094_RetornaDataUltimaMovDemissao", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		var dataPagamento = formatDateMaskRM(dataset.values[i].DTULTIMOMOVIM);
		$("[name=dataPagamento]").val(dataPagamento);
		carregaLancamentos(dataPagamento);
		
	} 
}

//Formata a data com máscara 
function formatDateMaskRM(strDate) {
  if (strDate != null && strDate != '' && strDate != 'undefined') {
    try {
      var arrAux = strDate.split('T');
      var arrDate = arrAux[0].toString().split('-');
      var yyyy = arrDate[0].toString();
      var mm = arrDate[1].toString();
      var dd = arrDate[2].toString();

      return dd + '/' + mm + '/' + yyyy;
    } catch (e) {
      log.error('Erro ao formatar Data: ' + e.message);
      return '';
    }
  } else return '';
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
		$(".tbAvaliacao").hide();
		apagaPerguntas();
		FLUIGC.toast({
			title : '',
			message : 'Você não tem permissão para desligar funcionários desta Obra/Setor.',
			type : 'danger'
		});
	}
}
/*
function validarSolicitAbertaAprov(CHAPA, CODSECAO){
	var nroSolicitacao = '';
	
	var c1 = DatasetFactory.createConstraint("CHAPA", CHAPA, CHAPA, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODSECAO", CODSECAO, CODSECAO, ConstraintType.MUST);

	var constraints = new Array(c1,c2);
	var dataset = DatasetFactory.getDataset("ds_consulta_FormDesligamentoComFiltro", null, constraints, null);
	
	if(dataset.values.length > 0){
	for(var i=0; i < dataset.values.length; i++) {
			nroSolicitacao = dataset.values[i].nroSolicitacao;	
		} 

		$(".tbAvaliacao").hide();
		apagaPerguntas();
		FLUIGC.toast({
			title : '',
			message : 'Localizado no Fluig uma solicitação de número: '+nroSolicitacao+' em aberto para este funionário. Aguardando aprovação favor verificar !',
			type : 'danger'
		});
	} 		
}
*/
function validaUsusrioPapel(codPapel){
	var c1 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", codPapel, codPapel, ConstraintType.MUST);

	
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);
	
	if(dataset.values.length > 0){
	return true;
	}else{
		return false;
	}
}

function onChange_EntrevistaRealizada(){
	
	document.getElementById("realizado").addEventListener("change", function() {
	
		if($("#realizado").val() == "nao")
			$(".motivoEntrevista").show();
		else{
			$(".motivoEntrevista").hide();
			$("[name=motivoEntrevista]").val("");
			$("[name=justificativaEntrevista]").val("");
		}
		
	});	
	
}

function getGerSede(){
	
	var codColigada = $("[name=codColigada]").val();
	var codFuncao = $("[name=codFuncao]").val();
	
	var c1 = DatasetFactory.createConstraint("COLIGADA_I", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODFUNCAO", codFuncao, codFuncao, ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	var dataset = DatasetFactory.getDataset("ds_RM_WS136_AprovadorPromocao", null, constraints, null);
	
	if(dataset.values[0].EXIGEAPROVACAOSEDE_DESLIGAMENTO == '0' || dataset.values[0].EXIGEAPROVACAOSEDE_DESLIGAMENTO == '1'){
		$("[name=exigeAprovacaoSede]").val(dataset.values[0].EXIGEAPROVACAOSEDE_DESLIGAMENTO);
		$("[name=atribuicaoGerSede]").val(dataset.values[0].APROVADOR);
	}else{
		window["funcionario"].clear();
		$("#foto").attr('src', "foto-padrao.jpeg");
		$("[name=chapa]").val("");
		$("[name=funcao]").val("");
		$("[name=dataAdmissao]").val("");
		$("[name=secao]").val("");
		$("[name=centroCusto]").val("");
		$(".tbAvaliacao").hide();
		apagaPerguntas();
		
		FLUIGC.toast({
			title : '',
			message : 'Erro ao consultar responsável por aprovação. Entre em contato com o setor de TI.',
			type : 'danger'
		});
	}

}

function validarDataSextaFeira(){
	var dataPrevistaDemissao = $("[name=dataPrevistaDemissao]").val();
	var arrDataDemissao = dataPrevistaDemissao.split('/');
	var stringFormatada = arrDataDemissao[1] + '-' + arrDataDemissao[0] + '-' + arrDataDemissao[2];
	var dataFormatada1 = new Date(stringFormatada);
	var diaSemana = dataFormatada1.getDay();
	    
	    if(diaSemana == 5){
	    	$("[name=dataPrevistaDemissao]").val('')
	    	FLUIGC.message
			.alert(
					{
						message : " N&atilde;o &eacute; permitido efetuar demiss&atilde;o na sexta-feira.",
						title : "Aten\u00e7\u00e3o",
						label : 'Ciente'
					}, function(el, ev) {
			});
	    }  
}

function resultadoAvaliacao(){
	
	var semRestricao = $("[name=hiddenSemRestricao]").val();
	var justaCausa = $("[name=hiddenJustaCausa]").val();
	var regraDeOuro = $("[name=hiddenRegraDeOuro]").val();
	var assiduidade = $("[name=hiddenAssiduidade]").val();
	var pontualidade = $("[name=hiddenPontualidade]").val();
	var produtividade = $("[name=hiddenProdutividade]").val();
	var comprometimento = $("[name=hiddenComprometimento]").val();
	var indisciplina = $("[name=hiddenIndisciplina]").val();
	var seguranca = $("[name=hiddenSeguranca]").val();
	
	if(semRestricao == "1")
		return "Apto";
	else if(comprometimento == "1" || seguranca == "1" || regraDeOuro == "1" || justaCausa == "1")
		return "Inapto";
	else if(assiduidade == "1" || pontualidade == "1" || produtividade == "1" || indisciplina == "1")
		return "Apto com restrições";
	else
		return "";
	
}