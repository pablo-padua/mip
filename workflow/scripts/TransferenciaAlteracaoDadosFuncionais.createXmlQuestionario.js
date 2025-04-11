function createXmlQuestionario() {

	var xml = "";		
	var dataHoje = ajusteData(buscarDataAtualSistema());
	
	xml += createNode("RecDesligamento");
	xml = createZMDQUESTIONARIORESPOSTA(xml, dataHoje);
	xml += createNode("/RecDesligamento");
	
	
	return xml;
}

function createZMDQUESTIONARIORESPOSTA(xml, dataHoje) {
	
	var nSeqItmMov = 1;
	var indexes = getIndexes('perguntas');
	var iterator = indexes.iterator();
	
	while (iterator.hasNext()) {
		var index = iterator.next();
		
		xml += createNode("ZMDQUESTIONARIORESPOSTA");
		
		xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigadaOrigem"));	
		xml += setNode("CODIGO_QUESTIONARIO", hAPI.getCardValue("codQuestionario___" + index));	
		xml += setNode("CODIGO_QUESTAO", hAPI.getCardValue("codQuestao___" + index));	
		xml += setNode("CHAPA", hAPI.getCardValue("chapa"));
		xml += setNode("RESPOSTA", hAPI.getCardValue("valorAvaliacao___" + index));
		xml += setNode("DATARESPOSTA", hAPI.getCardValue("dataSolicitacao"));
		xml += setNode("CODUSUARIO", hAPI.getCardValue("codUsuario"));
		
		xml += createNode("/ZMDQUESTIONARIORESPOSTA");

		nSeqItmMov++;
	}
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
