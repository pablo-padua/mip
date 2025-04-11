var underline = "___";
var indice = -1;

function setSelectedZoomItem(selectedItem){
	
	var arraySelectedItem = selectedItem.inputName.split("___");
	if (arraySelectedItem != null && arraySelectedItem != undefined && arraySelectedItem.length > 1) {
		indice = arraySelectedItem[1];
	}
	
	switch (selectedItem.inputName) {

	case "obraSetorOrigem":
		validaAlcadaAprovacao(selectedItem["codColigada"], selectedItem["codCentroCusto"]);
		$("[name=codColigadaOrigem]").val(selectedItem["codColigada"]);
		$("[name=codCCObraSetorOrigem]").val(selectedItem["codCentroCusto"]);
		$("[name=codDPOrigem]").val('Pool:Role:' + selectedItem["codDP"]);
		$("[name=codRHOrigem]").val('Pool:Role:' + selectedItem["codRH"]);
		$("[name=codMedicinaOrigem]").val('Pool:Role:' + selectedItem["codMedicina"]);
		$("[name=codSegurancaOrigem]").val('Pool:Role:' + selectedItem["codSeguranca"]);
		$("[name=codTIOrigem]").val('Pool:Role:' + selectedItem["codTI"]);
		$("[name=codLogisticaOrigem]").val('Pool:Role:' + selectedItem["codLogistica"]);
		$("[name=codAdmOrigem]").val('Pool:Role:' + selectedItem["codAdm"]);
		$("[name=codFinanceiroOrigem]").val('Pool:Role:' + selectedItem["codFinanceiro"]);
		$("[name=tipoOrigem]").val(selectedItem["tipo"]);
			
		/*if(selectedItem["processoTransferencia"] != 'on'){
			window["obraSetorOrigem"].clear();	
			FLUIGC.toast({
				title : '',
				message : "A Obra/Setor selecionada n\u00e3o possui Al\u00e7ada de Aprova\u00e7\u00e3o configurada para este processo. Favor contatar a TI.",
				type : 'danger'
			});			
		}*/
		
		buscaCCSolicitante(selectedItem["codCentroCusto"]);	
		validaColigada();
		
		reloadZoomFilterValues("funcionario", "TIPO," + selectedItem["tipo"] + ",CODCOLIGADA," + selectedItem["codColigada"] + ",CHAPA," + $("[name=chapaSolicitante]").val() + ",CODCCUSTO," + selectedItem["codCentroCusto"]);
				
		break;			
	
				
		case "funcionario":
			if ($("[name=codColigadaOrigem]").val() != ""){
				
				if(verificaDuplicidade($("[name=codColigadaOrigem]").val(), selectedItem["CHAPA"]) == false){
					
					if(selectedItem["FERIASPROG"] > 0 || selectedItem["CODSITUACAO"] == "F"){
						
						var msgFerias = "Não é permitido solicitar transferência de funcionário em férias ou com férias programadas.";
						msgFerias += "<br><br>" + selectedItem["CHAPA"] + " - " + selectedItem["NOME"];
						msgFerias += "<br><br>Em caso de dúvidas, entre em contato com o Setor Pessoal.";
						
						window["funcionario"].clear();
						FLUIGC.toast({title: '', message: msgFerias, type: 'danger'});
						
					} else {
				
						$("[name=chapa]").val(selectedItem["CHAPA"]);
						$("[name=codPessoaSolic]").val(selectedItem["CODPESSOA"]);
						$("[name=nomeFunc]").val(selectedItem["NOME"]);
						$("[name=chapaFuncionario]").val(selectedItem["CHAPA"]);			
						$("[name=funcaoOrigem]").val(selectedItem["FUNCAO"]);
						$("[name=codFuncaoOrigem]").val(selectedItem["CODFUNCAO"]);
						$("[name=codSecaoOrigem]").val(selectedItem["CODSECAO"]);
						$('#subContratoOrigem').val(selectedItem["CODSECAO"].substring(0,10));
						$("[name=gestao]").val(selectedItem["GESTAO"]);
						$("[name=dataAdmissao]").val(converteDataBanco(selectedItem["DATAADMISSAO"]));
						$("[name=salarioOrigem]").val(selectedItem["SALARIO"]);
						$("[name=dataPromocao]").val(selectedItem["DTPROMOCAO"]);
						$("[name=faixaOrigem]").val(selectedItem["FAIXA"]);
						$("[name=nomeFaixaOrigem]").val(selectedItem["NOMEFAIXA"]);
						$("[name=codTabSalarial]").val(selectedItem["CODTABELASALARIAL"]);
						$("[name=matrAprovadorGerenteOrigem]").val(selectedItem["APGERENTE"]);	
						$("[name=matrAprovadorDiretorOrigem]").val(selectedItem["APDIRETOR"]);	
						$("[name=matrAprovadorPresidOrigem]").val(selectedItem["APPRESIDENTE"]);	
						$("[name=cargoFunc]").val(selectedItem["CARGO"]);
						$("[name=secaoOrigem]").val(selectedItem["DESCSECAO"]);
						$("[name=codFilialOrigem]").val(selectedItem["CODFILIAL"]);
						$("[name=filialOrigem]").val(selectedItem["NOMEFILIAL"]);
						
						var codFilialOrigem = $("[name=codFilialOrigem]").val();
						var codFilialDestino = $("[name=codFilialDestino]").val();
						if (selectedItem["CARGO"] == "Diretor" || selectedItem["CARGO"] == "Conselho"){
							$("#avaliacao").hide();
							$("[name=motivoDemissaoRM]").val("");
							$("[name=hiddenSemRestricao]").val("0");
						} else if (codFilialOrigem != codFilialDestino){
							$("#avaliacao").show();
							$("[name=motivoDemissaoRM]").val("2");
							$("[name=hiddenSemRestricao]").val("1");
						} else {
							$("#avaliacao").hide();
							$("[name=motivoDemissaoRM]").val("");
							$("[name=hiddenSemRestricao]").val("0");
						}
						
						retornaPerguntas(selectedItem["CHAPA"]);
						//manipulaRestricoes();
						validaMudancaFuncao();
						preencheCCustoOrigem();
						retornaAbsenteismo();
						variacaoSalarial();
						
						$("[name=hiddenfiltroCentroCustoProp]").val("true");
						
					}
					
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
			
		case "obraSetorDestino":
			$("[name=codColigadaDestino]").val(selectedItem["codColigada"]);
			$("[name=codCCObraSetorDestino]").val(selectedItem["codCentroCusto"]);
			$("[name=codDPDestino]").val('Pool:Role:' + selectedItem["codDP"]);
			$("[name=codRHDestino]").val('Pool:Role:' + selectedItem["codRH"]);
			$("[name=codMedicinaDestino]").val('Pool:Role:' + selectedItem["codMedicina"]);
			$("[name=codSegurancaDestino]").val('Pool:Role:' + selectedItem["codSeguranca"]);
			$("[name=codTIDestino]").val('Pool:Role:' + selectedItem["codTI"]);
			$("[name=codLogisticaDestino]").val('Pool:Role:' + selectedItem["codLogistica"]);
			$("[name=codAdmDestino]").val('Pool:Role:' + selectedItem["codAdm"]);
			$("[name=codFinanceiroDestino]").val('Pool:Role:' + selectedItem["codFinanceiro"]);
			$("[name=tipoDestino]").val(selectedItem["tipo"]);
					
			reloadZoomFilterValues("secaoDestino", 'TIPO,' + selectedItem["tipo"]+ ',CODCOLIGADA,' + selectedItem["codColigada"]+ ',CODCCUSTO,' + selectedItem["codCentroCusto"]);
			reloadZoomFilterValues("motMudancaFuncao", "CODCOLIGADA," + selectedItem["codColigada"]);
			reloadZoomFilterValues("motMudancaSalarial", "CODCOLIGADA," + selectedItem["codColigada"]);
			reloadZoomFilterValues("motMudancaSecao", "CODCOLIGADA," + selectedItem["codColigada"]);
			
			validaColigada();
			
			break;	
			
		case "secaoDestino":	
			$('#codSecaoDestino').val(selectedItem["CODIGO"]);
			$('#subContratoDestino').val(selectedItem["CODIGO"].substring(0,10));
			
			$('#codFilialDestino').val(selectedItem["CODFILIAL"]);
			$('#filialDestino').val(selectedItem["NOMEFILIAL"]);
			var matrAprovadorGerenteDestino = selectedItem["APGERENTE"];
			var matrAprovadorDiretorDestino = selectedItem["APDIRETOR"];
			var matrAprovadorPresidDestino = selectedItem["APPRESIDENTE"];
			if(matrAprovadorGerenteDestino == ''){
				window["secaoDestino"].clear();
				$('#codSecaoDestino').val("");
				FLUIGC.toast({
					title : '',
					message : "N&atilde;o foi localizado o Gerente respons&aacute;vel pela se&ccedil;&atilde;o. Favor solicitar o RH que verifique o cadastro Chefe / Supervisor no RM ",
					type : 'danger'
				});
			}
			if(matrAprovadorDiretorDestino == ''){
				window["secaoDestino"].clear();
				$('#codSecaoDestino').val("");
				FLUIGC.toast({
					title : '',
					message : "N&atilde;o foi localizado o Diretor respons&aacute;vel pela se&ccedil;&atilde;o. Favor solicitar o RH que verifique o cadastro Chefe / Supervisor no RM ",
					type : 'danger'
				});
			}
			if(matrAprovadorPresidDestino == ''){
				window["secaoDestino"].clear();
				$('#codSecaoDestino').val("");
				FLUIGC.toast({
					title : '',
					message : "N&atilde;o foi localizado o Presidente respons&aacute;vel pela se&ccedil;&atilde;o. Favor solicitar o RH que verifique o cadastro Chefe / Supervisor no RM ",
					type : 'danger'
				});
			}
			$("[name=matrAprovadorGerenteDestino]").val(matrAprovadorGerenteDestino);	
			$("[name=matrAprovadorDiretorDestino]").val(matrAprovadorDiretorDestino);	
			$("[name=matrAprovadorPresidDestino]").val(matrAprovadorPresidDestino);	
			reloadZoomFilterValues("funcaoProposto", "CODCOLIGADA," + selectedItem["CODCOLIGADA"]);
			
			validaSecao();			
			validaCargo();
			
			var codFilialOrigem = $("[name=codFilialOrigem]").val();
			var codFilialDestino = $("[name=codFilialDestino]").val();
			if (selectedItem["CARGO"] == "Diretor" || selectedItem["CARGO"] == "Conselho"){
				$("#avaliacao").hide();
				$("[name=motivoDemissaoRM]").val("");
				$("[name=hiddenSemRestricao]").val("0");
			} else if (codFilialOrigem != codFilialDestino){
				$("#avaliacao").show();
				$("[name=motivoDemissaoRM]").val("2");
				$("[name=hiddenSemRestricao]").val("1");
			} else {
				$("#avaliacao").hide();
				$("[name=motivoDemissaoRM]").val("");
				$("[name=hiddenSemRestricao]").val("0");
			}
			
			break;
		
		case "funcaoProposto":
			
			var codColigadaDestino = $("[name=codColigadaDestino]").val();
			var codSecaoDestino = $("[name=codSecaoDestino]").val();
			var codFuncaoProposto = selectedItem["CODIGO"];
			$("[name=codFuncaoProposto]").val(selectedItem["CODIGO"]);
			$("[name=cargoProposto]").val(selectedItem["CARGO"]);
			$("[name=cargoPropostoTipoMO]").val(selectedItem["TIPOMO"]);
			$("[name=funcGestaoDestino]").val(selectedItem["GESTAO"]);
			
			validaMudancaFuncao();			
			verificaSoldador();
			verificaTabelaSalarial(codColigadaDestino, codFuncaoProposto, codSecaoDestino);
			reloadZoomFilterValues("nomeFaixaProposto", "CODCOLIGADA," + codColigadaDestino + ",CODFUNCAO," + codFuncaoProposto + ",CODSECAO," + codSecaoDestino);
			
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
			
			$("#codCentroCustoProp___"+ indice).val(selectedItem["CODCCUSTO"]);
			retornarCodigoDuplicado(selectedItem["CODCCUSTO"], indice);				

			break;
			
		case "motMudancaFuncao":
			
			$("[name=codMotMudancaFuncao]").val(selectedItem["CODMOTFUNCAO"]);
			
			break;
			
		case "motMudancaSalarial":
			
			$("[name=codMotMudancaSalarial]").val(selectedItem["CODMOTSAL"]);
			validaMudancaSalarial(selectedItem["CODMOTSAL"]);
			
			break;
			
		case "motMudancaSecao":
			
			$("[name=codMotMudancaSecao]").val(selectedItem["CODMOTSECAO"]);
			
			break;
		
	}
	
	
}

function removedZoomItem(removedItem) {

	switch (removedItem.inputName) {
		
		case "obraSetorOrigem":
			$("[name=codColigadaOrigem]").val("");
			$("[name=codCCObraSetorOrigem]").val("");		
			$("[name=codDPOrigem]").val("");
			$("[name=codRHOrigem]").val("");
			$("[name=codMedicinaOrigem]").val("");
			$("[name=codSegurancaOrigem]").val("");
			$("[name=codTIOrigem]").val("");
			$("[name=codLogisticaOrigem]").val("");
			$("[name=codAdmOrigem]").val("");
			$("[name=codFinanceiroOrigem]").val("");
			$("[name=tipoOrigem]").val("");
			
			$("[name=chapa]").val("");
			$("[name=nomeFunc]").val("");			
			$("[name=codPessoaSolic]").val("");			
			$("[name=chapaFuncionario]").val("");			
			$("[name=funcaoOrigem]").val("");
			$("[name=codFuncaoOrigem]").val("");
			$("[name=dataAdmissao]").val("");
			$("[name=salarioOrigem]").val("");
			$("[name=faixaOrigem]").val("");
			$("[name=nomeFaixaOrigem]").val("");
			$("[name=codTabSalarial]").val("");
			$("[name=dataPromocao]").val("");
			$("[name=absenteismoMedico]").val("");
			$("[name=absenteismoProdutiv]").val("");
			$("[name=matrAprovadorGerente]").val("");
			$("[name=matrAprovadorDiretor]").val("");	
			$("[name=matrAprovadorPresid]").val("");
			$("[name=variacaoSalario]").val("");
			$("[name=notaProvaTecnica]").val("");
			$("[name=exigeLaudo]").val("");
			$("[name=laudo]").val("");
			$("[name=laudoApto]").val("");
			
			window["obraSetorDestino"].clear();
			$("[name=codColigadaDestino]").val("");
			$("[name=codCCObraSetorDestino]").val("");
			
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
			break;
			
		case "funcionario":
			$("[name=chapa]").val("");
			$("[name=nomeFunc]").val("");			
			$("[name=codPessoaSolic]").val("");			
			$("[name=chapaFuncionario]").val("");			
			$("[name=funcaoOrigem]").val("");
			$("[name=codFuncaoOrigem]").val("");
			$("[name=dataAdmissao]").val("");
			$("[name=salarioOrigem]").val("");
			$("[name=dataPromocao]").val("");
			$("[name=absenteismoMedico]").val("");
			$("[name=absenteismoProdutiv]").val("");
			$("[name=matrAprovadorGerente]").val("");	
			$("[name=matrAprovadorDiretor]").val("");	
			$("[name=matrAprovadorPresid]").val("");			
			$("[name=cargoFunc]").val("");
			$("[name=secaoOrigem]").val("");
			$("[name=codFilialOrigem]").val("");
			$("[name=filialOrigem]").val("");
			
			var inputs_itens = $("#tbRateioOrigem :input");
			for (var i = 0; i < inputs_itens.length; i++) {
				if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("codCentroCustoOrigem___") != -1) {
					fnWdkRemoveChild(inputs_itens[i]);
				}
			}
			
			window["obraSetorDestino"].clear();
			$("[name=codColigadaDestino]").val("");
			$("[name=codCCObraSetorDestino]").val("");
			$("[name=codDPDestino]").val("");
			$("[name=codRHDestino]").val("");
			$("[name=codMedicinaDestino]").val("");
			$("[name=codSegurancaDestino]").val("");
			$("[name=codTIDestino]").val("");
			$("[name=codLogisticaDestino]").val("");
			$("[name=codAdmDestino]").val("");
			$("[name=codFinanceiroDestino]").val("");
			$("[name=tipoDestino]").val("");
			$('#codSecaoDestino').val("");
			$('#codFilialDestino').val("");
			$('#filialDestino').val("");
			window["secaoDestino"].clear();
			$("[name=codFuncaoProposto]").val("");
			$("[name=salarioProposto]").val("");
			window["funcaoProposto"].clear();
			$("[name=variacaoSalario]").val("");
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
				if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("codCentroCustoProp___") != -1) {
					fnWdkRemoveChild(inputs_itens[i]);
				}
			}
			
			$(".tbAvaliacao").hide();
			$("[name^=btDeletePerguntas___]").trigger("click");	
			
			break;
			
		case "obraSetorDestino":		
			$("[name=codColigadaDestino]").val("");
			$("[name=codCCObraSetorDestino]").val("");
			$("[name=codDPDestino]").val("");
			$("[name=codRHDestino]").val("");
			$("[name=codMedicinaDestino]").val("");
			$("[name=codSegurancaDestino]").val("");
			$("[name=codTIDestino]").val("");
			$("[name=codLogisticaDestino]").val("");
			$("[name=codAdmDestino]").val("");
			$("[name=codFinanceiroDestino]").val("");
			$("[name=tipoDestino]").val("");
			$('#codSecaoDestino').val("");
			$('#codFilialDestino').val("");
			$('#filialDestino').val("");
			window["secaoDestino"].clear();
			$("[name=codFuncaoProposto]").val("");
			$("[name=salarioProposto]").val("");
			window["funcaoProposto"].clear();
			$("[name=variacaoSalario]").val("");
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
				if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("codCentroCustoProp___") != -1) {
					fnWdkRemoveChild(inputs_itens[i]);
				}
			}
				
			break;	
			
		case "secaoDestino":	
			$('#codSecaoDestino').val("");
			$('#codFilialDestino').val("");
			$('#filialDestino').val("");
			window["funcaoProposto"].clear();
			$("[name=codFuncaoProposto]").val("");
			$("[name=salarioProposto]").val("");
			$("[name=variacaoSalario]").val("");
			$("[name=codMotMudancaFuncao]").val("");
			$("[name=codMotMudancaSalarial]").val("");
			$("[name=codMotMudancaSecao]").val("");
			
			window["nomeFaixaProposto"].clear();
			$("#codFaixaProposto").val("");
			$("#codTabelaProposto").val("");
			$("#salarioProposto").val("");
			
			var inputs_itens = $("#tbRateioProp :input");
			for (var i = 0; i < inputs_itens.length; i++) {
				if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("codCentroCustoProp___") != -1) {
					fnWdkRemoveChild(inputs_itens[i]);
				}
			}
			break;
			
		case "funcaoProposto":	
			$("[name=codFuncaoProposto]").val("");
			$("[name=salarioProposto]").val("");
			$("[name=variacaoSalario]").val("");
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
				if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("codCentroCustoProp___") != -1) {
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
				if (inputs_itens[i] != null && inputs_itens[i].id.indexOf("codCentroCustoProp___") != -1) {
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
			
		case "motMudancaSecao":	
			$("[name=codMotMudancaSecao]").val("");
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
		message : 'O Centro de Custos ' + valorSelecionado + ' j\u00e1 foi selecionado',
		title : "Aten\u00e7\u00e3o",
		label : 'Ok'
	}, function(el, ev) {
		$('#codCentroCustoProp' + underline + indice).val("");
		window["centroCustoProp" + underline + indice].clear();		
	});
}

