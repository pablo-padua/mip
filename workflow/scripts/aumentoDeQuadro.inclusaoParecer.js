function inclusaoParecer(codReq){
	
	var NOME_SERVICO = "wsDataServer";
    var CAMINHO_SERVICO = "com.totvs.WsDataServer";
    
	try
	{
		var connect = DatasetFactory.getDataset('ds_connector', null, null, null);
		var user = connect.getValue(0, 'INTEGRADOR');
		var password = connect.getValue(0, 'SENHA');
		
		var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		var ws = instancia.getRMIwsDataServer();
		
		codChapa = hAPI.getCardValue("chapaSolicitante");
		
		var codSistema = "V";
		var coligada = hAPI.getCardValue("codColigada");
				
		var contexto = "codusuario=" + user + ";codsistema=" + codSistema + ";codcoligada=" + coligada;
				
		var serviceHelper = servico.getBean();
		
		var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", user, password);
				
		var xml = createXmlRequisicaoParecer(codReq);
				  
		log.info("#### XML PARECER: " + xml);
		log.info("#### contexto: " + contexto);
		//log.info("#### userPass" + user + " - " + password);
		
		var result = authService.saveRecord("RhuReqAumentoQuadroParecerData", xml, contexto);
			
		log.info("--- RESULT WS PARECER: " + result.toString());
		
		if(isError(result.toString())){
			log.error('---  incluiParecer diz: Erro de negocio: ' + result);
									
			return false;
			
		}
		else {
			return result.toString();
		}
	}
    catch (e) 
    {
    	log.error('--- incluiRequisicao diz: Erro na chamada WS do RM: ' + e);		
	    				
    	return false;
    	
	}

	function isError(result) {
		return isNaN(result.substring(0,1));
	}

}