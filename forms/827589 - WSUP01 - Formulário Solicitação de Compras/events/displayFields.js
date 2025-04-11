function displayFields(form,customHTML){ 
	form.setShowDisabledFields(true);
	recuperarAtividadeJS(form, customHTML);
	var atividade = getValue("WKNumState");
	
	if(atividade == INICIO_0 || atividade == INICIO ){	
		if(form.getFormMode() != 'VIEW'){
			form.setValue("dataSolicitacao", buscaDataAtual());
			form.setValue("nomeSolicitante", buscarNomeUsuario());
			form.setValue("matriculaSolicitante", getValue("WKUser"));
		}
		
	
	}else if(atividade == APROVACAO_COORD_PLAN){
		if(form.getFormMode() != 'VIEW'){
		form.setValue("dataAprovCoordPlan", buscaDataAtual());
		form.setValue("nomeCoordPlanAprov", buscarNomeUsuario());
		}
	}else if(atividade == APROVACAO_GERENTE){
		if(form.getFormMode() != 'VIEW'){
		form.setValue("dataAprovGerente", buscaDataAtual());
		form.setValue("nomeGerenteAprov", buscarNomeUsuario());
		}
	}else if(atividade == APROVACAO_COORD_PLAN_REV){
		AtualizaCamposIntegracao(form);
		if(form.getFormMode() != 'VIEW'){
		form.setValue("dataAprovCoordPlanRev", buscaDataAtual());
		form.setValue("nomeCoordPlanAprovRev", buscarNomeUsuario());
		
		}
	}else if(atividade == APROVACAO_GERENTE_REV){
		AtualizaCamposIntegracao(form);
		if(form.getFormMode() != 'VIEW'){
		form.setValue("dataAprovGerenteRev", buscaDataAtual());
		form.setValue("nomeGerenteAprovRev", buscarNomeUsuario());
		
		}
	}else if(atividade == ACOMPANHAR_SOLICITACAO_REVISAO || atividade == SUPORTE_TI_RM){
		AtualizaCamposIntegracao(form);
	}
	
	
}

function recuperarAtividadeJS(form, customHTML) {

	customHTML.append("<script>function buscarUsuarioLogado(){return " + "'"
			+ getValue('WKUser') + "'" + ";}</script>");
	customHTML.append("<script>function buscaEmpresa(){return "
			+ getValue('WKCompany') + ";}</script>");
	customHTML.append("<script>function buscarAtividadeAtual(){return "
			+ getValue("WKNumState") + ";}</script>");
	customHTML.append("<script>function buscarModoForm(){return '"
			+ form.getFormMode() + "';}</script>");
	customHTML.append("<script> var FORM_MOBILE = '" + form.getMobile() + "';</script>");
}

