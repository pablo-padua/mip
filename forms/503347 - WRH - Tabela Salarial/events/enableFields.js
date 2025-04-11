function enableFields(form){ 
	
	var atividadeAtual = getValue("WKNumState");
	
	if (atividadeAtual == 0 || atividadeAtual == 20){
		bloqueiaAprovGerente(form);
		bloqueiaAprovDiretor(form);
		bloqueiaCriarTabela(form);
		bloqueiaConferir(form);
		bloqueiaVincularRiscos(form);
	}
	// APROV_GERENCIA
	else if (atividadeAtual == 26){
		bloqueiaCamposInicio(form);
		bloqueiaAprovDiretor(form);
		bloqueiaCriarTabela(form);
		bloqueiaConferir(form);
		bloqueiaVincularRiscos(form);
	}
	// APROV_DIRETOR
	else if (atividadeAtual == 73){
		bloqueiaCamposInicio(form);
		bloqueiaAprovGerente(form);	
		bloqueiaCriarTabela(form);
		bloqueiaConferir(form);
		bloqueiaVincularRiscos(form);
	}
	// CRIAR_TABELA
	else if (atividadeAtual == 95){
		bloqueiaCamposInicio(form);
		bloqueiaValores(form);
		bloqueiaAprovGerente(form);
		bloqueiaAprovDiretor(form);
		bloqueiaConferir(form);
		bloqueiaVincularRiscos(form);
	}
	// AJUSTAR_INTEGRACAO_1
	else if (atividadeAtual == 123){	
		bloqueiaCamposInicio(form);
		bloqueiaValores(form);
		bloqueiaAprovGerente(form);
		bloqueiaAprovDiretor(form);
		bloqueiaCriarTabela(form);
		bloqueiaConferir(form);
		bloqueiaVincularRiscos(form);
	}
	//AJUSTAR_INTEGRACAO_2
	else if (atividadeAtual == 119){	
		bloqueiaCamposInicio(form);
		bloqueiaValores(form);
		bloqueiaAprovGerente(form);
		bloqueiaAprovDiretor(form);
		bloqueiaCriarTabela(form);
		bloqueiaConferir(form);
		bloqueiaVincularRiscos(form);
	}
	//CONFERIR_TABELA
	else if (atividadeAtual == 111){
		bloqueiaCamposInicio(form);
		bloqueiaValores(form);
		bloqueiaAprovGerente(form);
		bloqueiaAprovDiretor(form);
		bloqueiaCriarTabela(form);
		bloqueiaVincularRiscos(form);
	}
	//VINCULAR_RISCOS
	else if (atividadeAtual == 87){
		bloqueiaCamposInicio(form);
		bloqueiaValores(form);
		bloqueiaAprovGerente(form);
		bloqueiaAprovDiretor(form);
		bloqueiaCriarTabela(form);
		bloqueiaConferir(form);
	}
	
}

function bloqueiaCamposInicio(form){	
	form.setEnabled("novaTabelaSalarial",false);
	form.setEnabled("obraSetor",false);
	form.setEnabled("tabela",false);
	form.setEnabled("dataAlteracao",false);
}

function bloqueiaValores(form){
	var indexes = form.getChildrenIndexes("tbFuncoesExistentes");
	for ( var i in indexes) {
	    var sufixoNome = '___' + indexes[i];			
		form.setEnabled("novoSalario" + sufixoNome,false);
	}
	
	var indexes = form.getChildrenIndexes("tbFuncoesNovas");
	for ( var i in indexes) {
	    var sufixoNome = '___' + indexes[i];			
		form.setEnabled("nivelFuncNova" + sufixoNome,false);
		form.setEnabled("secaoFuncNova" + sufixoNome,false);
	}
	var indexes = form.getChildrenIndexes("tbFuncoesTabelaNova");
	for ( var i in indexes) {
	    var sufixoNome = '___' + indexes[i];			
		form.setEnabled("nivelFuncTabelaNova" + sufixoNome,false);		
		form.setEnabled("secaoFuncTabelaNova" + sufixoNome,false);
		
	}
}

function bloqueiaAprovGerente(form){
	form.setEnabled("aprovacao",false);
	form.setEnabled("justificativa",false);
}

function bloqueiaAprovDiretor(form){
	form.setEnabled("aprovacaoDir",false);
	form.setEnabled("justificativaDir",false);
}

function bloqueiaCriarTabela(form){
	form.setEnabled("codNovaTabela",false);
	form.setEnabled("novaTabela",false);
}

function bloqueiaConferir(form){
	form.setEnabled("conferido",false);
	form.setEnabled("observacaoConferir",false);
}

function bloqueiaVincularRiscos(form){
	//form.setEnabled("riscosVinculados",false);
	//form.setEnabled("observacaoVincRiscos",false);
}