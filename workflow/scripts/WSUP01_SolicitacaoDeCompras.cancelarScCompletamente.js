function cancelarScCompletamente(justificativaCancelamento) {
	var numero_solicitacao = hAPI.getCardValue("numero_solicitacao");
	var TMOV_CODCOLIGADA = hAPI.getCardValue("TMOV_CODCOLIGADA");
	log.info("-cancelarScCompletamente--INICIO numero_solicitacao = "
			+ numero_solicitacao);
	var arrayMovimentos = [];
	var arraySolicitacoesDePara = [];

	var c1FormsWSUP02 = DatasetFactory.createConstraint(
			'NUMERO_SOLICITACAO_PAI', numero_solicitacao, numero_solicitacao,
			ConstraintType.MUST);
	var constraintsdatasetFormsWSUP02 = new Array(c1FormsWSUP02);
	var datasetFormsWSUP02 = DatasetFactory.getDataset(
			'ds_VIEW_FormsWSUP02_solicitacaoVincularItensCompras', null,
			constraintsdatasetFormsWSUP02, null);
	for (var z = 0; z < datasetFormsWSUP02.rowsCount; z++) {
		var indicePaiFilhoItem = datasetFormsWSUP02.getValue(z,
				'indicePaiFilhoItem');
		var TMOV_CODCOLIGADA = hAPI.getCardValue("TMOV_CODCOLIGADA");
		var idMovRM = datasetFormsWSUP02.getValue(z, 'numIdGeradoRM');
		var numSeqItmMovGeradoRM = datasetFormsWSUP02.getValue(z,
				'numSeqItmMovGeradoRM');
		log
				.info("-beforeCancelProcess validarItemMovFaturado---indicePaiFilhoItem============================================="
						+ indicePaiFilhoItem);
		log
				.info("-beforeCancelProcess validarItemMovFaturado---idMovRM============================================="
						+ idMovRM);
		log
				.info("-beforeCancelProcess validarItemMovFaturado---numSeqItmMovGeradoRM============================================="
						+ numSeqItmMovGeradoRM);
		log
				.info("-beforeCancelProcess validarItemMovFaturado---TMOV_CODCOLIGADA============================================="
						+ TMOV_CODCOLIGADA);

		if (idMovRM != null && numSeqItmMovGeradoRM != null) {
			if (idMovRM != "" && numSeqItmMovGeradoRM != ""
					&& TMOV_CODCOLIGADA != "") {
				if (validarExistencia(arrayMovimentos, idMovRM)) {
					log
							.info("-cancelarScCompletamente-dentro if arrayMovimentos validarExistencia-idMov115= "
									+ idMovRM);
					arrayMovimentos.push(idMovRM);
				}

				var c11 = DatasetFactory
						.createConstraint('CODCOLIGADA', TMOV_CODCOLIGADA,
								TMOV_CODCOLIGADA, ConstraintType.MUST);
				var c22 = DatasetFactory.createConstraint('IDMOV', idMovRM,
						idMovRM, ConstraintType.MUST);
				var c33 = DatasetFactory.createConstraint('NUMSEQITM',
						numSeqItmMovGeradoRM, numSeqItmMovGeradoRM,
						ConstraintType.MUST);

				var constraints2 = new Array(c11, c22, c33);
				var dataset2 = DatasetFactory
						.getDataset(
								'ds_SELECT_WSUP01_RastreioDeMovimentosParaCancelamento',
								null, constraints2, null);

				log
						.info("-beforeCancelProcess validarItemMovFaturado---dataset============================================="
								+ dataset2);
				if (dataset2 != null) {
					log
							.info("-beforeCancelProcess validarItemMovFaturado---dataset.getRowsCount()============================================="
									+ dataset2.getRowsCount());

					if (dataset2.getRowsCount() > 0) {
						for (var x = 0; x < dataset2.getRowsCount(); x++) {
							var CODTMV = dataset2.getValue(x, "CODTMV");
							log
									.info("-beforeCancelProcess validarItemMovFaturado---CODTMV============================================="
											+ CODTMV);
							if (CODTMV != null && CODTMV != '') {
								if ((CODTMV == '1.1.22')
										|| (CODTMV.indexOf("3.") == 0)) {
									log
											.error("Não é possível cancelar o SC. Existe item 's' que já chegaram até o movimento 1.1.22 (COTAÇÃO) ou 3.X.XX .");
									throw "Não é possível cancelar o SC. Existe item 's' que já chegaram até o movimento 1.1.22 (COTAÇÃO) ou 3.X.XX .";
								}
							}
						}
					}
				}
			}
		}
	}

	var indexes = getIndexes("indicePaiFilhoItem");
	var iterator = indexes.iterator();
	while (iterator.hasNext()) {
		var index = iterator.next();
		log.info("-cancelarScCompletamente-- index = " + index);
		var numSolicDePara = hAPI.getCardValue("numSolicDePara___" + index);
		log.info("-cancelarScCompletamente-- numSolicDePara = "
				+ numSolicDePara);
		// alimentando array com os solicitações filhas e retirando a
		// duplicidade
		if (numSolicDePara != "") {
			if (validarExistencia(arraySolicitacoesDePara, numSolicDePara)) {
				log
						.info("-cancelarScCompletamente-dentro if arraySolicitacoesDePara validarExistencia-numSolicDePara= "
								+ numSolicDePara);
				arraySolicitacoesDePara.push(numSolicDePara);
			}
		}
	}

	log.info("-cancelarScCompletamente--arrayMovimentos.toString()= "
			+ arrayMovimentos.toString());
	log.info("-cancelarScCompletamente-- arraySolicitacoesDePara.toString()= "
			+ arraySolicitacoesDePara.toString());

	log.info("-cancelarScCompletamente--JSON.stringify(arrayMovimentos)= "
			+ JSONUtil.toJSON(arrayMovimentos));
	log
			.info("-cancelarScCompletamente--JSON.stringify(arraySolicitacoesDePara)= "
					+ JSONUtil.toJSON(arraySolicitacoesDePara));

	log.info("-cancelarScCompletamente--arrayMovimentos.length= "
			+ arrayMovimentos.length);
	for (var a = 0; a < arrayMovimentos.length; a++) {
		log.info("-cancelarScCompletamente---arrayMovimentos ===== a= " + a);
		log
				.info("-cancelarScCompletamente---arrayMovimentos=====arrayMovimentos[a]= "
						+ arrayMovimentos[a]);
		if (cancelarMovimentoRM(arrayMovimentos[a], TMOV_CODCOLIGADA)) {
			log.info("SUCESSO-cancelarScCompletamente---dentro do if ====="
					+ arrayMovimentos[a]);
		} else {
			log
					.error("ERRO cancelarMovimentoRM  - Entre em contato com a equipe de TI.");
			throw "ERRO cancelarMovimentoRM  - Entre em contato com a equipe de TI.";
			return false;
		}
	}

	log.info("-cancelarScCompletamente--arraySolicitacoesDePara.length= "
			+ arraySolicitacoesDePara.length);
	for (var b = 0; b < arraySolicitacoesDePara.length; b++) {
		log.info("-cancelarScCompletamente---arraySolicitacoesDePara ===== a= "
				+ b);
		log
				.info("-cancelarScCompletamente---arraySolicitacoesDePara=====arraySolicitacoesDePara[b]= "
						+ arraySolicitacoesDePara[b]);
		if (cancelarTodosDePara(arraySolicitacoesDePara[b],
				justificativaCancelamento)) {
			log.info("SUCESSO-cancelarScCompletamente---dentro do if ====="
					+ arraySolicitacoesDePara[b]);
		} else {
			log
					.error("ERRO arraySolicitacoesDePara  - Entre em contato com a equipe de TI.");
			throw "ERRO Solicitacoes De Para  - Entre em contato com a equipe de TI.";
			return false;
		}
	}

	marcarItemsComoCancelado();
	return true;
}

