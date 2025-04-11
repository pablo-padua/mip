var underline = "___";
var atividadeAtual = "";
var myTableItem = '';
var ModalItem = null;
var filterUnid = null;
var qtdItemEditIni = '';
var versaoInicial = '';
setTimeout(function() {
	if(buscarModoForm() != "VIEW"){
	
	}
}, 2000);

$(function() {
	
	 filterUnid = null;
	
	atividadeAtual = buscarAtividadeAtual();
	atividadesAtuais(atividadeAtual);
	aplicarManscaraCampos();
	ativarChangeValidarDt();
	criarLinkDocDefault();
	$("#hidden_TempRevMaisItem").val($("input[name^='indicePaiFilhoItem___']").length);
	carregarQtdItemEditIni();
	 var numeroRevSC = parseInt($("#numeroRevSC").val());
	    versaoInicial = numeroRevSC;
});

function atividadesAtuais(atividadeAtual) {
	if(FORM_MOBILE !== "true"){
		verificarQtdRevTHead();
		carregarTabelaDatatable();
	}
	
	if(buscarModoForm() == "VIEW"){
			$(".botaoAddItemManual").hide();
			$(".botaoAddItemImportacao").hide();
			$(".divHabilitarRevisao").hide();
	}
	if($("#nm_arquivo").val() != ''){
		$(".divExibDocImportado").show();
	}
	
	if (atividadeAtual == INICIO_0 || atividadeAtual == INICIO ) {
		controleExibicaoAtivINICIO();
		ativarBtnItensManual('AddItem');
		//$("#divTableItem").show();
		validarUsuarioSolicitanteRM();
		setTimeout(function() {
			$("#centroCustoSolicitacao").prop('disabled', true);
		}, 1000);
		
		
		
	}else if(atividadeAtual == AJUSTA_SOLICITACAO){
		controleExibicaoAtivAJUSTA_SOLICITACAO();
		$(".botaoAddItemManual").show();
		ativarBtnItensManual('AddItem');
		
	}else if(atividadeAtual == APROVACAO_COORD_PLAN){
		controleExibicaoAtivAPROVACAO_COORD_PLAN();
		ativarChangeAprovCoordPlan();
		
		$("#optionList").hide();
		$("#optionList").remove();
		

	}else if(atividadeAtual == APROVACAO_GERENTE){
		controleExibicaoAtivAPROVACAO_GERENTE();
		ativarChangeAprovGerencia();
		validarUsuarioAprovadorRM();
		$("#optionList").hide();
		$("#optionList").remove();
		
		
		
	}else if(atividadeAtual == INFORMAR_RESP_VINCULACAO){
		controleExibicaoAtivINFORMAR_RESP_VINCULACAO();
		ativarBtnFiltrarUsuario();
		ativarChangeDevolAjustes();
		setFilterZoom();
		
		setTimeout(function() {
			window["respCodificacao"].clear();
		}, 2000);
				
	}else if(atividadeAtual == ACOMPANHAR_SOLICITACAO_REVISAO){
		controleExibicaoAtivACOMPANHAR_SOLICITACAO_REVISAO();
		if($("#tipoAprovGerenteRev").val() == 'ajustar' || $("#tipoAprovCoordPlanRev").val() == 'ajustar'){
			$(".divHabilitarRevisao").hide();
			AtivarAjusteRevisao();
		}else{
			if(buscarModoForm() != "VIEW"){
				$(".divHabilitarRevisao").show();
				ativarBtnHabilitarRevisao();
		}
			
		}
		
		$("#obsAberturaContrato").prop('disabled', true);
	
		
	}else if(atividadeAtual == APROVACAO_COORD_PLAN_REV){
		controleExibicaoAtivAPROVACAO_COORD_PLAN_REV();
		
		$("#optionList").hide();
		$("#optionList").remove();
		
	}else if(atividadeAtual == APROVACAO_GERENTE_REV){
		controleExibicaoAtivAPROVACAO_GERENTE_REV();
		validarUsuarioAprovadorRM();
		$("#optionList").hide();
		$("#optionList").remove();
		
	}else if(atividadeAtual == SUPORTE_TI || atividadeAtual == SUPORTE_TI_RM){
		controleExibicaoAtivSUPORTE_TI();
	
		
	}else{
		controleExibicaoAtivAll();
	
	} 	
	
	enableFields();
}

function controleExibicaoAtivINICIO() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGerente").hide();
	//$(".divValidarInfo").hide();
	$(".divAprovacaoCoordPlanejamento").hide();
	
	$(".divAprovacaoCoordPlanejamentoRev").hide();
	$(".divAprovacaoGerenteRev").hide();
	
	$(".divTpMov05").hide();
	$(".complem2").hide();	
	$(".divGerarNovaRev").hide();	
	
	$(".botaoAddItemManual").show();
	$(".botaoAddItemImportacao").show();
	$(".divExibDocImportado").show();
	
}

function controleExibicaoAtivAJUSTA_SOLICITACAO() {		
	$(".divDadosSolicitante").show();	
	$(".divTpMov05").hide();
	$(".botaoAddItemImportacao").hide();
	$(".divGerarNovaRev").hide();
	$(".divAprovacaoCoordPlanejamentoRev").hide();
	$(".divAprovacaoGerenteRev").hide();
	
	//if($("[name=hidden_enviarParaAjustes]").val() == 'ajustar'){
		//$(".divValidarInfo").show();
	//}else{
		//$(".divValidarInfo").hide();
	//}
	
	
	if($("[name=hidden_tipoAprovCoordPlan]").val() == 'ajustar'){
		$(".divAprovacaoCoordPlanejamento").show();
	}else{
	    $(".divAprovacaoCoordPlanejamento").hide();
	}
	if($("[name=hidden_tipoAprovGerente]").val() == 'ajustar'){
		$(".divAprovacaoGerente").show();
	}else{
		$(".divAprovacaoGerente").hide();
	}
	
	if($("[name=itensImportadosExel]").val() == 'sim'){
		$(".divExibDocImportado").show();
	}
	
}

function controleExibicaoAtivACOMPANHAR_SOLICITACAO_REVISAO() {		
	$(".divDadosSolicitante").show();	
	$(".divAprovacaoGerente").hide();
	$(".divTpMov05").show();
	//$(".divValidarInfo").hide();
	$(".divGerarRev").hide();
	$(".divAprovacaoCoordPlanejamentoRev").hide();
	$(".divAprovacaoCoordPlanejamento").hide();
	$(".divAprovacaoGerenteRev").hide();
	$(".divAprovacaoGerenteRev").hide();
	$(".complem2").show();
	if(buscarModoForm() != "VIEW"){
		$(".divHabilitarRevisao").show();
	}
	if($("[name=itensImportadosExel]").val() == 'sim'){
		$(".divExibDocImportado").show();
	}
	

	
	if($("[name=tipoAprovCoordPlanRev]").val() == 'ajustar'){
		$(".divAtivAprovRevCoordPlan").show();
	}else{
	    $(".divAtivAprovRevCoordPlan").hide();
	}
	
	if($("[name=tipoAprovGerenteRev]").val() == 'ajustar'){
		$(".divAprovacaoGerenteRev").show();
		$(".divAtivAprovRevCoordPlan").show();
	}else{
		$(".divAprovacaoGerenteRev").hide();
	}
	

	var contadorRev = 0;
	if($("[name=tipoAprovGerenteRev]").val() == '' && $("[name=tipoAprovGerenteRev]").val() == ''){
		$("input[name^='indicePaiFilhoItemRev___']").each(function() {	
			var indiceRev = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
			if(($("#revisaoAprovadaCoordPlan"+indiceRev).val() == 'aprovado') && ($("#revisaoAprovadaGerente"+indiceRev).val() == 'aprovado')){
				contadorRev++;
			}
		});
		
		if(contadorRev > 0 ){
			$(".divTableAprovRev").show();
			montarTabelaAprovRevisoes();
		}
	}

}

function controleExibicaoAtivINFORMAR_RESP_VINCULACAO() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGerente").hide();
	//$(".divValidarInfo").show();
	$(".divAprovacaoCoordPlanejamento").hide();
	$(".divTpMov05").show();
	
	$(".divGerarNovaRev").hide();
	$(".divAprovacaoCoordPlanejamentoRev").hide();
	$(".divAprovacaoGerenteRev").hide();

	$("label[for='filialDestino']").addClass("required");	
	$("label[for='localDestino']").addClass("required");	
	
	if(buscarModoForm() != "VIEW"){
		$(".linhaFiltroCodificacao").show();
	}
	
	if($("[name=itensImportadosExel]").val() == 'sim'){
		$(".divExibDocImportado").show();
	}
}

function controleExibicaoAtivAPROVACAO_COORD_PLAN_REV(){
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGerente").hide();
	//$(".divValidarInfo").hide();
	$(".divAprovacaoCoordPlanejamento").hide();
	$(".divAprovacaoCoordPlanejamentoRev").show();
	$(".divAprovacaoGerenteRev").hide();
	
	$(".div_dados_solicitacao").hide();
	$(".divTpMov05").hide();

	$(".btnEdicao").hide();
	$(".divGerarNovaRev").hide();
	
	$(".botaoAddItemManual").hide();
	$(".complem2").show();
	if($("[name=itensImportadosExel]").val() == 'sim'){
		$(".divExibDocImportado").show();
	}
}

