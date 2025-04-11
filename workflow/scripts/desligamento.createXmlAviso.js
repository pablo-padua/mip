function createXmlAvisoPrevio() {

	var xml = "";	
	
	xml += createNode("PFUNC");		
	xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));	
	xml += setNode("CHAPA", hAPI.getCardValue("chapaFuncionario"));	
	xml += setNode("TIPODEMISSAO", hAPI.getCardValue("codTipoDemissao"));	
	xml += setNode("DTAVISOPREVIOTRAB", hAPI.getCardValue("dataInicioAviso"));	
	xml += setNode("DTDEMISSAOPREVISTA", hAPI.getCardValue("dataDemissaoPrevista"));	
	xml += setNode("TIPOAVISOPREVIO", hAPI.getCardValue("codTipoAviso"));
	xml += setNode("MOTIVOAVISOPREVIOTRAB", "07");
	//xml += setNode("MOTIVODEMISSAO", "99");
	xml += setNode("TIPOREDUCAOAVISO", hAPI.getCardValue("tipoReducao"));
	if (hAPI.getCardValue("tipoReducao") == 0){
		xml += setNode("FORMAREDUCAOAVISO", "1");
	} else {
		xml += setNode("FORMAREDUCAOAVISO", null);
	}
	xml += createNode("/PFUNC");
	
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
