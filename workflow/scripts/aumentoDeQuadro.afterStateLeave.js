function afterStateLeave(sequenceId){
	
	switch (sequenceId) {
		
    	case gatewayPossuiRH:
    	case taskProcessoSeletivoRH:
    	case taskProcessoSeletivoDP:
		case taskAdmitirColaborador:
        	preencherIdentificador(sequenceId);
        	break;

		case taskAprovarCandidatoSolicitante:
		case taskAprovarCandidatoGestor:
			addHstReprovacao(sequenceId);
			break;
	}

}

function preencherIdentificador(numAtividade) {

	var idReq = hAPI.getCardValue("numRequisicaoSelecao");
	var obraSetor = hAPI.getCardValue("obraSetor");
	var secao = hAPI.getCardValue("secao");
	var funcao = hAPI.getCardValue("funcao");
	
	var identificador = 'Req ' + idReq + ' - ' + obraSetor + '\n' + secao + '\n' + funcao;

	if(numAtividade == gatewayPossuiRH){
		
		var camposModal = hAPI.getCardValue("camposModal");
		
		if(camposModal != undefined && camposModal != ''){
		
			var indicacoes = JSON.parse(camposModal);
			
			identificador = identificador + '\nIndicações:';
				
			for(i=2; i<=indicacoes.length; i=i+7)
				identificador = identificador  + "\n" + indicacoes[i];
		}
		
	} else if(numAtividade == taskProcessoSeletivoRH || numAtividade == taskProcessoSeletivoDP) {
		
		var candidatoSelecionado = hAPI.getCardValue("nomeCandidato");

		identificador = identificador + '\n' + candidatoSelecionado;		
		
	} else if(numAtividade == taskAdmitirColaborador){
		
		var candidatoSelecionado = hAPI.getCardValue("nomeCandidato");
		var chapaFunc = hAPI.getCardValue("chapaFunc");
		var dataAdmissao = hAPI.getCardValue("dataAdmissao");			

		identificador = identificador + '\n' + candidatoSelecionado + '\nChapa: ' + chapaFunc + '\nAdmissão: ' + dataAdmissao;
		
	}
		
	hAPI.setCardValue("campoIdentificador", identificador);
}

function addHstReprovacao(numAtividade){

	if(hAPI.getCardValue("aprovacao") == "nao" && numAtividade == taskAprovarCandidatoSolicitante){

		var childData = new java.util.HashMap();
		childData.put( "HstRepData", hAPI.getCardValue("dataAprovacao") );
		childData.put( "HstRepCandidatoNome", hAPI.getCardValue("nomeCandidato") );
		childData.put( "HstRepCandidatoCPF", hAPI.getCardValue("cpfCandidato") );
		childData.put( "HstRepReprovador", hAPI.getCardValue("nomeAprovador") );
		childData.put( "HstRepJustificativa", hAPI.getCardValue("justificativa") );	
		hAPI.addCardChild("TbHstReprovacao", childData);
		
	}else if(hAPI.getCardValue("aprovacao2") == "nao" && numAtividade == taskAprovarCandidatoGestor){
		
		var childData = new java.util.HashMap();
		childData.put( "HstRepData", hAPI.getCardValue("dataAprovacao2") );
		childData.put( "HstRepCandidatoNome", hAPI.getCardValue("nomeCandidato") );
		childData.put( "HstRepCandidatoCPF", hAPI.getCardValue("cpfCandidato") );
		childData.put( "HstRepReprovador", hAPI.getCardValue("nomeAprovador2") );
		childData.put( "HstRepJustificativa", hAPI.getCardValue("justificativa2") );	
		hAPI.addCardChild("TbHstReprovacao", childData);		
	}	

}