function controleExibicaoAtivAPROVACAO_GERENTE_REV(){
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGerente").hide();
	//$(".divValidarInfo").hide();
	$(".divAprovacaoCoordPlanejamento").hide();
	$(".divAprovacaoCoordPlanejamentoRev").hide();
	$(".divAprovacaoGerenteRev").show();
	
	$(".div_dados_solicitacao").hide();
	$(".divTpMov05").hide();
	$(".complem2").show();
	$(".btnEdicao").hide();
	$(".divGerarNovaRev").hide();
	
	$(".botaoAddItemManual").hide();
	
	if($("[name=itensImportadosExel]").val() == 'sim'){
		$(".divExibDocImportado").show();
	}
}

function controleExibicaoAtivAPROVACAO_COORD_PLAN() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGerente").hide();
	//$(".divValidarInfo").hide();
	$(".divAprovacaoCoordPlanejamento").show();
	$(".divAprovacaoCoordPlanejamentoRev").hide();
	$(".divAprovacaoGerenteRev").hide();
	
	$(".div_dados_solicitacao").hide();
	$(".divTpMov05").hide();
	$(".complem2").hide();
	$(".btnEdicao").hide();
	$(".divGerarNovaRev").hide();
	
	if($("[name=itensImportadosExel]").val() == 'sim'){
		$(".divExibDocImportado").show();
	}
} 

function controleExibicaoAtivAPROVACAO_GERENTE() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGerente").show();
	//$(".divValidarInfo").hide();
	$(".divAprovacaoCoordPlanejamento").hide();
	$(".div_dados_solicitacao").hide();
	$(".divTpMov05").hide();
	$(".complem2").hide();
	$(".btnEdicao").hide();
	$(".divGerarNovaRev").hide();
	$(".divAprovacaoCoordPlanejamentoRev").hide();
	$(".divAprovacaoGerenteRev").hide();
	
	if($("[name=itensImportadosExel]").val() == 'sim'){
		$(".divExibDocImportado").show();
	}
} 

function controleExibicaoAtivSUPORTE_TI() {		


	$(".divDadosSolicitante").show();	
	$(".divAprovacaoGerente").show();
	$(".divTpMov05").show();
	//$(".divValidarInfo").show();
	$(".divAprovacaoCoordPlanejamento").show();
	$(".divGerarRev").show();
	$(".divAprovacaoCoordPlanejamentoRev").show();
	$(".divAprovacaoGerenteRev").show();
	
	
	
	if($("[name=itensImportadosExel]").val() == 'sim'){
		$(".divExibDocImportado").show();
	}
	
}

function controleExibicaoAtivAll() {		
	$(".divDadosSolicitante").show();
	$(".divAprovacaoGerente").show();
	//$(".divValidarInfo").show();
	$(".divAprovacaoCoordPlanejamento").show();
	$(".divGerarNovaRev").hide();
	$(".divAprovacaoCoordPlanejamentoRev").show();
	$(".divAprovacaoGerenteRev").show();
	$(".complem2").show();
	
	if($("[name=itensImportadosExel]").val() == 'sim'){
		$(".divExibDocImportado").show();
	}
}

//MASCARAS DE CAMPOS DE FORMULARIOS
function aplicarManscaraCampos(){
	$('.number').mask('00000000000');
	$('.date').mask('00/00/0000');	
	
	$('.moeda').maskMoney({
		decimal : ",",
		thousands : ""
	});
}


function ativarDataModal(){
	var dateCurr = new Date();
	var dataMinima = ((dateCurr.getDate()) + '/' + (dateCurr.getMonth() + 1) + '/' + (dateCurr.getFullYear()));
	FLUIGC.calendar('.M_dtNecessidadeMatOrigem', {
		pickDate : true,
		pickTime : false,
		language: 'pt-br',
		sideBySide: true,
		minDate : dataMinima
	});	
	
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

		case "nmFantColSolicitacao":
			var CODCOLIGADA = selectedItem["CODCOLIGADA"];
			$("#TMOV_CODCOLIGADA").val(CODCOLIGADA);
			$("#codColSolicitacao").val(CODCOLIGADA);
			$("#centroCustoSolicitacao").prop('disabled', false);
			var CODUSUARIO = $("#codUsuarioRM").val();
			var CODSISTEMA = $("#hidden_CODSISTEMA").val();
			if(CODCOLIGADA == '1'){
				setZoomData('nmFantFilialSolicitacao','1 - Sede');
				$("#TMOV_CODFILIAL").val('1');
				$("#codFilialSolicitacao").val('1');
				$("#nmFantFilialSolicitacao").prop('disabled', true);
				
			}else{
				var filtroColigadaFilial = 'COLIGADA,' + CODCOLIGADA+ ',' + 'CODUSUARIO,' + CODUSUARIO+ ',' + 'CODSISTEMA,' + CODSISTEMA;
				reloadZoomFilterValues("nmFantFilialSolicitacao", filtroColigadaFilial);
				$("#nmFantFilialSolicitacao").prop('disabled', false);
			}
			
			var CHAPA = $("#chapaSolicitanteRM").val();
			//var filtroColigadaChapa = 'CODCOLIGADA,' + CODCOLIGADA+ ',' + 'CHAPA,' + CHAPA;
			//reloadZoomFilterValues("centroCustoSolicitacao", filtroColigadaChapa);
			setFilterZoom();
			
			break;
			
		case "nmFantFilialSolicitacao":
			var CODFILIAL = selectedItem["CODFILIAL"];
			$("#TMOV_CODFILIAL").val(CODFILIAL);
			$("#codFilialSolicitacao").val(CODFILIAL);

			break;
			
			
		case "tiporequisicao":
			$("#MOV_TTB5_CODTB5FAT").val(selectedItem["CODIGO"]);
			break;
			
		case "centroCustoSolicitacao":
			var COLIGADA = $('#TMOV_CODCOLIGADA').val();
			var CODCCUSTO_COMPLETO = selectedItem["CODCCUSTO_COMPLETO"];
			var CODCCUSTO_SUBCONTRATO = selectedItem["CODCCUSTO_SUBCONTRATO"];
			var CHAPA = $("#chapaSolicitanteRM").val();


			constraintsCCusto = new Array();
			constraintsCCusto.push(DatasetFactory.createConstraint("CODCOLIGADA", COLIGADA, COLIGADA, ConstraintType.MUST));
			constraintsCCusto.push(DatasetFactory.createConstraint("CHAPA", CHAPA, CHAPA, ConstraintType.MUST));
			constraintsCCusto.push(DatasetFactory.createConstraint("CODCCUSTO_COMPLETO", CODCCUSTO_SUBCONTRATO, CODCCUSTO_SUBCONTRATO, ConstraintType.MUST));
			
		
			var datasetCCusto = DatasetFactory.getDataset("ds_ConsultaRM_WS111_RetornaCentroDeCustoPermitidosParaUsuario",null, constraintsCCusto, null);
			var CODCCUSTO = datasetCCusto.values[0].CODCCUSTO;
			
			if (CODCCUSTO != '') {
				if(selectedItem["EMPRESA"] == $('#TMOV_CODCOLIGADA').val()){
					$("#MOV_GCCUSTO_CODCCUSTO").val(CODCCUSTO_COMPLETO);	
					$("#MOV_GCCUSTO_CODREDUZIDO").val(selectedItem["CODCCUSTO"]);
					$("#MOV_GCCUSTO_COD_RESPONSAVEL").val(selectedItem["USER_CODE"]);
					$("#MOV_GCCUSTO_NOME_RESPONSAVEL").val(selectedItem["GESTOR"]);
					$("#MOV_GCCUSTO_ID_GCCUSTO").val(selectedItem["CENTROCUSTO"]);
					$("#NUM_FIXO_OBRA").val(selectedItem["QUEBRA_SECAO"]);
					$("#codObra").val(selectedItem["OBRA"]);
				}else {
					window["centroCustoSolicitacao"].clear();
					FLUIGC.message
					.alert(
							{
								message : "Favor verificar. Campo Coligada do movimento diferente da coligada da obra...",
								title : "Aten\u00e7\u00e3o",
								label : 'Ciente'
							}, function(el, ev) {
					});
				}
				
		
				
			}else {
				window["centroCustoSolicitacao"].clear();
				FLUIGC.message
				.alert(
						{
							message : "Favor verificar permissão no centro de custo para a Obra selecionada...",
							title : "Aten\u00e7\u00e3o",
							label : 'Ciente'
						}, function(el, ev) {
				});
			}

			break;
			
		case "localEstoque":
			$("#TMOV_CODLOC").val(selectedItem["CODLOC"]);
			break;	
			
		case "respCodificacao":
			$("#hidden_respCodificacao").val(selectedItem["colleagueId"]);
			$("#hidden_respCodificName").val(selectedItem["colleagueName"]);
			break;	
			
		case "filialDestino":
	
			var FILIAL = selectedItem["CODFILIAL"];
			$("#TMOV_CODFILIALDESTINO").val(FILIAL);
			var COLIGADA = $("#TMOV_CODCOLIGADA").val();
			var TIPOMOV = $("#hidden_tipoMovimento").val();
			var filtroColigadaFilial = 'COLIGADA,' + COLIGADA+ ',' + 'FILIAL,' + FILIAL+ ',' + 'TIPOMOV,' + TIPOMOV;
			reloadZoomFilterValues("localDestino", filtroColigadaFilial);
		
			break;	
			
		case "localDestino":
			$("#TMOV_CODLOCDESTINO").val(selectedItem["CODLOC"]);
			break;
				
		case "departamentoSC":
			$("#hidden_CODDEPARTAMENTO").val(selectedItem["CODDEPARTAMENTO"]);			
			break;
		}	
	}

}

