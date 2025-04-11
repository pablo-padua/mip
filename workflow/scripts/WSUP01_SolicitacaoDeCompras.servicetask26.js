function servicetask26(attempt, message) {
	//log.info("Inicio servicetask26 - start criacao dos processos filhos ");
	try{
	var startProcesso = iniciarProcessoFilho();
		if(!startProcesso){
			throw "Ocorreu um erro inesperado na atividade servicetask26 -- Erro ao iniciar processo . Entre em contato com a equipe de TI.";
		}
//log.info("FIM servicetask26 - start criacao dos processos filhos ");
	}catch(e){
		log.info("ERRO servicetask26 - iniciarProcessoFilho"+e);
		throw e;
	}
}