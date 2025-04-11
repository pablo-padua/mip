function servicetask59(attempt, message) {
	
	var indexes = hAPI.getChildrenIndexes("tbVaga");
	var numFuncoes = indexes.length;
	
	var qtdMaxPorVez = 50; // Limite de registros integrados por vez para evitar erro de timeout	
	var qtdIntegradaRM = consultaQtdReqIntegrada();
	var qtdIntegradaNestaTentativa = 0;
	var sequencialVaga = 0;
	
		try {
			
			for(var i=1; i<=numFuncoes; i++){
				
				var numReqs = "";
				var numVaga = parseInt(hAPI.getCardValue("numeroVagas___" + i));
				
				for(var j=0; j<numVaga; j++){
					
					sequencialVaga = sequencialVaga + 1;
					
					if(sequencialVaga > qtdIntegradaRM && qtdIntegradaNestaTentativa < qtdMaxPorVez){
					
						qtdIntegradaNestaTentativa = qtdIntegradaNestaTentativa + 1;
						
						var incluiuRequisicao = incluiRequisicao(i);
						var codReq = incluiuRequisicao;		
						numReqs = numReqs + codReq + ";";
						
						if (!incluiuRequisicao)
							throw "Ocorreu um erro inesperado durante a Integracao com RM. Entre em contato com a equipe de TI.";
						
						
						var incluiuParecer = inclusaoParecer(codReq, i);
								
						if (!incluiuParecer)
							throw "Ocorreu um erro inesperado durante a Integracao com RM. Entre em contato com a equipe de TI.";
					}
				}
				var numRequisicaoSelecao = hAPI.getCardValue("numRequisicaoSelecao___" + i);
				hAPI.setCardValue("numRequisicaoSelecao___" + i, numRequisicaoSelecao + numReqs);
			}		
			
		} catch (e) {
			log.info("ERRO ABERTURA: " + e);
			throw e;
		
		}
}