var numero_solicitacao = "";
function validarItens() {
	
	numero_solicitacao = hAPI.getCardValue("numero_solicitacao");
	log.info("-inicio validarItens---WKNumProces=== "+numero_solicitacao);
	
	
	atualizarTabelaAprovRevisao(numero_solicitacao);
	
	log.info("-fim validarItens---WKNumProces=== "+numero_solicitacao);
	return validarMovAtividade(numero_solicitacao);
	

}

function atualizarTabelaAprovRevisao(numero_solicitacao){
	
	//log.info("-inicio validarItens---atualizarTabelaAprovRevisao==  numero_solicitacao  ="+numero_solicitacao);
	var AprovCoordPlanRev = hAPI.getCardValue("tipoAprovCoordPlanRev");
	var AprovGerenteRev = hAPI.getCardValue("tipoAprovGerenteRev");
	var numeroRevSC = hAPI.getCardValue("numeroRevSC");
	
	var nomeCoordPlanAprovRev = hAPI.getCardValue("nomeCoordPlanAprovRev");
	var dataAprovCoordPlanRev = hAPI.getCardValue("dataAprovCoordPlanRev");
	var observacaoAprovCoordPlanRev = hAPI.getCardValue("observacaoAprovCoordPlanRev");

	
	var nomeGerenteAprovRev = hAPI.getCardValue("nomeGerenteAprovRev");
	var dataAprovGerenteRev = hAPI.getCardValue("dataAprovGerenteRev");
	var observacaoAprovGerenteRev = hAPI.getCardValue("observacaoAprovGerenteRev");

	//log.info("-inicio validarItens---atualizarTabelaAprovRevisao==AprovCoordPlanRev = "+AprovCoordPlanRev);
	//log.info("-inicio validarItens---atualizarTabelaAprovRevisao==AprovGerenteRev = "+AprovGerenteRev);
	
	
	if(AprovCoordPlanRev =="aprovado" &&  AprovGerenteRev == "aprovado"){
		
		var indexes = getIndexes("indicePaiFilhoItemRev");
		var iterator = indexes.iterator();
		while(iterator.hasNext()){
			 var indexRev = iterator.next();
			 var numControleRev = hAPI.getCardValue("numControleRev___" + indexRev);
			 
	
			 //log.info("-validarItens---WKNumProces=== "+numero_solicitacao+" --indexRev=== " +indexRev+ "-- numControleRev: "+ numControleRev);
			 //log.info("-validarItens---WKNumProces=== "+numero_solicitacao+" --indexRev=== " +indexRev+ "-- numeroRevSC: "+ numeroRevSC);
			 
			 if(numControleRev == numeroRevSC){
				 hAPI.setCardValue("revisaoAprovadaCoordPlan___" + indexRev, AprovCoordPlanRev);
				 hAPI.setCardValue("dtAprovRevisaoCoordPlan___" + indexRev, dataAprovCoordPlanRev);
				 hAPI.setCardValue("nomeAprovRevisaoCoordPlan___" + indexRev, nomeCoordPlanAprovRev);
				 hAPI.setCardValue("ObsAprovRevisaoCoordPlan___" + indexRev, observacaoAprovCoordPlanRev);
				 
				 hAPI.setCardValue("revisaoAprovadaGerente___" + indexRev, AprovGerenteRev);
				 hAPI.setCardValue("dtAprovRevisaoGerente___" + indexRev, dataAprovGerenteRev);
				 hAPI.setCardValue("nomeAprovRevisaoGerente___" + indexRev, nomeGerenteAprovRev);
				 hAPI.setCardValue("ObsAprovRevisaoGerente___" + indexRev, observacaoAprovGerenteRev);
				 
				 
				 hAPI.setCardValue("tipoAprovCoordPlanRev", "");
				 hAPI.setCardValue("nomeCoordPlanAprovRev", "");
				 hAPI.setCardValue("dataAprovCoordPlanRev", "");
				 hAPI.setCardValue("observacaoAprovCoordPlanRev", "");
				 
				 hAPI.setCardValue("tipoAprovGerenteRev", "");
				 hAPI.setCardValue("nomeGerenteAprovRev", "");
				 hAPI.setCardValue("dataAprovGerenteRev", "");
				 hAPI.setCardValue("observacaoAprovGerenteRev", "");
				 
					//log.info("-validarItens---WKNumProces=== "+numero_solicitacao+" -- dataAprovCoordPlanRev: "+ dataAprovCoordPlanRev);
					//log.info("-validarItens---WKNumProces=== "+numero_solicitacao+" -- nomeCoordPlanAprovRev: "+ nomeCoordPlanAprovRev);
					//log.info("-validarItens---WKNumProces=== "+numero_solicitacao+" -- AprovCoordPlanRev: "+ AprovCoordPlanRev);
					
					//log.info("-validarItens---WKNumProces=== "+numero_solicitacao+" -- dataAprovGerenteRev: "+ dataAprovGerenteRev);
					//log.info("-validarItens---WKNumProces=== "+numero_solicitacao+" -- nomeGerenteAprovRev: "+ nomeGerenteAprovRev);
					//log.info("-validarItens---WKNumProces=== "+numero_solicitacao+" -- AprovGerenteRev: "+ AprovGerenteRev);
					
					//log.info("-validarItens---WKNumProces=== "+numero_solicitacao+" -- tipoAprovCoordPlanRev: "+ hAPI.getCardValue("tipoAprovCoordPlanRev"));
					//log.info("-validarItens---WKNumProces=== "+numero_solicitacao+" -- tipoAprovGerenteRev: "+ hAPI.getCardValue("tipoAprovGerenteRev"));
			}
		}	
	}
}

