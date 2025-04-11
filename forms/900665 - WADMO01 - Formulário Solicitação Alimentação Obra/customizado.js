var underline = "___";

//Variável para ativar mascara dupla na classe telefone
var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
  spOptions = {
    onKeyPress: function(val, e, field, options) {
        field.mask(SPMaskBehavior.apply({}, arguments), options);
      }
  };

setTimeout(function() {
	//if(buscarModoForm() != "VIEW"){
	//}
}, 2000);

$(function() {
	atividadeAtual = buscarAtividadeAtual();
	atividadesAtuais(atividadeAtual);
	aplicarManscaraCampos();
	ativarChangeValidarDt();
	

});

function atividadesAtuais(atividadeAtual) {
	if(buscarModoForm() == "VIEW"){
			$(".botaoAddFuncionario").hide();
			$(".fileCSV").hide();
			$(".buttaoDelete").hide();
			$(".buttaoDeleteTerc").hide();
			
	}

	if (atividadeAtual == INICIO_0 || atividadeAtual == INICIO ) {
		controleExibicaoAtivAll();
		ativarDataVoucher();
		ativarBtnAddFuncionario();
		ativarBtnAddTerceiro();
		validarUsuarioSolicitanteRM();
		ativarchangeValidaCpf();
		ativarChangeDataVoucher();
	
		
	}else if(atividadeAtual == VALIDAR_CONCLUSAO){
		$(".divAprovExecucao").show();
		ativarChangeValidacao();		
		carregaNumeracaoFuncionario();
		carregaNumeracaoTerceiro();
		$(".botaoAddFuncionario").hide();
		$(".botaoAddTerceiro").hide();
		$(".fileCSV").hide();
		$(".fileCSVTerc").hide();
		$(".buttaoDelete").hide();
		$(".buttaoDeleteTerc").hide();
	} else{
		$(".divAprovExecucao").show();
		controleExibicaoAtivAll();		
		carregaNumeracaoFuncionario();
		carregaNumeracaoTerceiro();
		$(".botaoAddFuncionario").hide();
		$(".botaoAddTerceiro").hide();
		$(".fileCSV").hide();
		$(".fileCSVTerc").hide();
		$(".buttaoDelete").hide();
		$(".buttaoDeleteTerc").hide();
	} 	
	enableFields();
}

function controleExibicaoAtivAll() {		
	$(".divDadosSolicitante").show();
	$(".divValoresAlimentacaoFornecedor").show();
	$(".divImportacaoProgramados").show();
	$(".divTabelaFuncionariosProgramados").hide();
	$(".divImportacaoProgramados").hide();
	$(".divTabelaTerceirosProgramados").hide();
	if($( "input[name^='hidden_matriculaFuncionario___']" ).length > 0){
		$(".divTabelaFuncionariosProgramados").show();
		$(".divImportacaoProgramados").show();
	}
	if($( "input[name^='cpfTerceiro___']" ).length > 0){
		$(".divTabelaTerceirosProgramados").show();
	}
}

//MASCARAS DE CAMPOS DE FORMULARIOS
function aplicarManscaraCampos(){
	$('.number').mask('00000000000');
	$('.date').mask('00/00/0000');	
	$('.telefone').mask(SPMaskBehavior, spOptions);
	$('.moeda').maskMoney({
		decimal : ",",
		thousands : "."
	});
	$('.cpf').mask('000.000.000-00');
}


function ativarDataVoucher(){
	var dateCurr = new Date();
	var newDateCurr    = new Date(dateCurr.getTime() - (61 * 24 * 60 * 60 * 1000));
	var dataMinima = ((newDateCurr.getDate() ) + '/' + (newDateCurr.getMonth() + 1) + '/' + (newDateCurr.getFullYear()));
	FLUIGC.calendar('.dtVoucher', {
		pickDate : true,
		pickTime : false,
		language: 'pt-br',
		sideBySide: true,
		minDate : dataMinima
	});		
}

function setZoomData(instance, value){
	setTimeout(function() {
		window[instance].setValue(value);
	}, 1000);
	
}

function excluiTabela(tabela, chave) {
	var tabela = document.getElementById(tabela);
	var itens = tabela.getElementsByTagName("input");
	var ListaExclusao = new Array();
	for (var i = 0; i < itens.length; i++) {
		if (itens[i].id != null && itens[i].id.indexOf(chave + "___") != -1) {
			ListaExclusao.push(itens[i]);
		}
	}
	for (var j = 0; j < ListaExclusao.length; j++) {
		fnWdkRemoveChild(ListaExclusao[j]);
	}
}



function ativarBtnAddFuncionario() {	
	$("[name=botaoAddFuncionario]").click(function() {	
		var hidden_codcfo = $("#hidden_codcfo").val();
		var hidden_CODCCUSTO = $("#hidden_CODCCUSTO").val();
		
		if(hidden_codcfo != '' && hidden_CODCCUSTO != ''){
			$(".divTabelaFuncionariosProgramados").show();
			$(".divImportacaoProgramados").show();
			var index = wdkAddChild('tablenameFuncionarios');
			 $("#hidden_indexFuncionario___"+index).val(index);
			 carregaNumeracaoFuncionario();
			 aplicarManscaraCampos();
			ativarChangeDescontosFunc();
			ativarChangeAcrescimosFunc();
		
		}else {
			FLUIGC.message
			.alert(
					{
						message : "Obrigat&oacute;rio informar a Obra e o Fornecedor para inseriro o Funcion&aacute;rio.",
						title : "Aten\u00e7\u00e3o",
						label : 'Ciente'
					}, function(el, ev) {
			});
		}
	});
}

