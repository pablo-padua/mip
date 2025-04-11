function displayFields(form,customHTML){ 
	
	form.setShowDisabledFields(true);
	
	recuperarAtividadeJS(form, customHTML);
	
	var atividadeAtual = getValue("WKNumState");
	var FORM_MODE = form.getFormMode();
		
	if(atividadeAtual == 0 || atividadeAtual == 20){		
		form.setValue("dataSolicitacao", buscaDataAtual());
		form.setValue("nomeSolicitante", buscarNomeUsuario());		
	} 
	// APROV_GERENCIA
	else if (atividadeAtual == 26 && FORM_MODE == "MOD"){
		form.setValue("dataAprovacao", buscaDataAtual());
		form.setValue("nomeAprovador", buscarNomeUsuario());	
	}
	// APROV_DIRETOR
	else if (atividadeAtual == 73 && FORM_MODE == "MOD"){
		form.setValue("nomeAprovadorDir", buscarNomeUsuario());
		form.setValue("dataAprovacaoDir", buscaDataAtual());
	}
	// CRIAR_TABELA
	else if (atividadeAtual == 95 && FORM_MODE == "MOD"){
		form.setValue("nomeRespCriarFunc", buscarNomeUsuario());
		form.setValue("dataCriarFunc", buscaDataAtual());
	}
	// AJUSTAR_INTEGRACAO_1
	else if (atividadeAtual == 123 && FORM_MODE == "MOD"){
		
	}
	//AJUSTAR_INTEGRACAO_2
	else if (atividadeAtual == 119 && FORM_MODE == "MOD"){
		
	}
	//CONFERIR_TABELA
	else if (atividadeAtual == 111 && FORM_MODE == "MOD"){
		form.setValue("nomeConferir", buscarNomeUsuario());
		form.setValue("dataConferir", buscaDataAtual());
	}
	//VINCULAR_RISCOS
	else if (atividadeAtual == 87 && FORM_MODE == "MOD"){
		form.setValue("nomeVincRiscos", buscarNomeUsuario());
		form.setValue("dataVincRiscos", buscaDataAtual());
	}
}

function recuperarAtividadeJS(form, customHTML) {
	customHTML.append("<script>function buscarMatriculaUsuarioLogado(){return " + "'" + buscarMatriculaUsuarioLogado() + "'" + ";}</script>");
	customHTML.append("<script>function buscarEmpresa(){return " + buscarEmpresa() + ";}</script>");
	customHTML.append("<script>function buscarAtividadeAtual(){return " + buscarAtividadeAtual() + ";}</script>");
	customHTML.append("<script>function buscarIdSolicitacao(){return " + buscarIdSolicitacao() + ";}</script>");
	customHTML.append("<script> var FORM_MODE = '" + form.getFormMode() + "';</script>");
}