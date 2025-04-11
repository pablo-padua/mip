function servicetask395() {
	
	log.info("Integracaoo RM requisicao DESLIGAMENTO ");
	
	try {	
		var codReq = "";
	
		var nroSolicitacao = hAPI.getCardValue("nroSolicitacao");
		var chapaSolicitante = hAPI.getCardValue("chapaSolicitante");
		var chapa = hAPI.getCardValue("chapa");
		

		var c1 = DatasetFactory.createConstraint("NUMSOLICITACAO", nroSolicitacao, nroSolicitacao, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("CHAPAREQUISITANTE", chapaSolicitante, chapaSolicitante, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("CHAPADEMITIDO", chapa, chapa, ConstraintType.MUST);
	

		var constraints = new Array(c1, c2, c3);
		var dataset = DatasetFactory.getDataset("ds_ConsultaRM_WS134_RetornaIdreqExistente", null, constraints, null); 
		for (var i = 0; i < dataset.rowsCount; i++){
			if(dataset.getValue(i, "IDREQ") != ""){
				
				codReq = dataset.getValue(i, "IDREQ");
				hAPI.setCardValue("numRequisicaoSelecao", codReq);
				//log.info("#####################################---RECUPERADO IDREQ:  " + codReq);	
			}
		}
		
		if(codReq == ""){
		
			var incluiuRequisicao = incluiRequisicaoDeslig();
			codReq = incluiuRequisicao;	
			codReq = trataRetorno(codReq);
			hAPI.setCardValue("numRequisicaoSelecao", codReq);
			//log.info("Integracaoo RM requisicao DESLIGAMENTO incluiuRequisicao = "+incluiuRequisicao);
			if (!incluiuRequisicao){
				throw "Ocorreu um erro inesperado durante a Integracao da Requisicao com RM. Entre em contato com a equipe de TI.";
			}
		}
			
		
		
		var incluiParecer = inclusaoParecerDeslig(codReq);
		log.info("Integracaoo RM requisicao DESLIGAMENTO incluiParecer = "+incluiParecer);
		if (!incluiParecer){
			throw "Ocorreu um erro inesperado durante a Integracao do Parecer com RM. Entre em contato com a equipe de TI.";
		}
		
		var temAvaliacao = 1;
		
		if (hAPI.getCardValue("cargoFunc") == "Diretor" || hAPI.getCardValue("cargoFunc") == "Conselho")
			temAvaliacao = 0;
		
		if(temAvaliacao == 1) {
		
			var incluirAvaliacao = incluiAvaliacao();
			log.info("Integracaoo RM requisicao DESLIGAMENTO incluirAvaliacao = "+incluirAvaliacao);
			if (isNaN(trataRetorno(incluirAvaliacao))){
				throw "Ocorreu um erro inesperado durante a Integracao da Avaliacao de Comportamento com RM. Entre em contato com a equipe de TI. ERROR:"+incluirAvaliacao;
			}
		}
		
		if (hAPI.getCardValue("temAvalQuestionario") == "sim"){
			var incluirQuestionario = incluiQuestionario();
			log.info("Integracaoo RM requisicao DESLIGAMENTO incluirQuestionario = "+incluirQuestionario);
			if (!incluirQuestionario){
				throw "Ocorreu um erro inesperado durante a Integracao da Avaliacao de Competencia com RM. Entre em contato com a equipe de TI.";
		}
		}	
		
	} catch (e) {
		log.error("ERRO ABERTURA: " + e);
		throw e;

	}
	
}

function trataRetorno(result){
	var valor = result.split(";");
	var req = valor[1];
	return req;	
}