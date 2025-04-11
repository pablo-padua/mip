function beforeTaskSave(colleagueId,nextSequenceId,userList){

	if(hAPI.getCardValue("cargoOrigem") != hAPI.getCardValue("cargoProposto") && hAPI.getCardValue("cargoProposto") == "Soldador"){
	
		var totalAttachments = hAPI.listAttachments().size();
		hAPI.setCardValue("qtdAnexos", totalAttachments);
		
		if(totalAttachments < 1){
			throw "<br><br>Para o cargo de Soldador é necessário anexar o Teste de Solda.<br><br>Retorne ao topo da solicitação para acessar o menu de Anexos e 'Carregar Arquivos'.<br><br>";
		}
		
	}
	
}