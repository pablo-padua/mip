function validarSolicitante() {
	var codColigada = hAPI.getCardValue("codColigadaSolicitante");
	var centroCusto = hAPI.getCardValue("MOV_GCCUSTO_CODREDUZIDO");
	var USERID = '';
	
		var c1 = DatasetFactory.createConstraint("COLIGADA", codColigada, codColigada, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("CODCCUSTO", centroCusto, centroCusto, ConstraintType.MUST);
		var constraints   = new Array(c1, c2);
	
		var dataset = DatasetFactory.getDataset("ds_ConsultaRM_WS107_RetornaAprovadorGerenteObra", null, constraints, null);
		if (dataset.rowsCount > 0) {
			USERID = dataset.getValue(0, "USERID")
			
		} else {
			throw "Não foi possível definir o responsavel pela Atividade.";
		}
		var matriculaSolicitante = hAPI.getCardValue("matriculaSolicitante");
			log.info("matriculaSolicitante=== "+matriculaSolicitante);
			log.info("USERID=== "+USERID);
			
		if(matriculaSolicitante == USERID){
			return 'true';
		}

}