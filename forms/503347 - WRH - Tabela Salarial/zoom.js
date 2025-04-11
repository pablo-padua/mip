var underline = "___";
var indice = -1;

function setSelectedZoomItem(selectedItem){
	
	var arraySelectedItem = selectedItem.inputName.split("___");
	if (arraySelectedItem != null && arraySelectedItem != undefined && arraySelectedItem.length > 1) {
		indice = arraySelectedItem[1];
	}
	
	switch (selectedItem.inputName) {

	case "obraSetor":
		
		var tipoAcao = $("[name=hiddenTipoAcao]").val();
		var tipo = selectedItem["tipo"];
		$("[name=codCCObraSetor]").val(selectedItem["codCentroCusto"]);
		
		if (tipoAcao == "incluir" && tipo == "sede"){
			
			FLUIGC.toast({
				title : '',
				message : 'Para "Criar Nova Tabela" na Sede, consulte o RH. <br><br> Caso deseje alterar uma tabela já existente, utilize a opção "Alterar Tabela".',
				type : 'danger',
				label : 'Ok'
			});			
			window["obraSetor"].clear();
			
		} /*else if (tipoAcao == "incluir" && existeTabelaObraSetor(selectedItem["codColigada"], selectedItem["codCentroCusto"]) == true){
		
			FLUIGC.toast({
				title : '',
				message : 'Obra/Setor selecionado já possui tabela salarial cadastrada. Utilize a opção "Alterar Tabela".',
				type : 'danger',
				label : 'Ok'
			});			
			window["obraSetor"].clear();
			
		} */else if(getFaixaSalarial(selectedItem["codColigada"], tipo, "") == true) {
			
			validaAlcadaAprovacao(selectedItem["codColigada"], selectedItem["codCentroCusto"]);
			$("[name=codColigada]").val(selectedItem["codColigada"]);
			$("[name=codCCObraSetor]").val(selectedItem["codCentroCusto"]);
			$("[name=codDP]").val('Pool:Role:' + selectedItem["codDP"]);
			$("[name=codRH]").val('Pool:Role:' + selectedItem["codRH"]);
			$("[name=codMedicina]").val('Pool:Role:' + selectedItem["codMedicina"]);
			$("[name=codSeguranca]").val('Pool:Role:' + selectedItem["codSeguranca"]);
			$("[name=codTI]").val('Pool:Role:' + selectedItem["codTI"]);
			$("[name=codLogistica]").val('Pool:Role:' + selectedItem["codLogistica"]);
			$("[name=codAdm]").val('Pool:Role:' + selectedItem["codAdm"]);
			$("[name=codFinanceiro]").val('Pool:Role:' + selectedItem["codFinanceiro"]);
			$("[name=tipo]").val(selectedItem["tipo"]);
			
			if (tipo == "obra"){
				$("[name=matrAprovadorGerente]").val('Pool:Role:' + selectedItem["codAprovador"]);
				$("[name=matrAprovadorDiretor]").val('Pool:Role:' + selectedItem["codAprovadorDiretor"]);		
			} else if (tipo == "sede"){
				$("[name=matrAprovadorDiretor]").val('Pool:Role:' + selectedItem["codAprovador"]);
			}
			
			SolicitanteAprovador();
			
			reloadZoomFilterValues("tabela", "CODCOLIGADA," + selectedItem["codColigada"] + ",CODCCUSTO," +selectedItem["codCentroCusto"]);

			buscaCCSolicitante(selectedItem["codCentroCusto"]);
			
			carregaFuncoesExistentes();
			
			if($("[name=novaTabelaSalarial]:checked").val() == "incluir")
				$(".fileCSV").show();
						
			$("#alterar").attr('disabled', 'disabled');
			$("#incluir").attr('disabled', 'disabled');

		}

		break;

	case "tabela":
		
		var codColigada = $("[name=codColigada]").val();
		var tipo = $("[name=tipo]").val();
		var codTabela = selectedItem["CODTABELA"];
		
		if(getFaixaSalarial(codColigada, tipo, codTabela) == true) {
		
			var tabelaPlanoNovo = (codTabela.substring(0, 1) == "T"); /* As Tabelas do Novo Plano de Cargos e salários iniciam com a letra "T" no código */		
			//var codFuncaoSolicitante = $("[name=codFuncaoSolicitante]").val();
			var gestorProcesso = isUsuarioGestor(buscarMatriculaUsuarioLogado());
			
			//if(tabelaPlanoNovo == true && codFuncaoSolicitante != "0575") /* 0575 - GERENTE DE RH E COMPLIANCE */
			if(tabelaPlanoNovo == true && gestorProcesso != true){ 
				
				FLUIGC.toast({
					title : '',
					message : 'Para realizar alterações em uma tabela do novo Plano de Cargos e Salários, entre em contato com o RH.',
					type : 'danger',
					label : 'Ok'
				});			
				window["tabela"].clear();
				
			} else {
				
				$("[name=codTabela]").val(selectedItem["CODTABELA"]);
				$("[name=filialTabelaExistente]").val(selectedItem["CODFILIAL"]);		
				$(".tbFuncoesExistentes").show();
				$(".tbFuncoesNovas").show();
				carregaFuncoesExistentes();
				
			}
		}
		
		break;
		
	case "nivelFuncNova" + underline + indice:
	
		if(permiteFuncao(selectedItem["CODIGO"])){
			
			var gestao = selectedItem["GESTAO"];
			
			if(gestao == "1" && permiteFuncaoGestao() == false){
				
				window["nivelFuncNova" + underline + indice].clear();
				FLUIGC.toast({
					title : '',
					message : 'Você não tem acesso a Funções de Gestão',
					type : 'danger',
					label : 'Ok'
				});
				
			} else {
			
				var codSecao = $("#codSecaoFuncNova" + underline + indice).val();
				var codFuncao = selectedItem["CODIGO"];
				
				$("#codNivelFuncNova" + underline + indice).val(selectedItem["CODIGO"]);
				$("#divSalarioFuncNova" + underline + indice).show();
				$("#isFuncNova" + underline + indice).val("1");

				existeFuncaoTabela(codFuncao, indice);
				retornarCodigoNovaFuncDuplicado(codFuncao, codSecao, indice);
								
				if(codSecao != "")					
					existeVinculoLotacaoTabela(codSecao, codFuncao, indice);
				
			}			
			
		}else{

			FLUIGC.toast({
				title : '',
				message : 'Não é permitido associar a fun\u00e7\u00e3o <b>' + selectedItem["CODIGO"] + ' - ' + selectedItem["FUNCAO"] + '</b> na Obra/Setor <b>' + $("#obraSetor").val() + '</b>',
				type : 'danger',
				label : 'Ok'
			});			
			window["nivelFuncNova" + underline + indice].clear();
			$("#codNivelFuncNova" + underline + indice).val("");
			
		}			
		
		break;
		
	case "nivelFuncTabelaNova" + underline + indice:
	
		if(permiteFuncao(selectedItem["CODIGO"])){

			var gestao = selectedItem["GESTAO"];
			
			if(gestao == "1" && permiteFuncaoGestao() == false){
				
				window["nivelFuncTabelaNova" + underline + indice].clear();
				FLUIGC.toast({
					title : '',
					message : 'Você não tem acesso a Funções de Gestão',
					type : 'danger',
					label : 'Ok'
				});
				
			} else {
			
				$("#codNivelFuncTabelaNova" + underline + indice).val(selectedItem["CODIGO"]);
				retornarCodigoNovaTabDuplicado(selectedItem["CODIGO"], indice);
				
			}
			
		}else{
			
			FLUIGC.toast({
				title : '',
				message : 'Não é permitido associar a fun\u00e7\u00e3o <b>' + selectedItem["CODIGO"] + ' - ' + selectedItem["FUNCAO"] + '</b> na Obra/Setor <b>' + $("#obraSetor").val() + '</b>',
				type : 'danger',
				label : 'Ok'
			});
			window["nivelFuncTabelaNova" + underline + indice].clear();
			$("#codNivelFuncTabelaNova" + underline + indice).val("");
			
		}
		
	break;
		
	case "secaoFuncNova" + underline + indice:

		var codFuncao = $("#codNivelFuncNova" + underline + indice).val();
		var codSecao = selectedItem["CODIGO"];
		
		$("#codSecaoFuncNova" + underline + indice).val(codSecao);		
		
		if(codFuncao != ""){
			
			$("#divSalarioFuncNova" + underline + indice).show();
			$("#isFuncNova" + underline + indice).val("1");
			
			existeFuncaoTabela(codFuncao, indice);
			retornarCodigoNovaFuncDuplicado(codFuncao, codSecao, indice);
			existeVinculoLotacaoTabela(codSecao, codFuncao, indice);
		}	
		
		break;
		
	case "secaoFuncTabelaNova" + underline + indice:		
		$("#codSecaoFuncTabelaNova" + underline + indice).val(selectedItem["CODIGO"]);
		break;
		
	case "novaTabela":		
		$("#codNovaTabela").val(selectedItem["CODTABELA"]);
		$("[name=filialNovaTabela]").val(selectedItem["CODFILIAL"]);
		break;
		
	}	
}

