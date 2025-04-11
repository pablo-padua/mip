function aprovacaoAlcadaDesviosExternos(){
	var ProjEmModoCritico = false;
	 log.info("1###WORC02-aprovacaoAlcadaDesviosExternos ------ INICIO");
	 var atividadeAnterior = hAPI.getCardValue("atividadeAnterior");
	 log.info("2###WORC02-aprovacaoAlcadaDesviosExternos ------ atividadeAnterior= "+atividadeAnterior);
	 var atividadeAprovada = hAPI.getCardValue("atividadeAprovada");
	 log.info("3###WORC02-aprovacaoAlcadaDesviosExternos ------ atividadeAprovada= "+atividadeAprovada);
		//try{
	 
	var datasetValCritico = DatasetFactory.getDataset("ds_ConsultaRM_WS191_RetornaProjetosCadastradosTOP", null, null, null);
	var CODCCUSTO_SOLICITACAO = hAPI.getCardValue("CODCCUSTO");
	for (var k = 0; k < datasetValCritico.rowsCount; k++) {
		var ATIVAR_CRITICO = datasetValCritico.getValue(k, "ATIVAR_CRITICO");
		var CODCCUSTO = datasetValCritico.getValue(k, "CODCCUSTO");
		 log.info("4###WORC02-aprovacaoAlcadaDesviosExternos ------ CODCCUSTO= "+CODCCUSTO);
		 log.info("5###WORC02-aprovacaoAlcadaDesviosExternos ------ CODCCUSTO_SOLICITACAO= "+CODCCUSTO_SOLICITACAO);
	
		
		if(CODCCUSTO == undefined || CODCCUSTO == null || CODCCUSTO == ''){
			throw 'ERROR - Falha na consulta dos dados do Projeto junto ao RM. Favor acionar o Suporte TI';
		}
		
		if(CODCCUSTO == CODCCUSTO_SOLICITACAO){
			if(ATIVAR_CRITICO == 'T'){
				var ProjEmModoCritico = true;
				 log.info("888###WORC02-aprovacaoAlcadaDesviosExternos ------ ProjEmModoCritico= "+ProjEmModoCritico);
			}
		}
	}
	 var vlrCorteMaiorMenorInterno = '';
	 var vlrCorteMaiorMenorExterno = '';
	 var varAcumExterMenorPresid = '';
	 var varIndivExterMenorPresid = '';
	 var varAcumExterMenorDiretor = '';
	 var varIndivExterMenorDiretor = '';
	 var varAcumExterMenorGestObras = '';
	 var varIndivExterMenorGestObras = '';
	 var varAcumExterMenorGestContrato = '';
	 var varIndivExterMenorGestContrato = '';
	 var varAcumExterMaiorPresid = '';
	 var varIndivExterMaiorPresid = '';
	 var varAcumExterMaiorDiretor = '';
	 var varIndivExterMaiorDiretor = '';
	 var varAcumExterMaiorGestObras = '';
	 var varIndivExterMaiorGestObras = '';
	 var varAcumExterMaiorGestContrato = '';
	 var varIndivExterMaiorGestContrato = '';
	 
	var connect = DatasetFactory.getDataset("ds_mip_connector", null, null, null);
	var userAdmin = connect.getValue(0, "USUARIOECM");
	var c1 = DatasetFactory.createConstraint('userSecurityId', userAdmin, userAdmin, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
	var constraintsForm = new Array(c1, c2);
	var datasetForm = DatasetFactory.getDataset( 'ds_Form_CadastroAlcadaAprovPGM', null, constraintsForm, null);
	log.info("6###WORC02-aprovacaoAlcadaDesviosExternos ------ datasetForm.rowsCount:= "+datasetForm.rowsCount);
	if(datasetForm.rowsCount){
		for (var i = 0; i < datasetForm.rowsCount; i++) {
			  vlrCorteMaiorMenorInterno = parseFloat(converteValorMoeda(datasetForm.getValue(i, "vlrCorteMaiorMenorInterno"))).toFixed(2);
			  vlrCorteMaiorMenorExterno = parseFloat(converteValorMoeda(datasetForm.getValue(i, "vlrCorteMaiorMenorExterno"))).toFixed(2);
			  		  
			  log.info("7###WORC02-aprovacaoAlcadaDesviosExternos ------ vlrCorteMaiorMenorInterno:= "+vlrCorteMaiorMenorInterno);
			  log.info("8###WORC02-aprovacaoAlcadaDesviosExternos ------ vlrCorteMaiorMenorExterno:= "+vlrCorteMaiorMenorExterno);
			  
			  
			  hAPI.setCardValue("hidden_vlrCorteMaiorMenorInt", vlrCorteMaiorMenorInterno);	
			  hAPI.setCardValue("hidden_vlrCorteMaiorMenorExt", vlrCorteMaiorMenorExterno);	
			  
			  varAcumExterMenorPresid = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumExterMenorPresid"))).toFixed(2);
			  varIndivExterMenorPresid = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivExterMenorPresid"))).toFixed(2);
			  varAcumExterMenorDiretor = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumExterMenorDiretor"))).toFixed(2);
			  varIndivExterMenorDiretor = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivExterMenorDiretor"))).toFixed(2);
			  varAcumExterMenorGestObras = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumExterMenorGestObras"))).toFixed(2);
			  varIndivExterMenorGestObras = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivExterMenorGestObras"))).toFixed(2);
			  varAcumExterMenorGestContrato = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumExterMenorGestContrato"))).toFixed(2);
			  varIndivExterMenorGestContrato = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivExterMenorGestContrato"))).toFixed(2);
			 
			  varAcumExterMaiorPresid = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumExterMaiorPresid"))).toFixed(2);
			  varIndivExterMaiorPresid = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivExterMaiorPresid"))).toFixed(2);
			  varAcumExterMaiorDiretor = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumExterMaiorDiretor"))).toFixed(2);
			  varIndivExterMaiorDiretor = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivExterMaiorDiretor"))).toFixed(2);
			  varAcumExterMaiorGestObras = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumExterMaiorGestObras"))).toFixed(2);
			  varIndivExterMaiorGestObras = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivExterMaiorGestObras"))).toFixed(2);
			  varAcumExterMaiorGestContrato = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumExterMaiorGestContrato"))).toFixed(2);
			  varIndivExterMaiorGestContrato = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivExterMaiorGestContrato"))).toFixed(2);
		}
	}else{
		throw 'ERRO - Não foi possivel acessar o Formulário de cadastro das alçadas de aprovação';
	}
	
			
			var vlrTotalInvestimento = parseFloat(converteValorMoeda(hAPI.getCardValue("vlrTotalInvestimento"))).toFixed(2);
			var VLR_TOTAL_CUSTO = parseFloat(converteValorMoeda(hAPI.getCardValue("VLR_TOTAL_CUSTO"))).toFixed(2);
			var VLR_TOTAL_VENDA = parseFloat(converteValorMoeda(hAPI.getCardValue("VLR_TOTAL_VENDA"))).toFixed(2);
			
			
			var hidden_aprovGestorContrato = hAPI.getCardValue("hidden_aprovGestorContrato");
			var hidden_aprovGestorObra = hAPI.getCardValue("hidden_aprovGestorObra");
			var hidden_aprovDiretorOperac = hAPI.getCardValue("hidden_aprovDiretorOperac");
			var hidden_aprovDiretorComerc = hAPI.getCardValue("hidden_aprovDiretorComerc");
			var hidden_aprovPresidenciaMIP = hAPI.getCardValue("hidden_aprovPresidenciaMIP");
		
			//VALIDA ATIVIDADE ENCAMINHADA PARA AJUSTE
			if(hidden_aprovGestorContrato == 'ajustar' 
				|| hidden_aprovGestorObra == 'ajustar'						
						|| hidden_aprovDiretorOperac == 'ajustar'
							|| hidden_aprovDiretorComerc == 'ajustar'
								|| hidden_aprovPresidenciaMIP == 'ajustar'){
			if(hidden_aprovGestorContrato == 'ajustar'){
				hAPI.setCardValue("hidden_aprovGestorContrato", '');
			}else if(hidden_aprovGestorObra == 'ajustar'){
				hAPI.setCardValue("hidden_aprovGestorObra", '');
			}else if(hidden_aprovDiretorOperac == 'ajustar'){
				hAPI.setCardValue("hidden_aprovDiretorOperac", '');
			}else if(hidden_aprovDiretorComerc == 'ajustar'){
				hAPI.setCardValue("hidden_aprovDiretorComerc", '');
			}else if(hidden_aprovPresidenciaMIP == 'ajustar'){
				hAPI.setCardValue("hidden_aprovPresidenciaMIP", '');
			}
				
				return 'ajustar';
			}
			var atividade = getValue('WKCurrentState');
			
			log.info("9###WORC02-aprovacaoAlcadaDesviosExternos ------ atividade:= "+atividade);
			log.info("10###WORC02-aprovacaoAlcadaDesviosExternos ------ atividadeAprovada:= "+atividadeAprovada);
			log.info("11###WORC02-aprovacaoAlcadaDesviosExternos ------ atividadeAnterior:= "+atividadeAnterior);
			log.info("12###WORC02-aprovacaoAlcadaDesviosExternos ------ vlrTotalInvestimento:= "+vlrTotalInvestimento);
			log.info("13###WORC02-aprovacaoAlcadaDesviosExternos ------ vlrCorteMaiorMenorExterno:= "+vlrCorteMaiorMenorExterno);
			
			//DEFININDO CAMINHO MAIOR / MENOR PORTE
			if(vlrTotalInvestimento <=  vlrCorteMaiorMenorExterno){
				log.info("99###WORC02-aprovacaoAlcadaDesviosExternos ------ vlrTotalInvestimento <=  vlrCorteMaiorMenorExterno:= "+(vlrTotalInvestimento <=  vlrCorteMaiorMenorExterno));
				log.info("14###WORC02-aprovacaoAlcadaDesviosExternos ------ +atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO:= "+(atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO));
				//VALIDA APROVAÇÃO NA ALCADA DO GERENTE DE CONTRATO MENOR PORTE
				
				log.info("14.1###WORC02-aprovacaoAlcadaDesviosExternos ------ ProjEmModoCritico:= "+ProjEmModoCritico);
				log.info("14.2###WORC02-aprovacaoAlcadaDesviosExternos ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
				log.info("14.3###WORC02-aprovacaoAlcadaDesviosExternos ------ (alcadaVariacaoAcumulada(varAcumExterMenorGestContrato, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumExterMenorGestContrato, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)));
				log.info("14.4###WORC02-aprovacaoAlcadaDesviosExternos ------ (alcadaVariacaoIndividual(varIndivExterMenorGestContrato , vlrTotalInvestimento, VLR_TOTAL_VENDA)):= "+(alcadaVariacaoIndividual(varIndivExterMenorGestContrato , vlrTotalInvestimento, VLR_TOTAL_VENDA)));
				log.info("14.5###WORC02-aprovacaoAlcadaDesviosExternos ------ (hidden_aprovGestorContrato == 'aprovado'):= "+(hidden_aprovGestorContrato == 'aprovado'));
				log.info("14.6###WORC02-aprovacaoAlcadaDesviosExternos ------ (atividadeAprovada == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE):= "+(atividadeAprovada == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE));
				
				if((ProjEmModoCritico == false)
						&&(alcadaVariacaoAcumulada(varAcumExterMenorGestContrato, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO))
						&& (alcadaVariacaoIndividual(varIndivExterMenorGestContrato , vlrTotalInvestimento, VLR_TOTAL_VENDA)) 
						&& (hidden_aprovGestorContrato == 'aprovado')
						&& (atividadeAprovada == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE)){
					log.info("VALIDA APROVAÇÃO NA ALCADA DO GERENTE DE CONTRATO MENOR PORTE EXTERNO = RETURN : APROVACAO_CLIENTE_MERITO_TAC_PLEITO");
					return 'APROVACAO_CLIENTE_MERITO_TAC_PLEITO';
				}else if(hidden_aprovGestorContrato == 'aprovado'
					&& atividadeAprovada == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE){
					log.info("VALIDA APROVAÇÃO NA ALCADA DO GERENTE DE CONTRATO MENOR PORTE EXTERNO= RETURN : ANALISE_TRATAMENTO_APROV_GESTOR_OBRA");
					return 'ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE';
				}
				
				log.info("15-aprovacaoAlcadaDesviosExternos -#  atividadeAprovada == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE = "+(atividadeAprovada == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE));
				//VALIDA APROVAÇÃO NA ALCADA DO GERENTES MENOR PORTE EXTERNO
			
				log.info("15.1###WORC02-aprovacaoAlcadaDesviosExternos ------ ProjEmModoCritico:= "+ProjEmModoCritico);
				log.info("15.2###WORC02-aprovacaoAlcadaDesviosExternos ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
				log.info("15.3###WORC02-aprovacaoAlcadaDesviosExternos ------ (alcadaVariacaoAcumulada(varAcumExterMenorGestObras, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumExterMenorGestObras, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)));
				log.info("15.4###WORC02-aprovacaoAlcadaDesviosExternos ------ (alcadaVariacaoIndividual(varIndivExterMenorGestObras, vlrTotalInvestimento, VLR_TOTAL_VENDA)):= "+(alcadaVariacaoIndividual(varIndivExterMenorGestObras, vlrTotalInvestimento, VLR_TOTAL_VENDA)));
				log.info("15.5###WORC02-aprovacaoAlcadaDesviosExternos ------ (hidden_aprovGestorObra == 'aprovado'):= "+(hidden_aprovGestorObra == 'aprovado'));
				log.info("15.6###WORC02-aprovacaoAlcadaDesviosExternos ------ (atividadeAprovada == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE):= "+(atividadeAprovada == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE));
				
					if((ProjEmModoCritico == false)
							&&(alcadaVariacaoAcumulada(varAcumExterMenorGestObras, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO))
							&&(alcadaVariacaoIndividual(varIndivExterMenorGestObras, vlrTotalInvestimento, VLR_TOTAL_VENDA))
							&&(hidden_aprovGestorObra == 'aprovado')
							&&(atividadeAprovada == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE)){
						log.info("VALIDA APROVAÇÃO NA ALCADA DO GERENTES MENOR PORTE EXTERNO = RETURN : APROVACAO_CLIENTE_MERITO_TAC_PLEITO");
					return 'APROVACAO_CLIENTE_MERITO_TAC_PLEITO';
				}else if(hidden_aprovGestorObra == 'aprovado'
					&& atividadeAprovada == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE){
					log.info("VALIDA APROVAÇÃO NA ALCADA DO GERENTES MENOR PORTE EXTERNO EXTERNO= RETURN : INICIO_PARALELO_DIRETORIA_COM_OPER");
					return 'INICIO_PARALELO_DIRETORIA_COM_OPER';
				}

					
					
					
					
				log.info("16-aprovacaoAlcadaDesviosExternos -#  atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT = "+((atividadeAprovada == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE)||(atividadeAprovada == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE)));
				//VALIDA APROVAÇÃO NA ALCADA DO DIRETOR DE ENGENHARIA E COMERCIAL MENOR PORTE EXTERNO
				
				log.info("16.1###WORC02-aprovacaoAlcadaDesviosExternos ------ ProjEmModoCritico:= "+ProjEmModoCritico);
				log.info("16.2###WORC02-aprovacaoAlcadaDesviosExternos ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
				log.info("16.3###WORC02-aprovacaoAlcadaDesviosExternos ------ (alcadaVariacaoAcumulada(varAcumeExterMenorDiretor, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumExterMenorDiretor, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)));
				log.info("16.4###WORC02-aprovacaoAlcadaDesviosExternos ------ (alcadaVariacaoIndividual(varIndivExterMenorDiretor , vlrTotalInvestimento, VLR_TOTAL_VENDA)):= "+(alcadaVariacaoIndividual(varIndivExterMenorDiretor , vlrTotalInvestimento, VLR_TOTAL_VENDA)));
				log.info("16.5###WORC02-aprovacaoAlcadaDesviosExternos ------ (hidden_aprovDiretorOperac == 'aprovado'):= "+((hidden_aprovDiretorOperac == 'aprovado')&&(hidden_aprovDiretorComerc == 'aprovado')));
				log.info("16.6###WORC02-aprovacaoAlcadaDesviosExternos ------ ((atividadeAprovada == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE)||(atividadeAprovada == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE):= "+((atividadeAprovada == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE)||(atividadeAprovada == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE)));
				
				if((ProjEmModoCritico == false)
					&&(alcadaVariacaoAcumulada(varAcumExterMenorDiretor, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)) 
					&&(alcadaVariacaoIndividual(varIndivExterMenorDiretor , vlrTotalInvestimento, VLR_TOTAL_VENDA)) 
					&&((hidden_aprovDiretorOperac == 'aprovado')&&(hidden_aprovDiretorComerc == 'aprovado'))
					&&((atividadeAprovada == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE)||(atividadeAprovada == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE))){
					log.info("VALIDA APROVAÇÃO NA ALCADA DO DIRETOR DE ENGENHARIA E COMERCIAL MENOR PORTE EXTERNOE = RETURN : INCORPORACAO_ORCAMENTO_VERSAO_ATIVA");
					return 'APROVACAO_CLIENTE_MERITO_TAC_PLEITO';
				}else if (((hidden_aprovDiretorOperac == 'aprovado')&&(hidden_aprovDiretorComerc == 'aprovado'))
					&& ((atividadeAprovada == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE)||(atividadeAprovada == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE))){
					log.info("VALIDA APROVAÇÃO NA ALCADA DO DIRETOR DE ENGENHARIA E COMERCIAL MENOR PORTE EXTERNO RETURN : ANALISE_APROV_PRESIDENCIA_MIP");
					return 'ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE';
				}
				
				log.info("17-aprovacaoAlcadaDesviosExternos -#  atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP = "+(atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE));
				//VALIDA APROVAÇÃO NA ALCADA DO PRESIDENTE  EXTERNO MENOR PORTE
				
				log.info("17.1###WORC02-aprovacaoAlcadaDesviosExternos ------ (hidden_aprovPresidenciaMIP == 'aprovado'):= "+(hidden_aprovPresidenciaMIP == 'aprovado'));
				log.info("17.2###WORC02-aprovacaoAlcadaDesviosExternos ------ atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP):= "+(atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE));
			
			
				 if((hidden_aprovPresidenciaMIP == 'aprovado')
					&& (atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE)){
					 log.info("VALIDA APROVAÇÃO NA ALCADA DO PRESIDENTE MENOR PORTE = RETURN : INCORPORACAO_ORCAMENTO_VERSAO_ATIVA");
					return 'APROVACAO_CLIENTE_MERITO_TAC_PLEITO';
				}
				
				
				
			}else if(vlrTotalInvestimento > vlrCorteMaiorMenorExterno){
				log.info("99###WORC02-aprovacaoAlcadaDesviosExternos ------ vlrTotalInvestimento > vlrCorteMaiorMenorExterno:= "+(vlrTotalInvestimento > vlrCorteMaiorMenorExterno));
			
				log.info("18###WORC02-aprovacaoAlcadaDesviosExternos ------ +atividadeAprovada == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE:= "+(atividadeAprovada == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE));
				//VALIDA APROVAÇÃO NA ALCADA DO GERENTE DE OBRA MAIOR PORTE
				log.info("18.1###WORC02-aprovacaoAlcadaDesviosExternos ------ ProjEmModoCritico:= "+ProjEmModoCritico);
				log.info("18.2###WORC02-aprovacaoAlcadaDesviosExternos ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
				log.info("18.3###WORC02-aprovacaoAlcadaDesviosExternos ------ (alcadaVariacaoAcumulada(varAcumExterMaiorGestContrato, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumExterMaiorGestContrato, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)));
				log.info("18.4###WORC02-aprovacaoAlcadaDesviosExternos ------ (alcadaVariacaoIndividual(varIndivExterMenorDiretor , vlrTotalInvestimento, VLR_TOTAL_VENDA)):= "+(alcadaVariacaoIndividual(varIndivExterMenorDiretor , vlrTotalInvestimento, VLR_TOTAL_VENDA)));
				log.info("18.5###WORC02-aprovacaoAlcadaDesviosExternos ------ (hidden_aprovGestorObra == 'aprovado'):= "+(hidden_aprovGestorObra == 'aprovado'));
				log.info("18.6###WORC02-aprovacaoAlcadaDesviosExternos ------ (atividadeAprovada == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE):= "+(atividadeAprovada == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE));
				
				
				if((ProjEmModoCritico == false)
						&&(alcadaVariacaoAcumulada(varAcumExterMaiorGestContrato, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)) 
						&&(alcadaVariacaoIndividual(varIndivExterMaiorGestContrato , vlrTotalInvestimento, VLR_TOTAL_VENDA)) 
						&&(hidden_aprovGestorContrato == 'aprovado')
						&&(atividadeAprovada == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE)){
					log.info("VALIDA APROVAÇÃO NA ALCADA DO GERENTE DE OBRA MAIOR PORTE EXTERNO = RETURN : APROVACAO_CLIENTE_MERITO_TAC_PLEITO");
						return 'APROVACAO_CLIENTE_MERITO_TAC_PLEITO';
					}else if(hidden_aprovGestorContrato == 'aprovado'
						&& atividadeAprovada == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE){
						log.info("VALIDA APROVAÇÃO GERENTE DE OBRA MAIOR PORTE EXTERNO= RETURN : ANALISE_TRATAMENTO_APROV_GESTOR_OBRA");
						return 'ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE';
					}
				log.info("19###WORC02-aprovacaoAlcadaDesviosExternos ------ +atividadeAprovada == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE:= "+atividadeAprovada == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE);	
				//VALIDA APROVAÇÃO NA ALCADA DO GERENTE DE OBRA MAIOR PORTE
				log.info("19.1###WORC02-aprovacaoAlcadaDesviosExternos ------ ProjEmModoCritico:= "+ProjEmModoCritico);
				log.info("19.2###WORC02-aprovacaoAlcadaDesviosExternos ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
				log.info("19.3###WORC02-aprovacaoAlcadaDesviosExternos ------ (alcadaVariacaoAcumulada(varAcumExterMaiorGestObras, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumExterMaiorGestObras, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)));
				log.info("19.4###WORC02-aprovacaoAlcadaDesviosExternos ------ (alcadaVariacaoIndividual(varIndivExterMaiorGestObras , vlrTotalInvestimento, VLR_TOTAL_VENDA)):= "+(alcadaVariacaoIndividual(varIndivExterMaiorGestObras , vlrTotalInvestimento, VLR_TOTAL_VENDA)));
				log.info("19.5###WORC02-aprovacaoAlcadaDesviosExternos ------ (hidden_aprovGestorObra == 'aprovado'):= "+(hidden_aprovGestorObra == 'aprovado'));
				log.info("19.6###WORC02-aprovacaoAlcadaDesviosExternos ------ (atividadeAprovada == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE):= "+(atividadeAprovada == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE));
				
					if((ProjEmModoCritico == false)
						&&(alcadaVariacaoAcumulada(varAcumExterMaiorGestObras, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)) 
						&&(alcadaVariacaoIndividual(varIndivExterMaiorGestObras , vlrTotalInvestimento, VLR_TOTAL_VENDA)) 
						&&(hidden_aprovGestorObra == 'aprovado')
						&&(atividadeAprovada == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE)){
						log.info("VALIDA APROVAÇÃO NA ALCADA DO GERENTES MAIOR PORTE EXTERNO = RETURN : APROVACAO_CLIENTE_MERITO_TAC_PLEITO");
						return 'APROVACAO_CLIENTE_MERITO_TAC_PLEITO';
					}else if((hidden_aprovGestorObra == 'aprovado')
						&& (atividadeAprovada == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE)){
						log.info("VALIDA APROVAÇÃO NA ALCADA DO GERENTES MAIOR PORTE EXTERNO EXTERNO= RETURN : INICIO_PARALELO_DIRETORIA_COM_OPER");
						return 'INICIO_PARALELO_DIRETORIA_COM_OPER';
					}
	
					log.info("20###WORC02-aprovacaoAlcadaDesviosExternos ------ (atividadeAprovada == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE)||(atividadeAprovada == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE)):= "+((atividadeAprovada == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE)||(atividadeAprovada == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE)));	
					//VALIDA APROVAÇÃO NA ALCADA DO DIRETOR DE ENGENHARIA MAIOR PORTE
					log.info("19.1###WORC02-aprovacaoAlcadaDesviosExternos ------ ProjEmModoCritico:= "+ProjEmModoCritico);
					log.info("19.2###WORC02-aprovacaoAlcadaDesviosExternos ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
					log.info("19.3###WORC02-aprovacaoAlcadaDesviosExternos ------ (alcadaVariacaoAcumulada(varAcumExterMaiorDiretor, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumExterMaiorDiretor, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)));
					log.info("19.4###WORC02-aprovacaoAlcadaDesviosExternos ------ (alcadaVariacaoIndividual(varIndivExterMaiorDiretor , vlrTotalInvestimento, VLR_TOTAL_VENDA)):= "+(alcadaVariacaoIndividual(varIndivExterMaiorDiretor , vlrTotalInvestimento, VLR_TOTAL_VENDA)));
					log.info("19.5###WORC02-aprovacaoAlcadaDesviosExternos ------ (hidden_aprovDiretorOperac == 'aprovado')&&(hidden_aprovDiretorComerc == 'aprovado')):= "+((hidden_aprovDiretorOperac == 'aprovado')&&(hidden_aprovDiretorComerc == 'aprovado')));
					log.info("19.6###WORC02-aprovacaoAlcadaDesviosExternos ------ ((atividadeAprovada == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE)||(atividadeAprovada == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE)):= "+((atividadeAprovada == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE)||(atividadeAprovada == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE)));
					
					
				if((ProjEmModoCritico == false)
						&&(alcadaVariacaoAcumulada(varAcumExterMaiorDiretor, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)) 
						&&(alcadaVariacaoIndividual(varIndivExterMaiorDiretor , vlrTotalInvestimento, VLR_TOTAL_VENDA)) 
						&&((hidden_aprovDiretorOperac == 'aprovado')&&(hidden_aprovDiretorComerc == 'aprovado'))
						&&((atividadeAprovada == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE)||(atividadeAprovada == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE))){
					log.info("VALIDA APROVAÇÃO NA ALCADA DO DIRETOR DE ENGENHARIA E COMERCIAL MAIOR PORTE EXTERNOE = RETURN : INCORPORACAO_ORCAMENTO_VERSAO_ATIVA");
					return 'APROVACAO_CLIENTE_MERITO_TAC_PLEITO';
					}else if (((hidden_aprovDiretorOperac == 'aprovado')&&(hidden_aprovDiretorComerc == 'aprovado'))
							&& ((atividadeAprovada == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE)||(atividadeAprovada == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE))){
						log.info("VALIDA APROVAÇÃO NA ALCADA DO DIRETOR DE ENGENHARIA E COMERCIAL MAIOR PORTE EXTERNO RETURN : ANALISE_APROV_PRESIDENCIA_MIP");
						return 'ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE';
					}
					

				log.info("20-aprovacaoAlcadaDesviosExternos -# atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP = "+(atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE));
				//VALIDA APROVAÇÃO NA ALCADA DO PRESIDENTE  MENOR PORTE
				
				log.info("20.1###WORC02-aprovacaoAlcadaDesviosExternos ------ (hidden_aprovPresidenciaMIP == 'aprovado'):= "+(hidden_aprovPresidenciaMIP == 'aprovado'));
				log.info("20.2###WORC02-aprovacaoAlcadaDesviosExternos ------ (atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE):= "+(atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE));
			
					 if((hidden_aprovPresidenciaMIP == 'aprovado')
						&& (atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE)){
						return 'APROVACAO_CLIENTE_MERITO_TAC_PLEITO';
					}
					
			}else{
				throw 'ERROR - Falha na definição de parâmetros Maior / Menor Porte';
			}
		//}catch(e){
		//	throw e;
		//}
}





