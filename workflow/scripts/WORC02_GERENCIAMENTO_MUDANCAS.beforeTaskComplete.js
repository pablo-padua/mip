function beforeTaskComplete(colleagueId,nextSequenceId,userList){
	var atividade = getValue('WKCurrentState');
		hAPI.setCardValue("atividadeAnterior", atividade);
}