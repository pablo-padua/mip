function iniciarProcessoFilho(){
	//log.info("INICIO  --  iniciarProcessoFilho ---");
	var WKNumProces = hAPI.getCardValue("numero_solicitacao");
	log.info("-iniciarProcessoFilho---WKNumProces============================================="+WKNumProces);
	
	var arrayMatriculas = [];
	
	try{
	var indexes = getIndexes("indicePaiFilhoItem");
	var iterator = indexes.iterator();
	while(iterator.hasNext()){
		var index = iterator.next();
		var matricRespDePara = hAPI.getCardValue("matricRespDePara___" + index);
		var numSolicDePara = hAPI.getCardValue("numSolicDePara___" + index);
		var itemExcluido = hAPI.getCardValue("itemExcluido___" + index);

		if(numSolicDePara == "" && matricRespDePara != "" && matricRespDePara != "Contrato" && itemExcluido != "sim"){
			if(validarExistencia(arrayMatriculas, matricRespDePara)){
				arrayMatriculas.push(matricRespDePara);
			}
		
		}
	}
	
	log.info("-iniciarProcessoFilho--  =QTD ABERTURAS====arrayMatriculas.length= "+arrayMatriculas.length);
	for(var a = 0; a < arrayMatriculas.length; a++){
		log.info("-iniciarProcessoFilho---FOR  ANTES DO START ===== a= "+ a);
		log.info("-iniciarProcessoFilho---FOR  ANTES DO START =====arrayMatriculas[a]= " + arrayMatriculas[a]);
		if(iniciarSubProcesso( WKNumProces, arrayMatriculas[a])){
			log.info("-iniciarProcessoFilho---dentro do if ====="+arrayMatriculas[a]);
		}else{
			log.error("ERRO pré requisitos para iniciar uma solicitação não foram atendidos ");
			throw"ERRO pré requisitos para iniciar uma solicitação não foram atendidos";
			return false;
			
		}
	}
	
	
	}catch (e){
    	log.error("ERRO TRY PARTE1 : " + e);
    }
	

	log.info("FIM");
	return true;
	
}	

