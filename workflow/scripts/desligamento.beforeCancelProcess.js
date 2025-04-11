function beforeCancelProcess(colleagueId, processId) {
	var justificativaCancelamento = getValue("WKUserComment");
	if (justificativaCancelamento == null || justificativaCancelamento == "") {
		throw "A observação deve ser preenchida";
	}

	var atividadeAtualTemp = getValue("WKNumState");
	var arrayObjAtividades = [];
	var CODSTATUS = "";

	// PEGANDO O O STATUS DA REQUISIÇÃO
	var CODCOLIGADA = hAPI.getCardValue("codColigada");
	var CHAPA = hAPI.getCardValue("chapa");
	var IDREQ = hAPI.getCardValue("numRequisicaoSelecao");
	if (IDREQ != "") {
		/*
		 * Função verifica se usuário está dentro de determinado grupo; A
		 * consulta é feita no dataset colleagueGroup; O filtro é o nome do
		 * grupo e matrícula;
		 */
		var matricula = getValue("WKUser");

		//var filter = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", "46", "46",ConstraintType.MUST);
		//var filter2 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", matricula, matricula,ConstraintType.MUST);
		//var constraints = new Array(filter, filter2);
		//var datasetGrupos = DatasetFactory.getDataset("workflowColleagueRole",null, constraints, null);
		//if (datasetGrupos.rowsCount > 0) {
		
			var c1 = DatasetFactory.createConstraint("CODCOLIGADA",CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("IDREQ", IDREQ, IDREQ,ConstraintType.MUST);
			var datasetGrupos = DatasetFactory.getDataset("ds_RM_retorna_statusRequisicaoDesligamento", null, new Array(c1, c2), null);
			CODSTATUS = datasetGrupos.getValue(0, "CODSTATUS");
			// 1 Em Andamento 2 Reprovado 3 Aprovado 4 Concluída 5 Pendente 6 Cancelada 7 Suspensa

			if (CODSTATUS == "" || CODSTATUS == undefined || CODSTATUS == null) {
				throw "Requisição de número:"
				+ IDREQ
				+ ", Não foi localizada no RM .";
			}			
			
			if ( CODSTATUS != "4") {
				
				if (atividadeAtualTemp.indexOf(",") > -1) {
					
					var atividadeAtualSplit = atividadeAtualTemp.split(",");
					var executouCancelamento = 0;
	
					for (var a = 0; a < atividadeAtualSplit.length; a++) {
						
						var atividadeAtual = atividadeAtualSplit[a];
						
						if (atividadeAtual == INTEGRA_REQ ||
							atividadeAtual == ERRO_INTEGRA_REQ ||
							atividadeAtual == ASSINAR_AVISO ||
							atividadeAtual == INTEGRA_AVISO ||
							atividadeAtual == ERRO_INTEGRA_AVISO ||
							atividadeAtual == AGENDAR_EXAMES ||
							atividadeAtual == QUITA_TI ||
							atividadeAtual == QUITA_LOS ||
							atividadeAtual == QUITA_ADM ||
							atividadeAtual == QUITA_FIN ||							
							atividadeAtual == NOTIFICAR ||
							atividadeAtual == ENTREVISTA ||
							atividadeAtual == CALC_OBRA ||
							atividadeAtual == VALIDAR_OBRA ||
							atividadeAtual == CALC_SEDE ||
							atividadeAtual == VALIDAR_SEDE ||
							atividadeAtual == VALIDAR_EXAMES ||							
							atividadeAtual == AGENDAR_PAG ||
							atividadeAtual == HOMOLOGAR
						) {

							// CANCELAR REQUISIÇÃO RM
							if(executouCancelamento == 0){
								cancelaRequisicao(justificativaCancelamento);
								executouCancelamento = 1;
							}
						}
					}
	
				} else {
					
					var atividadeAtual = atividadeAtualTemp;
					
					if (atividadeAtual == INTEGRA_REQ ||
							atividadeAtual == ERRO_INTEGRA_REQ ||
							atividadeAtual == ASSINAR_AVISO ||
							atividadeAtual == INTEGRA_AVISO ||
							atividadeAtual == ERRO_INTEGRA_AVISO ||
							atividadeAtual == AGENDAR_EXAMES ||
							atividadeAtual == QUITA_TI ||
							atividadeAtual == QUITA_LOS ||
							atividadeAtual == QUITA_ADM ||
							atividadeAtual == QUITA_FIN ||							
							atividadeAtual == NOTIFICAR ||
							atividadeAtual == ENTREVISTA ||
							atividadeAtual == CALC_OBRA ||
							atividadeAtual == VALIDAR_OBRA ||
							atividadeAtual == CALC_SEDE ||
							atividadeAtual == VALIDAR_SEDE ||
							atividadeAtual == VALIDAR_EXAMES ||							
							atividadeAtual == AGENDAR_PAG ||
							atividadeAtual == HOMOLOGAR
						) {

							// CANCELAR REQUISIÇÃO RM
							cancelaRequisicao(justificativaCancelamento);
						}
				}
				
			} else {
				throw "Existe uma requisição de desligamento com o número:"
						+ IDREQ
						+ ", com o status Concluída. Não é possível cancelar esta solicitação .";
			}

		//}else{
		//	throw "Não é possível cancelar o solicitação. Apenas usuários da Do grupo gestores tem esta permissão."; 
		//}
	}
}