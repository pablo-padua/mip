function servicetask257(attempt, message) {
	
	//log.info("servicetask257");
	
	try {
		
		var integra = integrarFuncionario();
		
		log.info("servicetask257 integrarFuncionario: " + integra);
				
		if (!integra)
			throw "Ocorreu um erro inesperado durante a Integracao do Funcionário. Entre em contato com a equipe de TI.";
			
		var integra = integrarHorario();

		log.info("servicetask257 integrarHorario: " + integra);
				
		if (!integra)
			throw "Ocorreu um erro inesperado durante a Integracao do Horário do Funcionário. Entre em contato com a equipe de TI.";
		
		var integra = deletarDepend();
		
		log.info("servicetask257 deletarDepend: " + integra);
		
		if (!integra)
			throw "Ocorreu um erro inesperado durante a Integracao (deletarDepend) dos Dependente(s) do Funcionário. Entre em contato com a equipe de TI.";
		
		var integra = integrarDepend();
		
		log.info("servicetask257 integrarDepend: " + integra);
		
		if (!integra)
			throw "Ocorreu um erro inesperado durante a Integracao (integrarDepend) dos Dependente(s) do Funcionário. Entre em contato com a equipe de TI.";
		
		if (hAPI.getCardValue("tipoVaga") == "sede")
			emailAdmissaoConcluida();	
		
	} catch (e) {
		
		log.info("ERRO servicetask257: " + e);
		throw e;

	}
	
}

function emailAdmissaoConcluida(){
	
	var TENANT_ID = getValue("WKCompany");
	var WKNumProces = getValue("WKNumProces");
	var ds_mip_connector = DatasetFactory.getDataset("ds_mip_connector", null, null, null);
	var SERVER_URL = ds_mip_connector.getValue(0, "SERVER_URL");
	
	log.info("#### ---- WRH02 - emailAdmissaoConcluida - " + WKNumProces + " ---- ####");
		
	var dsDestinatarios = DatasetFactory.getDataset("ds_WRH02_AdmissaoConcluida_Destinatarios", null, null, null);
		
	if(dsDestinatarios.rowsCount == 0 || dsDestinatarios.rowsCount == undefined){
		
		log.info("#### ---- WRH02 - emailAdmissaoConcluida - " + WKNumProces + " - Nenhum destinatário encontrado ---- ####");
		
	} else {
			
		for(var i = 0; i < dsDestinatarios.rowsCount; i++){

			recipients = new java.util.ArrayList();
			recipients.add(dsDestinatarios.getValue(i, "EMAIL"));
			
			parameters = new java.util.HashMap();
			parameters.put("subject", "WRH02 Admissão Concluída: " + hAPI.getCardValue("nomeCandidato"));		
			parameters.put("TENANT_ID", TENANT_ID);
			parameters.put("SERVER_URL", SERVER_URL);
			parameters.put("NOME", hAPI.getCardValue("nomeCandidato"));
			parameters.put("FUNCAO", hAPI.getCardValue("funcao"));
			parameters.put("CHAPA", hAPI.getCardValue("chapaFunc"));
			parameters.put("DATAADMISSAO", hAPI.getCardValue("dataAdmissao"));
	
			log.info("#### ---- WRH02 - emailAdmissaoConcluida - notifier.notify: " + dsDestinatarios.getValue(i, "EMAIL"));
	
			notifier.notify("adm", "WRH02_AdmissaoConcluida", parameters, recipients, "text/html");
			
		}
		
		recipients = new java.util.ArrayList();
		recipients.add(hAPI.getCardValue("matrSolicitante"));

		parameters = new java.util.HashMap();
		parameters.put("subject", "WRH02 Admissão Concluída: " + hAPI.getCardValue("nomeCandidato"));		
		parameters.put("TENANT_ID", TENANT_ID);
		parameters.put("SERVER_URL", SERVER_URL);
		parameters.put("NOME", hAPI.getCardValue("nomeCandidato"));
		parameters.put("FUNCAO", hAPI.getCardValue("funcao"));
		parameters.put("CHAPA", hAPI.getCardValue("chapaFunc"));
		parameters.put("DATAADMISSAO", hAPI.getCardValue("dataAdmissao"));
		
		log.info("#### ---- WRH02 - emailAdmissaoConcluida - notifier.notify: " + hAPI.getCardValue("matrSolicitante"));

		notifier.notify("adm", "WRH02_AdmissaoConcluida", parameters, recipients, "text/html");

		log.info("#### ---- WRH02 - emailAdmissaoConcluida - " + WKNumProces + " - Envio finalizado com sucesso ---- ####");

	}

}