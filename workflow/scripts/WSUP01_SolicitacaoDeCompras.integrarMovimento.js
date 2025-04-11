function integrarMovimento() {
	log.info("-----Inicio WSUP01 - integracao  integrarMovimento Requisição de compras------");
	
	try{
		
		var NOME_SERVICO = "wsDataServer";
		var CAMINHO_SERVICO = "com.totvs.WsDataServer";
	

		var connect = DatasetFactory.getDataset("ds_mip_connector", null, null, null);
		var user = connect.getValue(0, "INTEGRADOR");
		var password = connect.getValue(0, "SENHA");
		
		var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		var ws = instancia.getRMIwsDataServer();	
		
		var codUsuario = hAPI.getCardValue("matriculaSolicitante");//"integrador";//getValue("WKUser");
		var codSistema = "T";
		var coligada = hAPI.getCardValue("TMOV_CODCOLIGADA");	
		var contexto = "codcoligada=" + coligada +";codusuario=" + user + ";codsistema=" + codSistema;
		var serviceHelper = servico.getBean();
		var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", user, password);
		log.info("--  WSUP01 - integrarMovimento - Autenticacao OK");
		
		var xml = createXmlMovimento(user);
				  
		log.info("## WSUP01 - integrarMovimento ## XML: " + xml);
		log.info("##  WSUP01 - integrarMovimento ## contexto" + contexto);
		log.info("##  WSUP01 - integrarMovimento ## userPass" + user + " - " + password);
		
		var result = authService.saveRecord("MovMovimentoTBCData", xml, contexto);
		
		log.info("--  WSUP01 - integrarMovimento - RESULT WS TEXT: " + result.toString());
		log.info("--  WSUP01 - integrarMovimento - RESULT WS NUMBER: " + result.charAt(0));
		var numIdGeradoRM = result.split(";")[1];


		if((isError(result.toString())) && (result.charAt(0) != '49') ){
			log.error("--- integrarMovimento diz: Erro de negocio: " + result);
			return false;
		}
		else {
			hAPI.setCardValue("numIdGeradoRMTemporario", numIdGeradoRM);
			
			var indexes = getIndexes("indicePaiFilhoItemRev");
			var iterator = indexes.iterator();
			while(iterator.hasNext()){
				var indexRev = iterator.next();
				
				var indicePaiFilhoTbItem = hAPI.getCardValue("indicePaiFilhoTbItem___" + indexRev);
				var numMovIntegracaoRev = hAPI.getCardValue("numMovIntegracaoRev___" + indexRev);
				
				//Setando o codigo do movimeto gerado
				if(indicePaiFilhoTbItem != '' && numMovIntegracaoRev == ''){
					
			
					hAPI.setCardValue("idMovRM___"+indicePaiFilhoTbItem, numIdGeradoRM);
					hAPI.setCardValue("numMovIntegracaoRev___"+indexRev, numIdGeradoRM);
					
					log.info("WSUP01 - createXmlMovimento: GRAVOU O numIdGeradoRM : "+numIdGeradoRM +" para o item da index: idMovRM___" +indicePaiFilhoTbItem );
					
					log.info("##  WSUP01 - integrarMovimento ## gravou o novo mov numIdGeradoRM" + numIdGeradoRM);
				}	
			}
			
			return true;
		}
	}catch (e){
		log.error("--- integracao diz: Erro na chamada WS do RM: " + e);	
		return false;
	}
 
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
	var login = "";
    var c1 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("colleague", ["login"], [c1,c2], null);

    if (dataset.rowsCount > 0) {
    	login = dataset.getValue(0, "login");
    }

    return login;
}
