function displayFields(form,customHTML){
	
	form.setShowDisabledFields(true);
	
	recuperarAtividadeJS(form, customHTML);
	var atividade = getValue("WKNumState");
	
	if((atividade == 0 || atividade == 4) && form.getFormMode() != 'VIEW' ){
		form.setValue("dataSolicitacao", buscaDataAtual());
		form.setValue("nomeSolicitante", buscarNomeUsuario());
	}else if(atividade == 16){
		form.setValue("dataAprovacao", buscaDataAtual());
		form.setValue("nomeAprovador", buscarNomeUsuario());
	}else if(atividade == 319){
		form.setValue("dataAprovacao2", buscaDataAtual());
		form.setValue("nomeAprovador2", buscarNomeUsuario());
	}else if(atividade == 429){
		form.setValue("dataVerificarAvaliacao", buscaDataAtual());
		form.setValue("nomeVerificarAvaliacao", buscarNomeUsuario());
	}else if(atividade == 466){
		form.setValue("dataAprovacaoSede", buscaDataAtual());
		form.setValue("nomeAprovadorSede", buscarNomeUsuario());
	}else if(atividade == 453){
		form.setValue("dataAprovacaoRH", buscaDataAtual());
		form.setValue("nomeAprovadorRH", buscarNomeUsuario());
	}else if(atividade == 113){
		form.setValue("dataAviso", buscaDataAtual());
		form.setValue("responsavelAviso", buscarNomeUsuario());
	}else if(atividade == 254){			
		form.setValue("dataEntrevista", buscaDataAtual());
		form.setValue("responsavelEntrevista", buscarNomeUsuario());
	}else if(atividade == 227){			
		form.setValue("dataTI", buscaDataAtual());
		form.setValue("responsavelTI", buscarNomeUsuario());
	}else if(atividade == 385){			
		form.setValue("dataEPI", buscaDataAtual());
		form.setValue("responsavelEPI", buscarNomeUsuario());
	}else if(atividade == 237){			
		form.setValue("dataADM", buscaDataAtual());
		form.setValue("responsavelADM", buscarNomeUsuario());
	}else if(atividade == 239){			
		form.setValue("dataFIN", buscaDataAtual());
		form.setValue("responsavelFIN", buscarNomeUsuario());
	}else if(atividade == 75){			
		form.setValue("dataExames", buscaDataAtual());
		form.setValue("responsavelExames", buscarNomeUsuario());
	}else if(atividade == 341){			
		form.setValue("dataCalculoObra", buscaDataAtual());
		form.setValue("responsavelCalculoObra", buscarNomeUsuario());
	}else if(atividade == 243){			
		form.setValue("dataCalculoSede", buscaDataAtual());
		form.setValue("responsavelCalculoSede", buscarNomeUsuario());
	}else if(atividade == 356){			
		form.setValue("dataValidacaoObra", buscaDataAtual());
		form.setValue("nomeValidacaoObra", buscarNomeUsuario());
	}else if(atividade == 366){			
		form.setValue("dataValidacaoSede", buscaDataAtual());
		form.setValue("nomeValidacaoSede", buscarNomeUsuario());
	}else if(atividade == 358){			
		form.setValue("dataFechamento", buscaDataAtual());
		form.setValue("responsavelFechamento", buscarNomeUsuario());
	}else if(atividade == 247){			
		form.setValue("dataHomologa", buscaDataAtual());
		form.setValue("responsavelHomologa", buscarNomeUsuario());
	}else if(atividade == 483){			
		form.setValue("dataValidDocAso", buscaDataAtual());
		form.setValue("nomeAprovValidDocAso", buscarNomeUsuario());
	}
	ajusteData(form);
	
}

function ajusteData(form) {
	tratarDataAmericana("dataSolicitacao", form);
	tratarDataAmericana("dataAdmissao", form);
	tratarDataAmericana("dataPrevistaDemissao", form);
	tratarDataAmericana("dataAprovacao", form);
	tratarDataAmericana("dataAprovacao2", form);
	tratarDataAmericana("dataVerificarAvaliacao", form);
	tratarDataAmericana("dataAprovacaoSede", form);
	tratarDataAmericana("dataAprovacaoRH", form);
	tratarDataAmericana("dataAviso", form);
	tratarDataAmericana("dataInicioAviso", form);
	tratarDataAmericana("dataDemissaoPrevista", form);
	tratarDataAmericana("dataDemissao", form);
	tratarDataAmericana("dataEntrevista", form);	
	tratarDataAmericana("dataTI", form);
	tratarDataAmericana("dataEPI", form);
	tratarDataAmericana("dataADM", form);
	tratarDataAmericana("dataFIN", form);
	tratarDataAmericana("dataExames", form);
	tratarDataAmericana("dataAgendamento", form);	
	tratarDataAmericana("dataCalculoObra", form);
	tratarDataAmericana("dataCalculoSede", form);
	tratarDataAmericana("dataValidacaoObra", form);	
	tratarDataAmericana("dataValidacaoSede", form);
	tratarDataAmericana("dataFechamento", form);
	tratarDataAmericana("dataPagamento", form);
	tratarDataAmericana("dataHomologa", form);
	tratarDataAmericana("dataAssinatura", form);	
}

function tratarDataAmericana(campo, form){
	var dataDesp = form.getValue(campo);
	 var split = dataDesp.split('-');
	 if (split[0] != undefined && split[1] != undefined && split[2] != undefined){
		 form.setValue(campo, split[2] + '/' + split[1] + '/' + split[0]);
	 }
}

function recuperarAtividadeJS(form, customHTML) {
	customHTML.append("<script>function buscarMatriculaUsuarioLogado(){return " + "'" + buscarMatriculaUsuarioLogado() + "'" + ";}</script>");
	customHTML.append("<script>function buscarEmpresa(){return " + buscarEmpresa() + ";}</script>");
	customHTML.append("<script>function buscarAtividadeAtual(){return " + buscarAtividadeAtual() + ";}</script>");
	customHTML.append("<script>function buscarIdSolicitacao(){return " + buscarIdSolicitacao() + ";}</script>");
	customHTML.append("<script> var FORM_MODE = '" + form.getFormMode() + "';</script>");
}