function reloadRateio() {
	
	var filtroCusto = getFiltroRateio();
	
	$("[name^=codCentroCustoProp___]").each(function(el) {
		var id = this.id;
		var index = id.split("___")[1];
		
		window["centroCustoProp___" + index].clear();
		reloadZoomFilterValues("centroCustoProp___" + index, "CODCOLIGADA," + $("[name=codColigadaDestino]").val() + ",CODCCUSTO," + $("[name=codCCObraSetorDestino]").val() + ",CODSECAO," + $("[name=codSecaoDestino]").val() + ",FILTROCUSTO," + filtroCusto);

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
				msg += "<br><b>Fun\u00e7\u00e3o: </b>" + CODFUNCAO + " - " + $("[name=funcaoProposto]").val();
				msg += "<br><b>Se\u00e7\u00e3o: </b>" + CODSECAO + " - " + $("[name=secaoDestino]").val();		
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

function validaCargo(){

	if( $("[name=codFilialOrigem]").val() != $("[name=codFilialDestino]").val() ){
		
		cargoFunc = $("[name=cargoFunc]").val();
		
		if(cargoFunc != "Coordenador" &&
		   cargoFunc != "Coordenador Financeiro" &&
		   cargoFunc != "Diretor" &&
		   cargoFunc != "Engenheiro" &&
		   cargoFunc != "Gerente" &&
		   cargoFunc != "Supervisor" &&
		   cargoFunc != "Supervisor Administrativo" &&
		   cargoFunc != "Operador" ){
			
			var usuario = buscarMatriculaUsuarioLogado();
			
			if(isUsuarioGestor(usuario)){
				
				var msg = "Não é permitido realizar transferência entre filiais para a função " + $("[name=funcaoOrigem]").val() + "."
				msg += "<br><br>Mas sendo Gestor do Processo, você pode autorizar a transferência.";
				msg += "<br><br>Deseja continuar?";
				
				FLUIGC.message.alert({
					title : "",
					message : msg,
					label : 'Ok'
				});
				
				
			} else {
				
				var msg = "Não é permitido realizar transferência entre filiais para a função " + $("[name=funcaoOrigem]").val() + "."
				msg += "<br><br>Em caso de dúvidas, entre em contato com o Setor Pessoal na Sede.";
				
				FLUIGC.toast({
					title : "",
					message : msg,
					type : "danger"
				});
				
				window["secaoDestino"].clear();
				$('#codSecaoDestino').val("");
				
			}
		}		
	}
}

function isUsuarioGestor(colleagueId){

	var PapelAprovador = 46; // Papel 46 - WRH - Gestor Processos
	var resultado = false;

	try{
	
		var c1 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", PapelAprovador, PapelAprovador, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId", "1", "1", ConstraintType.MUST);
	
		var constraints = new Array(c1, c2, c3);
		var dataset = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);	
		
		if(dataset.values[0]["workflowColleagueRolePK.roleId"] == PapelAprovador)
			resultado = true;
		
	} catch(e){

	}

	return resultado;
}