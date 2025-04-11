function createXmlLotacao(tipoAcao) {

	var xml = "";		
	var dataHoje = ajusteData(buscarDataAtualSistema());
	
	xml += createNode("RhuLotacao");
	xml = createLOTACAO(xml, dataHoje, tipoAcao);
	xml += createNode("/RhuLotacao");	
	
	return xml;
}

function createLOTACAO(xml, dataHoje, tipoAcao) {
	log.info("tipoAcao: "+ tipoAcao);
	if (tipoAcao == "alterar"){	
		var indexes = getIndexes('codNivelFuncNova');
		var iterator = indexes.iterator();
		while (iterator.hasNext()) {
			var index = iterator.next();
			log.info("CODSECAO: "+ hAPI.getCardValue("codSecaoFuncNova___" + index));	
			log.info("CODFUNCAO: "+ hAPI.getCardValue("codNivelFuncNova___" + index));	
			log.info("CODFILIAL: "+ hAPI.getCardValue("filialTabelaExistente"));
			log.info("CODTABELA: "+ hAPI.getCardValue("codTabela"));
		}
		
	} 
	
	if (tipoAcao == "alterar"){	
		var indexes = getIndexes('codNivelFuncNova');
		var iterator = indexes.iterator();
		while (iterator.hasNext()) {
			var index = iterator.next();
			xml += createNode("VLotacao");			
			xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
			xml += setNode("CODSECAO", hAPI.getCardValue("codSecaoFuncNova___" + index));	
			xml += setNode("CODFUNCAO", hAPI.getCardValue("codNivelFuncNova___" + index));	
			xml += setNode("CODFILIAL", hAPI.getCardValue("filialTabelaExistente"));
			xml += setNode("CODTABELA", hAPI.getCardValue("codTabela"));
			xml += createNode("/VLotacao");
		}
		
	} 
	
	else if (tipoAcao == "incluir"){
		var indexes = getIndexes('codNivelFuncTabelaNova');
		var iterator = indexes.iterator();
		while (iterator.hasNext()) {
			var index = iterator.next();
			xml += createNode("VLotacao");			
			xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
			xml += setNode("CODSECAO", hAPI.getCardValue("codSecaoFuncTabelaNova___" + index));	
			xml += setNode("CODFUNCAO", hAPI.getCardValue("codNivelFuncTabelaNova___" + index));	
			xml += setNode("CODFILIAL", hAPI.getCardValue("filialNovaTabela"));
			xml += setNode("CODTABELA", hAPI.getCardValue("codNovaTabela"));
			xml += createNode("/VLotacao");
		}
	}	
	
	return xml;
}