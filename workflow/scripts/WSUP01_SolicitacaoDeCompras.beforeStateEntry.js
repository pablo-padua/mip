function beforeStateEntry(sequenceId){
	var atividade = getValue("WKCurrentState");
	var numero_da_solicitacao = getValue("WKNumProces");
	log.info("INÍCIO -  beforeStateEntry - WSUP01-RequisicaoCompras - numero_da_solicitacao: "+numero_da_solicitacao+" sequenceId: "+sequenceId);
	

	
	if (sequenceId == DECISORIA_VALIDAR_ABERTURA) {	
		gravarCampoIdentificador();
	}else if(sequenceId == DECISORIA_VALIDAR){
		
		
		
		atualizaSeValorDiferente("hidden_TempRevEdicaoItem", "");
		
	}else if(sequenceId == EXCLUSIVO_ACOMPANHAR_REV){
		atualizarStatusItemComprado();
		atualizaSeValorDiferente("tipoAprovCoordPlanRev", "");
		atualizaSeValorDiferente("tipoAprovGerenteRev", "");
		
	}else if(sequenceId == ACOMPANHAR_SOLICITACAO_REVISAO){
		atualizarStatusItemComprado();
	}else if(sequenceId == APROVACAO_COORD_PLAN_REV){
		//atualizarStatusItemComprado();
	}else if(sequenceId == DECISORIA_AJUSTES){
	
		var indexes = getIndexes("indicePaiFilhoItem");
		var iterator = indexes.iterator();
		while(iterator.hasNext()){			 
		var index = iterator.next();
			var matricRespDePara = hAPI.getCardValue("matricRespDePara___" + index);
			if(matricRespDePara == "Contrato"){
				atualizaSeValorDiferente("numSolicDePara___"+index, "-");			
			}
		}	
	}	
	
	log.info("FIM -  beforeStateEntry - WSUP01-RequisicaoCompras - numero_da_solicitacao: "+numero_da_solicitacao+" sequenceId: "+sequenceId);
}

function gravarCampoIdentificador(){
	numeroSC =  hAPI.getCardValue("numeroSC");
	numeroRevSC =  hAPI.getCardValue("numeroRevSC");
	nmFantColSolicitacao = hAPI.getCardValue("nmFantColSolicitacao");

	var identificador = numeroSC +" - "+numeroRevSC +" - "+nmFantColSolicitacao;
	atualizaSeValorDiferente("campoIdentificador", identificador);
}

