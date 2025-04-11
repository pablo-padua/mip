function beforeStateEntry(sequenceId){	
	
	var atividade = getValue('WKCurrentState');
	var numero_da_solicitacao = getValue("WKNumProces");
	log.info("----- beforeStateEntry solicitacao: "+numero_da_solicitacao+" envioEmailGrupo ---INICIO ---");
	
	var connect = DatasetFactory.getDataset('ds_mip_connector', null, null, null);
	var SERVER_URL = connect.getValue(0, 'SERVER_URL');
	var WKCompany = getValue("WKCompany");
	
	var nomeSolicitante = hAPI.getCardValue("nomeSolicitante");
	var dataSolicitacao = hAPI.getCardValue("dataSolicitacao");	
	var nmColigadaSolicitante = hAPI.getCardValue("nmColigadaSolicitante");
	var nmFilialSolicitante = hAPI.getCardValue("nmFilialSolicitante");
	var txt_projeto = hAPI.getCardValue("txt_projeto");
	var txt_gestor = hAPI.getCardValue("txt_gestor");
	var fornecedor = hAPI.getCardValue("fornecedor");
	var cidadeFornecedor = hAPI.getCardValue("cidadeFornecedor");
	var emailFornecedor = hAPI.getCardValue("emailFornecedor");
	var dtVoucher = hAPI.getCardValue("dtVoucher");
	var observacoesGerais = hAPI.getCardValue("observacoesGerais");
	var emailSolicitante = hAPI.getCardValue("emailSolicitante");
	var contatoSolicitante = hAPI.getCardValue("contatoSolicitante");
	var vlrTotalSolicitacao = hAPI.getCardValue("valorTotalSolicitacao");
	var matrSolicitante = hAPI.getCardValue("matrSolicitante");		
	var valorTotalDesconto = hAPI.getCardValue("valorTotalDesconto");
	var valorTotalAcrescimo = hAPI.getCardValue("valorTotalAcrescimo");	
	var htmlTabelaFuncionarios = montarTabelaRefeicoes();
	
	if (sequenceId == APROVACAO_FORNECEDOR) {
		
		var subject = "EM APROVAÇÃO Solicitação Alimentação: "+numero_da_solicitacao+" - Obra "+txt_projeto+" - " +fornecedor;
		envioEmailGrupo(numero_da_solicitacao, SERVER_URL, WKCompany, nomeSolicitante, dataSolicitacao, nmColigadaSolicitante, 
				nmFilialSolicitante, txt_projeto, txt_gestor, fornecedor, cidadeFornecedor, emailFornecedor, dtVoucher, observacoesGerais,
				emailSolicitante, contatoSolicitante, vlrTotalSolicitacao, htmlTabelaFuncionarios, matrSolicitante, subject, valorTotalDesconto, valorTotalAcrescimo);
		
		envioEmailAprovFornecedor(numero_da_solicitacao, SERVER_URL, WKCompany, nomeSolicitante, dataSolicitacao, nmColigadaSolicitante, 
				nmFilialSolicitante, txt_projeto, txt_gestor, fornecedor, cidadeFornecedor, emailFornecedor, dtVoucher, observacoesGerais,
				emailSolicitante, contatoSolicitante, vlrTotalSolicitacao, htmlTabelaFuncionarios, matrSolicitante, valorTotalDesconto, valorTotalAcrescimo);

	}else if(sequenceId == FIM_REPROVADO){

		var subject = "REPROVADA Solicitação Alimentação: "+numero_da_solicitacao+" - Obra "+txt_projeto+" - " +fornecedor;
		envioEmailGrupo(numero_da_solicitacao, SERVER_URL, WKCompany, nomeSolicitante, dataSolicitacao, nmColigadaSolicitante, 
				nmFilialSolicitante, txt_projeto, txt_gestor, fornecedor, cidadeFornecedor, emailFornecedor, dtVoucher, observacoesGerais,
				emailSolicitante, contatoSolicitante, vlrTotalSolicitacao, htmlTabelaFuncionarios, matrSolicitante, subject, valorTotalDesconto, valorTotalAcrescimo);
		
		hAPI.setCardValue("hidden_aprovacao", 'nao');
		
	}else if(sequenceId == FIM_APROVADO){

		var subject = "APROVADA Solicitação Alimentação: "+numero_da_solicitacao+" - Obra "+txt_projeto+" - " +fornecedor;
		envioEmailGrupo(numero_da_solicitacao, SERVER_URL, WKCompany, nomeSolicitante, dataSolicitacao, nmColigadaSolicitante, 
				nmFilialSolicitante, txt_projeto, txt_gestor, fornecedor, cidadeFornecedor, emailFornecedor, dtVoucher, observacoesGerais,
				emailSolicitante, contatoSolicitante, vlrTotalSolicitacao, htmlTabelaFuncionarios, matrSolicitante, subject, valorTotalDesconto, valorTotalAcrescimo);
		
		hAPI.setCardValue("hidden_aprovacao", 'sim');
		
	}	
	
}


