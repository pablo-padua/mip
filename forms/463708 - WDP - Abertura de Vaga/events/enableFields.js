function enableFields(form){
	
	 var atividade = getValue("WKNumState");
		
	 if (atividade == INICIO_0 || atividade == INICIO || atividade == CORRIGIR){
		 bloqueiaAprovacao(form);
	 }else if (atividade == APROVAR_VAGA){
		 bloqueiaInicio(form);
		 var indexes = form.getChildrenIndexes("tbVaga");
		 for ( var i in indexes) {
		    var sufixoNome = '___' + indexes[i];
			form.setEnabled('centroCusto' + sufixoNome, false);
			form.setEnabled('secao' + sufixoNome, false);
			form.setEnabled('funcao' + sufixoNome, false);
			form.setEnabled('nomeFaixa' + sufixoNome, false);
			form.setEnabled('salario' + sufixoNome, false);
			form.setEnabled('numeroVagas' + sufixoNome, false);
		 }
	 }
	 else {
		 bloqueiaInicio(form);
		 bloqueiaAprovacao(form);
	 }
}

function bloqueiaInicio(form){
	 form.setEnabled("nomeSolicitante",false);
	 form.setEnabled("dataSolicitacao",false);
	 form.setEnabled("obraSetor",false);
	 
	 var indexes = form.getChildrenIndexes("tbVaga");
	 for ( var i in indexes) {
	    var sufixoNome = '___' + indexes[i];
		form.setEnabled('centroCusto' + sufixoNome, false);
		form.setEnabled('secao' + sufixoNome, false);
		form.setEnabled('funcao' + sufixoNome, false);
		form.setEnabled('nomeFaixa' + sufixoNome, false);
		form.setEnabled('salario' + sufixoNome, false);
		form.setEnabled('numeroVagas' + sufixoNome, false);
	 }
	 
	 var indexes = form.getChildrenIndexes("tbIndicacao");
	 for ( var i in indexes) {
	    var sufixoNome = '___' + indexes[i];
		form.setEnabled('nome' + sufixoNome, false);
		form.setEnabled('telefone' + sufixoNome, false);
		form.setEnabled('telefone2' + sufixoNome, false);
		form.setEnabled('cpf' + sufixoNome, false);
		form.setEnabled('ultFuncao' + sufixoNome, false);
		form.setEnabled('ultSecao' + sufixoNome, false);
		form.setEnabled('email' + sufixoNome, false);
		

	 }
}

function bloqueiaAprovacao(form){
	form.setEnabled("nomeAprovador",false);
	form.setEnabled("dataAprovacao",false);
	form.setEnabled("aprovacao",false);
	form.setEnabled("justificativa",false);
}