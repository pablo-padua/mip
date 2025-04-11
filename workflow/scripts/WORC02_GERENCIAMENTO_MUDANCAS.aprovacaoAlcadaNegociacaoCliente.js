function aprovacaoAlcadaNegociacaoCliente(){
	var ProjEmModoCritico = false;
	 log.info("1###WORC02-aprovacaoAlcadaNegociacaoCliente ------ INICIO");
	 var atividadeAprovada = hAPI.getCardValue("atividadeAprovadaVlrPrazo");
	 var hidden_aprovClienteVlrPrazo = hAPI.getCardValue("hidden_aprovClienteVlrPrazo");

	 log.info("3###WORC02-aprovacaoAlcadaNegociacaoCliente ------ atividadeAprovadaVlrPrazo= "+atividadeAprovada);
		if(hidden_aprovClienteVlrPrazo == 'aprovado'){
			hAPI.setCardValue("hidden_aprovClienteVlrPrazo", '');
			return 'INICIO_PARALELO_DIR_APROV_VALOR_PRAZO';
		}
	 
		if(hAPI.getCardValue("hidden_AprovNegocClienteExec") == 'ajustarNegocCliente'){
			return 'NEGOCIACAO_CLIENTE_APROV_VLR_PRAZO_EXECUCAO';
		}else if(hAPI.getCardValue("hidden_AprovNegocClienteExec") =='reavaliarValores'){
			return 'VALIDAR_NECESSIDADE_CGM_COMPLEMENTAR';
		}
		
		 //try{
		 
		var datasetValCritico = DatasetFactory.getDataset("ds_ConsultaRM_WS191_RetornaProjetosCadastradosTOP", null, null, null);
		var CODCCUSTO_SOLICITACAO = hAPI.getCardValue("CODCCUSTO");
		
		for (var k = 0; k < datasetValCritico.rowsCount; k++) {
			var ATIVAR_CRITICO = datasetValCritico.getValue(k, "ATIVAR_CRITICO");
			var CODCCUSTO = datasetValCritico.getValue(k, "CODCCUSTO");if(CODCCUSTO == undefined || CODCCUSTO == null || CODCCUSTO == ''){
				throw 'ERROR - Falha na consulta dos dados do Projeto junto ao RM. Favor acionar o Suporte TI';
			}
			 log.info("4###WORC02-aprovacaoAlcadaNegociacaoCliente ------ CODCCUSTO= "+CODCCUSTO);
			 log.info("5###WORC02-aprovacaoAlcadaNegociacaoCliente ------ CODCCUSTO_SOLICITACAO= "+CODCCUSTO_SOLICITACAO);

			if(CODCCUSTO == CODCCUSTO_SOLICITACAO){
				if(ATIVAR_CRITICO == 'T'){
					 ProjEmModoCritico = true;
					 log.info("888###WORC02-aprovacaoAlcadaNegociacaoCliente ------ ProjEmModoCritico= "+ProjEmModoCritico);
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
		log.info("6###WORC02-aprovacaoAlcadaNegociacaoCliente ------ datasetForm.rowsCount:= "+datasetForm.rowsCount);
		if(datasetForm.rowsCount){
			for (var i = 0; i < datasetForm.rowsCount; i++) {
				  vlrCorteMaiorMenorInterno = parseFloat(converteValorMoeda(datasetForm.getValue(i, "vlrCorteMaiorMenorInterno"))).toFixed(2);
				  vlrCorteMaiorMenorExterno = parseFloat(converteValorMoeda(datasetForm.getValue(i, "vlrCorteMaiorMenorExterno"))).toFixed(2);
				  		  
				  log.info("7###WORC02-aprovacaoAlcadaNegociacaoCliente ------ vlrCorteMaiorMenorInterno:= "+vlrCorteMaiorMenorInterno);
				  log.info("8###WORC02-aprovacaoAlcadaNegociacaoCliente ------ vlrCorteMaiorMenorExterno:= "+vlrCorteMaiorMenorExterno);
				  
				  
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
				
				
				
				var hidden_aprovDirOperacVlrPrazo = hAPI.getCardValue("hidden_aprovDirOperacVlrPrazo");
				var hidden_aprovDirComercVlrPrazo = hAPI.getCardValue("hidden_aprovDirComercVlrPrazo");
				var hidden_aprovPresidMIPVlrPrazo = hAPI.getCardValue("hidden_aprovPresidMIPVlrPrazo");
			
		
				
				//VALIDA ATIVIDADE ENCAMINHADA PARA AJUSTE
				//if(hidden_aprovDirOperacVlrPrazo == 'ajustarTodaCGM'
				//	|| hidden_aprovDirComercVlrPrazo == 'ajustarTodaCGM'
				//		|| hidden_aprovPresidMIPVlrPrazo == 'ajustarTodaCGM'){
				//	return 'FIM_PARALELO_EXECUCAO142';
				//}
				
			
				
				
				
				var atividade = getValue('WKCurrentState');
				log.info("9###WORC02-aprovacaoAlcadaNegociacaoCliente ------ atividade:= "+atividade);
				log.info("10###WORC02-aprovacaoAlcadaNegociacaoCliente ------ atividadeAprovada:= "+atividadeAprovada);
				log.info("11###WORC02-aprovacaoAlcadaNegociacaoCliente ------ vlrTotalInvestimento:= "+vlrTotalInvestimento);
				log.info("12###WORC02-aprovacaoAlcadaNegociacaoCliente ------ vlrCorteMaiorMenorExterno:= "+vlrCorteMaiorMenorExterno);
				
				//DEFININDO CAMINHO MAIOR / MENOR PORTE
				if(vlrTotalInvestimento <=  vlrCorteMaiorMenorExterno){
					log.info("<<<<<<<<###WORC02-aprovacaoAlcadaNegociacaoCliente ------ vlrTotalInvestimento <=  vlrCorteMaiorMenorExterno:= "+(vlrTotalInvestimento <=  vlrCorteMaiorMenorExterno));
			
					
					log.info("13-aprovacaoAlcadaInicioExecucao -#  atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL = "+(atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL));
					//VALIDA APROVAÇÃO NA ALCADA ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL
				
					log.info("14.1###WORC02-aprovacaoAlcadaNegociacaoCliente ------ ProjEmModoCritico:= "+ProjEmModoCritico);
					log.info("14.2###WORC02-aprovacaoAlcadaNegociacaoCliente ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
					log.info("14.3###WORC02-aprovacaoAlcadaNegociacaoCliente ------ (alcadaVariacaoAcumulada(varAcumExterMenorGestObras, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumExterMenorGestObras, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)));
					log.info("14.4###WORC02-aprovacaoAlcadaNegociacaoCliente ------ (alcadaVariacaoIndividual(varIndivExterMenorGestObras, vlrTotalInvestimento, VLR_TOTAL_VENDA)):= "+(alcadaVariacaoIndividual(varIndivExterMenorGestObras, vlrTotalInvestimento, VLR_TOTAL_VENDA)));
					log.info("14.5###WORC02-aprovacaoAlcadaNegociacaoCliente ------ ((hidden_aprovDirComercVlrPrazo == 'aprovado')&&(hidden_aprovDirOperacVlrPrazo == 'aprovado')):= "+((hidden_aprovDirComercVlrPrazo == 'aprovado')&&(hidden_aprovDirOperacVlrPrazo == 'aprovado')));
					log.info("14.6###WORC02-aprovacaoAlcadaNegociacaoCliente ------ ((atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL)||(atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA)):= "+((atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL)||(atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA)));
					
						if((ProjEmModoCritico == false)
								&&(alcadaVariacaoAcumulada(varAcumExterMenorGestObras, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO))
								&&(alcadaVariacaoIndividual(varIndivExterMenorGestObras, vlrTotalInvestimento, VLR_TOTAL_VENDA))
								&&((hidden_aprovDirComercVlrPrazo == 'aprovado')&&(hidden_aprovDirOperacVlrPrazo == 'aprovado'))
								&&((atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL)||(atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA))){
							log.info("VALIDA APROVAÇÃO ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL  MENOR PORTE EXTERNO = RETURN : FIM_PARALELO_EXECUCAO142");
							hAPI.setCardValue("hidden_AprovNegocClienteExec", 'aprovado');
							return 'FIM_PARALELO_EXECUCAO142';
					}else if(hidden_aprovDirComercVlrPrazo == 'aprovado'
						&& ((atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL)||(atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA))){
						log.info("VALIDA APROVAÇÃO EXECUCAO COMERCIAL PORTE EXTERNO EXTERNO= RETURN : ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL");
						return 'ANALISE_APROVACAO_PRESIDENCIA';
					}


					log.info("15-aprovacaoAlcadaInicioExecucao -#  atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA = "+(atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA));
					//VALIDA APROVAÇÃO NA ALCADA DO ANALISE_APROVACAO_PRESIDENCIA  EXTERNO MENOR PORTE
					
					log.info("15.1###WORC02-aprovacaoAlcadaNegociacaoCliente ------ (hidden_aprovPresidenciaMIP == 'aprovado'):= "+(hidden_aprovPresidMIPVlrPrazo == 'aprovado'));
					log.info("15.2###WORC02-aprovacaoAlcadaNegociacaoCliente ------ atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA):= "+(atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA));
				
				
					 if((hidden_aprovPresidMIPVlrPrazo == 'aprovado')
						&& (atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA)){
						 log.info("VALIDA FIM_PARALELO_EXECUCAO142DO PRESIDENTE MENOR PORTE = RETURN : FIM_PARALELO_EXECUCAO142");
						 hAPI.setCardValue("hidden_AprovNegocClienteExec", 'aprovado');
						 return 'FIM_PARALELO_EXECUCAO142';
					}
					
					
					
				}else if(vlrTotalInvestimento > vlrCorteMaiorMenorExterno){
					log.info(">>>>>>>>###WORC02-aprovacaoAlcadaNegociacaoCliente ------ vlrTotalInvestimento > vlrCorteMaiorMenorExterno:= "+(vlrTotalInvestimento > vlrCorteMaiorMenorExterno));
				
					log.info("16-aprovacaoAlcadaInicioExecucao -#  atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL = "+(atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL));
					//VALIDA APROVAÇÃO NA ALCADA ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL
				
					log.info("16.1###WORC02-aprovacaoAlcadaNegociacaoCliente ------ ProjEmModoCritico:= "+ProjEmModoCritico);
					log.info("16.2###WORC02-aprovacaoAlcadaNegociacaoCliente ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
					log.info("16.3###WORC02-aprovacaoAlcadaNegociacaoCliente ------ (alcadaVariacaoAcumulada(varAcumExterMaiorGestObras, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumExterMaiorGestObras, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)));
					log.info("16.4###WORC02-aprovacaoAlcadaNegociacaoCliente ------ (alcadaVariacaoIndividual(varIndivExterMaiorGestObras, vlrTotalInvestimento, VLR_TOTAL_VENDA)):= "+(alcadaVariacaoIndividual(varIndivExterMaiorGestObras, vlrTotalInvestimento, VLR_TOTAL_VENDA)));
					log.info("16.5###WORC02-aprovacaoAlcadaNegociacaoCliente ------ ((hidden_aprovDirComercVlrPrazo == 'aprovado')&&(hidden_aprovDirOperacVlrPrazo == 'aprovado')):= "+((hidden_aprovDirComercVlrPrazo == 'aprovado')&&(hidden_aprovDirOperacVlrPrazo == 'aprovado')));
					log.info("16.6###WORC02-aprovacaoAlcadaNegociacaoCliente ------ ((atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL)||(atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA)):= "+((atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL)||(atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA)));
					
						if((ProjEmModoCritico == false)
								&&(alcadaVariacaoAcumulada(varAcumExterMaiorGestObras, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO))
								&&(alcadaVariacaoIndividual(varIndivExterMaiorGestObras, vlrTotalInvestimento, VLR_TOTAL_VENDA))
								&&((hidden_aprovDirComercVlrPrazo == 'aprovado')&&(hidden_aprovDirOperacVlrPrazo == 'aprovado'))
								&&((atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL)||(atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA))){
							log.info("VALIDA APROVAÇÃO ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL  MENOR PORTE EXTERNO = RETURN : FIM_PARALELO_EXECUCAO142");
							hAPI.setCardValue("hidden_AprovNegocClienteExec", 'aprovado');
							return 'FIM_PARALELO_EXECUCAO142';
					}else if(hidden_aprovDirComercVlrPrazo == 'aprovado'
						&& (atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL)||(atividadeAprovada == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA)){
						log.info("VALIDA APROVAÇÃO EXECUCAO COMERCIAL PORTE EXTERNO EXTERNO= RETURN : ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL");
						return 'ANALISE_APROVACAO_PRESIDENCIA';
					}

		
						
					log.info("17-aprovacaoAlcadaNegociacaoCliente -# atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA = "+(atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA));
					//VALIDA APROVAÇÃO NA ALCADA DO PRESIDENTE  maior PORTE
					
					log.info("17.1###WORC02-aprovacaoAlcadaNegociacaoCliente ------ (hidden_aprovPresidMIPVlrPrazo == 'aprovado'):= "+(hidden_aprovPresidMIPVlrPrazo == 'aprovado'));
					log.info("17.2###WORC02-aprovacaoAlcadaNegociacaoCliente ------ (atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE):= "+(atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA));
				
						 if((hidden_aprovPresidMIPVlrPrazo == 'aprovado')
							&& (atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA)){
							 log.info("VALIDA FIM_ANALISE_APROVACAO_PRESIDENCIAPRESIDENTE MAIOR PORTE = RETURN : FIM_PARALELO_EXECUCAO142");
							 hAPI.setCardValue("hidden_AprovNegocClienteExec", 'aprovado');
							 return 'FIM_PARALELO_EXECUCAO142';
						}
						
				}else{
					throw 'ERROR - Falha na definição de parâmetros Maior / Menor Porte';
				}
			//}catch(e){
			//	throw e;
			//}
}





