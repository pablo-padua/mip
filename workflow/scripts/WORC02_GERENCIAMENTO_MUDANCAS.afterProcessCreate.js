function afterProcessCreate(processId){
	var numero_da_solicitacao = getValue("WKNumProces");
	hAPI.setCardValue("numeroSolicitacao", numero_da_solicitacao);	
}