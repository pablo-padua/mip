function createXMLAlteracaoParecer(codReq){

	var xml = "";
		
	var dataHoje = ajusteData(buscarDataAtualSistema());	
	xml += createNode("RhuReqPromocaoParecer");
	xml = createVRECPROMOCAOPARECER(xml, codReq, dataHoje);
	xml += createNode("/RhuReqPromocaoParecer");
	
	return xml;
}

function createVRECPROMOCAOPARECER(xml, codReq, dataHoje) {
	
		var CODCOLSOLICITANTE = "";
		var CHAPASOLICITANTE = "";
		
		if(hAPI.getCardValue("chapaAprovador") == "" || hAPI.getCardValue("chapaAprovador") == undefined){
			
			CODCOLSOLICITANTE = hAPI.getCardValue("codColigadaSolic");
			CHAPASOLICITANTE = hAPI.getCardValue("chapaSolicitante");
			
		} else {
			
			CODCOLSOLICITANTE = hAPI.getCardValue("codColigadaAprovador");
			CHAPASOLICITANTE = hAPI.getCardValue("chapaAprovador");			
		}
	
		xml += createNode("VReqPromocaoParecer");			

		xml += setNode("CODCOLREQUISICAO", hAPI.getCardValue("codColigada"));
		xml += setNode("CODCOLREQUISITANTE", hAPI.getCardValue("codColigadaSolic"));
		xml += setNode("CODCOLSOLICITANTE", CODCOLSOLICITANTE);
		xml += setNode("CODSTATUS", "3"); // 5 - Pendente 3 - Aprovado
		xml += setNode("CODFUNCAOORG", hAPI.getCardValue("codFuncaoOrigem"));
		xml += setNode("IDREQ", codReq);	
		xml += setNode("CHAPA", hAPI.getCardValue("chapaFuncionario"));	
		xml += setNode("DATAABERTURA", dataHoje);
		xml += setNode("DATAPARECER", dataHoje);
		xml += setNode("DATAPREVISTA", hAPI.getCardValue("dataAlteracao"));
		xml += setNode("CHAPAREQUISITANTE", hAPI.getCardValue("chapaSolicitante"));
		xml += setNode("CHAPASOLICITANTE", CHAPASOLICITANTE);
		//xml += setNode("CRIASUBSTITUICAO", hAPI.getCardValue("substituicao"));
		xml += setNode("CRIASUBSTITUICAO","0"); //ENVIAR ZERADO ATÉ QUE O PROCESSO DE SUBST. SEJA IMPLANTADO
		xml += setNode("CODFUNCAO", hAPI.getCardValue("codFuncaoProposto"));
		xml += setNode("CODTABELASALARIAL", hAPI.getCardValue("codTabelaProposto"));
		xml += setNode("CODNIVELSALARIAL", hAPI.getCardValue("codFuncaoProposto"));
		xml += setNode("CODFAIXASALARIAL", hAPI.getCardValue("codFaixaProposto"));
		xml += setNode("VLRSALARIO", hAPI.getCardValue("salarioTabela"));
		xml += setNode("CODTABELASALARIALORG", hAPI.getCardValue("codTabSalarial"));
		xml += setNode("CODNIVELSALARIALORG", hAPI.getCardValue("codFuncaoOrigem"));
		xml += setNode("CODFAIXASALARIALORG", hAPI.getCardValue("faixaOrigem"));
		//alteração 24/08/2022 para pegar o salário atual na atividade (Validar Salário)
		//xml += setNode("VLRSALARIOORG", hAPI.getCardValue("salarioOrigem"));
		xml += setNode("VLRSALARIOORG", hAPI.getCardValue("salarioAtual"));
		xml += setNode("CODMOTMUDFUNCAO", hAPI.getCardValue("codMotMudancaFuncao"));
		xml += setNode("CODMOTMUDSALARIO", hAPI.getCardValue("codMotMudancaSalarial"));		
		xml += setNode("IDPARECER", "-1");
		if(hAPI.getCardValue("observacoesDiretoria") == ""){
			xml += setNode("PARECER", "Aprovado");
		} else {
			xml += setNode("PARECER", hAPI.getCardValue("observacoesDiretoria"));
		}
		xml += createNode("/VReqPromocaoParecer");
	
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
	var regex = new RegExp(fieldReference+"___");
	var map = hAPI.getCardData(parseInt(getValue("WKNumProces")));
	var iterator = map.keySet().iterator();
	var indexes = new java.util.TreeSet();	
	
	while(iterator.hasNext()){
		var id = iterator.next();
		
		if(id.match(regex) == null) continue;
		else indexes.add(id.split("___")[1]);
	}
	
	return indexes;
}

function trataRetorno(result){
	var valor = result.split(";");
	var req = valor[1];
	return req;
	
}