function createXmlMovimento(user) {
	log.info("INICIO WSUP01 createXmlMovimento:user:"+user);
	
	var codColigada = hAPI.getCardValue("TMOV_CODCOLIGADA");
	var dataHoje = ajusteData(buscarDataAtualSistema());
	var codCCusto = hAPI.getCardValue("MOV_GCCUSTO_CODREDUZIDO")
	var dataSolicitacao = ajusteData(hAPI.getCardValue("dataSolicitacao"));
	var codFilial = hAPI.getCardValue("TMOV_CODFILIAL");
	
	var xml = "";
	
	xml += createNode("MovMovimento");
	xml = createTMOV(xml, codColigada, user, dataHoje, codCCusto, dataSolicitacao, codFilial);
	log.info("WSUP01 createXmlMovimento:createTMOV: "+xml);
	//xml = createTMOVRATCCU(xml, codColigada, codCCusto, valorAdiantamento);
	//log.info("INICIO createXmlMovimentoAdiantViagem:createTMOVRATCCU:"+xml);
	xml = createTITMMOV(xml, codColigada, user, dataHoje, codCCusto, codFilial);
	log.info("WSUP01 createXmlMovimento:createTITMMOV: "+xml);
	
	
	//xml = createTITMMOVRATCCU(xml, codColigada, codCCusto);
	//log.info("WSUP01 createXmlMovimentoAdiant:createTITMMOVRATCCU: "+xml);
	xml += createNode("/MovMovimento");

	return xml;
}

function createTMOV(xml, codColigada, user, dataHoje, codCCusto, dataSolicitacao, codFilial) {

	log.info("createXmlMovimento TMOV: codColigada" + codColigada);
	xml += createNode("TMOV");

	xml += setNode("CODCOLIGADA", codColigada);
	xml += setNode("IDMOV", "-1");
	xml += setNode("CODTMV", '1.1.05');
	xml += setNode("CODFILIAL", codFilial);
	xml += setNode("DATAEMISSAO", dataSolicitacao);
	xml += setNode("SERIE", "RM");
	xml += setNode("TIPO", "A");
	xml += setNode("NUMEROMOV", "-1");
	xml += setNode("CODLOC", hAPI.getCardValue("TMOV_CODLOC"));
	xml += setNode("CODLOCDESTINO", hAPI.getCardValue("TMOV_CODLOCDESTINO"));
	xml += setNode("CODVEN1", hAPI.getCardValue("hidden_codVen"));
	xml += setNode("CODVEN2", hAPI.getCardValue("hidden_codVen"));
	xml += setNode("VALORBRUTO", '0.0000');
	xml += setNode("VALORLIQUIDO", '0.0000');
	xml += setNode("VALOROUTROS", '0.0000' );
	xml += setNode("DATAMOVIMENTO", dataHoje);
	xml += setNode("DATAENTREGA", dataHoje);
	xml += setNode("DATACRIACAO", dataHoje);
	xml += setNode("CODCCUSTO", codCCusto);
	xml += setNode("CODTB5FAT", '002');
	xml += setNode("CODUSUARIO", user);
	xml += setNode("CODCOLIGADA1", codColigada);
	xml += setNode("CODREDCCUSTO", hAPI.getCardValue("MOV_GCCUSTO_CODREDUZIDO"));
	xml += setNode("CODFILIALDESTINO", hAPI.getCardValue("TMOV_CODFILIALDESTINO"));
	
	var concatHistorico ="Movimento gerado pela integração Fluig - Requisição de Compras núm:"+ hAPI.getCardValue("numeroSC")+
	" / solicitação Fluig Número: "+hAPI.getCardValue("numero_solicitacao")+
	" / Revisão SC Número: "+hAPI.getCardValue("numeroRevSC");
	xml += setNode("HISTORICOLONGO", concatHistorico);
	
	
	xml += createNode("/TMOV");
	
	return xml;
}

