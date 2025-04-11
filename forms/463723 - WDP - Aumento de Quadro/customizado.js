var underline = "___";


setTimeout(function() {

	setFilterZoomPeriodo();
	setFilterZoomEquipeSEO();
	setFilterZoomHorario();
}, 1000);

function setFilterZoomPeriodo() {

	if (window['data-zoom_periodo'] == undefined) {
		setTimeout(setFilterZoomPeriodo, 500);
	} else {
		var codColigada = $("[name=codColigada]").val();
		reloadZoomFilterValues("periodo", "CODCOLIGADA," + codColigada);
	}
}

function setFilterZoomEquipeSEO() {

	if (window['data-zoom_equipeSEO'] == undefined) {
		setTimeout(setFilterZoomEquipeSEO, 500);
	} else {
		var codColigada = $("[name=codColigada]").val();
		var idreq = $("[name=numRequisicaoSelecao]").val();
		reloadZoomFilterValues("equipeSEO", "CODCOLIGADA," + codColigada
				+ ",IDREQ," + idreq);
	}
}

function setFilterZoomHorario() {

	if (window['data-zoom_horario'] == undefined) {
		setTimeout(setFilterZoomHorario, 500);
	} else {
		var codColigada = $("[name=codColigada]").val();
		reloadZoomFilterValues("horario", "PARAM_CODCOLIGADA," + codColigada);
	}
}

function setFilterZoomHorario() {

	if (window['data-zoom_horario'] == undefined) {
		setTimeout(setFilterZoomHorario, 500);
	} else {
		var codColigada = $("[name=codColigada]").val();
		reloadZoomFilterValues("horario", "PARAM_CODCOLIGADA," + codColigada);
	}
}

