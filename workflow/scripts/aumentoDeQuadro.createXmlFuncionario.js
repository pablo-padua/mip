function createXmlFuncionario() {

	var xml = "";		
	
	xml += createNode("Funcionario");
	xml = createPFCOMPL(xml);
	xml = createPFUNC(xml);
	xml += createNode("/Funcionario");
	
	
	return xml;
}

function createPFCOMPL(xml) {
	
	xml += createNode("PFCOMPL");			
	xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
	xml += setNode("CHAPA", hAPI.getCardValue("chapaFunc"));
	xml += setNode("FOLGA", hAPI.getCardValue("codPeriodo"));
	xml += setNode("CESTABASICA", hAPI.getCardValue("codCestaBasica"));
	xml += setNode("PLANODESAUDE", hAPI.getCardValue("codPlanoSaude"));
	xml += setNode("ALOJAM", hAPI.getCardValue("codAlojado"));
	xml += setNode("ALOJAMENTO", hAPI.getCardValue("descAlojamento"));
	xml += createNode("/PFCOMPL");
		
	return xml;
}

function createPFUNC(xml){
	
	var cotaPCD = tratacotaPCD(hAPI.getCardValue("cotaPCD"));
	
	xml += createNode("PFUNC");
	xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
	xml += setNode("CHAPA", hAPI.getCardValue("chapaFunc"));
	xml += setNode("COTAPCD", cotaPCD);

	var contratoExp = hAPI.getCardValue("contratoExp");
	var varContaCorrente = hAPI.getCardValue("contaCorrente");
	if(contratoExp == "30" || contratoExp == "45"){
		
		xml += setNode("TEMPRAZOCONTR", "1");
		xml += setNode("TIPOCONTRATOPRAZO", "E");

		var dataAdmissao = hAPI.getCardValue("dataAdmissao");
		dataAdmissao = new Date(dataAdmissao.split("/")[2], dataAdmissao.split("/")[1] - 1, dataAdmissao.split("/")[0]);

		var fimPrazo = dataAdmissao;
		fimPrazo.setDate(fimPrazo.getDate() + (contratoExp - 1));
		fimPrazo = new Date(fimPrazo);
		fimPrazo = ajusteData(fimPrazo.getDate() + "/" + (fimPrazo.getMonth() + 1) + "/" + fimPrazo.getFullYear());
		
		xml += setNode("FIMPRAZOCONTR", fimPrazo);
		
	}
	
	xml += setNode("CODBANCOPAGTO", hAPI.getCardValue("codBanco"));
	xml += setNode("CODAGENCIAPAGTO", hAPI.getCardValue("agencias"));
	xml += setNode("CONTAPAGAMENTO",varContaCorrente);
	
	xml += createNode("/PFUNC");
	
	return xml;
}

function tratacotaPCD(cotaPCD){
	
	if(cotaPCD == "simPCD")
		return 1;
	else
		return 0;
}

function createXmlHorario() {
	
	var xml = "";

	xml += createNode("PtoDataHistoricoHorario");
	xml += createNode("PFHSTHOR");
	xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
	xml += setNode("CHAPA", hAPI.getCardValue("chapaFunc"));
	xml += setNode("CODHORARIO", hAPI.getCardValue("codHorario"));
	xml += setNode("INDINICIOHOR", hAPI.getCardValue("codIndiceHorario"));
	xml += setNode("DTMUDANCA", hAPI.getCardValue("dataAdmissao"));
	xml += setNode("COMPORTAMENTOHORARIOANTERIOR", "1");
	xml += setNode("COMPORTAMENTOHORARIOATUAL", "1");	
	xml += createNode("/PFHSTHOR");
	xml += createNode("/PtoDataHistoricoHorario");
	
	return xml;
}