// ================================================================================================
function validarExistencia(Array, b) {
	if (Array.toString().indexOf(b) === -1) {
		return true;
	} else if (Array.indexOf(b) > -1) {
		return false;
	}
}

function marcarItemsComoCancelado() {
	var indexes = getIndexes("indicePaiFilhoItem");
	var iterator = indexes.iterator();
	while (iterator.hasNext()) {
		index = iterator.next();

		hAPI.setCardValue("statusSolFilha___" + index, "cancelada");
		hAPI.setCardValue("itemCancelado___" + index, "sim");
		hAPI.setCardValue("statusMovRM___" + index, "itemCancelado");
	}
}

function cancelarMovimentoRM(idMov115, TMOV_CODCOLIGADA) {
	log
			.info("cancelarScCompletamente-cancelarMovimentoRM---TMOV_CODCOLIGADATMOV_CODCOLIGADA==================="
					+ TMOV_CODCOLIGADA);
	log
			.info("cancelarScCompletamente-cancelarMovimentoRM---idMov115idMov115======================="
					+ idMov115);

	var c1 = DatasetFactory.createConstraint('COLIGADA', TMOV_CODCOLIGADA,
			TMOV_CODCOLIGADA, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('IDMOV', idMov115, idMov115,
			ConstraintType.MUST);
	var contadorQtdMivimentos = 0;
	var contadorQtdMivimentosCanc = 0;

	var constraints = new Array(c1, c2);
	var datasetWS182 = DatasetFactory.getDataset(
			'ds_ConsultaRM_WS182_RetornaListaMovimentosCancelar', null,
			constraints, null);
	var CODTMV = '';
	var IDMOV = '';
	var NUMEROMOV = '';

	if (datasetWS182 != null && datasetWS182.getRowsCount() > 0) {
		log
				.info("cancelarScCompletamente-cancelarMovimentoRM---datasetWS182.getRowsCount()=SEMPRE MAIS DE UM==WS182="
						+ datasetWS182.getRowsCount());
		for (var J = 0; J < datasetWS182.getRowsCount(); J++) {

			CODTMV = datasetWS182.getValue(J, "CODTMV");
			IDMOV = datasetWS182.getValue(J, "IDMOV");
			NUMEROMOV = datasetWS182.getValue(J, "NUMEROMOV");

			log
					.info("-cancelarMovRm--datasetWS182-CODTMOV==N==========================================="
							+ CODTMV);
			log
					.info("-cancelarMovRm--datasetWS182-IDMOV====N========================================="
							+ IDMOV);
			log
					.info("-cancelarMovRm--datasetWS182-NUMEROMOV==N==========================================="
							+ NUMEROMOV);
			if (IDMOV != '' && NUMEROMOV != '') {
				contadorQtdMivimentos++;
				if (executarProcessoCancelamentoCadaMovimento(TMOV_CODCOLIGADA,
						IDMOV, NUMEROMOV)) {
					contadorQtdMivimentosCanc++;
				}else{
					throw "ERRO cancelarMovimentoRM  - cancelarTodosDePara - Entre em contato com a equipe de TI.";
					log.info("-cancelarMovRm--datasetWS182-E==========================================="+ NUMEROMOV);
					return false;
				}
			}

		}
	}
	if (contadorQtdMivimentos == contadorQtdMivimentosCanc) {
		return true;
	} else {
		return false;
	}

}

function cancelarTodosDePara(numSolicitacaoDePara, justificativaCancelamento) {

	var connect = DatasetFactory.getDataset("ds_mip_connector", null, null,
			null);
	var userAdmin = connect.getValue(0, "USUARIOECM");

	var c1 = DatasetFactory.createConstraint('userSecurityId', userAdmin,
			userAdmin, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('metadata#active', 'true', 'true',
			ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('numero_solicitacao',
			numSolicitacaoDePara, numSolicitacaoDePara, ConstraintType.MUST);

	var constraintsForm = new Array(c1, c2, c3);
	var datasetForm = DatasetFactory.getDataset(
			'ds_FormsWSUP02_solicitacaoVincularItensCompras', null,
			constraintsForm, null);

	for (var i = 0; i < datasetForm.rowsCount; i++) {
		var statusSolFilha = datasetForm.getValue(i, 'statusSolFilha');

		log
				.info("## WSUP01 - cancelarTodosDePara -  - WSUP02 NUMERO: "
						+ numSolicitacaoDePara + " - statusSolFilha: "
						+ statusSolFilha);

		if (statusSolFilha == 'aberta' || statusSolFilha == '') {
			var connect = DatasetFactory.getDataset("ds_mip_connector", null,
					null, null);
			// var userAdmin = connect.getValue(0, "USUARIOECM");
			var userAdmin = getValue("WKUser");
			var c1 = DatasetFactory.createConstraint('processInstanceId',
					numSolicitacaoDePara, numSolicitacaoDePara,
					ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint('userId', userAdmin,
					userAdmin, ConstraintType.MUST);
			var c3 = DatasetFactory.createConstraint('cancelText',
					justificativaCancelamento, justificativaCancelamento,
					ConstraintType.MUST);

			var constraints = new Array(c1, c2, c3);
			var dataset = DatasetFactory.getDataset(
					'ds_Elimina_Solicitacoes_Fluig', null, constraints, null);

			log
					.info("-cancelarMovRm-cancelarTodosDePara-ds_Elimina_Solicitacoes_Fluig-dataset.getRowsCount()============================================="
							+ dataset.getRowsCount());

			if (dataset.getRowsCount() > 0) {
				for (var i = 0; i < dataset.getRowsCount(); i++) {

					var resultado = dataset.getValue(i, "resultado");
					var processo = dataset.getValue(i, "processo");
					log.info("-cancelarMovRm-cancelarTodosDePara-ds_Elimina_Solicitacoes_Fluig-resultado: " + resultado);
					log.info("-cancelarMovRm-cancelarTodosDePara-ds_Elimina_Solicitacoes_Fluig-processo: "+ processo);
					
					log.info("-cancelarMovRm-cancelarTodosDePara-ds_Elimina_Solicitacoes_Fluig-processo: 22222"+ (resultado == 'OK') || (resultado == 'A solicitação é invalida ou está inativa.'));
					if((resultado == 'OK') || (resultado == 'A solicitação é invalida ou está inativa.') ){
						
					}else{
						log.error("ERRO cancelarMovimentoRM  - cancelarTodosDePara - Entre em contato com a equipe de TI."+ processo +"RESULTADO:");
						throw "ERRO cancelarMovimentoRM  - cancelarTodosDePara - Entre em contato com a equipe de TI.";
					}
				}
			}
		}
	}
return true;
}

function compararMovimentosSolicitacaoFilhas(arrayMovimentos) {
	var numero_da_solicitacao = getValue("WKNumProces");
	var connect = DatasetFactory.getDataset("ds_mip_connector", null, null,
			null);
	var userAdmin = connect.getValue(0, "USUARIOECM");

	var c1 = DatasetFactory.createConstraint('userSecurityId', userAdmin,
			userAdmin, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('metadata#active', 'true', 'true',
			ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('NUMERO_SOLICITACAO_PAI',
			numero_da_solicitacao, numero_da_solicitacao, ConstraintType.MUST);

	var constraintsForm = new Array(c1, c2, c3);
	var datasetForm = DatasetFactory.getDataset(
			'ds_VIEW_FormsWSUP02_solicitacaoVincularItensCompras', null,
			constraintsForm, null);

	for (var i = 0; i < datasetForm.rowsCount; i++) {
		var indicePaiFilhoItem = datasetForm.getValue(i, 'indicePaiFilhoItem');
		var idMovRM = datasetForm.getValue(i, 'numIdGeradoRM');
		var numSeqItmMovGeradoRM = datasetForm.getValue(i,
				'numSeqItmMovGeradoRM');

		log
				.info("## WSUP01 - compararMovimentosSolicitacaoFilhas -  - WSUP02 - indicePaiFilhoItem: "
						+ indicePaiFilhoItem);
		log
				.info("## WSUP01 - compararMovimentosSolicitacaoFilhas -  - WSUP02 - idMovRM: "
						+ idMovRM);
		log
				.info("## WSUP01 - compararMovimentosSolicitacaoFilhas -  - WSUP02 - numSeqItmMovGeradoRM: "
						+ numSeqItmMovGeradoRM);

		if (idMovRM != '') {
			if (validarExistencia(arrayMovimentos, idMovRM)) {
				log
						.info("-cancelarScCompletamente-dentro if arrayMovimentos validarExistencia-idMov115= "
								+ idMovRM);
				arrayMovimentos.push(idMovRM);
			}
		}
	}
	return arrayMovimentos;
}
