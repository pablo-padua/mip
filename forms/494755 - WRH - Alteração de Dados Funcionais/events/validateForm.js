function validateForm(form){
	
	/* Permite Tranferir e Salvar sem validar campos */
	var numState = getValue("WKNumState");
    var nextState = getValue("WKNextState");
		
	if(numState == nextState){
        return;
    }
	/* Permite Tranferir e Salvar sem validar campos */
		
	var atividade = getValue("WKNumState");
	
	var Errors = [];
	var msg = '';
	
	if(atividade == INICIO_0 || atividade == INICIO){
		
		valida("nomeSolicitante", i18n.translate("text.nomeSolicitante"));
		valida("dataSolicitacao", i18n.translate("text.dataSolicitacao"));	
		valida("obraSetor", i18n.translate("text.obraSetor"));
		valida("nomeSolicitante", i18n.translate("text.nomeSolicitante"));
		valida("dataSolicitacao", i18n.translate("text.dataSolicitacao"));
		valida("obraSetor", i18n.translate("text.obraSetor"));		
		valida("chapa", i18n.translate("text.nome"));		
		valida("funcaoOrigem", i18n.translate("text.funcaoOrigem"));
		valida("faixaOrigem", i18n.translate("text.faixaOrigem"));
		valida("salarioOrigem", i18n.translate("text.salarioOrigem"));
		valida("manterAddTraf", i18n.translate("text.manterAddTraf"));
		
		var index = form.getChildrenIndexes('tbRateioOrigem');
		if (index.length == 0){
			Errors.push("- \u00c9 necess\u00e1rio inserir pelo menos um Rateio no Centro de Custo Origem.");
		} else {
			validaPaiFilho("tbRateioOrigem", "centroCustoNeto", "Centro de Custo origem deve ser preenchida");
			validaPaiFilho("tbRateioOrigem", "percentRateioNeto", "Percentual do Centro de Custo origem deve ser preenchido");
		}
		
		valida("dataAdmissao", i18n.translate("text.dataAdmissao"));		
		valida("absenteismoMedico", i18n.translate("text.absenteismoMedico"));
		valida("absenteismoProdutiv", i18n.translate("text.absenteismoProdutiv"));
		
		if(form.getValue("salarioOrigem") != form.getValue("salarioProposto") || form.getValue("codFuncaoOrigem") != form.getValue("codFuncaoProposto") ){
		
			if(parseFloat(form.getValue("absenteismoMedico").replace(",", ".")) > parseFloat(1.5)){
				valida("justAbsMed", i18n.translate("text.justAbsMed"));
		    }

			if(parseFloat(form.getValue("absenteismoProdutiv").replace(",", ".")) > parseFloat(3)){
				valida("justAbsPro", i18n.translate("text.justAbsPro"));
		    }

			var dataAdmissao = form.getValue("dataAdmissao");
			var dataAdmissao = new Date(dataAdmissao.split("/")[2], dataAdmissao.split("/")[1] - 1, dataAdmissao.split("/")[0]);
			var hoje = new Date();
	
			if(DateDiffDays(dataAdmissao, hoje) < 180){
				valida("justPrazo", i18n.translate("text.justPrazo"));
		    }
	
		}
		
		valida("codFuncaoProposto", i18n.translate("text.funcaoProposto"));
		valida("funcaoProposto", i18n.translate("text.funcaoProposto"));
		valida("nomeFaixaProposto", i18n.translate("text.nomeFaixaProposto"));
		valida("salarioProposto", i18n.translate("text.salarioProposto"));
		
		var index = form.getChildrenIndexes('tbRateioProp');
		if (index.length == 0){
			Errors.push("- \u00c9 necess\u00e1rio inserir pelo menos um Rateio no Centro de Custo Proposto.");
		} else {
			validaPaiFilho("tbRateioProp", "codCentroCustoProp", "Centro de Custo proposto deve ser preenchida");
			validaPaiFilho("tbRateioProp", "percentProp", "Percentual do Centro de Custo proposto deve ser preenchido");
		}
		        
		validaBolleano("totalRateio", i18n.translate("text.totalRateio"));
	    
		if(form.getValue("codFuncaoOrigem") != form.getValue("codFuncaoProposto")){        
			valida("codMotMudancaFuncao", i18n.translate("text.motMudancaFuncao"));
	    }	
		
		if (form.getValue("salarioOrigem") != form.getValue("salarioProposto")){
			valida("codMotMudancaSalarial", i18n.translate("text.motMudancaSalarial"));
		}
		valida("variacaoSalario", i18n.translate("text.variacaoSalario"));
		valida("dataAlteracao", i18n.translate("text.dataAlteracao"));
		valida("justificativa", i18n.translate("text.justificativa"));
	
		
	}
	else if(atividade == APROV_GERENTE){
		valida("aprovacaoAlteracao", i18n.translate("text.aprovado"));		
		if(form.getValue("aprovacaoAlteracao") == "nao") {
			valida("justificativaAprovador", i18n.translate("text.justificativa"));
	    }	
	}
	else if(atividade == APLICA_TESTE){
		valida("aprovacaoTestes", i18n.translate("text.testesRealizados"));
		if(form.getValue("aprovacaoTestes") == "nao") {
			valida("observacoesTestes", i18n.translate("text.observacoes"));
	    }else if(form.getValue("resultadoLaudoProva") != "aprovado"){
			Errors.push("- "+form.getValue("resultadoLaudoProva"));
		}

	}
	else if(atividade == APROV_GERSEDE){
		valida("aprovacaoGerSede", i18n.translate("text.aprovado"));
		if(form.getValue("aprovacaoGerSede") == "nao") {
			valida("justificativaGerSede", i18n.translate("text.justificativa"));
	    }
	}
	else if(atividade == APROV_TESTE){
		valida("aprovTestesValida", i18n.translate("text.testesAprovados"));		
		if(form.getValue("aprovTestesValida") == "nao") {        
			valida("observacoesTestesValida", i18n.translate("text.observacoes"));
	    }else if(form.getValue("resultadoLaudoProva") != "aprovado"){
			Errors.push("- "+form.getValue("resultadoLaudoProva"));
		}
	} 
	else if(atividade == APROV_DIRETORIA){	
		valida("aprovDiretoria", i18n.translate("text.aprovado"));		
		if(form.getValue("aprovDiretoria") == "nao") {        
			valida("observacoesDiretoria", i18n.translate("text.justificativa"));
	    }
	} 
	else if(atividade == APROV_PRESID){	
		valida("aprovPresidente", i18n.translate("text.aprovado"));		
		if(form.getValue("aprovPresidente") == "nao") {        
			valida("observacoesPresidente", i18n.translate("text.justificativa"));
	    }
	} 
	else if(atividade == REALIZA_EXAMES){	
		valida("aprovExames", i18n.translate("text.examesRealizados"));		
		if(form.getValue("aprovExames") == "naoSeAplica") {        
			valida("observacoesExames", i18n.translate("text.observacoes"));
	    } else if (form.getValue("aprovExames") == "sim"){
	    	valida("resultadoExames", i18n.translate("text.msgResultadoExames"));
	    }
	} 
	else if(atividade == VALIDA_DADOS_OBRA){	
		valida("aprovValidDadosObra", i18n.translate("text.aprovado"));		
		if(form.getValue("aprovValidDadosObra") == "nao") {        
			valida("observacoesValidDadosObra", i18n.translate("text.observacoes"));
	    }
	}
	else if(atividade == VALIDAR_SALARIO){

		valida("aprovValidarSalario", i18n.translate("text.aprovValidarSalario"));
		if(form.getValue("aprovValidarSalario") == "nao") {
			valida("obsValidarSalario", i18n.translate("text.observacoes"));
	    }else if(parseFloat(form.getValue("salarioAtual").replace(",", ".")) > parseFloat(form.getValue("salarioTabela").replace(",", "."))) {
			Errors.push("O salário atual do funcionário é maior que o salário da tabela salarial. É necessário atualizar a tabela antes de concluir a solicitação.");
			Erros.push("Atual: " + parseFloat(form.getValue("salarioAtual").replace(",", ".")));
			Erros.push("Tabela: " + parseFloat(form.getValue("salarioTabela").replace(",", ".")));
	    }
		if (form.getValue("salarioAtual") != form.getValue("salarioTabela")){
			valida("codMotMudancaSalarial", i18n.translate("text.motMudancaSalarial"));
		}
	}
	else if(atividade == EFETIVAR_ALTERACAO){	
		if(form.getValue("statusReq") == "3" || form.getValue("statusReq") == "") {      //APROVADO  
			Errors.push("- "+i18n.translate("msg.statusAlteracao"));
	    } 
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
	            Errors.push("- " + mensagem + " na linha " + i);
	        }
	    });
	}
}