function createXmlRequisicao(indice) {

	var xml = "";		
	var dataHoje = ajusteData(buscarDataAtualSistema());
	
	xml += createNode("RecAumentoQuadro");
	xml = createVREQAUMENTOQUADRO(xml, indice, dataHoje);
	xml += createNode("/RecAumentoQuadro");
	
	
	return xml;
}

function createVREQAUMENTOQUADRO(xml, index, dataHoje) {
	
	xml += createNode("VREQAUMENTOQUADRO");			
	xml += setNode("CHAPAREQUISITANTE", hAPI.getCardValue("chapaSolicitante"));	//	Chapa requisitante
	xml += setNode("CODCOLREQUISICAO", hAPI.getCardValue("codColigada"));	//	Código da Coligada
	xml += setNode("CODCOLREQUISITANTE", hAPI.getCardValue("codColigadaSolic"));	//	Código da Coligada
	xml += setNode("CODFAIXASALARIAL", hAPI.getCardValue("codFaixa___" + index));//	Campo CODFAIXA na Consulta SQL WS.006
	xml += setNode("CODFILIAL", hAPI.getCardValue("codFilial___" + index));//	Código da filial
	xml += setNode("CODFUNCAO", hAPI.getCardValue("codFuncao___" + index));//	Código da função
	xml += setNode("CODNIVELSALARIAL", hAPI.getCardValue("codFuncao___" + index));//	Código da função
	xml += setNode("CODSECAO", hAPI.getCardValue("codSecao___" + index));//	Código da seção
	xml += setNode("CODSTATUS", "5");//	Código do Status
	xml += setNode("CODTABELASALARIAL", hAPI.getCardValue("codTabela___" + index));//	Campo CODTABELA na Consulta SQL WS.004
	xml += setNode("DATAABERTURA", dataHoje);//	Data atual
	xml += setNode("DATAPREVISTA", dataHoje);//	Data atual
	xml += setNode("IDREQ", "-1");//	Id da requisição
	xml += setNode("JUSTIFICATIVA", "FLUIG - WRH01 - Abertura de Vaga: "+ getValue("WKNumProces"));//	Observação
	xml += setNode("NUMVAGAS", "1");//	Valor fixo: 1
	xml += setNode("VLRSALARIO", hAPI.getCardValue("salario___" + index));//	Valor do salário
	xml += createNode("/VREQAUMENTOQUADRO");
	
	xml = createVREQAUMENTOQUADRORATEIOCC(xml, index);
	
	
	return xml;
}

function createVREQAUMENTOQUADRORATEIOCC(xml, index) {
	
	xml += createNode("VREQAUMENTOQUADRORATEIOCC");
	xml += setNode("CODCCUSTO", hAPI.getCardValue("codCentroCusto___" + index));	//	Cód. do centro de custo
	xml += setNode("CODCOLREQUISICAO", hAPI.getCardValue("codColigada"));	//	Código da Coligada
	xml += setNode("IDREQ", "-1");	//	Id da requisição
	xml += setNode("VALOR", "100");	//	Valor fixo: 100.00
	xml += createNode("/VREQAUMENTOQUADRORATEIOCC");

	return xml;
}

function setNode(node, valor) {
	var line = createNode(node) + valor + createNode("/" + node);
	return line;
}

function createNode(node) {
	return "<" + node + ">";
}

function buscarData() {
	return new Date();
}

function buscarDiaAtual() {
	return buscarData().getDate().toString();
}

function buscarMesAtual() {
	return (buscarData().getMonth() + 1).toString();
}

function buscarAnoAtual() {
	return buscarData().getFullYear().toString();
}

function buscarDataAtualSistema() {
	return formatarData(buscarDiaAtual(), buscarMesAtual(), buscarAnoAtual());
}

function formatarData(dia, mes, ano) {
	if (dia.length == 1)
		dia = 0 + dia;
	if (mes.length == 1)
		mes = 0 + mes;
	return dia + "/" + mes + "/" + ano;
}

function getValor(valor) {
	var valorSemPonto = valor.replace(",", ".");
	return valorSemPonto;
}

function stringToDate(dateString) {

	//var today = new java.util.Date();
	var format = new java.text.SimpleDateFormat("dd/MM/yyyy");
	var date = format.parse(dateString);
	format = new java.text.SimpleDateFormat("yyyy-MM-dd");
	var data = format.format(date);
	data += "T00:00:00";

	return data;
}
function ajusteData(dataWeb){
    if(dataWeb == "") return "";
    
    var data = dataWeb;
    
    if(dataWeb.indexOf("/") > -1){
          data = dataWeb.split("/");
          data = data[2]+"-"+data[1]+"-"+data[0]+"T00:00:00";
    }else{
          data = dataWeb+"T00:00:00";
    }
    return data;
}

function getIndexes(fieldReference){
	var regex = new RegExp(fieldReference+'___');
	var map = hAPI.getCardData(parseInt(getValue('WKNumProces')));
	var iterator = map.keySet().iterator();
	var indexes = new java.util.TreeSet();	
	
	while(iterator.hasNext()){
		var id = iterator.next();
		
		if(id.match(regex) == null) continue;
		else indexes.add(id.split('___')[1]);
	}
	
	return indexes;
}