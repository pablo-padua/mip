$(function(){
	var atividadeAtual = buscarAtividadeAtual();
	
	if ((atividadeAtual == 0 || atividadeAtual == 20) && (FORM_MODE != "NONE")){
		atividadeInicial();
		if (atividadeAtual == 20){
			viewAcao();
		}
	}
	// APROV_GERENCIA
	else if (atividadeAtual == 26 && FORM_MODE == "MOD"){
		aprovacaoGerente();
		montaCamposSalarioFuncNova("");
		montaCamposSalarioFuncTabelaNova("");
		exibeSalarioFuncNova();
	}
	// APROV_DIRETOR
	else if (atividadeAtual == 73 && FORM_MODE == "MOD"){
		aprovacaoDiretor();
		montaCamposSalarioFuncNova("");
		montaCamposSalarioFuncTabelaNova("");
		exibeSalarioFuncNova();
	}
	// CRIAR_TABELA
	else if (atividadeAtual == 95 && FORM_MODE == "MOD"){
		criarTabela();
		montaCamposSalarioFuncNova("readonly");
		montaCamposSalarioFuncTabelaNova("readonly");
		exibeSalarioFuncNova();
	}
	// AJUSTAR_INTEGRACAO_1
	else if (atividadeAtual == 123 && FORM_MODE == "MOD"){
		viewAtividades();
		ocultarSalario();
		removerLixeiraFuncNova();
	}
	//AJUSTAR_INTEGRACAO_2
	else if (atividadeAtual == 119 && FORM_MODE == "MOD"){
		viewAtividades();
		ocultarSalario();
		removerLixeiraFuncNova();	
		removerLixeiraTabelaNova();
	}
	//CONFERIR_TABELA
	else if (atividadeAtual == 111 && FORM_MODE == "MOD"){
		conferirAlteracao();
		montaCamposSalarioFuncNova("readonly");
		montaCamposSalarioFuncTabelaNova("readonly");
		exibeSalarioFuncNova();
	}
	//VINCULAR_RISCOS
	else if (atividadeAtual == 87 && FORM_MODE == "MOD"){
		vincularRiscos();
	}
	if (FORM_MODE == "VIEW"){
		viewAtividades();
		exibeSalarioFuncNova();
		ocultarSalario();
		changeFuncao();
		removerLixeiraFuncNova();
		removerLixeiraTabelaNova();
		
		if(atividadeAtual == 87)
			$(".tbFuncoesExistentes").hide();
		
	}
	
	ocultaCamposAgrupamento();
});

/* ########### INICIO VIEW DAS ATIVIADES ############ */ 

function viewAtividades(){
	$("[name^=btDeleteFuncoesExistentes]").hide();	
	
	if ($("[name=aprovacao]").val() == ""){
		$(".aprovacao").hide();
	} else {
		$(".aprovacao").show();
	}
	
	if ($("[name=aprovacaoDir]").val() == ""){
		$(".aprovacaoDir").hide();
	} else {
		$("aprovacaoDir").show();
	}
	
	if ($("[name=codNovaTabela]").val() == ""){
		$(".criarTabela").hide();
	} else {
		$(".criarTabela").show();
	}
	
	if ($("[name=conferido]").val() == ""){
		$(".conferir").hide();
	} else {
		$(".conferir").show();
	}
	
	if ($("[name=nomeVincRiscos]").val() == ""){
		$(".vincularRiscos").hide();
	} else {
		$(".vincularRiscos").show();
	}	
}

function atividadeInicial(){
	viewAcao();
	$(".tbFuncoesExistentes").hide();
	$(".tbFuncoesNovas").hide();
	$(".tbTabelaNova").hide();
	//FLUIGC.calendar("#dataAlteracao", {minDate: new Date()});
	FLUIGC.calendar("#dataAlteracao", { pickDate: true, pickTime: false,});
	ativarChangeValidarDt();
	validaDataAlteracao();
	aplicarMascaraCampos();
	viewAtividades();
	papelRHUsuarioLogado();
	preencheChapa(buscarMatriculaUsuarioLogado(), "chapaSolicitante");
	regraSolicitante();
}

