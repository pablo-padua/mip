function validaExames(){

	//log.info("### validaExames()");

	var idReq = hAPI.getCardValue("numRequisicaoSelecao");
	var codColigada = hAPI.getCardValue("codColigada");

	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDREQ", idReq, idReq, ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_candidato", null, constraints, null);

	try{

		//log.info("### validaExames() - dataset.rowsCount: " + dataset.rowsCount);

		for(var i=0; i < dataset.rowsCount; i++) {

			//log.info("### validaExames() - dataset.getValue(i, SITUACAO_ASO): " + dataset.getValue(i, "SITUACAO_ASO"));

			if (dataset.getValue(i, "SITUACAO_ASO") != ""){

				if(hAPI.getCardValue("nomeAprovadorMedicina") == "")
					hAPI.setCardValue("nomeAprovadorMedicina", "(Tarefa Automática)");

				hAPI.setCardValue("dataAprovacaoMedicina", buscarDataAtualSistema());
				hAPI.setCardValue("aprovacaoMedicina", dataset.getValue(i, "SITUACAO_ASO"));
				
				return true;
				
			} else
				return false;

		}
	} catch(e){

		return false;

	}

	return false;	

}