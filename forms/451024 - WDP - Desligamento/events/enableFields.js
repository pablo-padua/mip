function enableFields(form){ 
	
	var atividade = getValue("WKNumState");
	
	if(atividade == 0 || atividade == 4 ||atividade == 397 ||atividade == 407){
	}
	else {
		
		form.setEnabled("obraSetor",false);
		form.setEnabled("funcionario",false);
		form.setEnabled("motivoDemissao",false);
		form.setEnabled("dataPrevistaDemissao",false);
		form.setEnabled("substituicao",false);
		form.setEnabled("avisoPrevio",false);
		form.setEnabled("tipoReducao",false);
		form.setEnabled("motivoDemissaoRM",false);
		form.setEnabled("semRestricao",false);
		form.setEnabled("justaCausa",false);
		form.setEnabled("regraDeOuro",false);
		form.setEnabled("assiduidade",false);
		form.setEnabled("pontualidade",false);
		form.setEnabled("produtividade",false);
		form.setEnabled("comprometimento",false);
		form.setEnabled("indisciplina",false);
		form.setEnabled("seguranca",false);
		form.setEnabled("descRestricoes",false);
		form.setEnabled("difPositivo",false);
		form.setEnabled("descDifPositivo",false);
		
	}
	if (atividade == 16 || atividade == 319 || atividade == 429){
		
		if(form.getValue("motivoDemissaoRM") == '9'){
			form.setEnabled("obraSetor",false);
			form.setEnabled("funcionario",false);
			form.setEnabled("motivoDemissao",false);
			form.setEnabled("dataPrevistaDemissao",false);
			form.setEnabled("substituicao",false);
			form.setEnabled("avisoPrevio",false);
			form.setEnabled("tipoReducao",false);
			form.setEnabled("motivoDemissaoRM",false);
			form.setEnabled("semRestricao",false);
			form.setEnabled("justaCausa",false);
			form.setEnabled("regraDeOuro",false);
			form.setEnabled("assiduidade",false);
			form.setEnabled("pontualidade",false);
			form.setEnabled("produtividade",false);
			form.setEnabled("comprometimento",false);
			form.setEnabled("indisciplina",false);
			form.setEnabled("seguranca",false);
			form.setEnabled("descRestricoes",false);
			form.setEnabled("difPositivo",false);
			form.setEnabled("descDifPositivo",false);
		
		}else{
			form.setEnabled("obraSetor",false);
			form.setEnabled("funcionario",false);
			form.setEnabled("motivoDemissao",true);
			form.setEnabled("dataPrevistaDemissao",false);
			form.setEnabled("substituicao",false);
			form.setEnabled("avisoPrevio",false);
			form.setEnabled("tipoReducao",false);
			form.setEnabled("motivoDemissaoRM",true);
			form.setEnabled("semRestricao",true);
			form.setEnabled("justaCausa",true);
			form.setEnabled("regraDeOuro",true);
			form.setEnabled("assiduidade",true);
			form.setEnabled("pontualidade",true);
			form.setEnabled("produtividade",true);
			form.setEnabled("comprometimento",true);
			form.setEnabled("indisciplina",true);
			form.setEnabled("seguranca",true);
			form.setEnabled("descRestricoes",true);
			form.setEnabled("difPositivo",true);
			form.setEnabled("descDifPositivo",true);
		
		}

	}
	if (atividade == 453){
		
		form.setEnabled("obraSetor",false);
		form.setEnabled("funcionario",false);
		form.setEnabled("motivoDemissao",true);
		form.setEnabled("dataPrevistaDemissao",false);
		form.setEnabled("substituicao",false);
		form.setEnabled("avisoPrevio",false);
		form.setEnabled("tipoReducao",false);
		form.setEnabled("motivoDemissaoRM",true);
		form.setEnabled("semRestricao",true);
		form.setEnabled("justaCausa",true);
		form.setEnabled("regraDeOuro",true);
		form.setEnabled("assiduidade",true);
		form.setEnabled("pontualidade",true);
		form.setEnabled("produtividade",true);
		form.setEnabled("comprometimento",true);
		form.setEnabled("indisciplina",true);
		form.setEnabled("seguranca",true);
		form.setEnabled("descRestricoes",true);
		form.setEnabled("difPositivo",true);
		form.setEnabled("descDifPositivo",true);

	}
	if (atividade == 341){
		form.setEnabled("aprovCalculoObra",false);
		blockConfRCTObra(form);

	}
	if (atividade == 243){
		blockConfRCTSede(form);
	}
	
	if(atividade == 356 || atividade == 366){
		blockConfRCTObra(form);
		blockConfRCTSede(form);
		blockConfRCTNA(form);
	}	
	if (atividade == 247){
		form.setEnabled("observacaoFecharRec",false);

	}

	if (atividade == 341 || atividade == 356 || atividade == 366 || atividade == 358 || atividade == 243 || atividade == 247){
		
		form.setEnabled("dataDemissao",false);
		form.setEnabled("realizado",false);
		form.setEnabled("pendencia",false);
		form.setEnabled("docAsoConcluida",false);
		form.setEnabled("dataAgendamento",false);
		form.setEnabled("compRealizarExames",false);
		form.setEnabled("justificativadocAso",false);
		
		var indexes = form.getChildrenIndexes("tbQuitacaoTI");
		 for ( var i in indexes) {
		    var sufixoNome = '___' + indexes[i];			
			form.setEnabled("descPendenciaTI" + sufixoNome,false);
			form.setEnabled("valorPendenciaTI" + sufixoNome,false);
		 }
		 
		form.setEnabled("pendenciaEPI",false);
		var indexes = form.getChildrenIndexes("tbQuitacaoEPI");
		 for ( var i in indexes) {
		    var sufixoNome = '___' + indexes[i];			
			form.setEnabled("descPendenciaEPI" + sufixoNome,false);
			form.setEnabled("valorPendenciaEPI" + sufixoNome,false);
		 }
		 
		form.setEnabled("pendenciaADM",false);
		var indexes = form.getChildrenIndexes("tbQuitacaoADM");
		 for ( var i in indexes) {
		    var sufixoNome = '___' + indexes[i];			
			form.setEnabled("descPendenciaADM" + sufixoNome,false);
			form.setEnabled("valorPendenciaADM" + sufixoNome,false);
		 }
		 
		form.setEnabled("pendenciaFIN",false);
		var indexes = form.getChildrenIndexes("tbQuitacaoFIN");
		 for ( var i in indexes) {
		    var sufixoNome = '___' + indexes[i];			
			form.setEnabled("descPendenciaFIN" + sufixoNome,false);
			form.setEnabled("valorPendenciaFIN" + sufixoNome,false);
		 }
	} 
	
	if (atividade == 483){
		
		form.setEnabled("dataDemissao",false);
		form.setEnabled("observacaoFecharRec",false);
		form.setEnabled("realizado",false);
		
		form.setEnabled("dataDemissaoPrevista",false);
		form.setEnabled("dataInicioAviso",false);
		form.setEnabled("dataPagamento",false);
				
		
		
		var indexes = form.getChildrenIndexes("tbQuitacaoTI");
		 for ( var i in indexes) {
		    var sufixoNome = '___' + indexes[i];			
			form.setEnabled("descPendenciaTI" + sufixoNome,false);
			form.setEnabled("valorPendenciaTI" + sufixoNome,false);
		 }
		 
		form.setEnabled("pendenciaEPI",false);
		var indexes = form.getChildrenIndexes("tbQuitacaoEPI");
		 for ( var i in indexes) {
		    var sufixoNome = '___' + indexes[i];			
			form.setEnabled("descPendenciaEPI" + sufixoNome,false);
			form.setEnabled("valorPendenciaEPI" + sufixoNome,false);
		 }
		 
		form.setEnabled("pendenciaADM",false);
		var indexes = form.getChildrenIndexes("tbQuitacaoADM");
		 for ( var i in indexes) {
		    var sufixoNome = '___' + indexes[i];			
			form.setEnabled("descPendenciaADM" + sufixoNome,false);
			form.setEnabled("valorPendenciaADM" + sufixoNome,false);
		 }
		 
		form.setEnabled("pendenciaFIN",false);
		var indexes = form.getChildrenIndexes("tbQuitacaoFIN");
		 for ( var i in indexes) {
		    var sufixoNome = '___' + indexes[i];			
			form.setEnabled("descPendenciaFIN" + sufixoNome,false);
			form.setEnabled("valorPendenciaFIN" + sufixoNome,false);
		 }
	}
	
	
	if (atividade != 341){
		form.setEnabled("observacaoObra",false);
	
		
		var indexes = form.getChildrenIndexes("tbCalculoObra");
		 for ( var i in indexes) {
		    var sufixoNome = '___' + indexes[i];			
			form.setEnabled("eventoCalculoObra" + sufixoNome,false);
			form.setEnabled("referenciaCalculoObra" + sufixoNome,false);
			form.setEnabled("valorCalculoObra" + sufixoNome,false);
			form.setEnabled("acaoCalculoObra" + sufixoNome,false);
		 }
	}
	
	if (atividade != 243){
		form.setEnabled("observacao",false);		
	} else {
		form.setEnabled("validacaoSede",false);		
		form.setEnabled("justificativaValidacaoSede",false);		
		form.setEnabled("aprovValidacaoObra",false);		
		form.setEnabled("justificativaValidacaoObra",false);
	}
	if (atividade != 16){
		form.setEnabled("aprovacao",false);		
		form.setEnabled("justificativa",false);		
		
	
	} 
	if (atividade != 319){
		form.setEnabled("aprovacao2",false);		
		form.setEnabled("justificativa2",false);		
	}
	if (atividade != 429){
		form.setEnabled("aprovacaoVerificarAvaliacao",false);		
		form.setEnabled("justificaVerificarAvaliacao",false);		
	}
	if (atividade != 466){
		form.setEnabled("aprovacaoSede",false);		
		form.setEnabled("justificativaSede",false);		
	}
	if (atividade != 453){
		form.setEnabled("aprovacaoRH",false);		
		form.setEnabled("justificativaRH",false);		
	}
	
	if (atividade == 16 || atividade == 319 || atividade == 0 || atividade == 4){

		var indexes = form.getChildrenIndexes("tbAvaliacao");
		 for ( var i in indexes) {
		    var sufixoNome = '___' + indexes[i];			
			form.setEnabled("valorAvaliacao" + sufixoNome,true);
		 }
	
	}else{
		var indexes = form.getChildrenIndexes("tbAvaliacao");
		 for ( var i in indexes) {
		    var sufixoNome = '___' + indexes[i];			
			form.setEnabled("valorAvaliacao" + sufixoNome,false);
		 }
	}
	
	
}

