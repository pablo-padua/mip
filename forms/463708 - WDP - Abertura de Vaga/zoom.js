var underline = "___";
var indice = -1;
var aprovador = 0;

function setSelectedZoomItem(selectedItem){
	
	var arraySelectedItem = selectedItem.inputName.split("___");
	if (arraySelectedItem != null && arraySelectedItem != undefined
			&& arraySelectedItem.length > 1) {
		indice = arraySelectedItem[1];
	}
	
	switch (selectedItem.inputName) {
	case "obraSetor":
		$("[name=codColigada]").val(selectedItem["codColigada"]);
		$("[name=codCCSetor]").val(selectedItem["codCentroCusto"]);
		
		if(buscaCCSolicitante(selectedItem["codCentroCusto"])){
		
			$("[name=tipoVaga]").val(selectedItem["tipo"]);
			$("[name=codAprovadorVaga]").val('Pool:Role:' + selectedItem["codAprovador"]);
			$("[name=codAprovadorDiretor]").val('Pool:Role:' + selectedItem["codAprovadorDiretor"]);
			$("[name=codAprovadorPresid]").val(selectedItem["codAprovadorPresid"]);
			$("[name=codDP]").val('Pool:Role:' + selectedItem["codDP"]);
			$("[name=codRH]").val('Pool:Role:' + selectedItem["codRH"]);
			$("[name=papelRH]").val(selectedItem["codRH"]);
			$("[name=codMedicina]").val('Pool:Role:' + selectedItem["codMedicina"]);
			$("[name=codSeguranca]").val('Pool:Role:' + selectedItem["codSeguranca"]);
			$("[name=codAdm]").val('Pool:Role:' + selectedItem["codAdm"]);
			$("[name=processoAumentoQuadro]").val(selectedItem["processoAumentoQuadro"]);
			$("[name=tipo]").val(selectedItem["tipo"]);
			
			papelDirOpUsuarioLogado();
			papelRHUsuarioLogado();
					
			var arrayPaiFilho = $( "[name^='centroCusto___']" );
			for (var i = 0; i < arrayPaiFilho.length; i++){
				reloadZoomFilterValues(arrayPaiFilho[i].name, "CODCOLIGADA," + selectedItem["codColigada"]+ ',CODCCUSTO,' + selectedItem["codCentroCusto"]);
			}
			
			if($("[name=processoAumentoQuadro]").val() != "on"){
				FLUIGC.toast({
					title : '',
					message : "A Obra/Setor selecionada n\u00e3o possui Al\u00e7ada de Aprova\u00e7\u00e3o configurada para este processo. Favor contatar a TI.",
					type : 'danger'
				});
				$(".dadosVaga").hide();
			} else {
				$(".dadosVaga").show();
			}
		}
		
		$('#codFaixa' + underline + indice).val("");
		$('#codTabela' + underline + indice).val("");
		$('#salario' + underline + indice).val("");
		
		break;
		
	case "centroCusto" +underline+indice:
		$("#codCentroCusto" +underline+indice).val(selectedItem["CODCCUSTO"]);
		reloadZoomFilterValues("secao" +underline+indice, "CODCOLIGADA," + selectedItem["CODCOLIGADA"]+ ',CODCCUSTO,' + $("[name=codCCSetor]").val()+ ',CODCCUSTOMO,' + selectedItem["CODCCUSTO"]);
		//reloadZoomFilterValues("funcao" +underline+indice, "CODCOLIGADA," + selectedItem["CODCOLIGADA"]);
		$('#codFaixa' + underline + indice).val("");
		$('#codTabela' + underline + indice).val("");
		$('#salario' + underline + indice).val("");
		break;
		
	case "secao" +underline+indice:
		$('#codSecao' + underline + indice).val(selectedItem["CODIGO"]);
		$('#codFilial' + underline + indice).val(selectedItem["CODFILIAL"]);
		reloadZoomFilterValues("funcao" +underline+indice, "CODCOLIGADA," + selectedItem["CODCOLIGADA"]);
		$('#codFaixa' + underline + indice).val("");
		$('#codTabela' + underline + indice).val("");
		$('#salario' + underline + indice).val("");
		break;
		
	case "funcao" +underline+indice:
	
		if(permiteFuncao(selectedItem["CODIGO"])){
			
			if(regraSolicitante(selectedItem["CARGO"], selectedItem["GESTAO"], indice) == true){
			
				$('#codFuncao' + underline + indice).val(selectedItem["CODIGO"]);
				$('#funcGestao' + underline + indice).val(selectedItem["GESTAO"]);
				$('#cargo' + underline + indice).val(selectedItem["CARGO"]);
				
				changeFuncao(indice, selectedItem["TIPOMO"]);
				novoAprovador();
				
				var codColigada = $("[name=codColigada]").val();
				var codccusto = $("[name=codCCSetor]").val();
				var codsecao = $('#codSecao' + underline + indice).val();
				var codfuncao = selectedItem["CODIGO"];
				var vagas = getEfetivo(codColigada, codccusto, codsecao, codfuncao);
				$('#numEfetivo' + underline + indice).val(vagas.efetivo);
				$('#numReqPendente' + underline + indice).val(vagas.reqPendentes);
				
				reloadZoomFilterValues("nomeFaixa" +underline+indice, "CODCOLIGADA," + codColigada + ",CODFUNCAO," + codfuncao + ",CODSECAO," + codsecao);

			}
		
		}else{

			FLUIGC.toast({
				title : '',
				message : 'Não é permitido associar a fun\u00e7\u00e3o <b>' + selectedItem["CODIGO"] + ' - ' + selectedItem["FUNCAO"] + '</b> na Obra/Setor <b>' + $("#obraSetor").val() + '</b>',
				type : 'danger',
				label : 'Ok'
			});			
			window["funcao" + underline + indice].clear();
			
		}
		
		$('#codFaixa' + underline + indice).val("");
		$('#codTabela' + underline + indice).val("");
		$('#salario' + underline + indice).val("");
		
		break;

	case "nomeFaixa" +underline+indice:
		$('#codFaixa' + underline + indice).val(selectedItem["CODFAIXA"]);
		$('#codTabela' + underline + indice).val(selectedItem["CODTABELA"]);
		$('#salario' + underline + indice).val(selectedItem["SALARIO_BR"]);
		break;		
	}
	
}

