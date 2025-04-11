var underline = "___";
var atividadeAtual = "";

setTimeout(function() {
	//setFilterZoom();
}, 2000);

$(function() {
	atividadeAtual = buscarAtividadeAtual();
	atividadesAtuais(atividadeAtual);
	$("#atividadeAnterior").val(atividadeAtual);
	aplicarManscaraCampos();
	ativarChangeValidarDt();
	carregarTabelaValoresEPorcentagem();
	$("#controleAddDocAtiv").val('');
});

function atividadesAtuais(atividadeAtual) {
	if(buscarModoForm() == "VIEW"){
		$("#divLixeiraDoc").hide();
		$(".deleteFileDoc").hide();
		$(".botaoAddAnexoDoc").hide();
		$(".div_vl_fileDoc").hide();
		ajustarTextAreaImpressao();
	}

	if (atividadeAtual == INICIO_0 || atividadeAtual == INICIO || atividadeAtual == QUALIFICACAO_IMPACTO_MUDANCA_PRAZO_CUSTO || atividadeAtual == PREPARACAO_REVISAO_CGM) {
		controleExibicaoAtivINICIO();	
		ativarChangeOrigemMudanca(atividadeAtual);
		ativBtnAddPaiFilhoDocumentos();
		ativarDataPrevisaoIni();
		ativarDataPrevisaoFin();
			
	}else if(atividadeAtual == REVISAR_SOLICITACAO){
		controleExibicaoAtivINICIO();
		ativarChangeOrigemMudanca(atividadeAtual);
		ativBtnAddPaiFilhoDocumentos();
		ativarDataPrevisaoIni();
		ativarDataPrevisaoFin();
		limparAprovacoes();
		
	}else if(atividadeAtual == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO || atividadeAtual == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE){
		controleExibicaoAtiv_ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO();
		ativarChangeAprovacao_ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO();
		ocultarExibicoesBotao();

		
	}else if(atividadeAtual == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA || atividadeAtual == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE){
		controleExibicaoAtiv_ANALISE_TRATAMENTO_APROV_GESTOR_OBRA();
		ativarChangeAprovacao_ANALISE_TRATAMENTO_APROV_GESTOR_OBRA();
		ocultarExibicoesBotao();

		

	}else if(atividadeAtual == VALIDAR_INFORMACOES_ADCON){
		controleExibicaoAtiv_VALIDAR_INFORMACOES_ADCON();
		ativarChangeAprovacao_VALIDAR_INFORMACOES_ADCON();
		ativBtnAddPaiFilhoDocumentos();
	
		
	}else if(atividadeAtual == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT || atividadeAtual == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE){
		controleExibicaoAtiv_ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT();
		ativarChangeAprovacao_ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA();
		ocultarExibicoesBotao();
		
		
	}else if(atividadeAtual == ANALISE_APROV_PRESIDENCIA_MIP || atividadeAtual == ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE){
		controleExibicaoAtiv_ANALISE_APROV_PRESIDENCIA_MIP();
		ativarChangeAprovacao_ANALISE_APROV_PRESIDENCIA_MIP();
		ocultarExibicoesBotao();
		ativBtnAddPaiFilhoDocumentos();

	}else if(atividadeAtual == ANALISE_TRATAMENTO_APROV_DIR_COMERCIAL_INT ||atividadeAtual == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE){

		controleExibicaoAtiv_ANALISE_APROV_DIR_COMERCIAL_MIP();
		ativarChangeAprovacao_ANALISE_APROV_DIR_COMERCIAL_MIP();
		ocultarExibicoesBotao();
		
		
	}else if(atividadeAtual == APROVACAO_CLIENTE_MERITO_TAC_PLEITO){
		controleExibicaoAtiv_APROVACAO_CLIENTE_MERITO_TAC_PLEITO();
		ativarChangeAprovacao_APROVACAO_CLIENTE_MERITO_TAC_PLEITO();
		ativBtnAddPaiFilhoDocumentos();
		$(".deleteFileDoc").hide();
		
	}else if(atividadeAtual == NEGOCIACAO_CLIENTE_APROV_VLR_PRAZO_EXECUCAO){
		controleExibicaoAtiv_NEGOCIACAO_CLIENTE_APROV_VLR_PRAZO_EXECUCAO();
		ativarChangeAprovacao_NEGOCIACAO_CLIENTE_APROV_VLR_PRAZO_EXECUCAO();
		ativBtnAddPaiFilhoDocumentos();
		$(".deleteFileDoc").hide();
		$("#hidden_aprovClienteVlrPrazo").val('');
		
	}else if(atividadeAtual == FORMALIZACAO_ASSINATURA_ADITIVO_CONTRATUAL){
		controleExibicaoAtiv_FORMALIZACAO_ASSINATURA_ADITIVO_CONTRATUAL();
		ativBtnAddPaiFilhoDocumentos();
		$(".deleteFileDoc").hide();
	
		
	}else if(atividadeAtual == INCORPORACAO_ORCAMENTO_VERSAO_ESCOPO_ATUAL){
		controleExibicaoAtiv_INCORPORACAO_ORCAMENTO_VERSAO_ESCOPO_ATUAL();
		ativBtnAddPaiFilhoDocumentos();
		$(".deleteFileDoc").hide();
	
		
	}else if(atividadeAtual == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC){
		controleExibicaoAtiv_ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC();
		ativarChangeAprovacao_ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC();
		ocultarExibicoesBotao();
		
	}else if(atividadeAtual == ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC){
		controleExibicaoAtiv_ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC();
		ativarChangeAprovacao_ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC();
		ocultarExibicoesBotao();
	
		
	}else if(atividadeAtual == ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC){
		controleExibicaoAtiv_ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC();
		ativarChangeAprovacao_ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC();
		ocultarExibicoesBotao();
	
		
	}else if(atividadeAtual == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA){
		controleExibicaoAtiv_ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA();
		ativarChangeAprovacao_ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA();
		ocultarExibicoesBotao();
		
	}else if(atividadeAtual == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL){
		controleExibicaoAtiv_ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL();
		ativarChangeAprovacao_ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL();
		ocultarExibicoesBotao();
	
		
	}else if(atividadeAtual == ANALISE_APROVACAO_PRESIDENCIA){
		controleExibicaoAtiv_ANALISE_APROVACAO_PRESIDENCIA();
		ativarChangeAprovacao_ANALISE_APROVACAO_PRESIDENCIA();
		ocultarExibicoesBotao();
	
		
	}else if(atividadeAtual == INCORPORACAO_ORCAMENTO_VERSAO_ATIVA){
		controleExibicaoAtivINCORPORACAO_ORCAMENTO_VERSAO_ATIVA();
		ativBtnAddPaiFilhoDocumentos();
		$("#divLixeiraDoc").hide();
		$(".deleteFileDoc").hide();
		$(".botaoAddAnexoDoc").show();
		$(".div_vl_fileDoc").show();
		alterarStatusFinalizado();
		
	}else if(atividadeAtual == REPROGRAMACAO_ORCAMENTARIA_EMPREENDIMENTO){
		controleExibicaoAtivREPROGRAMACAO_ORCAMENTARIA_EMPREENDIMENTO();
		ativBtnAddPaiFilhoDocumentos();
		$("#divLixeiraDoc").hide();
		$(".deleteFileDoc").hide();
		$(".botaoAddAnexoDoc").show();
		$(".div_vl_fileDoc").show();
		alterarStatusFinalizado();
		
	}else if(atividadeAtual == VALIDAR_NECESSIDADE_CGM_COMPLEMENTAR){
		$("#hidden_AprovNegocClienteExec").val('ajustarNegocCliente');
		controleExibicaoAtiv_VALIDAR_NECESSIDADE_CGM_COMPLEMENTAR();
		ativBtnAddPaiFilhoDocumentos();
		
	}else{
		controleExibicaoAtivAll();
	
	} 	
	
	enableFields();
}

