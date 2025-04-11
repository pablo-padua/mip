function beforeStateEntry(sequenceId){
	
	if (sequenceId == 273){ // Antigo fim com cancelamento ------------------------------------------------------
		
		var aprovacaoMedicina = hAPI.getCardValue("aprovacaoMedicina");
		
		if (aprovacaoMedicina == "Inapto"){
			var matUsuario = hAPI.getCardValue("matrSolicitante");	
			var listaColab = new java.util.ArrayList();
			listaColab.add(matUsuario);
			
			var processId = getValue("WKDef");
			var processIdVerba = "aumentoDeQuadro";
			var numProcess = getValue("WKNumProces");
			//var atividadeDestino = "16";
			var atividadeDestino = "285";
			var processName = getProcessName(processId);
			var obs = "Solicita\u00e7\u00e3o iniciada automaticamente pelo processo " + processName + " Numero " + numProcess + " por inaptid\u00e3o do candidato " + hAPI.getCardValue("nomeCandidato");
			var completarTarefa = true;
			var modoGestor = false;			
			
		    var formData = new java.util.HashMap();      
		    		
		    formData.put("matrSolicitante", hAPI.getCardValue("matrSolicitante"));
		    formData.put("matrAprovadorWRH01", hAPI.getCardValue("matrAprovadorWRH01"));
			formData.put("chapaSolicitante", hAPI.getCardValue("chapaSolicitante"));
			formData.put("numRequisicaoSelecao", hAPI.getCardValue("numRequisicaoSelecao"));
			formData.put("codColigada", hAPI.getCardValue("codColigada"));
    		formData.put("tipoVaga", hAPI.getCardValue("tipoVaga"));
    		
			formData.put("codAprovadorVaga", hAPI.getCardValue("codAprovadorVaga"));
    		formData.put("codAprovadorDiretor", hAPI.getCardValue("codAprovadorDiretor"));    
    		formData.put("codAprovadorPresid", hAPI.getCardValue("codAprovadorPresid"));
			
    		formData.put("codPapelDP", hAPI.getCardValue("codPapelDP"));
    		formData.put("codPapelRH", hAPI.getCardValue("codPapelRH"));
    		formData.put("codPapelProcSelDP", hAPI.getCardValue("codPapelProcSelDP"));
    		formData.put("codPapelMedicina", hAPI.getCardValue("codPapelMedicina"));
    		formData.put("codPapelSeguranca", hAPI.getCardValue("codPapelSeguranca"));
    		formData.put("codPapelAdm", hAPI.getCardValue("codPapelAdm"));
    		formData.put("tipo", hAPI.getCardValue("tipo"));
    		formData.put("possuiRH", hAPI.getCardValue("possuiRH"));
    		
    		formData.put("nomeSolicitante", hAPI.getCardValue("nomeSolicitante"));
    		formData.put("dataSolicitacao", hAPI.getCardValue("dataSolicitacao"));
    		formData.put("obraSetor", hAPI.getCardValue("obraSetor"));
    		formData.put("codCentroCusto", hAPI.getCardValue("codCentroCusto"));    		
    		formData.put("centroCusto", hAPI.getCardValue("centroCusto"));
    		formData.put("secao", hAPI.getCardValue("secao"));
    		formData.put("codSecao", hAPI.getCardValue("codSecao"));
    		formData.put("funcao", hAPI.getCardValue("funcao"));
    		formData.put("funcGestao", hAPI.getCardValue("funcGestao"));	    		
    		formData.put("codFuncao", hAPI.getCardValue("codFuncao"));    		
    		formData.put("salario", hAPI.getCardValue("salario"));
    		
    		var indexes = getIndexes("cpf");
	    	var iterator = indexes.iterator();
	    	while (iterator.hasNext()) {
	    		var index = iterator.next();
	    		formData.put("cpf___" + index, hAPI.getCardValue("cpf___" + index));
	    		formData.put("nome___" + index, hAPI.getCardValue("nome___" + index));
	    		formData.put("email___" + index, hAPI.getCardValue("email___" + index));
	    		formData.put("telefone___" + index, hAPI.getCardValue("telefone___" + index));
	    		formData.put("telefone2___" + index, hAPI.getCardValue("telefone2___" + index));
	    		formData.put("ultFuncao___" + index, hAPI.getCardValue("ultFuncao___" + index));
	    		formData.put("ultSecao___" + index, hAPI.getCardValue("ultSecao___" + index));
	    		formData.put("pis___" + index, hAPI.getCardValue("pis___" + index));
	    	}
		
			try{
				hAPI.startProcess(processIdVerba, atividadeDestino, listaColab, obs, completarTarefa, formData, modoGestor);
				var codigoSolicAberto = startedProcess.get("iProcess");
				 var numProcesso = getValue ("WKNumProces");
			     var usuarios = getValue ("WKUser");
			     hAPI.setTaskComments(usuarios, numProcesso,  0, "Candidado Inapto. Foi aberta uma nova solicita\u00e7\u00e3o de Aumento de Quadro: " + codigoSolicAberto);
			} catch (e) {
				log.info("-------------------ERRO WEBSERVICE STARTPROCESS NOVA SOLIC ------: "+e.message);
			}  
		}
		
	} 
	
	else if (sequenceId == 451) {

		var recursoComputacional = hAPI.getCardValue("hiddenRecursoComput");
/*
		if (recursoComputacional == "1"){
			var matUsuario = hAPI.getCardValue("matrSolicitante");
			var listaColab = new java.util.ArrayList();
			listaColab.add(matUsuario);
			
			var processId = getValue("WKDef");
			var processIdVerba = "W07 - Solicita\u00e7\u00e3o de Recursos de TI";
			var numProcess = getValue("WKNumProces");
			var atividadeDestino = "4";
			var processName = getProcessName(processId);
			var obs = "Solicita\u00e7\u00e3o iniciada automaticamente pelo processo " + processName + " Nº " + numProcess;
			var completarTarefa = false;
			var modoGestor = false;
			
		    var formData = new java.util.HashMap();
		    		
			formData.put("cpSolicitanteNome", hAPI.getCardValue("nomeSolicitante"));
			formData.put("cpDataCriacao", hAPI.getCardValue("dataSolicitacao"));
			formData.put("cpPessoaNome", hAPI.getCardValue("nomeCandidato"));
			formData.put("cpPessoaNomeDigitado", hAPI.getCardValue("nomeCandidato"));
			formData.put("cpFuncao", hAPI.getCardValue("funcao"));
		
			try{	
				var startMap = hAPI.startProcess(processIdVerba, atividadeDestino, listaColab, obs, completarTarefa, formData, modoGestor);

			} catch (e) {
				log.info("-------------------ERRO WEBSERVICE STARTPROCESS NOVA SOLIC ------: "+e.message);
			}
		}
*/		
	} else if (sequenceId == 402 || sequenceId == 96 || sequenceId == 230){
	
		hAPI.setCardValue("qtdAnexosFluig", hAPI.listAttachments().size());
		
	}
}