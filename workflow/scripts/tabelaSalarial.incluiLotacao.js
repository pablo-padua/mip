function incluiLotacao(tipoAcao){
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
		
		var codSistema = "V";
		var coligada = hAPI.getCardValue("codColigada");
		
		var contexto = "codusuario=" + user + ";codsistema=" + codSistema + ";codcoligada=" + coligada;
		
		var serviceHelper = servico.getBean();
		
		var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", user, password);
		
		var xml = createXmlLotacao(tipoAcao);
				  
		log.info("#### XML: " + xml);
		log.info("#### contexto: " + contexto);
		log.info("#### userPass" + user + " - " + password);
		
		var result = authService.saveRecord("RhuLotacaoData", xml, contexto);
		
		log.info("--- RESULT WS: " + result.toString());
		
		idReq = trataRetorno(result.toString());
		
		if(isError(result.toString())){
			log.error('--- incluiRequisicao diz: Erro de negocio: ' + result);
			
			return false;
			
		}
		else {
			return idReq;
		}
	}
    catch (e) 
    {
    	log.error('--- incluiRequisicao diz: Erro na chamada WS do RM: ' + e);		
		
		var msgErro = '--- incluiRequisicao diz: Erro na chamada WS do RM: ' + e;						
		hAPI.setCardValue("retornoRM",msgErro);
    	
    	
    	return false;
    	
	}
    return true;
}