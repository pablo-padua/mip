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

	if(buscarModoForm() == "VIEW"){
		enableContainer($("form")[0],false);
		
	}else{
	
	if(atividadeAtual == INICIO || atividadeAtual == 0 ){


	}else if(atividadeAtual == APROVACAO_FORNECEDOR){		
		enableContainer($("form")[0],false);
		enableZoom($("#txt_projeto"),false);
		enableZoom($("#fornecedor"),false);
		enableZoom($("#contrato"),false);
		enableField($("#dtVoucher"),false);
		enableField($("#emailFornecedor"),true);
		

	}else if(atividadeAtual == VALIDAR_CONCLUSAO){		
		enableContainer($("form")[0],false);
		enableZoom($("#txt_projeto"),false);
		enableZoom($("#fornecedor"),false);
		enableZoom($("#contrato"),false);
		enableField($("#dtVoucher"),false);

		enableField($("#aprovacao"),true);
		enableField($("#justificativaAprov"),true);
		
		var tabela = document.getElementById("tablenameFuncionarios");
		var itens = tabela.getElementsByTagName("input");
		for (var i = 0; i < itens.length; i++){
			if (itens[i].id != null && itens[i].id.indexOf("hidden_matriculaFuncionario___") != -1) {
				var index = itens[i].id.substring(itens[i].id.lastIndexOf("_") + 1, itens[i].id.length);

			   enableZoom($("#funcionario___"+index),false);	
			
			}
		 }

	}else{	
		enableContainer($("form")[0],false);
		var tabela = document.getElementById("tablenameFuncionarios");
		var itens = tabela.getElementsByTagName("input");
		for (var i = 0; i < itens.length; i++){
			if (itens[i].id != null && itens[i].id.indexOf("hidden_matriculaFuncionario___") != -1) {
				var index = itens[i].id.substring(itens[i].id.lastIndexOf("_") + 1, itens[i].id.length);

			   enableZoom($("#funcionario___"+index),false);	
			
			}
		 }
		}
}
	
}