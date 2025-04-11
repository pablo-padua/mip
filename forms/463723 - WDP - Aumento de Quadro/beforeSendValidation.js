var beforeSendValidate = function(numState, nextState) {
	
	/* Permite Tranferir e Salvar sem validar campos */
	if(numState == nextState){
        return;
    }
	/* Permite Tranferir e Salvar sem validar campos */

	var statusCancelamento = $("[name=statusCancelamento]").val();

	if(statusCancelamento == "Cancelamento" || statusCancelamento == "Reabertura") {
	
		if(numState == taskAdmitirColaborador || numState == taskTreinarColaborador || numState == taskEntregarCracha){
			
			if(buscarManagerMode()){
				
				if(candidatoAdmitido())
					throw "É necessário excluir o Funcionário no TOTVS RM antes de efetuar o cancelamento da Solicitação no FLUIG.";
					
			}else{
				throw "Nesta etapa, o cancelamento é restrito ao Gestor do Processo. <br><br> Entre em contato com o Setor Pessoal";
			}
	
		}
	}else if((numState == taskProcessoSeletivoRH || numState == taskProcessoSeletivoDP) && validaDocGED("RhuPessoaData") == false){
		
		//throw "Os documentos pessoais não foram cadastrados no GED. (Tela: Pessoa)";
		
	}else if(numState == taskValidarDocumentacao && $("[name=aprovacaoDoc]").val() == "sim" && validaDocGED("RhuPessoaData") == false){
		
		//throw "Os documentos pessoais não foram cadastrados no GED. (Tela: Pessoa)";
		
	}else if(numState == taskDocumentacaoPendente && validaDocGED("RhuPessoaData") == false){
		
		//throw "Os documentos pessoais não foram cadastrados no GED. (Tela: Pessoa)";
		
	}
	/*
	else if(numState == taskEntregarCracha && validaDocGED("FopFuncData") == false){
		
		throw "Os documentos contratuais não foram cadastrados no GED. (Tela: Funcionário)";
		
	}
	*/
	
	return;
	
	function candidatoAdmitido(){
		
		var candidatoAdmitido = false;

		try{
		
			var coligada = $("[name=codColigada]").val();
			var idReq = $("[name=numRequisicaoSelecao]").val();
			
			var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("IDREQ", idReq, idReq, ConstraintType.MUST);
			var constraints = new Array(c1,c2);
			var dataset = DatasetFactory.getDataset("ds_RM_WS074_candidatoAdmitido", null, constraints, null);
			
			if(dataset.values[0].Admitido == "Sim")
				candidatoAdmitido = true;
			else if(dataset.values[0].Admitido == "Nao")
				candidatoAdmitido =  false;
			else
				throw "Erro (ds_RM_WS074_candidatoAdmitido)";

		} catch(e){
			
			throw "Erro ao tentar consultar dados da Requisição no TOTVS RM. \n\n Tente novamente, caso o erro persista, entre em contato com o setor de TI. \n\n" + e;

		}
		
		return candidatoAdmitido;
		
		
		
		
	}	
	
}