function controleExibicaoAtivINICIO() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").hide();
	$(".divAprovacaoValorPrazo").hide();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();
	
	if($("#justAprovGestorContrato").val() != ''){$(".divAprovacaoGestorContrato").show();}
	if($("#justAprovGestorObra").val() != ''){$(".divAprovacaoGestorObra").show();}
	if($("#justAprovADCon").val() != ''){$(".divAprovacaoADCon").show();}
	if($("#justAprovDiretorOperac").val() != ''){$(".divAprovacaoDiretorOperac").show();}
	if($("#justAprovDiretorComerc").val() != ''){$(".divAprovacaoDiretorComerc").show();}
	if($("#justAprovPresidenciaMIP").val() != ''){$(".divAprovacaoPresidenciaMIP").show();}
	if($("#ObsAprovReprovCliente").val() != ''){$(".divAprovacaoClienteMerito").show();}
	if($("#ObsAprovVlrPrazo").val() != ''){$(".divAprovacaoValorPrazo").show();}
	if($("#justAprovDirOperacExec").val() != ''){$(".divAprovacaoDiretorOperacExec").show();}
	if($("#justAprovDirComercExec").val() != ''){$(".divAprovacaoDiretorComercExec").show();}
	if($("#justAprovPresidMIPExec").val() != ''){$(".divAprovacaoPresidMIPExec").show();}
	if($("#justAprovDirOperacVlrPrazo").val() != ''){$(".divAprovacaoDiretorOperacVlrPrazo").show();}
	if($("#justAprovDirComercVlrPrazo").val() != ''){$(".divAprovacaoDiretorComercVlrPrazo").show();}
	if($("#justAprovPresidMIPVlrPrazo").val() != ''){$(".divAprovacaoPresidenciaMIPVlrPrazo").show();}
	if($("#obsFormalizacaoAssinAditivo").val() != ''){$(".divFormalizacaoAssinaturaAditivo").show();}
	if($("#obsIncorpOrcVersaoEscopoAtual").val() != ''){$(".divIncorporacaoOrcamentoVersaoEscopoAtual").show();}
	if($("#obsIncorpOrcVersaoEscopoAtiva").val() != ''){$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").show();}
	if($("#obsReprogOracEmpreendimento").val() != ''){$(".divReprogramacaoOracEmpreendimento").show();}
	

	if($("#origemMudanca").val() == "externa"){
		$(".divFatogeradorExterno").show();
		//$("#gerarAditivoContrat").prop('disabled', false);
	}
	
}

function controleExibicaoAtiv_ANALISE_APROV_DIR_COMERCIAL_MIP() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").show();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").hide();
	$(".divAprovacaoValorPrazo").hide();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
}

function controleExibicaoAtiv_APROVACAO_CLIENTE_MERITO_TAC_PLEITO() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").show();
	$(".divAprovacaoValorPrazo").hide();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
}

function controleExibicaoAtiv_NEGOCIACAO_CLIENTE_APROV_VLR_PRAZO_EXECUCAO() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").show();
	$(".divAprovacaoValorPrazo").show();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
	
	if($("#obsCgmComplementar").val() != ''){
		$(".divValidarNecessCgmComplementar").show();
	}
}

function controleExibicaoAtiv_ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").show();
	$(".divAprovacaoValorPrazo").show();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").show();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
}

function controleExibicaoAtiv_ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").show();
	$(".divAprovacaoValorPrazo").show();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").show();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
}

function controleExibicaoAtiv_ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").show();
	$(".divAprovacaoValorPrazo").show();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").show();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
}

function controleExibicaoAtiv_ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").show();
	$(".divAprovacaoValorPrazo").show();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").show();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
	
	if($("#obsCgmComplementar").val() != ''){
		$(".divValidarNecessCgmComplementar").show();
	}
}

function controleExibicaoAtiv_ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").show();
	$(".divAprovacaoValorPrazo").show();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").show();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
	
	if($("#obsCgmComplementar").val() != ''){
		$(".divValidarNecessCgmComplementar").show();
	}
}
function controleExibicaoAtiv_ANALISE_APROVACAO_PRESIDENCIA() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").show();
	$(".divAprovacaoValorPrazo").show();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").show();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
	
	if($("#obsCgmComplementar").val() != ''){
		$(".divValidarNecessCgmComplementar").show();
	}
}


function controleExibicaoAtiv_ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").show();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").hide();
	$(".divAprovacaoValorPrazo").hide();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
}

