function displayFields(form,customHTML){
	form.setShowDisabledFields(true);
	
	recuperarAtividadeJS(form, customHTML);
	
	var atividade = getValue("WKNumState");
	var FORM_MODE = form.getFormMode();
	
	if(atividade == INICIO_0 || atividade == INICIO){		
		form.setValue("dataSolicitacao", buscaDataAtual());
		form.setValue("nomeSolicitante", buscarNomeUsuario());		
	} 
	else if(atividade == APROV_GERENTE && FORM_MODE == "MOD"){			
		form.setValue("dataAprovacaoAlteracao", buscaDataAtual());
		form.setValue("nomeAprovadorAlteracao", buscarNomeUsuario());
	} 
	else if(atividade == APLICA_TESTE && FORM_MODE == "MOD"){
		form.setValue("dataAprovacaoTestes", buscaDataAtual());
		form.setValue("nomeAprovadorTestes", buscarNomeUsuario());
	} 
	else if(atividade == APROV_GERSEDE && FORM_MODE == "MOD"){
		form.setValue("dataGerSede", buscaDataAtual());
		form.setValue("nomeGerSede", buscarNomeUsuario());
	}
	else if(atividade == APROV_TESTE && FORM_MODE == "MOD"){	
		form.setValue("dataAprovTestesValida", buscaDataAtual());
		form.setValue("nomeAprovadorTestesValida", buscarNomeUsuario());
	} 
	else if(atividade == APROV_DIRETORIA && FORM_MODE == "MOD"){	
		form.setValue("dataAprovDiretoria", buscaDataAtual());
		form.setValue("nomeAprovadorDiretoria", buscarNomeUsuario());
	} 
	else if(atividade == APROV_PRESID && FORM_MODE == "MOD"){	
		form.setValue("dataAprovPresidente", buscaDataAtual());
		form.setValue("nomeAprovadorPresidente", buscarNomeUsuario());
	} 
	else if(atividade == REALIZA_EXAMES && FORM_MODE == "MOD"){	
		form.setValue("dataAprovExames", buscaDataAtual());
		form.setValue("nomeAprovadorExames", buscarNomeUsuario());
	} 
	else if(atividade == VALIDA_DADOS_OBRA && FORM_MODE == "MOD"){	
		form.setValue("dataValidDadosObra", buscaDataAtual());
		form.setValue("nomeValidDadosObra", buscarNomeUsuario());
	}
	else if(atividade == VALIDAR_SALARIO && FORM_MODE == "MOD"){
		form.setValue("dataValidarSalario", buscaDataAtual());
		form.setValue("nomeValidarSalario", buscarNomeUsuario());
	}
	else if(atividade == EFETIVAR_ALTERACAO && FORM_MODE == "MOD"){	
		form.setValue("dataEfetivar", buscaDataAtual());
		form.setValue("nomeEfetivar", buscarNomeUsuario());	
	}
}

function recuperarAtividadeJS(form, customHTML) {
	customHTML.append("<script>function buscarMatriculaUsuarioLogado(){return " + "'" + buscarMatriculaUsuarioLogado() + "'" + ";}</script>");
	customHTML.append("<script>function buscarEmpresa(){return " + buscarEmpresa() + ";}</script>");
	customHTML.append("<script>function buscarAtividadeAtual(){return " + buscarAtividadeAtual() + ";}</script>");
	customHTML.append("<script>function buscarIdSolicitacao(){return " + buscarIdSolicitacao() + ";}</script>");
	customHTML.append("<script> var FORM_MODE = '" + form.getFormMode() + "';</script>");
}