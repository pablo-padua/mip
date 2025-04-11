function beforeCancelProcess(colleagueId,processId){
	log.info("WSUP01 - beforeCancelProcess - processId: " + processId);
	var matricula = getValue("WKUser");
	var matriculaSolicitante = hAPI.getCardValue("matriculaSolicitante");
	   var filter = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "WSUP01_WSUP02_GESTOR", "WSUP01_WSUP02_GESTOR", ConstraintType.MUST);
	   var filter2 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", matricula, matricula, ConstraintType.MUST);
	   var constraints   = new Array(filter,filter2);
	   var datasetGrupos = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);
	   log.info("WSUP01 - beforeCancelProcess - datasetGrupos: " + datasetGrupos);
		log.info("WSUP01 - beforeCancelProcess - datasetGrupos.rowsCount: " + datasetGrupos.rowsCount);
		   if(datasetGrupos.rowsCount > 0){
			   var justificativaCancelamento = getValue("WKUserComment");
			   
				log.info("Inicio WSUP01 - beforeCancelProcess - Integracao RM Cadastrar Tabela SC ");
				var cancelouScCompletamente = cancelarScCompletamente(justificativaCancelamento);
				log.info("WSUP01 - beforeCancelProcess - cancelouScCompletamente: " + cancelouScCompletamente);
				if (!cancelouScCompletamente) {
					throw "WSUP01 - Ocorreu um erro inesperado na atividade beforeCancelProcess, não foi possivel cancelar a SC !!!  Entre em contato com a equipe de TI.";
				}
		   }else if(matricula == matriculaSolicitante){
			   var justificativaCancelamento = getValue("WKUserComment");
			   
				log.info("Inicio WSUP01 - beforeCancelProcess - Integracao RM Cadastrar Tabela SC ");
				var cancelouScCompletamente = cancelarScCompletamente(justificativaCancelamento);
				log.info("WSUP01 - beforeCancelProcess - cancelouScCompletamente: " + cancelouScCompletamente);
				if (!cancelouScCompletamente) {
					throw "WSUP01 - Ocorreu um erro inesperado na atividade beforeCancelProcess, não foi possivel cancelar a SC !!!  Entre em contato com a equipe de TI.";
				} 
			   
			   
			   
		   }else{	 		
					throw "Não é possível cancelar o SC. Apenas usuários da Do grupo gestores ou o Solicitante tem esta permissão."; 
	 }  
}
