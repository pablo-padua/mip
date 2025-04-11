function iniciarAumentoQuadro(){
	
	var workflow = ServiceManager.getService("ECMWorkflowEngineService");
	var serviceHelper = workflow.getBean();
	
    var indexes = getIndexes('camposModal');

	var iterator = indexes.iterator();
	
	//log.info("### iterator: " + iterator);

	while (iterator.hasNext()) {

		var index = iterator.next();

		var qtdvagas = hAPI.getCardValue("numeroVagas___" + index);
		
		//log.info("### qtdvagas: " + qtdvagas);
		
		for(i=0; i<qtdvagas; i++){

			var idreq = hAPI.getCardValue("numRequisicaoSelecao___" + index);
			var valor = idreq.split(";");
			var req = valor[i];
			
			if(aumentoQuadroExiste(hAPI.getCardValue("codColigada"), req) == false){

				var cardData = serviceHelper.instantiate("net.java.dev.jaxb.array.StringArrayArray");
				
				cardData.getItem().add(setCampo(serviceHelper, "numRequisicaoSelecao", req));
				//log.info("### req: " + req);
				
				cardData.getItem().add(setCampo(serviceHelper, "matrSolicitante", hAPI.getCardValue("matrSolicitante")));
				cardData.getItem().add(setCampo(serviceHelper, "matrAprovadorWRH01", hAPI.getCardValue("matrAprovador")));
				cardData.getItem().add(setCampo(serviceHelper, "chapaSolicitante", hAPI.getCardValue("chapaSolicitante")));
				cardData.getItem().add(setCampo(serviceHelper, "codColigadaSolic", hAPI.getCardValue("codColigadaSolic")));
				cardData.getItem().add(setCampo(serviceHelper, "codColigada", hAPI.getCardValue("codColigada")));
				cardData.getItem().add(setCampo(serviceHelper, "tipoVaga", hAPI.getCardValue("tipoVaga")));
				cardData.getItem().add(setCampo(serviceHelper, "codAprovadorVaga", hAPI.getCardValue("codAprovadorVaga")));
				cardData.getItem().add(setCampo(serviceHelper, "codAprovadorDiretor", hAPI.getCardValue("codAprovadorDiretor")));
				cardData.getItem().add(setCampo(serviceHelper, "codAprovadorPresid", hAPI.getCardValue("codAprovadorPresid")));
				cardData.getItem().add(setCampo(serviceHelper, "codPapelDP", hAPI.getCardValue("codDP")));
				cardData.getItem().add(setCampo(serviceHelper, "codPapelRH", hAPI.getCardValue("codRH")));
				cardData.getItem().add(setCampo(serviceHelper, "codPapelMedicina", hAPI.getCardValue("codMedicina")));
				cardData.getItem().add(setCampo(serviceHelper, "codPapelSeguranca", hAPI.getCardValue("codSeguranca")));
				cardData.getItem().add(setCampo(serviceHelper, "codPapelAdm", hAPI.getCardValue("codAdm")));
				cardData.getItem().add(setCampo(serviceHelper, "tipo", hAPI.getCardValue("tipo")));
				cardData.getItem().add(setCampo(serviceHelper, "nomeSolicitante", hAPI.getCardValue("nomeSolicitante")));
				cardData.getItem().add(setCampo(serviceHelper, "dataSolicitacao", hAPI.getCardValue("dataSolicitacao")));
				cardData.getItem().add(setCampo(serviceHelper, "obraSetor", hAPI.getCardValue("obraSetor")));
				
				cardData.getItem().add(setCampo(serviceHelper, "codFilial", hAPI.getCardValue("codFilial___" + index)));
				cardData.getItem().add(setCampo(serviceHelper, "codCentroCusto", hAPI.getCardValue("codCentroCusto___" + index)));
				cardData.getItem().add(setCampo(serviceHelper, "centroCusto", hAPI.getCardValue("centroCusto___" + index)));
				cardData.getItem().add(setCampo(serviceHelper, "secao", hAPI.getCardValue("secao___" + index)));			
				cardData.getItem().add(setCampo(serviceHelper, "codSecao", hAPI.getCardValue("codSecao___" + index)));
				cardData.getItem().add(setCampo(serviceHelper, "codFuncao", hAPI.getCardValue("codFuncao___" + index)));
				cardData.getItem().add(setCampo(serviceHelper, "funcao", hAPI.getCardValue("funcao___" + index)));
				cardData.getItem().add(setCampo(serviceHelper, "funcGestao", hAPI.getCardValue("funcGestao___" + index)));
				cardData.getItem().add(setCampo(serviceHelper, "cargo", hAPI.getCardValue("cargo___" + index)));
				cardData.getItem().add(setCampo(serviceHelper, "codFaixa", hAPI.getCardValue("codFaixa___" + index)));
				cardData.getItem().add(setCampo(serviceHelper, "nomeFaixa", hAPI.getCardValue("nomeFaixa___" + index)));
				cardData.getItem().add(setCampo(serviceHelper, "codTabela", hAPI.getCardValue("codTabela___" + index)));
				cardData.getItem().add(setCampo(serviceHelper, "salario", hAPI.getCardValue("salario___" + index)));
				cardData.getItem().add(setCampo(serviceHelper, "camposModal", hAPI.getCardValue("camposModal___" + index)));
				cardData.getItem().add(setCampo(serviceHelper, "divulgacaoVaga", hAPI.getCardValue("divulgacaoVaga___" + index)));
				var possuiRH = getPossuiRH();
				cardData.getItem().add(setCampo(serviceHelper, "possuiRH", possuiRH));
	
		   		if(possuiRH == "on"){
					cardData.getItem().add(setCampo(serviceHelper, "codPapelProcSelDP", hAPI.getCardValue("codDP")));
				}
		   		else{
					cardData.getItem().add(setCampo(serviceHelper, "codPapelProcSelDP", hAPI.getCardValue("codRH")));
				}			
				
				//log.info("########## Inicia StartProcess");
				
				try {
					
					var serviceLocator = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
					var service = serviceLocator.getWorkflowEngineServicePort();
					var attachments = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
					var appointmentDto = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
					var usuario = serviceHelper.instantiate("net.java.dev.jaxb.array.StringArray");
					
					var processId = getValue("WKDef");
					var processName = getProcessName(processId);
					var numProcess = getValue("WKNumProces");
					var companyId = getValue("WKCompany");
					var WKUser = getValue ("WKUser");
					
					var obs = "Solicitação iniciada automaticamente pelo processo " + processName + " Numero " + numProcess;
			
					var matUsuario = hAPI.getCardValue("matrSolicitante");		
					var completarTarefa = true;
					var modoGestor = false;
					
					var usuarioFluig = loginFluig();
					
					//log.info("### usuarioFluig.login: " + usuarioFluig.login);
					//log.info("### companyId: " + companyId);
					
					var result = service.startProcess(usuarioFluig.login, usuarioFluig.senha, companyId, "aumentoDeQuadro", "285", usuario, obs, matUsuario, completarTarefa, attachments, cardData, appointmentDto, modoGestor);
					//startProcess(String user, String password, int companyId, String processId, int choosedState, String[] colleagueIds, String comments, String userId, boolean completeTask, ProcessAttachmentDto[] attachments, String[][] cardData, ProcessTaskAppointmentDto[] appointment, boolean managerMode)
					
					var codigoSolicAberto = "";
	
					for (j = 0; j < result.getItem().size(); j++){
						
						if(result.getItem().get(j).getItem().get(0) == "ERROR")
							throw "Erro (startProcess): " + result.getItem().get(j).getItem().get(1);
						
						if(result.getItem().get(j).getItem().get(0) == "iProcess")
							codigoSolicAberto = result.getItem().get(j).getItem().get(1);
					}
					
					//log.info("### codigoSolicAberto: " + codigoSolicAberto);
					//log.info("### WKUser: " + WKUser);
					//log.info("### numProcess: " + numProcess);
	
					hAPI.setTaskComments(WKUser, numProcess,  0, "Foi aberta a solicitação de Aumento de Quadro número " + codigoSolicAberto);
	
				} catch(e) {
					throw "Erro (startProcess): " + e;
				}
				
			}
			
			//log.info("### FIM for");
		}

	}
	
	//log.info("### FIM while");

}

