function createXmlFolga() {

	var xml = "";		
	
	xml += createNode("RecFolga");
	xml = createPFCOMPL(xml);
	xml = createPFUNC(xml);
	xml += createNode("/RecFolga");
	
	
	return xml;
}

function createPFCOMPL(xml) {
	
	xml += createNode("PFCOMPL");			
	xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
	xml += setNode("CHAPA", hAPI.getCardValue("chapaFunc"));
	//xml += setNode("EQSEO", hAPI.getCardValue("codEquipeSEO"));
	xml += setNode("FOLGA", hAPI.getCardValue("codPeriodo"));
	xml += createNode("/PFCOMPL");
		
	return xml;
}

function createPFUNC(xml){
	
	xml += createNode("PFUNC");			
	xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
	xml += setNode("CHAPA", hAPI.getCardValue("chapaFunc"));	
	xml += createNode("/PFUNC");
	
	return xml;
}