$(function() {

	var atividadeAtual = buscarAtividadeAtual();
	aplicarManscaraCampos();
	if (atividadeAtual == taskInicio_0 || atividadeAtual == taskInicio && (FORM_MODE != "NONE")) {
		$(".indicacoes").hide();
		$(".HstReprovacao").hide();
		$(".avaliacao").hide();
		$(".selecao").hide();
		$(".aprovacaoTestesValida").hide();
		$(".aprovacaoSuperior").hide();
		$(".aprovacaoSuperior2").hide();
		$(".infoComplementares").hide();
		$(".divDocPessoal").hide();
		$(".validarDoc").hide();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").hide();
		$(".admissao").hide();
		$(".cracha").hide();
		$(".seguranca").hide();
		$(".divDocContratual").hide();
		$(".cancelamento").hide();

	} else if (atividadeAtual == taskProcessoSeletivoRH && FORM_MODE == "MOD") {
		FLUIGC.calendar("#dataContato", {
			pickDate : true,
			pickTime : false,
		});
		FLUIGC.calendar("#dataChegada", {
			pickDate : true,
			pickTime : false,
		});
		FLUIGC.calendar("#dataPrevAdmissao", {
			pickDate : true,
			pickTime : false,
		});
		ativarChangeValidarDt();
		aplicarMascaraCampos();
		aprovadores();
		montaIndicacaoWRH01();
		montaIndicacaoWIDGET();
		$(".indicacoes").show();

		if ($("[name=HstRepData___1]").val() == ""
				|| $("[name=HstRepData___1]").val() == undefined)
			$(".HstReprovacao").hide();
		else
			$(".HstReprovacao").show();

		$(".avaliacao").show();
		$(".salario").show();
		$(".selecao").show();
		$(".aprovacaoTestesValida").hide();
		$(".aprovacaoSuperior").hide();
		$(".aprovacaoSuperior2").hide();

		if (retornaCandidato()) {
			$(".divDocPessoal").show();
		} else {
			$(".divDocPessoal").hide();
		}

		$(".infoComplementares").hide();
		$(".validarDoc").hide();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").hide();
		$(".admissao").hide();
		$(".cracha").hide();
		$(".seguranca").hide();
		$(".divDocContratual").hide();
		$(".cancelamento").hide();
		alertaCandidatoReprovadoEscopoObra();
		verCandidatoIndicado();

	} else if (atividadeAtual == taskProcessoSeletivoDP && FORM_MODE == "MOD") {
		FLUIGC.calendar("#dataContato", {
			pickDate : true,
			pickTime : false,
		});
		FLUIGC.calendar("#dataChegada", {
			pickDate : true,
			pickTime : false,
		});
		FLUIGC.calendar("#dataPrevAdmissao", {
			pickDate : true,
			pickTime : false,
		});

		ativarChangeValidarDt();
		aplicarMascaraCampos();
		aprovadores();
		montaIndicacaoWRH01();
		montaIndicacaoWIDGET();
		$(".indicacoes").show();
		$(".dependentes").show();
		ativarchangeValidaCpf();
		validarContaCorrente();
		//validaBancario();
		$(".tipoConta").show();

		if ($("[name=HstRepData___1]").val() == ""
				|| $("[name=HstRepData___1]").val() == undefined)
			$(".HstReprovacao").hide();
		else
			$(".HstReprovacao").show();

		$(".avaliacao").show();
		$(".salario").show();
		$(".selecao").show();
		$(".aprovacaoTestesValida").hide();
		$(".aprovacaoTestesReprovados").hide();
		$(".aprovacaoSuperior").hide();
		$(".aprovacaoSuperior2").hide();

		if (retornaCandidato()) {

			$(".infoComplementares").show();
			camposComplementares();
			$(".divDocPessoal").show();
			montaDependente();
			dtNascimentoDependCalendar();

		} else {
			$(".infoComplementares").hide();
			$(".divDocPessoal").hide();

		}

		$(".validarDoc").hide();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").hide();
		$(".admissao").hide();
		$(".cracha").hide();
		$(".seguranca").hide();
		$(".divDocContratual").hide();
		$(".cancelamento").hide();

		alertaCandidatoReprovadoEscopoObra();
		verCandidatoIndicado();
		verificaMesmoAprovadorWRH01();

	} else if (atividadeAtual == taskConferirTestes && FORM_MODE == "MOD") {
		$(".indicacoes").hide();
		$(".HstReprovacao").hide();
		retornaAvaliacao(true);
		$(".avaliacao").show();
		$(".salario").show();
		$(".selecao").show();
		$(".aprovacaoTestesValida").show();
		$(".aprovacaoTestesReprovados").hide();
		$(".aprovacaoSuperior").hide();
		$(".aprovacaoSuperior2").hide();
		$(".validarDoc").hide();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").hide();
		$(".admissao").hide();
		$(".cracha").hide();
		$(".seguranca").hide();
		$(".infoComplementares").hide();
		$(".divDocPessoal").hide();
		$(".divDocContratual").hide();

		infoTesteSolda();
	} else if (atividadeAtual == taskTestesReprovadosRH && FORM_MODE == "MOD") {
		$(".indicacoes").hide();
		$(".HstReprovacao").hide();
		retornaAvaliacao(true);
		$(".avaliacao").show();
		$(".salario").show();
		$(".selecao").show();
		$(".aprovacaoTestesValida").show();
		$(".aprovacaoTestesReprovados").show();
		$(".aprovacaoSuperior").hide();
		$(".aprovacaoSuperior2").hide();
		$(".validarDoc").hide();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").hide();
		$(".admissao").hide();
		$(".cracha").hide();
		$(".seguranca").hide();
		$(".infoComplementares").hide();
		$(".divDocPessoal").hide();
		$(".divDocContratual").hide();

		infoTestesReprovadosRH();
	} else if (atividadeAtual == taskAprovarCandidatoSolicitante && FORM_MODE == "MOD") {
		$(".indicacoes").hide();
		$(".HstReprovacao").hide();
		retornaAvaliacao(true);
		$(".avaliacao").show();
		$(".salario").show();
		$(".selecao").show();
		$(".aprovacaoTestesValida").hide();
		$(".aprovacaoSuperior").show();
		$(".aprovacaoSuperior2").hide();
		$(".validarDoc").hide();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").hide();
		$(".admissao").hide();
		$(".cracha").hide();
		$(".seguranca").hide();
		$(".infoComplementares").hide();
		$(".divDocPessoal").hide();
		$(".divDocContratual").hide();
		$(".cancelamento").hide();

		verificaMesmoAprovador();
		infoTesteSolda();
	} else if (atividadeAtual == taskAprovarCandidatoGestor && FORM_MODE == "MOD") {
		$(".indicacoes").hide();
		$(".HstReprovacao").hide();
		retornaAvaliacao(true);
		$(".avaliacao").show();
		$(".salario").show();
		$(".selecao").show();
		$(".aprovacaoTestesValida").hide();
		$(".aprovacaoSuperior").show();
		$(".aprovacaoSuperior2").show();
		$(".infoComplementares").hide();
		$(".divDocPessoal").hide();
		$(".validarDoc").hide();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").hide();
		$(".admissao").hide();
		$(".cracha").hide();
		$(".seguranca").hide();
		$(".divDocContratual").hide();
		$(".cancelamento").hide();
		infoTesteSolda();
		validarAlertaDeClassificacao();
	} else if (atividadeAtual == taskAgendarExamesAdmissionais && FORM_MODE == "MOD") {
		alertaPCD();
		$(".indicacoes").hide();
		$(".HstReprovacao").hide();
		$(".avaliacao").hide();
		$(".salario").hide();
		$(".selecao").show();
		$(".aprovacaoTestesValida").hide();
		$(".aprovacaoSuperior").hide();
		$(".aprovacaoSuperior2").hide();
		$(".infoComplementares").show();
		$(".divDocPessoal").hide();
		$(".validarDoc").hide();
		$(".agendarExames").show();
		$(".medicinaTrabalho").hide();
		$(".admissao").hide();
		$(".cracha").hide();
		$(".seguranca").hide();
		$(".divDocContratual").hide();
		$(".cancelamento").hide();
	} else if (atividadeAtual == taskDocumentacaoPendente && FORM_MODE == "MOD") {
		$(".indicacoes").hide();
		$(".HstReprovacao").hide();
		$(".avaliacao").hide();
		$(".salario").hide();
		$(".selecao").show();
		$(".aprovacaoTestesValida").hide();
		$(".aprovacaoSuperior").hide();
		$(".aprovacaoSuperior2").hide();
		$(".infoComplementares").hide();
		$(".divDocPessoal").show();
		$(".validarDoc").show();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").hide();
		$(".admissao").hide();
		$(".cracha").hide();
		$(".seguranca").hide();
		$(".divDocContratual").hide();
		$(".cancelamento").hide();
		alertaGEDPessoa();
	} else if (atividadeAtual == taskRealizarExamesAdmissionais && FORM_MODE == "MOD") {
		retornaASO();
		alertaPCD();
		$(".indicacoes").hide();
		$(".HstReprovacao").hide();
		$(".avaliacao").hide();
		$(".salario").hide();
		$(".selecao").show();
		$(".aprovacaoTestesValida").hide();
		$(".aprovacaoSuperior").hide();
		$(".aprovacaoSuperior2").hide();
		$(".infoComplementares").show();
		$(".divDocPessoal").hide();
		$(".validarDoc").show();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").show();
		$(".admissao").show();
		$(".cracha").hide();
		$(".seguranca").hide();
		$(".divDocContratual").hide();
	} else if (atividadeAtual == taskValidarDocumentacao && FORM_MODE == "MOD") {

		var dataMaxASO = new Date();
		var dataMinASO = new Date();
		dataMinASO.setDate(dataMinASO.getDate() - 90);
		FLUIGC.calendar("#dataEmissaoASO", {
			pickDate : true,
			pickTime : false,
		}).setMinDate(dataMinASO);
		FLUIGC.calendar("#dataEmissaoASO", {
			pickDate : true,
			pickTime : false,
		}).setMaxDate(dataMaxASO);

		$(".indicacoes").hide();
		$(".HstReprovacao").hide();
		$(".avaliacao").hide();
		$(".salario").hide();
		$(".selecao").show();
		$(".aprovacaoTestesValida").hide();
		$(".aprovacaoSuperior").hide();
		$(".aprovacaoSuperior2").hide();
		$(".infoComplementares").hide();
		$(".divDocPessoal").show();
		$(".validarDoc").show();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").hide();
		$(".admissao").hide();
		$(".cracha").hide();
		$(".seguranca").hide();
		$(".divDocContratual").hide();
		alertaGEDPessoa();
	} else if (atividadeAtual == taskAdmitirColaborador && FORM_MODE == "MOD") {
		retornaChapa();
		$("#indicacoes").hide();
		$(".botaoAddDependente").hide();
		$(".btDeleteDependente").hide();
		$(".HstReprovacao").hide();
		$(".avaliacao").hide();
		$(".salario").show();
		$(".selecao").show();
		$(".aprovacaoTestesValida").hide();
		$(".aprovacaoSuperior").show();
		$(".aprovacaoSuperior2").show();
		$(".infoComplementares").show();
		$(".divDocPessoal").hide();
		camposComplementares();
		$(".validarDoc").show();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").hide();
		$(".admissao").show();
		$(".cracha").hide();
		$(".seguranca").hide();
		$(".divDocContratual").hide(); 
		$(".nomeDependente").hide();

	} else if (atividadeAtual == taskEntregarCracha && FORM_MODE == "MOD") {
		$(".indicacoes").hide();
		$(".HstReprovacao").hide();
		$(".avaliacao").hide();
		$(".salario").hide();
		$(".selecao").show();
		$(".aprovacaoTestesValida").hide();
		$(".aprovacaoSuperior").hide();
		$(".aprovacaoSuperior2").hide();
		$(".infoComplementares").hide();
		$(".divDocPessoal").hide();
		$(".validarDoc").hide();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").hide();
		$(".admissao").show();
		$(".cracha").show();
		$(".seguranca").show();
		$(".divDocContratual").show();
		FLUIGC.calendar("#dataSolicCracha", {
			pickDate : true,
			pickTime : false,
		});
		FLUIGC.calendar("#dataLiberaCracha", {
			pickDate : true,
			pickTime : false,
		});
		ativarChangeValidarDt();
		aplicarMascaraCampos();
		alertaGEDFuncionario();

	} else if (atividadeAtual == taskTreinarColaborador && FORM_MODE == "MOD") {
		$(".indicacoes").hide();
		$(".HstReprovacao").hide();
		$(".avaliacao").hide();
		$(".salario").hide();
		$(".selecao").show();
		$(".aprovacaoTestesValida").hide();
		$(".aprovacaoSuperior").hide();
		$(".aprovacaoSuperior2").hide();
		$(".infoComplementares").hide();
		$(".divDocPessoal").hide();
		$(".validarDoc").hide();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").hide();
		$(".admissao").show();
		$(".cracha").hide();
		$(".seguranca").show();
		$(".divDocContratual").hide();
		FLUIGC.calendar("#dataTreinaMIP", {
			pickDate : true,
			pickTime : false,
		});
		FLUIGC.calendar("#dataTreinaCliente", {
			pickDate : true,
			pickTime : false,
		});
		ativarChangeValidarDt();
		aplicarMascaraCampos();
	} else if (FORM_MODE == "VIEW" || atividadeAtual == 245 || atividadeAtual == taskRecursosComputacionais) {
		montaIndicacaoWRH01();
		montaIndicacaoWIDGET();
		$(".botaoAddDependente").hide();
		$(".btDeleteDependente").hide();
		$(".indicacoes").show();
		$(".HstReprovacao").hide();
		$(".salario").hide();
		$(".selecao").show();
		$(".aprovacaoTestesValida").hide();
		$(".avaliacao").hide();
		$(".aprovacaoSuperior").hide();
		$(".aprovacaoSuperior2").hide();
		$(".infoComplementares").show();
		$(".divDocPessoal").hide();
		camposComplementares();
		$(".validarDoc").show();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").hide();
		$(".admissao").show();
		$(".cracha").hide();
		$(".seguranca").hide();
		$(".divDocContratual").hide();
		$(".cancelamento").hide();
	} else if (atividadeAtual == taskValidaFuncAtivo) {
		$(".indicacoes").show();
		$(".HstReprovacao").hide();
		$(".salario").hide();
		$(".selecao").show();
		$(".aprovacaoTestesValida").hide();
		$(".avaliacao").hide();
		$(".aprovacaoSuperior").hide();
		$(".aprovacaoSuperior2").hide();
		$(".infoComplementares").show();
		$(".divDocPessoal").hide();
		$(".validarDoc").hide();
		$(".agendarExames").hide();
		$(".medicinaTrabalho").hide();
		$(".admissao").hide();
		$(".cracha").hide();
		$(".seguranca").hide();
		$(".divDocContratual").hide();
		$(".cancelamento").show();

		var idReq = $("#numRequisicaoSelecao").val();
		var coligada = $("[name=codColigada]").val();
		var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("IDREQ", idReq, idReq, ConstraintType.MUST);
		var constraints = new Array(c1, c2);
		var dataset = DatasetFactory.getDataset("ds_RM_retorna_candidato", null, constraints, null);

		var mensagem = "";

		for (var i = 0; i < dataset.values.length; i++) {
			if (dataset.values[i].NOME != "") {
				var CPF = dataset.values[i].CPF;

				if (CPF != $("#cpfCandidato").val()) {
					$("[name=validarCpfDiferente]").val('1');

					FLUIGC.message.alert({
										message : "CPF informado na requisição no RM ("
												+ idReq
												+ ") está diferente do CPF desta solicitação. Caso queira alterar o candidato neste processo o mesmo deverá ser cancelado com a opçãp de reabertura.",
										title : "Aten\u00e7\u00e3o",
										label : 'Ciente'
									}, function(el, ev) {

									});
				} else {
					$("[name=validarCpfDiferente]").val('');
				}

				if ((dataset.values[i].EX_CARGO).toUpperCase() != 'MEDICO') {
					var candidatoAtivoMesmaColigada = (dataset.values[i].EX_CHAPA != ""
							&& dataset.values[i].EX_DATADEMISSAO == ""
							&& dataset.values[i].EX_CODCOLIGADA == coligada && dataset.values[i].EX_CODSITUACAO != "D");
					var candidatoAtivoOutraColigada = (dataset.values[i].EX_CHAPA != ""
							&& dataset.values[i].EX_DATADEMISSAO == ""
							&& dataset.values[i].EX_CODCOLIGADA != coligada
							&& dataset.values[i].EX_CODSITUACAO != "D" && dataset.values[i].EX_CODSITUACAO != "C");

					if (candidatoAtivoMesmaColigada == true
							|| candidatoAtivoOutraColigada == true) {
						$("[name=validarSolicitDesligamento]").val('1');

						FLUIGC.message
								.alert(
										{
											message : "Candidato Identificado como Ativo no RM- COLIGADA: "
													+ dataset.values[i].EX_CODCOLIGADA
													+ " CHAPA: "
													+ dataset.values[i].EX_CHAPA,
											title : "Aten\u00e7\u00e3o",
											label : 'Ciente'
										}, function(el, ev) {

										});

					} else {
						$("[name=validarSolicitDesligamento]").val('');
					}
				}

			} else {
				FLUIGC.message
						.alert(
								{
									message : "Erro ao consultar Status do Candidato. Favor entrar em contato com TI ",
									title : "Aten\u00e7\u00e3o",
									label : 'Ciente'
								}, function(el, ev) {

								});
			}
		}
	}
});

