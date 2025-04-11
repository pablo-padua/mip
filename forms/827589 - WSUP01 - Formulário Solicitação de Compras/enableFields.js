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
		var nameOf = ($el.selector.replace("#","") != "") ? $el.selector.replace("#","") : $el.attr("name");

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

	if(buscarModoForm() == "VIEW"){
		enableContainer($("form")[0],false);
		enableField($("#file"),false);
		enableField($("#loading-example-btn"),false);
		carregarValoresMatricRespDePara();
		
	}else{
	
	if(atividadeAtual == INICIO || atividadeAtual == 0 ){


	}else if(atividadeAtual == AJUSTA_SOLICITACAO){		
		enableContainer($("form")[0],false);
		enableZoom($("#centroCustoSolicitacao"),false);
		enableZoom($("#nmFantColSolicitacao"),false);
		enableZoom($("#nmFantFilialSolicitacao"),false);
		//enableField($("#observacaoLOS"),false);
		enableField($("#obsGeralSolicitacao"),true);
		enableField($("#descricaoSC"),true);
		enableField($("#disciplinaSC"),true);
		enableField($("#habilitarRevisao"),false);
		enableField($("#apenasCotacao"),true);

	}else if(atividadeAtual == APROVACAO_COORD_PLAN){	
		enableContainer($("form")[0],false);
		enableZoom($("#nmFantColSolicitacao"),false);
		enableZoom($("#nmFantFilialSolicitacao"),false);
		enableZoom($("#centroCustoSolicitacao"),false);
		enableField($("#disciplinaSC"),true);
		enableZoom($("#departamentoSC"),false);
		enableField($("#obsGeralSolicitacao"),false);
		
		enableField($("#tipoAprovCoordPlan"),true);
		enableField($("#habilitarRevisao"),false);
		if(buscarModoForm() != "VIEW"){
		enableField($("#observacaoAprovCoordPlan"),true);
		}
	}else if(atividadeAtual == APROVACAO_COORD_PLAN_REV){	
		enableContainer($("form")[0],false);
		enableZoom($("#nmFantColSolicitacao"),false);
		enableZoom($("#nmFantFilialSolicitacao"),false);
		enableZoom($("#centroCustoSolicitacao"),false);
		enableField($("#disciplinaSC"),false);
		enableZoom($("#departamentoSC"),false);
		enableField($("#obsGeralSolicitacao"),false);
		enableField($("#apenasCotacao"),true);
		enableField($("#tipoAprovCoordPlanRev"),true);
		enableField($("#habilitarRevisao"),false);
		if(buscarModoForm() != "VIEW"){
		enableField($("#observacaoAprovCoordPlanRev"),true);
		}
	}else if(atividadeAtual == APROVACAO_GERENTE){	
		enableContainer($("form")[0],false);
		enableZoom($("#nmFantColSolicitacao"),false);
		enableZoom($("#nmFantFilialSolicitacao"),false);
		enableZoom($("#centroCustoSolicitacao"),false);
		enableField($("#disciplinaSC"),true);
		enableZoom($("#departamentoSC"),false);
		enableField($("#obsGeralSolicitacao"),false);
		
		enableField($("#tipoAprovGerente"),true);
		enableField($("#habilitarRevisao"),false);
		if(buscarModoForm() != "VIEW"){
		enableField($("#observacaoAprovGerente"),true);
		}
	}else if(atividadeAtual == APROVACAO_GERENTE_REV){	
		enableContainer($("form")[0],false);
		enableZoom($("#nmFantColSolicitacao"),false);
		enableZoom($("#nmFantFilialSolicitacao"),false);
		enableZoom($("#centroCustoSolicitacao"),false);
		enableField($("#disciplinaSC"),false);
		enableZoom($("#departamentoSC"),false);
		enableField($("#obsGeralSolicitacao"),false);
		
		enableField($("#tipoAprovGerenteRev"),true);
		enableField($("#habilitarRevisao"),false);
		if(buscarModoForm() != "VIEW"){
		enableField($("#observacaoAprovGerenteRev"),true);
		}
	}else if(atividadeAtual == INFORMAR_RESP_VINCULACAO){
		
		enableContainer($("form")[0],false);
		enableZoom($("#nmFantColSolicitacao"),false);
		enableZoom($("#nmFantFilialSolicitacao"),false);
		enableZoom($("#centroCustoSolicitacao"),false);	
		enableField($("#obsGeralSolicitacao"),false);
		enableField($("#habilitarRevisao"),false);
		enableField($("#disciplinaSC"),true);
		enableField($("#apenasCotacao"),true);
		$(".matricRespDePara").prop('disabled', false);
		
		var tabela = document.getElementById("tableItens");
		var itens = tabela.getElementsByTagName("input");
		for (var i = 0; i < itens.length; i++){
			if (itens[i].id != null && itens[i].id.indexOf("indicePaiFilhoItem___") != -1) {
				var index = itens[i].name.substring(itens[i].name.lastIndexOf("_") + 1, itens[i].name.length);
				
				if($("#matricRespDePara___"+index).val() != ""){
					enableField($("#selectMatricRespDePara___"+index),false);
				}
					
		
			}
		 }
		carregarValoresMatricRespDePara();
		ativarChangeMatricRespDePara();
	
	}else if(atividadeAtual == ACOMPANHAR_SOLICITACAO_REVISAO){
		
		enableContainer($("form")[0],false);
		enableZoom($("#centroCustoSolicitacao"),false);	
		enableField($("#disciplinaSC"),false);
		enableZoom($("#departamentoSC"),false);
		enableZoom($("#filialDestino"),false);
		enableZoom($("#localDestino"),false);
		enableZoom($("#nmFantColSolicitacao"),false);
		enableZoom($("#nmFantFilialSolicitacao"),false);
		//enableField($("#observacaoLOS"),true);
		enableField($("#obsGeralSolicitacao"),false);
		enableField($("#obsAberturaContrato"),false);
		enableField($("#apenasCotacao"),true);
		
		$(".matricRespDePara").prop('disabled', true);
		/*
		var tabela = document.getElementById("tableItens");
		var itens = tabela.getElementsByTagName("input");
		for (var i = 0; i < itens.length; i++){
			if (itens[i].id != null && itens[i].id.indexOf("indicePaiFilhoItem___") != -1) {
				var index = itens[i].name.substring(itens[i].name.lastIndexOf("_") + 1, itens[i].name.length);
				enableField($("#selectMatricRespDePara___"+index),true);	
		
			}
		 }
*/
		carregarValoresMatricRespDePara();
	}else if(atividadeAtual == SUPORTE_TI || atividadeAtual == SUPORTE_TI_RM){
		enableContainer($("form")[0],true);
		enableZoom($("#tiporequisicao"),true);	
		enableZoom($("#centroCustoSolicitacao"),true);
		enableZoom($("#nmFantColSolicitacao"),true);
		enableZoom($("#nmFantFilialSolicitacao"),true);
		enableZoom($("#localEstoque"),true);	
		enableZoom($("#filialDestino"),true);
		enableZoom($("#localDestino"),true);
		enableField($("#obsGeralSolicitacao"),true);
		enableField($("#file"),true);
		enableField($("#loading-example-btn"),false);
		carregarValoresMatricRespDePara();
	}else{	
		enableContainer($("form")[0],false);
		enableZoom($("#tiporequisicao"),false);	
		enableZoom($("#centroCustoSolicitacao"),false);
		enableZoom($("#nmFantColSolicitacao"),false);
		enableZoom($("#nmFantFilialSolicitacao"),false);
		enableZoom($("#localEstoque"),false);	
		enableZoom($("#filialDestino"),false);
		enableZoom($("#localDestino"),false);
		enableField($("#obsGeralSolicitacao"),false);
		enableField($("#file"),false);
		enableField($("#loading-example-btn"),false);	
		carregarValoresMatricRespDePara();
	
		}
}
	
}