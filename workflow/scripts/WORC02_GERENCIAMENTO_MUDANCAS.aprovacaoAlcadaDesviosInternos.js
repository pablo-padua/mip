function aprovacaoAlcadaDesviosInternos(){
	var ProjEmModoCritico = false;
		 log.info("1###WORC02-aprovacaoAlcadaDesviosInternos ------ INICIO");
		 var atividadeAnterior = hAPI.getCardValue("atividadeAnterior");
		 log.info("2###WORC02-aprovacaoAlcadaDesviosInternos ------ atividadeAnterior= "+atividadeAnterior);
		 var atividadeAprovada = hAPI.getCardValue("atividadeAprovada");
		 log.info("3###WORC02-aprovacaoAlcadaDesviosInternos ------ atividadeAprovada= "+atividadeAprovada);
			//try{
		 
		var datasetValCritico = DatasetFactory.getDataset("ds_ConsultaRM_WS191_RetornaProjetosCadastradosTOP", null, null, null);
		var CODCCUSTO_SOLICITACAO = hAPI.getCardValue("CODCCUSTO");
		for (var k = 0; k < datasetValCritico.rowsCount; k++) {
			var ATIVAR_CRITICO = datasetValCritico.getValue(k, "ATIVAR_CRITICO");
			var CODCCUSTO = datasetValCritico.getValue(k, "CODCCUSTO");
			 log.info("4###WORC02-aprovacaoAlcadaDesviosInternos ------ CODCCUSTO= "+CODCCUSTO);
			 log.info("5###WORC02-aprovacaoAlcadaDesviosInternos ------ CODCCUSTO_SOLICITACAO= "+CODCCUSTO_SOLICITACAO);
			
			
			if(CODCCUSTO == undefined || CODCCUSTO == null || CODCCUSTO == ''){
				throw 'ERROR - Falha na consulta dos dados do Projeto junto ao RM. Favor acionar o Suporte TI';
			}
			if(CODCCUSTO == CODCCUSTO_SOLICITACAO){
				if(ATIVAR_CRITICO == 'T'){
					ProjEmModoCritico = true;
					log.info("888###WORC02-aprovacaoAlcadaDesviosInternos ------ ProjEmModoCritico= "+ProjEmModoCritico);
				}
			}
		}
		 var vlrCorteMaiorMenorInterno = '';
		 var vlrCorteMaiorMenorExterno = '';
		 var varAcumInterMenorPresid = '';
		 var varIndivInterMenorPresid = '';
		 var varAcumInterMenorDiretor = '';
		 var varIndivInterMenorDiretor = '';
		// var varAcumInterMenorAdCon = '';
		// var varIndivInterMenorAdCon = '';
		 var varAcumInterMenorGestObras = '';
		 var varIndivInterMenorGestObras = '';
		 var varAcumInterMenorGestContrato = '';
		 var varIndivInterMenorGestContrato = '';
		 var varAcumInterMaiorPresid = '';
		 var varIndivInterMaiorPresid = '';
		 var varAcumInterMaiorDiretor = '';
		 var varIndivInterMaiorDiretor = '';
		//var varAcumInterMaiorAdCon = '';
		// var varIndivInterMaiorAdCon = '';
		 var varAcumInterMaiorGestObras = '';
		 var varIndivInterMaiorGestObras = '';
		 var varAcumInterMaiorGestContrato = '';
		 var varIndivInterMaiorGestContrato = '';
		 
		var connect = DatasetFactory.getDataset("ds_mip_connector", null, null, null);
		var userAdmin = connect.getValue(0, "USUARIOECM");
		var c1 = DatasetFactory.createConstraint('userSecurityId', userAdmin, userAdmin, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
		var constraintsForm = new Array(c1, c2);
		var datasetForm = DatasetFactory.getDataset( 'ds_Form_CadastroAlcadaAprovPGM', null, constraintsForm, null);
		log.info("6###WORC02-aprovacaoAlcadaDesviosInternos ------ datasetForm.rowsCount:= "+datasetForm.rowsCount);
		if(datasetForm.rowsCount){
			for (var i = 0; i < datasetForm.rowsCount; i++) {
				  vlrCorteMaiorMenorInterno = parseFloat(converteValorMoeda(datasetForm.getValue(i, "vlrCorteMaiorMenorInterno"))).toFixed(2);
				  vlrCorteMaiorMenorExterno = parseFloat(converteValorMoeda(datasetForm.getValue(i, "vlrCorteMaiorMenorExterno"))).toFixed(2);
				  		  
				  log.info("7###WORC02-aprovacaoAlcadaDesviosInternos ------ vlrCorteMaiorMenorInterno:= "+vlrCorteMaiorMenorInterno);
				  log.info("8###WORC02-aprovacaoAlcadaDesviosInternos ------ vlrCorteMaiorMenorExterno:= "+vlrCorteMaiorMenorExterno);
				  
				  
				  hAPI.setCardValue("hidden_vlrCorteMaiorMenorInt", vlrCorteMaiorMenorInterno);	
				  hAPI.setCardValue("hidden_vlrCorteMaiorMenorExt", vlrCorteMaiorMenorExterno);	
				  
				  varAcumInterMenorPresid = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumInterMenorPresid"))).toFixed(2);
				  varIndivInterMenorPresid = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivInterMenorPresid"))).toFixed(2);
				  varAcumInterMenorDiretor = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumInterMenorDiretor"))).toFixed(2);
				  varIndivInterMenorDiretor = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivInterMenorDiretor"))).toFixed(2);
				  //varAcumInterMenorAdCon = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumInterMenorAdCon"))).toFixed(2);
				 // varIndivInterMenorAdCon = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivInterMenorAdCon"))).toFixed(2);
				  varAcumInterMenorGestObras = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumInterMenorGestObras"))).toFixed(2);
				  varIndivInterMenorGestObras = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivInterMenorGestObras"))).toFixed(2);
				  varAcumInterMenorGestContrato = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumInterMenorGestContrato"))).toFixed(2);
				  varIndivInterMenorGestContrato = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivInterMenorGestContrato"))).toFixed(2);
				 
				  varAcumInterMaiorPresid = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumInterMaiorPresid"))).toFixed(2);
				  varIndivInterMaiorPresid = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivInterMaiorPresid"))).toFixed(2);
				  varAcumInterMaiorDiretor = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumInterMaiorDiretor"))).toFixed(2);
				  varIndivInterMaiorDiretor = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivInterMaiorDiretor"))).toFixed(2);
				  //varAcumInterMaiorAdCon = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumInterMaiorAdCon"))).toFixed(2);
				  //varIndivInterMaiorAdCon = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivInterMaiorAdCon"))).toFixed(2);
				  varAcumInterMaiorGestObras = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumInterMaiorGestObras"))).toFixed(2);
				  varIndivInterMaiorGestObras = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivInterMaiorGestObras"))).toFixed(2);
				  varAcumInterMaiorGestContrato = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varAcumInterMaiorGestContrato"))).toFixed(2);
				  varIndivInterMaiorGestContrato = parseFloat(converteValorMoeda(datasetForm.getValue(i, "varIndivInterMaiorGestContrato"))).toFixed(2);
			}
		}else{
			throw 'ERRO - Não foi possivel acessar o Formulário de cadastro das alçadas de aprovação';
		}
		
				
				var vlrTotalInvestimento = parseFloat(converteValorMoeda(hAPI.getCardValue("vlrTotalInvestimento"))).toFixed(2);
				var VLR_TOTAL_CUSTO = parseFloat(converteValorMoeda(hAPI.getCardValue("VLR_TOTAL_CUSTO"))).toFixed(2);
				var VLR_TOTAL_VENDA = parseFloat(converteValorMoeda(hAPI.getCardValue("VLR_TOTAL_VENDA"))).toFixed(2);
				
				
				var hidden_aprovGestorContrato = hAPI.getCardValue("hidden_aprovGestorContrato");
				var hidden_aprovGestorObra = hAPI.getCardValue("hidden_aprovGestorObra");
				//var hidden_aprovADCon = hAPI.getCardValue("hidden_aprovADCon");
				var hidden_aprovDiretorOperac = hAPI.getCardValue("hidden_aprovDiretorOperac");
				var hidden_aprovDiretorComerc = hAPI.getCardValue("hidden_aprovDiretorComerc");
				var hidden_aprovPresidenciaMIP = hAPI.getCardValue("hidden_aprovPresidenciaMIP");
			
				//VALIDA ATIVIDADE ENCAMINHADA PARA AJUSTE
				log.info("199###WORC02-aprovacaoAlcadaDesviosInternos ------ hidden_aprovDiretorComerc:= "+hidden_aprovDiretorComerc);
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
					
					
				log.info("890###WORC02-aprovacaoAlcadaDesviosInternos ------ return := AJUSTAR");
					return 'ajustar';
				}
				var atividade = getValue('WKCurrentState');
				
				log.info("9###WORC02-aprovacaoAlcadaDesviosInternos ------ atividade:= "+atividade);
				log.info("10###WORC02-aprovacaoAlcadaDesviosInternos ------ atividadeAprovada:= "+atividadeAprovada);
				log.info("11###WORC02-aprovacaoAlcadaDesviosInternos ------ atividadeAnterior:= "+atividadeAnterior);
				log.info("12###WORC02-aprovacaoAlcadaDesviosInternos ------ vlrTotalInvestimento:= "+vlrTotalInvestimento);
				log.info("13###WORC02-aprovacaoAlcadaDesviosInternos ------ vlrCorteMaiorMenorInterno:= "+vlrCorteMaiorMenorInterno);
				
				//DEFININDO CAMINHO MAIOR / MENOR PORTE
				if(vlrTotalInvestimento <=  vlrCorteMaiorMenorInterno){
					log.info("99###WORC02-aprovacaoAlcadaDesviosInternos ------ vlrTotalInvestimento <=  vlrCorteMaiorMenorInterno:= "+(vlrTotalInvestimento <=  vlrCorteMaiorMenorInterno));
					log.info("14###WORC02-aprovacaoAlcadaDesviosInternos ------ +atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO:= "+(atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO));
					//VALIDA APROVAÇÃO NA ALCADA DO GERENTE DE CONTRATO MENOR PORTE
					
					log.info("14.1###WORC02-aprovacaoAlcadaDesviosInternos ------ ProjEmModoCritico:= "+ProjEmModoCritico);
					log.info("14.2###WORC02-aprovacaoAlcadaDesviosInternos ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
					log.info("14.3###WORC02-aprovacaoAlcadaDesviosInternos ------ (alcadaVariacaoAcumulada(varAcumInterMenorGestContrato, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumInterMenorGestContrato, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)));
					log.info("14.4###WORC02-aprovacaoAlcadaDesviosInternos ------ (alcadaVariacaoIndividual(varIndivInterMenorGestContrato , vlrTotalInvestimento, VLR_TOTAL_CUSTO)):= "+(alcadaVariacaoIndividual(varIndivInterMenorGestContrato , vlrTotalInvestimento, VLR_TOTAL_CUSTO)));
					log.info("14.5###WORC02-aprovacaoAlcadaDesviosInternos ------ (hidden_aprovGestorContrato == 'aprovado'):= "+(hidden_aprovGestorContrato == 'aprovado'));
					log.info("14.6###WORC02-aprovacaoAlcadaDesviosInternos ------ (atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO):= "+(atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO));
					
					if((ProjEmModoCritico == false)
							&&(alcadaVariacaoAcumulada(varAcumInterMenorGestContrato, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO))
							&& (alcadaVariacaoIndividual(varIndivInterMenorGestContrato , vlrTotalInvestimento, VLR_TOTAL_CUSTO)) 
							&& (hidden_aprovGestorContrato == 'aprovado')
							&& (atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO)){
						//hAPI.setCardValue("status", 'aprovadoInterna');
						log.info("VALIDA APROVAÇÃO NA ALCADA DO GERENTE DE CONTRATO MENOR PORTE = RETURN : INCORPORACAO_ORCAMENTO_VERSAO_ATIVA");
						return 'INCORPORACAO_ORCAMENTO_VERSAO_ATIVA';
					}else if(hidden_aprovGestorContrato == 'aprovado'
						&& atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO){
						log.info("VALIDA APROVAÇÃO NA ALCADA DO GERENTE DE CONTRATO MENOR PORTE = RETURN : ANALISE_TRATAMENTO_APROV_GESTOR_OBRA");
						return 'ANALISE_TRATAMENTO_APROV_GESTOR_OBRA';
					}
					
					log.info("15-aprovacaoAlcadaDesviosInternos -#  atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA = "+(atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA));
					//VALIDA APROVAÇÃO NA ALCADA DO GERENTE DE OBRA MENOR PORTE
				
					log.info("15.1###WORC02-aprovacaoAlcadaDesviosInternos ------ ProjEmModoCritico:= "+ProjEmModoCritico);
					log.info("15.2###WORC02-aprovacaoAlcadaDesviosInternos ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
					log.info("15.3###WORC02-aprovacaoAlcadaDesviosInternos ------ (alcadaVariacaoAcumulada(varAcumInterMenorGestObras, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumInterMenorGestObras, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)));
					log.info("15.4###WORC02-aprovacaoAlcadaDesviosInternos ------ (alcadaVariacaoIndividual(varIndivInterMenorGestObras , vlrTotalInvestimento, VLR_TOTAL_CUSTO)):= "+(alcadaVariacaoIndividual(varIndivInterMenorGestObras , vlrTotalInvestimento, VLR_TOTAL_CUSTO)));
					log.info("15.5###WORC02-aprovacaoAlcadaDesviosInternos ------ (hidden_aprovGestorObra == 'aprovado'):= "+(hidden_aprovGestorObra == 'aprovado'));
					log.info("15.6###WORC02-aprovacaoAlcadaDesviosInternos ------ (atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA):= "+(atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA));
					
						if((ProjEmModoCritico == false)
								&&(alcadaVariacaoAcumulada(varAcumInterMenorGestObras, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO))
								&&(alcadaVariacaoIndividual(varIndivInterMenorGestObras , vlrTotalInvestimento, VLR_TOTAL_CUSTO))
								&&(hidden_aprovGestorObra == 'aprovado')
								&&(atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA)){
							log.info("VALIDA APROVAÇÃO NA ALCADA DO GERENTE DE OBRA MENOR PORTE = RETURN : INCORPORACAO_ORCAMENTO_VERSAO_ATIVA");
						return 'INCORPORACAO_ORCAMENTO_VERSAO_ATIVA';
					}else if(hidden_aprovGestorObra == 'aprovado'
						&& atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA){
						log.info("VALIDA APROVAÇÃO NA ALCADA DO GERENTE DE CONTRATO OBRA MENOR PORTE = RETURN : ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT");
						return 'ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT';
					}

					log.info("16-aprovacaoAlcadaDesviosInternos -#  atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT = "+(atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT));
					//VALIDA APROVAÇÃO NA ALCADA DO DIRETOR DE ENGENHARIA E COMERCIAL MENOR PORTE
					
					log.info("16.1###WORC02-aprovacaoAlcadaDesviosInternos ------ ProjEmModoCritico:= "+ProjEmModoCritico);
					log.info("16.2###WORC02-aprovacaoAlcadaDesviosInternos ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
					log.info("16.3###WORC02-aprovacaoAlcadaDesviosInternos ------ (alcadaVariacaoAcumulada(varAcumInterMenorDiretor, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumInterMenorDiretor, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)));
					log.info("16.4###WORC02-aprovacaoAlcadaDesviosInternos ------ (alcadaVariacaoIndividual(varIndivInterMenorDiretor , vlrTotalInvestimento, VLR_TOTAL_CUSTO)):= "+(alcadaVariacaoIndividual(varIndivInterMenorDiretor , vlrTotalInvestimento, VLR_TOTAL_CUSTO)));
					log.info("16.5###WORC02-aprovacaoAlcadaDesviosInternos ------ (hidden_aprovDiretorOperac == 'aprovado'):= "+(hidden_aprovDiretorOperac == 'aprovado'));
					log.info("16.6###WORC02-aprovacaoAlcadaDesviosInternos ------ (atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT):= "+(atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT));
					
					log.info("16.5###WORC02-aprovacaoAlcadaDesviosInternos ------ (hidden_aprovDiretorOperac == 'aprovado') && (hidden_aprovDiretorComerc == 'aprovado'):= "+((hidden_aprovDiretorOperac == 'aprovado') && (hidden_aprovDiretorComerc == 'aprovado')));
					log.info("16.6###WORC02-aprovacaoAlcadaDesviosInternos ------ (atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT):= "+((atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT) || (atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_COMERCIAL_INT)));
					
					
					if((ProjEmModoCritico == false)
						&&(alcadaVariacaoAcumulada(varAcumInterMenorDiretor, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)) 
						&&(alcadaVariacaoIndividual(varIndivInterMenorDiretor , vlrTotalInvestimento, VLR_TOTAL_CUSTO)) 
						&&((hidden_aprovDiretorOperac == 'aprovado') && (hidden_aprovDiretorComerc == 'aprovado'))
						&&((atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT) || (atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_COMERCIAL_INT))){
						log.info("VALIDA APROVAÇÃO NA ALCADA DO DIRETOR DE ENGENHARIA MENOR PORTE = RETURN : INCORPORACAO_ORCAMENTO_VERSAO_ATIVA");
						return 'INCORPORACAO_ORCAMENTO_VERSAO_ATIVA';
					}else if(((hidden_aprovDiretorOperac == 'aprovado') && (hidden_aprovDiretorComerc == 'aprovado'))
						&& ((atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT) || (atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_COMERCIAL_INT))){
						log.info("VALIDA APROVAÇÃO NA ALCADA DO DIRETOR DE ENGENHARIA MENOR PORTE = RETURN : ANALISE_APROV_PRESIDENCIA_MIP");
						return 'ANALISE_APROV_PRESIDENCIA_MIP';
					}
					
					log.info("17-aprovacaoAlcadaDesviosInternos -#  atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP = "+(atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP));
					//VALIDA APROVAÇÃO NA ALCADA DO PRESIDENTE  MENOR PORTE
					
					log.info("17.1###WORC02-aprovacaoAlcadaDesviosInternos ------ (hidden_aprovPresidenciaMIP == 'aprovado'):= "+(hidden_aprovPresidenciaMIP == 'aprovado'));
					log.info("17.2###WORC02-aprovacaoAlcadaDesviosInternos ------ atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP):= "+(atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP));
				
					
					 if((hidden_aprovPresidenciaMIP == 'aprovado')
						&& (atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP)){
						 log.info("VALIDA APROVAÇÃO NA ALCADA DO PRESIDENTE MENOR PORTE = RETURN : INCORPORACAO_ORCAMENTO_VERSAO_ATIVA");
						return 'INCORPORACAO_ORCAMENTO_VERSAO_ATIVA';
					}
					
					
					
				}else if(vlrTotalInvestimento > vlrCorteMaiorMenorInterno){
					log.info("99###WORC02-aprovacaoAlcadaDesviosInternos ------ vlrTotalInvestimento > vlrCorteMaiorMenorInterno:= "+(vlrTotalInvestimento > vlrCorteMaiorMenorInterno));
				
					log.info("18###WORC02-aprovacaoAlcadaDesviosInternos ------ +atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO:= "+(atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO));
					//VALIDA APROVAÇÃO NA ALCADA DO GERENTE DE OBRA MAIOR PORTE
					log.info("18.1###WORC02-aprovacaoAlcadaDesviosInternos ------ ProjEmModoCritico:= "+ProjEmModoCritico);
					log.info("18.2###WORC02-aprovacaoAlcadaDesviosInternos ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
					log.info("18.3###WORC02-aprovacaoAlcadaDesviosInternos ------ (alcadaVariacaoAcumulada(varAcumInterMaiorGestContrato, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumInterMaiorGestContrato, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)));
					log.info("18.4###WORC02-aprovacaoAlcadaDesviosInternos ------ (alcadaVariacaoIndividual(varIndivInterMenorDiretor , vlrTotalInvestimento, VLR_TOTAL_CUSTO)):= "+(alcadaVariacaoIndividual(varIndivInterMenorDiretor , vlrTotalInvestimento, VLR_TOTAL_CUSTO)));
					log.info("18.5###WORC02-aprovacaoAlcadaDesviosInternos ------ (hidden_aprovGestorObra == 'aprovado'):= "+(hidden_aprovGestorObra == 'aprovado'));
					log.info("18.6###WORC02-aprovacaoAlcadaDesviosInternos ------ (atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO):= "+(atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO));
					
					
					if((ProjEmModoCritico == false)
							&&(alcadaVariacaoAcumulada(varAcumInterMaiorGestContrato, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)) 
							&&(alcadaVariacaoIndividual(varIndivInterMaiorGestContrato , vlrTotalInvestimento, VLR_TOTAL_CUSTO)) 
							&&(hidden_aprovGestorContrato == 'aprovado')
							&&(atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO)){
						log.info("VALIDA APROVAÇÃO GERENTE DE OBRA MAIOR PORTE = RETURN : INCORPORACAO_ORCAMENTO_VERSAO_ATIVA");
							return 'INCORPORACAO_ORCAMENTO_VERSAO_ATIVA';
						}else if(hidden_aprovGestorContrato == 'aprovado'
							&& atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO){
							log.info("VALIDA APROVAÇÃO GERENTE DE OBRA MAIOR PORTE = RETURN : ANALISE_TRATAMENTO_APROV_GESTOR_OBRA");
							return 'ANALISE_TRATAMENTO_APROV_GESTOR_OBRA';
						}
					log.info("19###WORC02-aprovacaoAlcadaDesviosInternos ------ +atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO:= "+atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA);	
					//VALIDA APROVAÇÃO NA ALCADA DO GERENTE DE OBRA MAIOR PORTE
					log.info("19.1###WORC02-aprovacaoAlcadaDesviosInternos ------ ProjEmModoCritico:= "+ProjEmModoCritico);
					log.info("19.2###WORC02-aprovacaoAlcadaDesviosInternos ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
					log.info("19.3###WORC02-aprovacaoAlcadaDesviosInternos ------ (alcadaVariacaoAcumulada(varAcumInterMaiorGestObras, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumInterMaiorGestObras, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)));
					log.info("19.4###WORC02-aprovacaoAlcadaDesviosInternos ------ (alcadaVariacaoIndividual(varIndivInterMaiorGestObras , vlrTotalInvestimento, VLR_TOTAL_CUSTO)):= "+(alcadaVariacaoIndividual(varIndivInterMaiorGestObras , vlrTotalInvestimento, VLR_TOTAL_CUSTO)));
					log.info("19.5###WORC02-aprovacaoAlcadaDesviosInternos ------ (hidden_aprovGestorObra == 'aprovado'):= "+(hidden_aprovGestorObra == 'aprovado'));
					log.info("19.6###WORC02-aprovacaoAlcadaDesviosInternos ------ (atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA):= "+(atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA));
					
						if((ProjEmModoCritico == false)
							&&(alcadaVariacaoAcumulada(varAcumInterMaiorGestObras, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)) 
							&&(alcadaVariacaoIndividual(varIndivInterMaiorGestObras , vlrTotalInvestimento, VLR_TOTAL_CUSTO)) 
							&&(hidden_aprovGestorObra == 'aprovado')
							&&(atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA)){
							log.info("VALIDA APROVAÇÃO GERENTE DE CONTRATO MAIOR PORTE = RETURN : INCORPORACAO_ORCAMENTO_VERSAO_ATIVA");
							return 'INCORPORACAO_ORCAMENTO_VERSAO_ATIVA';
						}else if((hidden_aprovGestorObra == 'aprovado')
							&& (atividadeAprovada == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA)){
							log.info("VALIDA APROVAÇÃO GERENTE DE CONTRATO MAIOR PORTE = RETURN : ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT");
							return 'ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT';
						}
		
						log.info("20###WORC02-aprovacaoAlcadaDesviosInternos ------ +atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT:= "+(atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT));	
						//VALIDA APROVAÇÃO NA ALCADA DO DIRETOR DE ENGENHARIA MAIOR PORTE
						log.info("19.1###WORC02-aprovacaoAlcadaDesviosInternos ------ ProjEmModoCritico:= "+ProjEmModoCritico);
						log.info("19.2###WORC02-aprovacaoAlcadaDesviosInternos ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
						log.info("19.3###WORC02-aprovacaoAlcadaDesviosInternos ------ (alcadaVariacaoAcumulada(varAcumInterMaiorDiretor, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumInterMaiorDiretor, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)));
						log.info("19.4###WORC02-aprovacaoAlcadaDesviosInternos ------ (alcadaVariacaoIndividual(varIndivInterMaiorDiretor , vlrTotalInvestimento, VLR_TOTAL_CUSTO)):= "+(alcadaVariacaoIndividual(varIndivInterMaiorDiretor , vlrTotalInvestimento, VLR_TOTAL_CUSTO)));
						log.info("19.5###WORC02-aprovacaoAlcadaDesviosInternos ------ (hidden_aprovDiretorOperac == 'aprovado')&&(hidden_aprovDiretorComerc == 'aprovado'):= "+((hidden_aprovDiretorOperac == 'aprovado')&&(hidden_aprovDiretorComerc == 'aprovado')));
						log.info("19.6###WORC02-aprovacaoAlcadaDesviosInternos ------ ((atividadeAprovada == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE)||(atividadeAprovada == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE)):= "+((atividadeAprovada == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE)||(atividadeAprovada == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE)));
						
						
					if((ProjEmModoCritico == false)
							&&(alcadaVariacaoAcumulada(varAcumInterMaiorDiretor, vlrTotalInvestimento,VLR_TOTAL_CUSTO, CODCCUSTO_SOLICITACAO)) 
							&&(alcadaVariacaoIndividual(varIndivInterMaiorDiretor , vlrTotalInvestimento, VLR_TOTAL_CUSTO)) 
							&&((hidden_aprovDiretorOperac == 'aprovado') && (hidden_aprovDiretorComerc == 'aprovado'))
							&&((atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT) || (atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_COMERCIAL_INT))){
						log.info("VALIDA APROVAÇÃO DIRETOR MAIOR PORTE = RETURN : INCORPORACAO_ORCAMENTO_VERSAO_ATIVA");
							return 'INCORPORACAO_ORCAMENTO_VERSAO_ATIVA';
						}else if(((hidden_aprovDiretorOperac == 'aprovado') && (hidden_aprovDiretorComerc == 'aprovado'))
							&& ((atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT) || (atividadeAprovada == ANALISE_TRATAMENTO_APROV_DIR_COMERCIAL_INT))){
							log.info("VALIDA APROVAÇÃO DIRETOR MAIOR PORTE = RETURN : ANALISE_APROV_PRESIDENCIA_MIP");
							return 'ANALISE_APROV_PRESIDENCIA_MIP';
						}
						

					log.info("20-aprovacaoAlcadaDesviosInternos -#  atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP = "+(atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP));
					//VALIDA APROVAÇÃO NA ALCADA DO PRESIDENTE  MENOR PORTE
					
					log.info("20.1###WORC02-aprovacaoAlcadaDesviosInternos ------ (hidden_aprovPresidenciaMIP == 'aprovado'):= "+(hidden_aprovPresidenciaMIP == 'aprovado'));
					log.info("20.2###WORC02-aprovacaoAlcadaDesviosInternos ------ (atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP):= "+(atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP));
				
						 if((hidden_aprovPresidenciaMIP == 'aprovado')
							&& (atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP)){
							return 'INCORPORACAO_ORCAMENTO_VERSAO_ATIVA';
						}
						
				}else{
					throw 'ERROR - Falha na definição de parâmetros Maior / Menor Porte';
				}
			//}catch(e){
			//	throw e;
			//}
	}

function converteValorMoeda(valor) {
	var newValor = valor.replace(".", "");
	newValor = newValor.replace(",", ".");
	return newValor;
}

function alcadaVariacaoAcumulada(percentLimite , vlrTotalInvestimentoForm,num2, CODCCUSTO_SOLICITACAO){
	log.info("1###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoAcumulada ----- percentLimite:= "+percentLimite);
	log.info("2###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoAcumulada ----- vlrTotalInvestimentoForm:= "+vlrTotalInvestimentoForm);
	log.info("3###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoAcumulada ----- num2:= "+num2);
	log.info("4###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoAcumulada ----- CODCCUSTO_SOLICITACAO:= "+CODCCUSTO_SOLICITACAO);
	

	var IDPRJ = hAPI.getCardValue("IDPRJ");
	var origemMudancaSolicitacao = hAPI.getCardValue("origemMudanca");
	var ANOCRIACAO = hAPI.getCardValue("anoCriacao");
	var NUMEROOBRA = hAPI.getCardValue("numObra");
	
	
	var a1 = DatasetFactory.createConstraint('ANOCRIACAO', ANOCRIACAO, ANOCRIACAO, ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint('NUMEROOBRA', NUMEROOBRA, NUMEROOBRA, ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint('CODCCUSTO', CODCCUSTO_SOLICITACAO, CODCCUSTO_SOLICITACAO, ConstraintType.MUST);
	var a4 = DatasetFactory.createConstraint('IDPRJ', IDPRJ, IDPRJ, ConstraintType.MUST);
	var constraintsForm2 = new Array(a1, a2, a3, a4);
	var somatorioVlrTotal = 0;
	var datasetForm2 = DatasetFactory.getDataset( 'ds_VwMIP_WORC02_GERENCIAMENTO_MUDANCAS', null, constraintsForm2, null);
	log.info("5###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoAcumulada ----- datasetForm2.rowsCount:= "+datasetForm2.rowsCount);
		for (var i = 0; i < datasetForm2.rowsCount; i++) {
			var status = datasetForm2.getValue(i, "status");
			var origemMudanca = datasetForm2.getValue(i, "origemMudanca");
			var vlrTotalInvestimento = parseFloat(converteValorMoeda(datasetForm2.getValue(i, "vlrTotalInvestimento")));
			log.info("6###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoAcumulada ----- status:= "+status);
			log.info("7###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoAcumulada ----- vlrTotalInvestimento:= "+vlrTotalInvestimento);
			  if((origemMudancaSolicitacao == origemMudanca) && (status == 'finalizadoExecucaoMipECliente' || status == 'aprovadoExecucaoMipECliente'
				  || status == 'extEmNegociClienteExecAprovMip'|| status == 'intFinalizadaMip' || status == 'intAprovadaMip')){
				  somatorioVlrTotal += vlrTotalInvestimento;
				  log.info("8###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoAcumulada ----- somatorioVlrTotal:= "+somatorioVlrTotal);
			  }
		}
		
		var percentCalculada = ((parseFloat(somatorioVlrTotal) + parseFloat(vlrTotalInvestimentoForm)) * 100) / parseFloat(num2);
		log.info("9###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoAcumulada ----- percentCalculada:= "+percentCalculada);
		if(parseFloat(percentCalculada) <= parseFloat(percentLimite)){
			log.info("10###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoAcumulada ----- return true ");
			return true;
		}else {
			log.info("11###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoAcumulada ----- return false ");
			return false;
		}
}

function alcadaVariacaoIndividual(percentLimite, num1, num2){
	log.info("1###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoIndividual ----- percentLimite:= "+percentLimite);
	log.info("2###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoIndividual ----- num1:= "+num1);
	log.info("3###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoIndividual ----- num2:= "+num2);
	var percentCalculada = (parseFloat(num1) * 100) / parseFloat(num2);
	log.info("4###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoIndividual ----- percentCalculada:= "+percentCalculada);
	log.info("5###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoIndividual ----- (percentLimite <= percentCalculada):= "+(percentLimite <= percentCalculada));
	if(parseFloat(percentCalculada) <= parseFloat(percentLimite)){
		log.info("6###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoIndividual ----- return true ");
		return true;
	}else {
		log.info("7###WORC02-aprovacaoAlcadaDesviosInternos - alcadaVariacaoIndividual ----- return false ");
		return false;
	}	
}