function createTMOVRATCCU(xml, codColigada, codCCusto, valorAdiantamento) {

	xml += createNode("TMOVRATCCU");
	xml += setNode("CODCOLIGADA", codColigada);
	xml += setNode("IDMOV", "-1");
	xml += setNode("CODCCUSTO", codCCusto); 
	xml += setNode("VALOR", '0.0000'); 
	xml += setNode("IDMOVRATCCU", "-1");
	xml += createNode("/TMOVRATCCU");
	return xml;
}

function createTMOVCOMPL(xml, codColigada, user, dataHoje) {
	xml += createNode("TMOVCOMPL");
	xml += setNode("CODCOLIGADA", codColigada);
	xml += setNode("IDMOV", "-1");
	xml += setNode("NROSOLFLUIG", hAPI.getCardValue("numero_solicitacao"));
	xml += createNode("/TMOVCOMPL");
	return xml;
}






function createTITMMOV(xml, codColigada, user, dataHoje, codCCusto, codFilial) {
	var nSeqItmMov = 1;
	var indexes = getIndexes('indicePaiFilhoItemRev');
	var iterator = indexes.iterator();
	while (iterator.hasNext()) {
		var indexRev = iterator.next();
		var indexTbItem = hAPI.getCardValue("indicePaiFilhoTbItem___" + indexRev);	
		var qtdRev = parseInt(hAPI.getCardValue("qtdRev___" + indexRev));
		var qtdOriginal = parseInt(hAPI.getCardValue("qtdOriginal___" + indexRev));
		var codProduto = hAPI.getCardValue("codProdutoRmVinculado___" + indexTbItem);
		var itemEditado = hAPI.getCardValue("itemEditado___" + indexTbItem);
		
		var numMovIntegracaoRev = hAPI.getCardValue("numMovIntegracaoRev___" + indexRev);
		
		log.info(" WSUP01 createXmlMovimento:indexTbItem: "+indexTbItem);
		
		log.info(" WSUP01 createXmlMovimento:codProduto: "+codProduto);
		log.info(" WSUP01 createXmlMovimento:itemEditado: "+itemEditado);
		log.info(" WSUP01 createXmlMovimento:numMovIntegracaoRev: "+numMovIntegracaoRev);
		log.info(" WSUP01 createXmlMovimento:qtdRev: "+qtdRev);
		
		if(codProduto != ''  && itemEditado == 'sim' && numMovIntegracaoRev == '' && qtdRev > 0 && (qtdOriginal != qtdRev)){	

					xml += createNode("TITMMOV");
					xml += setNode("CODCOLIGADA", codColigada);
					xml += setNode("IDMOV", "-1");
					xml += setNode("NSEQITMMOV", nSeqItmMov);
					xml += setNode("CODFILIAL", codFilial);
					xml += setNode("NUMEROSEQUENCIAL", nSeqItmMov);
					xml += setNode("IDPRD", hAPI.getCardValue("idprdRmVinculado___" + indexTbItem));
					xml += setNode("CODIGOPRD", hAPI.getCardValue("codProdutoRmVinculado___" + indexTbItem));
					
					
					xml += setNode("QUANTIDADE", hAPI.getCardValue("qtdRev___" + indexRev));
					xml += setNode("CODTB4FAT", hAPI.getCardValue("codSCTabelaDocumentoMateriais"));
					xml += setNode("CODCCUSTO", codCCusto);
					xml += setNode("CODDEPARTAMENTO", hAPI.getCardValue("hidden_CODDEPARTAMENTO"));
					xml += setNode("QUANTIDADETOTAL", hAPI.getCardValue("qtdRev___" + indexRev));
					xml += setNode("CODCCUSTO", codCCusto);
					xml += setNode("CODCOLIGADA1", codColigada);
					xml += setNode("HISTORICOCURTO", hAPI.getCardValue("descComplItem___" + indexTbItem));
					xml += setNode("HISTORICOLONGO", hAPI.getCardValue("descComplItem___" + indexTbItem));
				
					xml += createNode("/TITMMOV");
					
					xml = createTITMMOVCOMPL(xml, codColigada, codCCusto, nSeqItmMov, indexTbItem);
					log.info("WSUP01 - createXmlMovimento: createTITMMOVCOMPL: "+xml);
					hAPI.setCardValue("numSeqItmMovGeradoRM___"+indexTbItem, nSeqItmMov);
					log.info("WSUP01 - createXmlMovimento: GRAVOU O SEQUENCIAL : "+nSeqItmMov +"para o item da index: numSeqItmMovGeradoRM___" +indexTbItem );
					
					nSeqItmMov++;

		}	}
	return xml;
}