function ativarBtnAddTerceiro() {	
	$("[name=botaoAddTerceiro]").click(function() {	
		var hidden_codcfo = $("#hidden_codcfo").val();
		var hidden_CODCCUSTO = $("#hidden_CODCCUSTO").val();
		
		if(hidden_codcfo != '' && hidden_CODCCUSTO != ''){
			$(".divTabelaTerceirosProgramados").show();
			var index = wdkAddChild('tablenameTerceiros');
			 $("#hidden_indexTerceiro___"+index).val(index);
			
				
			carregaNumeracaoTerceiro();
			aplicarManscaraCampos();
			ativarChangeDescontosTerc();
			ativarChangeAcrescimosTerc();
			ativarchangeValidaCpf();
			
			 $("#vlrVoucherDescontoTerc___"+index).val('');
			 $("#vlrVoucherAcrescimoTerc___"+index).val('');
		}else {
			FLUIGC.message
			.alert(
					{
						message : "Obrigat&oacute;rio informar a Obra e o Fornecedor para inseriro o Funcion&aacute;rio.",
						title : "Aten\u00e7\u00e3o",
						label : 'Ciente'
					}, function(el, ev) {
			});
		}
	});
}

function formatarData(getdate){
	if(getdate == "" || getdate == null){
		return "";
	}else{
	var ConvDate = new Date(getdate);
	var dd = ConvDate.getDate();
	var mm = ConvDate.getMonth()+1; 
	var yyyy = ConvDate.getFullYear();
	if(dd<10) {
	   dd='0'+dd;
	} 
	if(mm<10) {
	    mm='0'+mm;
	} 
	return dd+'/'+mm+'/'+yyyy;
	}
}

function validarUsuarioSolicitanteRM(){
	
	var codigoUsuario = buscarUsuarioLogado();
	var c1 = DatasetFactory.createConstraint("USERID", codigoUsuario, codigoUsuario, ConstraintType.MUST);
	var fieldAsConstraint = new Array(c1);
	var datasetRM = DatasetFactory.getDataset("ds_ConsultaRM_WS060_RetornaColigadaUsuario", null, fieldAsConstraint, null);

	if (datasetRM.values[0].CODCOLIGADA != "") {
		
		if(datasetRM.values[0].INATIVO == '0'){
			
			var codColigada = datasetRM.values[0].CODCOLIGADA;
			$("#codColigadaSolicitante").val(codColigada);
			var codUsuarioRM = datasetRM.values[0].CODUSUARIO;
			$("#codUsuarioRM").val(codUsuarioRM);
			$("#hidden_codVen").val(datasetRM.values[0].CODVEN);
			$("#nmColigadaSolicitante").val(datasetRM.values[0].NOMEFANTASIA_COLIGADA);
			$("#nmFilialSolicitante").val(datasetRM.values[0].NOMEFANTASIA_FILIAL);
			$("#chapaSolicitanteRM").val(datasetRM.values[0].CHAPA);
			$("#emailSolicitante").val(datasetRM.values[0].EMAIL);
		
			var CODSISTEMA = $("#hidden_CODSISTEMA").val();
			var filtro = "COLIGADA," + codColigada + ",CODCFO,%,CODCCUSTO," + $("#CODCCUSTO_SUBCONTRATO").val();
			setTimeout(function() {
				reloadZoomFilterValues("fornecedor", filtro);
			}, 2000);
			
		}else {
			
			FLUIGC.message.alert({
				message : "Usu\u00e1rio Logado est&aacute; com o cadastro de Vendedor/Comprador inativado no RM, Favor efetuar a abertura de um chamado W01, solicitando desbloqueio",
				title : "Aten\u00e7\u00e3o",
				label : 'Ciente'
				}, function(el, ev) {}
			);
		}

	} else {
		FLUIGC.message.alert({
			message : "Usu\u00e1rio Logado n\u00e3o encontrado no RM, Favor acionar o administrador do sistema",
			title : "Aten\u00e7\u00e3o",
			label : 'Ciente'
			}, function(el, ev) {
		});
	}
}

function setFilterZoom(){
	var COLIGADA = $("#TMOV_CODCOLIGADA").val();
	var CODFILIAL = $("#TMOV_CODFILIAL").val();

	var filtroColigada = 'COLIGADA,' + COLIGADA;
	var filtroColigadaDpto= 'COLIGADA,' + COLIGADA+ ',' + 'FILIAL,' + CODFILIAL+ ',' + 'FILTRO,permanente';
	setTimeout(function() {
		if(buscarModoForm() != "VIEW"){
			reloadZoomFilterValues("filialDestino", filtroColigada);
			reloadZoomFilterValues("departamentoSC", filtroColigadaDpto);
		}
	}, 2000);	

}

function ativarChangeValidarDt() {
	$(".date").change(
			function() {
				var data = this.value;
				if (data != "") {
					var qtdCaracter = this.value.length;
					if (qtdCaracter < 10 || !validaData(data) || qtdCaracter == undefined) {
						FLUIGC
						.toast({
							title : '',
							message : "Data Informada Não é Válida.",
							type : 'danger'
						});
						$("#" + this.id).val("");
					}
			}
	});
}


