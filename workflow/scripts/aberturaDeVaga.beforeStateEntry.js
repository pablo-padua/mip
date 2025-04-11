function beforeStateEntry(sequenceId){
	
	if (sequenceId == 17) {	
		var aprovacao = hAPI.getCardValue("aprovacao");		
		if (aprovacao == "corrigir"){
			var numProcesso = getValue ("WKNumProces");     
			var usuarios = getValue ("WKUser");    
			var justificativa = hAPI.getCardValue("justificativa");
			hAPI.setTaskComments(usuarios, numProcesso,  0, "Corrigir. Justificativa: " + justificativa);
		}
	}
	/*
	else if (sequenceId == 51) {	
	
		var matUsuario = hAPI.getCardValue("matrSolicitante");	
    	var listaColab = new java.util.ArrayList();
    	listaColab.add(matUsuario);    	
    	
		var processId = buscarIdProcesso();
		var processIdVerba = "aumentoDeQuadro";
		var numProcess = buscarIdSolicitacao();
		//var atividadeDestino = '16';
		var atividadeDestino = '285';
		var processName = getProcessName(processId);
		var obs = "Solicita\u00e7\u00e3o iniciada automaticamente pelo processo " + processName + " Numero " + numProcess;
		var completarTarefa = true;
		var modoGestor = false;

        var formData = new java.util.HashMap();

        var indexes = getIndexes('camposModal');

    	var iterator = indexes.iterator();
    	while (iterator.hasNext()) {
    		var index = iterator.next();

    		var qtdvagas = hAPI.getCardValue("numeroVagas___" + index);
    		var tipoVaga = hAPI.getCardValue("tipoVaga");
    		var tipoFuncao = hAPI.getCardValue("tipoFuncao");
    		
    		for(var i=0; i<qtdvagas; i++){
    			formData.put("matrSolicitante", hAPI.getCardValue("matrSolicitante"));
    			formData.put("matrAprovadorWRH01", hAPI.getCardValue("matrAprovador"));
    			formData.put("chapaSolicitante", hAPI.getCardValue("chapaSolicitante"));
    			formData.put("codColigadaSolic", hAPI.getCardValue("codColigadaSolic"));
    			var idreq = hAPI.getCardValue("numRequisicaoSelecao___" + index);
    			
    			var valor = idreq.split(";");
    			
    			var req = valor[i];
    			formData.put("numRequisicaoSelecao", req);
    			formData.put("codColigada", hAPI.getCardValue("codColigada"));
	    		formData.put("tipoVaga", hAPI.getCardValue("tipoVaga"));
	    		
				formData.put("codAprovadorVaga", hAPI.getCardValue("codAprovadorVaga"));
	    		formData.put("codAprovadorDiretor", hAPI.getCardValue("codAprovadorDiretor"));    
	    		formData.put("codAprovadorPresid", hAPI.getCardValue("codAprovadorPresid"));
				
	    		formData.put("codPapelDP", hAPI.getCardValue("codDP"));
	    		formData.put("codPapelRH", hAPI.getCardValue("codRH"));
	    		formData.put("codPapelMedicina", hAPI.getCardValue("codMedicina"));
	    		formData.put("codPapelSeguranca", hAPI.getCardValue("codSeguranca"));
	    		formData.put("codPapelAdm", hAPI.getCardValue("codAdm"));
	    		formData.put("tipo", hAPI.getCardValue("tipo"));
	    		
	    		formData.put("nomeSolicitante", hAPI.getCardValue("nomeSolicitante"));
	    		formData.put("dataSolicitacao", hAPI.getCardValue("dataSolicitacao"));
	    		formData.put("obraSetor", hAPI.getCardValue("obraSetor"));
	    		formData.put("codCentroCusto", hAPI.getCardValue("codCentroCusto___" + index));    		
	    		formData.put("centroCusto", hAPI.getCardValue("centroCusto___" + index));    		
	    		formData.put("secao", hAPI.getCardValue("secao___" + index));
	    		formData.put("codSecao", hAPI.getCardValue("codSecao___" + index));
	    		formData.put("funcao", hAPI.getCardValue("funcao___" + index));
	    		formData.put("funcGestao", hAPI.getCardValue("funcGestao___" + index));
	    		formData.put("cargo", hAPI.getCardValue("cargo___" + index));
	    		formData.put("codFuncao", hAPI.getCardValue("codFuncao___" + index));    		
	    		formData.put("salario", hAPI.getCardValue("salario___" + index));
	    		formData.put("camposModal", hAPI.getCardValue("camposModal___" + index));
	    		
	    		var possuiRH = getPossuiRH();
	    		formData.put("possuiRH", possuiRH);
	    		
	    		if(possuiRH == "on")
	    			formData.put("codPapelProcSelDP", hAPI.getCardValue("codDP"));
	    		else
	    			formData.put("codPapelProcSelDP", hAPI.getCardValue("codRH"));

	    		try{

					hAPI.transferTask(listaColab, "Atividade Automática");
					
	    			var startedProcess = hAPI.startProcess(processIdVerba, atividadeDestino, listaColab, obs, completarTarefa, formData, modoGestor);
	    			var codigoSolicAberto = startedProcess.get("iProcess");	    			
	    			 var numProcesso = getValue ("WKNumProces");
	    		     var usuarios = getValue ("WKUser");
	    		     hAPI.setTaskComments(usuarios, numProcesso,  0, "Foi aberta a solicita\u00e7\u00e3o de Aumento de Quadro n\u00famero " + codigoSolicAberto);
	    		} catch (e) {
	    			hAPI.setCardValue("erroStartProcess", e.message);
	    			log.info("-------------------ERRO WEBSERVICE STARTPROCESS NOVA SOLIC ------: "+e.message);
	    		}
    		}

    	}	
		
	}
	*/
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
