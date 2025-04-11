function afterTaskSave(colleagueId,nextSequenceId,userList){

	setCampoIdentificador();
	
	if(nextSequenceId == 329)
		setAtribuicaoVerAval();

}

function setCampoIdentificador(){
	
	chapa = hAPI.getCardValue("chapa");
	obraSetor =  hAPI.getCardValue("obraSetor");
	funcionario = hAPI.getCardValue("funcionario");
	dataPrevistaDemissao = hAPI.getCardValue("dataPrevistaDemissao");
	hiddenValidacaoObra = hAPI.getCardValue("hiddenValidacaoObra");
	
	var identificador = funcionario + "\nData Desligamento: " + dataPrevistaDemissao + "\nObra: " + obraSetor;
	
	if(hAPI.getCardValue("hiddenCompRealizarExames") == "naoCompareceuReagendar")
		identificador = identificador + "\nN\u00e3o compareceu aos exames - Reagendar";
	else if(hAPI.getCardValue("hiddenCompRealizarExames") == "naoCompareceuFinalizar")
		identificador = identificador + "\nN\u00e3o compareceu aos exames - Finalizar sem ASO";
	else if(hAPI.getCardValue("hiddenCompRealizarExames") == "compareceuAguardandoASO")
		identificador = identificador + "\nCompareceu aos exames - Aguardando ASO";
	
	if(hiddenValidacaoObra == "0")
		identificador = identificador + "\nRetorno DP Obra para Calcular Rescisão";
	
	hAPI.setCardValue("campoIdentificador", identificador);
	
}

function setAtribuicaoVerAval(){
	
	var PARAM_CODCOLIGADA = hAPI.getCardValue("codColigada");
	var PARAM_CODCCUSTO = hAPI.getCardValue("codCCObraSetor");
	
	var c1 = DatasetFactory.createConstraint("codColigada", PARAM_CODCOLIGADA, PARAM_CODCOLIGADA, ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("codCentroCusto", PARAM_CODCCUSTO, PARAM_CODCCUSTO, ConstraintType.MUST)
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_alcada_aprovacao", null, constraints, null);
	
	if(dataset.rowsCount > 0){
		
		var codAprovadorDiretor = dataset.getValue(0, "codAprovadorDiretor");
		hAPI.setCardValue("atribuicaoVerAval", "Pool:Role:" + codAprovadorDiretor);
		
	}
	
}