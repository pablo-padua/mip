function servicetask313(attempt, message){
	
	//log.info("#INICIO# servicetask313()");
	
	try{
		iniciarAumentoQuadro();
	}catch(e){
		throw "Erro (iniciarAumentoQuadro): " + e;		
	}
	
	//log.info("#FIM# servicetask313()");
		
}