function removedZoomItem(removedItem) {
	 if (removedItem.inputName == "localDestino") {
			$("#TMOV_CODLOCDESTINO").val("");
	
			var COLIGADA = $("#TMOV_CODCOLIGADA").val();
			var FILIAL = $("#TMOV_CODFILIALDESTINO").val();
			var TIPOMOV = $("#hidden_tipoMovimento").val();
			var filtroColigadaFilial = 'COLIGADA,' + COLIGADA+ ',' + 'FILIAL,' + FILIAL+ ',' + 'TIPOMOV,' + TIPOMOV;
			reloadZoomFilterValues("localDestino", filtroColigadaFilial);
		 
		}
	 
	 if (removedItem.inputName == "nmFantColSolicitacao") {
			$("#TMOV_CODCOLIGADA").val("");
			$("#TMOV_CODFILIAL").val("");
			window["nmFantFilialSolicitacao"].clear();
			$("#nmFantFilialSolicitacao").prop('disabled', false);
		}
	 
	 if (removedItem.inputName == "nmFantFilialSolicitacao") {
			$("#TMOV_CODFILIAL").val("");

			var COLIGADA = $("#TMOV_CODCOLIGADA").val();
			var CODUSUARIO = $("#codUsuarioRM").val();
			var CODSISTEMA = $("#hidden_CODSISTEMA").val();
			var filtroColigadaFilial = 'COLIGADA,' + COLIGADA+ ',' + 'CODUSUARIO,' + CODUSUARIO+ ',' + 'CODSISTEMA,' + CODSISTEMA;
			reloadZoomFilterValues("nmFantFilialSolicitacao", filtroColigadaFilial);	
		}
	 
	 if (removedItem.inputName == "filialDestino") {
			$("#TMOV_CODLOCDESTINO").val("");
			window["localDestino"].clear();
		}
}

