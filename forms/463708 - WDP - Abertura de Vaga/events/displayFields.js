function displayFields(form,customHTML){ 
	
	form.setShowDisabledFields(true);
	
	recuperarAtividadeJS(form, customHTML);
	var atividade = getValue("WKNumState");
	
	if(atividade == INICIO_0 || atividade == INICIO || atividade == CORRIGIR){			
		form.setValue("dataSolicitacao", buscaDataAtual());
		form.setValue("nomeSolicitante", buscarNomeUsuario());
		form.setValue("matrSolicitante", buscarMatriculaUsuarioLogado());
	} else if(atividade == APROVAR_VAGA){			
		form.setValue("dataAprovacao", buscaDataAtual());
		form.setValue("nomeAprovador", buscarNomeUsuario());
		form.setValue("matrAprovador", buscarMatriculaUsuarioLogado());

		var codColigada = form.getValue("codColigada");
		var codccusto = form.getValue("codCCSetor");

		 var indexes = form.getChildrenIndexes("tbVaga");		
		 for ( var i in indexes) {
		    var sufixoNome = '___' + indexes[i];			

			var codsecao = form.getValue("codSecao" + sufixoNome);
			var codfuncao = form.getValue("codFuncao" + sufixoNome);
			var vagas = getEfetivo(codColigada, codccusto, codsecao, codfuncao);
			form.setValue("numEfetivo" + sufixoNome, vagas.efetivo);
			form.setValue("numReqPendente" + sufixoNome, vagas.reqPendentes);
			
		}		
	}
}

function recuperarAtividadeJS(form, customHTML) {
	customHTML.append("<script>function buscarMatriculaUsuarioLogado(){return " + "'" + buscarMatriculaUsuarioLogado() + "'" + ";}</script>");
	customHTML.append("<script>function buscarEmpresa(){return " + buscarEmpresa() + ";}</script>");
	customHTML.append("<script>function buscarAtividadeAtual(){return " + buscarAtividadeAtual() + ";}</script>");
	customHTML.append("<script>function buscarIdSolicitacao(){return " + buscarIdSolicitacao() + ";}</script>");
	customHTML.append("<script> var FORM_MODE = '" + form.getFormMode() + "';</script>");
}

function getEfetivo(codcoligada, codccusto, codsecao, codfuncao){
	
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codcoligada, codcoligada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCCUSTO", codccusto, codccusto, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODSECAO", codsecao, codsecao, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("CODFUNCAO", codfuncao, codfuncao, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3, c4);

	var dataset = DatasetFactory.getDataset("ds_RM_WS077_QuadroLotacao", null, constraints, null);
	
	var vagas = new Object();
	
	for(var i=0; i < dataset.rowsCount; i++) {
		
		vagas.efetivo = dataset.getValue(i, "EFETIVO") == '' ? 0 : dataset.getValue(i, "EFETIVO");
		vagas.reqPendentes = dataset.getValue(i, "REQPENDENTES") == '' ? 0 : dataset.getValue(i, "REQPENDENTES");		
	}

	return vagas;
	
}