function aprovacaoGerente(){
	viewAtividades();
	viewAcao();
	changeFuncao();
	$("[name=botaoAddFuncao]").hide();
	$("[name=botaoAddFuncaoTabelaNova]").hide();
	$(".aprovacao").show();
}

function aprovacaoDiretor(){
	viewAtividades();
	viewAcao();
	changeFuncao();
	$("[name=botaoAddFuncao]").hide();
	$("[name=botaoAddFuncaoTabelaNova]").hide();
	$(".aprovacaoDir").show();
}

function criarTabela(){
	viewAtividades();
	viewAcao();
	changeFuncao();
	removerLixeiraFuncNova();
	removerLixeiraTabelaNova();
	$("[name=botaoAddFuncao]").hide();
	$(".criarTabela").show();	
	setTimeout(function(){ 
		reloadZoomFilterValues("novaTabela", "CODCOLIGADA," + $("[name=codColigada]").val());
	}, 3000);
}

function conferirAlteracao(){
	viewAtividades();
	viewAcao();
	changeFuncao();
	removerLixeiraFuncNova();
	removerLixeiraTabelaNova();
	$("[name=botaoAddFuncao]").hide();
	$(".conferir").show();
}

function vincularRiscos(){
	viewAtividades();
	viewAcao();
	changeFuncao();
	ocultarSalario();
	removerLixeiraFuncNova();
	removerLixeiraTabelaNova();
	$("[name=botaoAddFuncao]").hide();	
	$(".tbFuncoesExistentes").hide();
	$(".vincularRiscos").show();
}

function clickAcao(){
	var tipoAcao = $("input[name^='novaTabelaSalarial']:checked").val();
	$("[name=hiddenTipoAcao]").val(tipoAcao);
	if (tipoAcao == "alterar"){
		$('table[tablename=tbFuncoesTabelaNova] tbody tr').not(':first').remove();
		$(".dataAlteracao").show();
		$(".codTabela").show();
		$(".tabela").show();
		$(".tbFuncoesExistentes").show();
		$(".tbFuncoesNovas").show();
		$(".tbTabelaNova").hide();
		$(".fileCSV").hide();
		window["tabela"].clear();
		window["obraSetor"].clear();		
	} else if (tipoAcao == "incluir"){
		$('table[tablename=tbFuncoesExistentes] tbody tr').not(':first').remove();
		$('table[tablename=tbFuncoesNovas] tbody tr').not(':first').remove();
		$(".dataAlteracao").hide();
		$(".codTabela").hide();
		$(".tabela").hide();
		$(".tbFuncoesExistentes").hide();
		$(".tbFuncoesNovas").hide();
		$(".tbTabelaNova").show();
		window["tabela"].clear();
		window["obraSetor"].clear();
	}
}

function viewAcao(){
	var tipoAcao = $("[name=hiddenTipoAcao]").val();
	if (tipoAcao == "alterar"){
		$(".dataAlteracao").show();
		$(".codTabela").show();
		$(".tabela").show();
		$(".tbFuncoesExistentes").show();
		$(".tbFuncoesNovas").show();
		$(".tbTabelaNova").hide();
	} else if (tipoAcao == "incluir"){
		$(".dataAlteracao").hide();
		$(".codTabela").hide();
		$(".tabela").hide();
		$(".tbFuncoesExistentes").hide();
		$(".tbFuncoesNovas").hide();
		$(".tbTabelaNova").show();
		
	} else{
		$(".dataAlteracao").hide();
		$(".codTabela").hide();
		$(".tabela").hide();
		$(".tbFuncoesExistentes").hide();
		$(".tbFuncoesNovas").hide();
		$(".tbTabelaNova").hide();
	}
}

function ocultarSalario(){
	
	var matricula = buscarMatriculaUsuarioLogado();
	var grupo = 'PES';
	
	var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", grupo, grupo, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("colleagueGroup", null, constraints, null);
	if(dataset.values.length == 0){
		$(".salario").hide();
	}
	

	
}


/* ########### FIM VIEW DAS ATIVIADES ############ */ 

/* ########### INICIO REGRAS SOLICITANTE ############ */

