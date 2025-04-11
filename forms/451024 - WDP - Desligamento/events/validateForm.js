function validateForm(form){
	
	var atividade = getValue("WKNumState"); 
	
	//if(getValue("WKManagerMode") == "true" && (atividade == 341 || atividade == 243 || atividade == 356 || atividade == 366) ) return true;	

	var NEXT_STATE = getValue("WKNextState");
	var COMPLETED_TASK = (getValue("WKCompletTask")=="true");
	
	if (!COMPLETED_TASK || atividade == NEXT_STATE) {
		return;
	}	
	
	var Errors = [];
	var msg = '';
	
	if (atividade == 0 || atividade == 4){
		
		valida("nomeSolicitante", i18n.translate("text.nomeSolicitante"));
		valida("dataSolicitacao", i18n.translate("text.dataSolicitacao"));	
		valida("obraSetor", i18n.translate("text.obraSetor"));	
		valida("chapa", i18n.translate("text.chapa"));	
		valida("funcionario", i18n.translate("text.funcionario"));	
		valida("funcao", i18n.translate("text.funcao"));
		valida("secao", i18n.translate("text.secao"));
		valida("dataAdmissao", i18n.translate("text.dataAdmissao"));
		valida("centroCusto", i18n.translate("text.centroCusto"));
		valida("motivoDemissao", i18n.translate("text.descMotivoDemissao"));
		valida("motivoDemissaoRM", i18n.translate("text.motivoDemissao"));
		
		var dup = verificaDuplicidade(form.getValue("codColigada"), form.getValue("chapa"));
		if(dup != "false")
			Errors.push("- Foi encontrado um processo em aberto no FLUIG: " + dup);
		
		valida("dataPrevistaDemissao", i18n.translate("text.dataPrevistaDemissao"));
		valida("avisoPrevio", i18n.translate("text.avisoPrevio"));
		if(form.getValue("avisoPrevio") == "sim"){
			validaPeriodoExp();
			valida("tipoReducao", i18n.translate("text.reducaoAviso"));
		}	

		var motivoDemissaoRM = form.getValue("motivoDemissaoRM");
		
		if(motivoDemissaoRM != "9"){

			valida("difPositivo", i18n.translate("text.difPositivo"));
			if(form.getValue("difPositivo") == "sim"){
				valida("descDifPositivo", i18n.translate("text.descDifPositivo"));
			}
			valida("substituicao", i18n.translate("text.substituicao"));
			validaBolleano("validaResticao", i18n.translate("text.restricoes"));
			if(form.getValue("semRestr").trim() == "0" || form.getValue("semRestr").trim() == "") {        
				valida("descRestricoes", i18n.translate("text.descRestricoes"));
		    }		
			
			var aberturaDP = form.getValue("aberturaDP");
			if(aberturaDP.trim() != 'sim'){
				var indexes = form.getChildrenIndexes("tbAvaliacao");
			    if (indexes.length > 0) {
			        for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
			            if(form.getValue('valorAvaliacao___' + indexes[i]) == null || form.getValue('valorAvaliacao___' + indexes[i]) == '') {
			            	 Errors.push("Quest\u00e3o "+ indexes[i] + " do question\u00e1rio n\u00e3o respondida ");
			            }
			        }
			    }
			}		    
			//validaBolleano("validaAvaliacao", i18n.translate("text.itemQuestioario"));
			
			if(form.getValue("aprovador1Alcada") == '' && form.getValue("aprovador2Alcada") == '') {
		        Errors.push("- Não foi encontrado aprovadores para a demissão desse funcionário");
		    }
		}
		
		if(form.getValue("motivoDemissaoRM") == "6"){
				if(form.getValue("avisoPrevio") == "sim"){
					valida("dataInicioAviso", i18n.translate("text.dataInicioAviso"));
					valida("dataDemissaoPrevista", i18n.translate("text.dataDemissaoPrevista"));
				}
		}
	
		
	} else if (atividade == 16){
		valida("aprovacao", i18n.translate("text.aprovado"));		
		if(form.getValue("aprovacao") == "nao"){
			valida("justificativa", i18n.translate("text.justificativa"));
		}
		
		if(form.getValue("aberturaDP") == "sim" && form.getValue("motivoDemissaoRM") != '9'){
			var indexes = form.getChildrenIndexes("tbAvaliacao");
		    if (indexes.length > 0) {
		        for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
		            if(form.getValue('valorAvaliacao___' + indexes[i]) == null || form.getValue('valorAvaliacao___' + indexes[i]) == '') {
		            	 Errors.push("Quest\u00e3o "+ indexes[i] + " do question\u00e1rio n\u00e3o respondida ");
		            }
		        }
		    }
		}
		
		valida("motivoDemissao", i18n.translate("text.descMotivoDemissao"));
		valida("motivoDemissaoRM", i18n.translate("text.motivoDemissao"));
		
		valida("difPositivo", i18n.translate("text.difPositivo"));
		if(form.getValue("difPositivo") == "sim"){
			valida("descDifPositivo", i18n.translate("text.descDifPositivo"));
		}				
		validaBolleano("validaResticao", i18n.translate("text.restricoes"));
		if(form.getValue("semRestr").trim() == "0" || form.getValue("semRestr").trim() == "") {
			valida("descRestricoes", i18n.translate("text.descRestricoes"));
	    }
		
		
	} else if (atividade == 429){

		valida("motivoDemissao", i18n.translate("text.descMotivoDemissao"));
		valida("motivoDemissaoRM", i18n.translate("text.motivoDemissao"));
		
		valida("difPositivo", i18n.translate("text.difPositivo"));
		if(form.getValue("difPositivo") == "sim"){
			valida("descDifPositivo", i18n.translate("text.descDifPositivo"));
		}				
		validaBolleano("validaResticao", i18n.translate("text.restricoes"));
		if(form.getValue("semRestr").trim() == "0" || form.getValue("semRestr").trim() == "") {
			valida("descRestricoes", i18n.translate("text.descRestricoes"));
	    }
		
		valida("aprovacaoVerificarAvaliacao", i18n.translate("text.aprovacaoVerificarAvaliacao"));
		if(form.getValue("aprovacaoVerificarAvaliacao") == "nao"){
			valida("justificaVerificarAvaliacao", i18n.translate("text.justificativa"));
		}

	}else if (atividade == 319){
		valida("aprovacao2", i18n.translate("text.aprovado"));		
		if(form.getValue("aprovacao2") == "nao"){
			valida("justificativa2", i18n.translate("text.justificativa"));
		}
		
		if(form.getValue("aberturaDP") == "sim" && form.getValue("motivoDemissaoRM") != '9'){
			var indexes = form.getChildrenIndexes("tbAvaliacao");
		    if (indexes.length > 0) {
		        for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
		            if(form.getValue('valorAvaliacao___' + indexes[i]) == null || form.getValue('valorAvaliacao___' + indexes[i]) == '') {
		            	 Errors.push("Quest\u00e3o "+ indexes[i] + " do question\u00e1rio n\u00e3o respondida ");
		            }
		        }
		    }
		}
		
		valida("motivoDemissao", i18n.translate("text.descMotivoDemissao"));
		valida("motivoDemissaoRM", i18n.translate("text.motivoDemissao"));
		
		valida("difPositivo", i18n.translate("text.difPositivo"));
		if(form.getValue("difPositivo") == "sim"){
			valida("descDifPositivo", i18n.translate("text.descDifPositivo"));
		}				
		validaBolleano("validaResticao", i18n.translate("text.restricoes"));
		if(form.getValue("semRestr").trim() == "0" || form.getValue("semRestr").trim() == "") {
			valida("descRestricoes", i18n.translate("text.descRestricoes"));
	    }
		
	} else if (atividade == 466){
		
		valida("aprovacaoSede", i18n.translate("text.aprovacaoSede"));		
		if(form.getValue("aprovacaoSede") == "nao"){
			valida("justificativaSede", i18n.translate("text.justificativa"));
		}
		
	}else if (atividade == 453){
		
		valida("aprovacaoRH", i18n.translate("text.aprovacaoRH"));
		if(form.getValue("aprovacaoRH") == "nao"){
			valida("justificativaRH", i18n.translate("text.justificativa"));
		}
		
	} else if (atividade == 75){		
		valida("dataAgendamento", i18n.translate("text.dataAgendamento"));
		valida("dataLimiteAtestado", i18n.translate("text.dataLimiteAtestado"));
		
	} else if (atividade == 254){
		
		if (form.getValue("realizado") == "nao"){
			
			valida("motivoEntrevista", i18n.translate("text.motivoEntrevista"));
			
			if (form.getValue("motivoEntrevista") == "motivoEntOutros")				
				valida("justificativaEntrevista", i18n.translate("text.justificativa"));
			
		}
		
	} else if (atividade == 227){
		valida("pendencia", i18n.translate("text.possuiPendencia"));
		if (form.getValue("pendencia") == "sim"){
			var index = form.getChildrenIndexes('tbQuitacaoTI');
			if (index.length == 0){
				Errors.push("\u00c9 necess\u00e1rio inserir pelo menos um item.");
			} else {
				validaPaiFilho("tbQuitacaoTI", "descPendenciaTI", "Descri\u00e7\u00e3o da pend\u00eancia deve ser preenchida");
				validaPaiFilho("tbQuitacaoTI", "valorPendenciaTI", "Valor da pend\u00eancia deve ser preenchido");
			}
		}
	} else if (atividade == 385){
		valida("pendenciaEPI", i18n.translate("text.possuiPendencia"));			
		if (form.getValue("pendenciaEPI") == "sim"){
			var index = form.getChildrenIndexes('tbQuitacaoEPI');
			if (index.length == 0){
				Errors.push("\u00c9 necess\u00e1rio inserir pelo menos um item.");
			} else {
				validaPaiFilho("tbQuitacaoEPI", "descPendenciaEPI", "Descri\u00e7\u00e3o da pend\u00eancia deve ser preenchida");
				validaPaiFilho("tbQuitacaoEPI", "valorPendenciaEPI", "Valor da pend\u00eancia deve ser preenchido");
			}
		}
	} else if (atividade == 237){
		valida("pendenciaADM", i18n.translate("text.possuiPendencia"));			
		if (form.getValue("pendenciaADM") == "sim"){
			var index = form.getChildrenIndexes('tbQuitacaoADM');
			if (index.length == 0){
				Errors.push("\u00c9 necess\u00e1rio inserir pelo menos um item.");
			} else {
				validaPaiFilho("tbQuitacaoADM", "descPendenciaADM", "Descri\u00e7\u00e3o da pend\u00eancia deve ser preenchida");
				validaPaiFilho("tbQuitacaoADM", "valorPendenciaADM", "Valor da pend\u00eancia deve ser preenchido");
			}
		}
	} else if (atividade == 239){
		valida("pendenciaFIN", i18n.translate("text.possuiPendencia"));			
		if (form.getValue("pendenciaFIN") == "sim"){
			var index = form.getChildrenIndexes('tbQuitacaoFIN');
			if (index.length == 0){
				Errors.push("\u00c9 necess\u00e1rio inserir pelo menos um item.");
			} else {
				validaPaiFilho("tbQuitacaoFIN", "descPendenciaFIN", "Descri\u00e7\u00e3o da pend\u00eancia deve ser preenchida");
				validaPaiFilho("tbQuitacaoFIN", "valorPendenciaFIN", "Valor da pend\u00eancia deve ser preenchido");
			}
		}
	} else if (atividade == 243){
		if(form.getValue("tipo") == "obra"){
		valida("aprovCalculoObra", i18n.translate("text.aprovCalculoObra"));		
		if(form.getValue("aprovCalculoObra") == "nao"){
			valida("observacao", i18n.translate("text.observacao"));
		}
		}
		//valida("apto", "N\u00e3o foi encontrado Consulta Demissional ou Data de emiss\u00e3o do ASO cadastrado no TOTVS RM. Solicite ao setor de Medicina.");
	} else if (atividade == 341){

		
		 var tablename = form.getChildrenIndexes("tbCalculoObra");
		    tablename.forEach(function(i){
		    	var referenciaCalculoObraValue = form.getValue('referenciaCalculoObra___' + i);
		    	//log.info('form.getValue(referenciaCalculoObra___ + i====' + referenciaCalculoObraValue);
		    	
		    	var valorCalculoObraValue = form.getValue('valorCalculoObra___' + i);
		    	//log.info('form.getValue(valorCalculoObra___ + i====)' +valorCalculoObraValue);
		    	
		        if(referenciaCalculoObraValue  == '' && valorCalculoObraValue == ''){
		  
		        	Errors.push("- Necessário informar referência ou o Valor.");
				}
		    });
		    validaPaiFilho("tbCalculoObra", "codEvento", "Evento deve ser selecionado");
			validaPaiFilho("tbCalculoObra", "acaoCalculoObra", "A\u00e7\u00e3o do evento deve ser selecionado");
		
	} else if (atividade == 356){
		valida("aprovValidacaoObra", i18n.translate("text.aprovado"));
		if(form.getValue("aprovValidacaoObra") == "nao"){
			valida("justificativaValidacaoObra", i18n.translate("text.justificativa"));
		}
	} else if (atividade == 483){
		//valida("docAsoConcluida", i18n.translate("text.docAsoConcluida"));
		
	} else if (atividade == 366){
		valida("validacaoSede", i18n.translate("text.aprovado"));		
		if(form.getValue("validacaoSede") == "nao"){
			valida("justificativaValidacaoSede", i18n.translate("text.justificativa"));
		}
	} else if (atividade == 358){
		/*
		if(form.getValue("hiddenCompRealizarExames") != "nao"){
		valida("apto", "N\u00e3o foi encontrado Consulta Demissional ou Data de emiss\u00e3o do ASO cadastrado no TOTVS RM. Solicite ao setor de Medicina.");
		valida("dataPagamento", i18n.translate("text.dataPagamento"));		
		if(form.getValue("apto") != "Inapto"){
			if(form.getValue("referenciaRescisao") == ""
				&& form.getValue("valorRescisao") == ""
				&& form.getValue("historicoRescisao") == ""
				&& form.getValue("referenciaGRRF") == ""
				&& form.getValue("valorGRRF") == ""
				&& form.getValue("historicoGRRF") == ""){
				Errors.push("- N\u00e3o existem lan\u00e7amentos para esta data.");
			}
		}
		}
		*/
	
	} else if (atividade == 247){	
		/*	
		valida("dataAssinatura", i18n.translate("text.dataAssinatura"));
		
		if(form.getValue("rescisaoContrTrab") == "on"){
			valida("rescisaoContrTrab", i18n.translate("text.rescisaoContrTrab"));
		}	
		if(form.getValue("termoQuitacaohomol") == "on"){
			valida("termoQuitacaohomol", i18n.translate("text.termoQuitacaohomol"));
		}
		if(form.getValue("asoExameDemiss") == "on"){
			valida("asoExameDemiss", i18n.translate("text.asoExameDemiss"));
		}
		//if(form.getValue("comprDevolCTPS") == "on"){
		//	valida("comprDevolCTPS", i18n.translate("text.comprDevolCTPS"));
		//}
		if(form.getValue("avisoPrevPedDemissaoAss") == "on"){
			valida("avisoPrevPedDemissaoAss", i18n.translate("text.avisoPrevPedDemissaoAss"));
		}
		//if(form.getValue("cancelPlanoSaude") == "on"){
		//	valida("cancelPlanoSaude", i18n.translate("text.cancelPlanoSaude"));
		//}
		if(form.getValue("protEntregaPPP") == "on"){
			valida("protEntregaPPP", i18n.translate("text.protEntregaPPP"));
		}
		if(form.getValue("comprPagRescisao") == "on"){
			valida("comprPagRescisao", i18n.translate("text.comprPagRescisao"));
		}
		if(form.getValue("espelhoPonto") == "on"){
			valida("espelhoPonto", i18n.translate("text.espelhoPonto"));
		}
		if(form.getValue("fichaEPI") == "on"){
			valida("fichaEPI", i18n.translate("text.fichaEPI"));
		}
		if(form.getValue("grrfQuitada") == "on"){
			valida("grrfQuitada", i18n.translate("text.grrfQuitada"));
		}
		if(form.getValue("chaveConectivExtratoFGTS") == "on"){
			valida("chaveConectivExtratoFGTS", i18n.translate("text.chaveConectivExtratoFGTS"));
		}
		if(form.getValue("protEntrSegurDesemprego") == "on"){
			valida("protEntrSegurDesemprego", i18n.translate("text.protEntrSegurDesemprego"));
		}
		if(form.getValue("folhaQuitacao") == "on"){
			valida("folhaQuitacao", i18n.translate("text.folhaQuitacao"));
		}
	
		var index = form.getChildrenIndexes('anexosDoc');
		if (index.length == 0){
			Errors.push("\u00c9 necess\u00e1rio inserir pelo menos um Arquivo.");
		}
*/		
		
	}  	
	
	for (var i=0; i<Errors.length; i++){		
		msg+= "\n" + Errors[i];		
	}
	
	if (msg != ''){		
		throw "Os seguintes campos devem ser preenchidos: \n\n" + msg +"\n\n\n";
	}
	
	
	function valida(campo, mensagem) {    
	    if(form.getValue(campo) == '') {        
	        Errors.push("- "+mensagem);
	    }
	}
	
	function validaBolleano(campo, mensagem) {    
	    if(form.getValue(campo) == "false") {        
	        Errors.push("- "+mensagem);
	    }
	}

	function validaSelect(campo, mensagem) {    
	    if(form.getValue(campo) == 0) {        
	        Errors.push("- " + mensagem);
	    }
	}

	function validaPaiFilho(nomeTabela, campo, mensagem) {    
	    var tablename = form.getChildrenIndexes(nomeTabela);
	    tablename.forEach(function(i) {
	        
	        var value = form.getValue(campo + '___' + i);
	        
	        if(value == '' || value == 0) {
	            
	            Errors.push("- " + mensagem);
	        }
	    });
	}
	
	function verificaDuplicidade(CODCOLIGADA, CHAPA){
		
		var c1 = DatasetFactory.createConstraint("CODCOLIGADA", CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("CHAPA", CHAPA, CHAPA, ConstraintType.MUST);	
		var constraints = new Array(c1, c2);		
		var dataset = DatasetFactory.getDataset("dsVwMip_WRH03_WRH06_WRH07_EmAberto", null, constraints, null);
		
		if(dataset.rowsCount > 0)
			if(dataset.getValue(0, "PROCESSO") != "")
				return dataset.getValue(0, "PROCESSO") + " - " + dataset.getValue(0, "NUM_PROCES");
		
		return "false";
		
	}
	
	function validaPeriodoExp(){
		
		var dataAdmissao = form.getValue("dataAdmissao");
		dataAdmissao = new Date(dataAdmissao.split("/")[2], dataAdmissao.split("/")[1] - 1, dataAdmissao.split("/")[0]);

		var dataPrevistaDemissao = form.getValue("dataPrevistaDemissao");
		dataPrevistaDemissao = new Date(dataPrevistaDemissao.split("/")[2], dataPrevistaDemissao.split("/")[1] - 1, dataPrevistaDemissao.split("/")[0]);
		
		if(dataPrevistaDemissao < addDays(dataAdmissao, 90))
			Errors.push("- \"Data prevista do desligamento\" para menos de 90 dias da admissão. \"Aviso prévio trabalhado\" deve ser marcado como \"Não\"");
		
	}
	
}