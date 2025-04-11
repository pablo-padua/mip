function createXMLTransferenciaParecer(codReq){

	var xml = "";
		
	var dataHoje = ajusteData(buscarDataAtualSistema());
	xml += createNode("RhuReqTransferenciaParecerData");
	xml = createVReqTransferenciaParecer(xml, codReq, dataHoje);
	xml += createNode("/RhuReqTransferenciaParecerData");
	
	return xml;
}

function createVReqTransferenciaParecer(xml, codReq, dataHoje) {
	
	
		xml += createNode("VReqTransferenciaParecer");

		xml += setNode("CODCOLREQUISICAO", hAPI.getCardValue("codColigadaOrigem"));
		xml += setNode("CODCOLREQUISITANTE", hAPI.getCardValue("codColigadaOrigem"));
		xml += setNode("CODCOLSOLICITANTE", hAPI.getCardValue("codColigadaOrigem"));
		xml += setNode("CODFILIALORG", hAPI.getCardValue("codFilialOrigem"));
		xml += setNode("CODFILIAL", hAPI.getCardValue("codFilialDestino"));
		xml += setNode("CODSECAO", hAPI.getCardValue("codSecaoDestino"));
		xml += setNode("CODSTATUS", "3"); // 5 - Pendente 3 - Aprovado
		xml += setNode("IDREQ", codReq);	
		xml += setNode("CHAPA", hAPI.getCardValue("chapaFuncionario"));	
		xml += setNode("DATAABERTURA", dataHoje);
		xml += setNode("DATAPARECER", dataHoje);
		xml += setNode("DATAPREVISTA", hAPI.getCardValue("dataAlteracao"));
		//xml += setNode("CRIASUBSTITUICAO", hAPI.getCardValue("substituicao"));
		xml += setNode("CRIASUBSTITUICAO", "0");
		xml += setNode("CHAPAREQUISITANTE", hAPI.getCardValue("chapaSolicitante"));
		xml += setNode("CHAPASOLICITANTE", hAPI.getCardValue("chapaSolicitante"));		
		xml += setNode("CODMOTMUDSECAO", hAPI.getCardValue("codMotMudancaSecao"));
		xml += setNode("IDPARECER", "-1");
		if(hAPI.getCardValue("observacoesDiretoria") == ""){
			xml += setNode("PARECER", "Aprovado");
		} else {
			xml += setNode("PARECER", hAPI.getCardValue("observacoesDiretoria"));
		}
		xml += createNode("/VReqTransferenciaParecer");
	
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
    log.info("#### data: " + dataWeb);
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

function trataRetorno(result){
	var valor = result.split(";");
	var req = valor[1];
	return req;
	
}