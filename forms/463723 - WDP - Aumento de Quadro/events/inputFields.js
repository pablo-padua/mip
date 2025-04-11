function inputFields(form){
	
	acertaFormatoData(form, "dataSolicitacao");
	acertaFormatoData(form, "HstRepData");
	acertaFormatoData(form, "dataContato");
	acertaFormatoData(form, "dataChegada");
	
	var indexes = form.getChildrenIndexes("tbdependentes");
	for ( var i in indexes) {
	    var sufixoNome = '___' + indexes[i];
	    acertaFormatoData(form, "dtNascimentoDepend" + sufixoNome);
	}
	acertaFormatoData(form, "dataPrevAdmissao");
	acertaFormatoData(form, "dataAprovacaoSelecao");
	acertaFormatoData(form, "dataAprovacaoSelecaoDP");
	acertaFormatoData(form, "dataAprovTestesValida");
	acertaFormatoData(form, "dataAprovacao");
	acertaFormatoData(form, "dataAprovacao2");
	acertaFormatoData(form, "dataAprovacaoDoc");
	acertaFormatoData(form, "dataEmissaoASO");
	acertaFormatoData(form, "dataAprovacaoAdmissao");
	acertaFormatoData(form, "dataAdmissao");
	acertaFormatoData(form, "dataAgendarExames");	
	acertaFormatoData(form, "dataAprovacaoMedicina");
	acertaFormatoData(form, "dataAprovacaoSeguranca");	
	
	movBloco();

	function movBloco(){
		
		/* Permite ao Gestor do Processo realizar movimentação com preenchimento automático dos campos */
		
		var numState = buscarAtividadeAtual();
		var usuario = buscarMatriculaUsuarioLogado();
	
		if(isUsuarioGestor(usuario)){
	
			if(numState == taskTreinarColaborador){
				
				var data = buscaDataAtual();
				
				form.setValue("dataAprovacaoSeguranca", data);
				form.setValue("nomeAprovadorSeguranca", buscarNomeUsuario());
				form.setValue("treinamento", "MipCliente");
				//form.setValue("entregueEPI", "sim");
				form.setValue("dataTreinaMIP", data);
				form.setValue("dataTreinaCliente", data);
	
			}else if(numState == taskEntregarCracha){
				
				var data = buscaDataAtual();
				var dataCracha = buscarDataCracha();
				
				form.setValue("dataCracha", data);
				form.setValue("responsavel", buscarNomeUsuario());
				form.setValue("dataSolicCracha", dataCracha);
				form.setValue("dataLiberaCracha", dataCracha);
	
			}
	
		}
	
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
	
	function buscarDataCracha(){

		var idReq = form.getValue("numRequisicaoSelecao");
		var coligada = form.getValue("codColigada");	
		var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("IDREQ", idReq, idReq, ConstraintType.MUST);
		var constraints = new Array(c1,c2);
		var dataset = DatasetFactory.getDataset("ds_RM_retorna_candidato", null, constraints, null);		
		
		var dtcracha;
		if (dataset.rowsCount == 1) {
			dtcracha = dataset.getValue(0, "DTCRACHA");
		}
		return dtcracha;
	}
	
}

function acertaFormatoData(form, campo){
	
	var regEx = /^\d{4}-\d{2}-\d{2}$/;

	var data = form.getValue(campo);
	
	if (data.match(regEx)) {
		
		var split = form.getValue(campo).split('-');
		form.setValue(campo, split[2] + '/' + split[1] + '/' + split[0]);

	}	
	
}