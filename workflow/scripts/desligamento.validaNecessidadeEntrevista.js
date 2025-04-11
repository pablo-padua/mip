function validaNecessidadeEntrevista(){

	var retorno = null;
	var codColigada = hAPI.getCardValue("codColigada");
	var codFuncao = hAPI.getCardValue("codFuncao");
	var c1 = DatasetFactory.createConstraint("COLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODFUNCAO", codFuncao, codFuncao, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_ConsultaRM_WS133_RetornaFuncoesComFiltro", null, constraints, null);

	if(dataset != null){
		for (var i = 0; i < dataset.rowsCount; i++){
			if(dataset.getValue(i, "VALIDA_ENTREVISTA") == "0"){
				log.info("validaNecessidadeEntrevista: == false");
				retorno =  false;
			}else{
				log.info("validaNecessidadeEntrevista: == true");
				retorno =  true;
			}
		}
	}else{
		log.info("validaNecessidadeEntrevista: == true");
		retorno =  true;
	}

	return retorno;

}