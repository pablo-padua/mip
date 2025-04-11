var underline = "___";
var indice = -1;

function setSelectedZoomItem(selectedItem){
	
	var arraySelectedItem = selectedItem.inputName.split("___");
	if (arraySelectedItem != null && arraySelectedItem != undefined && arraySelectedItem.length > 1) {
		indice = arraySelectedItem[1];
	}
	
	switch (selectedItem.inputName) {

	case "obraSetor":
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
		var alcada = selectedItem["processoDadosFuncionais"];
			
		/*if(alcada != 'on'){
			window["obraSetor"].clear();	
			FLUIGC.toast({
				title : '',
				message : "A Obra/Setor selecionada n\u00e3o possui Al\u00e7ada de Aprova\u00e7\u00e3o configurada para este processo. Favor contatar a TI.",
				type : 'danger'
			});			
		}*/
		
		reloadZoomFilterValues("funcionario", "TIPO," + selectedItem["tipo"] + ",CODCOLIGADA," + selectedItem["codColigada"] + ",CHAPA," + $("[name=chapaSolicitante]").val() + ",CODCCUSTO," + selectedItem["codCentroCusto"]);
		reloadZoomFilterValues("motMudancaFuncao", "CODCOLIGADA," + selectedItem["codColigada"]);
		reloadZoomFilterValues("motMudancaSalarial", "CODCOLIGADA," + selectedItem["codColigada"]);
		reloadZoomFilterValues("funcaoProposto", "CODCOLIGADA," + selectedItem["codColigada"]);

		buscaCCSolicitante(selectedItem["codCentroCusto"]);

		break;

		case "funcionario":
			if ($("[name=codColigada]").val() != ""){
				
				if(verificaDuplicidade($("[name=codColigada]").val(), selectedItem["CHAPA"]) == false){
				
					$("[name=chapa]").val(selectedItem["CHAPA"]);
					$("[name=nomeFunc]").val(selectedItem["NOME"]);						
					$("[name=chapaFuncionario]").val(selectedItem["CHAPA"]);
					$("[name=funcaoOrigem]").val(selectedItem["FUNCAO"]);
					$("[name=codFuncaoOrigem]").val(selectedItem["CODFUNCAO"]);
					$("[name=cargoOrigem]").val(selectedItem["CARGO"]);
					$("[name=codSecao]").val(selectedItem["CODSECAO"]);
					$("[name=nomeSecao]").val(selectedItem["DESCSECAO"]);				
					$("[name=gestao]").val(selectedItem["GESTAO"]);
					$("[name=dataAdmissao]").val(converteDataBanco(selectedItem["DATAADMISSAO"]));
					$("[name=salarioOrigem]").val(selectedItem["SALARIO"]);
					$("[name=dataPromocao]").val(selectedItem["DTPROMOCAO"]);
					$("[name=faixaOrigem]").val(selectedItem["FAIXA"]);
					$("[name=nomeFaixaOrigem]").val(selectedItem["NOMEFAIXA"]);
					$("[name=codTabSalarial]").val(selectedItem["CODTABELASALARIAL"]);
					$("[name=matrAprovadorGerente]").val(selectedItem["APGERENTE"]);
					$("[name=matrAprovadorDiretor]").val(selectedItem["APDIRETOR"]);	
					$("[name=matrAprovadorPresid]").val(selectedItem["APPRESIDENTE"]);	
					
					validaMudancaFuncao();
					preencheCCustoOrigem();
					retornaAbsenteismo();
					variacaoSalarial();
					validarExistenciaAddTranf($("[name=codColigada]").val(), selectedItem["CHAPA"]);
					
					$("[name=hiddenfiltroCentroCustoProp]").val("true");
					
				}
				
			} else {
				window["funcionario"].clear();
				FLUIGC.toast({
					title : '',
					message : 'Voc\u00ea precisar selecionar o campos Obra/Setor primeiro.',
					type : 'danger'
				});
			}	
			break;	
		
		case "funcaoProposto":

			var codColigada = $("[name=codColigada]").val();
			var codSecao = $("[name=codSecao]").val();
			var codFuncaoProposto = selectedItem["CODIGO"];			
			$("[name=codFuncaoProposto]").val(codFuncaoProposto);
			$("[name=cargoProposto]").val(selectedItem["CARGO"]);
			$("[name=cargoPropostoTipoMO]").val(selectedItem["TIPOMO"]);
			
			validaMudancaFuncao();
			verificaSoldador();
			verificaTabelaSalarial(codColigada, codFuncaoProposto, codSecao);
			reloadZoomFilterValues("nomeFaixaProposto", "CODCOLIGADA," + $("[name=codColigada]").val() + ",CODFUNCAO," + codFuncaoProposto + ",CODSECAO," + $("[name=codSecao]").val());
			
			break;
			
		case "nomeFaixaProposto":

			if (parseFloat(selectedItem["SALARIO"]) >= parseFloat(getValor($("[name=salarioOrigem]").val()))){
				
				$('#codFaixaProposto').val(selectedItem["CODFAIXA"]);
				$('#codTabelaProposto').val(selectedItem["CODTABELA"]);
				$('#salarioProposto').val(selectedItem["SALARIO_BR"]);
				
				variacaoSalarial();
				aberturaRateio();
				
				alertasSelecao();
				$("[name=resultadoLaudoProva]").val(verificaLaudoProva(true, "warning", "<br> A solicitação será encaminhada para o Setor Administrativo / RH"));
				$("[name=hiddenfiltroCentroCustoProp]").val("true");
				
			} else {
				window["nomeFaixaProposto"].clear();
				$("#codFaixaProposto").val("");
				$("#codTabelaProposto").val("");
				$("#salarioProposto").val("");
				FLUIGC.toast({
					title : "",
					message : "N\u00e3o \u00e9 permitido reduzir o sal\u00e1rio do colaborador, solicite atualiza\u00e7\u00e3o da tabela salarial ou proponha outra fun\u00e7\u00e3o / faixa salarial para este colaborador.",
					type : "danger"
				});
			}
			
			break;
			
		case "centroCustoProp___" + indice:
		
			var custoTipoMO  = selectedItem["CODCCUSTO"].substring(9, 11);
			var funcaoTipoMO = $("[name=cargoPropostoTipoMO]").val();
		
			var valTipoMO = "";
			
			if($("[name=codFuncaoProposto]").val() != "A002") /* Não valida AJUDANTE */
				valTipoMO = validacaoTipoMO(custoTipoMO, funcaoTipoMO);
			else
				valTipoMO = "";
			
			if(valTipoMO == ""){
				
				$("#codCentroCustoProp___"+ indice).val(selectedItem["CODCCUSTO"]);
				retornarCodigoDuplicado(selectedItem["CODCCUSTO"], indice);
				
			} else {
				
				$('#codCentroCustoProp' + underline + indice).val("");
				window["centroCustoProp" + underline + indice].clear();
				
				FLUIGC.toast({
					title : '',
					message : valTipoMO,
					type : 'danger'
				});
				
			}
			
			break;
			
		case "motMudancaFuncao":	
			$("[name=codMotMudancaFuncao]").val(selectedItem["CODMOTFUNCAO"]);
			break;
			
		case "motMudancaSalarial":	
			$("[name=codMotMudancaSalarial]").val(selectedItem["CODMOTSAL"]);
			validaMudancaSalarial(selectedItem["CODMOTSAL"]);
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
			$("[name=chapa]").val("");
			$("[name=nomeFunc]").val("");	
			window["funcionario"].clear();
			$("[name=chapaFuncionario]").val("");			
			$("[name=funcaoOrigem]").val("");
			$("[name=codFuncaoOrigem]").val("");
			$("[name=cargoOrigem]").val("");
			$("[name=codSecao]").val("");
			$("[name=nomeSecao]").val("");				
			$("[name=gestao]").val("");
			$("[name=dataAdmissao]").val("");
			$("[name=salarioOrigem]").val("");
			$("[name=dataPromocao]").val("");
			$("[name=faixaOrigem]").val("");
			$("[name=nomeFaixaOrigem]").val("");
			$("[name=codTabSalarial]").val("");
			$("[name=matrAprovadorGerente]").val("");	
			$("[name=matrAprovadorDiretor]").val("");	
			$("[name=matrAprovadorPresid]").val("");
			$("[name=codFuncaoProposto]").val("");
			window["funcaoProposto"].clear();
			$("[name=salarioProposto]").val("");
			$("[name=notaProvaTecnica]").val("");
			$("[name=exigeLaudo]").val("");
			$("[name=laudo]").val("");
			$("[name=laudoApto]").val("");
			
			window["nomeFaixaProposto"].clear();
			$("#codFaixaProposto").val("");
			$("#codTabelaProposto").val("");
			$("#salarioProposto").val("");
			
			var inputs_itens = $("#tbRateioOrigem :input");
			for (var i = 0; i < inputs_itens.length; i++) {
				if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("codCentroCustoOrigem___") != -1) {
					fnWdkRemoveChild(inputs_itens[i]);
				}
			}
			
			var inputs_itens = $("#tbRateioProp :input");
			for (var i = 0; i < inputs_itens.length; i++) {
				if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("centroCustoProp___") != -1) {
					fnWdkRemoveChild(inputs_itens[i]);
				}
			}
			
			break;
			
		case "funcionario":
			$("[name=chapa]").val("");
			$("[name=nomeFunc]").val("");			
			$("[name=codPessoaSolic]").val("");			
			$("[name=chapaFuncionario]").val("");			
			$("[name=funcaoOrigem]").val("");
			$("[name=codFuncaoOrigem]").val("");
			$("[name=cargoOrigem]").val("");
			$("[name=codSecao]").val("");
			$("[name=nomeSecao]").val("");	
			$("[name=dataAdmissao]").val("");
			$("[name=salarioOrigem]").val("");
			$("[name=dataPromocao]").val("");
			$("[name=absenteismoMedico]").val("");
			$("[name=absenteismoProdutiv]").val("");
			$("[name=matrAprovadorGerente]").val("");	
			$("[name=matrAprovadorDiretor]").val("");	
			$("[name=matrAprovadorPresid]").val("");
			$("[name=codFuncaoProposto]").val("");
			window["funcaoProposto"].clear();
			$("[name=salarioProposto]").val("");
			$("[name=notaProvaTecnica]").val("");
			$("[name=exigeLaudo]").val("");
			$("[name=laudo]").val("");
			$("[name=laudoApto]").val("");
			
			window["nomeFaixaProposto"].clear();
			$("#codFaixaProposto").val("");
			$("#codTabelaProposto").val("");
			$("#salarioProposto").val("");
			
			var inputs_itens = $("#tbRateioOrigem :input");
			for (var i = 0; i < inputs_itens.length; i++) {
				if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("codCentroCustoOrigem___") != -1) {
					fnWdkRemoveChild(inputs_itens[i]);
				}
			}
			
			var inputs_itens = $("#tbRateioProp :input");
			for (var i = 0; i < inputs_itens.length; i++) {
				if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("centroCustoProp___") != -1) {
					fnWdkRemoveChild(inputs_itens[i]);
				}
			}			
			
			break;
			
		case "funcaoProposto":
			$("[name=codFuncaoProposto]").val("");
			$("[name=salarioProposto]").val("");
			$("[name=cargoProposto]").val("");
			$("[name=cargoPropostoTipoMO]").val("");
			$("[name=notaProvaTecnica]").val("");
			$("[name=exigeLaudo]").val("");
			$("[name=laudo]").val("");
			$("[name=laudoApto]").val("");
			
			window["nomeFaixaProposto"].clear();
			$("#codFaixaProposto").val("");
			$("#codTabelaProposto").val("");
			$("#salarioProposto").val("");
			
			var inputs_itens = $("#tbRateioProp :input");
			for (var i = 0; i < inputs_itens.length; i++) {
				if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("centroCustoProp___") != -1) {
					fnWdkRemoveChild(inputs_itens[i]);
				}
			}
			break;
			
		case "nomeFaixaProposto":
			
			$("#codFaixaProposto").val("");
			$("#codTabelaProposto").val("");
			$("#salarioProposto").val("");
			
			var inputs_itens = $("#tbRateioProp :input");
			for (var i = 0; i < inputs_itens.length; i++) {
				if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("centroCustoProp___") != -1) {
					fnWdkRemoveChild(inputs_itens[i]);
				}
			}
			
			break;
			
		case "centroCustoProp___" + indice:
			$("#codCentroCustoProp___"+ indice).val("");
			break;
			
		case "motMudancaFuncao":	
			$("[name=codMotMudancaFuncao]").val("");
			break;
			
		case "motMudancaSalarial":	
			$("[name=codMotMudancaSalarial]").val("");
			break;
	}
		
}

