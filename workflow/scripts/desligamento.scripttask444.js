function scripttask444() {
	
	log.info(" WRH03 - scripttask444() ");
	
/*
	
	var numero_da_solicitacao = getValue("WKNumProces");
	

	var dataHoje = buscarDataAtualSistema();
	var CODCOLIGADA = hAPI.getCardValue("codColigada");
	var CHAPA = hAPI.getCardValue("chapa");
	var dataPagamento = '';
	
	var c1_ExDemiss = DatasetFactory.createConstraint("CODCOLIGADA", CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST);
	var c2_ExDemiss = DatasetFactory.createConstraint("CHAPA", CHAPA, CHAPA, ConstraintType.MUST);
	var constraints_ExDemiss = new Array(c1_ExDemiss,c2_ExDemiss);
	
	var dataset_ExDemiss = DatasetFactory.getDataset("ds_RM_retorna_exameDemissional", null, constraints_ExDemiss, null);
	//log.info(' - scripttask444 - dataset_ExDemiss.getRowsCount()== '+dataset_ExDemiss.getRowsCount());
	for(var i=0; i < dataset_ExDemiss.getRowsCount(); i++) {
		var EXAME_DEMISSIONAL = dataset_ExDemiss.getValue(i,"EXAME_DEMISSIONAL");
		//log.info(' - scripttask444 - EXAME_DEMISSIONAL== '+EXAME_DEMISSIONAL);
			if(EXAME_DEMISSIONAL != ""){
				
				hAPI.setCardValue("dataFechamento", dataHoje);
				hAPI.setCardValue("responsavelFechamento", buscarNomeUsuario());
				hAPI.setCardValue("apto", EXAME_DEMISSIONAL);
				dataPagamento = formatDateMaskRM(dataset_ExDemiss.getValue(i,"DTULTIMOMOVIM"));
				hAPI.setCardValue("dataPagamento", dataPagamento);
			}
			//else{
			//	throw 'Não foi localizado informações referente ao EXAME DEMISSIONAL do Funcionário.'
			//}
	}
	
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", CHAPA, CHAPA, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("DATA_D", dataPagamento, dataPagamento, ConstraintType.MUST);
	var constraints = new Array(c1,c2, c3);
	
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_lancamentosRescisao", null, constraints, null);
	//log.info(' - scripttask444 - dataset.getRowsCount()== '+dataset.getRowsCount());
	for(var y=0; y < dataset.getRowsCount(); y++) {
		var TIPO = dataset.getValue(y,"TIPO");
		//log.info(' - scripttask444 - TIPO== '+TIPO);
		if (TIPO == "FUNC"){
			hAPI.setCardValue("referenciaRescisao", dataset.getValue(y,"IDLAN"));
			hAPI.setCardValue("historicoRescisao", dataset.getValue(y,"HISTORICO"));
			hAPI.setCardValue("valorRescisao", formataValor(dataset.getValue(y,"VALORORIGINAL")));
			
		} else if (TIPO == "GRRF"){
			hAPI.setCardValue("referenciaGRRF", dataset.getValue(y,"IDLAN"));
			hAPI.setCardValue("historicoGRRF", dataset.getValue(y,"HISTORICO"));
			hAPI.setCardValue("valorGRRF", formataValor(dataset.getValue(y,"VALORORIGINAL")));
			

		} 
		//else {
		//	throw 'Não foi localizado informações referente aos LANÇAMENTOS DA RECISÃO do Funcionário.'
		//}
	}
	
	
*/

	
}

/*
function buscarMatriculaUsuarioLogado() {
	//var user = getValue('WKReplacement') != null ? getValue('WKReplacement') : getValue('WKUser');
	var user = getValue('WKUser');
	return user;
}
function buscarNomeUsuario() {
	var user = buscarMatriculaUsuarioLogado();
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleague", null, [ c1 ], null);
	if (dataset.rowsCount == 1) {
		userName = dataset.getValue(0, "colleagueName");
	}
	return userName;
}
*/