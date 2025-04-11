function integrarCracha(){
	
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
		
		var xml = createXmlCracha();
				  
		log.info("#### FopFuncData XML: " + xml);
		log.info("#### contexto: " + contexto);
		
		var result = authService.saveRecord("FopFuncData", xml, contexto);
		
		log.info("--- RESULT WS: " + result.toString());
				
		if(isError(result.toString())){
			log.error('--- integrarCracha Erro: ' + result);
			throw 'Erro de negocio: ' + result;
		}
		else {
			return result.toString();
		}

	}
    catch (e)
    {
    	log.error('--- integrarCracha Erro na chamada WS do RM: ' + e);		

    	return false;

	}

	function isError(result) {
		return isNaN(result.substring(0,1));
	}

	function createXmlCracha() {

		var xml = "";

		xml += createNode("Funcionario");
		xml += createNode("PFUNC");
		xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
		xml += setNode("CHAPA", hAPI.getCardValue("chapaFunc"));
		xml += createNode("/PFUNC");
		xml += createNode("PFCOMPL");
		xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
		xml += setNode("CHAPA", hAPI.getCardValue("chapaFunc"));
		xml += setNode("DTCRACHA", ajusteData(hAPI.getCardValue("dataLiberaCracha")));
		xml += createNode("/PFCOMPL");
		xml += createNode("/Funcionario");		

		return xml;
	}

}