function limparDadosTbItens(){
	excluiTabela('tableItens', 'indicePaiFilhoItem');

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


function carregarTabelaDatatable(){
	var atividadeAtual = buscarAtividadeAtual();
	var htmlDadosTabela = '';
	var htmlRevQtdItem = '';
	var htmlOptionsSelect = '';
	var urlFluig = parent.WCMAPI.serverURL;
	var contadorCodPetrobras = 0;
	var contadorCodProjetista = 0;
	var htmlOptionsSelect = '';
	
	
	 //BUSCAR VALORES DO OPTION DO SELECT
	//PEGANDO MATRICULA DOS USUARIO DO PAPAEL 412 - Responsáveis De/Para processo WSUP01 
	var c1 = DatasetFactory.createConstraint('roleId1', '412', '412', ConstraintType.MUST);
	var constraints = new Array(c1);
	var datasetRole = DatasetFactory.getDataset("ds_ConsultaFLUIG_UsuariosAtivosPorPapel_WSUP01", null, constraints, null);		
		for(var i=0; i< datasetRole.values.length; i++){
			var matrUser = datasetRole.values[i]['workflowColleagueRolePK.colleagueId'];
			var NomeUser = datasetRole.values[i].colleagueName;
			
			htmlOptionsSelect += '<option value="'+matrUser+'">'+NomeUser+'</option>';
			
		}
		
	$("input[name^='indicePaiFilhoItem___']").each(function() {
		var indice = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
		var indiceValLinha = $("#indicePaiFilhoItem___"+indice).val();
		var itemExcluido = $("#itemExcluido___"+indice).val();
		
			if( indice == indiceValLinha && itemExcluido != 'sim'){
				var numSolicDePara = $("#numSolicDePara___"+indice).val();
				
				let codPetrobras = $("#codPetrobras___"+indice).val();
				if(codPetrobras != ''){
					contadorCodPetrobras ++
				}
				
				let codProjetista = $("#codProjetista___"+indice).val();
				if(codProjetista != ''){
					contadorCodProjetista ++
				}
				
			htmlDadosTabela += '<tr class="" id="trItem___'+indice+'">';
			
			htmlDadosTabela += '<td class=" btnEdicao text-center control-EditItem fluigicon fluigicon-fileedit icon-md" id="indexTbItem___'+indice+'" name="indexTbItem___'+indice+' "></td>';
			
			htmlDadosTabela += '<td >'+$("#indicePaiFilhoItem___"+indice).val()+'</td>';
			htmlDadosTabela += '<td class="text-center" id="tdDescricao___'+indice+'">'+$("#descMatOrigem___"+indice).val()+'</td>';
			htmlDadosTabela += '<td class=" complem2 text-center"> <select class=" form-control matricRespDePara" name="selectMatricRespDePara___'+indice+'" id="selectMatricRespDePara___'+indice+'" >';
			htmlDadosTabela += '<option value="" selected>Selecione</option>';
			htmlDadosTabela += htmlOptionsSelect;
			htmlDadosTabela += '</select></td>';
			htmlDadosTabela += '<td class="text-center">'+$("#unidOrigem___"+indice).val()+'</td>';
			htmlDadosTabela += '<td class="text-center">'+$("#qtdItem___"+indice).val()+'</td>';
			let contadorRev = parseInt($("#numeroRevSC").val());
			for(var u = 1; u <= contadorRev; u++ ){
				let qtdRev = verificarRevLinha(indice, u);
				if(qtdRev != ''){
					htmlDadosTabela += '<td class=" text-warning text-center">'+qtdRev+'</td>';
				}else{
					htmlDadosTabela += '<td class="text-center"></td>';
				}
			}

			htmlDadosTabela += '<td class="text-center">'+$("#numItemDocMat___"+indice).val()+'</td>';
			htmlDadosTabela += '<td class="text-center">'+$("#docOrigem___"+indice).val()+'</td>';
			//htmlDadosTabela += '<td class="text-center">'+$("#codMatOrigem___"+indice).val()+'</td>';
			htmlDadosTabela += '<td class="text-center">'+$("#revDocMatOrigem___"+indice).val()+'</td>';
			htmlDadosTabela += '<td class="text-center">'+$("#itemPQ___"+indice).val()+'</td>';
			htmlDadosTabela += '<td class="text-center">'+$("#dtNecessidadeMatOrigem___"+indice).val()+'</td>';
			htmlDadosTabela += '<td class="text-center codPetrobras">'+codPetrobras+'</td>';
			htmlDadosTabela += '<td class="text-center codProjetista">'+codProjetista+'</td>';
			
			htmlDadosTabela += '<td class="text-center complem2"><a target="_blank" href="'+ urlFluig +'/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+numSolicDePara+'">'+numSolicDePara+'</a></td>';
			
			htmlDadosTabela += '<td class="text-center complem2">'+$("#idMovRM___"+indice).val()+'</td>';
			htmlDadosTabela += '<td class="text-center complem2">'+$("#numMovRM___"+indice).val()+'</td>';
			htmlDadosTabela += '<td class=" btnExibStatusRM text-center fluigicon fluigicon-linechart icon-md" name="btnStatusMov___'+indice+'" id="btnStatusMov___'+indice+'"></td>';

			htmlDadosTabela += '</tr>';

	}
			
			
	});

	if($("input[name^='indicePaiFilhoItem___']").length > 0){
		$("#tbodyDatatableItem").append(htmlDadosTabela);
	
		carregarValoresMatricRespDePara();
		ativarChangeMatricRespDePara();

	     myTableItem = $('#tbItens').DataTable({
	    	 "dom": '<"top"i>rt<"bottom"flp><"clear">',
			 //"lengthMenu": [ 10, 25, 50, 75, 100 ],
	    	 "lengthMenu": [ 25, 50, 100, 150 ],
	    	ordering:  false,
			 "language": {
		            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese-Brasil.json"
		        },
		        dom: 'Blfrtip',
		        buttons: [{
		                     //extend: 'excelHtml5',
		                     //title: 'Data export'
		                  }]
	     });

	    
	     if(buscarModoForm() == "VIEW" || atividadeAtual == SUPORTE_TI || atividadeAtual == SUPORTE_TI_RM || atividadeAtual == ACOMPANHAR_SOLICITACAO_REVISAO || atividadeAtual == INFORMAR_RESP_VINCULACAO){
	 		$(".btnEdicao").hide();
	 		
	 	}else{
	 		  //TRATATIVA PARA CLIQUE NO BOTÃO DE EDITAR ITEM 
		     $("[name^=indexTbItem___]").click(function(){
		    	var indexItem = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
		    	carregaModalItem(indexItem, "EditItem");
		    	});
	 	}
	     
	
		     $("[name^=btnStatusMov___]").click(function(){
		    	var indexItem = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
		    	carregaModalStatusMov(indexItem);
		    	});

	     
	     if (atividadeAtual == INICIO || atividadeAtual == INICIO_0 || atividadeAtual == AJUSTA_SOLICITACAO){
	    	 $(".complem2").hide();
	     }
	     
	     if (atividadeAtual == ACOMPANHAR_SOLICITACAO_REVISAO){
	    	 $(".matricRespDePara").prop('disabled', true);
	     }
	     
	     if (contadorCodPetrobras == 0){
	    	 $(".codPetrobras").hide();
	     }else{
	     	$(".codPetrobras").show();
	     }
	     
	     if (contadorCodProjetista == 0){
	    	 $(".codprojetista").hide();
	     }else{
	     	$(".codprojetista").show();
	     }

		$("#divTableItem").show();
		}
}

function verificarRevLinha(indice, rev){
	//var contador = 0;
	var contadorRev = parseInt($("#numeroRevSC").val());
	var qtdRev = '';
	$("input[name^='indicePaiFilhoItemRev___']").each(function() {	
		var indiceRev = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
	
		var indicePaiFilhoTbItem = $("#indicePaiFilhoTbItem___"+indiceRev).val();
		var numControleRev = $("#numControleRev___"+indiceRev).val();
		if(indicePaiFilhoTbItem == indice &&  rev == numControleRev){
			qtdRev = $("#qtdRev___"+indiceRev).val();
		}	
	});
return qtdRev;
}

function ativarBtnItensManual(controle) {	
	$("[name=botaoAddItemManual]").click(function() {
	carregaModalItem(0, controle);	 
	});
}

function ativarBtnFiltrarUsuario() {	
	$("#aplicarFiltro").click(function() {
		var respCodificacao = $("#hidden_respCodificacao").val();
		var respCodificName = $("#hidden_respCodificName").val();
		if(respCodificacao != ''){
			var linhas = myTableItem.rows( {order:'index', search:'applied'} ).nodes();
			for(var i = 0; i < linhas.length; i++){
			
				var linha = linhas[i];
				var index = linha.id.substring(linha.id.lastIndexOf("_") + 1, linha.id.length);
				if($("#selectMatricRespDePara___"+index).val() == ''){
					$("#selectMatricRespDePara___"+index).val(respCodificacao);
					validarExistContrato();
					$("#matricRespDePara___"+index).val(respCodificacao);
					$("#nmRespDePara___"+index).val(respCodificName);
					var numSolicDePara = $("#numSolicDePara___"+index).val();
				}
					
					
					
					if(numSolicDePara != ''){
						$("#selectMatricRespDePara___"+index).prop('disabled', true);
					}
					
			}	
			
		}else{
			FLUIGC.message
			.alert({
						message : "<b>Favor informar o Resposável codificação</b>",
						title : "Atenção",
						label : 'Ok'
					}, function(el, ev) {
					
					});
		}
		var valorPesquisa = $('.dataTables_filter input').val();
		$('#tbodyDatatableItem').empty();
		$('#tbItens').DataTable().clear().draw();
		myTableItem.destroy()
		carregarTabelaDatatable();
		myTableItem.search(valorPesquisa).draw();

	});
}

function carregaModalStatusMov(index){
	var CODCOLIGADA = $("#TMOV_CODCOLIGADA").val();	
	var IDMOV = $('#idMovRM___'+index).val();
	var NUMSEQITM = $('#numSeqItmMovGeradoRM___'+index).val();
	var tbHistItemMov = '';
		
	tbHistItemMov += '<table id="myTable" class="table">';
	tbHistItemMov += '<thead><tr><th class="text-center">Núm. Movimento</th><th class="text-center">Id Movimento</th><th class="text-center">Status</th><th class="text-center">Status Aprov.</th><th class="text-center">Núm. Seq. Item Mov</th><th class="text-center">Cód. Tipo Mov</th><th class="text-center">Nome Mov</th><th class="text-center">Quantidade</th><th class="text-center">Unidade</th><th class="text-center">Dt Criação</th><th class="text-center">Dt Entrega</th><th class="text-center">Dt Reprogramada</th></tr></thead>';
	tbHistItemMov += '<tbody>';
	
	if(CODCOLIGADA != "" && IDMOV != '' && NUMSEQITM != ''){	
		constraintsHistItem = new Array();
		constraintsHistItem.push(DatasetFactory.createConstraint("CODCOLIGADA", CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST));
		constraintsHistItem.push(DatasetFactory.createConstraint("IDMOV", IDMOV, IDMOV, ConstraintType.MUST));
		constraintsHistItem.push(DatasetFactory.createConstraint("NUMSEQITM", NUMSEQITM, NUMSEQITM, ConstraintType.MUST));
		var datasetHistItem = DatasetFactory.getDataset("ds_ConsultaRM_WS112_RetornaHistoricoItemMovimento",null, constraintsHistItem, null);
	for(var y = 0; y < datasetHistItem.values.length; y++ ){
		var IDMOV = datasetHistItem.values[y].IDMOV;
			var STATUS = datasetHistItem.values[y].STATUS;
			var NSEQITMMOV = datasetHistItem.values[y].NSEQITMMOV;
			var CODTMV = datasetHistItem.values[y].CODTMV;
			var NUMEROMOV = datasetHistItem.values[y].NUMEROMOV;
			var QUANTIDADETOTAL = converteFormatMoney(datasetHistItem.values[y].QUANTIDADETOTAL);
			var CODUND = datasetHistItem.values[y].CODUND;
			var NOME_MOVIMENTO = datasetHistItem.values[y].NOME_MOVIMENTO;
			var STATUS_APROV = datasetHistItem.values[y].STATUS_APROV;
			var DATACRIACAO = datasetHistItem.values[y].DATACRIACAO;
			var DATAENTREGA = datasetHistItem.values[y].DATAENTREGA;
			var DTREPROGRAMADA = datasetHistItem.values[y].DTREPROGRAMADA;
			
			tbHistItemMov += '<tr><td>'+NUMEROMOV+'</td><td>'+IDMOV+'</td><td>'+STATUS+'</td><td>'+STATUS_APROV+'</td><td>'+NSEQITMMOV+'</td><td>'+CODTMV+'</td><td>'+NOME_MOVIMENTO+'</td><td>'+QUANTIDADETOTAL+'</td><td>'+CODUND+'</td><td>'+DATACRIACAO+'</td><td>'+DATAENTREGA+'</td><td>'+DTREPROGRAMADA+'</td></tr>';
		}	
	
	}else{
		FLUIGC.message
		.alert(
				{
					message : "Item ainda não foi integrado com o RM",
					title : "Aten\u00e7\u00e3o",
					label : 'Ciente'
				}, function(el, ev) {
		});
	}
	tbHistItemMov += '</tbody>';
	tbHistItemMov += '</table>';
	
	ModalHistoricoItemMov = FLUIGC.modal({
        title: 'Histórico Movimentos',
        content : tbHistItemMov,
		    id: 'histItemModal',
		    size: 'full',
		    actions: [{
		        'label': 'Fechar',
		        'autoClose': true
		    }]
		}, function(err, data) {
		    if(err) {
		        // do error handling
		    } else {
 
		    }
	}); 
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

function carregaModalItem(index, controle){
	  if(ModalItem != null){
		  ModalItem.remove();
		  ModalItem = null;
	  }
	if(controle == 'EditItemRev' && $("#matricRespDePara___"+index).val() == 'Contrato'){
		FLUIGC.message
		.alert({
					message : "<b>Item já foi enviado para Contrato</b>",
					title : "Atenção",
					label : 'Ok'
				}, function(el, ev) {
				
				});
		
	}else if(controle == 'EditItemRev' && validarOrdemCompraItem(index)){
		$("#hidden_TempRev").val('');
		FLUIGC.message
		.alert({
					message : "<b>Item já se encontra em um movimento 1.1.22 ( COTAÇÃO ). Necessário solicitar ao Setor de Orçamento que Ajuste o movimento para executar está opção  </b>",
					title : "Atenção",
					label : 'Ok'
				}, function(el, ev) {
					
				
				});
		location.reload();
	}else{
	
	
 ModalItem = FLUIGC.modal({
        title: 'Item',
        content :'<div class="row">'
        	+ '<div class="col-md-2 col-sm-6">'
        	+ '<div class="form-group">'
        		+ '<label for="M_numItemDocMat___" class="required">Num Item Doc</label>'
        		+ '<input type="text" class="form-control" maxlength="10" name="M_numItemDocMat" id="M_numItemDocMat" data-size="medium">'
        		+ '<input type="hidden" name="M_index" id="M_index" value="'+index+'">'
        		+ '<input type="hidden" name="M_controle" id="M_controle" value="'+controle+'">'
        	+ '</div>'
        	+ '</div>'
	+ '<div class="col-md-10 col-sm-10">'
		+ '<div class="form-group" >'
			+ '<label for="M_descMatOrigem" class="required">Descrições</label>'
			+ '<input type="text" class="form-control" name="M_descMatOrigem" id="M_descMatOrigem" data-size="medium">'
		+ '</div>'
	+ '</div>'
+ '</div>'		
+ '<div class="row">'
		//+ '<div class="col-md-3 col-sm-6">'
		//	+ '<div class="form-group">'
		//		+ '<label for="M_codMatOrigem">Cód. Material Origem</label>'
		//		+ '<input type="text" class="form-control" name="M_codMatOrigem" id="M_codMatOrigem" data-size="medium">'
		//	+ '</div>'
		//+ '</div>'
		+ '<div class="col-md-3 col-sm-6">'
			+ '<div class="form-group">'
				+ '<label class="required" for="M_docOrigem">Documento Origem</label>'
				+ '<input type="text" class="form-control" name="M_docOrigem" id="M_docOrigem" data-size="medium">'
			+ '</div>'
		+ '</div>'
		+ '<div class="col-md-3 col-sm-6">'
			+ '<div class="form-group">'
				+ '<label class="required" for="M_revDocMatOrigem">Rev. Doc. Origem</label>'
				+ '<select name="M_revDocMatOrigem" id="M_revDocMatOrigem" class="form-control">'
				+ '<option value="">Selecionar</option>'
				+ '<option value="00">Reisão 00</option>'
				+ '<option value="01">Reisão 01</option>'
				+ '<option value="02">Reisão 02</option>'
				+ '<option value="03">Reisão 03</option>'
				+ '<option value="04">Reisão 04</option>'
				+ '<option value="05">Reisão 05</option>'
				+ '<option value="06">Reisão 06</option>'
				+ '<option value="07">Reisão 07</option>'
				+ '<option value="08">Reisão 08</option>'
				+ '<option value="09">Reisão 09</option>'
				+ '<option value="10">Reisão 10</option>'
				+ '<option value="11">Reisão 11</option>'
				+ '<option value="A.">Reisão A</option>'
				+ '<option value="B.">Reisão B</option>'
				+ '<option value="C.">Reisão C</option>'
				+ '<option value="D.">Reisão D</option>'
				+ '<option value="E.">Reisão E</option>'
				+ '<option value="F.">Reisão F</option>'
				+ '<option value="G">Reisão G</option>'
				+ '<option value="H">Reisão H</option>'
				+ '<option value="I">Reisão I</option>'							
				+ '</select>'
			+ '</div>'
		+ '</div>'
		+ '<div class="col-md-3 col-sm-6">'
		+ '<label class="required" for="M_dtNecessidadeMatOrigem">Data Necessidade</label>'
		+ '<div class="input-group">'
	+ ' <input type="text" class="form-control date M_dtNecessidadeMatOrigem" name="M_dtNecessidadeMatOrigem" id="M_dtNecessidadeMatOrigem"> <spanclass="input-group-addon"> <spanclass="fluigicon fluigicon-calendar"></span></span> '
	+ '</div>'
+ '</div>'
+ '<div class="col-md-3 col-sm-6">'
+ '<div class="form-group">'
	+ '<label for="M_qtdItem" class="required">Quantidade</label>'
	+ '<input type="text" class="form-control moeda" name="M_qtdItem" id="M_qtdItem" data-size="medium">'
+ '</div>'
+ '</div>'
+ '</div>'
+ '<div class="row">'
		
		+ '<div class="col-md-4 col-sm-6">'
			+ '<label class="required" for="M_descUnidOrigem">Unidade</label>' 
			+ ' <input type="text" class="form-control" id="M_descUnidOrigem" name="M_descUnidOrigem"> 	'
			+ ' <input type="hidden" class="form-control" id="M_unidOrigem" name="M_unidOrigem"> 	'
		+ '</div>'
		+ '<div class="col-md-2 col-sm-6">'
		+ '<div class="form-group">'
			+ '<label class="required" for="M_itemPQ">Item PQ</label>'
			+ '<input type="text" class="form-control" name="M_itemPQ" id="M_itemPQ" data-size="medium">'
		+ '</div>'
	+ '</div>'
		+ '<div class="col-md-2 col-sm-6">'
		+ '<div class="form-group">'
			+ '<label for="M_codPetrobras" class="">Cód. Petrobras</label>'
			+ '<input type="text" class="form-control " name="M_codPetrobras" id="M_codPetrobras" data-size="medium">'
		+ '</div>'
	+ '</div>'
	+ '<div class="col-md-2 col-sm-6">'
	+ '<div class="form-group">'
		+ '<label for="M_codProjetista" class="">Cód. Projetista</label>'
		+ '<input type="text" class="form-control " name="M_codProjetista" id="M_codProjetista" data-size="medium">'
	+ '</div>'
+ '</div>'
		+ '</div>',
		    id: 'ItemModal',
		    size: 'full',
		    actions: [{
		        'label': 'Salvar',
		        'bind': 'data-save-modal',
		    },{
		        'label': 'Excluir',
		        'bind': 'data-excluir-modal',
		    },{
		        'label': 'Fechar',
		        'autoClose': true
		    }]
		}, function(err, data) {
		    if(err) {
		        // do error handling
		    } else {
		    	//var index = $("#M_index").val();
		    	var controle = $("#M_controle").val();
		    	var numSolicDePara = $("#numSolicDePara___"+index).val()
		 
		    	//ativarCaixa_alta();
		    	ativarDataModal();
		    	aplicarManscaraCampos();
		    	ativarChangeValidarDt();
		    	
		    	ativarFiltroUnidadesModal();
		    	
		    	
		    	$('button[data-excluir-modal]').hide();
				var numSolicDePara = $("#numSolicDePara___"+index).val()
				
		    	
		    	
		    	
		    	if(controle == "AddItem"){
		    		
		    		
		    	}else if(controle == "EditItem"){
		    	
		    		if(index != '0' && numSolicDePara == ''){
						$('button[data-excluir-modal]').show();
					}
		    		carregarvaloresModal(index, controle);	

		    	}else if( controle == "EditItemRev"){
		    		carregarvaloresModal(index, controle);
		    		if(index <= parseInt($("#hidden_TempRevMaisItem").val())){
		    			$("#M_numItemDocMat").prop('disabled', true);
			    		$("#M_descMatOrigem").prop('disabled', true);
			    		//$("#M_codMatOrigem").prop('disabled', true);
			    		$("#M_docOrigem").prop('disabled', true);
			    		$("#M_revDocMatOrigem").prop('disabled', true);
			    		$("#M_dtNecessidadeMatOrigem").prop('disabled', true);
			    		$("#M_descUnidOrigem").prop('disabled', true);
			    		$("#M_itemPQ").prop('disabled', true);
			    		$("#M_codPetrobras").prop('disabled', true);
			    		$("#M_codProjetista").prop('disabled', true);
		    		}
		    		
		    		
		    	}	    
		    }
		 // FIM - Controle Modal - Visualização \ Preenchimento de campos \ importar valores da tabela 
		    
		 // INICIO - Controle Modal - Botão Salvar
		   $('button[data-save-modal]').click(function(){
			   var indexModal = $("#M_index").val();
			   var controleModal = $("#M_controle").val();
			   
			  if(validarSalvarCamposModal(indexModal, controleModal)){
				  if(ModalItem != null){
					  ModalItem.remove();
					  ModalItem = null;
				  }	
				  //ModalItem.remove();
				  limparTabelaDatatable();
				  carregarTabelaDatatable();
				  
				  if($('#hidden_TempRev').val() == '1'){

					  validarCondicoesRevisao();
					  $(".revisao").show();
				  }
			  }
			  
			 
			
		    });
		   
		  // INICIO - Controle Modal - Botão Excluir
		    $('button[data-excluir-modal]').click(function(){
		    	var indexModal = $("#M_index").val();
				var controleModal = $("#M_controle").val();
				var numSolicDePara = $("#numSolicDePara___"+indexModal).val()
				if(indexModal != '0' && controleModal != 'EditItemRev'&& numSolicDePara == ''){
					$("#qtdItem___"+indexModal).val('0,00');
					$("#itemExcluido___"+indexModal).val('sim');
				}
				
				  ModalItem.remove();
				  limparTabelaDatatable();
				  carregarTabelaDatatable();
				  ModalItem = null;
		    });
		}); 
	}
}


function ativarFiltroUnidadesModal(){
    	var settings = {
    	        source: {
    	            url:  '/api/public/ecm/dataset/search?datasetId=ds_ConsultaRM_WS108_RetornaUnidadesDosItens&searchField=NOMEFANTASIA&',
    	            contentType: 'application/json',
    	            root: 'content',
    	            pattern: '',
    	            limit: 10,
    	            offset: 0,
    	            patternKey: 'searchValue',
    	            limitkey: 'limit',
    	            offsetKey: 'offset'
    	        },
    	        displayKey: 'NOMEFANTASIA',
    	        multiSelect: false,
    	        style: {
    	            autocompleteTagClass: 'tag-gray',
    	            tableSelectedLineClass: 'info'
    	        },
    	        table: {
    	            header: [
    	                {
    	                	  'title': 'NOMEFANTASIA',
    	                      'size': 'col-xs-4',
    	                      'dataorder': 'NOMEFANTASIA',
    	                      'standard': true, 
    	                      'visible': true
    	                }
    	            ],
    	            renderContent: ['CODUND','DESCRICAO','NOMEFANTASIA']
    	        }
    	    }
    
    if(filterUnid == null){
    	filterUnid = FLUIGC.filter('#M_descUnidOrigem', settings);
		filterUnid.on('fluig.filter.item.added', function(data){
    		$("#M_unidOrigem").val(data.item.CODUND);	
    			});  
    }else if(filterUnid.getSelectedItems() == undefined){
    	filterUnid = FLUIGC.filter('#M_descUnidOrigem', settings);
		filterUnid.on('fluig.filter.item.added', function(data){
    		$("#M_unidOrigem").val(data.item.CODUND);	
    			});   
    }else if(filterUnid.getSelectedItems().length == 1){
    	
    }else{
    	filterUnid = FLUIGC.filter('#M_descUnidOrigem', settings);
		filterUnid.on('fluig.filter.item.added', function(data){
    		$("#M_unidOrigem").val(data.item.CODUND);	
    			});   	
    }
    	
    		
}



function validarSalvarCamposModal(index, controle){

	var M_descMatOrigem = $("#M_descMatOrigem").val();
	if(validarCaracteresM_descMatOrigem(M_descMatOrigem)){
		FLUIGC.message
		.alert({
					message : "<b>Identificado caracteres especiais na descrição informada. Favor corrigir</b>",
					title : "Atenção",
					label : 'Ok'
				}, function(el, ev) {
				
				});
   			return false;
	}
	var M_numItemDocMat = $("#M_numItemDocMat").val();
	//var M_codMatOrigem = $("#M_codMatOrigem").val();
	var M_docOrigem = $("#M_docOrigem").val();
	var M_revDocMatOrigem = $("#M_revDocMatOrigem").val();
	var M_itemPQ = $("#M_itemPQ").val();
	var M_qtdItem = $("#M_qtdItem").val();
	var M_descUnidOrigem = $("#M_descUnidOrigem").val();
	var M_unidOrigem = $("#M_unidOrigem").val();
	var M_dtNecessidadeMatOrigem = $("#M_dtNecessidadeMatOrigem").val();
	var M_codPetrobras = $("#M_codPetrobras").val();
	var M_codProjetista = $("#M_codProjetista").val();
	
	if(controle == "AddItem"){
		if(M_numItemDocMat == "" || M_descMatOrigem == "" || M_qtdItem == "" || M_unidOrigem == "" || M_dtNecessidadeMatOrigem == "" 
			|| M_itemPQ == "" || M_docOrigem == "" || M_revDocMatOrigem == ""){
   	FLUIGC.message
		.alert({
					message : "<b>Favor informar os campos obrigatórios</b>",
					title : "Atenção",
					label : 'Ok'
				}, function(el, ev) {
				
				});
   			return false;
   	}else{
   		var newIndex = wdkAddChild('tableItens');
   		
  	   	$("#indicePaiFilhoItem___"+newIndex).val(newIndex);
  	    $("#numItemDocMat___"+newIndex).val(M_numItemDocMat);
		$("#qtdItem___"+newIndex).val(M_qtdItem);
	  	$("#unidOrigem___"+newIndex).val(M_unidOrigem);
	  	$("#descUnidOrigem___"+newIndex).val(M_descUnidOrigem);
	  	$("#docOrigem___"+newIndex).val(M_docOrigem);
	  	//$("#codMatOrigem___"+newIndex).val(M_codMatOrigem);
	  	$("#revDocMatOrigem___"+newIndex).val(M_revDocMatOrigem);
	  	$("#descMatOrigem___"+newIndex).val(M_descMatOrigem);
	  	$("#dtNecessidadeMatOrigem___"+newIndex).val(M_dtNecessidadeMatOrigem);
	  	$("#itemPQ___"+newIndex).val(M_itemPQ);
	  	$("#codPetrobras___"+newIndex).val(M_codPetrobras);
	  	$("#codProjetista___"+newIndex).val(M_codProjetista);

	  	
	  	if(buscarAtividadeAtual() == ACOMPANHAR_SOLICITACAO_REVISAO){
			var indexRev = wdkAddChild('tableRevItens');
			//$("#hidden_TempRevMaisItem").val('1')
			index = newIndex;
			$("#indicePaiFilhoItemRev___"+indexRev).val(indexRev);
			$("#indicePaiFilhoTbItem___"+indexRev).val(index);		
			$("#qtdOriginal___"+indexRev).val($("#qtdItem___"+index).val());
			$("#qtdRev___"+indexRev).val(M_qtdItem);
			$("#numControleRev___"+indexRev).val($("#numeroRevSC").val());
			
			$("#idMovAnterior___"+indexRev).val($("#idMovRM___"+index).val());
			$("#numSequItmMovAnterior___"+indexRev).val($("#numSeqItmMovGeradoRM___"+index).val());

			//$("#itemEditado___"+index).val('sim');

		}
	  	
	  	
   		return true; 
   		}
	}else if(controle == "EditItem"){
		if(M_numItemDocMat == "" || M_descMatOrigem == "" || M_qtdItem == "" || M_unidOrigem == "" || M_dtNecessidadeMatOrigem == ""
			|| M_itemPQ == "" || M_docOrigem == "" || M_revDocMatOrigem == ""){
   	FLUIGC.message
		.alert({
					message : "<b>Favor informar os campos obrigatórios</b>",
					title : "Atenção",
					label : 'Ok'
				}, function(el, ev) {
				
				});
   			return false;
   	}else{
  	   	$("#indicePaiFilhoItem___"+index).val(index);
  	    $("#numItemDocMat___"+index).val(M_numItemDocMat);
		$("#qtdItem___"+index).val(M_qtdItem);
	  	$("#unidOrigem___"+index).val(M_unidOrigem);
	  	$("#descUnidOrigem___"+index).val(M_descUnidOrigem);
	  	$("#docOrigem___"+index).val(M_docOrigem);
	  	//$("#codMatOrigem___"+index).val(M_codMatOrigem);
	  	$("#revDocMatOrigem___"+index).val(M_revDocMatOrigem);
	  	$("#descMatOrigem___"+index).val(M_descMatOrigem);
	  	$("#dtNecessidadeMatOrigem___"+index).val(M_dtNecessidadeMatOrigem);
	  	$("#itemPQ___"+index).val(M_itemPQ);
	  	$("#codPetrobras___"+index).val(M_codPetrobras);
	  	$("#codProjetista___"+index).val(M_codProjetista);

   		return true; 
   		}
	}else if(controle == "EditItemRev"){
		var numeroRevSC = $("#numeroRevSC").val();
		M_qtdItem = '0,00'
		if( M_qtdItem != ""){
		var qtdItem = $("#qtdItem___"+index).val();
			if(M_qtdItem != qtdItem){
				if(!validarOrdemCompraItem(index)){
					var indexRev = validarEdicaoMesmaRev(numeroRevSC, index);
					if(indexRev == ''){
					 indexRev = wdkAddChild('tableRevItens');
					}

				$("#indicePaiFilhoItemRev___"+indexRev).val(indexRev);
				$("#indicePaiFilhoTbItem___"+indexRev).val(index);		
				$("#qtdOriginal___"+indexRev).val(qtdItem);
				$("#qtdRev___"+indexRev).val(M_qtdItem);
				$("#numControleRev___"+indexRev).val($("#numeroRevSC").val());
				
				$("#idMovAnterior___"+indexRev).val($("#idMovRM___"+index).val());
				$("#numSequItmMovAnterior___"+indexRev).val($("#numSeqItmMovGeradoRM___"+index).val());
				$("#itemCancelado___"+index).val('sim');
				$("#itemEditado___"+index).val('sim');
				$("#selectMatricRespDePara___"+index).prop('disabled', true);
				
				$("#hidden_TempRevEdicaoItem").val('1');
				return true; 
				
				
			}else{
				FLUIGC.message
				.alert({
							message : "<b>Este item já se encontra em um movimento com ordem de compra criada. Não é possível Edição.</b>",
							title : "Atenção",
							label : 'Ok'
						}, function(el, ev) {
						
						});
			}
						
			}else{
				FLUIGC.message
				.alert({
							message : "<b>Quantidade informada é igual a quantidade anterior, para gerar uma revisão as quantidades deverão ser diferentes.</b>",
							title : "Atenção",
							label : 'Ok'
						}, function(el, ev) {
						
						});
			}
		
		return true; 
		}else{
			FLUIGC.message
			.alert({
						message : "<b>Favor informar os campos obrigatórios</b>",
						title : "Atenção",
						label : 'Ok'
					}, function(el, ev) {
					
					});
		}
	}
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
function ativarChangeCheckbox(){
	$(".checkboxTbl").change(function(){
		var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
		$("#excluirDoc___"+index).val('nao');
	});
}

function validarUsuarioAprovadorRM(){
	var codigoUsuario = buscarUsuarioLogado();
	var c1 = DatasetFactory.createConstraint("USERID", codigoUsuario, codigoUsuario, ConstraintType.MUST);
	var fieldAsConstraint = new Array(c1);
	var datasetRM = DatasetFactory.getDataset("ds_ConsultaRM_WS060_RetornaColigadaUsuario", null, fieldAsConstraint, null);

	if (datasetRM.values[0].CODCOLIGADA != "") {
		var codUsuarioRM = datasetRM.values[0].CODUSUARIO;
		$("#codUsuarioRM").val(codUsuarioRM);	
	}else {
		FLUIGC.message
		.alert(
				{
					message : "Usu\u00e1rio Logado n\u00e3o encontrado no RM, Favor acionar o administrador do sistema",
					title : "Aten\u00e7\u00e3o",
					label : 'Ciente'
				}, function(el, ev) {
		});
	}
}

function validarUsuarioSolicitanteRM(){
	var codigoUsuario = buscarUsuarioLogado();
	var c1 = DatasetFactory.createConstraint("USERID", codigoUsuario, codigoUsuario, ConstraintType.MUST);
	var fieldAsConstraint = new Array(c1);
	var datasetRM = DatasetFactory.getDataset("ds_ConsultaRM_WS060_RetornaColigadaUsuario", null, fieldAsConstraint, null);

	if (datasetRM.values[0].CODCOLIGADA != "") {
		var codColigada = datasetRM.values[0].CODCOLIGADA;
		$("#codColigadaSolicitante").val(codColigada);
		var codUsuarioRM = datasetRM.values[0].CODUSUARIO;
		$("#codUsuarioRM").val(codUsuarioRM);
		$("#hidden_codVen").val(datasetRM.values[0].CODVEN);	
		$("#nmColigadaSolicitante").val(datasetRM.values[0].NOMEFANTASIA_COLIGADA);
		$("#nmFilialSolicitante").val(datasetRM.values[0].NOMEFANTASIA_FILIAL);
		$("#chapaSolicitanteRM").val(datasetRM.values[0].CHAPA);
		
		var CODSISTEMA = $("#hidden_CODSISTEMA").val();
		var filtroColigada = 'CODUSUARIO,' + codUsuarioRM+ ',' + 'CODSISTEMA,' + CODSISTEMA;
		setTimeout(function() {
			if(buscarModoForm() != "VIEW"){
				reloadZoomFilterValues("nmFantColSolicitacao", filtroColigada);
			}
		}, 2000);
		
		
	}else {
		FLUIGC.message
		.alert(
				{
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
			//reloadZoomFilterValues("departamentoSC", filtroColigadaDpto);
		}
	}, 2000);
	

}

function limparTabelaDatatable(){
	if(myTableItem != ""){
		myTableItem.destroy();
		$('#tbodyDatatableItem').empty(); 
		verificarQtdRevTHead();
	}
}
function loadUpload(){
	var pastaDoc = $("#pastaDoc").val();
	
	$("input[name=files]").fileupload({
		dataType : 'json',done : function(e, data) {
					$.each(data.result.files,
							function(index, file) {
							$.ajax({ async : false,
									type : "POST",
									contentType : "application/json",
									url : '/api/public/ecm/document/createDocument',
									data : JSON.stringify({
												"description" : file.name,
												"parentId" : pastaDoc,
												"downloadEnabled": true,
												"InheritSecurity": true,
												"attachments" : [{
												"fileName" : file.name}],}),
														error : function() {
															FLUIGC.toast({
																title : '',
																message : "Falha ao enviar",
																type : 'danger'});
														},
														success : function(data) {
															idDoDocumento = data.content.id;
															if (idDoDocumento != "") {
																//FLUIGC.toast({
																//			title : '',
																//			message : "Carregado com Sucesso",
																//			type : 'success'
																//		});
																$("#nm_arquivo").val(file.name);
																$("#numGed").val(idDoDocumento);
																criarLinkDoc(idDoDocumento);
																limparTabelaDatatable();
																carregarTabelaDatatable();
																ativarBtnFiltrarUsuario();
																
																$(".botaoAddItemImportacao").hide();
															}
											},
						});
						
			});
		}
	});
}
function criarLinkDocDefault() {
	var link = parent.WCMAPI.serverURL;

	var linkComplemento = "/portal/p/1/ecmnavigation?app_ecm_navigation_doc="
			+ $("#numGedDefault").val();
	var linkCompleto = link + linkComplemento;
	$("#hidden_LinkDefault").val(linkCompleto);
}
function clickVisualizarDocDefault(obj){
	window.open($("#hidden_LinkDefault").val());
}

function criarLinkDoc(idDoDocumento) {
	var link = parent.WCMAPI.serverURL;

	var linkComplemento = "/portal/p/1/ecmnavigation?app_ecm_navigation_doc="
			+ idDoDocumento;
	var linkCompleto = link + linkComplemento;
	$("#hidden_Link").val(linkCompleto);
}
function clickVisualizarFile(obj){
	window.open($("#hidden_Link").val());
}
function carregarvaloresModal(index, controle){
	//implementação para obrigar a inserir um novo item nas revisão que tenha alteração de valores
	if(controle == 'EditItemRev' && index <= parseInt($("#hidden_TempRevMaisItem").val())){
		if($("#itemEditado___"+index).val() == 'sim'){	
			$("#M_qtdItem").val('0,00');
		}else{
			$("#M_qtdItem").val('0,00');
		}
		$("#M_qtdItem").prop('readonly', true);
	}else{
		if($("#itemEditado___"+index).val() == 'sim'){	
			var qtdRev = buscarQtdEditada(index);
			$("#M_qtdItem").val(qtdRev);
		}else{
			$("#M_qtdItem").val($("#qtdItem___"+index).val());
		}
	}
	
	
	

	$("#M_numItemDocMat").val($("#numItemDocMat___"+index).val());
	
	var descUnidOrigem = ($("#descUnidOrigem___"+index).val());
	if(descUnidOrigem == ""){
		descUnidOrigem = $("#unidOrigem___"+index).val();
	}
	if($("#M_unidOrigem").val() == ''){
		var item = { NOMEFANTASIA: descUnidOrigem};
		filterUnid.add(item);
	}
	
	$("#M_unidOrigem").val($("#unidOrigem___"+index).val());
	$("#M_docOrigem").val($("#docOrigem___"+index).val());
	//$("#M_codMatOrigem").val($("#codMatOrigem___"+index).val());
	$("#M_revDocMatOrigem").val($("#revDocMatOrigem___"+index).val());
	$("#M_descMatOrigem").val($("#descMatOrigem___"+index).val());
	$("#M_dtNecessidadeMatOrigem").val($("#dtNecessidadeMatOrigem___"+index).val());
	$("#M_itemPQ").val($("#itemPQ___"+index).val());
	$("#M_codPetrobras").val($("#codPetrobras___"+index).val());
	$("#M_codProjetista").val($("#codProjetista___"+index).val());
}

function ativarChangeMatricRespDePara(){
	$("[name^='selectMatricRespDePara___']").change(function(){
		var index = this.name.substring(this.name.lastIndexOf("_") + 1, this.name.length);
		$("#matricRespDePara___"+index).val($("[name='selectMatricRespDePara___"+index+"']").val());
		if( $('#selectMatricRespDePara___8 :selected').text() == 'Selecione'){
			$("#nmRespDePara___"+index).val($("#selectMatricRespDePara___8_d :selected").text());
		}else{
			$("#nmRespDePara___"+index).val( $('#selectMatricRespDePara___8 :selected').text());
		}
		
		validarExistContrato();
	});
}
function carregarValoresMatricRespDePara(){
	$("input[name^='matricRespDePara___']").each(function(){
		var index = this.name.substring(this.name.lastIndexOf("_") + 1, this.name.length);
		if(buscarModoForm() != "VIEW"){
			var numSolicDePara = $("#numSolicDePara___"+index).val();
			var itemExcluido = $("#itemExcluido___"+index).val();
			if(numSolicDePara != '' && itemExcluido != 'sim'){
			
			$("[name='selectMatricRespDePara___"+index+"']").val($("#matricRespDePara___"+index).val());
			$("[name='selectMatricRespDePara___"+index+"']").prop('disabled', true);
			if(!($("#tipoAprovGerenteRev").val() != 'ajustar' || $("#tipoAprovCoordPlanRev").val() != 'ajustar')){
				$("#indexTbItem___"+index).prop('disabled', true);
				$("#indexTbItem___"+index).css({"opacity": "0"});
				$("[name='indexTbItem___"+index+"']").off('click');
			}
			
			validarExistContrato();
			}else{
				var matricRespDePara = $("#matricRespDePara___"+index).val();
				if(matricRespDePara != ''){
					$("[name='selectMatricRespDePara___"+index+"']").val(matricRespDePara);
				//$("[name='selectMatricRespDePara___"+index+"']").prop('disabled', true);
			
					
				}
			//validarExistContrato();
			}
		}else{
			
			$("[name='selectMatricRespDePara___"+index+"']").prop('disabled', false);
			$("[name='selectMatricRespDePara___"+index+"']").val($("#matricRespDePara___"+index).val());
			$("[name='selectMatricRespDePara___"+index+"']").prop('disabled', true);
				
				validarExistContrato();
			
			
			
		}
	});
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
function ativarChangeDevolAjustes(){
	$("#enviarParaAjustes").change(function(){
		var enviarParaAjustes = $("#enviarParaAjustes").val();
		$("#hidden_enviarParaAjustes").val(enviarParaAjustes);
		if(enviarParaAjustes == "nao"){			
			$("label[for='observacaoLOS']").removeClass("required");
			$("#observacaoLOS").val('');
			$(".observacaoLOS").hide();
			
		}else if(enviarParaAjustes == "sim"){
			$("label[for='observacaoLOS']").addClass("required");		
			$(".observacaoLOS").show();
		}
	});
}

function ativarChangeNovaRev(){
	$("#gerarNovaRev").change(function(){
		var gerarNovaRev = $("#gerarNovaRev").val();
		$("#hidden_gerarNovaRev").val(gerarNovaRev);
		if(gerarNovaRev == "nao"){			
			$("label[for='observacaoNovaRev']").removeClass("required");
			$("#observacaoNovaRev").val('');
			$(".observacaoNovaRev").hide();
			
		}else if(gerarNovaRev == "sim"){
			$("label[for='observacaoNovaRev']").addClass("required");		
			$(".observacaoNovaRev").show();
		}
	});
}


function ativarChangeAprovGerencia() {

	$("#tipoAprovGerente").change(function() {
		$("#hidden_tipoAprovGerente").val($("#tipoAprovGerente").val());
		if ($("#tipoAprovGerente").val() == "reprovado" || $("#tipoAprovGerente").val() == "ajustar") {
			$("label[for='observacaoAprovGerente']").addClass("required");
		} else {
			$("label[for='observacaoAprovGerente']").removeClass("required");
		}
	});
}

function ativarChangeAprovCoordPlan() {

	$("#tipoAprovCoordPlan").change(function() {
		$("#hidden_tipoAprovCoordPlan").val($("#tipoAprovCoordPlan").val());
		if ($("#tipoAprovCoordPlan").val() == "reprovado" || $("#tipoAprovCoordPlan").val() == "ajustar") {
			$("label[for='observacaoAprovCoordPlan']").addClass("required");
		} else {
			$("label[for='observacaoAprovCoordPlan']").removeClass("required");
		}
	});
}

function AtivarAjusteRevisao(){
	 ativarBtnItensManual('AddItem');
	 $("#hidden_TempRev").val('1');
	 verificarQtdRevTHead();
	 $(".botaoAddItemManual").show();
	 validarCondicoesRevisao();
		
}

function ativarBtnHabilitarRevisao(){	
	 $("#habilitarRevisao").click(function(){
		
		 if(ModalItem != null){
			  ModalItem.remove();
			  ModalItem = null;
		 }
		
		 
		 
		 $("#hidden_TempRev").val('1');
	    var numeroRevSC = parseInt($("#numeroRevSC").val());
	    versaoInicial = numeroRevSC;
	    $("#numeroRevSC").val(numeroRevSC + 1);
	    verificarQtdRevTHead();
	    ativarBtnItensManual('AddItem');
	    
	    limparTabelaDatatable();
		carregarTabelaDatatable();
		validarCondicoesRevisao();
		$(".revisao").show();
	    
	    });
	 


		
}

function validarCondicoesRevisao(){
	$(".divHabilitarRevisao").hide();
	$(".botaoAddItemManual").show();
	$("[name=botaoAddItemManual]").prop('disabled', false);

	$("input[name^='indicePaiFilhoItem___']").each(function() {
		var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
	
		$(".btnEdicao").show();
		$("#indexTbItem___"+index).prop('disabled', false);
		$("#indexTbItem___"+index).css({"opacity": "1"});
		ativarClickEditItem(index);
				
	});	
}

function validarExistContrato(){
	var count = 0;
	$(".matricRespDePara").each(function(){
		var index = this.name.substring(this.name.lastIndexOf("_") + 1, this.name.length);
			var matricRespDePara = $("#matricRespDePara___"+index).val();
			if(matricRespDePara == 'Contrato'){
				count++;
			}		
	});
	
	if(count > 0){
		$(".divOpcaoContrato").show();
		$("#obsAberturaContrato").prop('readonly', false);

	}else{
		$(".divOpcaoContrato").hide();
		//$("#numSolicDePara").val('');
	}
}
function ativarClickEditItem(index){
	$("[name^=indexTbItem___"+index+"]").click(function(){
    	var indexItem = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
    	carregaModalItem(indexItem, "EditItemRev");
    	});
}

function verificarQtdRevTHead(){
	$(".revisao").remove();
	let contadorRev = parseInt($("#numeroRevSC").val());
	for(var a = 1; a <= contadorRev; a++ ){
		if($(".revisao").length == 0){
			
			$(".classQtd").after('<th id="idRev'+a+'" class="text-center revisao classTh30" "><b>Qtd Rev.'+a+'</b></th>');
			
		}else if($(".revisao").length < a){
			var aMenos = a-1;
			$("#idRev"+aMenos).after('<th id="idRev'+a+'" class="text-center revisao classTh30" "><b>Qtd Rev.'+a+'</b></th>');
		}
	
		$(".btnEdicao").show();
	}
}



function buscarQtdEditada(index){
	var numeroRevSC = $("#numeroRevSC").val();
	var qtdRev = ''; 
	$("[name^=indicePaiFilhoItemRev___]").each(function(){
		var indexRev = this.name.substring(this.name.lastIndexOf("_") + 1, this.name.length);
			var indicePaiFilhoTbItem = $("#indicePaiFilhoTbItem___"+indexRev).val();
			var numControleRev = $("#numControleRev___"+indexRev).val();
			if(index == indicePaiFilhoTbItem){
				qtdRev = $("#qtdRev___"+indexRev).val();		
			}	
	});
	return qtdRev;
}

function validarOrdemCompraItem(index){

		var codColigada = $("#TMOV_CODCOLIGADA").val();
		var idMovRM = $("#idMovRM___"+index).val();
		var numSolicDePara = $("#numSolicDePara___"+index).val();
		var numSeqItmMovGeradoRM = $("#numSeqItmMovGeradoRM___"+index).val();
		var contadorMov25 = 0;
		
if(idMovRM != '' && numSeqItmMovGeradoRM != ''){
		
		constraintsHistItem = new Array();
		constraintsHistItem.push(DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST));
		constraintsHistItem.push(DatasetFactory.createConstraint("IDMOV", idMovRM, idMovRM, ConstraintType.MUST));
		constraintsHistItem.push(DatasetFactory.createConstraint("NUMSEQITM", numSeqItmMovGeradoRM, numSeqItmMovGeradoRM, ConstraintType.MUST));
		var datasetHistItem = DatasetFactory.getDataset("ds_ConsultaRM_WS112_RetornaHistoricoItemMovimento",null, constraintsHistItem, null);
			if(datasetHistItem != undefined){
				for(var y = 0; y < datasetHistItem.values.length; y++ ){
					var IDMOV = datasetHistItem.values[y].IDMOV;
						var STATUS = datasetHistItem.values[y].STATUS;
						var NSEQITMMOV = datasetHistItem.values[y].NSEQITMMOV;
						var CODTMV = datasetHistItem.values[y].CODTMV;
						var IDMOV = datasetHistItem.values[y].IDMOV;
						if(CODTMV == '1.1.22' || CODTMV.indexOf("3.") == 0){
							contadorMov25 ++;
						}
						
					}	
			}
	
			
			if(contadorMov25 > 0){
				return true;
			}else{
				return false;
			}
}
}


function validarEdicaoMesmaRev(numeroRevSC, index){
	var indexLocalizado = '';
	$("[name^=indicePaiFilhoItemRev___]").each(function(){
		var indexRev = this.name.substring(this.name.lastIndexOf("_") + 1, this.name.length);
			var indicePaiFilhoTbItem = $("#indicePaiFilhoTbItem___"+indexRev).val();
			var numControleRev = $("#numControleRev___"+indexRev).val();
			if(index == indicePaiFilhoTbItem && numControleRev == numeroRevSC){
				indexLocalizado = indexRev;	
			}	
	});
	return indexLocalizado;

}


function montarTabelaAprovRevisoes(){
	var controleRev = '1';
		var atividadeAtual = buscarAtividadeAtual();
		
		var htmlDadosTabelaRev = '';
		
		$("input[name^='indicePaiFilhoItemRev___']").each(function() {
			var indiceRev = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);

			var numControleRev = $("#numControleRev___"+indiceRev).val();
			var itemExcluido = $("#itemExcluido___"+indiceRev).val();
			
				if( numControleRev == controleRev && itemExcluido != 'sim'){

					htmlDadosTabelaRev += '<tr class="" id="trRevisao___'+controleRev+'">';
				
					htmlDadosTabelaRev += '<td class="text-center">'+controleRev+'</td>';
					htmlDadosTabelaRev += '<td class="text-center">'+$("#dtAprovRevisaoCoordPlan___"+indiceRev).val()+'</td>';
					htmlDadosTabelaRev += '<td class="text-center">'+$("#nomeAprovRevisaoCoordPlan___"+indiceRev).val()+'</td>';
					htmlDadosTabelaRev += '<td class="text-center">'+$("#ObsAprovRevisaoCoordPlan___"+indiceRev).val()+'</td>';
					htmlDadosTabelaRev += '<td class="text-center">'+$("#dtAprovRevisaoGerente___"+indiceRev).val()+'</td>';
					htmlDadosTabelaRev += '<td class="text-center">'+$("#nomeAprovRevisaoGerente___"+indiceRev).val()+'</td>';
					htmlDadosTabelaRev += '<td class="text-center">'+$("#ObsAprovRevisaoGerente___"+indiceRev).val()+'</td>';
				
					htmlDadosTabelaRev += '</tr>';

				}		
		});

	
			$("#tbodyTableAprovRev").append(htmlDadosTabelaRev);

		     myTableItemRev = $('#tbAprovRev').DataTable({
		    	 "dom": '<"top"i>rt<"bottom"flp><"clear">',
		    	ordering:  false,
				 "language": {
			            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese-Brasil.json"
			        },
			        dom: 'Bfrtip'
		     });

}

function validarCaracteresM_descMatOrigem(M_descMatOrigem){
	var qtdIni = M_descMatOrigem.length;
	var replaceDesc = M_descMatOrigem.replace('/[\x00-\x1F\x7F-\xFF]/', '') 
	var qtdSemCaracter = replaceDesc.length;
	
	if(qtdIni > qtdSemCaracter){
		return true;
	}
	
}

function carregarQtdItemEditIni(){
	var countItemEdit = 0;
	$("input[name^='indicePaiFilhoTbItem___']").each(function(){
		var index = this.name.substring(this.name.lastIndexOf("_") + 1, this.name.length);
				countItemEdit++;	
	});
	qtdItemEditIni = countItemEdit;
	
	
	
	var validandoRev = 0;
	$("input[name^='indicePaiFilhoTbItem___']").each(function(){
		validandoRev++;	
	});
	if(validandoRev == 0){
		$("#numeroRevSC").val('0');
	}
}

