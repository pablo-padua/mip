var beforeSendValidate = function(numState,nextState){
	
	/* Permite Tranferir e Salvar sem validar campos */
	if(numState == nextState){
        return;
    }
	/* Permite Tranferir e Salvar sem validar campos */
	
	if(numState == INICIO) {
		
		if( $('#myModal').is(':visible') )
			throw  'Favor fechar a tela de Indicação antes de clicar em Enviar';
	}

}