function removedZoomItem(removedItem) {

	switch (removedItem.inputName) {
		
		case "obraSetor":
			$("[name=codColigada]").val("");
			$("[name=codCCObraSetor]").val("");		
			$("[name=codDP]").val("");
			$("[name=codRH]").val("");
			$("[name=codMedicina]").val("");
			$("[name=codSeguranca]").val("");
			$("[name=codTI]").val("");
			$("[name=codLogistica]").val("");
			$("[name=codAdm]").val("");
			$("[name=codFinanceiro]").val("");
			$("[name=tipo]").val("");
			$("[name=codTabela]").val("");
			window["tabela"].clear();
			$(".fileCSV").hide();
			
			var inputs_itens = $("#tbFuncoesExistentes :input");
			for (var i = 0; i < inputs_itens.length; i++) {
				if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("codNivelFuncExiste___") != -1) {
					fnWdkRemoveChild(inputs_itens[i]);
				}
			}
			
			$(".tbFuncoesExistentes").hide();
			$(".tbFuncoesNovas").hide();
			$(".tbTabelaNova").hide();
			
			$("#alterar").removeAttr('disabled');
			$("#incluir").removeAttr('disabled');
			
			break;
			
		case "tabela":
			$("[name=codTabela]").val("");

			var inputs_itens = $("#tbFuncoesExistentes :input");
			for (var i = 0; i < inputs_itens.length; i++) {
				if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("codNivelFuncExiste___") != -1) {
					fnWdkRemoveChild(inputs_itens[i]);
				}
			}
			
			$(".tbFuncoesExistentes").hide();
			$(".tbFuncoesNovas").hide();
			
			break;
		
	}
		
}

