function enableFields(form){ 
	
	var atividade = getValue("WKNumState");
	
	if(atividade == INICIO_0 || atividade == INICIO){		
		bloqueiaAprovGerente(form);
		bloqueiaAplicTeste(form);		
		bloqueiaAprovTeste(form);
		bloqueiaAprovGerSede(form);
		bloqueiaAprovDiretoria(form);
		bloqueiaAprovPresid(form);
		bloqueiaExames(form);
		bloqueiaValidaDados(form);
		bloqueiaValidarSalario(form)
		bloqueiaEfetivar(form);
	} 
	else if(atividade == APROV_GERENTE){
		bloqueiaCamposInicio(form);
		bloqueiaAplicTeste(form);
		bloqueiaAprovTeste(form);
		bloqueiaAprovGerSede(form);
		bloqueiaAprovDiretoria(form);
		bloqueiaAprovPresid(form);
		bloqueiaExames(form);
		bloqueiaValidaDados(form);
		bloqueiaValidarSalario(form)
		bloqueiaEfetivar(form);
	} 
	else if(atividade == APLICA_TESTE){	
		bloqueiaCamposInicio(form);
		bloqueiaAprovGerente(form);
		bloqueiaAprovTeste(form);
		bloqueiaAprovGerSede(form);
		bloqueiaAprovDiretoria(form);
		bloqueiaAprovPresid(form);
		bloqueiaExames(form);
		bloqueiaValidaDados(form);
		bloqueiaValidarSalario(form)
		bloqueiaEfetivar(form);
	}
	else if(atividade == APROV_GERSEDE){
		bloqueiaCamposInicio(form);
		bloqueiaAprovGerente(form);
		bloqueiaAprovTeste(form);
		bloqueiaAprovDiretoria(form);
		bloqueiaAprovPresid(form);
		bloqueiaExames(form);
		bloqueiaValidaDados(form);
		bloqueiaValidarSalario(form)
		bloqueiaEfetivar(form);
	}
	else if(atividade == APROV_TESTE){	
		bloqueiaCamposInicio(form);
		bloqueiaAprovGerente(form);
		bloqueiaAplicTeste(form);
		bloqueiaAprovGerSede(form);
		bloqueiaAprovDiretoria(form);
		bloqueiaAprovPresid(form);
		bloqueiaExames(form);
		bloqueiaValidaDados(form);
		bloqueiaValidarSalario(form)
		bloqueiaEfetivar(form);
		form.setEnabled("manterAddTraf",false);
		
	} 
	else if(atividade == APROV_DIRETORIA){	
		bloqueiaCamposInicio(form);
		bloqueiaAprovGerente(form);
		bloqueiaAplicTeste(form);
		bloqueiaAprovGerSede(form);
		bloqueiaAprovTeste(form);		
		bloqueiaAprovPresid(form);
		bloqueiaExames(form);
		bloqueiaValidaDados(form);
		bloqueiaValidarSalario(form)
		bloqueiaEfetivar(form);
	} 
	else if(atividade == APROV_PRESID){	
		bloqueiaCamposInicio(form);
		bloqueiaAprovGerente(form);
		bloqueiaAplicTeste(form);
		bloqueiaAprovTeste(form);
		bloqueiaAprovGerSede(form);
		bloqueiaAprovDiretoria(form);
		bloqueiaExames(form);
		bloqueiaValidaDados(form);
		bloqueiaEfetivar(form);
	} 
	else if(atividade == REALIZA_EXAMES){	
		bloqueiaCamposInicio(form);
		bloqueiaAprovGerente(form);
		bloqueiaAplicTeste(form);
		bloqueiaAprovTeste(form);
		bloqueiaAprovGerSede(form);
		bloqueiaAprovDiretoria(form);
		bloqueiaAprovPresid(form);
		bloqueiaValidaDados(form);
		bloqueiaValidarSalario(form)
		bloqueiaEfetivar(form);
	} 
	else if(atividade == VALIDA_DADOS_OBRA){	
		bloqueiaCamposInicio(form);
		bloqueiaAprovGerente(form);
		bloqueiaAplicTeste(form);
		bloqueiaAprovTeste(form);
		bloqueiaAprovGerSede(form);
		bloqueiaAprovDiretoria(form);
		bloqueiaAprovPresid(form);
		bloqueiaExames(form);
		bloqueiaValidarSalario(form)
		bloqueiaEfetivar(form);
	}
	else if(atividade == VALIDAR_SALARIO){	
		bloqueiaCamposInicio(form);
		bloqueiaAprovGerente(form);
		bloqueiaAplicTeste(form);
		bloqueiaAprovTeste(form);
		bloqueiaAprovGerSede(form);
		bloqueiaAprovDiretoria(form);
		bloqueiaAprovPresid(form);
		bloqueiaExames(form);
		bloqueiaValidaDados(form);
		bloqueiaEfetivar(form);
	}
	else if(atividade == EFETIVAR_ALTERACAO){	
		bloqueiaCamposInicio(form);
		bloqueiaAprovGerente(form);
		bloqueiaAplicTeste(form);
		bloqueiaAprovTeste(form);
		bloqueiaAprovGerSede(form);
		bloqueiaAprovDiretoria(form);
		bloqueiaAprovPresid(form);
		bloqueiaExames(form);
		bloqueiaValidaDados(form);
		bloqueiaValidarSalario(form)
	}
	else if(atividade == SUPORTE_TI){
		bloqueiaCamposInicio(form);
		bloqueiaAprovGerente(form);
		bloqueiaAplicTeste(form);
		bloqueiaAprovTeste(form);
		bloqueiaAprovGerSede(form);
		bloqueiaAprovDiretoria(form);
		bloqueiaAprovPresid(form);
		bloqueiaExames(form);
		bloqueiaValidaDados(form);
		bloqueiaValidarSalario(form)
		bloqueiaEfetivar(form);
	}
}

