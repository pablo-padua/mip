function validateForm(form) {

	/* Permite Tranferir e Salvar sem validar campos */
	var numState = getValue("WKNumState");
	var nextState = getValue("WKNextState");

	if (numState == nextState) {
		return;
	}
	/* Permite Tranferir e Salvar sem validar campos */

	var atividade = buscarAtividadeAtual();

	var Errors = [];
	var msg = "";

	var statusCancelamento = form.getValue("statusCancelamento");

	if (statusCancelamento == "Cancelamento"
			|| statusCancelamento == "Reabertura") {

		justificativaCancelamento = form.getValue("justificativaCancelamento");

		if (statusCancelamento != ""
				&& (justificativaCancelamento == "" || justificativaCancelamento == undefined)) {
			throw "<b>Preencha a Justificativa do Cancelamento</b>\n\n\n";
		} else
			return true;

	} else {

		if (atividade == taskInicio) {

			if (form.getValue("obraSetor") == "")
				throw "Para solicitar abertura de vaga, utilize o processo WRH01 - Abertura de Vaga";

		}
		if (atividade == taskProcessoSeletivoRH) {
			validaSelect("qtdAnexos", i18n.translate("text.msgAnexo"));
			valida("nomeCandidato", i18n.translate("text.nomeCandidato"));
			valida("cpfCandidato", i18n.translate("text.cpf"));
			valida("RGCandidato", i18n.translate("text.RGCandidato"));
			valida("Nascimento", i18n.translate("text.Nascimento"));
			valida("cidade", i18n.translate("text.cidade"));
			valida("dataContato", i18n.translate("text.dataContato"));
			valida("pis", i18n.translate("text.pis"));
			if (validarPIS(form.getValue("pis")) != true)
				Errors.push("- PIS inválido");
			var retornoPisDuplicado = validarPISDuplicado();
			if (retornoPisDuplicado != true) {
				Errors.push(retornoPisDuplicado);
			}
			valida("dataChegada", i18n.translate("text.dataChegada"));
			valida("dataPrevAdmissao", i18n.translate("text.dataPrevAdmissao"));

			valida("nomeAprovadorSelecao", i18n.translate("text.nomeAprovador"));
			valida("dataAprovacaoSelecao", i18n.translate("text.data"));

			valida("aprovacaoSelecao", i18n.translate("text.aprovado"));
			if (form.getValue("aprovacaoSelecao") == "nao") {
				//valida("justificativaSelecao", i18n.translate("text.justificativa"));
				Errors
						.push("- Não é permitido avançar o processo sem aprovar a Seleção do Candidato.");
			}

			if (form.getValue("tipoVaga") == "sede") {
				if (form.getValue("hiddenLaudo") == "0") {
					Errors.push("- " + i18n.translate("text.msgAvaliacaoPsic"));
				} else {
					if (form.getValue("hiddenLaudoApto") == "0") {
						Errors.push("- " + i18n.translate("text.laudoInapto"));
					} else if (form.getValue("hiddenLaudoApto") == "") {
						Errors.push("- "
								+ i18n.translate("text.msgAvaliacaoPsic"));
					}
				}

			} else if (form.getValue("tipoVaga") == "obra") {
				if (form.getValue("hiddenExigeLaudo") == "1") {
					if (form.getValue("hiddenLaudo") == "0") {
						Errors.push("- "
								+ i18n.translate("text.msgAvaliacaoPsic"));
					} else {
						if (form.getValue("hiddenLaudoApto") == "0") {
							Errors.push("- "
									+ i18n.translate("text.laudoInapto"));
						} else if (form.getValue("hiddenLaudoApto") == "") {
							Errors.push("- "
									+ i18n.translate("text.msgAvaliacaoPsic"));
						}
					}
				}
				if (form.getValue("hiddenExigeProva") == "1") {
					if (form.getValue("hiddenResultadoProva") == "0") {
						Errors.push("- "
								+ i18n.translate("text.msgCandidatoReprovado"));
					} else if (form.getValue("hiddenResultadoProva") == "") {
						Errors.push("- " + i18n.translate("text.msgResultado"));
					}
				}

			}

			validaCheckListDocPessoal();
		} else if (atividade == taskProcessoSeletivoDP) {

			validaSelect("qtdAnexos", i18n.translate("text.msgAnexo"));
			valida("nomeCandidato", i18n.translate("text.nomeCandidato"));
			valida("cpfCandidato", i18n.translate("text.cpf"));
			valida("RGCandidato", i18n.translate("text.RGCandidato"));
			valida("Nascimento", i18n.translate("text.Nascimento"));
			valida("cidade", i18n.translate("text.cidade"));
			valida("pis", i18n.translate("text.pis"));
			if (validarPIS(form.getValue("pis")) != true)
				Errors.push("- PIS inválido");
			var retornoPisDuplicado = validarPISDuplicado();
			if (retornoPisDuplicado != true) {
				Errors.push(retornoPisDuplicado);
			}
			
			
			valida("dataContato", i18n.translate("text.dataContato"));
			valida("dataChegada", i18n.translate("text.dataChegada"));
			valida("dataPrevAdmissao", i18n.translate("text.dataPrevAdmissao"));
			valida("nomeAprovadorSelecao", i18n.translate("text.nomeAprovador"));
			valida("dataAprovacaoSelecao", i18n.translate("text.data"));

			valida("aprovacaoSelecao", i18n.translate("text.aprovado"));
			if (form.getValue("aprovacaoSelecao") == "nao") {

				//valida("justificativaSelecao", i18n.translate("text.justificativa"));
				Errors
						.push("- Não é permitido avançar o processo sem aprovar a Seleção do Candidato.");

			} else if (form.getValue("aprovacaoSelecao") == "sim") {

				//if(form.getValue("tipoVaga") == "obra"){

				valida("alimentacao", i18n.translate("text.alimentacao"));
				valida("cestaBasica", i18n.translate("text.cestaBasica"));
				valida("planoSaude", i18n.translate("text.planoSaude"));
				valida("mobiDesmobilizacao", i18n
						.translate("text.mobiDesmobilizacao"));

				valida("viagens", i18n.translate("text.viagens"));
				if (form.getValue("viagens") == "sim") {
					valida("periodo", i18n.translate("text.periodo"));
					valida("localidade", i18n.translate("text.localidade"));
				}

				valida("horario", i18n.translate("text.horario"));
				valida("indiceHorario", i18n.translate("text.indiceHorario"));
				valida("experiencia", i18n.translate("text.experiencia"));
				valida("contratoExp", i18n.translate("text.contratoExp"));
				validaContratoExp();
				valida("alojado", i18n.translate("text.alojado"));
				valida("bancario", i18n.translate("text.bkPagamento"));
				valida("agencias", i18n.translate("text.bkAgencias"));
				valida("tipoConta", i18n.translate("text.tipoConta"));
				valida("contaCorrente", i18n.translate("text.contaCorrente"));
				

				var index = form.getChildrenIndexes("tbdependentes");

				//if (index.length == 0){
				//	Errors.push("\u00c9 necess\u00e1rio inserir pelo menos um dependente");
				//}
				validaPaiFilho("tbdependentes", "nomeDependente", i18n.translate("text.nomeDependente"));
				validaPaiFilho("tbdependentes", "sexoDependente", i18n.translate("text.sexoDependente"));
				validaPaiFilho("tbdependentes", "grauDependente", i18n.translate("text.grauDependente"));
				validaPaiFilho("tbdependentes", "civilDependente", i18n.translate("text.civilDependente"));
				/*
				validaPaiFilho("tbdependentes", "dtNascimentoDepend", i18n.translate("text.dtNascimentoDepend"));
				validaPaiFilho("tbdependentes", "localNascimento", i18n.translate("text.localNascimento"));
				*/
				validaPaiFilhoDependente();

				if (form.getValue("tipoVaga") == "sede") {
					if (form.getValue("hiddenLaudo") == "0") {
						Errors.push("- "
								+ i18n.translate("text.msgAvaliacaoPsic"));
					} else {
						if (form.getValue("hiddenLaudoApto") == "0") {
							Errors.push("- "
									+ i18n.translate("text.laudoInapto"));
						} else if (form.getValue("hiddenLaudoApto") == "") {
							Errors.push("- "
									+ i18n.translate("text.msgAvaliacaoPsic"));
						}
					}

				} else if (form.getValue("tipoVaga") == "obra") {
					if (form.getValue("hiddenExigeLaudo") == "1") {
						if (form.getValue("hiddenLaudo") == "0") {
							Errors.push("- "
									+ i18n.translate("text.msgAvaliacaoPsic"));
						} else {
							if (form.getValue("hiddenLaudoApto") == "0") {
								Errors.push("- "
										+ i18n.translate("text.laudoInapto"));
							} else if (form.getValue("hiddenLaudoApto") == "") {
								Errors
										.push("- "
												+ i18n
														.translate("text.msgAvaliacaoPsic"));
							}
						}
					}
					if (form.getValue("hiddenExigeProva") == "1") {
						if (form.getValue("hiddenResultadoProva") == "0") {
							Errors
									.push("- "
											+ i18n
													.translate("text.msgCandidatoReprovado"));
						} else if (form.getValue("hiddenResultadoProva") == "") {
							Errors.push("- "
									+ i18n.translate("text.msgResultado"));
						}
					}

					/*grauDependente___1
					if(form.getValue("grauDependente___1") == "Filho(a) Válido" ||
					   form.getValue("grauDependente___1") == "Filho(a) Inválido"){
					   form.setEnabled("cpfDependente",false);
					}
					 */
				}

				if (form.getValue("deficienciaFisica") == "on"
						|| form.getValue("deficienciaAuditiva") == "on"
						|| form.getValue("deficienciaFala") == "on"
						|| form.getValue("deficienciaVisual") == "on"
						|| form.getValue("deficienciaMental") == "on"
						|| form.getValue("deficienciaIntelectual") == "on"
						|| form.getValue("deficienciaReabilitado") == "on") {

					if (form.getValue("cotaPCD") == ""
							|| form.getValue("cotaPCD") == "naoDeficiencia")
						Errors.push("- " + i18n.translate("text.cotaPCD"));
				}

				if ((form.getValue("cotaPCD") == "simPCD" || form
						.getValue("cotaPCD") == "naoPCD")
						&& form.getValue("deficienciaFisica") == ""
						&& form.getValue("deficienciaAuditiva") == ""
						&& form.getValue("deficienciaFala") == ""
						&& form.getValue("deficienciaVisual") == ""
						&& form.getValue("deficienciaMental") == ""
						&& form.getValue("deficienciaIntelectual") == ""
						&& form.getValue("deficienciaReabilitado") == "")
					Errors.push("- " + i18n.translate("text.deficiencia"));

				valida("cotaPCD", i18n.translate("text.cotaPCD"));
				validaCheckListDocPessoal();

				//}
			}

		} else if (atividade == taskConferirTestes) {
			valida("aprovTestesValida", i18n.translate("text.testesAprovados"));
			if (form.getValue("aprovTestesValida") == "nao") {
				valida("observacoesTestesValida", i18n.translate("text.justificativa"));
			}
			
		} else if (atividade == taskTestesReprovadosRH) {
			valida("aprovTestesReprovados", i18n.translate("text.aprovacaoTestesReprovados"));
			if (form.getValue("aprovTestesReprovados") == "nao") {
				Errors.push("- Não é permitido avançar o processo sem os Testes anexados.");
			}
			
		} else if (atividade == taskAprovarCandidatoSolicitante) {
			valida("nomeAprovador", i18n.translate("text.nomeAprovador"));
			valida("dataAprovacao", i18n.translate("text.data"));
			valida("aprovacao", i18n.translate("text.aprovado"));
			if (form.getValue("aprovacao") == "nao") {
				valida("justificativa", i18n.translate("text.justificativa"));
			}
		} else if (atividade == taskAprovarCandidatoGestor) {
			valida("nomeAprovador2", i18n.translate("text.nomeAprovador"));
			valida("dataAprovacao2", i18n.translate("text.data"));
			valida("aprovacao2", i18n.translate("text.aprovado"));
			if (form.getValue("aprovacao2") == "nao") {
				valida("justificativa2", i18n.translate("text.justificativa"));
			}

		} else if (atividade == taskValidarDocumentacao) {
			valida("nomeAprovadorDoc", i18n.translate("text.nomeAprovador"));
			valida("dataAprovacaoDoc", i18n.translate("text.data"));
			valida("aprovacaoDoc", i18n.translate("text.aprovarDoc"));
			if (form.getValue("aprovacaoDoc") == "nao") {
				valida("justificativaDoc", i18n.translate("text.justificativa"));
			}
			validaCheckListDocPessoal();
			validaEmissaoASO();

			valida("situacaoASO", i18n.translate("text.situacaoASO"));

			if (form.getValue("situacaoASO") == "inapto"
					&& form.getValue("statusCancelamento") == "")
				Errors
						.push("- A Situação ASO igual Inapto deve ser selecionada em conjunto com a opção de Cancelar Solicitação");

		} else if (atividade == taskAgendarExamesAdmissionais) {
			valida("nomeAgendarExames", i18n.translate("text.nomeAgendarExames"));
			valida("dataAgendarExames", i18n.translate("text.data"));

		} else if (atividade == taskDocumentacaoPendente) {
			validaCheckListDocPessoal();
		} else if (atividade == taskRealizarExamesAdmissionais) {
			valida("nomeAprovadorMedicina", i18n.translate("text.nomeAprovador"));
			valida("dataAprovacaoMedicina", i18n.translate("text.data"));
			valida("aprovacaoMedicina", i18n.translate("text.msgASO"));
		} else if (atividade == taskAdmitirColaborador) {

			valida("nomeAprovadorAdmissao", i18n.translate("text.nomeAprovador"));
			valida("dataAprovacaoAdmissao", i18n.translate("text.data"));
			valida("aprovacaoAdmissao", i18n.translate("text.aprovado"));
			valida("chapaFunc", i18n.translate("text.msgAdmissao"));
			if (form.getValue("aprovacaoAdmissao") == "nao") {
				valida("justificativaAdmissao", i18n
						.translate("text.justificativa"));
			}

		} else if (atividade == taskEntregarCracha) {
			valida("responsavel", i18n.translate("text.responsavel"));
			valida("dataCracha", i18n.translate("text.data"));
			valida("dataSolicCracha", i18n.translate("text.dataSolicCracha"));
			valida("dataLiberaCracha", i18n.translate("text.dataLiberaCracha"));
			//validaCheckListDocContratual();
		} else if (atividade == taskTreinarColaborador) {
			valida("nomeAprovadorSeguranca", i18n.translate("text.nomeAprovador"));
			valida("dataAprovacaoSeguranca", i18n.translate("text.data"));

			valida("treinamento", i18n.translate("text.treinamento"));
			if (form.getValue("treinamento") == "MipCliente") {
				valida("dataTreinaMIP", i18n.translate("text.dataTreinaMIP"));
				valida("dataTreinaCliente", i18n.translate("text.dataTreinaCliente"));
			} else if (form.getValue("treinamento") == "Mip") {
				valida("dataTreinaMIP", i18n.translate("text.dataTreinaMIP"));
			} else if (form.getValue("treinamento") == "Cliente") {
				valida("dataTreinaCliente", i18n.translate("text.dataTreinaCliente"));
			}

			//valida("entregueEPI", i18n.translate("text.entregueEPI"));
			//if(form.getValue("entregueEPI") == "nao"){
			//	valida("justificativaSeguranca", i18n.translate("text.justificativa"));
			//}

		} else if (atividade == taskValidaFuncAtivo) {
			if (form.getValue("validarCpfDiferente") == "1") {
				Errors
						.push("- CPF do candidato informado no Rm está diferente do informado no Processo. Favor ajustar");
			}
			if (form.getValue("validarSolicitDesligamento") == "1") {
				Errors.push("- Candidato Identificado como Ativo no RM");
			}
		}
		for (var i = 0; i < Errors.length; i++) {
			msg += "\n" + Errors[i];
		}

		if (msg != "") {
			throw "Os seguintes campos devem ser preenchidos: \n\n<b>" + msg
					+ "</b>\n\n\n";
		}

	}

	function valida(campo, mensagem) {
		if (form.getValue(campo) == "") {
			Errors.push("- " + mensagem);
		}
	}

	function validaSelect(campo, mensagem) {
		if (form.getValue(campo) == 0) {
			Errors.push("- " + mensagem);
		}
	}

	function validaPaiFilho(nomeTabela, campo, mensagem) {
		var tablename = form.getChildrenIndexes(nomeTabela);
		tablename.forEach(function(i) {

			var value = form.getValue(campo + "___" + i);

			if (value == "" || value == 0) {

				Errors.push("- " + mensagem + " da linha " + i);
			}
		});
	}

	function validarCPF() {

		var datasetCPF = DatasetFactory.getDataset("ds_RM_WS214_RH_ValidaCPF", null,
				constraints, null);
		if (datasetCPF.rowsCount > 0) {
			return false;
		}
		return true;
	}

	function validaCheckListDocPessoal() {

		validaCampoCheckList("ckConsultaESocial", i18n.translate("text.ckConsultaESocial"));
		validaCampoCheckList("ckRG", i18n.translate("text.ckRG"));
		validaCampoCheckList("ckCPF", i18n.translate("text.ckCPF"));
		validaCampoCheckList("ckTitEleitoral", i18n.translate("text.ckTitEleitoral"));
		validaCampoCheckList("ckCNH", i18n.translate("text.ckCNH"));
		validaCampoCheckList("ckConta", i18n.translate("text.ckConta"));
		validaCampoCheckList("ckPIS", i18n.translate("text.ckPIS"));
		validaCampoCheckList("ckVacina", i18n.translate("text.ckVacina"));
		validaCampoCheckList("ckReservista", i18n.translate("text.ckReservista"));
		validaCampoCheckList("ckEscolaridade", i18n.translate("text.ckEscolaridade"));
		validaCampoCheckList("ckResidencia", i18n.translate("text.ckResidencia"));
		validaCampoCheckList("ckCasamento", i18n.translate("text.ckCasamento"));
		validaCampoCheckList("ckFilhoNascimento", i18n.translate("text.ckFilhoNascimento"));
		validaCampoCheckList("ckCPFDep", i18n.translate("text.ckCPFDep"));
		validaCampoCheckList("ckFilhoVacina", i18n.translate("text.ckFilhoVacina"));
		validaCampoCheckList("ckSUS", i18n.translate("text.ckSUS"));
		validaCampoCheckList("ckFilhoEscolar", i18n.translate("text.ckFilhoEscolar"));
	}

	function validaCheckListDocContratual() {

		validaCampoCheckList("ckFicha", i18n.translate("text.ckFicha"));
		validaCampoCheckList("ckContratoExp", i18n.translate("text.ckContratoExp"));
		validaCampoCheckList("ckExame", i18n.translate("text.ckExame"));
		validaCampoCheckList("ckAcordoCompHoras", i18n.translate("text.ckAcordoCompHoras"));
		validaCampoCheckList("AutDesconto", i18n.translate("text.AutDesconto"));
		validaCampoCheckList("ckCTPSDev", i18n.translate("text.ckCTPSDev"));
		validaCampoCheckList("ckCTPSExp", i18n.translate("text.ckCTPSExp"));
		validaCampoCheckList("ckFichaSalFamilia", i18n.translate("text.ckFichaSalFamilia"));
		validaCampoCheckList("ckAjudaCusto", i18n.translate("text.ckAjudaCusto"));
		validaCampoCheckList("ckPlanoSaude", i18n.translate("text.ckPlanoSaude"));
		validaCampoCheckList("ckTermoIRRF", i18n.translate("text.ckTermoIRRF"));
		validaCampoCheckList("ckTermoSalFamilia", i18n.translate("text.ckTermoSalFamilia"));
		validaCampoCheckList("ckValeTransporte", i18n.translate("text.ckValeTransporte"));
		validaCampoCheckList("ckOSAdmissional", i18n.translate("text.ckOSAdmissional"));
		validaCampoCheckList("ckComprovanteESocial", i18n.translate("text.ckComprovanteESocial"));
	}

	function validaCampoCheckList(campo, mensagem) {

		if (form.getValue(campo + "1") == ""
				&& form.getValue(campo + "2") == "") {
			Errors.push("- " + mensagem);
		}

	}

	function validaEmissaoASO() {

		var dt = form.getValue("dataEmissaoASO");

		if (dt == "")
			Errors.push("- " + i18n.translate("text.dataEmissaoASO"));
		else {

			var dataMaxASO = new Date();
			dataMaxASO.setHours(0, 0, 0, 0);
			var dataMinASO = new Date();
			dataMinASO.setDate(dataMinASO.getDate() - 90);
			dataMinASO.setHours(0, 0, 0, 0);

			var dia = dt.split("/")[0];
			var mes = dt.split("/")[1];
			var ano = dt.split("/")[2];
			var dataEmissaoASO = new Date(ano, mes - 1, dia, 0, 0, 0);

			if (dataEmissaoASO < dataMinASO)
				Errors.push("- Data da ASO não pode ser inferior a 90 dias");

			if (dataEmissaoASO > dataMaxASO)
				Errors.push("- Data da ASO não pode ser superior a data atual");

		}

	}

	function validaContratoExp() {

		var nomeFuncao = form.getValue("funcao");
		var contratoExp;

		nomeFuncao = nomeFuncao.toLowerCase();

		if (nomeFuncao.indexOf("estagiario") != -1
				|| nomeFuncao.indexOf("estagiário") != -1
				|| nomeFuncao.indexOf("aprendiz") != -1
				|| nomeFuncao.indexOf("diretor ") != -1
				|| nomeFuncao == "diretor")
			contratoExp = "naoAplica";
		else
			contratoExp = "45";

		if (form.getValue("contratoExp") != contratoExp)
			Errors.push("- Contrato de Experiência invalido para esta função");

	}

	function validarPIS(pis) {
		var multiplicadorBase = "3298765432";
		var total = 0;
		var resto = 0;
		var multiplicando = 0;
		var multiplicador = 0;
		var digito = 99;

		// Retira a mascara
		var numeroPIS = pis.replace(".", "");
		numeroPIS = numeroPIS.replace(",", "");

		if ((numeroPIS + "").length !== 11 || numeroPIS === "00000000000"
				|| numeroPIS === "11111111111" || numeroPIS === "22222222222"
				|| numeroPIS === "33333333333" || numeroPIS === "44444444444"
				|| numeroPIS === "55555555555" || numeroPIS === "66666666666"
				|| numeroPIS === "77777777777" || numeroPIS === "88888888888"
				|| numeroPIS === "99999999999") {
			return false;
		} else {
			for (var i = 0; i < 10; i++) {
				multiplicando = parseInt(numeroPIS.substring(i, i + 1));
				multiplicador = parseInt(multiplicadorBase.substring(i, i + 1));
				total += multiplicando * multiplicador;
			}

			resto = 11 - total % 11;

			resto = resto === 10 || resto === 11 ? 0 : resto;

			digito = parseInt("" + (numeroPIS + "").charAt(10));
			return resto === digito;
		}
	}
	

	
	function validaPaiFilhoDependente() {
		
		var tablename = form.getChildrenIndexes("tbdependentes");
		var qtdMae = 0;
		var qtdConjugeCompanheiro = 0;		
		
		tablename.forEach(function(i) {

			var grauDependente = form.getValue("grauDependente" + "___" + i);
			var cpfDependente = form.getValue("cpfDependente" + "___" + i);			
			var nomeDependente = form.getValue("nomeDependente" + "___" + i);
			var cartaoVacina = form.getValue("ckcartaoVacina" + "___" + i);
			var comprovante = form.getValue("ckcomprovante" + "___" + i);
			var dtNascimentoDepend = form.getValue("dtNascimentoDepend" + "___" + i);
			
			if(cpfDependente != ""){
			
				var c1 = DatasetFactory.createConstraint("CPF_DIGT", cpfDependente, cpfDependente, ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("NOME", nomeDependente, nomeDependente, ConstraintType.MUST);
				var constraints = new Array(c1, c2);
				var dataset = DatasetFactory.getDataset("ds_RM_WS210_RH_ValidaCPF", null, constraints, null);
				
				if (dataset.getValue(0, "Quantidade") >= 1) {
					Errors.push("- "
							+ "CPF ou nome está cadastrado em outra pessoa"
							+ " da linha " + i);
				}
				
			}
  
			if (grauDependente == "Filho(a) Válido"	|| grauDependente == "Filho(a) Inválido") {
				if (cpfDependente == "" || cpfDependente == 0) {
						Errors.push("- " + "CPF" + " da linha " + i);
					}
				if (cartaoVacina == ""){
					Errors.push("- " + "Cartão Vacina" + " da linha " + i);
				}
				if(comprovante == ""){
					Errors.push("- " + "Frequencia Escolar" + " da linha " + i);
				}				
			}
			
			if (grauDependente == "Filho(a) Válido"	|| grauDependente == "Filho(a) Inválido" || grauDependente == "Cônjuge" || grauDependente == "Companheiro(a)") {
				
				if(dtNascimentoDepend == ""){
					Errors.push("- " + "Data de Nascimento do Dependente" + " da linha " + i);
				}
				
			}
			
			if (grauDependente == "Cônjuge" || grauDependente == "Companheiro(a)" || grauDependente == "Ex-conjuge" || grauDependente == "Ex-companheiro(a)")
				qtdConjugeCompanheiro++;
			
			if (grauDependente == "Mãe")
				qtdMae++;
			
		});
		
		if(qtdConjugeCompanheiro > 1)
			Errors.push("- Não é permitido cadastrar mais de um Cônjuge / Companheiro(a)");
		
		if(qtdMae == 0)
			Errors.push("- É obrigatório realizar o cadastro da Mãe como Dependente");		
		
	}	 

	function validarPISDuplicado() {
		var pis = form.getValue("pis");
		var codPessoa = form.getValue("codPessoa");
		var c1 = DatasetFactory.createConstraint("PARAM_PIS", pis, pis, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("PARAM_CODPESSOA", codPessoa, codPessoa, ConstraintType.MUST);
		var constraints = new Array(c1, c2);
		var dataset = DatasetFactory.getDataset("ds_RM_WS209_WRH02_PisValidacao", null, constraints, null);

		if (dataset.values != undefined && dataset.values != null) {

			var quantidade;
			if (dataset.rowsCount == 1) {
				quantidade = dataset.getValue(0, "Quantidade");
			}
			if (quantidade == 0) {
				return true;
			}
			return "- PIS está cadastrado em outra pessoa";
		}
		return "- Erro executar dataset ds_RM_WS209_WRH02_PisValidacao";
	}
	

	function retornaUltimoCaracter(){ 
	     var contaCorrente = form.getValue("contaCorrente");
	     var ultimoCaracter = contaCorrente.slice(-1);
	}

}