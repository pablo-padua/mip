function servicetask411(attempt, message) {
//log.info("Integracaoo RM requisicao DESLIGAMENTO ");
	try {	
		
		if (hAPI.getCardValue("valorAviso") == "sim"){
			var incluiAviso = incluirAviso();
			
			if (!incluiAviso)
				throw "Ocorreu um erro inesperado durante a Integracao do Aviso Previo com RM. Entre em contato com a equipe de TI.";
		}
		
		if(!integraPrazoContrato())
			throw "Ocorreu um erro inesperado durante a Integracao do Prazo de Contrato com RM. Entre em contato com a equipe de TI.";
		
	} catch (e) {
		log.error("ERRO ABERTURA: " + e);
		throw e;
	}
}

function trataRetorno(result){
	var valor = result.split(";");
	var req = valor[1];
	return req;	
}