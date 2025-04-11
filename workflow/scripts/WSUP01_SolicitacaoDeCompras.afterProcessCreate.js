function afterProcessCreate(processId){
	var numero_da_solicitacao = getValue("WKNumProces");
	
	hAPI.setCardValue("numero_solicitacao", numero_da_solicitacao);
	if(hAPI.getCardValue("TMOV_CODFILIAL") == '1'){
		hAPI.setCardValue("nmFantFilialSolicitacao", '1 - Sede');
	}
	gerarSequencialSC(numero_da_solicitacao);
}

function gerarSequencialSC(numero_da_solicitacao){
	try{
	
	
	var NUM_FIXO_OBRA = hAPI.getCardValue("NUM_FIXO_OBRA");
	log.info("beforeStateEntry - WSUP01-RequisicaoCompras - numero_da_solicitacao: "+numero_da_solicitacao+" - NUM_FIXO_OBRA:  "+NUM_FIXO_OBRA);
	var NUM_FIXO_OBRA_SPLIT = new String(NUM_FIXO_OBRA).split(".");	
	log.info("beforeStateEntry - WSUP01-RequisicaoCompras - numero_da_solicitacao: "+numero_da_solicitacao+" - NUM_FIXO_OBRA_SPLIT:  "+NUM_FIXO_OBRA_SPLIT);
	var NUM_DESMENBRADO = parseInt(NUM_FIXO_OBRA_SPLIT[1]);
	log.info("beforeStateEntry - WSUP01-RequisicaoCompras - numero_da_solicitacao: "+numero_da_solicitacao+" - NUM_DESMENBRADO:  "+NUM_DESMENBRADO);
	var digito = '4';
	
	if(parseInt(NUM_DESMENBRADO) == 0){
		digito = '9';
	}else if(parseInt(NUM_DESMENBRADO) == 1){
		digito = '8';
	}else{
		digito = '4';
	}
	log.info("beforeStateEntry - WSUP01-RequisicaoCompras - numero_da_solicitacao: "+numero_da_solicitacao+" - digito:  "+digito);
	var numeroSC = '';

	//ESTA em estudo junto a TOTTVS A ALTERAÇÃ DA MASCARA DO CAMPO CODTB4FAT DA TABELA TTB4
	//DE FORMA PALEATIVA PARA NÃO MUDAR  A FORMA DE CRIAÇÃO DA SEQUÊNCIA E CONSULTA DA WIDGET
	
	//DESMEMBRAMENTOS DE OBRAS FINAL 000 = FICARÁ COM A MASCARA XXX.9XXXX
	//DESMEMBRAMENTOS DE OBRAS FINAL 001 = FICARÁ COM A MASCARA XXX.8XXXX
	//DESMEMBRAMENTOS DE OBRAS FINAL DIFERENTE DAS ANTERIORES = FICARÁ COM A MASCARA XXX.4XXXX
	
	var connect = DatasetFactory.getDataset("ds_mip_connector", null, null, null);
	var userAdmin = connect.getValue(0, "USUARIOECM");
	
	
	var c1 = DatasetFactory.createConstraint('numeroSC', '%'+NUM_FIXO_OBRA+'%', '%'+NUM_FIXO_OBRA+'%', ConstraintType.SHOULD);
	c1.setLikeSearch(true);
	var c3 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('numeroSC','','', ConstraintType.MUST_NOT);
	var c4 = DatasetFactory.createConstraint('userSecurityId', userAdmin, userAdmin, ConstraintType.MUST);
	
	var constraints = new Array(c1, c2, c3, c4);
	var dataset = DatasetFactory.getDataset('ds_FormsWSUP01_solicitacaoDeCompras', null, constraints, null);
	
	if (dataset.rowsCount > 0) {
		var numSquencial = dataset.rowsCount + 1;
		log.info("beforeStateEntry - WSUP01-RequisicaoCompras - numero_da_solicitacao: "+numero_da_solicitacao+" - numSquencial:  "+numSquencial);

			var newNumeroSC = 'SC-'+NUM_FIXO_OBRA+'-SEQ:'+numSquencial;
			var seqComZeroEsquerda = addZeroEsquerda(numSquencial, 4);
			var codObra = hAPI.getCardValue("codObra");
			var codSCTabelaDocumentoMateriais = new String(codObra)+"."+new String(digito)+new String(seqComZeroEsquerda);
		
			log.info("beforeStateEntry - WSUP01-RequisicaoCompras - numero_da_solicitacao: "+numero_da_solicitacao+" - newNumeroSC:  "+newNumeroSC);
			log.info("beforeStateEntry - WSUP01-RequisicaoCompras - numero_da_solicitacao: "+numero_da_solicitacao+" - codSCTabelaDocumentoMateriais:  "+codSCTabelaDocumentoMateriais);
			
			hAPI.setCardValue("numeroSC", newNumeroSC);
			hAPI.setCardValue("codSCTabelaDocumentoMateriais", codSCTabelaDocumentoMateriais);
			hAPI.setCardValue("numeroRevSC", '0');

	}else if(dataset.rowsCount == 0){	
		//Gerar primeiro numero de SC da obra
		var newNumeroSC = 'SC-'+NUM_FIXO_OBRA.trim()+'-SEQ:1';
		var codObra = hAPI.getCardValue("codObra");
		var codSCTabelaDocumentoMateriais = codObra+"."+digito+"0001";
	
		hAPI.setCardValue("numeroSC", newNumeroSC);
		hAPI.setCardValue("numeroRevSC", '0');
		hAPI.setCardValue("codSCTabelaDocumentoMateriais", codSCTabelaDocumentoMateriais);

	}else{
		throw "Favor acionar Suporte TI, Não foi possível gerar número da SC";
	}
	
	
	} catch (e){
		var erro = "<br><br><b>Favor acionar Suporte TI, Não foi possível gerar número da SC</b><br><br>";
		log.info(erro);
		throw erro;
	}
}

function addZeroEsquerda(num, len) {
	var numberWithZeroes = String(num);
	  var counter = numberWithZeroes.length;     
	  while(counter < len) {  
	      numberWithZeroes = "0" + numberWithZeroes;    
	    counter++;  
	    }
	  //log.info("beforeStateEntry - WSUP01-RequisicaoCompras - atualizarDadosSolicitacao - numberWithZeroes: "+numberWithZeroes);
	  return numberWithZeroes;
}