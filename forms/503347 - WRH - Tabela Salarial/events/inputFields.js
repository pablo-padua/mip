function inputFields(form){
	
	var numState = buscarAtividadeAtual();
	
	if(numState == 87){ /* WRH09 - Vincular Riscos */
				
		var data = buscaDataAtual();
		
		form.setValue("dataVincRiscos", data);
		form.setValue("nomeVincRiscos", buscarNomeUsuario());		
	
	}
	
	
}