function blockConfRCTObra(form){
	form.setEnabled("movDoPonto2",false);
	form.setEnabled("saldoSalario2",false);
	form.setEnabled("diaDemissDomingo2",false);
	form.setEnabled("adiantamento2",false);
	form.setEnabled("feriasPeriAquisitivo2",false);
	form.setEnabled("abonoFeriasCCT2",false);
	form.setEnabled("decTerceirIndenizado2",false);
	form.setEnabled("avisoPrevTermContrato2",false);
	form.setEnabled("tpContratoTrab2",false);
	form.setEnabled("mediaFeriasAviso2",false);
	form.setEnabled("adicReflexoFeriAviso2",false);
	form.setEnabled("periculosidadeEv2",false);
	form.setEnabled("dsr2",false);
	form.setEnabled("pensaoAlimenticia2",false);
	form.setEnabled("histoAfastamento2",false);
	form.setEnabled("pagCestaBasica2",false);
	form.setEnabled("descAssistMedica2",false);
	form.setEnabled("bloqueioRecalculo2",false);
	form.setEnabled("distribuirSEFIP2",false);
	form.setEnabled("fopagAnalitica2",false);
	form.setEnabled("conferirINSS2",false);
	form.setEnabled("conferirFGTS2",false);
	form.setEnabled("tomadorServAdmRCT2",false);
	form.setEnabled("histAssistSaude2",false);
	form.setEnabled("docAsoConcluida",false);
}

