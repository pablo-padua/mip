function createXmlRequisicao() {

	var xml = "";
	var dataHoje = ajusteData(buscarDataAtualSistema());
	
	xml += createNode("RecAumentoQuadro");
	xml = createVREQAUMENTOQUADRO(xml, dataHoje);
	xml += createNode("/RecAumentoQuadro");
	
	return xml;
}

function createVREQAUMENTOQUADRO(xml, dataHoje) {
	
	xml += createNode("VREQAUMENTOQUADRO");			
	xml += setNode("CHAPAREQUISITANTE", hAPI.getCardValue("chapaSolicitante"));	//	Chapa requisitante
	xml += setNode("CODCOLREQUISICAO", hAPI.getCardValue("codColigada"));	//	Código da Coligada
	xml += setNode("CODCOLREQUISITANTE", hAPI.getCardValue("codColigadaSolic"));	//	Código da Coligada
	xml += setNode("CODFUNCAO", hAPI.getCardValue("codFuncao"));//	Código da função
	xml += setNode("CODNIVELSALARIAL", hAPI.getCardValue("codFuncao"));//	Código da função
	xml += setNode("CODSECAO", hAPI.getCardValue("codSecao"));//	Código da seção
	xml += setNode("CODSTATUS", "5");//	Código do Status
	xml += setNode("DATAABERTURA", dataHoje);//	Data atual
	xml += setNode("DATAPREVISTA", dataHoje);//	Data atual
	xml += setNode("IDREQ", "-1");//	Id da requisição
	xml += setNode("JUSTIFICATIVA", "FLUIG - WRH02 - Aumento de Quadro (REABERTURA): "+ getValue("WKNumProces"));//	Observação
	xml += setNode("NUMVAGAS", "1");//	Valor fixo: 1

	xml += setNode("CODFILIAL", hAPI.getCardValue("codFilial"));
	xml += setNode("CODFAIXASALARIAL", hAPI.getCardValue("codFaixa"));
	xml += setNode("CODTABELASALARIAL", hAPI.getCardValue("codTabela"));
	xml += setNode("VLRSALARIO", hAPI.getCardValue("salario"));
	
	xml += createNode("/VREQAUMENTOQUADRO");
	
	xml = createVREQAUMENTOQUADRORATEIOCC(xml);	
	
	return xml;
}

function createVREQAUMENTOQUADRORATEIOCC(xml) {
	
	xml += createNode("VREQAUMENTOQUADRORATEIOCC");			
	xml += setNode("CODCCUSTO", hAPI.getCardValue("codCentroCusto"));	//	Cód. do centro de custo
	xml += setNode("CODCOLREQUISICAO", hAPI.getCardValue("codColigada"));	//	Código da Coligada
	xml += setNode("IDREQ", "-1");	//	Id da requisição
	xml += setNode("VALOR", "100");	//	Valor fixo: 100.00
	xml += createNode("/VREQAUMENTOQUADRORATEIOCC");

	return xml;
}