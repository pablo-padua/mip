function servicetask318(attempt, message) {
	
	try{
		var justificativa = hAPI.getCardValue("justificativaCancelamento");
		cancelaRequisicao(justificativa);
	}catch(e){
		throw "Erro (cancelaRequisicao): " + e;		
	}	
	
}