function preencheChapa(matricula, campo){
	var c1 = DatasetFactory.createConstraint("USER_CODE", matricula, matricula, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_chapa", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		$("[name=cargoSolicitante]").val(dataset.values[i].CARGO);
		$("[name=funcaoSolicitante]").val(dataset.values[i].GESTAO);
		$("[name=codFuncaoSolicitante]").val(dataset.values[i].CODFUNCAO);
		$("[name=codUsuario]").val(dataset.values[i].CODUSUARIO);
		chapa = dataset.values[i].CHAPA;
		$("[name="+campo+"]").val(chapa);
	}
}

function papelRHUsuarioLogado(){
	var retorno = false;
	var IdUser = buscarMatriculaUsuarioLogado();
	var c1 = DatasetFactory.createConstraint("USUARIO", IdUser, IdUser, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("PAPEL", "28", "28", ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var datasetRM = DatasetFactory.getDataset("ds_FLUIG_retorna_papeisUsuarios", null, constraints, null);
	try{
		for(var i=0; i < datasetRM.values.length; i++) {
			retorno = true;
			$("[name=solicitanteRH]").val(true);
		}
		return retorno;
	}
	catch(e){
		retorno = false;
		$("[name=solicitanteRH]").val(false);
		return retorno;
	}
}

function regraSolicitante(){
	var papelRH = $("[name=solicitanteRH]").val();
	var funcGestao = $("[name=funcaoSolicitante]").val();
	var gestorProcesso = isUsuarioGestor(buscarMatriculaUsuarioLogado());
	
	if (funcGestao == "1" || papelRH == "true" || gestorProcesso == true){
	} else {	
		$(".dadosSolicitante").hide();
		$(".dadosTabelaSalarial").hide();		
		FLUIGC.toast({
			title : '',
			message : 'Voc\u00ea n\u00e3o tem permiss\u00e3o para abrir esse tipo de solicita\u00e7\u00e3o.',
			type : 'danger'
		});
	}
}

function buscaCCSolicitante(codCentroCusto){
	var chapa = $("[name=chapaSolicitante]").val();
	var coligada = $("[name=codColigada]").val();
	var c1 = DatasetFactory.createConstraint("CHAPA", chapa, chapa, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_centroCustoSolicitante", null, constraints, null);
	var cont = 0;
	for(var i=0; i < dataset.values.length; i++) {
		ccusto = dataset.values[i].CODCCUSTO;
		if (ccusto == codCentroCusto){
			cont ++;			
		}
	}
	if (cont == 0){
		window["obraSetor"].clear();
		FLUIGC.toast({
			title : '',
			message : 'Voc\u00ea n\u00e3o tem permiss\u00e3o nesta Obra/Setor.',
			type : 'danger'
		});
	}
}

function validaAlcadaAprovacao(codColigada, codCentroCusto){
	var c1 = DatasetFactory.createConstraint("codColigada", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("codCentroCusto", codCentroCusto, codCentroCusto, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_Busca_Alcada_Aprovacao", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		if(dataset.values[i].processoTabelaSalarial != 'on' && dataset.values[i].codColigada == codColigada && dataset.values[i].codCentroCusto == codCentroCusto){
			window["obraSetor"].clear();
			FLUIGC.toast({
				title : '',
				message : "A Obra/Setor selecionada n\u00e3o possui Al\u00e7ada de Aprova\u00e7\u00e3o configurada para este processo. Favor contatar a TI.",
				type : 'danger'
			});
		}
	}
}

/* ########### FIM REGRAS SOLICITANTE ############ */

/* ########### INICIO REGRAS APROVADORES ############ */

function aprovadores(){
	//var tipo = $("[name=tipo]").val();
	/*var codColigada = $("[name=codColigada]").val();
	var codSecao = $("[name=codSecao]").val();
	var c1 = DatasetFactory.createConstraint("TIPO", tipo, tipo, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODSECAO", codSecao, codSecao, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_aprovadoresNovaFuncao", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		$("[name=matrAprovadorGerente]").val(dataset.values[i].APGERENTE);
		$("[name=matrAprovadorDiretor]").val(dataset.values[i].APDIRETOR);		
	}*/
}

/* ########### FIM REGRAS APROVADORES ############ */

/* ########### INICIO FUNCOES ZOOMS ############ */

function aberturaFuncao(){
	
	var indice = wdkAddChild('tbFuncoesNovas'); 
	
	reloadZoomFilterValues("nivelFuncNova___" + indice, "CODCOLIGADA," + $("[name=codColigada]").val());
	reloadZoomFilterValues("secaoFuncNova___" + indice, "CODCOLIGADA," + $("[name=codColigada]").val() + ",CODCCUSTOMO," + $("[name=codCCObraSetor]").val());
	
	montaCamposSalarioADD("salarioFuncNova", indice, "");
	
	window["obraSetor"].disable(true);
	window["tabela"].disable(true);
	
}

function aberturaFuncaoNovaTabela(){
	
	var indice = wdkAddChild('tbFuncoesTabelaNova');

	reloadZoomFilterValues("nivelFuncTabelaNova___" + indice, "CODCOLIGADA," + $("[name=codColigada]").val());
	reloadZoomFilterValues("secaoFuncTabelaNova___" + indice, "CODCOLIGADA," + $("[name=codColigada]").val() + ",CODCCUSTOMO," + $("[name=codCCObraSetor]").val());
	
	montaCamposSalarioADD("salarioFuncTabelaNova", indice, "");
	
	window["obraSetor"].disable(true);
	window["tabela"].disable(true);
	
	return indice;
}

function fnCustomDelete(oElement, nameTable, classFieldSet) {
	fnWdkRemoveChild(oElement);
	
	if(getQtdFuncNova() + getQtdFuncTabelaNova() == 0){
		
		if(window['data-zoom_obraSetor'] != undefined)
			window["obraSetor"].disable(false);
		
		if(window['data-zoom_tabela'] != undefined)
			window["tabela"].disable(false);
	}
	
}

function getQtdFuncNova(){
	
	var qtd = 0;

	$("[name^=codNivelFuncNova___]").each(function() { qtd = qtd + 1; });
	
	return qtd;
	
}

function getQtdFuncTabelaNova(){
	
	var qtd = 0;

	$("[name^=codNivelFuncTabelaNova___]").each(function() { qtd = qtd + 1; });
	
	return qtd;
	
}

function removerLixeiraFuncNova(){
	$("[name^=btDeleteFuncNova]").hide();
	$("[name=botaoAddFuncao]").hide();
	$("#tbRateioProp tbody tr:gt(0)").each(function() {
		var img = $(this).find(".btDeleteFuncNova");
		img.remove();
	});
}

function removerLixeiraTabelaNova(){
	$("[name^=btDeleteFuncTabelaNova]").hide();	
	$("[name=botaoAddFuncaoTabelaNova]").hide();
	$("#tbRateioProp tbody tr:gt(0)").each(function() {
		var img = $(this).find(".btDeleteFuncTabelaNova");
		img.remove();
	});
}

/* ########### FIM FUNCOES ZOOMS ############ */

/* ########### INICIO FUNCOES PAI FILHO ############ */

function carregaFuncoesExistentes(){
	var myLoading1 = FLUIGC.loading(window);
	myLoading1.show();
	
		var CODUSUARIO = $("[name=codUsuario]").val();
		var coligada = $("[name=codColigada]").val();
		var tabela = $("[name=codTabela]").val();
		
		if (coligada != "" && tabela != ""){
				
			var c1 = DatasetFactory.createConstraint("CODUSUARIO", CODUSUARIO, CODUSUARIO, ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("CODCOLIGADA_I", coligada, coligada, ConstraintType.MUST);
			var c3 = DatasetFactory.createConstraint("CODTABELA", tabela, tabela, ConstraintType.MUST);
			var constraints = new Array(c1, c2, c3);
			var dataset = DatasetFactory.getDataset("ds_RM_retorna_funcoesTabelaSalarial", null, constraints, null);
			
			if(dataset.values == undefined){
				
				FLUIGC.toast({
					title : '',
					message : 'Erro ao consultar tabela salarial (ds_RM_retorna_funcoesTabelaSalarial).',
					type : 'danger'
				});
				
			}else if(dataset.values[0].CODFUNCAO != ""){
				
				var permite = permiteFuncaoGestao();			
			
				for(var i=0; i < dataset.values.length; i++) {
					
					if( !(dataset.values[i].GESTAO == "1" && permite == false) ) {
					
						var indice = wdkAddChild('tbFuncoesExistentes');
						$("#codNivelFuncExiste___" + indice).val(dataset.values[i].CODFUNCAO);
						$("#codFuncaoExistente___" + indice).val(dataset.values[i].CODFUNCAO);
						$("#nivelFuncExiste___" + indice).val(dataset.values[i].FUNCAO);
						$("#nomeFaixaFuncExiste___" + indice).val(dataset.values[i].NOMEFAIXA);
						$("#codFaixaFuncExiste___" + indice).val(dataset.values[i].CODFAIXA);
						
						var salario = formatNumber(dataset.values[i].SALARIO, 2, 3, ".", ",");
						$("#salarioFuncExiste___" + indice).val(salario);
						$("#novoSalario___" + indice).val(salario);
						
						$("#novoSalario___" + indice).maskMoney({
							showSymbol : true,
							symbol : "R$",
							thousands : '.',
							decimal : ',',
							precision : 2,
							allowNegative : true,
							allowZero : true
						});
						
					}
				}
			}else{
				
				FLUIGC.toast({
					title : '',
					message : 'Sem permissáo para visualizar funções da tabela salarial.',
					type : 'danger'
				});
			}
				
		}

	ocultaCamposAgrupamento();
	myLoading1.hide();

}

function changeFuncao(){
	var arrayPaiFilho = $( "[name^='codNivelFuncExiste___']" );
	var cont = 0;
	for (var i = 0; i < arrayPaiFilho.length; i++){
		
		var index = arrayPaiFilho[i].name.split("___");
		
		var salarioFuncExiste = $("[name=salarioFuncExiste___" + index[1]+"]").val()
		salarioFuncExiste = parseFloat((salarioFuncExiste).replace(".","").replace(",","."));
		
		var novoSalario = $("[name=novoSalario___" + index[1]+"]").val()
		novoSalario = parseFloat((novoSalario).replace(".","").replace(",","."));
		
		if (salarioFuncExiste == novoSalario){
			$("#btDeleteFuncoesExistentes___"+index[1]).trigger("click");
			cont ++;
		}
		
	}	
	if (cont == arrayPaiFilho.length){
		$(".titulo").hide();
	}
	if ($("[name=hiddenTipoAcao]").val() == "incluir"){
		$(".tituloNovaFuncao").hide();
		$(".tituloNovaTabela").show();
	} else {
		$(".tituloNovaFuncao").show();
		$(".tituloNovaTabela").hide();
	}
	
}

function changeSalarioFuncaoExistente(valor){
	var index = valor.id.substring(valor.id.lastIndexOf("_") + 1,valor.id.length);
	if ($("#"+valor.name).val() == "0,00"){
		
		var salario = $("#salarioFuncExiste___" + index).val();
		$("#"+valor.name).val(salario);		
		FLUIGC.toast({
			title : '',
			message : "N\u00e3o \u00e9 poss\u00edvel inserir sal\u00e1rio zerado.",
			type : 'danger'
		});	
		
	}else{
		var codColigada = $("[name=codColigada]").val();
		var codTabela = $("[name=codTabela]").val();
		var codFuncaoExistente = $("[name=codFuncaoExistente___"+index+"]").val();
		var codFaixaFuncExiste = $("[name=codFaixaFuncExiste___"+index+"]").val();
		
		var salarioFuncExiste = $("[name=salarioFuncExiste___"+index+"]").val()
		salarioFuncExiste = parseFloat((salarioFuncExiste).replace(".","").replace(",","."));
		
		var novoSalario = $("[name=novoSalario___"+index+"]").val();
		novoSalario = parseFloat((novoSalario).replace(".","").replace(",","."));
		
		
		var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("CODFUNCAO", codFuncaoExistente, codFuncaoExistente, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("CODTABELA", codTabela, codTabela, ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint("CODFAIXA", codFaixaFuncExiste, codFaixaFuncExiste, ConstraintType.MUST);
		var constraints = new Array(c1, c2, c3, c4);
		var datasetRM = DatasetFactory.getDataset("ds_ConsultaRM_WS205_RetornaValidacaoFuncAtivoTabelaSalarial", null, constraints, null);
		
		var QTD = datasetRM.values[0].QTD;
			if(QTD == ''){
				var salario = $("#salarioFuncExiste___" + index).val();
				$("#"+valor.name).val(salario);		
				FLUIGC.message
				.alert(
						{
							message : " N&atilde;o foi poss&iacute;vel validar exist&ecirc;ncia da fun&ccedil;&atilde;o e Tabela Salarial.",
							title : "Aten\u00e7\u00e3o",
							label : 'Ciente'
						}, function(el, ev) {
				});
			}else{
				if((parseInt(QTD) != 0) && (novoSalario < salarioFuncExiste )){
					var salario = $("#salarioFuncExiste___" + index).val();
					$("#"+valor.name).val(salario);		
					FLUIGC.message
					.alert(
							{
								message : " Existem Funcionários ativos utilizando esta tabela salarial e função, não é permitido redução salarial.",
								title : "Aten\u00e7\u00e3o",
								label : 'Ciente'
							}, function(el, ev) {
					});
				}
			}
	}
}
/*
function changeSalarioNovaFuncao(valor){
	if ($("#"+valor.name).val() == "0,00"){
		FLUIGC.toast({
			title : '',
			message : "N\u00e3o \u00e9 poss\u00edvel inserir sal\u00e1rio zerado.",
			type : 'danger'
		});	
	}
}
*/
function changeSalario(valor){
	
	if(valor.name == undefined || valor.name == "")
		valor.name = valor.id;
	
	if ($("#"+valor.name).val() == "0,00"){
		FLUIGC.toast({
			title : '',
			message : "N\u00e3o \u00e9 poss\u00edvel inserir sal\u00e1rio zerado.",
			type : 'danger'
		});
	}
	
	var campo = valor.name.split("_");
	var indice = valor.name.split("___");	
	setSalarioJSON(campo[0], indice[1]);
}

function clickMascaraSalario(valor){
	$("#"+valor.name).maskMoney({
		showSymbol : true,
		symbol : "R$",
		thousands : '.',
		decimal : ',',
		precision : 2,
		allowNegative : true,
		allowZero : true
	});
}


/* ########### FIM FUNCOES PAI FILHO ############ */

function getValorMonetario(valor) {
	var retorno = valor.split(".");
	var reais = retorno[0];
	var centavos = retorno[1].substring(0,2);
	var valorFormatado = reais + "," + centavos;
	return valorFormatado;
}

/* Verifica se o solicitante é aprovador */
function SolicitanteAprovador(){
	
	var IdUser = buscarMatriculaUsuarioLogado();
	
	var PapelAprovadorDiretor = $("[name=matrAprovadorDiretor]").val();
	PapelAprovadorDiretor = PapelAprovadorDiretor.replace("Pool:Role:", "");
	
	var PapelAprovadorGerente = $("[name=matrAprovadorGerente]").val();
	PapelAprovadorGerente = PapelAprovadorGerente.replace("Pool:Role:", "");
	
	if(UsuarioPapel(IdUser, PapelAprovadorDiretor) == true)
		$("[name=solicitanteAprovador]").val("Diretor");
	else if(UsuarioPapel(IdUser, PapelAprovadorGerente) == true)
		$("[name=solicitanteAprovador]").val("Gerente");
	else
		$("[name=solicitanteAprovador]").val("");

}

function UsuarioPapel(colleagueId, roleId){
	
	var c1 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", roleId, roleId, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('workflowColleagueRolePK.companyId', '1', '1', ConstraintType.MUST);

	var constraints = new Array(c1, c2, c3);
	var dataset = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);
	
	if(dataset.values[0] != undefined)
		if(dataset.values[0]["workflowColleagueRolePK.colleagueId"] == colleagueId && dataset.values[0]["workflowColleagueRolePK.roleId"] == roleId)
			return true;
		else
			return false;
	
}

function permiteFuncaoGestao(){
	
	var cargo = $("[name=cargoSolicitante]").val();
	var funcao = $("[name=codFuncaoSolicitante]").val();	
			
	if(cargo == "Gerente" || cargo == "Superintendente" || cargo == "Diretor")
		return true;
	else if (cargo == "Coordenador" && (funcao == "0059" || funcao == "0648" || funcao == "0651" || funcao == "0266"))
		return true;
	else
		return false;
	
}

function validaDataAlteracao() {
	$("[name=dataAlteracao]").blur(
		function() {

			var data = this.value;
			
			if(data != "" && data != undefined){
				
				var dataSel = new Date(data.split("/")[2], data.split("/")[1] - 1, data.split("/")[0]);
				
				var now = new Date();
				now.setHours(0, 0, 0, 0);
				
				if(now.getDate() <= 21){
				
					var inicioMes = addDays(now, 1 + now.getDate() *-1);
				
					if(dataSel < inicioMes){
						
						$("[name=dataAlteracao]").val("");
						FLUIGC.toast({
							title : '',
							message : 'Não é permitido alteração retroativa a meses anteriores.',
							type : 'danger'
						});
						
					}
				
				} else {
					
					var proxMes = addMonths(now, 1);
					proxMes = addDays(proxMes, 1 + now.getDate() *-1)
					
					if(dataSel < proxMes){
						
						$("[name=dataAlteracao]").val("");
						FLUIGC.toast({
							title : '',
							message : 'Solicitações realizadas ou aprovadas entre os dias 22 e 31 serão processadas somente na competência seguinte.<br><br>Informe uma data de alteração a partir do próximo mês.',
							type : 'danger'
						});			
			
					}
			
				}
				
			}
			
		});
}

function montaCamposSalarioADD(campo, indice, readonly){

	var arrayFaixaSalarial = JSON.parse($("#arrayFaixaSalarial").val());

	if($("#" + campo + "JSON" + '___' + indice).val() != "")
		var salarioJSON = JSON.parse($("#" + campo + "JSON" + '___' + indice).val());
	else
		var salarioJSON = "";
		
	var html = "";	

	html += '<div class="col-md-1"><label></label></div>';

	for(var i=0; i < arrayFaixaSalarial.length; i++){
		
		var salario = "0,00";
		if(salarioJSON != "" && salarioJSON != undefined){
		
			for(var j=0; j < salarioJSON.length; j++){
				
				if(salarioJSON[j].CODFAIXA == arrayFaixaSalarial[i].CODFAIXA)
					salario = salarioJSON[j].SALARIO;
			}
		}

		html += '<div class="col-md-2 salario">';
		html += 	'<label><b>' + arrayFaixaSalarial[i].NOMEFAIXA + '</b></label>';
		html += 	'<div class="input-group"><span class="input-group-addon"><span>R$</span></span>';
		html += 		'<input type="text" id="' + campo + '_' + arrayFaixaSalarial[i].CODFAIXA + '___' + indice + '" class="form-control" onchange="changeSalario(this);" value="' + salario + '" ' + readonly + ' />';
		html += 	'</div>';	
		html += '</div>';
		
	}
	
	$("#" + campo + "JSON___" + indice).parent().append(html);

	for(var i=0; i < arrayFaixaSalarial.length; i++){		

		$("#" + campo + "_" + arrayFaixaSalarial[i].CODFAIXA + "___" + indice).maskMoney({
			showSymbol : true,
			symbol : "R$",
			thousands : '.',
			decimal : ',',
			precision : 2,
			allowNegative : true,
			allowZero : true
		});
		
	}
	
	setSalarioJSON(campo, indice);

}

function montaCamposSalarioFuncNova(readonly){
	
	$("[name^=salarioFuncNovaJSON___]").each(function() {
		
		var indice = this.name.split("___");
		montaCamposSalarioADD("salarioFuncNova", indice[1], readonly);
		
	});
	
}

function montaCamposSalarioFuncTabelaNova(readonly){
	
	$("[name^=salarioFuncTabelaNovaJSON___]").each(function() {
		
		var indice = this.name.split("___");
		montaCamposSalarioADD("salarioFuncTabelaNova", indice[1], readonly);
		
	});
	
}

function setSalarioJSON(campo, indice){
	
	var arrayFaixaSalarial = JSON.parse($("#arrayFaixaSalarial").val());
	var arraySalario = [];
	
	for(var i=0; i < arrayFaixaSalarial.length; i++){
		
		var salario = {};
		
		salario.CODFAIXA = arrayFaixaSalarial[i].CODFAIXA;
		salario.SALARIO = $("#" + campo + "_" + arrayFaixaSalarial[i].CODFAIXA + "___" + indice).val();
		
		arraySalario.push(salario);
		
	}
	
	$("#" + campo + "JSON___" + indice).val(JSON.stringify(arraySalario));
	
}

// Exibição de registros "agrupado" por Código e Função
function ocultaCamposAgrupamento(){
	
	var registros = [];
	
	$("[name^=codNivelFuncExiste___]").each(function() {
		
		var reg = {};
		reg.indice = this.name.split("___")[1];
		reg.codFuncao = this.value;
		
		registros.push(reg);

	});
	
	var codFuncaoAnterior = "";
	for(var i = 0; i < registros.length; i++){
		
		if(registros[i].codFuncao == codFuncaoAnterior){
			$("[name=codNivelFuncExiste___" + registros[i].indice + "]").hide();
			$("[name=nivelFuncExiste___" + registros[i].indice + "]").hide();
		}
		
		codFuncaoAnterior = registros[i].codFuncao;
		
	}
	
}

function exibeSalarioFuncNova(){

	$("[name^=isFuncNova___]").each(function() {
		
		var indice = this.name.split("___")[1];

		if($("#isFuncNova" + underline + indice).val() == "1")
			$("#salarioFuncNovaJSON" + underline + indice).parent().show();
		else
			$("#salarioFuncNovaJSON" + underline + indice).parent().hide();

	});
	
}

function validarFuncAtivosFuncaoTabela(index){
	var codColigada = $("[name=codColigada]").val();
	var codTabela = $("[name=codTabela]").val();
	var codFuncaoExistente = $("[name=codFuncaoExistente___"+index+"]").val();
	
	var salarioFuncExiste = $("[name=salarioFuncExiste___"+index+"]").val()
	salarioFuncExiste = parseFloat((salarioFuncExiste).replace(".","").replace(",","."));
	
	var novoSalario = $("[name=novoSalario___"+index+"]").val();
	novoSalario = parseFloat((novoSalario).replace(".","").replace(",","."));
	
	
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODFUNCAO", codFuncaoExistente, codFuncaoExistente, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODTABELA", codTabela, codTabela, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3);
	var datasetRM = DatasetFactory.getDataset("ds_ConsultaRM_WS205_RetornaValidacaoFuncAtivoTabelaSalarial", null, constraints, null);
	
	var QTD = datasetRM.values[0].QTD;
		if(QTD == ''){
			FLUIGC.message
			.alert(
					{
						message : " N&atilde;o foi poss&iacute;vel validar exist&ecirc;ncia da fun&ccedil;&atilde;o e Tabela Salarial.",
						title : "Aten\u00e7\u00e3o",
						label : 'Ciente'
					}, function(el, ev) {
			});
		}else{
			if((parseInt(QTD) != 0) && (novoSalario < salarioFuncExiste )){
				FLUIGC.message
				.alert(
						{
							message : " Existem Funcionários ativo utilizando esta tabela salarial e função, não é permitido .",
							title : "Aten\u00e7\u00e3o",
							label : 'Ciente'
						}, function(el, ev) {
				});
			}
		}
	
}

function isUsuarioGestor(colleagueId){
	
	var PapelAprovador = 46; // Papel 46 - WRH - Gestor Processos
	var resultado = false;

	var c1 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", PapelAprovador, PapelAprovador, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId", "1", "1", ConstraintType.MUST);

	var constraints = new Array(c1, c2, c3);
	var datasetRM = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);

	if (datasetRM.values != undefined && datasetRM.values != null){
	
		if(datasetRM.values.length > 0)
			resultado = true;
	}
	
	return resultado;
}