function createTITMMOVCOMPL(xml, codColigada, codCCusto, nSeqItmMov, index) {

	xml += createNode("TITMMOVCOMPL");

	xml += setNode("CODCOLIGADA", codColigada);
	xml += setNode("IDMOV", "-1");
	xml += setNode("NSEQITMMOV", nSeqItmMov);
	xml += setNode("NUMITEM1", hAPI.getCardValue("numItemDocMat___" + index));
	xml += setNode("REVE1", hAPI.getCardValue("revDocMatOrigem___" + index));
	xml += setNode("NUMEROSC",hAPI.getCardValue("numeroSC"));
	var dtNecessidadeMatOrigem = hAPI.getCardValue("dtNecessidadeMatOrigem___" + index);
	if(dtNecessidadeMatOrigem != ''){
		xml += setNode("PRAZOSOLICITADOOBRA", ajusteData(dtNecessidadeMatOrigem));
	}
	xml += setNode("ITEMDEPQ", hAPI.getCardValue("itemPQ___" + index));
	//xml += setNode("NRODOCA", hAPI.getCardValue("NRODOCA___" + index));
	//xml += setNode("VALIDADEDOCA", ajusteData(hAPI.getCardValue("VALIDADEDOCA___" + index)));
	xml += setNode("CODIGOPETROBRAS", hAPI.getCardValue("codPetrobras___" + index));
	xml += setNode("CODIGOPROJETISTA", hAPI.getCardValue("codProjetista___" + index));
	xml += createNode("/TITMMOVCOMPL");
	return xml;
}

function createTITMMOVRATCCU(xml, codColigada, codCCusto) {

	xml += createNode("TITMMOVRATCCU");

	xml += setNode("CODCOLIGADA", codColigada);
	xml += setNode("IDMOV", "-1");
	xml += setNode("CODCCUSTO", codCCusto);
	xml += setNode("VALOR", '0.0000'); 
	xml += setNode("IDMOVRATCCU", "-1");
	xml += setNode("NSEQITMMOV", 1);

	xml += createNode("/TITMMOVRATCCU");
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
	var valorNumero = valor.toString().replaceAll("R$ ", "");
	//log.info("createXmlMovimentoAdiantViagem: valorNumero" + valorNumero);
	var valorFinal = valorNumero.replaceAll(".", "");
	//log.info("createXmlMovimentoAdiantViagem: valorFinal" + valorFinal);
	return valorFinal;
}

function ajusteValor(valorNumero){
	 //log.info("#### valorNumero: " + valorNumero);
	   if(valorNumero == ""){
	   	return "";
	   }else{

	   	var valorNumeroStr = new String(valorNumero);
	   	valorNumeroStr = valorNumeroStr.replace(/\./g,"");
	   	//valorNumeroStr = valorNumeroStr.replace(",",".");

	   }
	   //log.info("#### valorformatado= " + valorNumeroStr);
	   return valorNumeroStr;
	  
	}

function stringToDate(dateString) {
	var today = new java.util.Date();
	var format = new java.text.SimpleDateFormat("dd/MM/yyyy");
	var date = format.parse(dateString);
	format = new java.text.SimpleDateFormat("dd-MM-yyyy");
	var data = format.format(date);
	data += "T00:00:00";

	return data;
}
function ajusteData(dataWeb){
    // log.info("#### data: " + dataWeb);
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
function ajusteDataCompl(dataWeb){
   // log.info("#### data: " + dataWeb);
    if(dataWeb == "") return "";
    
    var data = dataWeb;
    
    if(dataWeb.indexOf("/") > -1){
          data = dataWeb.split("/");
          data = data[2]+"-"+data[1]+"-"+data[0]+" 00:00:00";
    }else{
          data = dataWeb+" 00:00:00";
    }
    return data;
}