function atualizarStatusItemComprado(){
	var numero_da_solicitacao = getValue("WKNumProces");
	//log.info("## WSUP01 - beforeStateEntry - atualizarStatusItemComprado - numero_da_solicitacao :"+numero_da_solicitacao+ "INICIO ");
	var numero_da_solicitacao = getValue("WKNumProces");
	var connect = DatasetFactory.getDataset("ds_mip_connector", null, null, null);
	var userAdmin = connect.getValue(0, "USUARIOECM");
	//log.info("## WSUP01 - beforeStateEntry - atualizarStatusItemComprado- userAdmin :"+userAdmin);
	var c1 = DatasetFactory.createConstraint("metadata#active","true","true", ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("userSecurityId",userAdmin,userAdmin, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("NUMERO_SOLICITACAO_PAI",numero_da_solicitacao,numero_da_solicitacao, ConstraintType.MUST);
	var constraintsForm = new Array(c1,c2,c3);
	var datasetForm = DatasetFactory.getDataset("ds_VIEW_FormsWSUP02_solicitacaoVincularItensCompras", null, constraintsForm, null);

	
	//log.info("## WSUP01 - d beforeStateEntry - atualizarStatusItemComprado:"+numero_da_solicitacao+ "datasetForm.rowsCount: " + datasetForm.rowsCount);
	for(var i = 0; i < datasetForm.rowsCount; i++){
		var indicePaiFilhoItem = datasetForm.getValue(i, "indicePaiFilhoItem");
		var codColigada = hAPI.getCardValue("TMOV_CODCOLIGADA");
		var idMovRM = datasetForm.getValue(i, "numIdGeradoRM");
		var numSeqItmMovGeradoRM = datasetForm.getValue(i, "numSeqItmMovGeradoRM");
		
		//log.info("## WSUP01 - beforeStateEntry - atualizarStatusItemComprado numero_da_solicitacao :"+numero_da_solicitacao+ "- AtualizaCamposIntegracao - WSUP02 - indicePaiFilhoItem: " + indicePaiFilhoItem);
		//log.info("## WSUP01 -  beforeStateEntry - atualizarStatusItemComprado numero_da_solicitacao :"+numero_da_solicitacao+ "- AtualizaCamposIntegracao - WSUP02 - idMovRM: " + idMovRM);
		//log.info("## WSUP01 -  beforeStateEntry - atualizarStatusItemComprado numero_da_solicitacao :"+numero_da_solicitacao+ "- AtualizaCamposIntegracao - WSUP02 - numSeqItmMovGeradoRM: " + numSeqItmMovGeradoRM);

		
		if(indicePaiFilhoItem != "" && idMovRM != ""){

			var indices = hAPI.getChildrenIndexes("tableItens");

			for (var i = 0; i < indices.length; i++) {
				var index = indices[i];
				var indicePaiFilhoItem = hAPI.getCardValue("indicePaiFilhoItem___"+index);
			}


			var indexes = getIndexes("indicePaiFilhoItem");
			var iterator = indexes.iterator();
			while(iterator.hasNext()) {
			index = iterator.next();
			
				var indicePaiFilhoItemWSUP01 = hAPI.getCardValue("indicePaiFilhoItem___"+index);
				//log.info("## WSUP01 - beforeStateEntry - atualizarStatusItemCompradonumero_da_solicitacao :"+numero_da_solicitacao+ "- AtualizaCamposIntegracao -  - indicePaiFilhoItem == indicePaiFilhoItemWSUP01: " + indicePaiFilhoItem == indicePaiFilhoItemWSUP01);
				
				 if(indicePaiFilhoItem == indicePaiFilhoItemWSUP01){
		
		
							//log.info("## WSUP01 - beforeStateEntry - atualizarStatusItemComprado - - idMovRM: " + idMovRM);
							//log.info("## WSUP01 - beforeStateEntry - atualizarStatusItemComprado - - numSeqItmMovGeradoRM: " + numSeqItmMovGeradoRM);
							
							
							
							atualizaSeValorDiferente("idMovRM___"+index, idMovRM);
							if(idMovRM != ""){
								verificaGravaSttusMovimento(codColigada, idMovRM, numSeqItmMovGeradoRM, index)
								
							 }
							atualizaSeValorDiferente("numSeqItmMovGeradoRM___"+index, numSeqItmMovGeradoRM);
							atualizaSeValorDiferente("qtdRmVinculado___"+index, datasetForm.getValue(i, "qtdItemRM"));
							
							var numeroMov = buscarNumeroMov(codColigada, idMovRM, numSeqItmMovGeradoRM);
							atualizaSeValorDiferente("numMovRM___"+index, numeroMov);
							
							atualizaSeValorDiferente("statusSolicFilha___"+index, "integrada");
							atualizaSeValorDiferente("statusSolFilha___"+index, "integrada");
							atualizaSeValorDiferente("idprdRmVinculado___"+index, datasetForm.getValue(i, "idprd"));
							atualizaSeValorDiferente("codProdutoRmVinculado___"+index, datasetForm.getValue(i, "codProduto"));
							atualizaSeValorDiferente("unRmVinculado___"+index, datasetForm.getValue(i, "unidRM"));
							
						
							atualizaSeValorDiferente("idprdRmVinculado___"+index, datasetForm.getValue(i, "idprd"));
							atualizaSeValorDiferente("codProdutoRmVinculado___"+index, datasetForm.getValue(i, "codProduto"));
							atualizaSeValorDiferente("unRmVinculado___"+index, datasetForm.getValue(i, "unidRM"));
							
							
								
	 
					 }
 
				 }	 
			}
		}
	
}


function buscarNumeroMov(codColigada, idMovRM, numSeqItmMovGeradoRM){
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDMOV",idMovRM,idMovRM, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("NUMSEQITM",numSeqItmMovGeradoRM,numSeqItmMovGeradoRM, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3);
	var dataset = DatasetFactory.getDataset("ds_ConsultaRM_WS112_RetornaHistoricoItemMovimento", null, constraints, null);
	for(var i = 0; i < dataset.rowsCount; i++){
		var CODTMV = dataset.getValue(i, "CODTMV");
		var NUMEROMOV = dataset.getValue(i, "NUMEROMOV");
			if(CODTMV == "1.1.05"){
				if(NUMEROMOV == undefined){
					return "-";
				}else{
					return NUMEROMOV;
			}	
		}	
	}	
}

function verificaGravaSttusMovimento(codColigada, idMovRM, numSeqItmMovGeradoRM, index){
	var numero_da_solicitacao = getValue("WKNumProces");
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDMOV", idMovRM, idMovRM, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("NUMSEQITM", numSeqItmMovGeradoRM, numSeqItmMovGeradoRM, ConstraintType.MUST);
	
	var constraints = new Array(c1, c2, c3);
	//log.info("-beforeStateEntry numero_solicitacao: "+numero_solicitacao+"validarItemMovFaturado---constraints=============="+constraints);
	var dataset = DatasetFactory.getDataset("ds_ConsultaRM_WS112_RetornaHistoricoItemMovimento", null, constraints, null);

	if( dataset.getRowsCount() != null ){
	//log.info("-beforeStateEntry numero_solicitacao: "+numero_solicitacao+"validarItemMovFaturado---dataset.getRowsCount()==========="+dataset.getRowsCount());

	if( dataset.getRowsCount() > 0 ){
		for(var i=0; i < dataset.getRowsCount(); i++) {
			var CODTMV = dataset.getValue(i, "CODTMV");
			var NUMEROMOV = dataset.getValue(i, "NUMEROMOV");
			//log.info("-beforeStateEntry numero_solicitacao: "+numero_solicitacao+"validarItemMovFaturado-NUMEROMOV : "+NUMEROMOV+"-#-CODTMV===="+CODTMV);
			if(CODTMV != null && CODTMV != ""){
				if((CODTMV == "1.1.25") || (CODTMV == "1.1.19")){
					//log.info("-beforeStateEntry numero_solicitacao: "+numero_solicitacao+"validarItemMovFaturado--GRAVOU ITEMCOMPRADO index:# " +index+"-CODTMV============="+CODTMV);
					atualizaSeValorDiferente("statusMovRM___"+index, "ItemComprado");
				}
			}else{
				atualizaSeValorDiferente("statusMovRM___"+index, "emAndamentoRm");
			}	
		}
	}else{
		atualizaSeValorDiferente("statusMovRM___"+index, "emAndamentoRm");
	}
}
}

function atualizaSeValorDiferente(id, valorNovo) {
	var valorAtual = hAPI.getCardValue(id);
	if (valorAtual != valorNovo) {
		hAPI.setCardValue(id, valorNovo);
	}
}