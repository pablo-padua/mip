function inclusaoParecer(codReq, i){
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
				
		var xml = createXmlRequisicaoParecer(codReq, i);
				  
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
    return true;
}

/**
 * Verifica se o retorno do RM eh erro de negocio.
 * 
 * @param result: Retorno do RM.
 * @returns boolean.
 */
function isError(result) {
	return isNaN(result.substring(0,1));
}
function getLogin(matricula){
	var login = '';
    var c1 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset('colleague', ['login'], [c1,c2], null);

    if (dataset.rowsCount > 0) {
    	login = dataset.getValue(0, 'login');
    }

    return login;
}