function validaData(valor) {
	var date = valor;
	var ardt = new Array;
	var ExpReg = new RegExp(
			"(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
	ardt = date.split("/");
	erro = false;
	if (date.search(ExpReg) == -1) {
		erro = true;
	} else if (((ardt[1] == 4) || (ardt[1] == 6) || (ardt[1] == 9) || (ardt[1] == 11))
			&& (ardt[0] > 30))
		erro = true;
	else if (ardt[1] == 2) {
		if ((ardt[0] > 28) && ((ardt[2] % 4) != 0))
			erro = true;
		if ((ardt[0] > 29) && ((ardt[2] % 4) == 0))
			erro = true;
	}
	if (erro) {

		return false;
	}
	return true;
}


function setSelectedZoomItem(selectedItem) {

	var indice = -1;
	var arraySelectedItem = selectedItem.inputId.split(underline);
	var zoomDinamico = false;

	if (arraySelectedItem != null && arraySelectedItem != undefined
			&& arraySelectedItem.length > 1) {
		zoomDinamico = verificaZoomDinamico(arraySelectedItem[1]);
		indice = arraySelectedItem[1];
	}
	if (zoomDinamico == false) {
		switch (selectedItem.inputId) {

		case "txt_projeto":
			
			$("#hidden_CODCCUSTO").val(selectedItem["CODCCUSTO"]);
			$("#hidden_CENTROCUSTO").val(selectedItem["CENTROCUSTO"]);
			$("#txt_obra").val(selectedItem["OBRA"]);
			$("#txt_gestor").val(selectedItem["GESTOR"]);
			$("#txt_chapagestor").val(selectedItem["CHAPAGESTOR"]);
			$("#txt_usercodegestor").val(selectedItem["USER_CODE"]);
			$("#CODCCUSTO_SUBCONTRATO").val(selectedItem["CODCCUSTO_SUBCONTRATO"]);
			$("#codColigadaProjeto").val(selectedItem["EMPRESA"]);
			
			if($("#hidden_codcfo").val() != ''){
				$(".divTabelaFuncionariosProgramados").show();
				$(".divTabelaTerceirosProgramados").show();
				$(".divImportacaoProgramados").show();
			}
			
			var filtro = "COLIGADA," + $("#codColigadaProjeto").val() + ",CODCFO,%,CODCCUSTO," + $("#CODCCUSTO_SUBCONTRATO").val();
			reloadZoomFilterValues("fornecedor", filtro);
		
			break;
			
		case "fornecedor":
			
			$("#hidden_codcfo").val(selectedItem["CODCFO"]);
			$("#hidden_nomefantasia").val(selectedItem["NOMEFANTASIA"]);
			$("#hidden_cgccfo").val(selectedItem["CGCCFO"]);
			$("#valorPreAprovCafe").val(converteFormatMoney(selectedItem["VALORCAFE"]));
			$("#valorPreAprovAlmoco").val(converteFormatMoney(selectedItem["VALORALMOCO"]));
			$("#valorPreAprovAlmocoPequeno").val(converteFormatMoney(selectedItem["VALORALMOCOPEQUENO"]));
			$("#valorPreAprovJantar").val(converteFormatMoney(selectedItem["VALORJANTAR"]));
			$("#valorPreAprovJantarPequeno").val(converteFormatMoney(selectedItem["VALORJANTARPEQUENO"]));
			$("#valorPreAprovAgua").val("0,00");
			$("#emailFornecedor").val(selectedItem["EMAIL"]);
			$("#cidadeFornecedor").val(selectedItem["CIDADE"]);
			
			var filtro = "PARAM_COLIGADA," + $("#codColigadaProjeto").val() + ",PARAM_CODCFO," + selectedItem["CODCFO"] + ",PARAM_CODCCUSTO," + $("#CODCCUSTO_SUBCONTRATO").val();
			reloadZoomFilterValues("contrato", filtro);
			
			break;	
			
		case "contrato":			
			
			$("#hidden_CODIGOCONTRATO").val(selectedItem["CODIGOCONTRATO"]);
			$("#hidden_IDCNT").val(selectedItem["IDCNT"]);
			$("#hidden_CODTCN").val(selectedItem["CODTCN"]);
			//$("#hidden_DATAINICIO").val(converteFormatMoney(selectedItem["DATAINICIO"]));
			//$("#hidden_DATAFIM").val(converteFormatMoney(selectedItem["DATAFIM"]));
			//$("#hidden_DATAADITIVO").val(converteFormatMoney(selectedItem["DATAADITIVO"]));
			
			if(selectedItem["NOMEFANTASIA"] == "FORNECEDOR SEM CONTRATO"){
			
				FLUIGC.toast({
					title : "",
					message : "Opção sem contrato somente para períodos inicio de mobilização ou alteração de fornecedor. Todos os fornecedores de alimentação devem ter contratos assinados com a MIP.",
					type : "warning",
					timeout	: 60000
				});
				
			}else{
				
				var validaPrecos = true;
				
				if( $("#valorPreAprovCafe").val() != converteFormatMoney(selectedItem["VALORCAFE"]) ){
					
					FLUIGC.toast({
						title : "",
						message : "Valor do Café da Manhã no Contrato (" + converteFormatMoney(selectedItem["VALORCAFE"]) + ") está diferente do valor cadastrado no fornecedor (" + $("#valorPreAprovCafe").val() + "). Verifique o cadastro antes de prosseguir",
						type : "danger"
					});
					
					validaPrecos = false;
					
				}

				if( $("#valorPreAprovAlmoco").val() != converteFormatMoney(selectedItem["VALORALMOCO"]) ){
					
					FLUIGC.toast({
						title : "",
						message : "Valor do Almoço no Contrato (" + converteFormatMoney(selectedItem["VALORALMOCO"]) + ") está diferente do valor cadastrado no fornecedor (" + $("#valorPreAprovAlmoco").val() + "). Verifique o cadastro antes de prosseguir",
						type : "danger"
					});
					
					validaPrecos = false;
				}

				if( $("#valorPreAprovAlmocoPequeno").val() != converteFormatMoney(selectedItem["VALORALMOCOPEQUENO"]) ){
					
					FLUIGC.toast({
						title : "",
						message : "Valor do Almoço Pequeno no Contrato (" + converteFormatMoney(selectedItem["VALORALMOCOPEQUENO"]) + ") está diferente do valor cadastrado no fornecedor (" + $("#valorPreAprovAlmocoPequeno").val() + "). Verifique o cadastro antes de prosseguir",
						type : "danger"
					});
					
					validaPrecos = false;
					
				}
				
				if( $("#valorPreAprovJantar").val() != converteFormatMoney(selectedItem["VALORJANTAR"]) ){
					
					FLUIGC.toast({
						title : "",
						message : "Valor do Jantar no Contrato (" + converteFormatMoney(selectedItem["VALORJANTAR"]) + ") está diferente do valor cadastrado no fornecedor (" + $("#valorPreAprovJantar").val() + "). Verifique o cadastro antes de prosseguir",
						type : "danger"
					});
					
					validaPrecos = false;
					
				}
				
				if( $("#valorPreAprovJantarPequeno").val() != converteFormatMoney(selectedItem["VALORJANTARPEQUENO"]) ){
					
					FLUIGC.toast({
						title : "",
						message : "Valor do Jantar Pequeno no Contrato (" + converteFormatMoney(selectedItem["VALORJANTARPEQUENO"]) + ") está diferente do valor cadastrado no fornecedor (" + $("#valorPreAprovJantarPequeno").val() + "). Verifique o cadastro antes de prosseguir",
						type : "danger"
					});
					
					validaPrecos = false;
					
				}
				
				if(validaPrecos == false)
					window["contrato"].clear();
				
			}
			
			if($("#contrato").val() != '' && $("#hidden_CODCCUSTO").val() != '' && $("#dtVoucher").val() != ''){
				$(".divTabelaFuncionariosProgramados").show();
				$(".divImportacaoProgramados").show();
				$(".divTabelaTerceirosProgramados").show();
			}
			
			break;

		}	
	}
	if (zoomDinamico == true) {
		switch (selectedItem.inputId) {
		
		
		case "funcionario___" + indice:
			
			var contadorDuplicidade = 0;
			var CPF_selecionado = selectedItem["CPF"];
			
			$("input[name^='hidden_CPF___']").each(function() {
				var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
				if(CPF_selecionado == $("#hidden_CPF___"+index).val() ){
					contadorDuplicidade++;
				}
			});			
			
			if(contadorDuplicidade > 0){
				FLUIGC.message
				.alert(
						{
							message : " Funcion&aacute;rio selecionado j&aacute; possui planejamento cadastrado.",
							title : "Aten\u00e7\u00e3o",
							label : 'Ciente'
						}, function(el, ev) {
				});
				window["funcionario___"+indice].clear();
			}else{
					
				var c1 = DatasetFactory.createConstraint("FILTRO", CPF_selecionado, CPF_selecionado, ConstraintType.MUST);
				var fieldAsConstraint = new Array(c1);
				var datasetRM = DatasetFactory.getDataset("ds_ConsultaRM_WS117_RetornaFuncionariosCandidatosPorCpf", null, fieldAsConstraint, null);
				var retornoCPF = datasetRM.values[0].CPF;
				var DATADEMISSAO = datasetRM.values[0].DATADEMISSAO;
				var datavoucher = $("#dtVoucher").val();
				var newDATADEMISSAO = '';
				var newDatavoucher = '';
				
				if(datasetRM.values[0].CHAPA == ''){
					
					FLUIGC.message
					.alert(
							{
								message : " Pessoa selecionada não é Funcionário. A alimentação deverá ser realizada como terceiro.",
								title : "Aten\u00e7\u00e3o",
								label : 'Ciente'
							}, function(el, ev) {
					});
					window["funcionario___"+indice].clear();
					
				}else{
				
					if(DATADEMISSAO != ''){
						var datavoucher = $("#dtVoucher").val();
						
						var DATADEMISSAOSplit = DATADEMISSAO.split('/');
						var datavoucherSplit = datavoucher.split('/');
						
						 newDATADEMISSAO = new Date(DATADEMISSAOSplit[2], DATADEMISSAOSplit[1] - 1, DATADEMISSAOSplit[0]);
						 newDatavoucher = new Date(datavoucherSplit[2], datavoucherSplit[1] - 1, datavoucherSplit[0]);
					}	
	
					if((DATADEMISSAO == '') || ( newDATADEMISSAO > newDatavoucher)){
					
				        $("#hidden_FuncCODCCUSTO___"+indice).val(datasetRM.values[0].CODCCUSTO);
						$("#hidden_FuncCODSECAO___"+indice).val(datasetRM.values[0].CODSECAO);
						$("#hidden_FuncCODFUNCAO___"+indice).val(datasetRM.values[0].CODFUNCAO);
						$("#hidden_nomeFuncionario___"+indice).val(datasetRM.values[0].NOME);
						$("#hidden_matriculaFuncionario___"+indice).val(datasetRM.values[0].CHAPA);
						$("#cargoFuncionario___"+indice).val(datasetRM.values[0].NOME_FUNCAO);
						$("#hidden_CPF___"+indice).val(retornoCPF);
						//$("#entregaCafeManha___"+indice).val(datasetRM.values[0].ENTREGA_CAFE_MANHA);
						//$("#entregaAlmoco___"+indice).val(datasetRM.values[0].ENTREGA_ALMOCO);
						$("#localEntrega___"+indice).val(datasetRM.values[0].LOCAL_ENTREGA);
						$("#hidden_DATA_CARTAO_REFEIC___"+indice).val(datasetRM.values[0].DATA_CARTAO_REFEIC);
						$("#vlrVoucherDesconto___"+indice).val('');
						$("#vlrVoucherAcrescimo___"+indice).val('');
						
					recalcularValoresFuncionario();
					validarEntregaCartao();
					}else{
						FLUIGC.message
						.alert(
								{
									message : " Funcion&aacute;rio selecionado foi demitido na Data: "+DATADEMISSAO+", Como a solicitação do Voucher é para Data: "+datavoucher+" a alimentação deverá ser realizada como terceiro.",
									title : "Aten\u00e7\u00e3o",
									label : 'Ciente'
								}, function(el, ev) {
						});
						window["funcionario___"+indice].clear();
					}
				
				}

			}
			
			break;
	
		}
	}
}

function removedZoomItem(removedItem) {
	
	 if (removedItem.inputName == "fornecedor") {
			$("#hidden_codcfo").val("");
			$("#hidden_nomefantasia").val("");
			$("#hidden_cgccfo").val("");
			$("#valorPreAprovCafe").val("");
			$("#valorPreAprovAlmoco").val("");
			$("#valorPreAprovAlmocoPequeno").val("");
			$("#valorPreAprovJantar").val("");
			$("#valorPreAprovJantarPequeno").val("");
			$("#valorPreAprovAgua").val("");
			$("#emailFornecedor").val('');
			$("#cidadeFornecedor").val('');
			if($( "input[name^='hidden_matriculaFuncionario___']" ).length > 0){
				excluiTabela('tablenameFuncionarios', 'hidden_matriculaFuncionario');
			}
			
			if($( "input[name^='cpfTerceiro___']" ).length > 0){
				excluiTabela('tablenameTerceiros', 'cpfTerceiro');
			}			
			
			window["contrato"].clear();
			var filtro = '';			
			reloadZoomFilterValues("contrato", filtro);
			
			$(".divTabelaFuncionariosProgramados").hide();
			$(".divImportacaoProgramados").hide();
			$(".divTabelaTerceirosProgramados").hide();
	 }
	 
	 if (removedItem.inputName == "txt_projeto") {
		 $("#hidden_CODCCUSTO").val("");
			$("#hidden_CENTROCUSTO").val("");
			$("#txt_obra").val("");
			$("#txt_gestor").val("");
			$("#txt_chapagestor").val("");
			$("#txt_usercodegestor").val("");
			
			if($( "input[name^='hidden_matriculaFuncionario___']" ).length > 0){
				excluiTabela('tablenameFuncionarios', 'hidden_matriculaFuncionario');
			}
			if($( "input[name^='cpfTerceiro___']" ).length > 0){
				excluiTabela('tablenameTerceiros', 'cpfTerceiro');
			}
			
			window["fornecedor"].clear();
			window["contrato"].clear();
			$("#valorPreAprovCafe").val("");
			$("#valorPreAprovAlmoco").val("");
			$("#valorPreAprovAlmocoPequeno").val("");
			$("#valorPreAprovJantar").val("");
			$("#valorPreAprovJantarPequeno").val("");
			$("#valorPreAprovAgua").val("");
			
			$(".divTabelaFuncionariosProgramados").hide();
			$(".divImportacaoProgramados").hide();
			$(".divTabelaTerceirosProgramados").hide();
			
	 }
	 
	 if (removedItem.inputName == "contrato") {
			$("#hidden_CODIGOCONTRATO").val('');
			$("#hidden_IDCNT").val('');
			$("#hidden_CODTCN").val('');	
			$("#hidden_DATAINICIO").val('');
			$("#hidden_DATAFIM").val('');
			$("#hidden_DATAADITIVO").val('');

			$(".divTabelaFuncionariosProgramados").hide();
			$(".divTabelaTerceirosProgramados").hide();

	 }
	 
}

function ConvertReal(valorNumero) {
	if (valorNumero == "") {
		return "0";
	}else if(valorNumero == "0,0000" || valorNumero == "0,00" || valorNumero == "0"){
		return "0";
	} else {
		var valorNumeroStr = new String(valorNumero);
		valorNumeroStr = valorNumeroStr.replace(/\./g, "");
		valorNumeroStr = valorNumeroStr.replace(",", ".");
	}
	return valorNumeroStr;
}


function converteFormatMoney(n, c, d, t) {
	if (n == "") {
		return "0,00";
	} else if(n == 0 || n == "0"){
		return "0,00";
	}else if(n == '0.0000'){
		return "0,00";
	}else {
	c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d,
			t = t == undefined ? "." : t, s = n < 0 ? "-" : "",
			i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
			j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "")
			+ i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
			+ (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	}
}


function changeAutorizarCheckbox(elemento){
	if(elemento.checked == true){
		elemento.nextElementSibling.value = 'sim'
	}else{
		elemento.nextElementSibling.value = ''
	}
	recalcularValoresFuncionario();
}

function changeAutorizarCheckboxTerc(elemento){
	if(elemento.checked == true){
		elemento.nextElementSibling.value = 'sim'
	}else{
		elemento.nextElementSibling.value = ''
	}
	recalcularValoresTerceiro();
}

function autorizarCafe(elemento){
	if($('#selectAllCafe').prop('checked')){
		$(".checkboxCafe").prop('checked', true);
		$(".hidden_checkboxCafe").val('sim');
	}else{
		$(".checkboxCafe").prop('checked', false);
		$(".hidden_checkboxCafe").val('');
	}	
	recalcularValoresFuncionario();
}
function autorizarCafeTerc(elemento){
	if($('#selectAllCafeTerc').prop('checked')){
		$(".checkboxCafeTerc").prop('checked', true);
		$(".hidden_checkboxCafeTerc").val('sim');
	}else{
		$(".checkboxCafeTerc").prop('checked', false);
		$(".hidden_checkboxCafeTerc").val('');
	}	
	recalcularValoresTerceiro();
}

function autorizarAlmoco(elemento){
	if($('#selectAllAlmoco').prop('checked')){
		$(".checkboxAlmoco").prop('checked', true);
		$(".hidden_checkboxAlmoco").val('sim');
	}else{
		$(".checkboxAlmoco").prop('checked', false);
		$(".hidden_checkboxAlmoco").val('');
	}	
	recalcularValoresFuncionario();
}

function autorizarAlmocoTerc(elemento){
	if($('#selectAllAlmocoTerc').prop('checked')){
		$(".checkboxAlmocoTerc").prop('checked', true);
		$(".hidden_checkboxAlmocoTerc").val('sim');
	}else{
		$(".checkboxAlmocoTerc").prop('checked', false);
		$(".hidden_checkboxAlmocoTerc").val('');
	}	
	recalcularValoresTerceiro();
}

function autorizarAlmocoPequeno(elemento){
	if($('#selectAllAlmocoPequeno').prop('checked')){
		$(".checkboxAlmocoPequeno").prop('checked', true);
		$(".hidden_checkboxAlmocoPequeno").val('sim');
	}else{
		$(".checkboxAlmocoPequeno").prop('checked', false);
		$(".hidden_checkboxAlmocoPequeno").val('');
	}	
	recalcularValoresFuncionario();
}

function autorizarAlmocoTercPeq(elemento){
	if($('#selectAllAlmocoTercPeq').prop('checked')){
		$(".checkboxAlmocoTercPeq").prop('checked', true);
		$(".hidden_checkboxAlmocoTercPeq").val('sim');
	}else{
		$(".checkboxAlmocoTercPeq").prop('checked', false);
		$(".hidden_checkboxAlmocoTercPeq").val('');
	}	
	recalcularValoresTerceiro();
}

function autorizarJantar(elemento){
	if($('#selectAllJantar').prop('checked')){
		$(".checkboxJantar").prop('checked', true);
		$(".hidden_checkboxJantar").val('sim');
	}else{
		$(".checkboxJantar").prop('checked', false);
		$(".hidden_checkboxJantar").val('');
	}	
	recalcularValoresFuncionario();
}

function autorizarJantarTerc(elemento){
	if($('#selectAllJantarTerc').prop('checked')){
		$(".checkboxJantarTerc").prop('checked', true);
		$(".hidden_checkboxJantarTerc").val('sim');
	}else{
		$(".checkboxJantarTerc").prop('checked', false);
		$(".hidden_checkboxJantarTerc").val('');
	}	
	recalcularValoresTerceiro();
}

function autorizarJantarPequeno(elemento){
	if($('#selectAllJantarPequeno').prop('checked')){
		$(".checkboxJantarPequeno").prop('checked', true);
		$(".hidden_checkboxJantarPequeno").val('sim');
	}else{
		$(".checkboxJantarPequeno").prop('checked', false);
		$(".hidden_checkboxJantarPequeno").val('');
	}	
	recalcularValoresFuncionario();
}

function autorizarJantarTercPeq(elemento){
	if($('#selectAllJantarTercPeq').prop('checked')){
		$(".checkboxJantarTercPeq").prop('checked', true);
		$(".hidden_checkboxJantarTercPeq").val('sim');
	}else{
		$(".checkboxJantarTercPeq").prop('checked', false);
		$(".hidden_checkboxJantarTercPeq").val('');
	}	
	recalcularValoresTerceiro();
}

function autorizarAgua(elemento){
	if($('#selectAllAgua').prop('checked')){
		$(".checkboxAgua").prop('checked', true);
		$(".hidden_checkboxAgua").val('sim');
	}else{
		$(".checkboxAgua").prop('checked', false);
		$(".hidden_checkboxAgua").val('');
	}	
	recalcularValoresFuncionario();
}

function autorizarAguaTerc(elemento){
	if($('#selectAllAguaTerc').prop('checked')){
		$(".checkboxAguaTerc").prop('checked', true);
		$(".hidden_checkboxAguaTerc").val('sim');
	}else{
		$(".checkboxAguaTerc").prop('checked', false);
		$(".hidden_checkboxAguaTerc").val('');
	}	
	recalcularValoresTerceiro();
}

function verificaZoomDinamico(indiceFull) {
	var splitIndiceFull = indiceFull.split("_");
	if (splitIndiceFull.length > 1) {
		return false;
	} else {
		return true;
	}
}

function recalcularValoresTerceiro(){
	var vlrCafeManha = ConvertReal($("#valorPreAprovCafe").val());
	var vlrAlmoco  = ConvertReal($("#valorPreAprovAlmoco").val());
	var vlrAlmocoPequeno  = ConvertReal($("#valorPreAprovAlmocoPequeno").val());
	var vlrJantar  = ConvertReal($("#valorPreAprovJantar").val());
	var vlrJantarPequeno  = ConvertReal($("#valorPreAprovJantarPequeno").val());
	var vlrAgua = ConvertReal($("#valorPreAprovAgua").val());
	var totalFuncionario = 0;
	var newTotalFuncionario = 0;
	
	$("input[name^='hidden_indexTerceiro___']").each(function() {
		var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
		
		if($("#hidden_checkboxCafeTerc___"+index).val() == 'sim'){
			totalFuncionario += parseFloat(vlrCafeManha);
		}
		if($("#hidden_checkboxAlmocoTerc___"+index).val() == 'sim'){
			totalFuncionario += parseFloat(vlrAlmoco);
		}
		if($("#hidden_checkboxAlmocoTercPeq___"+index).val() == 'sim'){
			totalFuncionario += parseFloat(vlrAlmocoPequeno);
		}
		if($("#hidden_checkboxJantarTerc___"+index).val() == 'sim'){
			totalFuncionario += parseFloat(vlrJantar);
		}
		if($("#hidden_checkboxJantarTercPeq___"+index).val() == 'sim'){
			totalFuncionario += parseFloat(vlrJantarPequeno);
		}
		if($("#hidden_checkboxAguaTerc___"+index).val() == 'sim'){
			totalFuncionario += parseFloat(vlrAgua);
		}
		
		valorTotalDesconto = $("[name=vlrVoucherDescontoTerc___"+index+"]").val();
		valorTotalAcrescimo = $("[name=vlrVoucherAcrescimoTerc___"+index+"]").val();
		
		var newValorTotalDesconto = parseFloat(ConvertReal(valorTotalDesconto));
		var newValorTotalAcrescimo = parseFloat(ConvertReal(valorTotalAcrescimo));
		
		if(newValorTotalDesconto > totalFuncionario){
			FLUIGC.message
			.alert(
					{
						message : "Valor do Desconto n\u00e3o pode ser superior ao valor das refei\u00e7\u00f5es .",
						title : "Aten\u00e7\u00e3o",
						label : 'Ciente'
					}, function(el, ev) {
			});
			$("[name=vlrVoucherDesconto___"+index+"]").val('')
		}else{
			newTotalFuncionario = ((totalFuncionario-newValorTotalDesconto) + newValorTotalAcrescimo)
			$("#vlrVoucherTerc___"+index).val(converteFormatMoney(newTotalFuncionario));	
			 totalFuncionario = 0;
		}
	});	
	
	recalcularValoresTotalTerc();
}


function fnCustomDelete(oElement) {
	fnWdkRemoveChild(oElement);
	recalcularValoresFuncionario();
	recalcularValoresTerceiro();
	carregaNumeracaoFuncionario();
	carregaNumeracaoTerceiro();
}

function ativarChangeValidacao(){
	$("#aprovacao").change(function(){
		var aprovacao = $("#aprovacao").val();
		$("#hidden_aprovacao").val(aprovacao);
		
		if(aprovacao == "sim"){			
			$("label[for='justificativaAprov']").removeClass("required");
			
		}else if(aprovacao == "nao"){
			$("label[for='justificativaAprov']").addClass("required");
		}
});
}

function carregaNumeracaoFuncionario(){
	$(".indiceLinhaFunc").empty();
	var contador = 1
	$("input[name^='hidden_matriculaFuncionario___']").each(function() {
		var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
		$("#funcionario___"+index).parent("td").siblings()[0].append(contador);
		contador++;
	});	
}

function carregaNumeracaoTerceiro(){
	$(".indiceLinhaTerc").empty();
	var contador = 1
	$("input[name^='cpfTerceiro___']").each(function() {
		var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
		$("#cpfTerceiro___"+index).parent("td").siblings()[0].append(contador);
		contador++;
	});	
}

function validarEntregaCartao(){
	$("input[name^='hidden_matriculaFuncionario___']").each(function() {
		var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);	
		var hidden_DATA_CARTAO_REFEIC = $("#hidden_DATA_CARTAO_REFEIC___"+index ).val()
		if(!((hidden_DATA_CARTAO_REFEIC == "") || (hidden_DATA_CARTAO_REFEIC =="1900-01-01 00:00:00.0"))){
			this.parentElement.parentElement.classList.add("danger");
		}
	});		
}