function retornarCodigoTabExistenteDuplicado(codigo, indice) {
	$("[name^=codNivelFuncExiste___]").each(function(el) {
		var id = this.id;
		var index = id.split("___")[1];
		var valorSelecionado = $("[name=codNivelFuncExiste" + underline + index + "]").val();
		if (codigo == valorSelecionado) {
			mensagemItemDuplicado(valorSelecionado, indice);
		}
	});
}

function retornarCodigoNovaFuncDuplicado(codFuncao, codSecao, indice) {

	$("[name^=codNivelFuncNova___]").each(function(el) {
		var id = this.id;
		var index = id.split("___")[1];
		var valorSelecionadoFuncao = $("[name=codNivelFuncNova" + underline + index + "]").val();
		var valorSelecionadoSecao = $("[name=codSecaoFuncNova" + underline + index + "]").val();
		if (codFuncao == valorSelecionadoFuncao && codSecao == valorSelecionadoSecao && index != indice) {
			$("#isFuncNova" + underline + indice).val("0");
			mensagemItemDuplicado(valorSelecionadoFuncao, indice);			
		}
		
		if (codFuncao == valorSelecionadoFuncao && index != indice) {
			$("#divSalarioFuncNova" + underline + indice).hide();
			$("#isFuncNova" + underline + indice).val("0");
		}
	});
}

function retornarCodigoNovaTabDuplicado(codigo, indice) {
	$("[name^=codNivelFuncTabelaNova___]").each(function(el) {
		var id = this.id;
		var index = id.split("___")[1];
		var valorSelecionado = $("[name=codNivelFuncTabelaNova" + underline + index + "]").val();
		if (codigo == valorSelecionado && index != indice) {
			mensagemItemDuplicado(valorSelecionado, indice);
		}
	});
}

function mensagemItemDuplicado(valorSelecionado, indice) {
	FLUIGC.toast({
		title : '',
		message : 'A Fun\u00e7\u00e3o <b>' + valorSelecionado + '</b> j\u00e1 foi cadastrada.',
		type : 'danger',
		label : 'Ok'
	});
	$("#btDeleteFuncNova___"+indice).trigger("click");
	$("#btDeleteFuncTabelaNova___"+indice).trigger("click");
}

