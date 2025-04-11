function createXmlTabelaSalarial(tipoAcao) {

	var xml = "";		
	var dataHoje = ajusteData(buscarDataAtualSistema());
	
	xml += createNode("RhuTabSal");
	xml = createTABELASALARIAL(xml, dataHoje, tipoAcao);
	xml += createNode("/RhuTabSal");
	
	return xml;
}
function createTABELASALARIAL(xml, dataHoje, tipoAcao) {
	
	log.info("tipoAcao: "+ tipoAcao);
	
	if (tipoAcao == "alterar"){
		var indexes = getIndexes('codFuncaoExistente');
		var iterator = indexes.iterator();
		while (iterator.hasNext()) {
			var index = iterator.next();
			log.info("NIVEL: "+ hAPI.getCardValue("codFuncaoExistente___"+ index));
		}
		
	}
	
	if (tipoAcao == "alterar"){	
		var indexes = getIndexes('codFuncaoExistente');
		var iterator = indexes.iterator();
		while (iterator.hasNext()) {
			var index = iterator.next();
			xml += createNode("TABELASALARIAL");			
			xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
			xml += setNode("CODTABELA", hAPI.getCardValue("codTabela"));	
			xml += setNode("NIVEL", hAPI.getCardValue("codFuncaoExistente___" + index));	// O CODIGO DA FUNCAO É IGUAL AO NIVEL
			xml += setNode("FAIXA", hAPI.getCardValue("codFaixaFuncExiste___" + index));
			xml += setNode("SALARIO", hAPI.getCardValue("novoSalario___" + index));
			xml += createNode("/TABELASALARIAL");
		}
		
		var indexes = getIndexes('codNivelFuncNova');
		var iterator = indexes.iterator();
		while (iterator.hasNext()) {
			
			var index = iterator.next();
			
			if(hAPI.getCardValue("isFuncNova___" + index) == "1"){
			
				var salarioFuncNovaJSON = JSON.parse(hAPI.getCardValue("salarioFuncNovaJSON___" + index));
				
				for(var i=0; i < salarioFuncNovaJSON.length; i++){
				
					xml += createNode("TABELASALARIAL");			
					xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
					xml += setNode("CODTABELA", hAPI.getCardValue("codTabela"));	
					xml += setNode("NIVEL", hAPI.getCardValue("codNivelFuncNova___" + index));	// O CODIGO DA FUNCAO É IGUAL AO NIVEL
					xml += setNode("FAIXA", salarioFuncNovaJSON[i].CODFAIXA);
					xml += setNode("SALARIO", salarioFuncNovaJSON[i].SALARIO);
					xml += createNode("/TABELASALARIAL");
	
				}
			}
		}
	}
	
	else if (tipoAcao == "incluir"){
		var indexes = getIndexes('codNivelFuncTabelaNova');
		var iterator = indexes.iterator();
		while (iterator.hasNext()) {
			
			var index = iterator.next();
			
			var salarioFuncTabelaNovaJSON = JSON.parse(hAPI.getCardValue("salarioFuncTabelaNovaJSON___" + index));
			
			for(var i=0; i < salarioFuncTabelaNovaJSON.length; i++){

				xml += createNode("TABELASALARIAL");
				xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
				xml += setNode("CODTABELA", hAPI.getCardValue("codNovaTabela"));
				xml += setNode("NIVEL", hAPI.getCardValue("codNivelFuncTabelaNova___" + index));	// O CODIGO DA FUNCAO É IGUAL AO NIVEL
				xml += setNode("FAIXA", salarioFuncTabelaNovaJSON[i].CODFAIXA);
				xml += setNode("SALARIO", salarioFuncTabelaNovaJSON[i].SALARIO);
				xml += createNode("/TABELASALARIAL");
				
			}
		}
	}
	return xml;
}