function blockConfRCTSede(form){
	form.setEnabled("movDoPonto1",false);
	form.setEnabled("saldoSalario1",false);
	form.setEnabled("diaDemissDomingo1",false);
	form.setEnabled("adiantamento1",false);
	form.setEnabled("feriasPeriAquisitivo1",false);
	form.setEnabled("abonoFeriasCCT1",false);
	form.setEnabled("decTerceirIndenizado1",false);
	form.setEnabled("avisoPrevTermContrato1",false);
	form.setEnabled("tpContratoTrab1",false);
	form.setEnabled("mediaFeriasAviso1",false);
	form.setEnabled("adicReflexoFeriAviso1",false);
	form.setEnabled("periculosidadeEv1",false);
	form.setEnabled("dsr1",false);
	form.setEnabled("pensaoAlimenticia1",false);
	form.setEnabled("histoAfastamento1",false);
	form.setEnabled("pagCestaBasica1",false);
	form.setEnabled("descAssistMedica1",false);
	form.setEnabled("bloqueioRecalculo1",false);
	form.setEnabled("distribuirSEFIP1",false);
	form.setEnabled("fopagAnalitica1",false);
	form.setEnabled("conferirINSS1",false);
	form.setEnabled("conferirFGTS1",false);
	form.setEnabled("tomadorServAdmRCT1",false);
	form.setEnabled("histAssistSaude1",false);
	
	form.setEnabled("dataDemissao",false);
	form.setEnabled("motivoEntrevista",false);
	form.setEnabled("justificativaEntrevista",false);
	form.setEnabled("docAsoConcluida",false);
}
function blockConfRCTNA(form){
	form.setEnabled("movDoPonto3",false);
	form.setEnabled("saldoSalario3",false);
	form.setEnabled("diaDemissDomingo3",false);
	form.setEnabled("adiantamento3",false);
	form.setEnabled("feriasPeriAquisitivo3",false);
	form.setEnabled("abonoFeriasCCT3",false);
	form.setEnabled("decTerceirIndenizado3",false);
	form.setEnabled("avisoPrevTermContrato3",false);
	form.setEnabled("tpContratoTrab3",false);
	form.setEnabled("mediaFeriasAviso3",false);
	form.setEnabled("adicReflexoFeriAviso3",false);
	form.setEnabled("periculosidadeEv3",false);
	form.setEnabled("dsr3",false);
	form.setEnabled("pensaoAlimenticia3",false);
	form.setEnabled("histoAfastamento3",false);
	form.setEnabled("pagCestaBasica3",false);
	form.setEnabled("descAssistMedica3",false);
	form.setEnabled("bloqueioRecalculo3",false);
	form.setEnabled("distribuirSEFIP3",false);
	form.setEnabled("fopagAnalitica3",false);
	form.setEnabled("conferirINSS3",false);
	form.setEnabled("conferirFGTS3",false);
	form.setEnabled("tomadorServAdmRCT3",false);
	form.setEnabled("histAssistSaude3",false);
	form.setEnabled("docAsoConcluida",false);
}