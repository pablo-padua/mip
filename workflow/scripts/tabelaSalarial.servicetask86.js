function servicetask86(attempt, message) {
	
	try {	
		var tipoAcao = hAPI.getCardValue("hiddenTipoAcao");
		
		var incluirTabelaSalarial = incluiTabelaSalarial(tipoAcao);
			
		if (!incluirTabelaSalarial)
			throw "Ocorreu um erro inesperado durante a Integracao da Tabela Salarial com RM. Entre em contato com a equipe de TI.";
	
		
	} catch (e) {
		log.info("ERRO incluirTabelaSalarial: " + e);
		throw e;

	}
	
}