function envioEmailGrupo(numero_da_solicitacao, SERVER_URL, WKCompany, nomeSolicitante, dataSolicitacao, nmColigadaSolicitante, 
		nmFilialSolicitante, txt_projeto, txt_gestor, fornecedor, cidadeFornecedor, emailFornecedor, dtVoucher, observacoesGerais,
		emailSolicitante, contatoSolicitante, vlrTotalSolicitacao, htmlTabelaFuncionarios, matrSolicitante, subject, valorTotalDesconto, valorTotalAcrescimo) {

	try{

	var template = "WADMO01_LAYOUT_EMAIL_NOTIFICACAO_GESTORES";

	var parameters = "";
	var recipients = "";

		  
				parameters = new java.util.HashMap();
				parameters.put("subject", subject);
				parameters.put("SERVER_URL", SERVER_URL);
				parameters.put( "LINK", SERVER_URL + "/portal/p/" + WKCompany + "/globalalertview" );
				parameters.put( "WDK_TaskLink", SERVER_URL + "/portal/p/" + WKCompany + "/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numero_da_solicitacao );
				parameters.put( "TENANT_ID", getValue("WKCompany") );
				parameters.put( "NUMERO_SOLICITACAO", ""+numero_da_solicitacao);
				parameters.put( "SOLICITANTE", nomeSolicitante );
				parameters.put( "EMPRESA", nmColigadaSolicitante );
				parameters.put( "FILIAL", nmFilialSolicitante );
				parameters.put( "DATA_VOUCHER", dtVoucher );
				parameters.put( "OBRA", txt_projeto );
				parameters.put( "FORNECEDOR", fornecedor );
				parameters.put( "CIDADE_FORNECEDOR", cidadeFornecedor );
				parameters.put( "EMAIL_FORNECEDOR", emailFornecedor );
				parameters.put( "OBSERVACOES", observacoesGerais );
				parameters.put( "EMAIL_SOLICITANTE", emailSolicitante );
				parameters.put( "CONTATO_SOLICITANTE", contatoSolicitante );
				parameters.put( "VALOR_TOTAL", vlrTotalSolicitacao );
				parameters.put( "VLR_DESCONTO", valorTotalDesconto );
				parameters.put( "VLR_ACRESCIMO", valorTotalAcrescimo );
	
				parameters.put( "TABELADINAMICA", htmlTabelaFuncionarios );
				recipients = new java.util.ArrayList();
				
				var montarConstObra = "ADM"+hAPI.getCardValue("txt_obra");
				
				var c1 = DatasetFactory.createConstraint('colleagueGroupPK.groupId', montarConstObra, montarConstObra, ConstraintType.MUST);
            	var constraints = new Array(c1);
            	var dataset = DatasetFactory.getDataset('colleagueGroup', null, constraints, null);
            	if (dataset.rowsCount > 0) {
            	for(var i=0; i < dataset.rowsCount; i++){
            		recipients.add( dataset.getValue(i, "colleagueGroupPK.colleagueId"));

            		}
            	}
           
            	parameters.put( "LISTADINAMICA_CAFE", montarListaCafe(dtVoucher));
				parameters.put( "LISTADINAMICA_ALMOCO", montarListaAlmoco(dtVoucher));
				parameters.put( "LISTADINAMICA_ALMOCOPEQUENO", montarListaAlmocoPequeno(dtVoucher));
				parameters.put( "LISTADINAMICA_JANTAR", montarListaJantar(dtVoucher));
				parameters.put( "LISTADINAMICA_JANTARPEQUENO", montarListaJantarPequeno(dtVoucher));
            	
				recipients.add(emailSolicitante);

				log.info("----- beforeStateEntry envioEmailGrupo - recipients: "+recipients);
					notifier.notify("adm", template, parameters, recipients,"text/html");
					log.info("#### SUCESSO WADMO01_SolicitacaoAlimentacaoObras' envioEmailGrupo solicitação: "+numero_da_solicitacao);
	} catch(e){
	    log.info("#### ERROR WADMO01_SolicitacaoAlimentacaoObras envioEmailGrupo"+numero_da_solicitacao+"ERROR : "+e);
	}
}


function envioEmailAprovFornecedor(numero_da_solicitacao, SERVER_URL, WKCompany, nomeSolicitante, dataSolicitacao, nmColigadaSolicitante, 
		nmFilialSolicitante, txt_projeto, txt_gestor, fornecedor, cidadeFornecedor, emailFornecedor, dtVoucher, observacoesGerais,
		emailSolicitante, contatoSolicitante, vlrTotalSolicitacao, htmlTabelaFuncionarios, matrSolicitante, valorTotalDesconto, valorTotalAcrescimo) {
	log.info("----- beforeStateEntry solicitacao: "+numero_da_solicitacao+" envioEmailAprovFornecedor ------");
	log.info("----- beforeStateEntry - envioEmailAprovFornecedor - matrSolicitante: "+matrSolicitante);
	try{

		
	var template = "WADMO01_LAYOUT_EMAIL_NOTIFICACAO_APROV_FORNECEDORE";

	var subject = "Solicitação de Alimentação "+numero_da_solicitacao+" Obra "+txt_projeto+"- Aguardando aprovação do fornecedor" +fornecedor;

		var parameters = "";
		var recipients = "";

		  
				parameters = new java.util.HashMap();
				parameters.put("subject", subject);
				parameters.put("SERVER_URL", SERVER_URL);
				parameters.put( "LINK", SERVER_URL + "/portal/p/" + WKCompany + "/globalalertview" );
				parameters.put( "WDK_TaskLink", SERVER_URL + "/portal/p/" + WKCompany + "/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numero_da_solicitacao );
				parameters.put( "TENANT_ID", getValue("WKCompany") );
				parameters.put( "NUMERO_SOLICITACAO", ""+numero_da_solicitacao);
				parameters.put( "SOLICITANTE", nomeSolicitante );
				parameters.put( "EMPRESA", nmColigadaSolicitante );
				parameters.put( "FILIAL", nmFilialSolicitante );
				parameters.put( "DATA_VOUCHER", dtVoucher );
				parameters.put( "OBRA", txt_projeto );
				parameters.put( "FORNECEDOR", fornecedor );
				parameters.put( "CIDADE_FORNECEDOR", cidadeFornecedor );
				parameters.put( "EMAIL_FORNECEDOR", emailFornecedor );
				parameters.put( "OBSERVACOES", observacoesGerais );
				parameters.put( "EMAIL_SOLICITANTE", emailSolicitante );
				parameters.put( "CONTATO_SOLICITANTE", contatoSolicitante );
				parameters.put( "VALOR_TOTAL", vlrTotalSolicitacao );
		
				parameters.put( "VLR_DESCONTO", valorTotalDesconto );
				parameters.put( "VLR_ACRESCIMO", valorTotalAcrescimo );
				
				parameters.put( "URL_APROVADO", "https://sistemas.mip.com.br/pesquisa/FluxoFluig.aspx?NUM_SOLICITACAO="+numero_da_solicitacao+"&ATIV_DESTINO=9" );
				parameters.put( "URL_REPROVADO", "https://sistemas.mip.com.br/pesquisa/FluxoFluig.aspx?NUM_SOLICITACAO="+numero_da_solicitacao+"&ATIV_DESTINO=15" );
	
				parameters.put( "TABELADINAMICA", htmlTabelaFuncionarios );
				
				parameters.put( "LISTADINAMICA_CAFE", montarListaCafe(dtVoucher));
				parameters.put( "LISTADINAMICA_ALMOCO", montarListaAlmoco(dtVoucher));
				parameters.put( "LISTADINAMICA_ALMOCOPEQUENO", montarListaAlmocoPequeno(dtVoucher));
				parameters.put( "LISTADINAMICA_JANTAR", montarListaJantar(dtVoucher));
				parameters.put( "LISTADINAMICA_JANTARPEQUENO", montarListaJantarPequeno(dtVoucher));
				
				recipients = new java.util.ArrayList();
				recipients.add(emailFornecedor);
	

				log.info("#### SUCESSO WADMO01_SolicitacaoAlimentacaoObras' - "+numero_da_solicitacao+"- recipients : "+recipients);
				
					notifier.notify("adm", template, parameters, recipients,"text/html");
					log.info("#### SUCESSO WADMO01_SolicitacaoAlimentacaoObras' envioEmailAprovFornecedor solicitação: "+numero_da_solicitacao+"");
	} catch(e){
	    log.info("#### ERROR WADMO01_SolicitacaoAlimentacaoObras envioEmailAprovFornecedor solicitação: "+numero_da_solicitacao+": ERROR"+e);
	}
}


function montarTabelaRefeicoes(){
	var html ='';
	var contadorIndice =1;
	html +='<table width="100%" border="1px" cellpadding="5px" cellspacing="0" ID="alter3" align="center" class="DadosColaborador">';
	html +='<tr><th class="cabecalho" width="5%">#</th>';
	html +='<th class="cabecalho" width="40%">Colaborador</th>';
	html +='<th class="cabecalho" width="10%">Café Manhã</th>';
	html +='<th class="cabecalho" width="10%">Almoço</th>';
	html +='<th class="cabecalho" width="10%">Almoço Pequeno</th>';
	html +='<th class="cabecalho" width="10%">Jantar</th>';
	html +='<th class="cabecalho" width="10%">Jantar Pequeno</th>';
	//html +='<th class="cabecalho" width="10%">Água</th>';
	html +='<th class="cabecalho" width="10%">Valor</th>';
	html +='<th class="cabecalho" width="10%">Local Entrega</th>';

	
	
	var indexes1 = getIndexes("funcionario");
	var iterator1 = indexes1.iterator();
	while(iterator1.hasNext()){
		 index1 = iterator1.next();
		 log.info("----- beforeStateEntry indexindex: "+index1);
		    var funcionario1 = hAPI.getCardValue("funcionario___" + index1);
			var hidden_checkboxCafe1 = hAPI.getCardValue("hidden_checkboxCafe___" + index1);
			var hidden_checkboxAlmoco1 = hAPI.getCardValue("hidden_checkboxAlmoco___" + index1);
			var hidden_checkboxAlmocoPequeno1 = hAPI.getCardValue("hidden_checkboxAlmocoPequeno___" + index1);
			var hidden_checkboxJantar1 = hAPI.getCardValue("hidden_checkboxJantar___" + index1);
			var hidden_checkboxJantarPequeno1 = hAPI.getCardValue("hidden_checkboxJantarPequeno___" + index1);
			var hidden_checkboxAgua1 = hAPI.getCardValue("hidden_checkboxAgua___" + index1);
			var vlrVoucher1 = hAPI.getCardValue("vlrVoucher___" + index1);
			var localEntrega1 = hAPI.getCardValue("localEntrega___" + index1);
			
			html +='<tr>';
			html +='<th class="dados">'+contadorIndice+'</th>';
			html +='<th class="dados">'+funcionario1+'</th>';
			html +='<th class="dados">'+hidden_checkboxCafe1+'</th>';
			html +='<th class="dados">'+hidden_checkboxAlmoco1+'</th>';
			html +='<th class="dados">'+hidden_checkboxAlmocoPequeno1+'</th>';
			html +='<th class="dados">'+hidden_checkboxJantar1+'</th>';
			html +='<th class="dados">'+hidden_checkboxJantarPequeno1+'</th>';
			//html +='<th class="dados">'+hidden_checkboxAgua1+'</th>';
			html +='<th class="dados">'+vlrVoucher1+'</th>';
			html +='<th class="dados">'+localEntrega1+'</th>';
			html +='</tr>';
			contadorIndice ++;
	}

	
	var indexes2 = getIndexes("nomeEmpresaTerceiro");
	var iterator2 = indexes2.iterator();
	while(iterator2.hasNext()){
		 index2 = iterator2.next();
		 log.info("----- beforeStateEntry indexindex: "+index2);
		    var funcionario2 = hAPI.getCardValue("nomeEmpresaTerceiro___" + index2);
			var hidden_checkboxCafe2 = hAPI.getCardValue("hidden_checkboxCafeTerc___" + index2);
			var hidden_checkboxAlmoco2 = hAPI.getCardValue("hidden_checkboxAlmocoTerc___" + index2);
			var hidden_checkboxAlmocoPequeno2 = hAPI.getCardValue("hidden_checkboxAlmocoTercPeq___" + index2);
			var hidden_checkboxJantar2 = hAPI.getCardValue("hidden_checkboxJantarTerc___" + index2);
			var hidden_checkboxJantarPequeno2 = hAPI.getCardValue("hidden_checkboxJantarTercPeq___" + index2);
			var hidden_checkboxAgua2 = hAPI.getCardValue("hidden_checkboxAguaTerc___" + index2);
			var vlrVoucher2 = hAPI.getCardValue("vlrVoucherTerc___" + index2);
			var localEntrega2 = hAPI.getCardValue("localEntregaTerc___" + index2);
			
			html +='<tr>';
			html +='<th class="dados">'+contadorIndice+'</th>';
			html +='<th class="dados">'+funcionario2+'</th>';
			html +='<th class="dados">'+hidden_checkboxCafe2+'</th>';
			html +='<th class="dados">'+hidden_checkboxAlmoco2+'</th>';
			html +='<th class="dados">'+hidden_checkboxAlmocoPequeno2+'</th>';
			html +='<th class="dados">'+hidden_checkboxJantar2+'</th>';
			html +='<th class="dados">'+hidden_checkboxJantarPequeno2+'</th>';
			//html +='<th class="dados">'+hidden_checkboxAgua2+'</th>';
			html +='<th class="dados">'+vlrVoucher2+'</th>';
			html +='<th class="dados">'+localEntrega2+'</th>';
			html +='</tr>';
			contadorIndice++;
	}

	
	html +='</table>';
	    
	return html
}

function montarListaCafe(dtVoucher){
	var html ='';
	html +='<ol>';
	
	var indexes1 = getIndexes("funcionario");
	var iterator1 = indexes1.iterator();
	while(iterator1.hasNext()){
		 index1 = iterator1.next();
		  var funcionario1 = hAPI.getCardValue("funcionario___" + index1);
			var hidden_checkboxCafe1 = hAPI.getCardValue("hidden_checkboxCafe___" + index1);
			//var hidden_checkboxAlmoco1 = hAPI.getCardValue("hidden_checkboxAlmoco___" + index1);			
			//var hidden_checkboxJantar1 = hAPI.getCardValue("hidden_checkboxJantar___" + index1);
			
			if(hidden_checkboxCafe1 == 'sim'){
				html +='<li>'+dtVoucher+' - '+funcionario1+':___________________________ </li>';
			}
	}
	
	var indexes2 = getIndexes("nomeEmpresaTerceiro");
	var iterator2 = indexes2.iterator();
	while(iterator2.hasNext()){
		 index = iterator2.next();
		  var funcionario2 = hAPI.getCardValue("nomeEmpresaTerceiro___" + index);
			var hidden_checkboxCafe2 = hAPI.getCardValue("hidden_checkboxCafeTerc___" + index);
			//var hidden_checkboxAlmoco2 = hAPI.getCardValue("hidden_checkboxAlmocoTerc___" + index);			
			//var hidden_checkboxJantar2 = hAPI.getCardValue("hidden_checkboxJantarTerc___" + index);			

			if(hidden_checkboxCafe2 == 'sim'){
				html +='<li>'+dtVoucher+' - '+funcionario2+':___________________________ </li>';
			}
	}
	
	html +='</ol>';
	html +='</table>';
	    
	return html
}

function montarListaAlmoco(dtVoucher){
	var html ='';
	html +='<ol>';
	
	var indexes1 = getIndexes("funcionario");
	var iterator1 = indexes1.iterator();
	while(iterator1.hasNext()){
		 index1 = iterator1.next();
		  var funcionario1 = hAPI.getCardValue("funcionario___" + index1);
			//var hidden_checkboxCafe1 = hAPI.getCardValue("hidden_checkboxCafe___" + index1);
			var hidden_checkboxAlmoco1 = hAPI.getCardValue("hidden_checkboxAlmoco___" + index1);
			//var hidden_checkboxJantar1 = hAPI.getCardValue("hidden_checkboxJantar___" + index1);

			if(hidden_checkboxAlmoco1 == 'sim'){
				html +='<li>'+dtVoucher+' - '+funcionario1+':___________________________ </li>';
			}
	}
	
	var indexes2 = getIndexes("nomeEmpresaTerceiro");
	var iterator2 = indexes2.iterator();
	while(iterator2.hasNext()){
		 index = iterator2.next();
		  var funcionario2 = hAPI.getCardValue("nomeEmpresaTerceiro___" + index);
			//var hidden_checkboxCafe2 = hAPI.getCardValue("hidden_checkboxCafeTerc___" + index);
			var hidden_checkboxAlmoco2 = hAPI.getCardValue("hidden_checkboxAlmocoTerc___" + index);
			//var hidden_checkboxJantar2 = hAPI.getCardValue("hidden_checkboxJantarTerc___" + index);

			if(hidden_checkboxAlmoco2 == 'sim'){
				html +='<li>'+dtVoucher+' - '+funcionario2+':___________________________ </li>';
			}
	}
	
	html +='</ol>';
	html +='</table>';
	    
	return html
}

function montarListaAlmocoPequeno(dtVoucher){
	var html ='';
	html +='<ol>';
	
	var indexes1 = getIndexes("funcionario");
	var iterator1 = indexes1.iterator();
	while(iterator1.hasNext()){
		 index1 = iterator1.next();
		  var funcionario1 = hAPI.getCardValue("funcionario___" + index1);
			//var hidden_checkboxCafe1 = hAPI.getCardValue("hidden_checkboxCafe___" + index1);
			var hidden_checkboxAlmocoPequeno1 = hAPI.getCardValue("hidden_checkboxAlmocoPequeno___" + index1);
			//var hidden_checkboxJantar1 = hAPI.getCardValue("hidden_checkboxJantar___" + index1);

			if(hidden_checkboxAlmocoPequeno1 == 'sim'){
				html +='<li>'+dtVoucher+' - '+funcionario1+':___________________________ </li>';
			}
	}
	
	var indexes2 = getIndexes("nomeEmpresaTerceiro");
	var iterator2 = indexes2.iterator();
	while(iterator2.hasNext()){
		 index = iterator2.next();
		  var funcionario2 = hAPI.getCardValue("nomeEmpresaTerceiro___" + index);
			//var hidden_checkboxCafe2 = hAPI.getCardValue("hidden_checkboxCafeTerc___" + index);
			var hidden_checkboxAlmocoPequeno2 = hAPI.getCardValue("hidden_checkboxAlmocoTercPeq___" + index);
			//var hidden_checkboxJantar2 = hAPI.getCardValue("hidden_checkboxJantarTerc___" + index);

			if(hidden_checkboxAlmocoPequeno2 == 'sim'){
				html +='<li>'+dtVoucher+' - '+funcionario2+':___________________________ </li>';
			}
	}
	
	html +='</ol>';
	html +='</table>';
	    
	return html
}

function montarListaJantar(dtVoucher){
	var html ='';
	html +='<ol>';
	
	var indexes1 = getIndexes("funcionario");
	var iterator1 = indexes1.iterator();
	while(iterator1.hasNext()){
		 index1 = iterator1.next();
		  var funcionario1 = hAPI.getCardValue("funcionario___" + index1);
			//var hidden_checkboxCafe1 = hAPI.getCardValue("hidden_checkboxCafe___" + index1);
			//var hidden_checkboxAlmoco1 = hAPI.getCardValue("hidden_checkboxAlmoco___" + index1);
			var hidden_checkboxJantar1 = hAPI.getCardValue("hidden_checkboxJantar___" + index1);

			if(hidden_checkboxJantar1 == 'sim'){
				html +='<li>'+dtVoucher+' - '+funcionario1+':___________________________ </li>';
			}
	}
	
	var indexes2 = getIndexes("nomeEmpresaTerceiro");
	var iterator2 = indexes2.iterator();
	while(iterator2.hasNext()){
		 index = iterator2.next();
		  var funcionario2 = hAPI.getCardValue("nomeEmpresaTerceiro___" + index);
			//var hidden_checkboxCafe2 = hAPI.getCardValue("hidden_checkboxCafeTerc___" + index);
			//var hidden_checkboxAlmoco2 = hAPI.getCardValue("hidden_checkboxAlmocoTerc___" + index);
			var hidden_checkboxJantar2 = hAPI.getCardValue("hidden_checkboxJantarTerc___" + index);

			if(hidden_checkboxJantar2 == 'sim'){
				html +='<li>'+dtVoucher+' - '+funcionario2+':___________________________ </li>';
			}
	}
	
	
	html +='</ol>';
	html +='</table>';
	    
	return html
}

function montarListaJantarPequeno(dtVoucher){
	var html ='';
	html +='<ol>';
	
	var indexes1 = getIndexes("funcionario");
	var iterator1 = indexes1.iterator();
	while(iterator1.hasNext()){
		 index1 = iterator1.next();
		  var funcionario1 = hAPI.getCardValue("funcionario___" + index1);
			//var hidden_checkboxCafe1 = hAPI.getCardValue("hidden_checkboxCafe___" + index1);
			//var hidden_checkboxAlmoco1 = hAPI.getCardValue("hidden_checkboxAlmoco___" + index1);
			var hidden_checkboxJantarPequeno1 = hAPI.getCardValue("hidden_checkboxJantarPequeno___" + index1);

			if(hidden_checkboxJantarPequeno1 == 'sim'){
				html +='<li>'+dtVoucher+' - '+funcionario1+':___________________________ </li>';
			}
	}
	
	var indexes2 = getIndexes("nomeEmpresaTerceiro");
	var iterator2 = indexes2.iterator();
	while(iterator2.hasNext()){
		 index = iterator2.next();
		  var funcionario2 = hAPI.getCardValue("nomeEmpresaTerceiro___" + index);
			//var hidden_checkboxCafe2 = hAPI.getCardValue("hidden_checkboxCafeTerc___" + index);
			//var hidden_checkboxAlmoco2 = hAPI.getCardValue("hidden_checkboxAlmocoTerc___" + index);
			var hidden_checkboxJantarPequeno2 = hAPI.getCardValue("hidden_checkboxJantarTercPeq___" + index);

			if(hidden_checkboxJantarPequeno2 == 'sim'){
				html +='<li>'+dtVoucher+' - '+funcionario2+':___________________________ </li>';
			}
	}
	
	
	html +='</ol>';
	html +='</table>';
	    
	return html
}