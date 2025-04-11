var beforeSendValidate = function(numState, nextState) {
	console.log("#### custom validate: numState: " + numState);
	var msg = "";
	var lineBreaker = "<br>";
	if (numState == INICIO_0 || numState == INICIO) {
		msg = validaDuplicidadeRefeicoes(msg);
	}
	if (msg != "") {
		throw (msg);
	}
	return true;
}

function validaDuplicidadeRefeicoes(errorMsg){
	var hidden_CODCCUSTO = $("#hidden_CODCCUSTO").val();
	if(hidden_CODCCUSTO == ''){
		errorMsg += "Favor Informar o Projeto.</br>";	
	}
	var hidden_codcfo = $("#hidden_codcfo").val();
	if(hidden_codcfo == ''){
		errorMsg += "Favor Informar o Fornecedor.</br>";	
	}
	var dtVoucher = $("#dtVoucher").val();
	if(dtVoucher == ''){
		errorMsg += "Favor Informar a Data Voucher.</br>";	
	}
	$("[name^=hidden_CPF___]").each(function(){
		var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);	
		
		var hidden_CPF = $("#hidden_CPF___"+index).val();
		if(hidden_CPF == ''){
			errorMsg += "Favor Informar o CPF da linha :"+index+" na nos Funcionários programados.</br>";	
		}else{
		var hidden_checkboxCafeForms = $("#hidden_checkboxCafe___"+index).val();
		var hidden_checkboxAlmocoForms = $("#hidden_checkboxAlmoco___"+index).val();
		var hidden_checkboxJantarForms = $("#hidden_checkboxJantar___"+index).val();
		var hidden_checkboxAguaForms = $("#hidden_checkboxAgua___"+index).val();
		
		var c1 = DatasetFactory.createConstraint("hidden_CODCCUSTO", hidden_CODCCUSTO, hidden_CODCCUSTO, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("hidden_codcfo", hidden_codcfo, hidden_codcfo, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("dtVoucher", dtVoucher, dtVoucher, ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint("hidden_CPF", hidden_CPF, hidden_CPF, ConstraintType.MUST);
		var fieldAsConstraint = new Array(c1, c2, c3, c4);
		var datasetDuplicidadeFunc = DatasetFactory.getDataset("ds_FLUIG_QUERY_SELECT_validacaoDuplicidadeSolicitacaoAlimentacao", null, fieldAsConstraint, null);

		if (datasetDuplicidadeFunc.values.length > 0) {
			var numero_solicitacao = datasetDuplicidadeFunc.values[0].numero_solicitacao;
			
			if(numero_solicitacao != $("#numero_solicitacao").val()){
				var hidden_checkboxCafe = datasetDuplicidadeFunc.values[0].hidden_checkboxCafe;
				var hidden_checkboxAlmoco = datasetDuplicidadeFunc.values[0].hidden_checkboxAlmoco;
				var hidden_checkboxJantar = datasetDuplicidadeFunc.values[0].hidden_checkboxJantar;
				var hidden_checkboxAgua = datasetDuplicidadeFunc.values[0].hidden_checkboxAgua;
				
				if(hidden_checkboxCafe == hidden_checkboxCafeForms && hidden_checkboxCafeForms != ''){
					errorMsg += "Localizado uma duplicidade na Solicitação para o CPF:<b>" + hidden_CPF + "</b> Linha:<b>" + index + "</b> na solicitação de número " + numero_solicitacao + ".</br>";	
				}
				if(hidden_checkboxAlmoco == hidden_checkboxAlmocoForms && hidden_checkboxAlmocoForms != ''){
					errorMsg += "Localizado uma duplicidade na Solicitação para o CPF:<b>" + hidden_CPF + "</b> Linha:<b>" + index + "</b> na solicitação de número " + numero_solicitacao + ".</br>";	
				}
				if(hidden_checkboxJantarForms == hidden_checkboxJantar && hidden_checkboxJantarForms != ''){
					errorMsg += "Localizado uma duplicidade na Solicitação para o CPF:<b>" + hidden_CPF + "</b> Linha:<b>" + index + "</b> na solicitação de número " + numero_solicitacao + ".</br>";		
				}
				if(hidden_checkboxAguaForms == hidden_checkboxAgua && hidden_checkboxAguaForms != ''){
					errorMsg += "Localizado uma duplicidade na Solicitação para o CPF:<b>" + hidden_CPF + "</b> Linha:<b>" + index + "</b> na solicitação de número " + numero_solicitacao + ".</br>";		
				}	
			}
		}
	}
	});
	
	$("[name^=cpfTerceiro___]").each(function(){
		var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);	
		
		var hidden_CPF = $("#hidden_CPF_TERC___"+index).val();
		if(hidden_CPF == ''){
			errorMsg += "Favor Informar o CPF da linha :"+index+" na nos colaboradores terceiros programados.</br>";	
		}else{
		var hidden_checkboxCafeFormsTerc = $("#hidden_checkboxCafeTerc___"+index).val();
		var hidden_checkboxAlmocoFormsTerc = $("#hidden_checkboxAlmocoTerc___"+index).val();
		var hidden_checkboxJantarFormsTerc = $("#hidden_checkboxJantarTerc___"+index).val();
		var hidden_checkboxAguaFormsTerc = $("#hidden_checkboxAguaTerc___"+index).val();
		
		var c1 = DatasetFactory.createConstraint("hidden_CODCCUSTO", hidden_CODCCUSTO, hidden_CODCCUSTO, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("hidden_codcfo", hidden_codcfo, hidden_codcfo, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("dtVoucher", dtVoucher, dtVoucher, ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint("hidden_CPF", hidden_CPF, hidden_CPF, ConstraintType.MUST);
		var fieldAsConstraint = new Array(c1, c2, c3, c4);
		var datasetDuplicidadeTerc = DatasetFactory.getDataset("ds_FLUIG_QUERY_SELECT_validacaoDuplicidadeSolicitacaoAlimentacao", null, fieldAsConstraint, null);

		if (datasetDuplicidadeTerc.values.length > 0) {
			var numero_solicitacao = datasetDuplicidadeTerc.values[0].numero_solicitacao;
			if(numero_solicitacao != $("#numero_solicitacao").val()){
			var hidden_checkboxCafeTerc = datasetDuplicidadeTerc.values[0].hidden_checkboxCafe;
			var hidden_checkboxAlmocoTerc = datasetDuplicidadeTerc.values[0].hidden_checkboxAlmoco;
			var hidden_checkboxJantarTerc = datasetDuplicidadeTerc.values[0].hidden_checkboxJantar;
			var hidden_checkboxAguaTerc = datasetDuplicidadeTerc.values[0].hidden_checkboxAgua;
			
			if(hidden_checkboxCafeTerc == hidden_checkboxCafeFormsTerc && hidden_checkboxCafeFormsTerc != ''){
				errorMsg += "Localizado uma duplicidade na Solicitação para o CPF:<b>" + hidden_CPF + "</b> Linha:<b>" + index + "</b> na solicitação de número " + numero_solicitacao + ".</br>";	
			}
			if(hidden_checkboxAlmocoTerc == hidden_checkboxAlmocoFormsTerc && hidden_checkboxAlmocoFormsTerc != ''){
				errorMsg += "Localizado uma duplicidade na Solicitação para o CPF:<b>" + hidden_CPF + "</b> Linha:<b>" + index + "</b> na solicitação de número " + numero_solicitacao + ".</br>";	
			}
			if(hidden_checkboxJantarFormsTerc == hidden_checkboxJantarTerc && hidden_checkboxJantarFormsTerc != ''){
				errorMsg += "Localizado uma duplicidade na Solicitação para o CPF:<b>" + hidden_CPF + "</b> Linha:<b>" + index + "</b> na solicitação de número " + numero_solicitacao + ".</br>";		
			}
			if(hidden_checkboxAguaFormsTerc == hidden_checkboxAguaTerc && hidden_checkboxAguaFormsTerc != ''){
				errorMsg += "Localizado uma duplicidade na Solicitação para o CPF:<b>" + hidden_CPF + "</b> Linha:<b>" + index + "</b> na solicitação de número " + numero_solicitacao + ".</br>";		
			}
		}
		}
	}
	});
	
	return errorMsg;
}


