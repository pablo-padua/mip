function createXmlRequisicaoParecer(codReq, index) {

	var xml = "";
		
	var dataHoje = ajusteData(buscarDataAtualSistema());	
	xml += createNode("RecAumentoQuadro");
	xml = createVREQAUMENTOQUADROPARECER(xml, codReq, index, dataHoje);
	xml += createNode("/RecAumentoQuadro");
	
	
	return xml;
}

function createVREQAUMENTOQUADROPARECER(xml, codReq, index, dataHoje) {
	
	
	xml += createNode("VREQAUMENTOQUADROPARECER");			
	xml += setNode("CHAPASOLICITANTE", hAPI.getCardValue("chapaAprovador"));	//	Foi solicitado a inserção da chapa do Aprovador - 29/10
	xml += setNode("CODCOLREQUISICAO", hAPI.getCardValue("codColigada"));	//	CÃ³digo da Coligada
	xml += setNode("CODCOLSOLICITANTE", hAPI.getCardValue("codColigadaAprovador"));	//	CÃ³digo da Coligada
	xml += setNode("CODFAIXASALARIAL", hAPI.getCardValue("codFaixa___" + index));	//	Campo CODFAIXA na Consulta SQL WS.006
	xml += setNode("CODFILIAL", hAPI.getCardValue("codFilial___" + index));	//	CÃ³digo da filial
	xml += setNode("CODFUNCAO", hAPI.getCardValue("codFuncao___" + index));	//	CÃ³digo da funÃ§Ã£o
	xml += setNode("CODNIVELSALARIAL", hAPI.getCardValue("codFuncao___" + index));	//	CÃ³digo da funÃ§Ã£o
	xml += setNode("CODSECAO", hAPI.getCardValue("codSecao___" + index));	//	CÃ³digo da seÃ§Ã£o
	xml += setNode("CODSTATUS", "3");	//	
	xml += setNode("CODTABELASALARIAL", hAPI.getCardValue("codTabela___" + index));	//	Campo CODTABELA na Consulta SQL WS.004
	xml += setNode("DATAPARECER", dataHoje);	//	Data atual
	xml += setNode("DATAPREVISTA", dataHoje);	//	Data atual
	xml += setNode("IDPARECER", "-1");	//	
	xml += setNode("IDREQ", codReq);	//	Id da requisiÃ§Ã£o
	xml += setNode("NUMVAGAS", "1");	//	Valor fixo: 1
	xml += setNode("PARECER", "Aprovado. " + hAPI.getCardValue("justificativa"));	//	Campo texto, descriÃ§Ã£o do parecer
	xml += setNode("SUSPENSAO", "0");	//	Valor fixo: 0
	xml += setNode("VLRSALARIO", hAPI.getCardValue("salario___" + index));	//	SalÃ¡rio
	xml += createNode("/VREQAUMENTOQUADROPARECER");
			
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
	var valorNumero = valor.toString().replace("R$ ", "");
	var valorSemPonto = valorNumero.replace(".", "");
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