function controleExibicaoAtiv_ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").show();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").hide();
	$(".divAprovacaoValorPrazo").hide();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
}

function controleExibicaoAtiv_ANALISE_APROV_PRESIDENCIA_MIP() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").show();
	$(".divAprovacaoClienteMerito").hide();
	$(".divAprovacaoValorPrazo").hide();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
	
	if($("#obsCgmComplementar").val() != ''){
		$(".divValidarNecessCgmComplementar").show();
	}
}

function controleExibicaoAtiv_VALIDAR_INFORMACOES_ADCON() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").show();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").hide();
	$(".divAprovacaoValorPrazo").hide();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
}


function controleExibicaoAtiv_ANALISE_TRATAMENTO_APROV_GESTOR_OBRA() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").show();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").hide();
	$(".divAprovacaoValorPrazo").hide();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();
}

function controleExibicaoAtivINCORPORACAO_ORCAMENTO_VERSAO_ATIVA() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").show();
	$(".divAprovacaoValorPrazo").show();
	$(".divValidarNecessCgmComplementar").show();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").show();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").show();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").show();
	$(".divReprogramacaoOracEmpreendimento").hide();
	
	if($("#hidden_aprovDirOperacExec").val() != ''){
		$(".divAprovacaoDiretorOperacExec").show();
	}else{
		$(".divAprovacaoDiretorOperacExec").hide();
	}
	if($("#hidden_aprovDirComercExec").val() != ''){
		$(".divAprovacaoDiretorComercExec").show();
	}else{
		$(".divAprovacaoDiretorComercExec").hide();
	}
	if($("#hidden_aprovPresidMIPExec").val() != ''){
		$(".divAprovacaoPresidMIPExec").show();
	}else{
		$(".divAprovacaoPresidMIPExec").hide();
	}
	
}

function controleExibicaoAtivREPROGRAMACAO_ORCAMENTARIA_EMPREENDIMENTO() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").hide();
	$(".divAprovacaoValorPrazo").hide();
	$(".divValidarNecessCgmComplementar").hide();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").show();
}

function controleExibicaoAtiv_INCORPORACAO_ORCAMENTO_VERSAO_ESCOPO_ATUAL() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").show();
	$(".divAprovacaoValorPrazo").show();
	$(".divValidarNecessCgmComplementar").show();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").show();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").show();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
	
	if($("#obsCgmComplementar").val() != ''){
		$(".divValidarNecessCgmComplementar").show();
	}
}

function controleExibicaoAtiv_FORMALIZACAO_ASSINATURA_ADITIVO_CONTRATUAL() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").show();
	$(".divAprovacaoValorPrazo").show();
	$(".divValidarNecessCgmComplementar").show();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").show();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
	
	if($("#obsCgmComplementar").val() != ''){
		$(".divValidarNecessCgmComplementar").show();
	}
}



function controleExibicaoAtiv_VALIDAR_NECESSIDADE_CGM_COMPLEMENTAR() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").hide();
	$(".divAprovacaoGestorObra").hide();	
	$(".divAprovacaoADCon").hide();
	$(".divAprovacaoDiretorOperac").hide();
	$(".divAprovacaoDiretorComerc").hide();
	$(".divAprovacaoPresidenciaMIP").hide();
	$(".divAprovacaoClienteMerito").show();
	$(".divAprovacaoValorPrazo").show();
	$(".divValidarNecessCgmComplementar").show();
	$(".divAprovacaoDiretorOperacExec").hide();
	$(".divAprovacaoDiretorComercExec").hide();
	$(".divAprovacaoPresidMIPExec").hide();
	$(".divAprovacaoDiretorOperacVlrPrazo").hide();
	$(".divAprovacaoDiretorComercVlrPrazo").hide();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").hide();
	$(".divFormalizacaoAssinaturaAditivo").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").hide();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").hide();
	$(".divReprogramacaoOracEmpreendimento").hide();

	if($("#origemMudanca").val() == 'externa'){
		$(".divFatogeradorExterno").show();
	}
}

function controleExibicaoAtivAll() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGestorContrato").show();
	$(".divAprovacaoGestorObra").show();	
	$(".divAprovacaoADCon").show();
	$(".divAprovacaoDiretorOperac").show();
	$(".divAprovacaoDiretorComerc").show();
	$(".divAprovacaoPresidenciaMIP").show();
	$(".divAprovacaoClienteMerito").show();
	$(".divAprovacaoValorPrazo").hide();
	$(".divAprovacaoDiretorOperacExec").show();
	$(".divAprovacaoDiretorComercExec").show();
	$(".divAprovacaoPresidMIPExec").show();
	$(".divAprovacaoDiretorOperacVlrPrazo").show();
	$(".divAprovacaoDiretorComercVlrPrazo").show();
	$(".divAprovacaoPresidenciaMIPVlrPrazo").show();
	$(".divFormalizacaoAssinaturaAditivo").show();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtual").show();
	$(".divIncorporacaoOrcamentoVersaoEscopoAtiva").show();
	$(".divReprogramacaoOracEmpreendimento").show();

}

//MASCARAS DE CAMPOS DE FORMULARIOS
function aplicarManscaraCampos(){
	$('.number').mask('00000000000');
	$('.data').mask('00/00/0000');	
	$('.dateH').mask('00/00/0000 00:00');	
	$('.moeda').maskMoney({
		decimal : ",",
		thousands : "."
	});
}

function ativarChangeAprovacao_ANALISE_TRATAMENTO_APROV_GESTOR_OBRA(){
	$("#aprovGestorObra").change(function(){
		var aprovGestorContrato = $("#aprovGestorObra").val();
		$("#hidden_aprovGestorObra").val(aprovGestorContrato);
		if(aprovGestorContrato == "aprovado"){
			$("#atividadeAprovada").val(buscarAtividadeAtual());	
			$("label[for='justAprovGestorObra']").removeClass("required");
			$("#justAprovGestorObra").val('');
		}else if(aprovGestorContrato == "ajustar"){
			$("label[for='justAprovGestorObra']").addClass("required");			
		}
	});
}