function ativarChangeDescontosFunc(){
	$(".somaDescontoFunc").change(function(){
		recalcularValoresFuncionario();	
	});	
}

function ativarChangeAcrescimosFunc(){
	$(".somaAcrescimoFunc").change(function(){
		recalcularValoresFuncionario();
	});
}

function ativarChangeDescontosTerc(){
	$(".somaDescontoTerc").change(function(){
		recalcularValoresTerceiro();	
	});	
}

function ativarChangeAcrescimosTerc(){
	$(".somaAcrescimoTerc").change(function(){
		recalcularValoresTerceiro();
	});	
}

function recalcularValoresFuncionario(){
	var vlrCafeManha = ConvertReal($("#valorPreAprovCafe").val());
	var vlrAlmoco  = ConvertReal($("#valorPreAprovAlmoco").val());
	var vlrAlmocoPequeno  = ConvertReal($("#valorPreAprovAlmocoPequeno").val());
	var vlrJantar  = ConvertReal($("#valorPreAprovJantar").val());
	var vlrJantarPequeno  = ConvertReal($("#valorPreAprovJantarPequeno").val());
	var vlrAgua = ConvertReal($("#valorPreAprovAgua").val());
	var totalFuncionario = 0;
	var newTotalFuncionario = 0;
	
	$("input[name^='hidden_indexFuncionario___']").each(function() {
		var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
		
		if($("#hidden_checkboxCafe___"+index).val() == 'sim'){
			totalFuncionario += parseFloat(vlrCafeManha);
		}
		if($("#hidden_checkboxAlmoco___"+index).val() == 'sim'){
			totalFuncionario += parseFloat(vlrAlmoco);
		}
		if($("#hidden_checkboxAlmocoPequeno___"+index).val() == 'sim'){
			totalFuncionario += parseFloat(vlrAlmocoPequeno);
		}
		if($("#hidden_checkboxJantar___"+index).val() == 'sim'){
			totalFuncionario += parseFloat(vlrJantar);
		}
		if($("#hidden_checkboxJantarPequeno___"+index).val() == 'sim'){
			totalFuncionario += parseFloat(vlrJantarPequeno);
		}
		if($("#hidden_checkboxAgua___"+index).val() == 'sim'){
			totalFuncionario += parseFloat(vlrAgua);
		}
		
		valorTotalDesconto = $("[name=vlrVoucherDesconto___"+index+"]").val();
		valorTotalAcrescimo = $("[name=vlrVoucherAcrescimo___"+index+"]").val();
		
		var newValorTotalDesconto = parseFloat(ConvertReal(valorTotalDesconto));
		var newValorTotalAcrescimo = parseFloat(ConvertReal(valorTotalAcrescimo));
		
		if(newValorTotalDesconto > totalFuncionario){
			FLUIGC.message
			.alert(
					{
						message : "Valor do Desconto n\u00e3o pode ser superior ao valor das refei\u00e7\u00f5es .",
						title : "Aten\u00e7\u00e3o",
						label : 'Ciente'
					}, function(el, ev) {
			});
			$("[name=vlrVoucherDesconto___"+index+"]").val('');
		}else{
			newTotalFuncionario = ((totalFuncionario-newValorTotalDesconto) + newValorTotalAcrescimo)
			$("#vlrVoucher___"+index).val(converteFormatMoney(newTotalFuncionario));	
			 totalFuncionario = 0;
		}
		
		
	});	
	
	recalcularValoresTotalFunc();	
}

