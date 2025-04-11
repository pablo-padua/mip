function servicetask138(attempt, message) {
	
	var tipoAcao = hAPI.getCardValue("hiddenTipoAcao");
	var indexes = hAPI.getChildrenIndexes("tbFuncoesNovas");
	var tbFuncoesNovas = indexes.length;

	if (tipoAcao == "incluir" || tbFuncoesNovas > 0){
		try {
			var vincularTabSalarial = vincularTabelaSalarial(tipoAcao);
			if (!vincularTabSalarial)
				throw "Ocorreu um erro inesperado ao tentar Vincular a Tabela Salarial no RM. Entre em contato com a equipe de TI.";
	
		} catch (e) {
			log.info("ERRO vincularTabSalarial: " + e);
			throw e;
		
		}
	}	

}