function iniciarSubProcesso( WKNumProces, matricula){
	
	log.info("-FUNCAO iniciarSubProcesso matricula ENTRADA = " + matricula);
	var index = '';
	var processId = "WSUP02_VincularItensCompras";
	var ativDest = 5;
	var matrSolicitante = hAPI.getCardValue("matrSolicitante");
	var users = new java.util.ArrayList();
	users.add(matricula);
	var numeroSC = hAPI.getCardValue("numeroSC");
	var textoObs = "Processo de Vinculação de Itens iniciado pelo SC: "+numeroSC+" e processo pai Fluig: "+WKNumProces;
try{

		
		var formData = new java.util.HashMap();
			
			formData.put("numero_solicitacaoPai", WKNumProces);
			formData.put("statusSolFilha", "aberta");
			formData.put("matriculaSolicitante", hAPI.getCardValue("matriculaSolicitante"));
			formData.put("matriculaRespDePara", matricula);
			formData.put("codColigadaSolicitante", hAPI.getCardValue("codColigadaSolicitante"));
			formData.put("codUsuarioRM", hAPI.getCardValue("codUsuarioRM"));
			formData.put("chapaSolicitanteRM", hAPI.getCardValue("chapaSolicitanteRM"));
			formData.put("codSCTabelaDocumentoMateriais", hAPI.getCardValue("codSCTabelaDocumentoMateriais"));
			formData.put("apenasCotacao", hAPI.getCardValue("apenasCotacao"));
			
			formData.put("codColSolicitacao", hAPI.getCardValue("codColSolicitacao"));
			formData.put("codFilialSolicitacao", hAPI.getCardValue("codFilialSolicitacao"));
			formData.put("hidden_codVen", hAPI.getCardValue("hidden_codVen"));
			formData.put("naturezaOrcamentaria", hAPI.getCardValue("naturezaOrcamentaria"));
			formData.put("classificacaoFinanceira", hAPI.getCardValue("classificacaoFinanceira"));
			formData.put("idLancamento", hAPI.getCardValue("idLancamento"));
			formData.put("codCfoFunc", hAPI.getCardValue("codCfoFunc"));
			formData.put("numeroRevSC", hAPI.getCardValue("numeroRevSC"));
			formData.put("descricaoSC", hAPI.getCardValue("descricaoSC"));
			formData.put("numeroSC", hAPI.getCardValue("numeroSC"));
			formData.put("nomeSolicitante", hAPI.getCardValue("nomeSolicitante"));
			formData.put("nmColigadaSolicitante", hAPI.getCardValue("nmColigadaSolicitante"));
			formData.put("nmColigadaSolicitante", hAPI.getCardValue("nmColigadaSolicitante"));
			formData.put("nmFilialSolicitante", hAPI.getCardValue("nmFilialSolicitante"));
			formData.put("nmFantColSolicitacao", hAPI.getCardValue("nmFantColSolicitacao"));
			formData.put("TMOV_CODCOLIGADA", hAPI.getCardValue("TMOV_CODCOLIGADA"));
			formData.put("nmFantFilialSolicitacao", hAPI.getCardValue("nmFantFilialSolicitacao"));
			formData.put("TMOV_CODFILIAL", hAPI.getCardValue("TMOV_CODFILIAL"));
			formData.put("tipoMovimento", hAPI.getCardValue("tipoMovimento"));
			formData.put("tiporequisicao", hAPI.getCardValue("tiporequisicao"));
			formData.put("responsavelAprovacao", hAPI.getCardValue("responsavelAprovacao"));
			formData.put("MOV_GCCUSTO_CODCCUSTO", hAPI.getCardValue("MOV_GCCUSTO_CODCCUSTO"));
			formData.put("MOV_GCCUSTO_CODREDUZIDO", hAPI.getCardValue("MOV_GCCUSTO_CODREDUZIDO"));
			formData.put("MOV_GCCUSTO_COD_RESPONSAVEL", hAPI.getCardValue("MOV_GCCUSTO_COD_RESPONSAVEL"));
			formData.put("MOV_GCCUSTO_NOME_RESPONSAVEL", hAPI.getCardValue("MOV_GCCUSTO_NOME_RESPONSAVEL"));
			formData.put("MOV_GCCUSTO_ID_GCCUSTO", hAPI.getCardValue("MOV_GCCUSTO_ID_GCCUSTO"));
			formData.put("NUM_FIXO_OBRA", hAPI.getCardValue("NUM_FIXO_OBRA"));
			formData.put("localEstoque", hAPI.getCardValue("localEstoque"));
			formData.put("TMOV_CODLOC", hAPI.getCardValue("TMOV_CODLOC"));
			formData.put("filialDestino", hAPI.getCardValue("filialDestino"));
			formData.put("localDestino", hAPI.getCardValue("localDestino"));
			formData.put("TMOV_CODFILIALDESTINO", hAPI.getCardValue("TMOV_CODFILIALDESTINO"));
			formData.put("TMOV_CODLOCDESTINO", hAPI.getCardValue("TMOV_CODLOCDESTINO"));
			formData.put("TMOVHISTORICO_HISTORICOLONGO", hAPI.getCardValue("TMOVHISTORICO_HISTORICOLONGO"));
			formData.put("centroCustoSolicitacao", hAPI.getCardValue("centroCustoSolicitacao"));
			formData.put("disciplinaSC", hAPI.getCardValue("disciplinaSC"));
			formData.put("departamentoSC", hAPI.getCardValue("departamentoSC"));
			formData.put("hidden_CODDEPARTAMENTO", hAPI.getCardValue("hidden_CODDEPARTAMENTO"));
			formData.put("obsGeralSolicitacao", hAPI.getCardValue("obsGeralSolicitacao"));
			

			var indexes = getIndexes("indicePaiFilhoItem");
			var iterator = indexes.iterator();
			while(iterator.hasNext()){
				 index = iterator.next();
				var matricRespDePara = hAPI.getCardValue("matricRespDePara___" + index);
				var numSolicDePara = hAPI.getCardValue("numSolicDePara___" + index);
				var itemExcluido = hAPI.getCardValue("itemExcluido___" + index);

				if(numSolicDePara == "" && matricRespDePara != "Contrato" && itemExcluido != "sim" && matricRespDePara == matricula){

					log.info("-iniciarProcessoFilho---entrou no if do  =====matricDePara:="+matricRespDePara);

					formData.put("descMatOrigem___"+index, hAPI.getCardValue("descMatOrigem___"+index));
					//formData.put("codMatOrigem___"+index, hAPI.getCardValue("codMatOrigem___"+index));
					formData.put("qtdItem___"+index, hAPI.getCardValue("qtdItem___"+index));
					formData.put("qtdItemRM___"+index, hAPI.getCardValue("qtdItem___"+index));
					formData.put("unidOrigem___"+index, hAPI.getCardValue("unidOrigem___"+index));
					formData.put("CODUND___"+index, hAPI.getCardValue("unidOrigem___"+index));
					//formData.put("unidRM___"+index, hAPI.getCardValue("unidOrigem___"+index));
					//formData.put("CODUNDRM___"+index, hAPI.getCardValue("unidOrigem___"+index));
					formData.put("indicePaiFilhoItem___"+index, hAPI.getCardValue("indicePaiFilhoItem___"+index));
					
					formData.put("numItemDocMat___"+index, hAPI.getCardValue("numItemDocMat___"+index));
					formData.put("revDocMatOrigem___"+index, hAPI.getCardValue("revDocMatOrigem___"+index));
					formData.put("dtNecessidadeMatOrigem___"+index, hAPI.getCardValue("dtNecessidadeMatOrigem___"+index));
					formData.put("itemPQ___"+index, hAPI.getCardValue("itemPQ___"+index));
					formData.put("codPetrobras___"+index, hAPI.getCardValue("codPetrobras___"+index));
					formData.put("codProjetista___"+index, hAPI.getCardValue("codProjetista___"+index));
					formData.put("indicePaiFilhoDePara___"+index, index.toString());

		
				}
			}
			
			
			
    		log.info("WSUP01.iniciarProcessoFilho-processId===" + processId);
    		log.info("WSUP01.iniciarProcessoFilho-ativDest===" + ativDest);
    		log.info("WSUP01.iniciarProcessoFilho-users===" + users);
    		log.info("WSUP01.iniciarProcessoFilho-textoObs===" + textoObs);
    		log.info("WSUP01.iniciarProcessoFilho-formData===" + formData);
    		

    		
			// inicia um processo para cada candidato aprovado.
			var startMap = hAPI.startProcess(processId, ativDest, users, textoObs, true, formData, false);
			
			var iProcess = startMap.get("iProcess");
			var iProcessInt = parseInt(iProcess);
			log.info('INICIADO O PROCESSO iProcess= '+iProcess);
			if(isNaN(iProcessInt)){
				throw"ERRO - No retorno do startProcess ";
			}else{
				gravarCamposFilhos(iProcessInt, matricula);
				var usuarioLogado = getValue('WKUser')
				hAPI.setTaskComments(usuarioLogado, WKNumProces,  0, "Iniciado o processo de Vinculação de itens Número:"+iProcess+".");
				
				log.info("FIM -- iniciarSubProcesso-------sucesso---------------------------");
				return true;	
			
			}
			
  
}catch (e){
	log.error("ERRO TRY PARTE2 : " + e);
}
}


function now() {
	var formato = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formato.format(new java.util.Date());
}

function validarExistencia (Array, b) {

    if (Array.toString().indexOf(b) === -1) {
        return true;
    } else if (Array.indexOf(b) > -1) {
        return false;
    }
}

function gravarCamposFilhos(iProcessInt, matricula){
	var indexes = getIndexes("indicePaiFilhoItem");
	var iterator = indexes.iterator();
	while(iterator.hasNext()){
		 index = iterator.next();
		var matricDePara = hAPI.getCardValue("matricRespDePara___"+index);
		if(hAPI.getCardValue("numSolicDePara___"+index) == "" && matricDePara == matricula){
			log.info("-iniciarProcessoFilho---ANTES GRAVANDO NUMSOLICITAÇÃO ABERTA NO PAI X FILHO matricDePara2:= " + matricDePara);

			hAPI.setCardValue("numSolicDePara___" + index, iProcessInt);
			hAPI.setCardValue("statusSolFilha___" + index, "aberta");
			
			log.info("-iniciarProcessoFilho---DEPOIS GRAVANDO NUMSOLICITAÇÃO ABERTA NO PAI X FILHO matricDePara2:= " + matricDePara);
		}
	}
}