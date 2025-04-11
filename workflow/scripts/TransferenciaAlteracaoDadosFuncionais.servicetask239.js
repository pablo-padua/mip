function servicetask239(attempt, message) {
		
	log.info("Integracaoo RM requisicao TRANSFERENCIA ");
	
	try {		
		var codReq = hAPI.getCardValue("idReq");
		var enviarParecer = enviaAlteracaoParecer(codReq);
		log.info("incluiParecer: " + enviarParecer);
		
		if (!enviarParecer)
			throw "Ocorreu um erro inesperado durante a Integracao do Parecer com RM. Entre em contato com a equipe de TI.";
		
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