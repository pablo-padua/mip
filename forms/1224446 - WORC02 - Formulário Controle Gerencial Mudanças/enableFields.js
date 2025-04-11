//Carregue essa função como arquivo JS no arquivo HTML

function disableField($el, disabled){
	if(disabled){
		$("#" + $el.attr('id') + "_d").hide();
		$el.show();
	}
	else{
		//($("#" + $el.attr("id") + "_d").length > 0) ? $("#" + $el.attr("id") + "_d").show() : $el.before($el.clone().attr({"id":($el.attr("id") + "_d"),"name":($el.attr("name") + "_d")}).attr("disabled",true));
		($("#" + $el.attr("id") + "_d").length > 0) ? $("#" + $el.attr("id") + "_d").show() : $el.before($el.clone().attr({"id":($el.attr("id") + "_d"),"name":($el.attr("name"))}).attr("disabled",true));
		$el.hide();
	}
}

function enableContainer($el, enabled){
	$($el).find("input[type='radio'],input[type='text'],input[type='checkbox'],textarea,select,input[type='button'],img").not(".logo").each(function (i) {
		enableField($(this), enabled);
	});
};

function enableField($el, enabled){
	if($el.attr("type") == "text"){
		$el.prop("readonly",!enabled);
	}
	else if($el.prop("tagName") == "TEXTAREA"){
		$el.prop("readonly",!enabled);;
	}
	else if($el.prop("tagName") == "SELECT"){
		disableField($el, enabled);
	}
	else if($el.attr("type") == "button" || $el.prop("tagName") == "IMG" ){
		$el.prop("disabled",!enabled);
		if(enabled){
			$el.css("opacity", 1);
			$el.css("filter", "");
		} else {		
			$el.css("opacity", 0.4);
			$el.css("filter", "alpha(opacity=40)");
		}
	}
	else if($el.attr("type") == "radio" || $el.attr("type") == "checkbox" || $el.attr("type") == undefined){
		var endWithDisabled = new RegExp(/_d$/);
		if($el.selector != undefined){
			var nameOf = ($el.selector.replace("#","") != "") ? $el.selector.replace("#","") : $el.attr("name");
		}else{
			var nameOf = $el.attr("name");
		}
	

		$el = $("[name='" + nameOf + "']").filter(function(index, element) {
			return !endWithDisabled.test(element.id);		});

		if($el.length && $el.length > 0 && ($el.attr("type") == "radio" || $el.attr("type") == "checkbox")){
			$el.each(function(i){
				$("label[for^='"+$(this).prop("id")+"']").each(function (i) {
					var suffix = (endWithDisabled.test($(this).prop("for"))) ? "_d" : "";
					if(enabled){
						$(this).prop("for", $(this).prop("for").replace(endWithDisabled,""));
					}
					else if(suffix == ""){
						$(this).prop("for", $(this).prop("for")+"_d");
					}
				});
				disableField($(this), enabled);
			});
		}
	}
}

function applyDisabledStyle(){
	var arr = $("input");
	$.each(arr,function(index, item){
		if (item.readOnly || item.disabled)item.className = item.className ? item.className + ' readonly' : 'readonly';
	});

	arr = $("textarea");
	$.each(arr,function(index, item){
		if (item.readOnly || item.disabled)item.className = item.className ? item.className + ' readonly' : 'readonly';
	});

	arr = $("select");
	$.each(arr,function(index, item){
		$(item).change();
	});	

	var imgs = document.getElementById(tableId).getElementsByTagName("img");
	for(var i=0;i<imgs.length;i++){
		imgs[i].style.display = "none";
	}
}