function bloqueiaCamposInicio(form){
	
	form.setEnabled("obraSetor",false);
	form.setEnabled("funcionario",false);
	form.setEnabled("funcaoProposto",false);	
	form.setEnabled("nomeFaixaProposto",false);
	form.setEnabled("salarioProposto",false);	
	form.setEnabled("substituicao",false);
	form.setEnabled("motMudancaFuncao",false);
	form.setEnabled("motMudancaSalarial",false);
	form.setEnabled("dataAlteracao",false);
	form.setEnabled("justificativa",false);
	form.setEnabled("justAbsMed",false);
	form.setEnabled("justAbsPro",false);
	form.setEnabled("justPrazo",false);
	form.setEnabled("manterAddTraf",false);
		
	 var indexes = form.getChildrenIndexes("tbRateioOrigem");
	 for ( var i in indexes) {
	    var sufixoNome = '___' + indexes[i];			
		form.setEnabled("centroCustoNeto" + sufixoNome,false);
		form.setEnabled("percentRateioNeto" + sufixoNome,false);
	 }
	 
	 var indexes = form.getChildrenIndexes("tbRateioProp");
	 for ( var i in indexes) {
	    var sufixoNome = '___' + indexes[i];			
		form.setEnabled("centroCustoProp" + sufixoNome,false);
		form.setEnabled("percentProp" + sufixoNome,false);
	 }
}

function bloqueiaAprovGerente(form){
	form.setEnabled("aprovacaoAlteracao",false);
	form.setEnabled("justificativaAprovador",false);
}

function bloqueiaAplicTeste(form){
	form.setEnabled("aprovacaoTestes",false);
	form.setEnabled("observacoesTestes",false);
}

function bloqueiaAprovGerSede(form){
	form.setEnabled("aprovacaoGerSede",false);
	form.setEnabled("justificativaGerSede",false);
}

function bloqueiaAprovTeste(form){
	form.setEnabled("aprovTestesValida",false);
	form.setEnabled("observacoesTestesValida",false);
}

function bloqueiaAprovDiretoria(form){
	form.setEnabled("aprovDiretoria",false);
	form.setEnabled("observacoesDiretoria",false);
}

function bloqueiaAprovPresid(form){
	form.setEnabled("aprovPresidente",false);
	form.setEnabled("observacoesPresidente",false);
}

function bloqueiaExames(form){
	form.setEnabled("aprovExames",false);
	form.setEnabled("resultadoExames",false);
	form.setEnabled("observacoesExames",false);
}

function bloqueiaValidaDados(form){
	form.setEnabled("aprovValidDadosObra",false);
	form.setEnabled("observacoesValidDadosObra",false);
}

function bloqueiaValidarSalario(form){
	form.setEnabled("aprovValidarSalario",false);
	form.setEnabled("obsValidarSalario",false);
}

function bloqueiaEfetivar(form){
	
	form.setEnabled("alteracaoEfetivada",false);
	form.setEnabled("observacoesEfetivar",false);
}