function getValorMonetario(valor) {
	var retorno = valor.split(".");
	var reais = retorno[0];
	var centavos = retorno[1].substring(0,2);
	var valorFormatado = reais + "," + centavos;
	return valorFormatado;
}

function converteDataBanco(dataBanco) {
	var splitData = dataBanco.split("T");
	if (splitData[0] != undefined && splitData[0] != null && splitData[0] != "") {
		var dataAmericana = splitData[0];
		var splitDataAmericana = dataAmericana.split("-");
		return splitDataAmericana[2] + "/" + splitDataAmericana[1] + "/"
				+ splitDataAmericana[0];
	} else {
		return "";
	}
}

function retornarCodigoDuplicado(codigoCentroDeCusto, indice) {
	$("[name^=codCentroCustoProp___]").each(function(el) {
		var id = this.id;
		var index = id.split("___")[1];
		var valorSelecionado = $("[name=codCentroCustoProp" + underline + index + "]").val();
		if (codigoCentroDeCusto == valorSelecionado && index != indice) {
			mensagemItemDuplicado(valorSelecionado, indice);
		}
	});
}

function mensagemItemDuplicado(valorSelecionado, indice) {
	FLUIGC.message.alert({
		message : 'O Centro de Custo ' + valorSelecionado + ' j\u00e1 foi selecionado',
		title : "Aten\u00e7\u00e3o",
		label : 'Ok'
	}, function(el, ev) {
		$('#codCentroCustoProp' + underline + indice).val("");
		window["centroCustoProp" + underline + indice].clear();
	});
}

