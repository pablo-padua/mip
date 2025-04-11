function iniciarAumentoQuadro(){
	
	//log.info("#INICIO# iniciarAumentoQuadro()");
	
	var workflow = ServiceManager.getService("ECMWorkflowEngineService");
	var serviceHelper = workflow.getBean();

	var cardData = serviceHelper.instantiate("net.java.dev.jaxb.array.StringArrayArray");

	cardData.getItem().add(setCampo(serviceHelper, "matrSolicitante", hAPI.getCardValue("matrSolicitante")));
	cardData.getItem().add(setCampo(serviceHelper, "matrAprovadorWRH01", hAPI.getCardValue("matrAprovadorWRH01")));
	cardData.getItem().add(setCampo(serviceHelper, "chapaSolicitante", hAPI.getCardValue("chapaSolicitante")));
	cardData.getItem().add(setCampo(serviceHelper, "codColigadaSolic", hAPI.getCardValue("codColigadaSolic")));
	cardData.getItem().add(setCampo(serviceHelper, "numRequisicaoSelecao", hAPI.getCardValue("idReqReabertura")));
	cardData.getItem().add(setCampo(serviceHelper, "codColigada", hAPI.getCardValue("codColigada")));
	cardData.getItem().add(setCampo(serviceHelper, "tipoVaga", hAPI.getCardValue("tipoVaga")));
	cardData.getItem().add(setCampo(serviceHelper, "codAprovadorVaga", hAPI.getCardValue("codAprovadorVaga")));
	cardData.getItem().add(setCampo(serviceHelper, "codAprovadorDiretor", hAPI.getCardValue("codAprovadorDiretor")));
	cardData.getItem().add(setCampo(serviceHelper, "codAprovadorPresid", hAPI.getCardValue("codAprovadorPresid")));
	cardData.getItem().add(setCampo(serviceHelper, "codPapelDP", hAPI.getCardValue("codPapelDP")));
	cardData.getItem().add(setCampo(serviceHelper, "codPapelRH", hAPI.getCardValue("codPapelRH")));
	cardData.getItem().add(setCampo(serviceHelper, "codPapelMedicina", hAPI.getCardValue("codPapelMedicina")));
	cardData.getItem().add(setCampo(serviceHelper, "codPapelSeguranca", hAPI.getCardValue("codPapelSeguranca")));
	cardData.getItem().add(setCampo(serviceHelper, "codPapelAdm", hAPI.getCardValue("codPapelAdm")));
	cardData.getItem().add(setCampo(serviceHelper, "tipo", hAPI.getCardValue("tipo")));
	cardData.getItem().add(setCampo(serviceHelper, "nomeSolicitante", hAPI.getCardValue("nomeSolicitante")));
	cardData.getItem().add(setCampo(serviceHelper, "dataSolicitacao", hAPI.getCardValue("dataSolicitacao")));
	cardData.getItem().add(setCampo(serviceHelper, "obraSetor", hAPI.getCardValue("obraSetor")));
	cardData.getItem().add(setCampo(serviceHelper, "codFilial", hAPI.getCardValue("codFilial")));
	cardData.getItem().add(setCampo(serviceHelper, "codCentroCusto", hAPI.getCardValue("codCentroCusto")));
	cardData.getItem().add(setCampo(serviceHelper, "centroCusto", hAPI.getCardValue("centroCusto")));
	cardData.getItem().add(setCampo(serviceHelper, "secao", hAPI.getCardValue("secao")));
	cardData.getItem().add(setCampo(serviceHelper, "codSecao", hAPI.getCardValue("codSecao")));
	cardData.getItem().add(setCampo(serviceHelper, "codFuncao", hAPI.getCardValue("codFuncao")));
	cardData.getItem().add(setCampo(serviceHelper, "funcao", hAPI.getCardValue("funcao")));
	cardData.getItem().add(setCampo(serviceHelper, "funcGestao", hAPI.getCardValue("funcGestao")));
	cardData.getItem().add(setCampo(serviceHelper, "cargo", hAPI.getCardValue("cargo")));
	cardData.getItem().add(setCampo(serviceHelper, "codFaixa", hAPI.getCardValue("codFaixa")));
	cardData.getItem().add(setCampo(serviceHelper, "nomeFaixa", hAPI.getCardValue("nomeFaixa")));
	cardData.getItem().add(setCampo(serviceHelper, "codTabela", hAPI.getCardValue("codTabela")));
	cardData.getItem().add(setCampo(serviceHelper, "salario", hAPI.getCardValue("salario")));
	cardData.getItem().add(setCampo(serviceHelper, "camposModal", hAPI.getCardValue("camposModal")));
	cardData.getItem().add(setCampo(serviceHelper, "codPapelProcSelDP", hAPI.getCardValue("codPapelProcSelDP")));

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
		
		//log.info("startProcess()");
		
		var result = service.startProcess(usuarioFluig.login, usuarioFluig.senha, companyId, "aumentoDeQuadro", "285", usuario, obs, matUsuario, completarTarefa, attachments, cardData, appointmentDto, modoGestor);
		//startProcess(String user, String password, int companyId, String processId, int choosedState, String[] colleagueIds, String comments, String userId, boolean completeTask, ProcessAttachmentDto[] attachments, String[][] cardData, ProcessTaskAppointmentDto[] appointment, boolean managerMode)
		
		var codigoSolicAberto = "";
		
		//log.info("result.getItem().size(): " + result.getItem().size());

		for (var i = 0; i < result.getItem().size(); i++){
			
			if(result.getItem().get(i).getItem().get(0) == "ERROR")
				throw "Erro (startProcess): " + result.getItem().get(i).getItem().get(1);
			
			if(result.getItem().get(i).getItem().get(0) == "iProcess")
				codigoSolicAberto = result.getItem().get(i).getItem().get(1);
				
			//log.info("result.getItem() >> i: " + i);
							
		}
		
		//log.info("WKUser: " + WKUser);
		//log.info("numProcess: " + numProcess);
		//log.info("codigoSolicAberto: " + codigoSolicAberto);
		
		var nrAtividade = getValue("WKCurrentState");
		var numThread = hAPI.getActualThread(companyId, numProcess, nrAtividade);
		
		//log.info("nrAtividade: " + nrAtividade);
		//log.info("numThread: " + numThread);
						
		hAPI.setTaskComments(WKUser, numProcess, numThread, "Foi aberta a solicitação de Aumento de Quadro número " + codigoSolicAberto);
		
		//log.info("setTaskComments()");

	} catch(e) {
		throw "Erro (startProcess): " + e;
	}
	
	//log.info("#FIM# iniciarAumentoQuadro()");

}

function setCampo(serviceHelper, chave, valor){

	var campo = serviceHelper.instantiate("net.java.dev.jaxb.array.StringArray");
	campo.getItem().add(chave);
	campo.getItem().add(valor);
	
	return campo;	
}