function removedZoomItem(removedItem) {

	switch (removedItem.inputName) {
		
	case "obraSetor":		
		$("[name=codColigada]").val("");
		$("[name=codCCSetor]").val("");
		$("[name=tipoVaga]").val("");
		$("[name=codAprovadorVaga]").val("");
		$("[name=codAprovadorDiretor]").val("");
		$("[name=codAprovadorPresid]").val("");
		$("[name=codDP]").val("");
		$("[name=codRH]").val("");
		$("[name=papelRH]").val("");
		$("[name=codMedicina]").val("");
		$("[name=codSeguranca]").val("");
		$("[name=processoAumentoQuadro]").val("");
		
		var index = wdkAddChild("tbVaga");
		reloadZoomFilterValues("centroCusto___"+index, "CODCOLIGADA," + $("[name=codColigada]").val()+ ',CODCCUSTO,' + $("[name=codCCSetor]").val());
		//for (var i = 0; i < index; i++){
		//	$( "#botaoDeleteVaga" + underline + i).trigger( "click" );
		//}
		
		$('#salario' + underline + indice).val("");
		$('#codTabela' + underline + indice).val("");
		$('#codFaixa' + underline + indice).val("");
		
		break;
			
	case "centroCusto" +underline+indice:	
		$('#centroCusto' + underline + indice).val("");
		$('#codSecao' + underline + indice).val("");
		$('#secao' + underline + indice).val("");
		$('#codFuncao' + underline + indice).val("");
		$('#funcao' + underline + indice).val("");
		$('#salario' + underline + indice).val("");
		$('#codTabela' + underline + indice).val("");
		$('#codFaixa' + underline + indice).val("");
		break;
		
	case "secao" +underline+indice:	
		$("[name=codSecao]").val("");
		$('#codFuncao' + underline + indice).val("");
		$('#funcao' + underline + indice).val("");
		$('#salario' + underline + indice).val("");
		$('#codTabela' + underline + indice).val("");
		$('#codFaixa' + underline + indice).val("");
		break;
		
	case "funcao" +underline+indice:	
		$('#salario' + underline + indice).val("");
		$('#codTabela' + underline + indice).val("");
		$('#codFaixa' + underline + indice).val("");
		$('#nomeFaixa' + underline + indice).val("");
		$('#numeroVagas' + underline + indice).val("");
		$('#codFuncao' + underline + indice).val("");
		$('#funcGestao' + underline + indice).val("");
		$('#cargo' + underline + indice).val("");
		novoAprovador();
		$('#salario' + underline + indice).val("");
		$('#codTabela' + underline + indice).val("");
		$('#codFaixa' + underline + indice).val("");
			
		break;
		
	case "nomeFaixa" +underline+indice:	
		$('#salario' + underline + indice).val("");
		$('#codTabela' + underline + indice).val("");
		$('#codFaixa' + underline + indice).val("");

		break;
		
	}
	
}

function getValorMonetario(valor) {
	var retorno = valor.split(".");
	var reais = retorno[0];
	//console.log("reais:" + reais);
	var centavos = retorno[1].substring(0,2);
	//console.log("centavos:" + centavos);
	var valorFormatado = reais + "." + centavos;
	//console.log("valorFormatado:" + valorFormatado);
	return valorFormatado;
}

function getEfetivo(codcoligada, codccusto, codsecao, codfuncao){
	
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codcoligada, codcoligada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCCUSTO", codccusto, codccusto, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODSECAO", codsecao, codsecao, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("CODFUNCAO", codfuncao, codfuncao, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3, c4);

	var dataset = DatasetFactory.getDataset("ds_RM_WS077_QuadroLotacao", null, constraints, null);
	
	var vagas = new Object();
	
	for(var i=0; i < dataset.values.length; i++) {
		
		vagas.efetivo = dataset.values[i].EFETIVO == '' ? 0 : dataset.values[i].EFETIVO;
		vagas.reqPendentes = dataset.values[i].REQPENDENTES == '' ? 0 : dataset.values[i].REQPENDENTES;		
	}

	return vagas;
	
}

function permiteFuncao(codFuncao){
	
	var retorno = false;
	var coligada = $("[name=codColigada]").val();
	var codCCusto = $("[name=codCCSetor]").val();
	
	var c1 = DatasetFactory.createConstraint("COLIGADA_I", coligada, coligada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODFUNCAO", codFuncao, codFuncao, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODCCUSTO", codCCusto, codCCusto, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3);
	var dataset = DatasetFactory.getDataset("ds_RM_WS138_PermiteFuncao", null, constraints, null);
	
	
	for(var i=0; i < dataset.values.length; i++) {
		
		if (dataset.values[i].PERMITE == "1"){
			retorno = true;			
		}
	}
	
	return retorno;
	
}