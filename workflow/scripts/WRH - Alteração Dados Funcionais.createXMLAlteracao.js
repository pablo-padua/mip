function createXMLAlteracao(){

	var xml = "";		
	var dataHoje = ajusteData(buscarDataAtualSistema());
	
	xml += createNode("RhuReqPromocao");
	xml = createVREQPROMOCAO(xml, dataHoje);
	xml = createVREQPROMOCAORATEIOCC(xml);
	xml += createNode("/RhuReqPromocao");
	
	
	return xml;
}

function createVREQPROMOCAO(xml, dataHoje) {
		
	xml += createNode("VReqPromocao");
	xml += setNode("CODCOLREQUISICAO", hAPI.getCardValue("codColigada"));
	xml += setNode("IDREQ", "-1");
	var justif = "<![CDATA[FLUIG - WRH06 - Alteracao de Dados Funcionais: " + hAPI.getCardValue("idFluig") + " - " + hAPI.getCardValue("justificativa")+"]]>";
	xml += setNode("JUSTIFICATIVA",justif);
	xml += setNode("DATAABERTURA", dataHoje);
	xml += setNode("DATACONCLUSAO", "");
	xml += setNode("CODCOLREQUISITANTE", hAPI.getCardValue("codColigadaSolic"));
	xml += setNode("CHAPAREQUISITANTE", hAPI.getCardValue("chapaSolicitante"));
	xml += setNode("DATAPREVISTA", hAPI.getCardValue("dataAlteracao"));
	//xml += setNode("CRIASUBSTITUICAO", hAPI.getCardValue("substituicao"));
	xml += setNode("CRIASUBSTITUICAO","0"); //ENVIAR ZERADO ATÉ QUE O PROCESSO DE SUBST. SEJA IMPLANTADO
	xml += setNode("CODSTATUS", "5"); // 5 - Pendente
	xml += setNode("CHAPA", hAPI.getCardValue("chapaFuncionario"));	
	xml += setNode("CODFUNCAO", hAPI.getCardValue("codFuncaoProposto"));
	xml += setNode("CODTABELASALARIAL", hAPI.getCardValue("codTabelaProposto"));
	xml += setNode("CODNIVELSALARIAL", hAPI.getCardValue("codFuncaoProposto"));
	xml += setNode("CODFAIXASALARIAL", hAPI.getCardValue("codFaixaProposto"));
	xml += setNode("VLRSALARIO", hAPI.getCardValue("salarioTabela"));
	xml += setNode("CODFUNCAOORG", hAPI.getCardValue("codFuncaoOrigem"));
	xml += setNode("CODTABELASALARIALORG", hAPI.getCardValue("codTabSalarial"));
	xml += setNode("CODNIVELSALARIALORG", hAPI.getCardValue("codFuncaoOrigem"));
	xml += setNode("CODFAIXASALARIALORG", hAPI.getCardValue("faixaOrigem"));
	//alteração 24/08/2022 para pegar o salário atual na atividade (Validar Salário)
	//xml += setNode("VLRSALARIOORG", hAPI.getCardValue("salarioOrigem"));
	xml += setNode("VLRSALARIOORG", hAPI.getCardValue("salarioAtual"));
	xml += setNode("CODMOTMUDFUNCAO", hAPI.getCardValue("codMotMudancaFuncao"));
	xml += setNode("CODMOTMUDSALARIO", hAPI.getCardValue("codMotMudancaSalarial"));
		
	xml += createNode("/VReqPromocao");
	
	return xml;
}

function createVREQPROMOCAORATEIOCC(xml) {
	
	var indexes = getIndexes("codCentroCustoProp");
	var iterator = indexes.iterator();
	while (iterator.hasNext()) {
		var index = iterator.next();
		xml += createNode("VReqPromocaoRateioCC");			
		xml += setNode("CODCOLREQUISICAO", hAPI.getCardValue("codColigada"));	
		xml += setNode("IDREQ", "-1");		
		xml += setNode("CODCCUSTO", hAPI.getCardValue("codCentroCustoProp___" + index));	
		xml += setNode("VALOR", hAPI.getCardValue("percentProp___" + index));	
		xml += createNode("/VReqPromocaoRateioCC");
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
	var valorSemPonto = valor.replace(".", ",");
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