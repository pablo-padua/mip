function beforeStateEntry(sequenceId){
	//log.info("desligamentoS beforeStateEntry - desligamento - sequenceId == "+ sequenceId);
	var CODCOLIGADA = hAPI.getCardValue("codColigada");
	var CHAPA = hAPI.getCardValue("chapa");
	
	if(sequenceId == 358 || sequenceId == 418)
		carregaDataPagamento(CODCOLIGADA, CHAPA);

	if(sequenceId == 483 || sequenceId == 495 || sequenceId == 510)
		carregaExameDemissional(CODCOLIGADA, CHAPA);
	
	if(sequenceId == 287 || sequenceId == 446)
		carregaDataHomologacao(CODCOLIGADA, CHAPA);
	
	if(sequenceId == 432 || sequenceId == 229) /* 1º Paralelo - Fim 2º Paralelo */
		carregaExameDemissional(CODCOLIGADA, CHAPA);

	if(sequenceId == 229){

		var userMatricula = getValue ("WKUser");
		var userName = "";
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", userMatricula,userMatricula, ConstraintType.MUST);
		var dataset = DatasetFactory.getDataset("colleague", null, [ c1 ], null);
		if (dataset.rowsCount == 1) {
			userName = dataset.getValue(0, "colleagueName");
		}
		
		var atividadeAtual = getValue("WKNumState");
	
				if (atividadeAtual == 227) {
					//TI
					hAPI.setCardValue("dataTI", buscarDataAtualSistema());
					hAPI.setCardValue("responsavelTI", userName);
				} else if (atividadeAtual == 385) {
						//logistica
					hAPI.setCardValue("dataEPI", buscarDataAtualSistema());
					hAPI.setCardValue("responsavelEPI", userName);
				} else if (atividadeAtual == 237) {	
					//administrativo
					hAPI.setCardValue("dataADM", buscarDataAtualSistema());
					hAPI.setCardValue("responsavelADM", userName);
				}else if (atividadeAtual == 239) {	
					//financeira
					hAPI.setCardValue("dataFIN", buscarDataAtualSistema());
					hAPI.setCardValue("responsavelFIN", userName);
				}		
		
	}
	
	if(sequenceId == 510 && hAPI.getCardValue("hiddenCompRealizarExames") == "" ){ /* Compareceu aos exames - Aguardando ASO */
		
		var userMatricula = getValue ("WKUser");
		var userName = "";
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", userMatricula,userMatricula, ConstraintType.MUST);
		var dataset = DatasetFactory.getDataset("colleague", null, [ c1 ], null);
		if (dataset.rowsCount == 1) {
			userName = dataset.getValue(0, "colleagueName");
		}
		
		hAPI.setCardValue("dataValidDocAso", buscarDataAtualSistema());
		hAPI.setCardValue("nomeAprovValidDocAso", userName);
		hAPI.setCardValue("compRealizarExames", "compareceuAguardandoASO");
		hAPI.setCardValue("hiddenCompRealizarExames", "compareceuAguardandoASO");
	}
}

function carregaDataHomologacao(CODCOLIGADA, CHAPA){
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", CHAPA, CHAPA, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	
	var dataset = DatasetFactory.getDataset("ds_ConsultaRM_WS094_RetornaDataUltimaMovDemissao", null, constraints, null);

	if (dataset.rowsCount > 0) {

		for (var x = 0; x < dataset.rowsCount; x++) {
			var DATA_HOMOLOG_RCT = dataset.getValue(x, "DATA_HOMOLOG_RCT");
			var DTPAGTORESCISAO = dataset.getValue(x, "DTPAGTORESCISAO");
			var HOMOLOG_CONCLUIDA = dataset.getValue(x, "HOMOLOG_CONCLUIDA");
//			log.info("desligamentoS beforeStateEntry - desligamento - -  DATA_HOMOLOG_RCT == "+ DATA_HOMOLOG_RCT);
//			log.info("desligamentoS beforeStateEntry - desligamento - -  DTPAGTORESCISAO == "+ DTPAGTORESCISAO);
			if(DATA_HOMOLOG_RCT != "" || DTPAGTORESCISAO != ""){
				hAPI.setCardValue("responsavelHomologa", "Automático");
				if(DATA_HOMOLOG_RCT != ""){
					hAPI.setCardValue("dataHomologa", formatDateMaskRM(DATA_HOMOLOG_RCT));
					hAPI.setCardValue("dataAssinatura", formatDateMaskRM(DATA_HOMOLOG_RCT));
				}else{
					hAPI.setCardValue("dataHomologa", formatDateMaskRM(DTPAGTORESCISAO));
					hAPI.setCardValue("dataAssinatura", formatDateMaskRM(DTPAGTORESCISAO));
				}				

			}
		}
	}
}
function carregaDataPagamento(CODCOLIGADA, CHAPA){
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", CHAPA, CHAPA, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_ConsultaRM_WS094_RetornaDataUltimaMovDemissao", null, constraints, null);

	if (dataset.rowsCount > 0) {
		for (var x = 0; x < dataset.rowsCount; x++) {		
			var DTULTIMOMOVIM = formatDateMaskRM(dataset.getValue(x, "DTULTIMOMOVIM"));
			
			hAPI.setCardValue("dataPagamento", DTULTIMOMOVIM);
			hAPI.setCardValue("responsavelFechamento", "Automático");
			hAPI.setCardValue("dataFechamento", buscarDataAtualSistema());
			carregaLancamentos(CODCOLIGADA, CHAPA,  DTULTIMOMOVIM);
		}
	}
}

function carregaLancamentos(CODCOLIGADA, CHAPA,  DTULTIMOMOVIM){

	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", CHAPA, CHAPA, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("DATA_D", DTULTIMOMOVIM, DTULTIMOMOVIM, ConstraintType.MUST);
	var constraints = new Array(c1,c2,c3);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_lancamentosRescisao", null, constraints, null);
	if (dataset.rowsCount > 0) {
		for (var y = 0; y < dataset.rowsCount; y++) {
			var TIPO = dataset.getValue(y, "TIPO");
			if (TIPO == "FUNC"){
				hAPI.setCardValue("referenciaRescisao", dataset.getValue(y, "IDLAN"));
				hAPI.setCardValue("historicoRescisao", dataset.getValue(y, "HISTORICO"));
				hAPI.setCardValue("valorRescisao", formataValor(dataset.getValue(y, "VALORORIGINAL")));			
			} else if (TIPO == "GRRF"){
				hAPI.setCardValue("referenciaGRRF", dataset.getValue(y, "IDLAN"));
				hAPI.setCardValue("historicoGRRF", dataset.getValue(y, "HISTORICO"));
				hAPI.setCardValue("valorGRRF", formataValor(dataset.getValue(y, "VALORORIGINAL")));
			} 
		}
	}
}

function carregaExameDemissional(CODCOLIGADA, CHAPA){
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", CHAPA, CHAPA, ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_exameDemissional", null, constraints, null);
	if (dataset.rowsCount > 0) {
		for (var x = 0; x < dataset.rowsCount; x++) {
			var EXAME_DEMISSIONAL = dataset.getValue(x, "EXAME_DEMISSIONAL");
			hAPI.setCardValue("apto", EXAME_DEMISSIONAL);
		}
	}
}