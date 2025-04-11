function integrarFuncionario(){
	
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
		
		var xml = createXmlFuncionario();
				  
		log.info("#### FopFuncData XML: " + xml);
		log.info("#### contexto: " + contexto);
		
		var result = authService.saveRecord("FopFuncData", xml, contexto);
		
		log.info("--- RESULT WS: " + result.toString());
				
		if(isError(result.toString())){
			log.error('--- integrarFuncionario Erro: ' + result);
			throw 'Erro de negocio: ' + result;
		}
		else {
			return result.toString();
		}
		
	}
    catch (e) 
    {
    	log.error('--- integrarFuncionario Erro na chamada WS do RM: ' + e);
    	
    	return false;
    	
	}

}

function integrarHorario(){
	
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
		
		var xml = createXmlHorario();
				  
		log.info("#### PtoDataHistoricoHorario XML: " + xml);
		log.info("#### contexto: " + contexto);
		
		var result = authService.saveRecord("PtoDataHistoricoHorario", xml, contexto);
		
		log.info("--- RESULT WS: " + result.toString());
				
		if(isError(result.toString())){
			log.error('--- integrarHorario Erro: ' + result);
			throw 'Erro de negocio: ' + result;
		}
		else {
			return result.toString();
		}
		
	}
    catch (e) 
    {
    	log.error('--- integrarHorario Erro na chamada WS do RM: ' + e);
    	
    	return false;
    	
	}

}

function isError(result) {
	return isNaN(result.substring(0,1));
}