function AtualizaCamposIntegracao(form){
	
	var numero_da_solicitacao = getValue("WKNumProces");
	log.info("## WSUP01 - displayFields - AtualizaCamposIntegracao - numero_da_solicitacao :"+numero_da_solicitacao+ "INICIO ");
	
	var connect = DatasetFactory.getDataset("ds_mip_connector", null, null, null);
	var userAdmin = connect.getValue(0, "USUARIOECM");
	//log.info("## WSUP01 - displayFields - AtualizaCamposIntegracao - userAdmin :"+userAdmin);
	var c1 = DatasetFactory.createConstraint('metadata#active','true','true', ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('userSecurityId',userAdmin,userAdmin, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('NUMERO_SOLICITACAO_PAI',numero_da_solicitacao,numero_da_solicitacao, ConstraintType.MUST);
	var constraintsForm = new Array(c1,c2,c3);
	var datasetForm = DatasetFactory.getDataset('ds_VIEW_FormsWSUP02_solicitacaoVincularItensCompras', null, constraintsForm, null);

	
	//log.info("## WSUP01 - displayFields - numero_da_solicitacao :"+numero_da_solicitacao+ "datasetForm.rowsCount: " + datasetForm.rowsCount);
	for(var i = 0; i < datasetForm.rowsCount; i++){
		var indicePaiFilhoItem = datasetForm.getValue(i, 'indicePaiFilhoItem');
		var codColigada = form.getValue('TMOV_CODCOLIGADA');
		var idMovRM = datasetForm.getValue(i, 'numIdGeradoRM');
		var numSeqItmMovGeradoRM = datasetForm.getValue(i, 'numSeqItmMovGeradoRM');
		
		//log.info("## WSUP01 - displayFields numero_da_solicitacao :"+numero_da_solicitacao+ "- AtualizaCamposIntegracao - WSUP02 - indicePaiFilhoItem: " + indicePaiFilhoItem);
		//log.info("## WSUP01 - displayFields numero_da_solicitacao :"+numero_da_solicitacao+ "- AtualizaCamposIntegracao - WSUP02 - idMovRM: " + idMovRM);
		//log.info("## WSUP01 - displayFields numero_da_solicitacao :"+numero_da_solicitacao+ "- AtualizaCamposIntegracao - WSUP02 - numSeqItmMovGeradoRM: " + numSeqItmMovGeradoRM);

		
		if(indicePaiFilhoItem != '' && idMovRM != ''){
			var indexes = form.getChildrenIndexes("tableItens");
			for ( var y in indexes) {
				var index = indexes[y];
				var indicePaiFilhoItemWSUP01 = form.getValue("indicePaiFilhoItem___"+index);
				//log.info("## WSUP01 - displayFields numero_da_solicitacao :"+numero_da_solicitacao+ "- AtualizaCamposIntegracao -  - indicePaiFilhoItem == indicePaiFilhoItemWSUP01: " + indicePaiFilhoItem == indicePaiFilhoItemWSUP01);
				
				 if(indicePaiFilhoItem == indicePaiFilhoItemWSUP01){
		
					 //if(existerevisaoParaItem(form, indicePaiFilhoItem)){

						//log.info("## WSUP01 - displayFields - AtualizaCamposIntegracao - ITEM SEM REVISAO GRAVA VALOR DO PROCESSO WSUP02  ");
							//log.info("## WSUP01 - displayFields - AtualizaCamposIntegracao - else - idMovRM: " + idMovRM);
							//log.info("## WSUP01 - displayFields - AtualizaCamposIntegracao - else - numSeqItmMovGeradoRM: " + numSeqItmMovGeradoRM);
							
							 form.setValue("idMovRM___"+index, idMovRM);
							 if(idMovRM != ''){
								 form.setValue("statusMovRM___"+index, 'emAndamentoRm');
							 }
							 form.setValue("numSeqItmMovGeradoRM___"+index, numSeqItmMovGeradoRM);
							 form.setValue("qtdRmVinculado___"+index, datasetForm.getValue(i, 'qtdItemRM'));
							 
							 var numeroMov = buscarNumeroMov(codColigada, idMovRM, numSeqItmMovGeradoRM, index, form);
							 if(numeroMov != undefined){
								 form.setValue("numMovRM___"+index, numeroMov);
							 }else{
								 form.setValue("numMovRM___"+index, '-');
							 }
							
							 form.setValue("statusSolicFilha___"+index, 'integrada');
							 form.setValue("statusSolFilha___"+index, 'integrada');
							 form.setValue("idprdRmVinculado___"+index, datasetForm.getValue(i, 'idprd'));
							 form.setValue("codProdutoRmVinculado___"+index, datasetForm.getValue(i, 'codProduto'));
							 form.setValue("unRmVinculado___"+index, datasetForm.getValue(i, 'unidRM'));

							 //form.setValue("unidOrigem___"+index, datasetForm.getValue(i, 'unidRM'));
							 //form.setValue("descUnidOrigem___"+index, datasetForm.getValue(i, 'unidRM'));
							// form.setValue("qtdItem___"+index, datasetForm.getValue(i, 'qtdItemRM'));
							// form.setValue("descComplItem___"+index, datasetForm.getValue(i, 'descComplItem'));
							 
						
					// }
	 
					 }
 
				 }	 
			}
		}
	}


function buscarNumeroMov(codColigada, idMovRM, numSeqItmMovGeradoRM, index, form){
	//log.info("## WSUP01 - displayFields - buscarNumeroMov - formformformform: " + form);
	var c1 = DatasetFactory.createConstraint('CODCOLIGADA',codColigada,codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('IDMOV',idMovRM,idMovRM, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('NUMSEQITM',numSeqItmMovGeradoRM,numSeqItmMovGeradoRM, ConstraintType.MUST);
	//log.info("## WSUP01 - displayFields - buscarNumeroMov - CODCOLIGADA: " + codColigada);
	//log.info("## WSUP01 - displayFields - buscarNumeroMov - IDMOV: " + idMovRM);
	//log.info("## WSUP01 - displayFields - buscarNumeroMov - NUMSEQITM: " + numSeqItmMovGeradoRM);
	
	
	var constraints = new Array(c1, c2, c3);
	var dataset = DatasetFactory.getDataset('ds_ConsultaRM_WS112_RetornaHistoricoItemMovimento', null, constraints, null);
	//log.info("## WSUP01 - displayFields - buscarNumeroMov - NUMEROMOV: " + dataset.rowsCount);
	for(var i = 0; i < dataset.rowsCount; i++){
		var CODTMV = dataset.getValue(i, 'CODTMV');
		var NUMEROMOV = dataset.getValue(i, 'NUMEROMOV');
		//log.info("## WSUP01 - displayFields - buscarNumeroMov - CODTMV: " + CODTMV);
		//log.info("## WSUP01 - displayFields - buscarNumeroMov - NUMEROMOV: " + NUMEROMOV);
		if((CODTMV == '1.1.25') || (CODTMV == '1.1.19')){
				 form.setValue("statusMovRM___"+index, 'ItemComprado');
			}
		
			if(CODTMV == '1.1.05'){
				if(NUMEROMOV == undefined){
					return '-';
				}else{
					//log.info("## WSUP01 - displayFields - buscarNumeroMov - CODTMV: " + CODTMV);
					//log.info("## WSUP01 - displayFields - buscarNumeroMov - NUMEROMOV: " + NUMEROMOV);
					return NUMEROMOV;
				}
				
			}
			
			
		}	
}

/*
function existerevisaoParaItem(form, indicePaiFilhoItem){
	log.info("## WSUP01 - displayFields - existerevisaoParaItem - INICIO FUNC: ");
	var indexesRev = form.getChildrenIndexes("tableRevItens");
	var contador = 0;
	for ( var z in indexesRev) {
		var indexRev = indexesRev[z];
		var indicePaiFilhoItemRev = form.getValue('indicePaiFilhoItemRev___'+indexRev);
		
		log.info("## WSUP01 - displayFields - AtualizaCamposIntegracao - indicePaiFilhoItemRev: "+indicePaiFilhoItemRev);
		if(indicePaiFilhoItem == indicePaiFilhoItemRev){
			contador++;
			log.info("## WSUP01 - displayFields - AtualizaCamposIntegracao - IF indicePaiFilhoItem == indicePaiFilhoItemRev ");
			
			var codColigada = form.getValue('TMOV_CODCOLIGADA'); 
			var idMovRM_rev = form.getValue('numMovIntegracaoRev___'+indexRev);
			var numSeqItmMovGeradoRM_rev = form.getValue('numSequItmMovAnterior___'+indexRev);

			
			log.info("## WSUP01 - displayFields - AtualizaCamposIntegracao - ENCONTROU REVISAO PARA O ITEM  ");
			log.info("## WSUP01 - displayFields - AtualizaCamposIntegracao - idMovRM_rev: " + idMovRM_rev);
			log.info("## WSUP01 - displayFields - AtualizaCamposIntegracao - numSeqItmMovGeradoRM_rev: " + numSeqItmMovGeradoRM_rev);
			
			 var numeroMov = buscarNumeroMov(codColigada, idMovRM_rev, numSeqItmMovGeradoRM_rev, indicePaiFilhoItem, form);
			 if(numeroMov != undefined){
				 form.setValue("numMovRM___"+indicePaiFilhoItem, numeroMov);
			 }
	
	
}
	}
	
	
	if (contador > 0){
		log.info("## WSUP01 - displayFields - existerevisaoParaItem - TRUE  indicePaiFilhoItem: "+indicePaiFilhoItem);
		return false;
	}else{
		
		log.info("## WSUP01 - displayFields - existerevisaoParaItem -FALSE  indicePaiFilhoItem: "+indicePaiFilhoItem);
		return true;
	}
}
*/