function recalcularValoresTotalFunc(){
	var total = 0;
	var totalDesc = 0;
	var totalAcres = 0;

	$("input[name^='vlrVoucher___']").each(function() {
		total += parseFloat(ConvertReal(this.value));
	});
	$("input[name^='vlrVoucherDesconto___']").each(function() {
		totalDesc += parseFloat(ConvertReal(this.value));
	});
	$("input[name^='vlrVoucherAcrescimo___']").each(function() {
		totalAcres += parseFloat(ConvertReal(this.value));
	});
	
	
	var valorTotalSoma = converteFormatMoney(total);
	$("[name=valorTotalSoma]").val(valorTotalSoma);
	
	var valorTotalSomaDesc = converteFormatMoney(totalDesc);
	$("[name=valorTotaldescFunc]").val(valorTotalSomaDesc);
	
	var valorTotalAcresc = converteFormatMoney(totalAcres);
	$("[name=valorTotalAcrescFunc]").val(valorTotalAcresc);
	
	somarValorTotalSolicitacao();
}

function recalcularValoresTotalTerc(){
	var total = 0;
	var totalDesc = 0;
	var totalAcres = 0;

	$("input[name^='vlrVoucherTerc___']").each(function() {
		total += parseFloat(ConvertReal(this.value));
	});
	$("input[name^='vlrVoucherDescontoTerc___']").each(function() {
		totalDesc += parseFloat(ConvertReal(this.value));
	});
	$("input[name^='vlrVoucherAcrescimoTerc___']").each(function() {
		totalAcres += parseFloat(ConvertReal(this.value));
	});
	
	
	var valorTotalSoma = converteFormatMoney(total);
	$("[name=valorTotalSomaTerc]").val(valorTotalSoma);
	
	var valorTotalSomaDesc = converteFormatMoney(totalDesc);
	$("[name=valorTotaldescTerc]").val(valorTotalSomaDesc);
	
	var valorTotalAcresc = converteFormatMoney(totalAcres);
	$("[name=valorTotalAcrescTerc]").val(valorTotalAcresc);
	
	somarValorTotalSolicitacao();
}

