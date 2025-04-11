function servicetask393(attempt, message) {
	
	try {
		
		var integra = integrarCracha();
		
		log.info("servicetask393 integrarCracha: " + integra);
				
		if (!integra)
			throw "Ocorreu um erro inesperado durante a Integracao do Crachá. Entre em contato com a equipe de TI.";
		
	} catch (e) {
		
		log.info("ERRO servicetask393: " + e);
		throw e;

	}
		
}