function getIndexes(fieldReference){
	var regex = new RegExp(fieldReference+'___');
	var map = hAPI.getCardData(parseInt(getValue('WKNumProces')));
	var iterator = map.keySet().iterator();
	var indexes = new java.util.TreeSet();	
	
	while(iterator.hasNext()){
		var id = iterator.next();
		
		if(id.match(regex) == null) continue; 
		else indexes.add(id.split('___')[1]);
	}
	
	return indexes;
}

function getProcessName(processId){
	processName = "";
	var fields = null;
	var constraints = [];
	var order = null;

	constraints.push(DatasetFactory.createConstraint("processDefinitionPK.processId",processId,processId,ConstraintType.MUST));

	var dataset = DatasetFactory.getDataset("processDefinition",fields,constraints,order);
	
	if(dataset != null && dataset.rowsCount > 0){
		processName = dataset.getValue(0,"processDescription");
	}
	
	return processName;
}

/* Verifica no cadastro de Alçadas o campo "Possui RH" */
function getPossuiRH(){
	
	var fields = null;
	var constraints = [];
	var order = null;	
	var codColigada = hAPI.getCardValue("codColigada");
	var codCentroCusto = hAPI.getCardValue("codCCSetor");
	
	constraints.push(DatasetFactory.createConstraint("codColigada", codColigada, codColigada, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("codCentroCusto", codCentroCusto, codCentroCusto, ConstraintType.MUST));
	
	var dataset = DatasetFactory.getDataset("ds_alcada_aprovacao",fields,constraints,order);
	
	return dataset.getValue(0,"possuiRH");

}

function setCampo(serviceHelper, chave, valor){

	var campo = serviceHelper.instantiate("net.java.dev.jaxb.array.StringArray");
	campo.getItem().add(chave);
	campo.getItem().add(valor);
	
	return campo;	
}

function loginFluig(){

	try{
		
		var connect = DatasetFactory.getDataset('ds_mip_connector', null, null, null);
		
		var usuario = new Object();
		usuario.login = connect.getValue(0, 'USUARIOECM');
		usuario.senha = connect.getValue(0, 'SENHAECM');
		
		return usuario;
		
	}catch(e){
		
		throw "Erro dataset (ds_mip_connector): " + e;
		
	}	
	
}

function aumentoQuadroExiste(codColigada, idReq) {

	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDREQ", idReq, idReq, ConstraintType.MUST);

	var constraints = new Array(c1, c2);
	var ds = DatasetFactory.getDataset("ds_WRH02_AumentoQuadro_IDREQ", null, constraints, null);

	if(ds == null){
		
		throw "Erro (ds_WRH02_AumentoQuadro_IDREQ)";
		
	} else {
		
		if (ds.getValue(0, "numRequisicaoSelecao") == idReq)
			return true;
		else
			return false;

	}

}