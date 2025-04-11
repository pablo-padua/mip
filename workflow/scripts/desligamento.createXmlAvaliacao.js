function createXmlAvaliacao() {

	var xml = "";		
	
	xml += createNode("Avaliacao");
	xml = createZMDAVALIACAOCOMPORTAMENTO(xml);
	xml += createNode("/Avaliacao");
		
	return xml;
}

function createZMDAVALIACAOCOMPORTAMENTO(xml) {
	
	xml += createNode("ZMDAVALIACAOCOMPORTAMENTO");
		
	xml += setNode("CHAPA", hAPI.getCardValue("chapa"));	
	xml += setNode("CHAPAAVALIADOR", hAPI.getCardValue("chapaSolicitante"));	
	xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));	
	xml += setNode("CODFUNCAO", hAPI.getCardValue("codFuncao"));
	xml += setNode("CODPESSOA", hAPI.getCardValue("codPessoaSolic"));
	xml += setNode("CODSECAO", hAPI.getCardValue("codSecao"));
	xml += setNode("DATAAVALIACAO", hAPI.getCardValue("dataSolicitacao"));
	xml += setNode("DESCRICAODIFERENCIALPOSITIVO", hAPI.getCardValue("descDifPositivo"));	
	xml += setNode("DESCRICAORESTRICAO", hAPI.getCardValue("descRestricoes"));	
	if (hAPI.getCardValue("difPositivo") == "sim"){
		xml += setNode("DIFERENCIALPOSITIVO", "1");	
	}else{
		xml += setNode("DIFERENCIALPOSITIVO", "0");	
	}
	xml += setNode("FUNCAVALIADOR", hAPI.getCardValue("cargoSolicitante"));
	xml += setNode("FUNCIONARIO", hAPI.getCardValue("nomeFunc"));
	xml += setNode("IDAVALIACAO", "-1");
	xml += setNode("JUSTACAUSA", hAPI.getCardValue("hiddenJustaCausa"));	
	xml += setNode("LEGADO", "0");	
	xml += setNode("MOTIVODEMISSAO", hAPI.getCardValue("motivoDemissaoRM"));	
	xml += setNode("QUEBRAREGRADEOURO", hAPI.getCardValue("hiddenRegraDeOuro"));	
	xml += setNode("RESTASSIDUIDADE", hAPI.getCardValue("hiddenAssiduidade"));	
	xml += setNode("RESTCAUSATRABALHISTA", "0");
	xml += setNode("RESTCOMPROMETIMENTO", hAPI.getCardValue("hiddenComprometimento"));	
	xml += setNode("RESTINDISCIPLINA", hAPI.getCardValue("hiddenIndisciplina"));	
	xml += setNode("RESTPONTUALIDADE", hAPI.getCardValue("hiddenPontualidade"));	
	xml += setNode("RESTPRODUTIVIDADE", hAPI.getCardValue("hiddenProdutividade"));	
	xml += setNode("RESTSEGURANCA", hAPI.getCardValue("hiddenSeguranca"));	
	xml += setNode("SEMRESTRICAO", hAPI.getCardValue("hiddenSemRestricao"));	
	
	xml += createNode("/ZMDAVALIACAOCOMPORTAMENTO");

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
