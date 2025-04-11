function validaChapa() {

	//log.info("### validaChapa()");

	var idReq = hAPI.getCardValue("numRequisicaoSelecao");
	var codColigada = hAPI.getCardValue("codColigada");

	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDREQ", idReq, idReq, ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_candidato", null, constraints, null);
	
	try{
		
		//log.info("### validaChapa() - dataset.rowsCount: " + dataset.rowsCount);
		
		for(var i=0; i < dataset.rowsCount; i++) {
						
			//log.info("### validaChapa() - dataset.getValue(i, CHAPA): " + dataset.getValue(i, "CHAPA"));
			//log.info("### validaChapa() - dataset.getValue(i, DATAADMISSAO): " + dataset.getValue(i, "DATAADMISSAO"));
			
			if (dataset.getValue(i, "CHAPA") != ""){
				
				if(hAPI.getCardValue("nomeAprovadorAdmissao") == "")					
					hAPI.setCardValue("nomeAprovadorAdmissao", dataset.getValue(i, "PFUNC_RECCREATEDBY"));
				
				hAPI.setCardValue("dataAprovacaoAdmissao", buscarDataAtualSistema());				
				hAPI.setCardValue("chapaFunc", dataset.getValue(i, "CHAPA"));
				hAPI.setCardValue("dataAdmissao", ajustarDataServidor(dataset.getValue(i, "DATAADMISSAO")));				
				
				return true;
				
			} else
				return false;

		}
	} catch(e){
		
		return false;
		
	}
	
	return false;
	
}