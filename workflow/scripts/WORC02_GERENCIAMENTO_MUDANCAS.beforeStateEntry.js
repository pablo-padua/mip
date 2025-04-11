function beforeStateEntry(sequenceId){
	log.info('beforeStateEntry WORC02 início '+sequenceId);
	
		var atividade = getValue('WKCurrentState');
		var connect = DatasetFactory.getDataset('ds_mip_connector', null, null, null);
		var SERVER_URL = connect.getValue(0, 'SERVER_URL');
		var WKCompany = getValue("WKCompany");	
		var origemMudanca = hAPI.getCardValue("origemMudanca");
		
		
		
		
		
		if(sequenceId == QUALIFICACAO_IMPACTO_MUDANCA_PRAZO_CUSTO){
			hAPI.setCardValue("status", 'emElaboracao');
		}else if(sequenceId == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO){
			hAPI.setCardValue("status", 'intEmAprovacaoMip');
		}else if(sequenceId == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE){
			hAPI.setCardValue("status", 'extEmAprovApresentCliente');
		}else if(sequenceId == INCORPORACAO_ORCAMENTO_VERSAO_ATIVA){
			log.info('beforeStateEntry WORC02 sequenceId == INCORPORACAO_ORCAMENTO_VERSAO_ATIVA '+sequenceId == INCORPORACAO_ORCAMENTO_VERSAO_ATIVA);
			if(origemMudanca == 'interna'){
				hAPI.setCardValue("status", 'intAprovadaMip');
			}else if(origemMudanca == 'externa'){
				//hAPI.setCardValue("status", 'emAndamento');
			}
			
		}else if(1 == 0){
			//hAPI.setCardValue("status", 'emAndamento');
		}else if(sequenceId == FIM){
			
			if(origemMudanca == 'interna'){
				hAPI.setCardValue("status", 'intFinalizadaMip');
			}else if(origemMudanca == 'externa'){
				//hAPI.setCardValue("status", 'emAndamento');
			}
		}
		
		
		
/*
	if (sequenceId == ANALISE_VIABILIDADE_GORC_GCOM_DIR) {
		
		var statusAlterado = hAPI.getCardValue("alteracaoStatus");
		log.info("----- beforeStateEntry enviarEmailRespProjeto - statusAlterado: "+statusAlterado);
	if(statusAlterado == 'sim'){
		log.info("----- beforeStateEntry enviarEmailRespProjeto - DENTRO IF ");
		enviarEmailRespProjeto(SERVER_URL, WKCompany);
		hAPI.setCardValue("alteracaoStatus", '');
	}
		
	var indexes = getIndexes("hidden_EmailRespVisita");
	var iterator = indexes.iterator();
	while(iterator.hasNext()){
		var index = iterator.next();
		var emailEviado = hAPI.getCardValue("emailEviado___" + index);
		var hidden_EmailRespVisita = hAPI.getCardValue("hidden_EmailRespVisita___" + index);
		var hidden_nomeRespVisita = hAPI.getCardValue("hidden_nomeRespVisita___" + index);
		var dataHrVisita = hAPI.getCardValue("dataHrVisita___" + index);
		var dataHrConfVisitaTec = hAPI.getCardValue("dataHrConfVisitaTec___" + index);
		var obsVisita = hAPI.getCardValue("obsVisita___" + index);
		var local = hAPI.getCardValue("localVisita___" + index);
		
		if( hidden_EmailRespVisita != '' && dataHrVisita != ''){
			
				enviarEmailVisita(SERVER_URL, WKCompany, hidden_EmailRespVisita, dataHrVisita, hidden_nomeRespVisita, dataHrConfVisitaTec, obsVisita, local);
				hAPI.setCardValue("emailEviado___" + index, 'sim');
		
		}
	}
	
	
	
	}else if(sequenceId == ''){
		
	}
	
	*/
}

