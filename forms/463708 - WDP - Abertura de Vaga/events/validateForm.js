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
	var msg = "";

	if (atividade == INICIO_0 || atividade == INICIO || atividade == CORRIGIR){
		valida("nomeSolicitante", i18n.translate("text.nomeSolicitante"));
		valida("dataSolicitacao", i18n.translate("text.dataSolicitacao"));
		valida("obraSetor", i18n.translate("text.obraSetor"));
		

		var index = form.getChildrenIndexes("tbVaga");
		if (index.length == 0){
			Errors.push("\u00c9 necess\u00e1rio inserir pelo menos uma vaga");
		}
		validaPaiFilho("tbVaga" , "centroCusto", i18n.translate("text.centroCusto"));
		validaPaiFilho("tbVaga" , "secao", i18n.translate("text.secao"));
		validaPaiFilho("tbVaga" , "funcao", i18n.translate("text.funcao"));
		validaPaiFilho("tbVaga" , "nomeFaixa", i18n.translate("text.faixa"));
		validaPaiFilho("tbVaga" , "salario", i18n.translate("text.salario"));
		validaPaiFilho("tbVaga" , "numeroVagas", i18n.translate("text.numeroVagas"));
		validaPaiFilho("tbVaga" , "divulgacaoVaga", i18n.translate("text.divulgacaoVaga"));
		
	}	

	else if (atividade == APROVAR_VAGA){
		valida("nomeAprovador", i18n.translate("text.nomeAprovador"));
		valida("dataAprovacao", i18n.translate("text.data"));
		valida("aprovacao", i18n.translate("text.aprovado"));
		if(form.getValue("aprovacao") != "sim" ) {
			valida("justificativa", i18n.translate("text.justificativa"));
	    }

		if(form.getValue("codColigadaAprovador") == "" || form.getValue("chapaAprovador") == "")
			throw "\n\n<b>Não foi possível identificar os dados do Aprovador (Coligada e Chapa).\n\nAtualize a página e tente novamente.\n\nCaso o erro persista, contate o setor de TI.</b>\n\n";

	}
	
	for (var i=0; i<Errors.length; i++){
		msg+= "\n" + Errors[i];
	}
	
	if (msg != ""){		
		throw "Os seguintes campos devem ser preenchidos: \n\n<b>" + msg +"</b>\n\n\n";
	}
	
	function valida(campo, mensagem) {    
	    if(form.getValue(campo) == "") {
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
	        
	        var value = form.getValue(campo + "___" + i);
	        
	        if(value == "" || value == 0) {
	            
	            Errors.push("- " + mensagem + " da linha " + i);
	        }
	    });
	}
}