function validarMovAtividade(numero_solicitacao){
	//Status Solicitacao
	//aberta, fechada, cancelada
	var contadorItens = 0;
	var contadorSolicitacaoIni = 0;
	var contadorStatusFilhaFinalizada = 0;
	var contadorStatusFilhaCancelada = 0;
	var contadorStatusFilhaAberta = 0;
	var contQtdItemValidos = 0;
	
	var indexes = getIndexes("matricRespDePara");
	var iterator = indexes.iterator();
	while(iterator.hasNext()){
		 index = iterator.next();
		 contadorItens++;
		 
		var matricRespDePara = hAPI.getCardValue("matricRespDePara___" + index);
		var idMovRM = hAPI.getCardValue("idMovRM___" + index);
		var numSolicDePara = hAPI.getCardValue("numSolicDePara___" + index);
		var qtdItem = converteMoedaBrParaCalc(hAPI.getCardValue("qtdItem___" + index));
		var itemCancelado = hAPI.getCardValue("itemCancelado___"+index);
		var statusSolicFilha = hAPI.getCardValue("statusSolicFilha___" + index);
		var statusMovRM = hAPI.getCardValue("statusMovRM___" + index);
		var itemEditado = hAPI.getCardValue("itemEditado___" + index);
	
		
		//log.info("-validarItens---numero_solicitacao=== "+numero_solicitacao+" --index=== " +index+ "-- matricRespDePara: "+ matricRespDePara);
		//log.info("-validarItens---numero_solicitacao=== "+numero_solicitacao+" --index=== " +index+ "-- idMovRM: "+ idMovRM);
		//log.info("-validarItens---numero_solicitacao=== "+numero_solicitacao+" --index=== " +index+ "-- numSolicDePara: "+ numSolicDePara);
		//log.info("-validarItens---numero_solicitacao=== "+numero_solicitacao+" --index=== " +index+ "-- qtdItem: "+ qtdItem);
		//log.info("-validarItens---numero_solicitacao=== "+numero_solicitacao+" --index=== " +index+ "-- itemCancelado: "+ itemCancelado);
		//log.info("-validarItens---numero_solicitacao=== "+numero_solicitacao+" --index=== " +index+ "-- statusSolicFilha: "+ statusSolicFilha);
		//log.info("-validarItens---numero_solicitacao=== "+numero_solicitacao+" --index=== " +index+ "-- statusMovRM: "+ statusMovRM);
		
		
		if(qtdItem > 0 && itemCancelado != "sim"){
			contQtdItemValidos++;
		}

		
		
		
		//log.info("- validarItens---numero_solicitacao=== "+numero_solicitacao+"-atualizarTabelaAprovRevisao==itemCancelado != "sim" = "+(itemCancelado != "sim"));
		//log.info("- validarItens---numero_solicitacao=== "+numero_solicitacao+"-atualizarTabelaAprovRevisao==(itemCancelado != "sim") && (statusMovRM == "ItemComprado") = "+((itemCancelado != "sim") && (statusMovRM == "ItemComprado")));
		//log.info("- validarItens---numero_solicitacao=== "+numero_solicitacao+"-atualizarTabelaAprmatricRespDePara == ""= "+matricRespDePara == "");
		if( matricRespDePara == "" && qtdItem > 0 && itemCancelado != "sim"){
			
			return "infoRespVinculacao";
			
		//	statusMovRM = emAndamentoFluig, emAndamentoRm, itemCancelado, ItemComprado
			
			
		}else if((itemCancelado != "sim") && (statusMovRM == "ItemComprado")){
			contadorStatusFilhaFinalizada++;
			
		}	
	}
	
	
	//log.info("- validarItens---numero_solicitacao=== "+numero_solicitacao+"-atualizarTabelaAprovRevisao==contQtdItemValidos = "+contQtdItemValidos);
	//log.info("- validarItens---numero_solicitacao=== "+numero_solicitacao+"-atualizarTabelaAprovRevisao==contadorStatusFilhaFinalizada = "+contadorStatusFilhaFinalizada);

	
	if(contQtdItemValidos == contadorStatusFilhaFinalizada){
		//log.info("-  validarItens---atualizarTabelaAprovRevisao== RETURN FIM SERA FINALIZADA "+numero_solicitacao);
		//throw "Ocorreu um erro ao executar o cancelar Movimento no RM. ERROR: " +e;
		
		return "fim";
		
	}else{
		//log.info("- validarItens---atualizarTabelaAprovRevisao== RETURN  acompGerarReviao ");
		return "acompGerarReviao";
	}
}

function converteMoedaBrParaCalc( moedaBr ){
	var valor = retiraPontoString( moedaBr.toString() );	
	valor = valor.replace(",", ".");

	if(valor != ""){
		return parseFloat(valor);
	} else{
		return parseFloat(0);
	}
}

function retiraPontoString( string ){
	string = string.replace(".", "");
	
	if( string.indexOf(".") >= 0 ){
		string = retiraPontoString( string );
		
	}
	
	return string;
}

function editadoAddNovoItem(indexItem){
	var indexes = getIndexes("matricRespDePara");
	var iterator = indexes.iterator();
	while(iterator.hasNext()){
		 indexItemRevisado = iterator.next();
		 var indicePaiFilhoTbItem = hAPI.getCardValue("indicePaiFilhoTbItem___" + indexItemRevisado);
		 if(indexItem == indicePaiFilhoTbItem){
			 return true;
		 }
	}
}