function enableFields(){
	atividadeAtual = buscarAtividadeAtual();	


	if(atividadeAtual == null){
		enableContainer($("form")[0],false);
		
	}

	if(atividadeAtual == INICIO || atividadeAtual == INICIO_0){
		
	}else if(atividadeAtual == REVISAR_SOLICITACAO){		
		enableContainer($("form")[0],false);
		enableZoom($("#nomeObra"),false);
		enableField($("#origemMudanca"),true);
		enableZoom($("#nomeObra"),false);
		enableField($("#tipoRevisao"),true);
		enableField($("#descricaoMudanca"),true);
		enableField($("#razaoMudanca"),true);
		enableField($("#vlrTotalInvestimento"),true);
		enableField($("#sumarioCalculo"),true);
		enableField($("#impactoCronograma"),true);
		enableField($("#altPrazosContrat"),true);
		enableField($("#vlrNegativo"),true);
		
		
		if($("#origemMudanca").val() == 'interna'){
			//enableField($("#gerarAditivoContrat"),false);
		}else{
			//enableField($("#gerarAditivoContrat"),true);
		}
		
		enableField($("#refContratual"),true);
		enableField($("#docFormalizador"),true);
		enableField($("#prazoIniImplantAlt"),true);
		enableField($("#prazoFimImplantAlt"),true);
		enableField($("#descricaoImpacto"),true);
		enableField($("#obsRelacaoContAditivados"),true);
		
		if(buscarModoForm() == "VIEW"){
			$("#descricaoMudanca").prop("disabled", true);
			$("#razaoMudanca").prop("readonly", true);
			$("#sumarioCalculo").prop("readonly", true);
			$("#descricaoImpacto").prop("readonly", true);
			$("#obsRelacaoContAditivados").prop("readonly", true);
			$("#refContratual").prop("readonly", true);
			$("#docFormalizador").prop("readonly", true);
		
			
			}else{
				$("#descricaoMudanca").prop("disabled", false);
				$("#razaoMudanca").prop("readonly", false);
				$("#sumarioCalculo").prop("readonly", false);
				$("#descricaoImpacto").prop("readonly", false);
				$("#obsRelacaoContAditivados").prop("readonly", false);
				$("#refContratual").prop("readonly", false);
				$("#docFormalizador").prop("readonly", false);
			
			}
		
		
	}else if(atividadeAtual == PREPARACAO_REVISAO_CGM || atividadeAtual == QUALIFICACAO_IMPACTO_MUDANCA_PRAZO_CUSTO){		
		enableContainer($("form")[0],false);
		enableZoom($("#nomeObra"),false);
		enableField($("#origemMudanca"),true);
		enableZoom($("#nomeObra"),false);
		enableZoom($("#numCgmPrincipalCompl"),false);
		enableField($("#tipoRevisao"),true);
		enableField($("#descricaoMudanca"),true);
		enableField($("#razaoMudanca"),true);
		enableField($("#vlrTotalInvestimento"),true);
		enableField($("#sumarioCalculo"),true);
		enableField($("#impactoCronograma"),true);
		enableField($("#altPrazosContrat"),true);
		if($("#origemMudanca").val() == 'interna'){
			//enableField($("#gerarAditivoContrat"),false);
		}else{
			//enableField($("#gerarAditivoContrat"),true);
		}
		
		enableField($("#refContratual"),true);
		enableField($("#docFormalizador"),true);
		enableField($("#prazoIniImplantAlt"),true);
		enableField($("#prazoFimImplantAlt"),true);
		enableField($("#descricaoImpacto"),true);
		enableField($("#obsRelacaoContAditivados"),true);
		
		if(buscarModoForm() == "VIEW"){
			$("#descricaoMudanca").prop("disabled", true);
			$("#razaoMudanca").prop("readonly", true);
			$("#sumarioCalculo").prop("readonly", true);
			$("#descricaoImpacto").prop("readonly", true);
			$("#obsRelacaoContAditivados").prop("readonly", true);
			$("#refContratual").prop("readonly", true);
			$("#docFormalizador").prop("readonly", true);
		
			
			}else{
				$("#descricaoMudanca").prop("disabled", false);
				$("#razaoMudanca").prop("readonly", false);
				$("#sumarioCalculo").prop("readonly", false);
				$("#descricaoImpacto").prop("readonly", false);
				$("#obsRelacaoContAditivados").prop("readonly", false);
				$("#refContratual").prop("readonly", false);
				$("#docFormalizador").prop("readonly", false);
			
			}
		
		
	}else if(atividadeAtual == ANALISE_TRATAMENTO_APROV_GESTOR_CONTRATO){		
		enableContainer($("form")[0],false);
		enableZoom($("#nomeObra"),false);
		enableField($("#aprovGestorContrato"),true);
		enableZoom($("#numCgmPrincipalCompl"),false);
		if(buscarModoForm() == "VIEW"){
			$("#justAprovGestorContrato").prop("disabled", true);
			$("#justAprovGestorContrato").prop("readonly", true);
			}else{
				$("#justAprovGestorContrato").prop("disabled", false);
				$("#justAprovGestorContrato").prop("readonly", false);
			}

	}else if(atividadeAtual == ANALISE_TRATAMENTO_APROV_GESTOR_OBRA){		
		enableContainer($("form")[0],false);
		enableZoom($("#nomeObra"),false);
		enableField($("#aprovGestorObra"),true);
		enableZoom($("#numCgmPrincipalCompl"),false);
		if(buscarModoForm() == "VIEW"){
			$("#justAprovGestorObra").prop("disabled", true);
			$("#justAprovGestorObra").prop("readonly", true);
			}else{
				$("#justAprovGestorObra").prop("disabled", false);
				$("#justAprovGestorObra").prop("readonly", false);
			}
		
	}else if(atividadeAtual == VALIDAR_INFORMACOES_ADCON){		
			enableContainer($("form")[0],false);
			enableZoom($("#nomeObra"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			enableField($("#aprovADCon"),true);

			if(buscarModoForm() == "VIEW"){
				$("#justAprovADCon").prop("disabled", true);
				$("#justAprovADCon").prop("readonly", true);
				}else{
					$("#justAprovADCon").prop("disabled", false);
					$("#justAprovADCon").prop("readonly", false);
				}
		
		}else if(atividadeAtual == ANALISE_TRATAMENTO_APROV_DIR_ENGENHARIA_INT || atividadeAtual == ANALISE_APROV_DIR_ENGENHARIA_MIP_APRESENTACAO_CLIENTE){		
			enableContainer($("form")[0],false);
			enableField($("#aprovDiretorOperac"),true);
			enableZoom($("#nomeObra"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			if(buscarModoForm() == "VIEW"){
				$("#justAprovDiretorOperac").prop("disabled", true);
				$("#justAprovDiretorOperac").prop("readonly", true);
				}else{
					$("#justAprovDiretorOperac").prop("disabled", false);
					$("#justAprovDiretorOperac").prop("readonly", false);
				}

		
		}else if(atividadeAtual == ANALISE_APROV_PRESIDENCIA_MIP || atividadeAtual == ANALISE_APROV_PRESIDENCIA_MIP_APRESENTACAO_CLIENTE){		
			enableContainer($("form")[0],false);
			enableField($("#aprovPresidenciaMIP"),true);
			enableZoom($("#nomeObra"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			if(buscarModoForm() == "VIEW"){
				$("#justAprovPresidenciaMIP").prop("disabled", true);
				$("#justAprovPresidenciaMIP").prop("readonly", true);
				}else{
					$("#justAprovPresidenciaMIP").prop("disabled", false);
					$("#justAprovPresidenciaMIP").prop("readonly", false);
				}
	
		
		}else if(atividadeAtual == ANALISE_APROV_GESTOR_CONTRATO_APRESENTACAO_CLIENTE){		
			enableContainer($("form")[0],false);
			enableField($("#aprovGestorContrato"),true);
			enableZoom($("#nomeObra"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			if(buscarModoForm() == "VIEW"){
				$("#justAprovGestorContrato").prop("disabled", true);
				$("#justAprovGestorContrato").prop("readonly", true);
				}else{
					$("#justAprovGestorContrato").prop("disabled", false);
					$("#justAprovGestorContrato").prop("readonly", false);
				}
	
		
		}else if(atividadeAtual == ANALISE_APROV_GESTOR_OBRA_APRESENTACAO_CLIENTE){		
			enableContainer($("form")[0],false);
			enableField($("#aprovGestorObra"),true);
			enableZoom($("#nomeObra"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			if(buscarModoForm() == "VIEW"){
				$("#justAprovGestorObra").prop("disabled", true);
				$("#justAprovGestorObra").prop("readonly", true);
				}else{
					$("#justAprovGestorObra").prop("disabled", false);
					$("#justAprovGestorObra").prop("readonly", false);
				}
	
		
		}else if(atividadeAtual == ANALISE_APROV_DIR_ADCON_MIP_APRESENTACAO_CLIENTE){		
			enableContainer($("form")[0],false);
			//enableZoom($("#setorDocumentos"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			if(buscarModoForm() == "VIEW"){
				$("#justAprovacaoGerenteDoc").prop("disabled", true);
				$("#justAprovacaoGerenteDoc").prop("readonly", true);
				}else{
					$("#justAprovacaoGerenteDoc").prop("disabled", false);
					$("#justAprovacaoGerenteDoc").prop("readonly", false);
				}
	
		
		}else if(atividadeAtual == ANALISE_APROV_DIR_COMERCIAL_MIP_APRESENTACAO_CLIENTE || atividadeAtual == ANALISE_TRATAMENTO_APROV_DIR_COMERCIAL_INT){		
			enableContainer($("form")[0],false);
			enableField($("#aprovDiretorComerc"),true);
			enableZoom($("#nomeObra"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			if(buscarModoForm() == "VIEW"){
				$("#justAprovDiretorComerc").prop("disabled", true);
				$("#justAprovDiretorComerc").prop("readonly", true);
				}else{
					$("#justAprovDiretorComerc").prop("disabled", false);
					$("#justAprovDiretorComerc").prop("readonly", false);
				}
	
		
		}else if(atividadeAtual == FORMALIZACAO_ASSINATURA_ADITIVO_CONTRATUAL){		
			enableContainer($("form")[0],false);
			enableZoom($("#nomeObra"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			enableZoom($("#numCgmComplementar"),false);
			if(buscarModoForm() == "VIEW"){
				$("#obsFormalizacaoAssinAditivo").prop("disabled", true);
				$("#obsFormalizacaoAssinAditivo").prop("readonly", true);
				}else{
					$("#obsFormalizacaoAssinAditivo").prop("disabled", false);
					$("#obsFormalizacaoAssinAditivo").prop("readonly", false);
				}
	
		
		}else if(atividadeAtual == APROVACAO_CLIENTE_MERITO_TAC_PLEITO){		
			enableContainer($("form")[0],false);
			enableField($("#aprovClienteMeritoVlrPrazo"),true);
			enableField($("#nomeConatoClienteAprovador"),true);
			enableField($("#telConatoClienteAprovador"),true);
			enableZoom($("#nomeObra"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			if(buscarModoForm() == "VIEW"){
				$("#ObsAprovReprovCliente").prop("disabled", true);
				$("#ObsAprovReprovCliente").prop("readonly", true);
				}else{
					$("#ObsAprovReprovCliente").prop("disabled", false);
					$("#ObsAprovReprovCliente").prop("readonly", false);
				}
	
		
		}else if(atividadeAtual == NEGOCIACAO_CLIENTE_APROV_VLR_PRAZO_EXECUCAO){		
			enableContainer($("form")[0],false);
			enableField($("#aprovClienteMeritoVlrPrazo"),false);
			enableField($("#nomeConatoClienteAprovador"),false);
			enableField($("#telConatoClienteAprovador"),false);
			enableField($("#aprovClienteVlrPrazo"),true);
			enableField($("#nomeConatoClienteVlrPrazo"),true);
			enableField($("#telConatoClienteVlrPrazo"),true);
			enableZoom($("#nomeObra"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			enableZoom($("#numCgmComplementar"),false);
			if(buscarModoForm() == "VIEW"){
				$("#ObsAprovVlrPrazo").prop("disabled", true);
				$("#ObsAprovVlrPrazo").prop("readonly", true);
				}else{
					$("#ObsAprovVlrPrazo").prop("disabled", false);
					$("#ObsAprovVlrPrazo").prop("readonly", false);
				}
		
		}else if(atividadeAtual == FORMALIZACAO_ASSINATURA_ADITIVO_CONTRATUAL){		
			enableContainer($("form")[0],false);
			//enableZoom($("#setorDocumentos"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			if(buscarModoForm() == "VIEW"){
				$("#justAprovacaoGerenteDoc").prop("disabled", true);
				$("#justAprovacaoGerenteDoc").prop("readonly", true);
				}else{
					$("#justAprovacaoGerenteDoc").prop("disabled", false);
					$("#justAprovacaoGerenteDoc").prop("readonly", false);
				}
	
		
		}else if(atividadeAtual == ANALISE_APROVACAO_DIR_ENGENHARIA_INICIO_EXEC){		
			enableContainer($("form")[0],false);
			enableField($("#aprovClienteMeritoVlrPrazo"),false);
			enableField($("#nomeConatoClienteAprovador"),false);
			enableField($("#telConatoClienteAprovador"),false);
			enableField($("#aprovDirOperacExec"),true);
			enableZoom($("#numCgmPrincipalCompl"),false);
			enableZoom($("#numCgmComplementar"),false);
			enableZoom($("#nomeObra"),false);
			
			if(buscarModoForm() == "VIEW"){
				$("#justAprovDirOperacExec").prop("disabled", true);
				$("#justAprovDirOperacExec").prop("readonly", true);
				}else{
					$("#justAprovDirOperacExec").prop("disabled", false);
					$("#justAprovDirOperacExec").prop("readonly", false);
				}
	
		
		}else if(atividadeAtual == ANALISE_APROVACAO_DIR_COMERCIAL_INICIO_EXEC){		
			enableContainer($("form")[0],false);
			enableField($("#aprovClienteMeritoVlrPrazo"),false);
			enableField($("#nomeConatoClienteAprovador"),false);
			enableField($("#telConatoClienteAprovador"),false);
			enableField($("#aprovDirComercExec"),true);
			enableZoom($("#numCgmPrincipalCompl"),false);
			enableZoom($("#numCgmComplementar"),false);
			enableZoom($("#nomeObra"),false);
			
			if(buscarModoForm() == "VIEW"){
				$("#justAprovDirComercExec").prop("disabled", true);
				$("#justAprovDirComercExec").prop("readonly", true);
				}else{
					$("#justAprovDirComercExec").prop("disabled", false);
					$("#justAprovDirComercExec").prop("readonly", false);
				}
	
		
		}else if(atividadeAtual == ANALISE_APROVACAO_PRESIDENCIA_INICIO_EXEC){		
			enableContainer($("form")[0],false);
			enableField($("#aprovClienteMeritoVlrPrazo"),false);
			enableField($("#nomeConatoClienteAprovador"),false);
			enableField($("#telConatoClienteAprovador"),false);
			enableField($("#aprovPresidMIPExec"),true);
			enableZoom($("#numCgmPrincipalCompl"),false);
			enableZoom($("#numCgmComplementar"),false);
			enableZoom($("#nomeObra"),false);
			
			if(buscarModoForm() == "VIEW"){
				$("#justAprovPresidMIPExec").prop("disabled", true);
				$("#justAprovPresidMIPExec").prop("readonly", true);
				}else{
					$("#justAprovPresidMIPExec").prop("disabled", false);
					$("#justAprovPresidMIPExec").prop("readonly", false);
				}
		
		}else if(atividadeAtual == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_ENGENHARIA){		
			enableContainer($("form")[0],false);
			enableField($("#aprovDirOperacVlrPrazo"),true);
			enableZoom($("#nomeObra"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			enableZoom($("#numCgmComplementar"),false);
			if(buscarModoForm() == "VIEW"){
				$("#justAprovDirOperacVlrPrazo").prop("disabled", true);
				$("#justAprovDirOperacVlrPrazo").prop("readonly", true);
				}else{
					$("#justAprovDirOperacVlrPrazo").prop("disabled", false);
					$("#justAprovDirOperacVlrPrazo").prop("readonly", false);
				}
	
		
		}else if(atividadeAtual == ANALISE_APROVACAO_VLR_PRAZO_R_NEGOC_CLIENTE_DIR_COMERCIAL){		
			enableContainer($("form")[0],false);
			enableField($("#aprovDirComercVlrPrazo"),true);
			enableZoom($("#nomeObra"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			enableZoom($("#numCgmComplementar"),false);
			if(buscarModoForm() == "VIEW"){
				$("#justAprovDirComercVlrPrazo").prop("disabled", true);
				$("#justAprovDirComercVlrPrazo").prop("readonly", true);
				}else{
					$("#justAprovDirComercVlrPrazo").prop("disabled", false);
					$("#justAprovDirComercVlrPrazo").prop("readonly", false);
				}
	
		
		}else if(atividadeAtual == ANALISE_APROVACAO_PRESIDENCIA){		
			enableContainer($("form")[0],false);
			enableField($("#aprovPresidenciaMIPVlrPrazo"),true);
			enableZoom($("#nomeObra"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			enableZoom($("#numCgmComplementar"),false);
			if(buscarModoForm() == "VIEW"){
				$("#justAprovPresidMIPVlrPrazo").prop("disabled", true);
				$("#justAprovPresidMIPVlrPrazo").prop("readonly", true);
				}else{
					$("#justAprovPresidMIPVlrPrazo").prop("disabled", false);
					$("#justAprovPresidMIPVlrPrazo").prop("readonly", false);
				}
	
		
		}else if(atividadeAtual == INCORPORACAO_ORCAMENTO_VERSAO_ESCOPO_ATUAL){		
			enableContainer($("form")[0],false);
			enableField($("#aprovClienteMeritoVlrPrazo"),false);
			enableField($("#nomeConatoClienteAprovador"),false);
			enableField($("#telConatoClienteAprovador"),false);
			enableZoom($("#nomeObra"),false);
			enableZoom($("#numCgmPrincipalCompl"),false);
			enableZoom($("#numCgmComplementar"),false);
			if(buscarModoForm() == "VIEW"){
				$("#obsIncorpOrcVersaoEscopoAtual").prop("disabled", true);
				$("#obsIncorpOrcVersaoEscopoAtual").prop("readonly", true);
				}else{
					$("#obsIncorpOrcVersaoEscopoAtual").prop("disabled", false);
					$("#obsIncorpOrcVersaoEscopoAtual").prop("readonly", false);
				}
	
		
		}else if(atividadeAtual == INCORPORACAO_ORCAMENTO_VERSAO_ATIVA){		
			enableContainer($("form")[0],false);
			enableZoom($("#nomeObra"),false);	
			enableZoom($("#numCgmPrincipalCompl"),false);
			enableZoom($("#numCgmComplementar"),false);
			if(buscarModoForm() == "VIEW"){
				$("#obsIncorpOrcVersaoEscopoAtiva").prop("disabled", true);
				$("#obsIncorpOrcVersaoEscopoAtiva").prop("readonly", true);
				}else{
					$("#obsIncorpOrcVersaoEscopoAtiva").prop("disabled", false);
					$("#obsIncorpOrcVersaoEscopoAtiva").prop("readonly", false);
				}
			
		
		}else if(atividadeAtual == REPROGRAMACAO_ORCAMENTARIA_EMPREENDIMENTO){		
			enableContainer($("form")[0],false);
			enableZoom($("#nomeObra"),false);	
			enableZoom($("#numCgmPrincipalCompl"),false);
		
			if(buscarModoForm() == "VIEW"){
				$("#obsReprogOracEmpreendimento").prop("disabled", true);
				$("#obsReprogOracEmpreendimento").prop("readonly", true);
				}else{
					$("#obsReprogOracEmpreendimento").prop("disabled", false);
					$("#obsReprogOracEmpreendimento").prop("readonly", false);
				}	
	
		
		}else if(atividadeAtual == VALIDAR_NECESSIDADE_CGM_COMPLEMENTAR){		
			enableContainer($("form")[0],false);
			enableZoom($("#nomeObra"),false);	
			enableZoom($("#numCgmPrincipalCompl"),false);
		
			if(buscarModoForm() == "VIEW"){
				$("#obsCgmComplementar").prop("disabled", true);
				$("#obsCgmComplementar").prop("readonly", true);
				}else{
					$("#obsCgmComplementar").prop("disabled", false);
					$("#obsCgmComplementar").prop("readonly", false);
				}	
	
		
		}else{	
			enableContainer($("form")[0],false);
			enableZoom($("#nomeObra"),false);	
			enableZoom($("#numCgmPrincipalCompl"),false);
	
		}	
}