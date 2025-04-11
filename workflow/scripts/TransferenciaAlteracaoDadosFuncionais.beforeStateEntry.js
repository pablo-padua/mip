function beforeStateEntry(sequenceId){
	
	if(sequenceId == APROV_TESTE || sequenceId == APROV_DIRETORIA){
		
		hAPI.setCardValue("qtdAnexos", hAPI.listAttachments().size());
		
	}		
	
if(sequenceId == 143){
		
		hAPI.setCardValue("aprovDiretoria", 'sim');
		
	}
	
}