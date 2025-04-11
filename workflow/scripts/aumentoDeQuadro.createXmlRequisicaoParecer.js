function createXmlRequisicaoParecer(codReq) {

	var xml = "";
		
	var dataHoje = ajusteData(buscarDataAtualSistema());	
	xml += createNode("RecAumentoQuadro");
	xml = createVREQAUMENTOQUADROPARECER(xml, codReq, dataHoje);
	xml += createNode("/RecAumentoQuadro");	
	
	return xml;
}

function createVREQAUMENTOQUADROPARECER(xml, codReq, dataHoje) {
	
	
	xml += createNode("VREQAUMENTOQUADROPARECER");			
	xml += setNode("CHAPASOLICITANTE", hAPI.getCardValue("chapaSolicitante"));	//	Foi solicitado a inserção da chapa do Aprovador - 29/10
	xml += setNode("CODCOLREQUISICAO", hAPI.getCardValue("codColigada"));	//	CÃ³digo da Coligada
	xml += setNode("CODCOLSOLICITANTE", hAPI.getCardValue("codColigadaSolic"));	//	CÃ³digo da Coligada
	xml += setNode("CODSECAO", hAPI.getCardValue("codSecao"));	//	CÃ³digo da seÃ§Ã£o
	xml += setNode("CODFUNCAO", hAPI.getCardValue("codFuncao"));	//	CÃ³digo da funÃ§Ã£o
	xml += setNode("CODNIVELSALARIAL", hAPI.getCardValue("codFuncao"));	//	CÃ³digo da funÃ§Ã£o	
	xml += setNode("CODSTATUS", "3");	//
	xml += setNode("DATAPARECER", dataHoje);	//	Data atual
	xml += setNode("DATAPREVISTA", dataHoje);	//	Data atual
	xml += setNode("IDPARECER", "-1");	//	
	xml += setNode("IDREQ", codReq);	//	Id da requisiÃ§Ã£o
	xml += setNode("NUMVAGAS", "1");	//	Valor fixo: 1
	xml += setNode("PARECER", "Aprovado. (REABERTURA)");	//	Campo texto, descriÃ§Ã£o do parecer
	xml += setNode("SUSPENSAO", "0");	//	Valor fixo: 0
	
	xml += setNode("CODFILIAL", hAPI.getCardValue("codFilial"));
	xml += setNode("CODFAIXASALARIAL", hAPI.getCardValue("codFaixa"));
	xml += setNode("CODTABELASALARIAL", hAPI.getCardValue("codTabela"));
	xml += setNode("VLRSALARIO", hAPI.getCardValue("salario"));

	xml += createNode("/VREQAUMENTOQUADROPARECER");
			
	return xml;
}
