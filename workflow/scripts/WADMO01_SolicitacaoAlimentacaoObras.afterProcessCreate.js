function afterProcessCreate(processId){
	var numero_da_solicitacao = getValue("WKNumProces");
	hAPI.setCardValue("numero_solicitacao", numero_da_solicitacao);
	
	
	txt_projeto = hAPI.getCardValue("txt_projeto");
	fornecedor =  hAPI.getCardValue("fornecedor");
	dtVoucher = hAPI.getCardValue("dtVoucher");

	
	var identificador = txt_projeto +" - "+fornecedor +" - "+dtVoucher;
	hAPI.setCardValue("campoIdentificador", identificador);
	
}