function somarValorTotalSolicitacao(){
	var valorTotalSoma = $("[name=valorTotalSoma]").val();
	var vlrVoucherDesconto = $("[name=valorTotaldescFunc]").val();
	var vlrVoucherAcrescimo = $("[name=valorTotalAcrescFunc]").val();
	
	var valorTotalSomaTerc =  $("[name=valorTotalSomaTerc]").val();
	var vlrVoucherDescontoTerc =  $("[name=valorTotaldescTerc]").val();
	var vlrVoucherAcrescimoTerc =  $("[name=valorTotalAcrescTerc]").val();
	

	var valorTotalDesconto = (parseFloat(ConvertReal(vlrVoucherDesconto)) + parseFloat(ConvertReal(vlrVoucherDescontoTerc)));
	valorTotalDesconto = converteFormatMoney(valorTotalDesconto);
	$("[name=valorTotalDesconto]").val(valorTotalDesconto);
	
	var valorTotalAcrescimo = (parseFloat(ConvertReal(vlrVoucherAcrescimo)) + parseFloat(ConvertReal(vlrVoucherAcrescimoTerc)));
	valorTotalAcrescimo = converteFormatMoney(valorTotalAcrescimo);
	$("[name=valorTotalAcrescimo]").val(valorTotalAcrescimo);
	
	var valorTotalSolicitacao = (parseFloat(ConvertReal(valorTotalSoma)) + parseFloat(ConvertReal(valorTotalSomaTerc)));
	valorTotalSolicitacao = converteFormatMoney(valorTotalSolicitacao);
	$("[name=valorTotalSolicitacao]").val(valorTotalSolicitacao);
}