function ativarChangeAprovacao_ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO(){
	$("#aprovGestorContrato").change(function(){
		var aprovGestorContrato = $("#aprovGestorContrato").val();
		$("#hidden_aprovGestorContrato").val(aprovGestorContrato);
		if(aprovGestorContrato == "aprovado"){
		$("#atividadeAprovada").val(buscarAtividadeAtual());			
			$("label[for='justAprovGestorContrato']").removeClass("required");
			$("#justAprovGestorContrato").val('');
		}else if(aprovGestorContrato == "ajustar"){
			$("label[for='justAprovGestorContrato']").addClass("required");			
		}
	});
}


function ativarChangeAprovacao_ANALISE_APROV_PRESIDENCIA_MIP(){
	$("#aprovPresidenciaMIP").change(function(){
		var aprovPresidenciaMIP = $("#aprovPresidenciaMIP").val();
		$("#hidden_aprovPresidenciaMIP").val(aprovPresidenciaMIP);
		if(aprovPresidenciaMIP == "aprovado"){		
			$("#atividadeAprovada").val(buscarAtividadeAtual());
			$("label[for='justAprovPresidenciaMIP']").removeClass("required");
			$("#justAprovPresidenciaMIP").val('');
		}else if(aprovPresidenciaMIP == "ajustar"){
			$("label[for='justAprovPresidenciaMIP']").addClass("required");			
		}
	});
}

function ativarChangeAprovacao_ANALISE_APROV_DIR_COMERCIAL_MIP(){
	$("#aprovDiretorComerc").change(function(){
		var aprovDiretorComerc = $("#aprovDiretorComerc").val();
		$("#hidden_aprovDiretorComerc").val(aprovDiretorComerc);
		if(aprovDiretorComerc == "aprovado"){	
			$("#atividadeAprovada").val(buscarAtividadeAtual());
			$("label[for='justAprovDiretorComerc']").removeClass("required");
			$("#justAprovDiretorOperac").val('');
		}else if(aprovDiretorComerc == "ajustar"){
			$("label[for='justAprovDiretorComerc']").addClass("required");			
		}
	});
}

function ativarChangeAprovacao_APROVACAO_CLIENTE_MERITO_TAC_PLEITO(){
	$("#aprovClienteMeritoVlrPrazo").change(function(){
		var aprovClienteMeritoVlrPrazo = $("#aprovClienteMeritoVlrPrazo").val();
		$("#hidden_aprovCliMeritoVlrPrazo").val(aprovClienteMeritoVlrPrazo);
		if(aprovClienteMeritoVlrPrazo == "aprovado"){	
			$("#atividadeAprovadaExecucao").val(buscarAtividadeAtual());

			//$("label[for='ObsAprovReprovCliente']").removeClass("required");
			//$("#ObsAprovReprovCliente").val('');
		}else{
			//$("label[for='ObsAprovReprovCliente']").addClass("required");			
		}
	});
}

function ativarChangeAprovacao_NEGOCIACAO_CLIENTE_APROV_VLR_PRAZO_EXECUCAO(){
	$("#aprovClienteVlrPrazo").change(function(){
		var aprovClienteVlrPrazo = $("#aprovClienteVlrPrazo").val();
		$("#hidden_aprovClienteVlrPrazo").val(aprovClienteVlrPrazo);
		$("#hidden_AprovNegocClienteExec").val(aprovClienteVlrPrazo);
		if(aprovClienteVlrPrazo == "aprovado"){	
			$("#atividadeAprovadaVlrPrazo").val(buscarAtividadeAtual());
			
			//$("label[for='ObsAprovReprovCliente']").removeClass("required");
			//$("#ObsAprovReprovCliente").val('');
		}else{
			
		}
	});
}

function ativarChangeAprovacao_ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC(){
	$("#aprovDirOperacExec").change(function(){
		var aprovDirOperacExec = $("#aprovDirOperacExec").val();
		$("#hidden_aprovDirOperacExec").val(aprovDirOperacExec);
		$("#hidden_AprovacaoInicioExecucao").val(aprovDirOperacExec);
		if(aprovDirOperacExec == "aprovado"){	
			$("#atividadeAprovadaExecucao").val(buscarAtividadeAtual());
			
			$("label[for='justAprovDirOperacExec']").removeClass("required");
			$("#justAprovDirOperacExec").val('');
		}else{
			$("label[for='justAprovDirOperacExec']").addClass("required");			
		}
	});
}

function ativarChangeAprovacao_ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC(){
	$("#aprovDirComercExec").change(function(){
		var aprovDirComercExec = $("#aprovDirComercExec").val();
		$("#hidden_aprovDirComercExec").val(aprovDirComercExec);
		$("#hidden_AprovacaoInicioExecucao").val(aprovDirComercExec);
		if(aprovDirComercExec == "aprovado"){	
			$("#atividadeAprovadaExecucao").val(buscarAtividadeAtual());
			$("label[for='justAprovDirOperacExec']").removeClass("required");
			$("#justAprovDirComercExec").val('');
		}else{
			$("label[for='justAprovDirComercExec']").addClass("required");			
		}
	});
}

function ativarChangeAprovacao_ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA(){
	$("#aprovDirOperacVlrPrazo").change(function(){
		var aprovDirOperacVlrPrazo = $("#aprovDirOperacVlrPrazo").val();
		$("#hidden_aprovDirOperacVlrPrazo").val(aprovDirOperacVlrPrazo);
		$("#hidden_AprovNegocClienteExec").val(aprovDirOperacVlrPrazo);
		if(aprovDirOperacVlrPrazo == "aprovado"){	
			$("#atividadeAprovadaVlrPrazo").val(buscarAtividadeAtual());
			$("label[for='justAprovDirOperacVlrPrazo']").removeClass("required");
			$("#justAprovDirOperacVlrPrazo").val('');
		}else{
			$("label[for='justAprovDirOperacVlrPrazo']").addClass("required");			
		}
	});
}

