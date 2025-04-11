function afterTaskComplete(colleagueId,nextSequenceId,userList){
	var WKNumState = getValue("WKNumProces");
	 var atividade = getValue('WKCurrentState');

	if(nextSequenceId == 301 && atividade == 336){
		notificacao();
	}
	if(nextSequenceId == 446){
		var dataAssinatura = hAPI.getCardValue("dataAssinatura");
		var responsavelHomologa = hAPI.getCardValue("responsavelHomologa");
		if(dataAssinatura == '' && responsavelHomologa == ''){
			var WKCompany = getValue("WKCompany");
			var numSolicitacao = getValue("WKNumProces");
			 var numThread = hAPI.getActualThread(WKCompany, numSolicitacao, nextSequenceId);
			 //log.info("IF INICIO - afterTaskComplete Processo Desligamento numThread: "+numThread);
			hAPI.setTaskComments("reqti", numSolicitacao,  0, "Atividade avançada automaticamente, Prazo da atividade expirado")
		}	
	}
	
	
}

function notificacao(){
	try{
	var cardData = hAPI.getCardData( getValue("WKNumProces") );
	var aberturaDP = cardData.get("aberturaDP");
	if(aberturaDP = 'sim'){
	var destinatarios = new java.util.ArrayList();

	var c1 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "44", "44", ConstraintType.MUST);
	var constraints   = new Array(c1);

	var dataset = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);
	if (dataset.rowsCount > 0) {	
		var matriculaResponsavelAtiv = dataset.getValue(0, "workflowColleagueRolePK.colleagueId");
		destinatarios.add(matriculaResponsavelAtiv);		
	}

		var ds_dadosServer = getDadosServer();		
		
		var SERVER_URL = ds_dadosServer.getValue(0, "SERVER_URL");
		var WKCompany = getValue("WKCompany");
		var nroSolicitacao = cardData.get("nroSolicitacao");
		
	    var parametros = new java.util.HashMap();
	    parametros.put( "SERVER_URL", SERVER_URL );
	    parametros.put( "TENANT_ID", getValue("WKCompany") );
	    parametros.put( "WDK_TaskLink", SERVER_URL + "/portal/p/" + WKCompany + "/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + nroSolicitacao );
	    parametros.put( "WDK_TaskNumber", nroSolicitacao );
	    parametros.put( "LINK", SERVER_URL + "/portal/p/" + WKCompany + "/globalalertview" );
	    

	    parametros.put( "WDK_obraSetor", cardData.get("obraSetor") );
	    parametros.put( "WDK_funcionario", cardData.get("funcionario") );
	    parametros.put( "WDK_motivoDemissaoRM", cardData.get("motivoDemissaoRM") );
	    parametros.put( "WDK_chapa", cardData.get("chapa") );
	   
	    parametros.put( "WDK_funcao", cardData.get("funcao") );
	    parametros.put( "WDK_secao", cardData.get("secao") );
	    parametros.put( "WDK_dataPrevistaDemissao", cardData.get("dataPrevistaDemissao"));
	    
	    
	    parametros.put("subject", "Solicitação de Desligamento nro " + nroSolicitacao);
	    notifier.notify("adm", "notificacao_desligamento_diretor", parametros, destinatarios, "text/html");
	}
	} catch(e){
	    log.error(e);
	    throw "Ocorreu um erro ao enviar o email da solicitação de desligamento. Mensagem interna: " + e;
	}

}

function getDadosServer(){
	return DatasetFactory.getDataset('ds_mip_connector', null, null, null);
}