function enviarEmailRespProjeto(SERVER_URL, WKCompany){
	try{

		var template = "WORC01_LAYOUT_EMAIL_NOTIFICACAO_RESPONSAVEL_PROJET";

		var nMip = hAPI.getCardValue("nMip");
		var nomeCliente = hAPI.getCardValue("nomeCliente");
		var numero_da_solicitacao = hAPI.getCardValue("nroSolicitacao");
		var hidden_EmailRespProjeto = hAPI.getCardValue("hidden_EmailRespProjeto");
		var status = hAPI.getCardValue("status");
		var descStatus = '';
		
		if(status == 'orcamento'){
			descStatus = "Orçamento";
		}else if(status == 'agradecer'){
			descStatus = "Agradecer";
		}else if(status == 'agradecida'){
			descStatus = "Agradecida";
		}else if(status == 'entregue'){
			descStatus = "Entregue";
		}else if(status == 'revisao'){
			descStatus = "Revisão";
		}else if(status == 'convertidoEmContrato'){
			descStatus = "Convertido Em Contrato";
		}else if(status == 'cancelado'){
			descStatus = "Cancelado";
		}else if(status == 'hold'){
			descStatus = "Hold";
		}else if(status == 'encerrado'){
			descStatus = "Encerrado";
		}
		
		
		
		var parameters = "";
		var recipients = "";

			  
					parameters = new java.util.HashMap();
					parameters.put("subject", 'Alteração Status NMIP: '+ nMip +' - '+nomeCliente);
					parameters.put("SERVER_URL", SERVER_URL);
					parameters.put( "LINK", SERVER_URL + "/portal/p/" + WKCompany + "/globalalertview" );
					parameters.put( "WDK_TaskLink", SERVER_URL + "/portal/p/" + WKCompany + "/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numero_da_solicitacao );
					parameters.put( "TENANT_ID", getValue("WKCompany") );
					parameters.put( "NUMERO_SOLICITACAO", numero_da_solicitacao);
					parameters.put( "NMIP", nMip);
					parameters.put( "STATUS", descStatus);
					
					recipients = new java.util.ArrayList();
					recipients.add(hidden_EmailRespProjeto);
					recipients.add('thiago.pena@mip.com.br');

					log.info("----- beforeStateEntry enviarEmailRespProjeto - recipients: "+recipients);
						notifier.notify("adm", template, parameters, recipients,"text/html");
						log.info("#### SUCESSO WORC01_LAYOUT_EMAIL_NOTIFICACAO_RESPONSAVEL_PROJETO enviarEmailRespProjeto solicitação: "+numero_da_solicitacao);
		} catch(e){
		    log.info("#### ERROR WORC01_LAYOUT_EMAIL_NOTIFICACAO_RESPONSAVEL_PROJETO enviarEmailRespProjeto"+numero_da_solicitacao+"ERROR : "+e);
		}
}

function enviarEmailVisita(SERVER_URL, WKCompany, hidden_EmailRespVisita, dataHrVisita, hidden_nomeRespVisita, dataHrConfVisitaTec, obsVisita, local){
	try{

		var template = "WORC01_LAYOUT_EMAIL_NOTIFICACAO_VISITAS";

		var nMip = hAPI.getCardValue("nMip");
		var nomeCliente = hAPI.getCardValue("nomeCliente");
		var numero_da_solicitacao = hAPI.getCardValue("nroSolicitacao");
		
		
		var parameters = "";
		var recipients = "";

			  
					parameters = new java.util.HashMap();
					parameters.put("subject", 'Alteração Responsável Projeto '+nMip+' - '+nomeCliente);
					parameters.put("SERVER_URL", SERVER_URL);
					parameters.put( "LINK", SERVER_URL + "/portal/p/" + WKCompany + "/globalalertview" );
					parameters.put( "WDK_TaskLink", SERVER_URL + "/portal/p/" + WKCompany + "/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numero_da_solicitacao );
					parameters.put( "TENANT_ID", getValue("WKCompany") );
					parameters.put( "NUMERO_SOLICITACAO", numero_da_solicitacao);
					
					parameters.put( "NOME_CLIENTE", nomeCliente);
					parameters.put( "NOME_RESP", hidden_nomeRespVisita);
					parameters.put( "LOCAL", local);
					parameters.put( "DATA_VISITA", dataHrVisita);
					parameters.put( "DATA_CONFIRMACAO", dataHrConfVisitaTec);
					parameters.put( "OBSERVACOES", obsVisita);
					
					recipients = new java.util.ArrayList();
					recipients.add(hidden_EmailRespVisita);
					recipients.add('thaigo2882@hotmail.com');

					log.info("----- beforeStateEntry enviarEmailVisita - recipients: "+recipients);
						notifier.notify("adm", template, parameters, recipients,"text/html");
						log.info("#### SUCESSO WORC01_LAYOUT_EMAIL_NOTIFICACAO_RESPONSAVEL_PROJETO enviarEmailVisita solicitação: "+numero_da_solicitacao);
		} catch(e){
		    log.info("#### ERROR WORC01_LAYOUT_EMAIL_NOTIFICACAO_RESPONSAVEL_PROJETO enviarEmailVisita"+numero_da_solicitacao+"ERROR : "+e);
		}
}