function ativarChangeAprovacao_ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL(){
	$("#aprovDirComercVlrPrazo").change(function(){
		var aprovDirComercVlrPrazo = $("#aprovDirComercVlrPrazo").val();
		$("#hidden_aprovDirComercVlrPrazo").val(aprovDirComercVlrPrazo);
		$("#hidden_AprovNegocClienteExec").val(aprovDirComercVlrPrazo);
		if(aprovDirComercVlrPrazo == "aprovado"){	
			$("#atividadeAprovadaVlrPrazo").val(buscarAtividadeAtual());
			$("label[for='justAprovDirComercVlrPrazo']").removeClass("required");
			$("#justAprovDirComercVlrPrazo").val('');
		}else{
			$("label[for='justAprovDirComercVlrPrazo']").addClass("required");			
		}
	});
}

function ativarChangeAprovacao_ANALISE_APROVACAO_PRESIDENCIA(){
	$("#aprovPresidenciaMIPVlrPrazo").change(function(){
		var aprovPresidenciaMIPVlrPrazo = $("#aprovPresidenciaMIPVlrPrazo").val();
		$("#hidden_aprovPresidMIPVlrPrazo").val(aprovPresidenciaMIPVlrPrazo);
		$("#hidden_AprovNegocClienteExec").val(aprovPresidenciaMIPVlrPrazo);
		if(aprovPresidenciaMIPVlrPrazo == "aprovado"){	
			$("#atividadeAprovadaVlrPrazo").val(buscarAtividadeAtual());
			$("label[for='justAprovPresidMIPVlrPrazo']").removeClass("required");
			$("#justAprovPresidMIPVlrPrazo").val('');
		}else{
			$("label[for='justAprovPresidMIPVlrPrazo']").addClass("required");			
		}
	});
}

function ativarChangeAprovacao_ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC(){
	$("#aprovPresidMIPExec").change(function(){
		var aprovPresidMIPExec = $("#aprovPresidMIPExec").val();
		$("#hidden_aprovPresidMIPExec").val(aprovPresidMIPExec);
		$("#hidden_AprovacaoInicioExecucao").val(aprovPresidMIPExec);
		if(aprovPresidMIPExec == "aprovado"){	
			$("#atividadeAprovadaExecucao").val(buscarAtividadeAtual());
			$("label[for='justAprovPresidMIPExec']").removeClass("required");
			$("#justAprovPresidMIPExec").val('');
		}else{
			$("label[for='justAprovPresidMIPExec']").addClass("required");			
		}
	});
}


function ativarChangeAprovacao_ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA(){
	$("#aprovDiretorOperac").change(function(){
		var aprovDiretorOperac = $("#aprovDiretorOperac").val();
		$("#hidden_aprovDiretorOperac").val(aprovDiretorOperac);
		if(aprovDiretorOperac == "aprovado"){	
			$("#atividadeAprovada").val(buscarAtividadeAtual());
			$("label[for='justAprovDiretorOperac']").removeClass("required");
			$("#justAprovDiretorOperac").val('');
		}else if(aprovDiretorOperac == "ajustar"){
			$("label[for='justAprovDiretorOperac']").addClass("required");			
		}
	});
}

function ativarChangeAprovacao_VALIDAR_INFORMACOES_ADCON(){
	$("#aprovADCon").change(function(){
		var aprovADCon = $("#aprovADCon").val();
		$("#hidden_aprovADCon").val(aprovADCon);
		if(aprovADCon == "aprovado"){
			$("#atividadeAprovada").val(buscarAtividadeAtual());
			$("label[for='justAprovADCon']").removeClass("required");
			$("#justAprovADCon").val('');
		}else if(aprovADCon == "ajustar"){
			$("label[for='justAprovADCon']").addClass("required");			
		}
	});
}


function setSelectedZoomItem(selectedItem) {
	 if(selectedItem.inputId == "nomeObra"){
		 var CODCCUSTO = selectedItem['CODCCUSTO'];
 
		 $('#CODCCUSTO').val(CODCCUSTO);	
		 $('#CODPRJ').val(selectedItem['CODPRJ']);	
		 $('#IDPRJ').val(selectedItem['IDPRJ']);
		 $('#DESCRICAO').val(selectedItem['DESCRICAO']);
		 $('#CODCOLIGADA_PROJETO').val(selectedItem['CODCOLIGADA']);
		 $('#VLR_TOTAL_VENDA').val(converteFormatMoney(selectedItem['VLR_TOTAL_VENDA']));
		 $('#VLR_TOTAL_CUSTO').val(converteFormatMoney(selectedItem['VLR_TOTAL_CUSTO']));
		 $('#ATIVAR_CRITICO').val(converteFormatMoney(selectedItem['ATIVAR_CRITICO']));
		 $('#chapaGerRespContrato').val(selectedItem['CHAPARESP']);
		 $('#atribuicaoGestorContrato').val(selectedItem['GESTORCONTRATO']);
		 $('#atribuicaoGestorObras').val(selectedItem['GESTOROBRAS']);

		gerarNumCGM(CODCCUSTO);
		carregarTabelaValoresEPorcentagem();
	 }
	 
	 if(selectedItem.inputId == "numCgmPrincipalCompl"){
		 $('#numSolicitPrincipalCompl').val(selectedItem['numeroSolicitacao']);
	 }
	 
	 if(selectedItem.inputId == "numCgmComplementar"){
		 $('#vlrCgmComplementar').val(selectedItem['vlrTotalInvestimento']);
		 $('#numSolicitCgmComplementar').val(selectedItem['numeroSolicitacao']);
	 }
}

function removedZoomItem(removedItem) {
 if (removedItem.inputName == "nomeObra") {
	 document.location.reload(true);

	}

}

