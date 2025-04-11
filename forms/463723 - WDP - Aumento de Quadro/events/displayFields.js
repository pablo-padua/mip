function displayFields(form,customHTML){ 
	
	form.setShowDisabledFields(true);
	
	recuperarAtividadeJS(form, customHTML);
	var atividade = getValue("WKNumState");
	
	if(atividade == taskProcessoSeletivoRH){
		form.setValue("dataAprovacaoSelecao", buscaDataAtual());
		form.setValue("nomeAprovadorSelecao", buscarNomeUsuario());
		form.setValue("NumProces", getValue("WKNumProces"));
		
	}
	else if(atividade == taskProcessoSeletivoDP){

		if(form.getValue("dataAprovacaoSelecao") == "") {
			form.setValue("dataAprovacaoSelecao", buscaDataAtual());
			form.setValue("nomeAprovadorSelecao", buscarNomeUsuario());
		}
		
		form.setValue("dataAprovacaoSelecaoDP", buscaDataAtual());
		form.setValue("nomeAprovadorSelecaoDP", buscarNomeUsuario());
		form.setValue("NumProces", getValue("WKNumProces"));
	}
	else if(atividade == taskConferirTestes){
		form.setValue("dataAprovTestesValida", buscaDataAtual());
		form.setValue("nomeAprovadorTestesValida", buscarNomeUsuario());
	}
	else if(atividade == taskTestesReprovadosRH){
		form.setValue("dataAprovTestesReprovados", buscaDataAtual());
		form.setValue("nomeAprovadorTestesReprovados", buscarNomeUsuario());
	}
	else if(atividade == taskAprovarCandidatoSolicitante){
		form.setValue("dataAprovacao", buscaDataAtual());
		form.setValue("nomeAprovador", buscarNomeUsuario());
	}
	else if(atividade == taskAprovarCandidatoGestor){
		form.setValue("dataAprovacao2", buscaDataAtual());
		form.setValue("nomeAprovador2", buscarNomeUsuario());
	}
	else if(atividade == taskAgendarExamesAdmissionais){
		form.setValue("dataAgendarExames", buscaDataAtual());
		form.setValue("nomeAgendarExames", buscarNomeUsuario());
	}
	else if(atividade == taskValidarDocumentacao){
		form.setValue("dataAprovacaoDoc", buscaDataAtual());
		form.setValue("nomeAprovadorDoc", buscarNomeUsuario());
	}	
	else if(atividade == taskRealizarExamesAdmissionais){
		form.setValue("dataAprovacaoMedicina", buscaDataAtual());
		form.setValue("nomeAprovadorMedicina", buscarNomeUsuario());
	}
	else if(atividade == taskAdmitirColaborador){
		form.setValue("dataAprovacaoAdmissao", buscaDataAtual());
		form.setValue("nomeAprovadorAdmissao", buscarNomeUsuario());
	}
	else if(atividade == taskEntregarCracha){
		form.setValue("dataCracha", buscaDataAtual());
		form.setValue("responsavel", buscarNomeUsuario());
	}
	else if(atividade == taskTreinarColaborador){
		form.setValue("dataAprovacaoSeguranca", buscaDataAtual());
		form.setValue("nomeAprovadorSeguranca", buscarNomeUsuario());
	}
	ajusteData(form);

}

function ajusteData(form) {
	tratarDataAmericana("dataSolicitacao", form);	
	tratarDataAmericana("dataContato", form);
	tratarDataAmericana("dataChegada", form);
	tratarDataAmericana("dtNascimentoDepend", form);
	tratarDataAmericana("dataPrevAdmissao", form);
	tratarDataAmericana("Nascimento", form);
	tratarDataAmericana("dataAprovacaoSelecao", form);
	tratarDataAmericana("dataAprovacao", form);
	tratarDataAmericana("dataAprovacao2", form);
	tratarDataAmericana("dataAprovacaoDoc", form);	
	tratarDataAmericana("dataAgendarExames", form);
	tratarDataAmericana("dataAprovacaoMedicina", form);
	tratarDataAmericana("dataAprovacaoAdmissao", form);
	tratarDataAmericana("dataAdmissao", form);	
	tratarDataAmericana("dataAprovacaoSeguranca", form);
	tratarDataAmericana("dataTreinaMIP", form);
	tratarDataAmericana("dataTreinaCliente", form);
	tratarDataAmericana("dataCracha", form);
	tratarDataAmericana("dataSolicCracha", form);
	tratarDataAmericana("dataLiberaCracha", form);
	tratarDataAmericana("dataEmissaoASO", form);
}

function tratarDataAmericana(campo, form){
	var dataDesp = form.getValue(campo);
	 var split = dataDesp.split('-');
	 if (split[0] != undefined && split[2] != undefined && split[2] != undefined){
		 form.setValue(campo, split[2] + '/' + split[1] + '/' + split[0]);
	 }	 
}

function recuperarAtividadeJS(form, customHTML) {
	customHTML.append("<script>function buscarMatriculaUsuarioLogado(){return " + "'" + buscarMatriculaUsuarioLogado() + "'" + ";}</script>");
	customHTML.append("<script>function buscarEmpresa(){return " + buscarEmpresa() + ";}</script>");
	customHTML.append("<script>function buscarAtividadeAtual(){return " + buscarAtividadeAtual() + ";}</script>");
	customHTML.append("<script>function buscarIdSolicitacao(){return " + buscarIdSolicitacao() + ";}</script>");
	customHTML.append("<script> var FORM_MODE = '" + form.getFormMode() + "';</script>");
	customHTML.append("<script>function buscarManagerMode(){return " + buscarManagerMode() + ";}</script>");

}