function camposComplementares() {
	/*
	 * var tipo = $("[name=tipoVaga]").val(); if (tipo == "sede"){
	 * $(".alimentacao").hide(); $(".cestaBasica").show();
	 * $(".mobiDesmobilizacao").hide(); $(".planoSaude").show();
	 * $(".viagens").hide(); $(".periodo").hide(); $(".localidade").hide();
	 * $(".horario").show(); $(".indiceHorario").show();
	 * $(".codEquipeSEO").hide(); $(".experiencia").hide();
	 * $(".contratoExp").show(); $(".alojado").show();
	 * $(".descAlojamento").show(); $(".indicacoes").hide();
	 * $(".observacao").show(); } else { $(".alimentacao").show();
	 * $(".cestaBasica").show(); $(".mobiDesmobilizacao").show();
	 * $(".planoSaude").show(); $(".viagens").show(); $(".periodo").show();
	 * $(".localidade").show(); $(".horario").show();
	 * $(".indiceHorario").show(); $(".codEquipeSEO").show();
	 * $(".experiencia").show(); $(".contratoExp").show(); $(".alojado").show();
	 * $(".descAlojamento").show(); $(".indicacoes").show();
	 * $(".observacao").show(); }
	 */
}


function retornaCandidato() {
	try {

		var idReq = $("#numRequisicaoSelecao").val();
		var coligada = $("[name=codColigada]").val();
		var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("IDREQ", idReq, idReq, ConstraintType.MUST);
		var constraints = new Array(c1, c2);
		var dataset = DatasetFactory.getDataset("ds_RM_retorna_candidato", null, constraints, null);

		var retorno = false;
		var mensagem = "";

		for (var i = 0; i < dataset.values.length; i++) {

			if (dataset.values[i].NOME != '') {

				if (dataset.values[i].CLASSIFICACAO == "Inapto") {
					FLUIGC.message.alert(
									{
										message : "Encontrado divergências no cadastro do candidato indicado no RM, Favor entrar em contato com o RH da SEDE. Solicitar ao RH que verifique a Classificação do Candidato.  ",
										title : "Aten\u00e7\u00e3o",
										label : 'Ciente'
									}, function(el, ev) {

									});
					retorno = false;
				} else {

					var permiteReadmissao = excecaoReadmissao(dataset.values[i].CPF);
					var candidatoAtivoMesmaColigada = (dataset.values[i].EX_CHAPA != ""
							&& dataset.values[i].EX_DATADEMISSAO == ""
							&& dataset.values[i].IDREQDESLIGAMENTO == ""
							&& dataset.values[i].EX_CODCOLIGADA == coligada && dataset.values[i].EX_CODSITUACAO != "D");
					var candidatoAtivoOutraColigada = (dataset.values[i].EX_CHAPA != ""
							&& dataset.values[i].EX_DATADEMISSAO == ""
							&& dataset.values[i].IDREQDESLIGAMENTO == ""
							&& dataset.values[i].EX_CODCOLIGADA != coligada
							&& dataset.values[i].EX_CODSITUACAO != "D" && dataset.values[i].EX_CODSITUACAO != "C");

					if ((candidatoAtivoMesmaColigada == true || candidatoAtivoOutraColigada == true)
							&& (dataset.values[i].EX_CARGO != 'Medico')) {
						FLUIGC
								.toast({
									title : '',
									message : "Colaborador "
											+ dataset.values[i].NOME
											+ " com registro ativo na coligada "
											+ dataset.values[i].EX_CODCOLIGADA
											+ ", chapa "
											+ dataset.values[i].EX_CHAPA
											+ ".<br><br>Necessário abrir e aprovar requisição de desligamento WRH03 para o mesmo antes de associá-lo a um novo processo de admissão.",
									type : 'danger'
								});
						retorno = false;
					} else if (permiteReadmissao == false
							&& dataset.values[i].EX_DATADEMISSAO == ""
							&& dataset.values[i].CPF != ""
							&& dataset.values[i].CPF != undefined
							&& dataset.values[i].EX_CODSITUACAO != "C"
							&& (dataset.values[i].EX_CARGO.toUpperCase() == "COORDENADOR"
									|| dataset.values[i].EX_CARGO.toUpperCase() == "COORDENADOR FINANCEIRO"
									|| dataset.values[i].EX_CARGO.toUpperCase() == "ENGENHEIRO"
									|| dataset.values[i].EX_CARGO.toUpperCase() == "SUPERVISOR" || dataset.values[i].EX_CARGO
									.toUpperCase() == "SUPERVISOR ADMINISTRATIVO")) {

						FLUIGC
								.toast({
									title : '',
									message : "Candidato já é funcionário: "
											+ dataset.values[i].EX_CHAPA
											+ " - "
											+ dataset.values[i].NOME
											+ ".<br><br>Não é permitido a readmissão de Coordenadores, Engenheiros e Supervisores no período de 6 meses após o desligamento.",
									type : 'danger'
								});
						retorno = false;

					} else if (permiteReadmissao == false
							&& dataset.values[i].EX_DATADEMISSAO != ""
							&& dataset.values[i].TEMPO_READMISSAO < 180
							&& dataset.values[i].EX_CODSITUACAO != "C"
							&& (dataset.values[i].EX_CARGO.toUpperCase() == "COORDENADOR"
									|| dataset.values[i].EX_CARGO.toUpperCase() == "COORDENADOR FINANCEIRO"
									|| dataset.values[i].EX_CARGO.toUpperCase() == "ENGENHEIRO"
									|| dataset.values[i].EX_CARGO.toUpperCase() == "SUPERVISOR" || dataset.values[i].EX_CARGO
									.toUpperCase() == "SUPERVISOR ADMINISTRATIVO")) {

						FLUIGC
								.toast({
									title : '',
									message : dataset.values[i].NOME
											+ " foi desligado dia "
											+ dataset.values[i].EX_DATADEMISSAO
											+ ".<br><br>Não é permitido a readmissão de Coordenadores, Engenheiros e Supervisores no período de 6 meses após o desligamento.",
									type : 'danger'
								});
						retorno = false;

					} else if (dataset.values[i].QTDANEXOS > 0) {

						var msgFunc = "NOME: " + dataset.values[i].NOME
								+ "<br>" + "CODPESSOA: "
								+ dataset.values[i].CODIGO;

						if (dataset.values[i].OBRIGATORIOS == "") {
							$("[name=nomeCandidato]").val(dataset.values[i].NOME);
							$("[name=cidade]").val(dataset.values[i].CIDADE);
							$("[name=qtdAnexos]").val(dataset.values[i].QTDANEXOS);
							var CLASSIFICACAO = dataset.values[i].CLASSIFICACAO;

							if (CLASSIFICACAO == 'Apto com restrições') {
								FLUIGC.toast({
											title : '',
											message : "Favor se atentar para a Avaliação do Candidato - "
													+ dataset.values[i].NOME
													+ ",  a classificação do mesmo é (Apto com restrições) .",
											type : 'warning',
											timeout : 60000
										});
							}

							$("[name=classificacao]").val(CLASSIFICACAO);
							$("[name=aso]").val(dataset.values[i].SITUACAO_ASO);
							$("[name=aprovacaoMedicina]").val(dataset.values[i].SITUACAO_ASO);
							$("[name=chapaCandidato]").val(dataset.values[i].CHAPA);
							$("[name=cpfCandidato]").val(dataset.values[i].CPF);
							$("[name=codPessoa]").val(dataset.values[i].CODIGO);
							$("[name=avaliacao]").val(dataset.values[i].AVALIACAO.replace(/#13/g,"\n"));
							$("[name=hiddenExigeLaudo]").val(dataset.values[i].EXIGELAUDOOBRA);
							$("[name=hiddenLaudo]").val(dataset.values[i].LAUDO);
							$("[name=hiddenLaudoApto]").val(dataset.values[i].LAUDOAPTO);
							$("[name=hiddenExigeProva]").val(dataset.values[i].EXIGEPROVA);
							$("[name=hiddenResultadoProva]").val(dataset.values[i].RESULTADOPROVA);
							$("[name=hiddenRecursoComput]").val(dataset.values[i].RECURSOCOMP);
							$("[name=RGCandidato]").val(dataset.values[i].CARTIDENTIDADE);
							$("[name=Nascimento]").val(dataset.values[i].DTNASCIMENTO);
							$("[name=pis]").val(dataset.values[i].PISPASEP);
							$("[name=emailCandidato]").val(dataset.values[i].EMAIL);
							$("[name=telefone1Candidato]").val(dataset.values[i].TELEFONE1);
							$("[name=telefone2Candidato]").val(dataset.values[i].TELEFONE2);
							$("[name=telefone3Candidato]").val(dataset.values[i].TELEFONE3);
							$("[name=aprovacao]").val("");
							$("[name=justificativa]").val("");
							$("[name=aprovacao2]").val("");
							$("[name=justificativa2]").val("");

							setDescricaoLaudo();
							setContratoExp();

							retorno = alertasSelecao(msgFunc);

						} else {
							mensagem = "É necessário preencher os campos obrigatórios no RM: <br><br> Candidato: "
									+ dataset.values[i].NOME
									+ "<br><br>Campos:"
									+ dataset.values[i].OBRIGATORIOS.replace(/#13/g, "<br>");
							retorno = false;
						}
					} else {
						mensagem = "Documenta\u00e7\u00e3o pessoal ainda n\u00e3o foi anexada no TOTVS RM, cadastro de PESSOAS.<br><br>"
								+ dataset.values[i].CODIGO
								+ " - "
								+ dataset.values[i].NOME;
						retorno = false;
					}
				}
			} else {
				mensagem = "Para esta requisi\u00e7\u00e3o de Aumento de Quadro, ainda n\u00e3o foi inclu\u00eddo candidato em processo de admiss\u00e3o no RM.";
				retorno = false;
			}
		}
	} catch (e) {

		mensagem = "Erro ao tentar consultar candidato selecionado no TOTVS RM (ds_RM_retorna_candidato).";
		retorno = false;

	} finally {

		if (retorno == false) {

			$("[name=nomeCandidato]").val("");
			$("[name=cidade]").val("");
			$("[name=qtdAnexos]").val("");
			$("[name=classificacao]").val("");
			$("[name=aso]").val("");
			$("[name=aprovacaoMedicina]").val("");
			$("[name=chapaCandidato]").val("");
			$("[name=cpfCandidato]").val("");
			$("[name=codPessoa]").val("");
			$("[name=avaliacao]").val("");
			$("[name=hiddenExigeLaudo]").val("");
			$("[name=hiddenLaudo]").val("");
			$("[name=hiddenLaudoApto]").val("");
			$("[name=hiddenExigeProva]").val("");
			$("[name=hiddenResultadoProva]").val("");
			$("[name=hiddenRecursoComput]").val("");

			if (mensagem != "") {
				FLUIGC.toast({
					title : '',
					message : mensagem,
					type : 'danger'
				});
			}

			return false;

		} else
			return true;

	}

}

function retornaASO() {
	var idReq = $("#numRequisicaoSelecao").val();
	var coligada = $("[name=codColigada]").val();
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada,
			ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDREQ", idReq, idReq,
			ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_candidato", null,
			constraints, null);
	try {
		for (var i = 0; i < dataset.values.length; i++) {
			if (dataset.values[i].SITUACAO_ASO != "") {
				$("[name=aprovacaoMedicina]").val(
						dataset.values[i].SITUACAO_ASO);
			} else {
				FLUIGC
						.toast({
							title : '',
							message : "ASO admissional ainda n\u00e3o foi cadastrado para a Pessoa no RM.",
							type : 'danger'
						});
			}
		}
	} catch (e) {
		FLUIGC
				.toast({
					title : '',
					message : "ASO admissional ainda n\u00e3o foi cadastrado para a Pessoa no RM.",
					type : 'danger'
				});
	}
}

function retornaChapa() {
	var idReq = $("#numRequisicaoSelecao").val();
	var coligada = $("[name=codColigada]").val();
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada,
			ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDREQ", idReq, idReq,
			ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_candidato", null,
			constraints, null);
	try {
		for (var i = 0; i < dataset.values.length; i++) {
			if (dataset.values[i].CHAPA != "") {
				$("[name=chapaFunc]").val(dataset.values[i].CHAPA);
				$("[name=dataAdmissao]").val(
						ajustarDataServidor(dataset.values[i].DATAADMISSAO));
			} else {
				FLUIGC.toast({
					title : '',
					message : "Candidado ainda n\u00e3o foi admitido.",
					type : 'danger'
				});
			}
		}
	} catch (e) {
		FLUIGC.toast({
			title : '',
			message : "Candidado ainda n\u00e3o foi admitido.",
			type : 'danger'
		});
	}
}

function ajustarDataServidor(data) {
	if (data != "") {
		data = data.split("T");
		var dataFinal = data[0];
		var split = dataFinal.split('-');
		return split[2] + '/' + split[1] + '/' + split[0];
	} else {
		return "";
	}
}

function alertasSelecao(msgFunc) {

	verificaSoldador(msgFunc);

	/*if ($("[name=tipoVaga]").val() == "sede") {

		if ($("[name=hiddenLaudo]").val() != "1") {
			FLUIGC.toast({
				title : '',
				message : msgFunc + "<br>Realizar Avaliação de Segurança.",
				type : 'danger'
			});
			return false;
		} else {
			if ($("[name=hiddenLaudoApto]").val() == "0") {
				FLUIGC
						.toast({
							title : '',
							message : msgFunc
									+ "<br>Avaliação de Segurança: Inapto - Não recomendável a contratação.",
							type : 'danger'
						});
				return false;
			} else if ($("[name=hiddenLaudoApto]").val() == "") {
				FLUIGC.toast({
					title : '',
					message : msgFunc + "<br>Realizar Avaliação de Segurança.",
					type : 'danger'
				});
				return false;
			}
		}

	} else */
	if ($("[name=tipoVaga]").val() == "obra") {
		if ($("[name=hiddenExigeLaudo]").val() == "1") {
			if ($("[name=hiddenLaudo]").val() != "1") {
				FLUIGC.toast({
					title : '',
					message : msgFunc + "<br>Realizar Avaliação de Segurança.",
					type : 'danger'
				});
				return false;
			} else {
				if ($("[name=hiddenLaudoApto]").val() == "0") {
					FLUIGC
							.toast({
								title : '',
								message : msgFunc
										+ "<br>Avaliação de Segurança: Inapto - Não recomendável a contratação.",
								type : 'danger'
							});
					return false;
				} else if ($("[name=hiddenLaudoApto]").val() == "") {
					FLUIGC.toast({
						title : '',
						message : msgFunc
								+ "<br>Realizar Avaliação de Segurança.",
						type : 'danger'
					});
					return false;
				}
			}
		}
		if ($("[name=hiddenExigeProva]").val() == "1") {
			if ($("[name=hiddenResultadoProva]").val() == "0") {
				FLUIGC
						.toast({
							title : '',
							message : msgFunc
									+ "<br>Candidato Reprovado na Prova Técnica - Reaplicar a prova ou selecionar novo candidato.",
							type : 'danger'
						});
				return false;
			} else if ($("[name=hiddenResultadoProva]").val() == "") {
				FLUIGC.toast({
					title : '',
					message : msgFunc
							+ "<br>Resultado da prova não encontrado.",
					type : 'danger'
				});
				return false;
			}
		}
	}

	return true;
}

function aprovadores() {
	if ($("[name=tipoVaga]").val() == "sede") {
		if ($("[name=cargo]").val() == "Gerente"
				|| $("[name=cargo]").val() == "Diretor"
				|| $("[name=cargo]").val() == "Conselho") {
			var presid = $("[name=codAprovadorPresid]").val();
			$("[name=codPapelAprovador2]").val(presid);
		} else {
			var diretor = $("[name=codAprovadorVaga]").val();
			$("[name=codPapelAprovador2]").val(diretor);
		}

	} else if ($("[name=tipoVaga]").val() == "obra") {
		var vaga = $("[name=codAprovadorVaga]").val();
		var presid = $("[name=codAprovadorPresid]").val();
		if ($('[name=funcGestao]').val() == "1") {
			$("[name=codPapelAprovador2]").val(presid);
		} else {
			$("[name=codPapelAprovador2]").val(vaga);
		}
	}
}

function montaDependente() {
	var contador = 0;

	var coligada = $("[name=codColigada]").val();
	var codpessoa = $("[name=codPessoa]").val();
	
	var c1 = DatasetFactory.createConstraint("PARAM_CODPESSOA", codpessoa, codpessoa, ConstraintType.MUST);
	
	var constraints = new Array(c1);
	var datasetDependentes = DatasetFactory.getDataset("ds_RM_WS218_CARREGAR_DEPENDENTE", null, constraints, null);
	
	if (datasetDependentes.values != undefined && datasetDependentes.values != null) {
		for (z = 0; z < datasetDependentes.values.length; z++) {
			if (datasetDependentes.values[z].CHAPA != "") {
				contador++
				index2 = wdkAddChild("tbdependentes");
				$("#nomeDependente___" + index2).val(datasetDependentes.values[z].NOME);
				$("#sexoDependente___" + index2).val(datasetDependentes.values[z].SEXO);
				$("#grauDependente___" + index2).val(datasetDependentes.values[z].DESC_GRAUPARENTESCO);
				$("#cpfDependente___" + index2).val(datasetDependentes.values[z].CPF);
				$("#hidden_CPF_DEP___" + index2).val(datasetDependentes.values[z].CPF);
				$("#civilDependente___" + index2).val(datasetDependentes.values[z].DESC_ESTADOCIVIL);
				$("#CodGrau___" + index2).val(datasetDependentes.values[z].GRAUPARENTESCO);
				$("#CodCivi___" + index2).val(datasetDependentes.values[z].ESTADOCIVIL);
				$("#dtNascimentoDepend___" + index2).val(datasetDependentes.values[z].DTNASCIMENTO);
				$("#localNascimento___" + index2).val(datasetDependentes.values[z].LOCALNASCIMENTO);
				
				if (datasetDependentes.values[z].CARTAOVACINA == "1"){
					$("#ckcartaoVacina___" + index2).prop("checked");	
				}
				if (datasetDependentes.values[z].FREQESCOLAR == "1"){
					$("#ckcomprovante___" + index2).prop("checked");
				}
			}
		}
	}

}

function montaIndicacaoWIDGET() {
	var contador = 0;
	var qtdIndicacoesWrh01 = $("input[name^='cpf___']").length;
	var NumProces = $("[name=NumProces]").val();

	var c1 = DatasetFactory.createConstraint("NUM_SOLICITACAO", NumProces, NumProces, ConstraintType.MUST);
	var constraints = new Array(c1);
	var datasetInscr = DatasetFactory.getDataset("ds_FLUIG_QUERY_VwMIP_FormularioIncricaoVagasInternas", null,constraints, null);
	if (datasetInscr.values != undefined && datasetInscr.values != null) {
		for (z = 0; z < datasetInscr.values.length; z++) {
			if (datasetInscr.values[z].numProcesInteressado != '') {
				contador++
				index2 = wdkAddChild("tbIndicacao");

				$("#cpf___" + index2).val(formatarCPF(datasetInscr.values[z].cpf));
				$("#tipoIndicacao___" + index2).val('Auto Indicação');
				$("#nome___" + index2).val(datasetInscr.values[z].nome);
				$("#email___" + index2).val(datasetInscr.values[z].email);
				$("#telefone___" + index2).val(formatarTelefones(datasetInscr.values[z].telefone));
				$("#telefone2___" + index2).val(formatarTelefones(datasetInscr.values[z].telefone2));
				$("#ultFuncao___" + index2).val(datasetInscr.values[z].funcaoAtual);
				$("#ultSecao___" + index2).val(datasetInscr.values[z].secaoAtual);
			}
		}
	}

	var somaQtdFilhos = parseInt(qtdIndicacoesWrh01) + parseInt(contador);
	if (somaQtdFilhos < 1) {
		$(".indicacoes").hide();
	} else {
		$(".indicacoes").show();
	}

}

function montaIndicacaoWRH01() {
	if ($("input[name^='cpf___']").length < 1) {
		var camposModal = $("[name=camposModal]").val();

		var netos = 0;
		if (camposModal != "") {
			netos = JSON.parse(camposModal);
		} else {
			$(".indicacoes").hide();
		}

		// $("#numNetos___" + indice).val(netos.length);

		// console.log(netos);

		var contador = 0;
		for (var x = 0; x < netos.length; x++) {
			// console.log("entrou For");
			var index;
			if (contador == 8) {
				// console.log("contador 7");
				contador = 0;
			}
			if (contador == 0) {
				// console.log("contador 0");
				index = wdkAddChild("tbIndicacao");
				// console.log("index === " + index);
				indice = netos[x];
				// console.log("indice == " + indice);
				// console.log("Saiu contador 0");
			}
			if (contador == 1) {
				// console.log("entrou contador 1" + netos[x]);
				$("#cpf___" + index).val(formatarCPF(netos[x]));
				$("#tipoIndicacao___" + index).val('Indic. Solicitante');
				// console.log("Saiu contador 1");
			}
			if (contador == 2) {
				// console.log("entrou contador 2" + netos[x]);
				$("#nome___" + index).val(netos[x]);
				// console.log("Saiu contador 2");
			}

			if (contador == 3) {
				// console.log("entrou contador 3" + netos[x]);
				$("#email___" + index).val(netos[x]);
				// console.log("Saiu contador 3");
			}

			if (contador == 4) {
				// console.log("entrou contador " + netos[x]);
				$("#telefone___" + index).val(formatarTelefones(netos[x]));
				// console.log("Saiu contador ");
			}

			if (contador == 5) {
				// console.log("entrou contador 5" + netos[x]);
				$("#telefone2___" + index).val(formatarTelefones(netos[x]));
				// console.log("Saiu contador 5");
			}

			if (contador == 6) {
				// console.log("entrou contador 6" + netos[x]);
				$("#pis___" + index).val(netos[x]);
				// console.log("Saiu contador 4");
			}

			if (contador == 7) {
				// console.log("entrou contador 6" + netos[x]);
				$("#ultFuncao___" + index).val(netos[x]);
				// console.log("Saiu contador 4");
			}

			if (contador == 8) {
				// console.log("entrou contador 7" + netos[x]);
				$("#ultSecao___" + index).val(netos[x]);
				// console.log("Saiu contador 7");
			}
			contador++;
		}
	}
}

/*
 * Verifica se o usuário logado é aprovador da etapa "Aprovar Candidato -
 * Gestor"
 */
function verificaMesmoAprovador() {

	var IdUser = buscarMatriculaUsuarioLogado();
	var PapelAprovador = $("[name=codPapelAprovador2]").val();
	PapelAprovador = PapelAprovador.replace("Pool:Role:", "");

	var c1 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", IdUser, IdUser, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", PapelAprovador, PapelAprovador, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('workflowColleagueRolePK.companyId', '1', '1', ConstraintType.MUST);

	var constraints = new Array(c1, c2, c3);
	var datasetRM = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);

	$("[name=mesmoAprovador]").val("0");

	if (datasetRM.values != undefined && datasetRM.values != null) {

		if (datasetRM.values.length == 1)
			$("[name=mesmoAprovador]").val("1");
	}

}

