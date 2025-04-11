function servicetask324(attempt, message) {
	
	try {
		
		var incluiuRequisicao = incluiRequisicao();
		var codReq = incluiuRequisicao;

		if (!incluiuRequisicao)
			throw "Ocorreu um erro inesperado durante a Integracao da Requisição com RM. Entre em contato com a equipe de TI.";
				
		var incluiuParecer = inclusaoParecer(codReq);
						
		if (!incluiuParecer)
			throw "Ocorreu um erro inesperado durante a Integracao do Parecer com RM. Entre em contato com a equipe de TI.";
			
		hAPI.setCardValue("idReqReabertura", codReq);
			
	} catch (e) {
		
		log.info("ERRO (incluiRequisicao / inclusaoParecer): " + e);
		throw e;
	
	}	
	
}