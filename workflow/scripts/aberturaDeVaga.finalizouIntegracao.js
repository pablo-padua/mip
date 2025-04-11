function finalizouIntegracao(){
	
	var qtdSolicitada = parseInt(qtdVagaSolicitada());
	var qtdIntegrada = parseInt(consultaQtdReqIntegrada());

	if(qtdIntegrada == null)
		return "ERRO";
	else if(qtdIntegrada >= qtdSolicitada)
		return "sim";
	else
		return "nao";
}

function qtdVagaSolicitada(){
	
	var index = getIndexes("numeroVagas");
	var arrIndex = index.toArray();
	var i = 0;
	var qtd = 0;
	
	while(arrIndex[i]){
		
		qtd = qtd + parseInt(hAPI.getCardValue("numeroVagas___"+arrIndex[i]));
		
		i++;
	}
	
	return qtd;	
}


function consultaQtdReqIntegrada(){
	
	var codColigada = hAPI.getCardValue("codColigada");
	var idFluig = getValue("WKNumProces");

	var arrayConstraint = [];
	
	arrayConstraint.push(DatasetFactory.createConstraint("PARAM_CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST));
	arrayConstraint.push(DatasetFactory.createConstraint("PARAM_IDFLUIG", idFluig, idFluig, ConstraintType.MUST));

	var dataset = DatasetFactory.getDataset("ds_RM_WS208_WRH01_QtdREQ", null, arrayConstraint, null);

	if(dataset == null){
		log.info("### WRH01 - " + getValue("WKNumProces") + " - ds_RM_WS208_WRH01_QtdREQ - ERROR");
		return null;
	} else if (dataset.rowsCount >= 1) {

		return dataset.getValue(0, "QTDREQ");

	} 

	log.info("### WRH01 - " + getValue("WKNumProces") + " - ds_RM_WS208_WRH01_QtdREQ - ERROR");
	return null;
	
}