function validacaoTipoMO(custoTipoMO, funcaoTipoMO){
	
	msgRetorno = "";
	
	if(custoTipoMO == ".2" && funcaoTipoMO != "2"){ /* Tipo de Mão de Obra = Indireta */
		
		msgRetorno = "Não é permitido classificar o Tipo de Mão de Obra desta Função como 'Indireta'";
		
	} else if(custoTipoMO == ".4" && funcaoTipoMO != "4"){ /* Tipo de Mão de Obra = Direta */
		
		msgRetorno = "Não é permitido classificar o Tipo de Mão de Obra desta Função como 'Direta'";
		
	}
		
	return msgRetorno;	
}

function reloadRateio() {
	
	var filtroCusto = getFiltroRateio();
	
	$("[name^=codCentroCustoProp___]").each(function(el) {
		var id = this.id;
		var index = id.split("___")[1];
		
		window["centroCustoProp___" + index].clear();
		reloadZoomFilterValues("centroCustoProp___" + index, "CODCOLIGADA," + $("[name=codColigada]").val() + ",CODCCUSTO," + $("[name=codCCObraSetor]").val() + ",CODSECAO," + $("[name=codSecao]").val() + ",FILTROCUSTO," + filtroCusto);

	});
	
}

function verificaDuplicidade(CODCOLIGADA, CHAPA){
	
	try{
		
		var c1 = DatasetFactory.createConstraint("CODCOLIGADA", CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("CHAPA", CHAPA, CHAPA, ConstraintType.MUST);	
		var constraints = new Array(c1, c2);		
		var dataset = DatasetFactory.getDataset("dsVwMip_WRH03_WRH06_WRH07_EmAberto", null, constraints, null);
		
		var TENANT_ID = buscarEmpresa();
		var url = getURL();

		if(dataset.values.length > 0){
	
			if(dataset.values[0].PROCESSO != ""){
				
				var urlSolicitacao = url + "portal/p/" + TENANT_ID + "/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + dataset.values[0].NUM_PROCES;

				var msg = "<div style='text-align: left;'>";
				msg += "Foi encontrato um processo em aberto no FLUIG para a CHAPA " + CHAPA + ". <br> É necessário cancelar ou concluir o processo antes de realizar uma nova solicitação.<br>";
				msg += "<br><b>Processo:</b> " + dataset.values[0].PROCESSO;
				msg += "<br><b>Número:</b> <a href='" + urlSolicitacao + "' target='_blank'>" + dataset.values[0].NUM_PROCES + " <i class='flaticon flaticon-link icon-sm'></i> </a>";
				msg += "<br><b>Solicitante:</b> " + dataset.values[0].SOLICITANTE;
				msg += "<br><b>Data:</b> " + dataset.values[0].DATA;
				msg += "</div>";
					
				FLUIGC.toast({
					title : '',
					message : msg,
					type : 'danger'
				});
				
				return true;
					
			}
		}
		
	} catch (e) {		
		
		FLUIGC.toast({
			title : '',
			message : 'Erro ao consultar dsVwMip_WRH03_WRH06_WRH07_EmAberto. Entre em contato com o setor de TI.' + e,
			type : 'danger'
		});
		
		return true;
		
	}	
	
	return false;
	
}

function getURL(){	
	
	var ds_mip_connector = DatasetFactory.getDataset("ds_mip_connector", null, null, null);
	var SERVER_URL = ds_mip_connector.values[0].SERVER_URL;
	
	return SERVER_URL;
	
}

function verificaTabelaSalarial(CODCOLIGADA, CODFUNCAO, CODSECAO){

	try{
		
		var c1 = DatasetFactory.createConstraint("CODCOLIGADA", CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("CODFUNCAO", CODFUNCAO, CODFUNCAO, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("CODSECAO", CODSECAO, CODSECAO, ConstraintType.MUST);
		var constraints = new Array(c1, c2, c3);		
		var dataset = DatasetFactory.getDataset("ds_RM_retorna_salario", null, constraints, null);
		
		if(dataset.values.length > 0){
	
			if(dataset.values[0].SALARIO == ""){
				
				var msg = "<div style='text-align: left;'";
				msg += "<br><b>Fun\u00e7\u00e3o: </b>" + CODFUNCAO + " - " + $("#funcaoProposto").val();
				msg += "<br><b>Se\u00e7\u00e3o: </b>" + CODSECAO + " - " + $("#nomeSecao").val();		
				msg += "<br><br>A lota\u00e7\u00e3o proposta n\u00e3o foi encontrada na Tabela Salarial. Verifique se a fun\u00e7\u00e3o desejada \u00e9 permitida nesta se\u00e7\u00e3o.";
				msg += "<br><br>Caso seja necess\u00e1rio solicite a inclus\u00e3o da lota\u00e7\u00e3o atrav\u00e9s do Processo WRH09 - Tabela Salarial.";
				msg += "</div>";
				
				FLUIGC.toast({
					title : "",
					message : msg,
					type : "danger"
				});
					
			}
		}
		
	} catch (e) {		
		
		FLUIGC.toast({
			title : '',
			message : 'Erro ao consultar ds_RM_retorna_salario. Entre em contato com o setor de TI.' + e,
			type : 'danger'
		});
		
	}	
	
}