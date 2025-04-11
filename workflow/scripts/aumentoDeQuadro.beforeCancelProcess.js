function beforeCancelProcess(colleagueId,processId){
	
	var numAtividade = getValue("WKNumState");
	
	/* Cancelamento via processo/formulário */
	if( numAtividade == taskSelecaoAprovada39 ||
		numAtividade == taskSelecaoAprovada306 ||
		numAtividade == taskReabrir ||
		numAtividade == taskReabrirAumentoQuadro ||
		numAtividade == gatewayCancela
	){
		
		return true;
		
	}else /* Cancelamento via botão Cancelar do FLUIG */ 
		if(isUsuarioGestor(colleagueId)){
		/* Usuário é Gestor do Processo */
		
		if(	numAtividade == taskProcessoSeletivoRH ||
			numAtividade == taskProcessoSeletivoDP ||
			numAtividade == taskAprovarCandidatoSolicitante ||
			numAtividade == taskAprovarCandidatoGestor
			) {
			
			var justificativa = getValue("WKUserComment");
			cancelaRequisicao(justificativa);

		}else if (  numAtividade == taskValidarDocumentacao || 
					numAtividade == taskRealizarExamesAdmissionais ||
					numAtividade == taskParalela ||
					numAtividade == taskAdmitirColaborador ||
					numAtividade == taskConferirTestes ||
					numAtividade == taskTestesReprovadosRH ||
					numAtividade == taskTreinarColaborador ||
					numAtividade == taskEntregarCracha
				){
					
			throw "<br><br><b>Efetue o cancelamento preenchendo a Justificativa no final do formulário, e utilize o botão Enviar</b><br><br>";
		}
		else
			throw "<br><br><b>Não é permitido efetuar o cancelamento nesta etapa.</b><br><br>" + numAtividade;
		
	}else if(isUsuarioSolicitante(colleagueId,processId)){
		/* Usuário é Solicitante */
		
		if(	numAtividade == taskProcessoSeletivoRH || 
			numAtividade == taskProcessoSeletivoDP
			) {

			var justificativa = getValue("WKUserComment");
			cancelaRequisicao(justificativa);

		}else 
			throw "<br><br><b>Você não pode cancelar esta solicitação. Entre em contato com o Setor Pessoal.</b><br><br>";
		
	}else		
		throw "<br><br><b>Você não pode cancelar esta solicitação. Entre em contato com o Setor Pessoal.</b><br><br>";

}

function isUsuarioGestor(colleagueId){

	var PapelAprovador = 46; // Papel 46 - WRH - Gestor Processos
	var resultado = false;

	var c1 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", PapelAprovador, PapelAprovador, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId", "1", "1", ConstraintType.MUST);

	var constraints = new Array(c1, c2, c3);
	var datasetRM = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);

	if (datasetRM.values != undefined && datasetRM.values != null){
	
		if(datasetRM.rowsCount > 0)
			resultado = true;
	}
	
	return resultado;
}

function isUsuarioSolicitante(colleagueId,processId){

	var resultado = false;

	var c1 = DatasetFactory.createConstraint("requesterId", colleagueId, colleagueId, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", processId, processId, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("workflowProcess.companyId", "1", "1", ConstraintType.MUST);

	var constraints = new Array(c1, c2, c3);
	var datasetRM = DatasetFactory.getDataset("workflowProcess", null, constraints, null);
	
	if (datasetRM.values != undefined && datasetRM.values != null){
	
		if(datasetRM.rowsCount > 0)
			resultado = true;
	}
	
	return resultado;
}