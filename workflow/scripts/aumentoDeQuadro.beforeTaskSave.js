function beforeTaskSave(colleagueId,nextSequenceId,userList){

	if (nextSequenceId == taskSelecaoAprovada39 || nextSequenceId == servicoIntegrarPessoa){
		
		if(hAPI.getCardValue("cargo") == "Soldador"){
		
			var totalAttachments = hAPI.listAttachments().size();
			hAPI.setCardValue("qtdAnexosFluig", totalAttachments);
			
			if(totalAttachments < 1){
				throw "<br><br>Para o cargo de Soldador é necessário anexar o Teste de Solda.<br><br>Retorne ao topo da solicitação para acessar o menu de Anexos e 'Carregar Arquivos'.<br><br>";
			}
			
		}
		
	}
	
}