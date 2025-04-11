function validateForm(form){
	
	/* Permite Tranferir e Salvar sem validar campos */
	var numState = getValue("WKNumState");
    var nextState = getValue("WKNextState");
		
	if(numState == nextState){
        return;
    }
	/* Permite Tranferir e Salvar sem validar campos */
	
	var atividade = getValue("WKNumState");
	console.log("ATIVIDADE: " + atividade);
	
	
	var Errors = [];
	var msg = '';
	
	if(atividade == 0 || atividade == 20){
		valida("nomeSolicitante", i18n.translate("text.nomeSolicitante"));
		valida("dataSolicitacao", i18n.translate("text.dataSolicitacao"));	
		valida("hiddenTipoAcao", i18n.translate("text.acao"));
		valida("obraSetor", i18n.translate("text.obraSetor"));

		if(form.getValue("hiddenTipoAcao") == "alterar") {
			valida("dataAlteracao", i18n.translate("text.dataAlteracao"));
			valida("tabela", i18n.translate("text.tabela"));			
			var index = form.getChildrenIndexes('tbFuncoesNovas');
			if (index.length > 0){
				validaPaiFilho("tbFuncoesNovas" , "codNivelFuncNova", i18n.translate("text.nivel"));
				validaPaiFilho("tbFuncoesNovas" , "codSecaoFuncNova", i18n.translate("text.secao"));
				validaSalarioJSON("tbFuncoesNovas" , "salarioFuncNovaJSON", i18n.translate("text.salario"));
			}else{
    
			    var tablename = form.getChildrenIndexes("tbFuncoesExistentes");
			    var houveAlteracao = 0;
			    tablename.forEach(function(i) {
			        var salarioFuncExiste = form.getValue("salarioFuncExiste___" + i);
			        salarioFuncExiste = parseFloat((salarioFuncExiste).replace(".","").replace(",","."));
			        var novoSalario = form.getValue("novoSalario___" + i);
			        novoSalario = parseFloat((novoSalario).replace(".","").replace(",","."));
			        if(salarioFuncExiste != novoSalario)
			        	houveAlteracao++;
			    });

				if(houveAlteracao == 0)
					Errors.push("\u00c9 necess\u00e1rio realizar pelo menos uma altera\u00e7\u00e3o");
				
			}
		}

		if(form.getValue("hiddenTipoAcao") == "incluir") {        
			var index = form.getChildrenIndexes('tbFuncoesTabelaNova');
			if (index.length == 0){
				Errors.push("\u00c9 necess\u00e1rio inserir pelo menos uma fun\u00e7\u00e3o");
			} 
			validaPaiFilho("tbFuncoesTabelaNova" , "codNivelFuncTabelaNova", i18n.translate("text.nivel"));
			validaPaiFilho("tbFuncoesTabelaNova" , "codSecaoFuncTabelaNova", i18n.translate("text.secao"));
			validaSalarioJSON("tbFuncoesTabelaNova" , "salarioFuncTabelaNovaJSON", i18n.translate("text.salario"));
	    }
		
	} 
	else if(atividade == 26){		
		valida("nomeAprovador", i18n.translate("text.nomeAprovador"));
		valida("dataAprovacao", i18n.translate("text.dataAprovacao"));	
		
		if(form.getValue("hiddenTipoAcao") == "alterar") {   
			valida("tabela", i18n.translate("text.tabela"));
			var index = form.getChildrenIndexes('tbFuncoesNovas');
			if (index.length > 0){
				validaPaiFilho("tbFuncoesNovas" , "codNivelFuncNova", i18n.translate("text.nivel"));				
				validaPaiFilho("tbFuncoesNovas" , "codSecaoFuncNova", i18n.translate("text.secao"));
				validaSalarioJSON("tbFuncoesNovas" , "salarioFuncNovaJSON", i18n.translate("text.salario"));
			} 
		}
		
		if(form.getValue("hiddenTipoAcao") == "incluir") {        
			var index = form.getChildrenIndexes('tbFuncoesTabelaNova');
			if (index.length == 0){
				Errors.push("\u00c9 necess\u00e1rio inserir pelo menos uma fun\u00e7\u00e3o");
			} 
			validaPaiFilho("tbFuncoesTabelaNova" , "codNivelFuncTabelaNova", i18n.translate("text.nivel"));			
			validaPaiFilho("tbFuncoesTabelaNova" , "codSecaoFuncTabelaNova", i18n.translate("text.secao"));
			validaSalarioJSON("tbFuncoesTabelaNova" , "salarioFuncTabelaNovaJSON", i18n.translate("text.salario"));
	    }
		
		valida("aprovacao", i18n.translate("text.aprovado"));		
		if(form.getValue("aprovacao") == "nao") {        
			valida("justificativa", i18n.translate("text.justificativa"));
	    }
		
	}
	else if(atividade == 73){		
		valida("nomeAprovadorDir", i18n.translate("text.nomeAprovador"));
		valida("dataAprovacaoDir", i18n.translate("text.dataAprovacao"));	
		
		if(form.getValue("hiddenTipoAcao") == "alterar") {   
			valida("tabela", i18n.translate("text.tabela"));
			var index = form.getChildrenIndexes('tbFuncoesNovas');
			if (index.length > 0){
				validaPaiFilho("tbFuncoesNovas" , "codNivelFuncNova", i18n.translate("text.nivel"));				
				validaPaiFilho("tbFuncoesNovas" , "codSecaoFuncNova", i18n.translate("text.secao"));
				validaSalarioJSON("tbFuncoesNovas" , "salarioFuncNovaJSON", i18n.translate("text.salario"));
			} 
		}
		
		if(form.getValue("hiddenTipoAcao") == "incluir") {        
			var index = form.getChildrenIndexes('tbFuncoesTabelaNova');
			if (index.length == 0){
				Errors.push("\u00c9 necess\u00e1rio inserir pelo menos uma fun\u00e7\u00e3o");
			} 
			validaPaiFilho("tbFuncoesTabelaNova" , "codNivelFuncTabelaNova", i18n.translate("text.nivel"));
			validaPaiFilho("tbFuncoesTabelaNova" , "codSecaoFuncTabelaNova", i18n.translate("text.secao"));
			validaSalarioJSON("tbFuncoesTabelaNova" , "salarioFuncTabelaNovaJSON", i18n.translate("text.salario"));
	    }
		
		valida("aprovacaoDir", i18n.translate("text.aprovado"));		
		if(form.getValue("aprovacaoDir") == "nao") {        
			valida("justificativaDir", i18n.translate("text.justificativa"));
	    }
	}
	else if(atividade == 95){		
		valida("nomeRespCriarFunc", i18n.translate("text.responsavel"));
		valida("dataCriarFunc", i18n.translate("text.data"));	
		valida("codNovaTabela", i18n.translate("text.novaTabela"));		
	}
	else if(atividade == 111){		
		valida("nomeConferir", i18n.translate("text.responsavel"));
		valida("dataConferir", i18n.translate("text.data"));	
		valida("conferido", i18n.translate("text.conferido"));
		if(form.getValue("conferido") == "nao") {        
			valida("observacaoConferir", i18n.translate("text.observacao"));
	    }
	}
	else if(atividade == 87){		
		valida("nomeVincRiscos", i18n.translate("text.responsavel"));
		valida("dataVincRiscos", i18n.translate("text.data"));	
		//valida("riscosVinculados", i18n.translate("text.riscosVinculados"));
		//if(form.getValue("riscosVinculados") == "nao") {        
		//	valida("observacaoVincRiscos", i18n.translate("text.observacao"));
	    //}
	}
		
	
	for (var i=0; i<Errors.length; i++){		
		msg+= "\n" + Errors[i];		
	}
	
	if (msg != ''){		
		throw "Os seguintes campos devem ser preenchidos: \n\n" + msg +"\n\n\n";
	}
	
	function valida(campo, mensagem) {    
	    if(form.getValue(campo).trim() == '') {        
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
	        if(value == '' || value == 0 || value == "0,00") {	            
	            Errors.push("- " + mensagem + " na linha " + i);
	        }
	    });
	}
	
	function validaSalarioJSON(nomeTabela, campo, mensagem) {
	    var tablename = form.getChildrenIndexes(nomeTabela);
	    tablename.forEach(function(i) {
	        
	    	if(form.getValue("isFuncNova___" + i) == "1" || campo != "salarioFuncNovaJSON"){
	    	
		        var salarioJSON = JSON.parse(form.getValue(campo + "___" + i));
		    	
		    	for(var j=0; j < salarioJSON.length; j++){
		    		
		    		var value = salarioJSON[j].SALARIO;
			        if(value == '' || value == 0 || value == "0,00") {
			            Errors.push("- " + mensagem + " na linha " + i);
			        }
		    	}
	    	}
	        
	    });
	}

}