function ativarchangeValidaCpf(){
	$('.cpf').change(function() {
	
		var cpfDigitado = $(this).val();
		 var cpfFormatado = cpfDigitado.replace(/[^0-9]/g, '').toString();
		
		 if(validacaoCPF(cpfFormatado)){
			var splitlemento = this.id.split('___');
			 if(splitlemento[0] == "cpfTerceiro"){
				 var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
				 
 				 $("#hidden_CPF_TERC___"+index).val(cpfFormatado);
				 if(validarDuplicidadeCPF_Terc(cpfFormatado) == false){
					 $("#hidden_CPF_TERC___"+index).val('');
					 $("#cpfTerceiro___"+index).val('');
				 }
				
			 }
			 
		 }else{
			 $(this).val("");
			 FLUIGC.message
	 			.alert({
	 						message : "Favor corrigir O CPF Informado: "+cpfDigitado,
	 						title : "Aten\u00e7\u00e3o",
	 						label : 'Ciente'
	 					}, function(el, ev) {
	 					}); 
		 }
	});
}

function validacaoCPF(strCPF){
	if( strCPF.length == 11 ){
    	var Soma;
    	var Resto;
    	Soma = 0;
    	  if (strCPF == "00000000000") {
    		  return false;
    	  }
    	     
    	  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    	  Resto = (Soma * 10) % 11;
    	    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    	    if (Resto != parseInt(strCPF.substring(9, 10)) ) {
    	    	return false;
    	    }
    	  Soma = 0;
    	    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    	    Resto = (Soma * 10) % 11;
    	   
    	    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    	    if (Resto != parseInt(strCPF.substring(10, 11) ) ) {
    	    	return false;
    	    }
    	
    	    return true;     
    }else{ 
    	return false;
    }      
}