/*
 * Verifica se o aprovador da etapa "Aprovar Candidato - Gestor" já aprovou o
 * candidato no WRH01
 */
function verificaMesmoAprovadorWRH01() {

	var matrSolicitante = $("[name=matrSolicitante]").val();
	var matrAprovadorWRH01 = $("[name=matrAprovadorWRH01]").val();
	var PapelAprovador = $("[name=codPapelAprovador2]").val();
	PapelAprovador = PapelAprovador.replace("Pool:Role:", "");

	// matrAprovadorWRH01 está vazio quando o solicitante do WRH01 já é o
	// Aprovador.
	if (matrAprovadorWRH01 == "")
		matrAprovadorWRH01 = matrSolicitante;

	var c1 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", matrAprovadorWRH01, matrAprovadorWRH01, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", PapelAprovador, PapelAprovador, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('workflowColleagueRolePK.companyId', '1', '1', ConstraintType.MUST);

	var constraints = new Array(c1, c2, c3);
	var datasetRM = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);

	$("[name=mesmoAprovadorWRH01]").val("0");

	if (datasetRM.values != undefined && datasetRM.values != null) {

		if (datasetRM.values.length == 1)
			$("[name=mesmoAprovadorWRH01]").val("1");
	}
}

/* Verifica se o candidato selecionado está na lista de pessoas indicadas */
function verCandidatoIndicado() {

	var cpfCandidato = $("[name=cpfCandidato]").val();

	if (cpfCandidato != undefined && cpfCandidato != "") {

		$("[name=CandidatoFoiIndicado]").val("0");

		$("[name^=cpf___]").each(function() {

			var idValor = $(this).attr("id");
			var index = idValor.split("___")[1];
			var cpfIndicado = $("[name=cpf___" + index + "]").val();
			cpfIndicado = cpfIndicado.replace(/\./g, "");
			cpfIndicado = cpfIndicado.replace(/-/g, "");

			if (cpfIndicado == cpfCandidato)
				$("[name=CandidatoFoiIndicado]").val("1");

		});
	}
}

