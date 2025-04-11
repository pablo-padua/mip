function servicetask117(attempt, message) {

	var tipoAcao = hAPI.getCardValue("hiddenTipoAcao");
	var indexes = hAPI.getChildrenIndexes("tbFuncoesNovas");
	var tbFuncoesNovas = indexes.length;

	if (tipoAcao == "incluir" || tbFuncoesNovas > 0){
		try {
			var incluirLotacao = incluiLotacao(tipoAcao);
			if (!incluirLotacao)
				throw "Ocorreu um erro inesperado durante a Integracao da Lotacao com RM. Entre em contato com a equipe de TI.";
	
		} catch (e) {
			log.info("ERRO incluirLotacao: " + e);
			throw e;
		
		}
	}
}