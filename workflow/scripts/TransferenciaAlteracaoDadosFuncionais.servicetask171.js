function servicetask171(attempt, message) {
	
	log.info("Integracaoo RM requisicao TRANSFERENCIA ");
	
	try {			
		var enviarAlteracao = enviaAlteracao();
		log.info("enviarAlteracao: " + enviarAlteracao);
		
		var codReq = enviarAlteracao;
		log.info("codReq: " + trataRetorno(codReq));
		hAPI.setCardValue("idReq", trataRetorno(codReq));
		
		if (!enviarAlteracao)
			throw "Ocorreu um erro inesperado durante a Integracao da Requisicao com RM. Entre em contato com a equipe de TI.";				
		
		
	} catch (e) {		
		log.info("ERRO ABERTURA: " + e);
		throw e;

	}	
}

function trataRetorno(result){
	var valor = result.split(";");
	var req = valor[1];
	return req;	
}