function alertaCandidatoReprovadoEscopoObra() {

	var cpfCandidato = $("[name=cpfCandidato]").val();
	var obraSetor = $("[name=obraSetor]").val();

	var c1 = DatasetFactory.createConstraint("obraSetor", obraSetor, obraSetor,
			ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("HstRepCandidatoCPF",
			cpfCandidato, cpfCandidato, ConstraintType.MUST);

	var constraints = new Array(c1, c2);
	var dsHstRep = DatasetFactory.getDataset("ds_WRH02_TbHstReprovacao", null,
			constraints, null);

	if (dsHstRep.values[0] != undefined) {

		var mensagem = "<div><b>O candidato "
				+ dsHstRep.values[0].HstRepCandidatoNome
				+ " foi reprovado na Obra/Setor: " + obraSetor + "</b><br><br>";

		mensagem = mensagem
				+ "<table class='table alertTable'><tr><th>Data</th><th>Solicitação</th><th>Reprovado por</th><th>Justificativa</th></tr>";

		for (i = 0; i < dsHstRep.values.length; i++) {
			mensagem = mensagem + "<tr><td>" + dsHstRep.values[i].HstRepData
					+ "</td><td>" + dsHstRep.values[i].NumProces + "</td><td>"
					+ dsHstRep.values[i].HstRepReprovador + "</td><td>"
					+ dsHstRep.values[i].HstRepJustificativa + "</td></tr>";
		}

		mensagem = mensagem + "</table></div>";

		FLUIGC.toast({
			title : '',
			message : mensagem,
			type : 'danger'
		});
	}
}

function onchangeStatusCancelamento() {
	/*
	 * if($("[name=statusCancelamento]").val() != ""){
	 * 
	 * if(buscarAtividadeAtual() == taskValidarDocumentacao){
	 * 
	 * FLUIGC.toast({ title : '', message : "Você está em uma atividade
	 * paralela. Após Enviar para cancelamento, certifique-se que a atividade
	 * 'WRH02 Realizar Exames Admissionais' também seja movimentada.", type :
	 * 'danger' }); }else if(buscarAtividadeAtual() == taskRealizarExamesAdmissionais){
	 * 
	 * FLUIGC.toast({ title : '', message : "Você está em uma atividade
	 * paralela. Após Enviar para cancelamento, certifique-se que a atividade
	 * 'WRH02 Validar documentação' também seja movimentada.", type : 'danger'
	 * }); } }
	 */
}

function onchangeCotaPCD() {

	if ($("[name=cotaPCD]").val() == "naoDeficiencia") {

		$(".checkboxDeficiencia").prop("disabled", true);
		$(".checkboxDeficiencia").prop("checked", false);

	} else {

		$(".checkboxDeficiencia").prop("disabled", false);

	}

}

function onchangeTreinamento() {

	var sel = $("[name=treinamento]").val();

	if (sel == "MipCliente") {

		$("[name=dataTreinaMIP]").prop("disabled", false);
		$("[name=dataTreinaCliente]").prop("disabled", false);

	} else if (sel == "Mip") {

		$("[name=dataTreinaMIP]").prop("disabled", false);
		$("[name=dataTreinaCliente]").prop("disabled", true);
		$("[name=dataTreinaCliente]").val("");

	} else if (sel == "Cliente") {

		$("[name=dataTreinaMIP]").prop("disabled", true);
		$("[name=dataTreinaMIP]").val("");
		$("[name=dataTreinaCliente]").prop("disabled", false);

	} else if (sel == "naoAplica" || sel == "") {

		$("[name=dataTreinaMIP]").prop("disabled", true);
		$("[name=dataTreinaMIP]").val("");
		$("[name=dataTreinaCliente]").prop("disabled", true);
		$("[name=dataTreinaCliente]").val("");

	}

}

function abrirModalGED() {

	var html = htmlGED();

	FLUIGC.modal({
		title : 'Visualizar Documentos - GED',
		content : html,
		id : 'myModalGED',
		size : 'large',
		actions : [ {
			'label' : 'Fechar',
			'autoClose' : true
		} ]
	});

}

function htmlGED() {

	var CodColigada = $("[name=codColigada]").val();
	var IdReq = $("[name=numRequisicaoSelecao]").val();

	var c1 = DatasetFactory.createConstraint("PARAM_CODCOLIGADA", CodColigada,
			CodColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("PARAM_IDREQ", IdReq, IdReq,
			ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("PARAM_DATASERVER", "%", "%",
			ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3);

	var dsGED = DatasetFactory.getDataset("ds_RM_WS085_DocumentosGED", null,
			constraints, null);

	var html = "<div>";

	if (dsGED.values[0].DATASERVER != "") {

		html = html
				+ "<table class='table'><tr><th>Tela do TOTVS RM</th><th>Documento</th><th></th></tr>";
		var link = parent.WCMAPI.serverURL
				+ "/portal/p/1/ecmnavigation?app_ecm_navigation_doc="
		var linkDoc;

		for (i = 0; i < dsGED.values.length; i++) {

			linkDoc = link + dsGED.values[i].CODDOCUMENTO;
			html = html
					+ "<tr><td>"
					+ dsGED.values[i].TIPO
					+ "</td><td>"
					+ dsGED.values[i].DOCUMENTO
					+ "</td><td><a href='"
					+ linkDoc
					+ "' target='_blank' style='target-new: tab;'><i class='fluigicon fluigicon-file icon-md'></i></a></td></tr>";
		}

		html = html + "</table>";

	} else {

		html = html + "Nenhum documento encontrado.";

	}

	html = html + "</div>";

	return html;

}

function validaDocGED(DATASERVER) {

	var cadastrado = false;

	try {

		var CodColigada = $("[name=codColigada]").val();
		var IdReq = $("[name=numRequisicaoSelecao]").val();

		var c1 = DatasetFactory.createConstraint("PARAM_CODCOLIGADA",
				CodColigada, CodColigada, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("PARAM_IDREQ", IdReq, IdReq,
				ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("PARAM_DATASERVER",
				DATASERVER, DATASERVER, ConstraintType.MUST);
		var constraints = new Array(c1, c2, c3);

		var dataset = DatasetFactory.getDataset("ds_RM_WS085_DocumentosGED",
				null, constraints, null);

		if (dataset.values[0].DATASERVER == "")
			cadastrado = false;
		else if (dataset.values[0].DATASERVER != "")
			cadastrado = true;
		else
			throw "Erro validaDocContratualGED (ds_RM_WS085_DocumentosGED)";

	} catch (e) {

		throw "Erro ao tentar consultar documentos GED no TOTVS RM. \n\n Tente novamente, caso o erro persista, entre em contato com o setor de TI. \n\n"
				+ e;

	}

	return cadastrado;

}

function alertaGEDPessoa() {

	if (validaDocGED("RhuPessoaData") == false) {

		FLUIGC
				.toast({
					title : '',
					message : "Os documentos pessoais não foram cadastrados no GED. (Tela: Pessoa).",
					type : 'danger'
				});
	}
}

function alertaGEDFuncionario() {

	if (validaDocGED("FopFuncData") == false) {

		FLUIGC
				.toast({
					title : '',
					message : "Os documentos contratuais não foram cadastrados no GED. (Tela: Funcionário).",
					type : 'danger'
				});
	}
}

function verificaSoldador(msgFunc) {

	if ($("[name=cargo]").val() == "Soldador") {

		FLUIGC
				.toast({
					title : '',
					message : msgFunc
							+ '<br>Para o cargo de Soldador é necessário anexar o Teste de Solda.<br><br>Retorne ao topo da solicitação para acessar o menu de Anexos e "Carregar Arquivos".',
					type : 'warning',
					timeout : 60000
				});

	}

}

function infoTesteSolda() {

	if ($("[name=qtdAnexosFluig]").val() > 0
			&& $("[name=cargo]").val() == "Soldador") {

		FLUIGC
				.toast({
					title : '',
					message : 'Esta solicitação possui um Teste de Solda. <br><br> Acesse o menu de Anexos para visualizá-lo.',
					type : 'info',
					timeout : 60000
				});
	}

}

function infoTestesReprovadosRH() {

	FLUIGC.toast({
					title : '',
					message : 'Atenção, Testes Reprovados pelo RH. <br><br>' + $("[name=observacoesTestesValida]").val(),
					type : 'danger'
				});

}

function setDescricaoLaudo() {

	if ($("[name=hiddenExigeLaudo]").val() == "1") {

		$("[name=exigeLaudo]").val("Sim");

		if ($("[name=hiddenLaudo]").val() == "1")
			$("[name=laudo]").val("Sim");
		else
			$("[name=laudo]").val("Não");

		if ($("[name=hiddenLaudoApto]").val() == "1")
			$("[name=laudoApto]").val("Apto");
		else if ($("[name=hiddenLaudoApto]").val() == "0")
			$("[name=laudoApto]").val("Inapto");
		else
			$("[name=laudoApto]").val("");

	} else {

		$("[name=exigeLaudo]").val("Não");
		$("[name=laudo]").val("Não se aplica");
		$("[name=laudoApto]").val("Não se aplica");

	}

}

function excecaoReadmissao(cpf) {

	var c1 = DatasetFactory.createConstraint("cpCPF", cpf, cpf,
			ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("dsWRH_Excecao_Readmissao", null,
			constraints, null);

	var permite = false;

	for (var i = 0; i < dataset.values.length; i++) {

		var now = new Date();
		var datalimite = dataset.values[i].dataLimite;
		var dia = datalimite.split("/")[0];
		var mes = datalimite.split("/")[1];
		var ano = datalimite.split("/")[2];

		var data = new Date(ano, mes - 1, dia, 23, 59, 59);

		if (data >= now)
			permite = true;

	}

	return permite;

}

function retornaAvaliacao(exibeAvaliador) {
	/*
	 * Campo AVALIADOR só deve ser exibido na etapas onde o responsável possui
	 * função de Gestão
	 */
	var idReq = $("#numRequisicaoSelecao").val();
	var coligada = $("[name=codColigada]").val();
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada,
			ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDREQ", idReq, idReq,
			ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_candidato", null,
			constraints, null);
	try {
		for (var i = 0; i < dataset.values.length; i++) {
			if (dataset.values[i].AVALIACAO != "") {

				var aval = dataset.values[i].AVALIACAO.replace(/#13/g, "\n");

				if (exibeAvaliador == true)
					aval += "\n\nAvaliador: " + dataset.values[i].AVALIADOR;

				$("[name=avaliacao]").val(aval);

			} else {
				FLUIGC.toast({
					title : '',
					message : "Erro ao carregar avaliação (retornaAvaliacao).",
					type : 'danger'
				});
			}
		}
	} catch (e) {
		FLUIGC.toast({
			title : '',
			message : "Erro ao carregar avaliação (retornaAvaliacao).",
			type : 'danger'
		});
	}
}

function formatarTelefones(telefone) {
	// formatação
	if (telefone != undefined && telefone != null && telefone != "") {
		if (telefone.length == 11) {
			celular = telefone.replace(/^(\d{2})(\d)/g, "($1) $2");
			resultado_celular = celular.replace(/(\d)(\d{4})$/, "$1-$2");
			return resultado_celular;
		} else if (telefone.length == 10) {
			telefone = telefone.replace(/^(\d{2})(\d)/g, "($1) $2");
			resultado_telefone = telefone.replace(/(\d)(\d{4})$/, "$1-$2");
			return resultado_telefone;
		} else {
			return telefone;
		}
	}

}

 function formatarCPF(validar_cpf){
	//formatação
	 cpf_final = validar_cpf.replace( /(\d{3})(\d)/ , "$1.$2");
	 cpf_final = cpf_final.replace( /(\d{3})(\d)/ , "$1.$2");
	 cpf_final = cpf_final.replace(/(\d{3})(\d{1,2})$/ , "$1-$2");
	 return cpf_final;
 }

function validarContaCorrente() {

	$('#contaCorrente').unbind('change');
	$('#contaCorrente')
			.change(
					function() {
						var contaDigitado = $(this).val();
						var contaFormatado = contaDigitado.replace(/[0-9]/g,'').toString();
						if (contaFormatado != "" ) { 							
						$(this).val(""); 
							FLUIGC.message.alert(
							{
								message : "So pode conter Numeros no cadastro de Conta Corrente: " + contaFormatado,
								title : "Aten\u00e7\u00e3o",
								label : 'Ciente'
							}, function(el, ev) {
							});
						}
					});
}

 

function ativarchangeValidaCpf() {
	$('.cpf').unbind('change');
	$('.cpf').change(
			function() {
				var cpfDigitado = $(this).val();
				var cpfFormatado = cpfDigitado.replace(/[^0-9]/g, '').toString();

				if (validacaoCPF(cpfFormatado)) {
					var splitlemento = this.id.split('___');
					if (splitlemento[0] == "cpfDependente") {
						var index = this.id.substring(
								this.id.lastIndexOf("_") + 1, this.id.length);

						$("#hidden_CPF_DEP___" + index).val(cpfFormatado);
						if (validarDupliciaddeCPF_Terc(cpfFormatado) == false) {
							$("#hidden_CPF_DEP___" + index).val('');
							$("#cpfDependente___" + index).val('');
						}

					}

				} else {
					$(this).val("");
					FLUIGC.message.alert({
						message : "Favor corrigir O CPF Informado: "
								+ cpfDigitado,
						title : "Aten\u00e7\u00e3o",
						label : 'Ciente'
					}, function(el, ev) {
					});
				}
			});
}


function validacaoCPF(strCPF) {
	if (strCPF.length == 11) {
		var Soma;
		var Resto;
		Soma = 0;
		if (strCPF == "00000000000") {
			return false;
		}

		for (i = 1; i <= 9; i++)
			Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
		Resto = (Soma * 10) % 11;
		if ((Resto == 10) || (Resto == 11))
			Resto = 0;
		if (Resto != parseInt(strCPF.substring(9, 10))) {
			return false;
		}
		Soma = 0;
		for (i = 1; i <= 10; i++)
			Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
		Resto = (Soma * 10) % 11;

		if ((Resto == 10) || (Resto == 11))
			Resto = 0;
		if (Resto != parseInt(strCPF.substring(10, 11))) {
			return false;
		}

		return true;
	} else {
		return false;
	}
}

function aplicarManscaraCampos() {

	$('.pis').mask('00000000000');

}

function validarAlertaDeClassificacao() {
	var CLASSIFICACAO = $("[name=classificacao]").val();
	if (CLASSIFICACAO == 'Apto com restrições') {
		FLUIGC.toast({
			title : '',
			message : "Favor se atentar para a Avaliação do Candidato - "
					+ $("[name=nomeCandidato]").val()
					+ ",  a classificação do mesmo é (Apto com restrições) .",
			type : 'warning',
			timeout : 60000
		});
	}
}

function setContratoExp() {

	var nomeFuncao = $("[name=funcao]").val();
	var contratoExp;

	nomeFuncao = nomeFuncao.toLowerCase();

	if (nomeFuncao.indexOf("estagiario") != -1
			|| nomeFuncao.indexOf("estagiário") != -1
			|| nomeFuncao.indexOf("aprendiz") != -1
			|| nomeFuncao.indexOf("diretor ") != -1 || nomeFuncao == "diretor")
		contratoExp = "naoAplica";
	else
		contratoExp = "45";

	$("select[name=contratoExp] option[value='']").removeAttr("selected");
	$("select[name=contratoExp] option[value=" + contratoExp + "]").attr(
			"selected", "selected");
	$("select[name=contratoExp]").val(contratoExp);

}

function aberturaDependente() {
	var indice = wdkAddChild('tbdependentes');
	ativarchangeValidaCpf();
	dtNascimentoDependCalendar();
}

function fnCustomDelete(oElement, nameTable, classFieldSet) {
	if (oElement.className == "lixeiraCustomizada buttaoDeleteDoc") {
		deleteDoGedDoc(oElement);
		fnWdkRemoveChild(oElement);

	} else {
		fnWdkRemoveChild(oElement);
	}

}

function dtNascimentoDependCalendar(){
	
	$("input[name^='cpfDependente___']").each(function() {
		
		var index = this.id.substring(this.id.lastIndexOf("_") + 1, this.id.length);
		
		FLUIGC.calendar("#dtNascimentoDepend___" + index , {
			pickDate : true,
			pickTime : false,
		});
	});
	
}

function alertaPCD() {

	if ($("[name=cotaPCD]").val() == "naoPCD" || $("[name=cotaPCD]").val() == "simPCD") {

		FLUIGC.toast({
					title : '',
					message : "Atenção!!! Candidato é PCD. Verifique necessidade de exames complementares.",
					type : 'danger'
				});
	}
}