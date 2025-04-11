function enviaAlteracaoParecer(codReq){
	log.info("ANTES DE INICIAR O SERVICO");
	var NOME_SERVICO = "wsDataServer";
    var CAMINHO_SERVICO = "com.totvs.WsDataServer";
    
	try
	{
		var connect = DatasetFactory.getDataset('ds_connector', null, null, null);
		var user = connect.getValue(0, 'INTEGRADOR');
		var password = connect.getValue(0, 'SENHA');
		
		var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
		log.info("--- Servico: " + servico);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info("--- Instancia: " + instancia);
		var ws = instancia.getRMIwsDataServer();	
		log.info("--- IWS: " + ws);
		
		codChapa = hAPI.getCardValue("chapaSolicitante");
		log.info("--- NATHALIA codChapa: " + codChapa);
		
		var codUsuario = "'" + codChapa + "'";
		var codSistema = "V";
		var coligada = hAPI.getCardValue("codColigada");
		
		log.info("--- NATHALIA codUsuario: " + codUsuario);
		
		var contexto = "codusuario=" + user + ";codsistema=" + codSistema + ";codcoligada=" + coligada;
		
		log.info("--- Contexto: " + contexto);
		
		var serviceHelper = servico.getBean();
		log.info("--- NATHALIA recuperou o BEAN");
		
		var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", user, password);
		log.info("--- NATHALIA Autenticacao OK");
		
		var xml = createXMLAlteracaoParecer(codReq);
				  
		log.info("#### NATHALIA XML PARECER: " + xml);
		log.info("#### NATHALIA contexto: " + contexto);
		log.info("#### NATHALIA userPass" + user + " - " + password);
		
		var result = authService.saveRecord("RhuReqPromocaoParecerData", xml, contexto);
		
		log.info("--- NATHALIA RESULT WS PARECER: " + result.toString());
				
		if(isError(result.toString())){
			log.error('--- NATHALIA incluiParecer diz: Erro de negocio: ' + result);
			throw 'Erro de negocio: ' + result;
			
			//var msgErro = result;						
			//hAPI.setCardValue("retornoRM",msgErro);
						
			return false;
			
		}
		else {
			return result.toString();
		}
	}
    catch (e) 
    {
    	log.error('--- incluiRequisicao diz: Erro na chamada WS do RM: ' + e);		
		//throw 'Erro na chamada WS do RM: ' + e;
    	
		var msgErro = '--- incluiRequisicao diz: Erro na chamada WS do RM: ' + e;						
		hAPI.setCardValue("retornoRM",msgErro);
    	
    	
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