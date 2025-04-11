function validateForm(form){

	/* Permite Tranferir e Salvar sem validar campos */
	var numState = getValue("WKNumState");
    var nextState = getValue("WKNextState");
		
	if(numState == nextState){
        return;
    }
	/* Permite Tranferir e Salvar sem validar campos */	
	
	var atividade = buscarAtividadeAtual();
	var Errors = [];
	var msg = '';
	
	if (atividade == INICIO || atividade == REVISAR_SOLICITACAO || atividade == QUALIFICACAO_IMPACTO_MUDANCA_PRAZO_CUSTO || atividade == PREPARACAO_REVISAO_CGM){

			valida("origemMudanca", i18n.translate("text.origemMudanca"));
			valida("nomeObra", i18n.translate("text.nomeObra"));
			valida("descricaoMudanca", i18n.translate("text.descricaoMudanca"));
			valida("razaoMudanca", i18n.translate("text.razaoMudanca"));
			valida("vlrTotalInvestimento", i18n.translate("text.vlrTotalInvestimento"));
			valida("sumarioCalculo", i18n.translate("text.sumarioCalculo"));
			valida("impactoCronograma", i18n.translate("text.impactoCronograma"));
			valida("altPrazosContrat", i18n.translate("text.altPrazosContrat"));
			valida("gerarAditivoContrat", i18n.translate("text.gerarAditivoContrat"));
			valida("prazoIniImplantAlt", i18n.translate("text.prazoIniImplantAlt"));
			valida("prazoFimImplantAlt", i18n.translate("text.prazoFimImplantAlt"));
			valida("descricaoImpacto", i18n.translate("text.descricaoImpacto"));
			valida("obsRelacaoContAditivados", i18n.translate("text.obsRelacaoContAditivados"));
			
			
			//valida("refContratual", i18n.translate("text.refContratual"));
			//valida("docFormalizador", i18n.translate("text.docFormalizador"));
			

	}else if(atividade == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO || atividade == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE){
		//valida("hidden_aprovGestorContrato", i18n.translate("text.parecer"));
		//if(form.getValue("hidden_aprovGestorContrato") == "ajustar"){	
		//		valida("justAprovGestorContrato", i18n.translate("text.justAprovGestorContrato"));
		//}
	}else if(atividade == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA || atividade == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE){
		valida("hidden_aprovGestorObra", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovGestorObra") == "ajustar"){	
				valida("justAprovGestorObra", i18n.translate("text.justAprovGestorObrav"));
		}
	}else if(atividade == VALIDAR_INFORMACOES_ADCON){
		valida("hidden_aprovADCon", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovADCon") == "ajustar"){	
				valida("justAprovADCon", i18n.translate("text.justAprovADCon"));
		}
	}else if(atividade == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT || atividade == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE){
		valida("hidden_aprovDiretorOperac", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovDiretorOperac") == "ajustar"){	
				valida("justAprovDiretorOperac", i18n.translate("text.justAprovDiretorOperac"));
		}
	}else if(atividade == ANALISE_APROV_PRESIDENCIA_MIP){
		valida("hidden_aprovPresidenciaMIP", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovPresidenciaMIP") == "ajustar"){	
				valida("justAprovPresidenciaMIP", i18n.translate("text.justAprovPresidenciaMIP"));
		}
	}else if(atividade == ANALISE_APROV_DIR_ADCON_MIP_APRESENTACAO_CLIENTE){
		valida("hidden_aprovADCon", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovADCon") == "ajustar"){	
				valida("justAprovADCon", i18n.translate("text.justAprovacao"));
		}
	}else if(atividade == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE){
		valida("hidden_aprovacaoDiretorDoc", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovacaoDiretorDoc") == "ajustar"){	
				valida("justAprovacaoDiretorDoc", i18n.translate("text.justAprovacao"));
		}
	}else if(atividade == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE || atividade == ANALISE_TRATAMENTO_APROV_DIR_COMERCIAL_INT){
		valida("hidden_aprovDiretorComerc", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovDiretorComerc") == "ajustar"){	
				valida("justAprovDiretorComerc", i18n.translate("text.justAprovacao"));
		}
	}else if(atividade == ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE){
		valida("hidden_aprovacaoDiretorDoc", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovacaoDiretorDoc") == "ajustar"){	
				valida("justAprovacaoDiretorDoc", i18n.translate("text.justAprovacao"));
		}
	}else if(atividade == APROVACAO_CLIENTE_MERITO_TAC_PLEITO){
		valida("hidden_aprovCliMeritoVlrPrazo", i18n.translate("text.parecer"));
		valida("nomeConatoClienteAprovador", i18n.translate("text.nomeConatoClienteAprovador"));
		valida("ObsAprovReprovCliente", i18n.translate("text.ObsAprovReprovCliente"));
		valida("telConatoClienteAprovador", i18n.translate("text.telConatoClienteAprovador"));
		if(form.getValue("hidden_aprovCliMeritoVlrPrazo") == "aprovado"){
			valida("controleAddDocAtiv", i18n.translate("text.controleAddDocAtiv"));
		}
		
		
	}else if(atividade == NEGOCIACAO_CLIENTE_APROV_VLR_PRAZO_EXECUCAO){
		valida("hidden_aprovClienteVlrPrazo", i18n.translate("text.parecer"));
		valida("nomeConatoClienteVlrPrazo", i18n.translate("text.nomeConatoClienteVlrPrazo"));
		valida("ObsAprovVlrPrazo", i18n.translate("text.ObsAprovVlrPrazo"));
		valida("telConatoClienteVlrPrazo", i18n.translate("text.telConatoClienteVlrPrazo"));
		if(form.getValue("hidden_aprovacaoDiretorDoc") == "aprovado"){
			valida("controleAddDocAtiv", i18n.translate("text.controleAddDocAtiv"));
		}
		
		
	}else if(atividade == FORMALIZACAO_ASSINATURA_ADITIVO_CONTRATUAL){
		valida("obsFormalizacaoAssinAditivo", i18n.translate("text.obsFormalizacaoAssinAditivo"));
		valida("controleAddDocAtiv", i18n.translate("text.controleAddDocAtiv"));
		
		
		
	}else if(atividade == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC){
		valida("hidden_aprovacaoDiretorDoc", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovacaoDiretorDoc") == "ajustar"){	
				valida("justAprovacaoDiretorDoc", i18n.translate("text.justAprovacao"));
		}
	}else if(atividade == ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC){
		valida("hidden_aprovacaoDiretorDoc", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovacaoDiretorDoc") == "ajustar"){	
				valida("justAprovacaoDiretorDoc", i18n.translate("text.justAprovacao"));
		}
	}else if(atividade == ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC){
		valida("hidden_aprovacaoDiretorDoc", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovacaoDiretorDoc") == "ajustar"){	
				valida("justAprovacaoDiretorDoc", i18n.translate("text.justAprovacao"));
		}
	}else if(atividade == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA){
		valida("hidden_aprovDirOperacVlrPrazo", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovDirOperacVlrPrazo") != "aprovado"){	
				valida("justAprovDirOperacVlrPrazo", i18n.translate("text.justAprovDirOperacVlrPrazo"));
		}
	}else if(atividade == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL){
		valida("hidden_aprovDirComercVlrPrazo", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovDirComercVlrPrazo") != "aprovado"){	
				valida("justAprovDirComercVlrPrazo", i18n.translate("text.justAprovDirComercVlrPrazo"));
		}
	}else if(atividade == ANALISE_APROVACAO_PRESIDENCIA){
		valida("hidden_aprovPresidMIPVlrPrazo", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovPresidMIPVlrPrazo") != "aprovado"){	
				valida("justAprovPresidMIPVlrPrazo", i18n.translate("text.justAprovPresidMIPVlrPrazo"));
		}
	}else if(atividade == INCORPORACAO_ORCAMENTO_VERSAO_ESCOPO_ATUAL){
		valida("obsIncorpOrcVersaoEscopoAtual", i18n.translate("text.obsIncorpOrcVersaoEscopoAtual"));
		//valida("controleAddDocAtiv", i18n.translate("text.controleAddDocAtiv"));
		
		
	}else if(atividade == INCORPORACAO_ORCAMENTO_VERSAO_ATIVA){
		valida("obsIncorpOrcVersaoEscopoAtiva", i18n.translate("text.obsIncorpOrcVersaoEscopoAtiva"));
	}else if(atividade == VALIDAR_NECESSIDADE_CGM_COMPLEMENTAR){
		valida("obsCgmComplementar", i18n.translate("text.obsCgmComplementar"));
		
	}else if(atividade == REPROGRAMACAO_ORCAMENTARIA_EMPREENDIMENTO){
		valida("hidden_aprovacaoDiretorDoc", i18n.translate("text.parecer"));
		if(form.getValue("hidden_aprovacaoDiretorDoc") == "ajustar"){	
				valida("justAprovacaoDiretorDoc", i18n.translate("text.justAprovacao"));
		}
	}	
		
	for (var i=0; i<Errors.length; i++){		
		msg+= "\n" + Errors[i];		
	}
	
	if (msg != ''){		
		throw "Os seguintes campos devem ser preenchidos: \n\n<b>" + msg +"</b>\n\n\n";
	}

	
	function validaSelect(campo, mensagem) {    
	    if(form.getValue(campo) == 0) {        
	        Errors.push("- " + mensagem);
	    }
	}

	function valida(campo, mensagem) {    
		if(form.getValue(campo) == '') {        
		        Errors.push("- "+mensagem);
		    }
		}
}



