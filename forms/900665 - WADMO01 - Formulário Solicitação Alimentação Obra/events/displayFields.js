function displayFields(form,customHTML){ 
	form.setShowDisabledFields(true);
	recuperarAtividadeJS(form, customHTML);
	var atividade = getValue("WKNumState");
	
	if(atividade == INICIO_0 || atividade == INICIO ){			
		form.setValue("dataSolicitacao", buscaDataAtual());
		form.setValue("nomeSolicitante", buscarNomeUsuario());
		form.setValue("matrSolicitante", getValue("WKUser"));
		
	}else if(atividade == VALIDAR_CONCLUSAO){
		form.setValue("dataAprovacao", buscaDataAtual());
		form.setValue("nomeAprovador", buscarNomeUsuario());
	}else{

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
