function validateForm(form){	

	var atividade = buscarAtividadeAtual();
	var Errors = [];
	var msg = '';
	
	var index = form.getChildrenIndexes('tableItens');
	var indexPaiFilho = index.length;
	
	if (atividade == INICIO_0 || atividade == INICIO || atividade == AJUSTA_SOLICITACAO){
		valida("nmColigadaSolicitante", i18n.translate("text.nmColigadaSolicitante"));
		valida("nmFilialSolicitante", i18n.translate("text.nmFilialSolicitante"));
		valida("nmFantColSolicitacao", i18n.translate("text.nmFantColSolicitacao"));
		valida("TMOV_CODFILIAL", i18n.translate("text.nmFantFilialSolicitacao"));
		valida("centroCustoSolicitacao", i18n.translate("text.centroCustoSolicitacao"));
		valida("disciplinaSC", i18n.translate("text.disciplinaSC"));	
		valida("descricaoSC", i18n.translate("text.descricaoSC"));
		valida("apenasCotacao", i18n.translate("text.apenasCotacao"));
		if (index.length == 0){
			Errors.push("\u00c9 necess\u00e1rio inserir pelo menos um Item");
		}
	}else if (atividade == INFORMAR_RESP_VINCULACAO){
			if (form.getValue('enviarParaAjustes') == 'sim'){
				valida("observacaoLOS", i18n.translate("text.observacaoLOS"));
			}else{
				//valida("departamentoSC", i18n.translate("text.departamentoSC"));
				//valida("hidden_CODDEPARTAMENTO", i18n.translate("text.departamentoSC"));
				valida("disciplinaSC", i18n.translate("text.disciplinaSC"));
				valida("filialDestino", i18n.translate("text.filialDestino"));
				valida("localDestino", i18n.translate("text.localDestino"));
				valida("apenasCotacao", i18n.translate("text.apenasCotacao"));
				var indexes = form.getChildrenIndexes('tableItens');
				 for (var i = 0; i < indexes.length; i++) {
				        var matricRespDePara = form.getValue("matricRespDePara___" + indexes[i]);
				     if(matricRespDePara == 'Contrato'){
				    	 valida("obsAberturaContrato", i18n.translate("text.obsAberturaContrato"));
				     }
				    }
				
				
				
			}	
		
	}else if (atividade == APROVACAO_GERENTE){
	
			valida("tipoAprovGerente", i18n.translate("text.tipoAprovGerente"));
			if(form.getValue('hidden_tipoAprovGerente') == 'reprovado' || form.getValue('hidden_tipoAprovGerente') == 'ajustar'){
				valida("observacaoAprovGerente", i18n.translate("text.observacaoAprovGerente"));
			}

}else if (atividade == APROVACAO_COORD_PLAN_REV){
	valida("apenasCotacao", i18n.translate("text.apenasCotacao"));
	valida("tipoAprovCoordPlanRev", i18n.translate("text.tipoAprovCoordPlanRev"));
	if(form.getValue('tipoAprovCoordPlanRev') == 'reprovado' || form.getValue('tipoAprovCoordPlanRev') == 'ajustar'){
		valida("observacaoAprovCoordPlanRev", i18n.translate("text.observacaoAprovCoordPlanRev"));
	}

}else if (atividade == APROVACAO_GERENTE_REV){
	
	valida("tipoAprovGerenteRev", i18n.translate("text.tipoAprovGerenteRev"));
	if(form.getValue('tipoAprovGerenteRev') == 'reprovado' || form.getValue('tipoAprovGerenteRev') == 'ajustar'){
		valida("observacaoAprovGerenteRev", i18n.translate("text.observacaoAprovGerenteRev"));
	}

}else if (atividade == ACOMPANHAR_SOLICITACAO_REVISAO){
	
	valida("apenasCotacao", i18n.translate("text.apenasCotacao"));


}else if (atividade == ACOMPANHAR_SOLICITACAO_REVISAO){
	
	valida("tipoAprovCoordPlan", i18n.translate("text.tipoAprovCoordPlan"));
	if(form.getValue('hidden_tipoAprovCoordPlan') == 'reprovado' || form.getValue('hidden_tipoAprovCoordPlan') == 'ajustar'){
		valida("observacaoAprovCoordPlan", i18n.translate("text.observacaoAprovCoordPlan"));
	}

}	
		
	for (var i=0; i<Errors.length; i++){		
		msg+= "\n" + Errors[i];		
	}
	
	if (msg != ''){		
		throw "Os seguintes campos devem ser preenchidos: \n\n<b>" + msg +"</b>\n\n\n";
	}
	
	function valida(campo, mensagem) {    
	    if(form.getValue(campo) == '') {        
	        Errors.push("- "+mensagem);
	    }
	}

	function validaSelect(campo, mensagem) {    
	    if(form.getValue(campo) == 0) {        
	        Errors.push("- " + mensagem);
	    }
	}

	function validaPaiFilho(nomeTabela, campo, mensagem) {    
	    var tablename = form.getChildrenIndexes(nomeTabela);
	    tablename.forEach(function(i) {
	        
	        var value = form.getValue(campo + '___' + i);
	        
	        if(value == '' || value == 0) {
	            
	            Errors.push("- " + mensagem + " da linha " + i);
	        }
	    });
	}

}