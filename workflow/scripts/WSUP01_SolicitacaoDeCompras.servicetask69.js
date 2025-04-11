function servicetask69(attempt, message) {
	var numero_da_solicitacao = getValue("WKNumProces");
	log.info("Inicio servicetask69 - Integracao RM cancela movimento numero_da_solicitacao: "+numero_da_solicitacao);

	
	try{
	
	var arraySolicitacoesDePara = [];
	var arrayMovimentosIntegrados = [];
	
	var contadorTotalItemSol = 0;
	var contadorTotalItemRevZerado = 0;
	
	var contadorTotalItemSolFilha = 0;
	var contadorTotalItemSolFilhaComMov = 0;
	var contadorTotalItemSolFilhaComMovIgual = 0;
	var contadorTotalItemSolFilhaSemMov = 0;
	var TMOV_CODCOLIGADA = hAPI.getCardValue("TMOV_CODCOLIGADA");
	
	var numSolicDePara = '';
	var itemEditado = '';

	var indexesItem = getIndexes("indicePaiFilhoItem");
	var iteratorItem = indexesItem.iterator();
	while(iteratorItem.hasNext()){
		var indexItem = iteratorItem.next();
		log.info("Inicio servicetask69 - Integracao RM cancela movimento indexItem: "+indexItem);
		var numSolicDePara = hAPI.getCardValue("numSolicDePara___" + indexItem);
		var itemEditado = hAPI.getCardValue("itemEditado___" + indexItem);
		var idMov115 = hAPI.getCardValue("idMovRM___" + indexItem);
		var idprdRmVinculado = hAPI.getCardValue("idprdRmVinculado___" + indexItem);
		var codProdutoRmVinculado = hAPI.getCardValue("codProdutoRmVinculado___" + indexItem);
		var numSeqItmMovGeradoRM = hAPI.getCardValue("numSeqItmMovGeradoRM___" + indexItem);
		var statusMovRM = hAPI.getCardValue("statusMovRM___" + indexItem);


		contadorTotalItemSol++;
		if(itemEditado == 'sim' ){contadorTotalItemRevZerado++;}
		
		log.info("-servicetask69 - idMov115 fora if= "+idMov115);
		log.info("-servicetask69 - itemEditado fora if= "+itemEditado);
		log.info("-servicetask69 - statusMovRM fora if= "+statusMovRM);
		log.info("-servicetask69 - idprdRmVinculado fora if= "+idprdRmVinculado);
		
//		statusMovRM = emAndamentoFluig, emAndamentoRm, itemCancelado, ItemComprado
		if(idMov115 != "" && itemEditado == 'sim' && statusMovRM == 'emAndamentoRm'){
				log.info("-servicetask69 - idMov115 dentro if= "+idMov115);
				
				
				var c1 = DatasetFactory.createConstraint('CODCOLIGADA', TMOV_CODCOLIGADA, TMOV_CODCOLIGADA, ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint('IDMOV', idMov115, idMov115, ConstraintType.MUST);
				var c3 = DatasetFactory.createConstraint('NUMSEQITM', numSeqItmMovGeradoRM, numSeqItmMovGeradoRM, ConstraintType.MUST);
				
				var constraints = new Array(c1, c2, c3);
				var dataset = DatasetFactory.getDataset('ds_ConsultaRM_WS112_RetornaHistoricoItemMovimento', null, constraints, null);	
				
				log.info("- servicetask69: "+getValue("WKNumProces")+"cancelarMovRm-ds_ConsultaRM_WS112_RetornaHistoricoItemMovimento--dataset != null============================================="+ dataset != null);
				if(dataset != null){
					
				log.info("- servicetask69: "+getValue("WKNumProces")+" cancelarMovRm-ds_ConsultaRM_WS112_RetornaHistoricoItemMovimento--dataset.getRowsCount()============================================="+dataset.getRowsCount());

				if( dataset.getRowsCount() > 0 ){
					for(var i=0; i < dataset.getRowsCount(); i++) {
						var CODTMOV = dataset.getValue(i, "CODTMV");
						var IDMOV = dataset.getValue(i, "IDMOV");
						var NSEQITMMOV = dataset.getValue(i, "NSEQITMMOV");
						var NUMEROMOV = dataset.getValue(i, "NUMEROMOV");
						log.info("-- servicetask69: "+getValue("WKNumProces")+" cancelarMovRm---CODTMOV============================================="+CODTMOV);
						log.info("-- servicetask69: "+getValue("WKNumProces")+" cancelarMovRm---IDMOV============================================="+IDMOV);
						log.info("-- servicetask69: "+getValue("WKNumProces")+" cancelarMovRm---NSEQITMMOV============================================="+NSEQITMMOV);
					if(TMOV_CODCOLIGADA != '' && IDMOV != '' && NSEQITMMOV != '' && NUMEROMOV != ''){
						var validouExclusao = validarExclusaoCancelamentoItemMov(TMOV_CODCOLIGADA, IDMOV, NSEQITMMOV, NUMEROMOV);
						if (!validouExclusao) {
							throw "WSUP01 - Ocorreu um erro inesperado na atividade servicetask69 -- Erro Integracao RM movimentos RM. Entre em contato com a equipe de TI.";
						}
					}
						
					}
					
					hAPI.setCardValue("statusSolFilha___" + indexItem, "cancelada");
					hAPI.setCardValue("itemCancelado___" + indexItem, "sim");
					hAPI.setCardValue("statusMovRM___" + indexItem, "itemCancelado");
					
					}else{
						//hAPI.setCardValue("itemCancelado___" + indexItem, "sim");
						//hAPI.setCardValue("statusMovRM___" + indexItem, "itemCancelado");
					}		
				
				
				}else{
					//hAPI.setCardValue("itemCancelado___" + indexItem, "sim");
					//hAPI.setCardValue("statusMovRM___" + indexItem, "itemCancelado");
				}
				
				}
			}
	
	log.info(" servicetask69 - Integracao RM cancela movimento contadorTotalItemSol"+ contadorTotalItemSol);
	log.info(" servicetask69 - Integracao RM cancela movimento contadorTotalItemRevZerado"+ contadorTotalItemRevZerado);	

	if(contadorTotalItemSol == contadorTotalItemRevZerado){
		var connect = DatasetFactory.getDataset("ds_mip_connector", null, null, null);
		var userAdmin = connect.getValue(0, "USUARIOECM");
		
		var c1 = DatasetFactory.createConstraint('processInstanceId', numero_da_solicitacao, numero_da_solicitacao, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint('userId', userAdmin, userAdmin, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint('cancelText', 'Cancelada Via Web Service - Item da SC foi cancelado.', 'Cancelada Via Web Service - único Item da SC foi cancelado.', ConstraintType.MUST);
		var constraints = new Array(c1, c2, c3);
		var dataset = DatasetFactory.getDataset('ds_Elimina_Solicitacoes_Fluig', null, constraints, null);	
		log.info("-servicetask69-cancelar SC 1 item============================================="+dataset.getRowsCount());
		if( dataset.getRowsCount() > 0 ){
			for(var i=0; i < dataset.getRowsCount(); i++) {
				 var resultado = dataset.getValue(i, "resultado");
				 var processo = dataset.getValue(i, "processo");
				 log.info("-servicetask69-cancelar SC 1 item resultado : "+resultado);
				 log.info("-servicetask69-cancelar SC 1 item processo : "+processo);
				if( resultado != 'OK'){
					log.error("ERRO   - Cancelar WSUP01   - Entre em contato com a equipe de TI.");
					throw"ERRO   - Cancelar WSUP01   - Entre em contato com a equipe de TI.";
				} 
			}
		}	
	}
	var numeroREV = hAPI.getCardValue("numeroRevSC"); 
	var WKUser = getValue('WKUser'); 
	hAPI.setTaskComments(WKUser, numero_da_solicitacao,  0, "Criado a revisão de Número"+numeroREV+".");
	hAPI.setCardValue("hidden_TempRev", '');	
	
	
	}catch (e){
    	log.error("ERROR WSUP01 servicetask69 : " + e);
    	throw"ERRO  WSUP01 servicetask69 - Entre em contato com a equipe de TI.";
    }
	
}

function validarExclusaoCancelamentoItemMov (TMOV_CODCOLIGADA, IDMOV, NSEQITMMOV, NUMEROMOV) {
	var RETORNO_IDMOV = '';
	log.info("-- servicetask69: "+getValue("WKNumProces")+" validarExclusaoCancelamentoItemMov--NSEQITMMOV========="+IDMOV);
	log.info("-- servicetask69: "+getValue("WKNumProces")+" validarExclusaoCancelamentoItemMov--NSEQITMMOV==========="+NSEQITMMOV);
	var c1 = DatasetFactory.createConstraint("COLIGADA",TMOV_CODCOLIGADA, TMOV_CODCOLIGADA, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDMOV", IDMOV, IDMOV,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("NSEQITMMOV", NSEQITMMOV, NSEQITMMOV,ConstraintType.MUST);
	
	var datasetWS188 = DatasetFactory.getDataset("ds_ConsultaRM_WS188_RetornaQtdItemAtivaPorMovimento", null, new Array(c1, c2, c3), null);
	log.info("-- servicetask69: "+getValue("WKNumProces")+" validarExclusaoCancelamentoItemMov--ds_ConsultaRM_WS188_RetornaQtdItemAtivaPorMovimento=========="+datasetWS188.rowsCount);
	if (datasetWS188.rowsCount > 0) {
		for (var x = 0; x < datasetWS188.rowsCount; x++) {
			RETORNO_IDMOV = datasetWS188.getValue(x, "IDMOV");
			log.info("-- servicetask69: "+getValue("WKNumProces")+" validarExclusaoCancelamentoItemMov--ds_ConsultaRM_WS188_RetornaQtdItemAtivaPorMovimento======RETORNO_IDMOV===="+RETORNO_IDMOV);
		}
	}

	log.info("-servicetask69- RETORNO_IDMOV : "+RETORNO_IDMOV);
	if(RETORNO_IDMOV != ''){
		 log.info("-servicetask69- "+getValue("WKNumProces")+" DIFERENTE DE VAZIO RETORNO_IDMOV : "+RETORNO_IDMOV+"NSEQITMMOV: "+NSEQITMMOV);
		 executarProcessoExclusaoItem(TMOV_CODCOLIGADA, IDMOV, NSEQITMMOV);
		 return true;
	}else if(RETORNO_IDMOV == ''){
		log.info("-servicetask69- "+getValue("WKNumProces")+" RETORNO_IDMOV IGUAL A VAZIO : "+RETORNO_IDMOV+"NSEQITMMOV: "+NSEQITMMOV);
		executarProcessoCancelamentoCadaMovimento(TMOV_CODCOLIGADA, IDMOV, NUMEROMOV);
		return true;
	}
}