function permiteFuncao(codFuncao){
	
	var retorno = false;
	var coligada = $("[name=codColigada]").val();
	var codCCusto = $("[name=codCCObraSetor]").val();
	
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

function existeFuncaoTabela(codFuncao, indice){
	
	var coligada = $("[name=codColigada]").val();
	var codTabela = $("[name=codTabela]").val();
	
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA_I", coligada, coligada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODTABELA", codTabela, codTabela, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODFUNCAO", codFuncao, codFuncao, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3);
	var dataset = DatasetFactory.getDataset("ds_RM_WS140_Funcao_Tabela", null, constraints, null);
	
	if (dataset.values[0].CODFUNCAO != "" && dataset.values[0].CODFUNCAO != undefined){
		
		/*
		FLUIGC.toast({
			title : '',
			message : 'A fun\u00e7\u00e3o <b>' + dataset.values[0].CODFUNCAO + ' - ' + dataset.values[0].FUNCAO + '</b> j\u00e1 est\u00e1 associada na tabela salarial <b>' + codTabela + '</b>. <br><br> Solicite a vincula\u00e7\u00e3o da lota\u00e7\u00e3o.',
			type : 'danger',
			label : 'Ok'
		});
		window["nivelFuncNova" + underline + indice].clear();
		$("#codNivelFuncNova" + underline + indice).val("");
		*/
		
		$("#divSalarioFuncNova" + underline + indice).hide();
		$("#isFuncNova" + underline + indice).val("0");

	} else {
		$("#divSalarioFuncNova" + underline + indice).show();
		$("#isFuncNova" + underline + indice).val("1");
	}
	
}

function existeVinculoLotacaoTabela(codSecao, codFuncao, indice){
	
	var coligada = $("[name=codColigada]").val();
	
	var c1 = DatasetFactory.createConstraint("PARAM_CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("PARAM_CODFUNCAO", codFuncao, codFuncao, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("PARAM_CODSECAO", codSecao, codSecao, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3);
	var dataset = DatasetFactory.getDataset("ds_RM_WS203_WRH09_VinculoTabLotacao", null, constraints, null);
	
	if (dataset.values[0].CODTABELA != "" && dataset.values[0].CODTABELA != undefined){
		
		FLUIGC.toast({
			title : '',
			message : 'A lota\u00e7\u00e3o <b>' + codFuncao + ' - ' + codSecao + '</b> j\u00e1 est\u00e1 vinculada na tabela salarial <b>' + dataset.values[0].CODTABELA + '</b>. <br><br>',
			type : 'danger',
			label : 'Ok'
		});
		window["secaoFuncNova" + underline + indice].clear();
		$("#codSecaoFuncNova" + underline + indice).val("");

	}
	
}

function getFaixaSalarial(codColigada, tipo, codTabela){
	
	if($("[name=hiddenTipoAcao]").val() == "incluir" && $("[name=codCCObraSetor]").val() == "1.01.02.346" )
		codTabela = "T346";
	
	var c1 = DatasetFactory.createConstraint("PARAM_CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("PARAM_TIPO", tipo, tipo, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("PARAM_CODTABELA", codTabela, codTabela, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3);
	var dataset = DatasetFactory.getDataset("ds_RM_WS194_WRH09_FaixasSalariais", null, constraints, null);
	
	if (dataset.values[0].CODFAIXA != "" && dataset.values[0].CODFAIXA != undefined){

		var arrayFaixaSalarial = [];
		
		for(var i=0; i < dataset.values.length; i++) {
			
			var faixaSalarial = {};
			faixaSalarial.CODFAIXA = dataset.values[i].CODFAIXA;
			faixaSalarial.NOMEFAIXA = dataset.values[i].NOMEFAIXA;
			arrayFaixaSalarial.push(faixaSalarial);
			
		}
		
		$("[name=arrayFaixaSalarial]").val(JSON.stringify(arrayFaixaSalarial));
		
		return true;

	}else{
		
		FLUIGC.toast({
			title : '',
			message : 'Erro ao consultar Faixas Salariais',
			type : 'danger',
			label : 'Ok'
		});
		
		window["obraSetor"].clear();
		$("#obraSetor").val("");
		
		return false;	
		
	}
	
}

function existeTabelaObraSetor(CODCOLIGADA, CODCCUSTO){
	
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCCUSTO", CODCCUSTO, CODCCUSTO, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_tabelasSalariais", null, constraints, null);
	
	if (dataset.values[0].CODTABELA != "" && dataset.values[0].CODTABELA != undefined)
		return true;
	else
		return false;

}