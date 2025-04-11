function enviaAlteracaoParecer(codReq){

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
		
		var codUsuario = "'" + codChapa + "'";
		var codSistema = "V";
		var coligada = hAPI.getCardValue("codColigadaOrigem");
		var contexto = "codusuario=" + codUsuario + ";codsistema=" + codSistema + ";codcoligada=" + coligada;
		var serviceHelper = servico.getBean();
		var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", user, password);
		
		var codFuncaoOrigem = hAPI.getCardValue("codFuncaoOrigem");
		var codFuncaoProposto = hAPI.getCardValue("codFuncaoProposto");
		var salarioTabela = hAPI.getCardValue("salarioTabela");
		var salarioAtual = hAPI.getCardValue("salarioAtual");
		
		if(codFuncaoOrigem == codFuncaoProposto && salarioTabela == salarioAtual){
			
			var xml = createXMLTransferenciaParecer(codReq);
			log.info("#### WRH07 XML PARECER: " + xml);
			var result = authService.saveRecord("RhuReqTransferenciaParecerData", xml, contexto);
			
		} else {
			
			var xml = createXMLTransfPromocaoParecer(codReq);
			log.info("#### WRH07 XML PARECER: " + xml);
			var result = authService.saveRecord("RhuReqTransfPromocaoParecerData", xml, contexto);

		}
		
		log.info("--- WRH07 RESULT WS PARECER: " + result.toString());
				
		if(isError(result.toString())){
			log.error('--- WRH07 incluiParecer diz: Erro de negocio: ' + result);
			throw 'Erro de negocio: ' + result;
						
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