function createXmlRequisicaoDeslig() {

	var xml = "";		
	var dataHoje = ajusteData(buscarDataAtualSistema());
	
	xml += createNode("RecDesligamento");
	xml = createVREQDESLIGAMENTO(xml, dataHoje);
	//xml = createPFUNC(xml);
	xml += createNode("/RecDesligamento");
	
	
	return xml;
}

function createVREQDESLIGAMENTO(xml, dataHoje) {
	
	xml += createNode("VREQDESLIGAMENTO");			
	xml += setNode("CHAPA", hAPI.getCardValue("chapaFuncionario"));	
	xml += setNode("CHAPAREQUISITANTE", hAPI.getCardValue("chapaSolicitante"));	
	xml += setNode("CODCOLREQUISICAO", hAPI.getCardValue("codColigada"));	
	xml += setNode("CODCOLREQUISITANTE", hAPI.getCardValue("codColigadaSolic"));
	var motivoDemissaoRM = hAPI.getCardValue("motivoDemissaoRM");
	if(motivoDemissaoRM == '0'){
		xml += setNode("CODMOTRESCISAO", '06');
	}else if(motivoDemissaoRM == '1'){
		xml += setNode("CODMOTRESCISAO", '00');
	}else if(motivoDemissaoRM == '2'){
		xml += setNode("MOTIVODEMISSAO", '11');
	}else if(motivoDemissaoRM == '3'){
		xml += setNode("CODMOTRESCISAO", '05');
	}else if(motivoDemissaoRM == '4'){
		xml += setNode("CODMOTRESCISAO", '16');
	}else if(motivoDemissaoRM == '5'){
		xml += setNode("CODMOTRESCISAO", '03');
	}else if(motivoDemissaoRM == '6'){
		xml += setNode("CODMOTRESCISAO", '08');
	}else if(motivoDemissaoRM == '7'){
		xml += setNode("CODMOTRESCISAO", '09');
	}else if(motivoDemissaoRM == '8'){
		xml += setNode("CODMOTRESCISAO", '10');
	}else if(motivoDemissaoRM == '9'){
		xml += setNode("CODMOTRESCISAO", '01');
	}else if(motivoDemissaoRM == '10'){
		xml += setNode("CODMOTRESCISAO", '12');
	}else if(motivoDemissaoRM == '11'){
		xml += setNode("CODMOTRESCISAO", '17');
	}else if(motivoDemissaoRM == '12'){
		xml += setNode("CODMOTRESCISAO", '13');
	}else{
		xml += setNode("CODMOTRESCISAO", "99");	
	}
	
	//xml += setNode("CODMOTRESCISAO", "99"); //NECESSARIO PARA CHUMBAR INTEGRACAO
	xml += setNode("CODSTATUS", "5"); //NECESSARIO PARA CHUMBAR INTEGRACAO
	xml += setNode("CODTIPORESCISAO", hAPI.getCardValue("codTipoDemissao"));
	xml += setNode("CRIASUBSTITUICAO", hAPI.getCardValue("substituicao"));
	xml += setNode("DATAABERTURA", hAPI.getCardValue("dataSolicitacao"));
	xml += setNode("DATAPREVISTA", hAPI.getCardValue("dataPrevistaDemissao"));
	xml += setNode("IDREQ", "-1");
	xml += setNode("JUSTIFICATIVA", "FLUIG - WDP03 - Desligamento: " + getValue("WKNumProces") + " - " + hAPI.getCardValue("motivoDemissao"));
	xml += createNode("/VREQDESLIGAMENTO");
	
	
	
	return xml;
}

function createPFUNC(xml) {
	
	xml += createNode("PFUNC");			
	xml += setNode("TIPODEMISSAO", "2");	
	xml += setNode("DTAVISOPREVIOTRAB", hAPI.getCardValue("dataInicioAviso"));	
	xml += setNode("DTDEMISSAOPREVISTA", hAPI.getCardValue("dataPrevistaDemissao"));	
	xml += setNode("TIPOAVISOPREVIO", "");
	xml += setNode("MOTIVOAVISOPREVIOTRAB", "07");
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