function validarExistenciaTerc (colaboradores, colaborador) {

    if (colaboradores.toString().indexOf(colaborador) === -1) {
        return true;
    } else if (colaboradores.indexOf(colaborador) > -1) {
        return false;
    }
}


function validarDuplicidadeCPF_Terc(CPF){
	var contadorDuplicidadeTerc = 0;
	
	$("input[name^='cpfTerceiro___']").each(function() {
		var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
		if(CPF == $("#hidden_CPF_TERC___"+index).val() ){
			contadorDuplicidadeTerc++;
		}
	});	
	
	if(contadorDuplicidadeTerc > 1){
		FLUIGC.message
		.alert(
				{
					message : " Colaborador informado j&aacute; possui planejamento cadastrado.",
					title : "Aten\u00e7\u00e3o",
					label : 'Ciente'
				}, function(el, ev) {
		});
		
		return false;
	}else{
		//BUSCAR VALORES DO OPTION DOSELECT
	    var constraints = new Array();
	    constraints.push(DatasetFactory.createConstraint("FILTRO",CPF, CPF, ConstraintType.MUST));
	    var params = getDatasetParam('ds_RM_QUERY_SELECT_ValidarCpfBaseRm', null, constraints, null);
		
	 	$.ajax({
			url: '/api/public/ecm/dataset/datasets',
			data:  JSON.stringify(params),
			dataType: 'json',
			type: "POST",
			contentType: 'application/json',
			async: false,
			success:function(result, status, xhr){
	
				if (result.content.values.length > 0 && result.content.values[0].DATADEMISSAO2 == '' && result.content.values[0].CHAPA != "") {
					FLUIGC.message
					.alert(
							{
								message : "CPF: "+CPF+" - Localizado Como Funcionário. deverá ser lançado na tabela de Funcionários",
								title : "Aten\u00e7\u00e3o",
								label : 'OK'
							}, function(el, ev) {
					});
					return false;
				}
			},
			error: function(xhr, status, error){
				console.log(error);	
			}
			
		});
	 	
	 	return true;
	}
		
}

function ativarChangeDataVoucher(){
	$('.dtVoucher').change(function() {
		if($("#contrato").val() != '' && $("#hidden_CODCCUSTO").val() != '' && $("#dtVoucher").val() != ''){
			$(".divTabelaFuncionariosProgramados").show();
			$(".divImportacaoProgramados").show();
			$(".divTabelaTerceirosProgramados").show();
		}
	});
}
