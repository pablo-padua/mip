function servicetask160(attempt, message) {
	try {	
		if (hAPI.getCardValue("motivoDemissaoRM") != ""){	
			var incluirAvaliacao = incluiAvaliacao();
			if (!incluirAvaliacao)
				throw "Ocorreu um erro inesperado durante a Integracao da Avaliacao de Comportamento com RM. Entre em contato com a equipe de TI.";
			
			if (hAPI.getCardValue("temAvalQuestionario") == "sim"){			
				var incluirQuestionario = incluiQuestionario();
				if (!incluirQuestionario)
					throw "Ocorreu um erro inesperado durante a Integracao da Avaliacao de Competencia com RM. Entre em contato com a equipe de TI.";
			}
		}	
	} catch (e) {
		log.info("ERRO ABERTURA: " + e);
		throw e;
	
	}
	
}