function afterTaskSave(colleagueId,nextSequenceId,userList){
	
	preencherIdentificador();

}

function preencherIdentificador() {	

    var indexes = getIndexes('camposModal');
	var iterator = indexes.iterator();
	
	var campoIdentificador = ""; //hAPI.getCardValue("obraSetor");

	while (iterator.hasNext()) {

		var index = iterator.next();
		
		campoIdentificador = campoIdentificador + hAPI.getCardValue("secao___" + index);
		campoIdentificador = campoIdentificador + '\n' + hAPI.getCardValue("centroCusto___" + index);
		campoIdentificador = campoIdentificador + ' - ' + hAPI.getCardValue("funcao___" + index);
		campoIdentificador = campoIdentificador + ' - Vagas: ' + hAPI.getCardValue("numeroVagas___" + index);		
		
		if(iterator.hasNext())
			campoIdentificador = campoIdentificador + '\n\n';
		
	}
		
	hAPI.setCardValue("campoIdentificador", campoIdentificador);
	
}