function limparDadosDocumentos(){
	excluiTabela('tableDocumentos', 'indicePaiFilhoDoc');

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


function formatarData(getdate){
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
function ativarChangeCheckbox(){
	$(".checkboxTbl").change(function(){
		var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
		$("#excluirDoc___"+index).val('nao');
	});
}

//============================================================================================================

function ativBtnAddPaiFilhoDocumentos() {
	$("[name=botaoAddAnexoDoc]").click(function() {
			var index = wdkAddChild('anexosDoc');	
				$("#botaoAddAnexoDoc___"+index).prop('disabled', false);
			    $("#indice_linhaDoc___"+index).val(index);
			    $("#visualizarFileDoc___"+index).hide();
			    $("#deleteFileDoc___"+index).hide();
			    
			  
	});
}

function ativarDataPrevisaoIni(){
	FLUIGC.calendar('.prazoIniImplantAlt ', {
		pickDate : true,
		pickTime : false,
		language: 'pt-br',
		sideBySide: true
	});		
}

function ativarDataPrevisaoFin(){
	FLUIGC.calendar('.prazoFimImplantAlt ', {
		pickDate : true,
		pickTime : false,
		language: 'pt-br',
		sideBySide: true
	});		
}

function ativarChangeValidarDt() {
	$(".date").change(
			function() {
				var data = this.value;
				if (data != "") {
					var qtdCaracter = this.value.length;
					if (qtdCaracter < 10 || !validaData(data) || qtdCaracter == undefined) {
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

function fnCustomDelete(oElement, nameTable, classFieldSet) {
	if(oElement.className ==  "lixeiraCustomizada buttaoDeleteDoc"){
		deleteDoGedDoc(oElement);
		fnWdkRemoveChild(oElement);
	}else{
		fnWdkRemoveChild(oElement);
	}		
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

function ativarChangeOrigemMudanca(atividadeAtual){
	$("#origemMudanca").change(function(){
		if(atividadeAtual == VALIDAR_INFORMACOES_ADCON){
			$("#AdConAlterouOrigemMudanca").val('sim');
		}
		var origemMudanca = $("#origemMudanca").val();
		if(origemMudanca == "interna"){		
			$(".divFatogeradorExterno").hide();
			$("#gerarAditivoContrat").val('nao');
			//$("#gerarAditivoContrat").prop('disabled', true);
		}else{
			$(".divFatogeradorExterno").show();
			$("#gerarAditivoContrat").val('');
			//$("#gerarAditivoContrat").prop('disabled', false);
		}
});
}

function gerarNumCGM(CODCCUSTO){
	try{
	var CODCCUSTOSplit = CODCCUSTO.split('.');
	var numObra= CODCCUSTOSplit[3];
	var data = new Date();
	var ano = data.getFullYear().toString();
	
	var c1 = DatasetFactory.createConstraint('ANOCRIACAO', '', '', ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('NUMEROOBRA', numObra, numObra, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('CODCCUSTO', '', '', ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint('IDPRJ', '', '', ConstraintType.MUST);
	var constraintsForm = new Array(c1, c2, c3, c4);
	
	var datasetForm = DatasetFactory.getDataset( 'ds_VwMIP_WORC02_GERENCIAMENTO_MUDANCAS', null, constraintsForm, null);
	var array_contadores = [];
	var contadorCriacao = '';
	
	for (var i = 0; i < datasetForm.values.length; i++) {
		 contadorCriacao = datasetForm.values[i].contadorCriacao //datasetForm.getValue(i, "contadorCriacao");
		 if(contadorCriacao != ''){
		 if(parseInt(contadorCriacao) != 0){
			 array_contadores.push(parseInt(contadorCriacao));
		 }
	}
	}
	if(datasetForm.values.length == 0){
		var max = '';
		var numSquencial = 1;
	}else{
		var max = array_contadores.reduce(function(a, b) {
			  return Math.max(a, b);
		}, -Infinity);
		var numSquencial = parseInt(max) + 1;
	}

	var seqComZeroEsquerda = addZeroEsquerda(numSquencial, 3);
	var numeroCgm = "CGM-"+numObra+"-"+seqComZeroEsquerda.toString();


	$("#anoCriacao").val(ano);
	$("#contadorCriacao").val(seqComZeroEsquerda);
	$("#numeroCgm").val(numeroCgm);
	$("#numeroObra").val(numObra);
	  } catch (e) {
		  FLUIGC.message.alert(
					{
						message : "Erro na geração do Número CGM, Favor informar o campo Centro de Custo novamente. se o erro persistir acionar a TI",
						title : "Aten\u00e7\u00e3o",
						label : 'Ciente'
					}, function(el, ev) {
						$("#anoCriacao").val('');
						$("#contadorCriacao").val('');
						$("#numeroCgm").val('');
						 $('#CODCCUSTO').val('');	
						 $('#hidden_idEmpresa').val('');	
						 $('#hidden_idEmpresa').val('');
						 $('#DESCRICAO').val('');
						 $('#CODCOLIGADA_PROJETO').val('');
						 $('#VLR_TOTAL_VENDA').val('');
						 $('#VLR_TOTAL_CUSTO').val('');

							window["nomeObra"].clear
			});
	    }
}

function addZeroEsquerda(num, len) {
	var numberWithZeroes = String(num);
	  var counter = numberWithZeroes.length;     
	  while(counter < len) {  
	      numberWithZeroes = "0" + numberWithZeroes;    
	    counter++;  
	    }
	  return numberWithZeroes;
}

function encontraMaior(array) {
    var maior;
    if(array.length < 1) {
       throw new Error('Empty array');
    }

    for (let i = 0; i < array.length; i++) {
        let a, b;
        a = array[i];
        b = array[i+1];

        if (!b) {
            b = 0;
        }
        if (a > b) {
            maior = a;
        } 
        else if (b > a) {
            maior = b;
        }
        else if(a === b) {
            maior = a;
        } 
    }
    return maior;
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
function ocultarExibicoesBotao(){
	$("#divLixeiraDoc").hide();
	$(".deleteFileDoc").hide();
	$(".botaoAddAnexoDoc").hide();
	$(".div_vl_fileDoc").hide();
}

function carregarTabelaValoresEPorcentagem(){
	

	var CODCCUSTO = $("#CODCCUSTO").val();
	var IDPRJ = $("#IDPRJ").val();
	var htmlDadosTabela = '';
	var htmlDadosLinha1 = '';
	var htmlDadosLinha2 = '';
	var urlFluig = parent.WCMAPI.serverURL;
	
	var vlrTotalCGMObra = 0;
	var vlrTotalCGMObraCancelada = 0;
	var vlrTotalCGMInterna = 0;
	var vlrTotalCGMExterna = 0;
	var vlrTotalCGMInternaEmAprov = 0;
	var vlrTotalCGMExternaEmAprov = 0;
	var vlrTotalCGMInternaAprov = 0;
	var vlrTotalCGMExternaAprov = 0;
	var vlrTotalCGMExternaAprovExecucao = 0;

	
if(CODCCUSTO != '' && IDPRJ != ''){
	var ano = $('#anoCriacao').val();
	var numObra = $('#numeroObra').val();
	
	
	var c1 = DatasetFactory.createConstraint('ANOCRIACAO', '', '', ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('NUMEROOBRA', numObra, numObra, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('CODCCUSTO', CODCCUSTO, CODCCUSTO, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint('IDPRJ', IDPRJ, IDPRJ, ConstraintType.MUST);
	var constraintsForm = new Array(c1, c2, c3, c4);
	
	var datasetForm = DatasetFactory.getDataset( 'ds_VwMIP_WORC02_GERENCIAMENTO_MUDANCAS', null, constraintsForm, null);
			for(var y = 0; y < datasetForm.values.length; y++ ){
				
					var indice = y;
	
					var numeroCgm = datasetForm.values[y].numeroCgm;
					var numeroSolicitacao = datasetForm.values[y].numeroSolicitacao;
					var status = datasetForm.values[y].status;
					var statusDesc = datasetForm.values[y].status;
					var dataSolicitacao = datasetForm.values[y].dataSolicitacao;
					var origemMudanca = datasetForm.values[y].origemMudanca;
					var vlrTotalInvestimento = ConvertReal(datasetForm.values[y].vlrTotalInvestimento);
					var vlrNegativo = datasetForm.values[y].vlrNegativo;
					if(vlrNegativo == 'on' && status != 'cancelado'){		
						vlrTotalCGMObra -= parseFloat(vlrTotalInvestimento);
					}else if (vlrNegativo != 'on' && status != 'cancelado'){
						vlrTotalCGMObra += parseFloat(vlrTotalInvestimento);
					}
					
					
				
					
					
					if(status == 'emElaboracao'){
						statusDesc = 'Em Elaboração';
		
					}else if(status == 'intEmAprovacaoMip'){
						if(vlrNegativo == 'on' && status != 'cancelado'){
							vlrTotalCGMInternaEmAprov -= parseFloat(vlrTotalInvestimento);
						}else if (vlrNegativo != 'on' && status != 'cancelado'){
							vlrTotalCGMInternaEmAprov += parseFloat(vlrTotalInvestimento);
						}
						
						statusDesc = 'Em Aprov. MIP';
					}else if(status == 'intAprovadaMip'){
						if(vlrNegativo == 'on' && status != 'cancelado'){
							vlrTotalCGMInternaAprov -= parseFloat(vlrTotalInvestimento);
						}else if (vlrNegativo != 'on' && status != 'cancelado'){
							vlrTotalCGMInternaAprov += parseFloat(vlrTotalInvestimento);
						}
						
						statusDesc = 'Aprovada Internamente MIP';
					}else if(status == 'intFinalizadaMip'){
						
						statusDesc = 'Finalizada Internamente MIP';
						if(vlrNegativo == 'on' && status != 'cancelado'){
							vlrTotalCGMInternaAprov -= parseFloat(vlrTotalInvestimento);
						}else if (vlrNegativo != 'on' && status != 'cancelado'){
							vlrTotalCGMInternaAprov += parseFloat(vlrTotalInvestimento);
						}
					}else if(status == 'extEmAprovApresentCliente'){
						statusDesc = 'Em Aprov.Apresentação Cliente';
					}else if(status == 'extEmNegocClientePleito'){
						if(vlrNegativo == 'on' && status != 'cancelado'){
							vlrTotalCGMExternaEmAprov -= parseFloat(vlrTotalInvestimento);
						}else if (vlrNegativo != 'on' && status != 'cancelado'){
							vlrTotalCGMExternaEmAprov += parseFloat(vlrTotalInvestimento);
						}
						
						statusDesc = 'Em Negociação Pleito';
					}else if(status == 'extEmNegocClienteVlrPrazExec'){
						if(vlrNegativo == 'on' && status != 'cancelado'){
							vlrTotalCGMExternaEmAprov -= parseFloat(vlrTotalInvestimento);
						}else if (vlrNegativo != 'on' && status != 'cancelado'){
							vlrTotalCGMExternaEmAprov += parseFloat(vlrTotalInvestimento);
						}
						
						statusDesc = 'Em Negociação Cliente Vlr/Prazo/Exec';
					}else if(status == 'extEmNegociClienteExecAprovMip'){
						if(vlrNegativo == 'on' && status != 'cancelado'){
							vlrTotalCGMExternaAprovExecucao -= parseFloat(vlrTotalInvestimento);
						}else if (vlrNegativo != 'on' && status != 'cancelado'){
							vlrTotalCGMExternaAprovExecucao += parseFloat(vlrTotalInvestimento);
						}
						
						statusDesc = 'Em Negociação Cliente Vlr/Prazo/Exec. Com Aprov. Exec MIP';
					}else if(status == 'aprovadoExecucaoMipECliente'){
						statusDesc = 'Aprov. Mip e Cliente';
					}else if(status == 'cancelado' ){
						vlrTotalCGMObraCancelada += parseFloat(vlrTotalInvestimento);

						statusDesc = 'Cancelado';
					}else if(status == 'finalizadoExecucaoMipECliente'){
						if(vlrNegativo == 'on' && status != 'cancelado'){
							vlrTotalCGMExternaAprov -= parseFloat(vlrTotalInvestimento);
						}else if (vlrNegativo != 'on' && status != 'cancelado'){
							vlrTotalCGMExternaAprov += parseFloat(vlrTotalInvestimento);
						}
						statusDesc = 'Finalizado Aprov. Execucao MIP e Cliente';
					}
					
					
					
					if(origemMudanca == 'interna' && status != 'cancelado'){
						origemMudanca = 'Interna';
							vlrTotalCGMInterna += parseFloat(vlrTotalInvestimento);
					}else if(origemMudanca == 'externa' && status != 'cancelado'){
						origemMudanca = 'Externa';
							vlrTotalCGMExterna += parseFloat(vlrTotalInvestimento);
					}
					
					var tipoRevisao = datasetForm.values[y].tipoRevisao;
					if(tipoRevisao == 'externoAditivoContCliente'){
						tipoRevisao = 'Aditivo Contratual Cliente';
					}else if(tipoRevisao == 'internoAditivoContrFornecedor'){
						tipoRevisao = 'Aditivo Contratual Fornencedor';
					}else if(tipoRevisao == 'reajustes'){
						tipoRevisao = 'Reajustes';
					}else if(tipoRevisao == 'outros'){
						tipoRevisao = 'Outros';
					}
					
					var vlrTotalInvestimento = datasetForm.values[y].vlrTotalInvestimento;
					var prazoIniImplantAlt = datasetForm.values[y].prazoIniImplantAlt;
					var prazoFimImplantAlt = datasetForm.values[y].prazoFimImplantAlt;
					//var xxxxxxx = datasetForm.values[y].xxxxxxx;
					
					htmlDadosTabela += '<tr class="" id="trTabela">';
					htmlDadosTabela += '<td class="text-center"><a target="_blank" href="'+ urlFluig +'/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+numeroSolicitacao+'">'+numeroCgm+'</a></td>';
					htmlDadosTabela += '<td class="text-center"><a target="_blank" href="'+ urlFluig +'/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+numeroSolicitacao+'">'+numeroSolicitacao+'</a></td>';
					htmlDadosTabela += '<td class="text-center">'+dataSolicitacao+'</td>';
					htmlDadosTabela += '<td class="text-center">'+origemMudanca+'</td>';
					htmlDadosTabela += '<td class="text-center">'+tipoRevisao+'</td>';
					htmlDadosTabela += '<td class="text-center">'+vlrTotalInvestimento+'</td>';
					htmlDadosTabela += '<td class="text-center">'+prazoIniImplantAlt+'</td>';
					htmlDadosTabela += '<td class="text-center">'+prazoFimImplantAlt+'</td>';
					htmlDadosTabela += '<td class="text-center">'+statusDesc+'</td>';
					htmlDadosTabela += '</tr>';
					
		}	
			if(datasetForm.values.length > 0){
				$("#tbodyDatatableSolicitRevEmAberto").append(htmlDadosTabela);
				 $('#tbSolicitRevEmAberto').DataTable({
					 "language": {
				            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese-Brasil.json"
				        },
		});
				$(".divTabelaSolicitRevEmAberto").show();
				
			
					htmlDadosLinha1 += '<tr class="" id="trTabela">';
					htmlDadosLinha1 += '<td class="text-center" width="20%">'+converteFormatMoney(vlrTotalCGMExterna)+'</td>';
					htmlDadosLinha1 += '<td class="text-center" width="20%">'+converteFormatMoney(vlrTotalCGMExternaEmAprov)+'</td>';
					htmlDadosLinha1 += '<td class="text-center" width="20%">'+converteFormatMoney(vlrTotalCGMExternaAprov)+'</td>';
					htmlDadosLinha1 += '<td class="text-center" width="20%">'+converteFormatMoney(vlrTotalCGMExternaAprovExecucao)+'</td>';
					htmlDadosLinha1 += '<td class="text-center" width="20%" bgcolor="#F5F5DC">'+converteFormatMoney(vlrTotalCGMObra)+'</td>';
					htmlDadosLinha1 += '</tr>';
					
					htmlDadosLinha2 += '<tr class="" id="trTabelaTotal">';
					htmlDadosLinha2 += '<td class="text-center" width="20%">'+converteFormatMoney(vlrTotalCGMInterna)+'</td>';
					htmlDadosLinha2 += '<td class="text-center" width="20%">'+converteFormatMoney(vlrTotalCGMInternaEmAprov)+'</td>';
					htmlDadosLinha2 += '<td class="text-center" width="20%">'+converteFormatMoney(vlrTotalCGMInternaAprov)+'</td>';
					htmlDadosLinha2 += '<td class="text-center" width="20%">'+converteFormatMoney(vlrTotalCGMInternaAprov)+'</td>';
					htmlDadosLinha2 += '<td class="text-center" width="20%" bgcolor="#FFE4C4">'+converteFormatMoney(vlrTotalCGMObraCancelada)+'</td>';
					htmlDadosLinha2 += '</tr>';
					
					$("#tbodyTotalizador1").append(htmlDadosLinha1);
					$("#tbodyTotalizador2").append(htmlDadosLinha2);
					$(".divTabelaTotalizador").show();
	
		}		
	}
}
 function alterarStatusFinalizado(){
	 if($("#status").val() == 'aprovadoInterna'){
		 $("#status").val('finalizadoInterno');
	 }else if($("#status").val() == 'aprovadoExecucaoMip'){
		 $("#status").val('finalizadoExecucaoMip');
	 }else if($("#status").val() == 'aprovadoExecucaoMipECliente'){
		 $("#status").val('finalizadoExecucaoMipECliente');
	 }
 }

function ajustarTextAreaImpressao(){
	$("textarea").on('keyup input keypress keydown change', function(e) {
	    var tamanhoMin =  $(this).attr('rows') * $(this).css('line-height').replace(/[^0-9\.]+/g, '');
	    $(this).css({'height': 'auto'});
	    var novoTamanho = this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"));
	    if (tamanhoMin > novoTamanho) novoTamanho = tamanhoMin;
	    $(this).css({'height': novoTamanho});
	}).css({
	    'overflow':'hidden', 
	    'resize':'none'
	}).delay(0).show(0, function() {
	    var el = $(this);
	    setTimeout(function () {
	        el.trigger('keyup');
	    }, 100);        
	});
}

function limparAprovacoes(){
	
	$("#hidden_aprovGestorContrato").val('');
	$("#hidden_aprovGestorObra").val('');
	$("#hidden_aprovDiretorOperac").val('');
	$("#hidden_aprovDiretorComerc").val('');
	$("#hidden_aprovPresidenciaMIP").val('');
	
	$("#aprovGestorContrato").val('');
	$("#aprovGestorObra").val('');
	$("#aprovDiretorOperac").val('');
	$("#aprovDiretorComerc").val('');
	$("#aprovPresidenciaMIP").val('');
	
}
