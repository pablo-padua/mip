function aprovacaoAlcadaInicioExecucao(){
	var ProjEmModoCritico = false;
	 log.info("1###WORC02-aprovacaoAlcadaInicioExecucao ------ INICIO");
	 var atividadeAprovada = hAPI.getCardValue("atividadeAprovadaExecucao");
	 log.info("3###WORC02-aprovacaoAlcadaInicioExecucao ------ atividadeAprovadaExecucao= "+atividadeAprovada);
		if(atividadeAprovada == APROVACAO_CLIENTE_MERITO_TAC_PLEITO){
			return 'INICIO_PARALELO_DIR_EXECUCAO';
		}
	 
	 //try{
	 
	var datasetValCritico = DatasetFactory.getDataset("ds_ConsultaRM_WS191_RetornaProjetosCadastradosTOP", null, null, null);
	var CODCCUSTO_SOLICITACAO = hAPI.getCardValue("CODCCUSTO");
	
	for (var k = 0; k < datasetValCritico.rowsCount; k++) {
		var ATIVAR_CRITICO = datasetValCritico.getValue(k, "ATIVAR_CRITICO");
		var CODCCUSTO = datasetValCritico.getValue(k, "CODCCUSTO");
		 log.info("4###WORC02-aprovacaoAlcadaInicioExecucao ------ CODCCUSTO= "+CODCCUSTO);
		 log.info("5###WORC02-aprovacaoAlcadaInicioExecucao ------ CODCCUSTO_SOLICITACAO= "+CODCCUSTO_SOLICITACAO);
		 if(CODCCUSTO == undefined || CODCCUSTO == null || CODCCUSTO == ''){
			 throw 'ERROR - Falha na consulta dos dados do Projeto junto ao RM. Favor acionar o Suporte TI';
			}
		if(CODCCUSTO == CODCCUSTO_SOLICITACAO){
			if(ATIVAR_CRITICO == 'T'){
				 ProjEmModoCritico = true;
				 log.info("888###WORC02-aprovacaoAlcadaInicioExecucao ------ ProjEmModoCritico= "+ProjEmModoCritico);
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
	log.info("6###WORC02-aprovacaoAlcadaInicioExecucao ------ datasetForm.rowsCount:= "+datasetForm.rowsCount);
	if(datasetForm.rowsCount){
		for (var i = 0; i < datasetForm.rowsCount; i++) {
			  vlrCorteMaiorMenorInterno = parseFloat(converteValorMoeda(datasetForm.getValue(i, "vlrCorteMaiorMenorInterno"))).toFixed(2);
			  vlrCorteMaiorMenorExterno = parseFloat(converteValorMoeda(datasetForm.getValue(i, "vlrCorteMaiorMenorExterno"))).toFixed(2);
			  		  
			  log.info("7###WORC02-aprovacaoAlcadaInicioExecucao ------ vlrCorteMaiorMenorInterno:= "+vlrCorteMaiorMenorInterno);
			  log.info("8###WORC02-aprovacaoAlcadaInicioExecucao ------ vlrCorteMaiorMenorExterno:= "+vlrCorteMaiorMenorExterno);
			  
			  
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
			
			var hidden_aprovDirOperacExec = hAPI.getCardValue("hidden_aprovDirOperacExec");
			var hidden_aprovDirComercExec = hAPI.getCardValue("hidden_aprovDirComercExec");
			var hidden_aprovPresidMIPExec = hAPI.getCardValue("hidden_aprovPresidMIPExec");
		
			
			
			//VALIDA ATIVIDADE ENCAMINHADA PARA AJUSTE
			if(hidden_aprovDirOperacExec == 'rejeitar'
				|| hidden_aprovDirComercExec == 'rejeitar'
					|| hidden_aprovPresidMIPExec == 'rejeitar'){
				return 'FIM_PARALELO_EXECUCAO142';
			}
			
			var atividade = getValue('WKCurrentState');
			log.info("9###WORC02-aprovacaoAlcadaInicioExecucao ------ atividade:= "+atividade);
			log.info("10###WORC02-aprovacaoAlcadaInicioExecucao ------ atividadeAprovada:= "+atividadeAprovada);
			log.info("12###WORC02-aprovacaoAlcadaInicioExecucao ------ vlrTotalInvestimento:= "+vlrTotalInvestimento);
			log.info("13###WORC02-aprovacaoAlcadaInicioExecucao ------ vlrCorteMaiorMenorExterno:= "+vlrCorteMaiorMenorExterno);
			
			//DEFININDO CAMINHO MAIOR / MENOR PORTE
			if(vlrTotalInvestimento <=  vlrCorteMaiorMenorExterno){
				log.info("99###WORC02-aprovacaoAlcadaInicioExecucao ------ vlrTotalInvestimento <=  vlrCorteMaiorMenorExterno:= "+(vlrTotalInvestimento <=  vlrCorteMaiorMenorExterno));
				log.info("14###WORC02-aprovacaoAlcadaInicioExecucao ------ ((atividadeAprovada == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC)||(atividadeAprovada == ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC)):= "+((atividadeAprovada == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC)||(atividadeAprovada == ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC)));
				//VALIDA APROVAÇÃO NA ALCADA ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC 
				
				log.info("14.1###WORC02-aprovacaoAlcadaInicioExecucao ------ ProjEmModoCritico:= "+ProjEmModoCritico);
				log.info("14.2###WORC02-aprovacaoAlcadaInicioExecucao ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
				log.info("14.3###WORC02-aprovacaoAlcadaInicioExecucao ------ (alcadaVariacaoAcumulada(varAcumExterMenorGestContrato, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumExterMenorGestContrato, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)));
				log.info("14.4###WORC02-aprovacaoAlcadaInicioExecucao ------ (alcadaVariacaoIndividual(varIndivExterMenorGestContrato , vlrTotalInvestimento, VLR_TOTAL_VENDA)):= "+(alcadaVariacaoIndividual(varIndivExterMenorGestContrato , vlrTotalInvestimento, VLR_TOTAL_VENDA)));
				log.info("14.5###WORC02-aprovacaoAlcadaInicioExecucao ------ ((hidden_aprovDirOperacExec == 'aprovado')&&(hidden_aprovDirComercExec == 'aprovado'))):= "+((hidden_aprovDirOperacExec == 'aprovado')&&(hidden_aprovDirComercExec == 'aprovado')));
				log.info("14.6###WORC02-aprovacaoAlcadaInicioExecucao ------ ((atividadeAprovada == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC)||(atividadeAprovada == ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC))= "+((atividadeAprovada == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC)||(atividadeAprovada == ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC)));
				
				if((ProjEmModoCritico == false)
						&&(alcadaVariacaoAcumulada(varAcumExterMenorGestContrato, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO))
						&& (alcadaVariacaoIndividual(varIndivExterMenorGestContrato , vlrTotalInvestimento, VLR_TOTAL_VENDA)) 
						&& ((hidden_aprovDirOperacExec == 'aprovado')&&(hidden_aprovDirComercExec == 'aprovado'))
						&& ((atividadeAprovada == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC)||(atividadeAprovada == ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC))){
					log.info("VALIDA APROVAÇÃO EXECUCAO OPERACIONAL DIRETOR DE ENGENHARIA MENOR PORTE EXTERNO = RETURN : FIM_PARALELO_EXECUCAO173");
					hAPI.setCardValue("hidden_AprovacaoInicioExecucao", 'aprovado');
					
					return 'FIM_PARALELO_EXECUCAO173';
				}else if(hidden_aprovDirOperacExec == 'aprovado'
					&& atividadeAprovada == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC){
					log.info("VALIDA APROVAÇÃO EXECUCAO OPERACIONAL DIRETOR DE ENGENHARIA MENOR PORTE EXTERNO= RETURN : ANALISE_TRATAMENTO_APROV_GESTOR_OBRA");
					return 'ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC';
				}

				log.info("17-aprovacaoAlcadaInicioExecucao -#  atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC = "+(atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC));
				//VALIDA APROVAÇÃO NA ALCADA DO PRESIDENTE  EXTERNO MENOR PORTE
				
				log.info("17.1###WORC02-aprovacaoAlcadaInicioExecucao ------ (hidden_aprovPresidenciaMIP == 'aprovado'):= "+(hidden_aprovPresidMIPExec == 'aprovado'));
				log.info("17.2###WORC02-aprovacaoAlcadaInicioExecucao ------ atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP):= "+(atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC));
			
			
				 if((hidden_aprovPresidMIPExec == 'aprovado')
					&& (atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC)){
					 log.info("VALIDA APROVAÇÃO NA ALCADA DO PRESIDENTE MENOR PORTE = RETURN : INCORPORACAO_ORCAMENTO_VERSAO_ATIVA");
					 hAPI.setCardValue("hidden_AprovacaoInicioExecucao", 'aprovado');
					 return 'FIM_PARALELO_EXECUCAO173';
				}
				
				
				
			}else if(vlrTotalInvestimento > vlrCorteMaiorMenorExterno){
				log.info("99###WORC02-aprovacaoAlcadaInicioExecucao ------ vlrTotalInvestimento > vlrCorteMaiorMenorExterno:= "+(vlrTotalInvestimento > vlrCorteMaiorMenorExterno));
				log.info("14###WORC02-aprovacaoAlcadaInicioExecucao ------ ((atividadeAprovada == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC)||(atividadeAprovada == ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC)):= "+((atividadeAprovada == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC)||(atividadeAprovada == ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC)));
				//VALIDA APROVAÇÃO NA ALCADA ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC 
				
				log.info("14.1###WORC02-aprovacaoAlcadaInicioExecucao ------ ProjEmModoCritico:= "+ProjEmModoCritico);
				log.info("14.2###WORC02-aprovacaoAlcadaInicioExecucao ------ (ProjEmModoCritico == false):= "+(ProjEmModoCritico == false));
				log.info("14.3###WORC02-aprovacaoAlcadaInicioExecucao ------ (alcadaVariacaoAcumulada(varAcumExterMenorGestContrato, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)):= "+ (alcadaVariacaoAcumulada(varAcumExterMaiorGestContrato, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO)));
				log.info("14.4###WORC02-aprovacaoAlcadaInicioExecucao ------ (alcadaVariacaoIndividual(varIndivExterMenorGestContrato , vlrTotalInvestimento, VLR_TOTAL_VENDA)):= "+(alcadaVariacaoIndividual(varIndivExterMaiorGestContrato , vlrTotalInvestimento, VLR_TOTAL_VENDA)));
				log.info("14.5###WORC02-aprovacaoAlcadaInicioExecucao ------ ((hidden_aprovDirOperacExec == 'aprovado')&&(hidden_aprovDirComercExec == 'aprovado'))):= "+((hidden_aprovDirOperacExec == 'aprovado')&&(hidden_aprovDirComercExec == 'aprovado')));
				log.info("14.6###WORC02-aprovacaoAlcadaInicioExecucao ------ ((atividadeAprovada == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC)||(atividadeAprovada == ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC))= "+((atividadeAprovada == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC)||(atividadeAprovada == ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC)));
				
				if((ProjEmModoCritico == false)
						&&(alcadaVariacaoAcumulada(varAcumExterMaiorGestContrato, vlrTotalInvestimento,VLR_TOTAL_VENDA, CODCCUSTO_SOLICITACAO))
						&& (alcadaVariacaoIndividual(varIndivExterMaiorGestContrato , vlrTotalInvestimento, VLR_TOTAL_VENDA)) 
						&& ((hidden_aprovDirOperacExec == 'aprovado')&&(hidden_aprovDirComercExec == 'aprovado'))
						&& ((atividadeAprovada == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC)||(atividadeAprovada == ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC))){
					log.info("VALIDA APROVAÇÃO EXECUCAO OPERACIONAL DIRETOR DE ENGENHARIA MENOR PORTE EXTERNO = RETURN : FIM_PARALELO_EXECUCAO173");
					hAPI.setCardValue("hidden_AprovacaoInicioExecucao", 'aprovado');
					
					return 'FIM_PARALELO_EXECUCAO173';
				}else if(hidden_aprovDirOperacExec == 'aprovado'
					&& atividadeAprovada == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC){
					log.info("VALIDA APROVAÇÃO EXECUCAO OPERACIONAL DIRETOR DE ENGENHARIA MENOR PORTE EXTERNO= RETURN : ANALISE_TRATAMENTO_APROV_GESTOR_OBRA");
					return 'ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC';
				}

	
					
				log.info("20-aprovacaoAlcadaInicioExecucao -# atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC = "+(atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC));
				//VALIDA APROVAÇÃO NA ALCADA DO PRESIDENTE  MENOR PORTE
				
				log.info("20.1###WORC02-aprovacaoAlcadaInicioExecucao ------ (hidden_aprovPresidMIPExec == 'aprovado'):= "+(hidden_aprovPresidMIPExec == 'aprovado'));
				log.info("20.2###WORC02-aprovacaoAlcadaInicioExecucao ------ (atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE):= "+(atividadeAprovada == ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE));
			
					 if((hidden_aprovPresidMIPExec == 'aprovado')
						&& (atividadeAprovada == ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC)){
						 hAPI.setCardValue("hidden_AprovacaoInicioExecucao", 'aprovado');
						 return 'FIM_PARALELO_EXECUCAO173';
					}
					
			}else{
				throw 'ERROR - Falha na definição de parâmetros Maior / Menor Porte';
			}
		//}catch(e){
		//	throw e;
		//}
}





