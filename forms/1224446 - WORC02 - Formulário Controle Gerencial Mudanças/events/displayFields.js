function displayFields(form,customHTML){ 
	form.setShowDisabledFields(true);
	recuperarAtividadeJS(form, customHTML);
	
	var atividade = getValue("WKNumState");

	if(atividade == INICIO_0 || atividade == INICIO ){			
		form.setValue("dataSolicitacao", buscaDataAtual());
		form.setValue("nomeSolicitante", buscarNomeUsuario());
		form.setValue("matrSolicitante", getValue("WKUser"));
	}else if(atividade == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO){
		form.setValue("dataAprovGestorContrato", buscaDataAtual());
		form.setValue("nomeAprovGestorContrato", buscarNomeUsuario());
	}else if(atividade == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA){
		form.setValue("dataAprovacaoGerenteDoc", buscaDataAtual());
		form.setValue("nomeAprovadorGerenteDoc", buscarNomeUsuario());
	}else if(atividade == VALIDAR_INFORMACOES_ADCON){
		form.setValue("dataAprovADCon", buscaDataAtual());
		form.setValue("nomeAprovADCon", buscarNomeUsuario());
	}else if(atividade == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT || atividade == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE ){
		form.setValue("dataAprovDiretorOperac", buscaDataAtual());
		form.setValue("nomeAprovDiretorOperac", buscarNomeUsuario());
	}else if(atividade == ANALISE_APROV_PRESIDENCIA_MIP || atividade == ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE){
		form.setValue("dataAprovPresidenciaMIP", buscaDataAtual());
		form.setValue("nomeAprovPresidenciaMIP", buscarNomeUsuario());
	}else if(atividade == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE){
		form.setValue("dataAprovGestorContrato", buscaDataAtual());
		form.setValue("nomeAprovGestorContrato", buscarNomeUsuario());
	}else if(atividade == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE){
		form.setValue("dataAprovGestorObra", buscaDataAtual());
		form.setValue("nomeAprovGestorObra", buscarNomeUsuario());
	}else if(atividade == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE || atividade == ANALISE_TRATAMENTO_APROV_DIR_COMERCIAL_INT){
		form.setValue("dataAprovDiretorComerc", buscaDataAtual());
		form.setValue("nomeAprovDiretorComerc", buscarNomeUsuario());
	}else if(atividade == APROVACAO_CLIENTE_MERITO_TAC_PLEITO){
		form.setValue("dataAprovMIPConatoCliente", buscaDataAtual());
		form.setValue("nomeRespMIPConatoCliente", buscarNomeUsuario());
	}else if(atividade == NEGOCIACAO_CLIENTE_APROV_VLR_PRAZO_EXECUCAO){
		form.setValue("dataAprovRespMIPVlrPrazo", buscaDataAtual());
		form.setValue("nomeRespMIPConatoVlrPrazo", buscarNomeUsuario());
	}else if(atividade == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC){
		form.setValue("dataAprovDirOperacExec", buscaDataAtual());
		form.setValue("nomeAprovDirOperacExec", buscarNomeUsuario());
	}else if(atividade == ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC){
		form.setValue("dataAprovDirComercExec", buscaDataAtual());
		form.setValue("nomeAprovDirComercExec", buscarNomeUsuario());
	}else if(atividade == ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC){
		form.setValue("dataAprovPresidMIPExec", buscaDataAtual());
		form.setValue("nomeAprovPresidMIPExec", buscarNomeUsuario());
	}else if(atividade == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA){
		form.setValue("dataAprovDirOperacVlrPrazo", buscaDataAtual());
		form.setValue("nomeAprovDirOperacVlrPrazo", buscarNomeUsuario());
	}else if(atividade == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL){
		form.setValue("dataAprovDirComercVlrPrazo", buscaDataAtual());
		form.setValue("nomeAprovDirComercVlrPrazo", buscarNomeUsuario());
	}else if(atividade == ANALISE_APROVACAO_PRESIDENCIA){
		form.setValue("dataAprovPresidMIPVlrPrazo", buscaDataAtual());
		form.setValue("nomeAprovPresidMIPVlrPrazo", buscarNomeUsuario());
	}else if(atividade == ''){
		form.setValue("dataAprovacaoDiretorDoc", buscaDataAtual());
		form.setValue("nomeAprovadorDiretorDoc", buscarNomeUsuario());
	}
}

function recuperarAtividadeJS(form, customHTML) {

	customHTML.append("<script>function buscarUsuarioLogado(){return " + "'"
			+ getValue('WKUser') + "'" + ";}</script>");
	customHTML.append("<script>function buscaEmpresa(){return "
			+ getValue('WKCompany') + ";}</script>");
	customHTML.append("<script>function buscarAtividadeAtual(){return "
			+ getValue("WKNumState") + ";}</script>");
	customHTML.append("<script>function buscarModoForm(){return '"
			+ form.getFormMode() + "';}</script>");
	
}



