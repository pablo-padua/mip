function enableFields(form){ 
	var atividadeAtual = getValue("WKNumState");
	
	if (atividadeAtual == taskInicio_0 || atividadeAtual == taskInicio || atividadeAtual == taskRecursosComputacionais){
		bloqueiaInicio(form);
		bloqueiaSelecao(form);
		bloqueiaAprovTeste(form);
		bloqueiaTestesReprovadosRH(form);
		bloqueiaAprovacao1(form);
		bloqueiaAprovacao2(form);
		bloqueiaInformacoesComplementares(form);
		bloqueiaValidarDoc(form);
		bloqueiaAgendarExames(form)
		bloqueiaExames(form);
		bloqueiaAdmissao(form);
		bloqueiaCracha(form);
		bloqueiaSeguranca(form);
		bloqueiaCancelamento(form);
	} 
	else if(atividadeAtual == taskProcessoSeletivoRH){
		bloqueiaInicio(form);
		bloqueiaAprovTeste(form);
		bloqueiaTestesReprovadosRH(form);
		bloqueiaAprovacao1(form);
		bloqueiaAprovacao2(form);
		bloqueiaInformacoesComplementares(form);
		bloqueiaValidarDoc(form);
		bloqueiaAgendarExames(form)
		bloqueiaExames(form);
		bloqueiaAdmissao(form);
		bloqueiaCracha(form);
		bloqueiaSeguranca(form);
		bloqueiaCancelamento(form);
	}
	else if(atividadeAtual == taskProcessoSeletivoDP){
		bloqueiaInicio(form);
		bloqueiaAprovTeste(form);
		bloqueiaTestesReprovadosRH(form);
		bloqueiaAprovacao1(form);
		bloqueiaAprovacao2(form);
		bloqueiaValidarDoc(form);
		bloqueiaAgendarExames(form)
		bloqueiaExames(form);
		bloqueiaAdmissao(form);
		bloqueiaCracha(form);
		bloqueiaSeguranca(form);
		bloqueiaCancelamento(form);
	}
	else if(atividadeAtual == taskConferirTestes){
		bloqueiaInicio(form);
		bloqueiaTestesReprovadosRH(form);
		bloqueiaSelecao(form);
		bloqueiaInformacoesComplementares(form);
		bloqueiaAprovacao1(form);
		bloqueiaAprovacao2(form);
		bloqueiaValidarDoc(form);
		bloqueiaAgendarExames(form)
		bloqueiaExames(form);
		bloqueiaAdmissao(form);
		bloqueiaCracha(form);
		bloqueiaSeguranca(form);
	}
	else if(atividadeAtual == taskTestesReprovadosRH){
		bloqueiaInicio(form);
		bloqueiaAprovTeste(form);		
		bloqueiaSelecao(form);
		bloqueiaInformacoesComplementares(form);
		bloqueiaAprovacao1(form);
		bloqueiaAprovacao2(form);
		bloqueiaValidarDoc(form);
		bloqueiaAgendarExames(form)
		bloqueiaExames(form);
		bloqueiaAdmissao(form);
		bloqueiaCracha(form);
		bloqueiaSeguranca(form);
	}
	else if(atividadeAtual == taskAprovarCandidatoSolicitante){
		bloqueiaInicio(form);
		bloqueiaSelecao(form);
		bloqueiaAprovTeste(form);
		bloqueiaTestesReprovadosRH(form);
		bloqueiaInformacoesComplementares(form);		
		bloqueiaAprovacao2(form);
		bloqueiaValidarDoc(form);
		bloqueiaAgendarExames(form)
		bloqueiaExames(form);
		bloqueiaAdmissao(form);
		bloqueiaCracha(form);
		bloqueiaSeguranca(form);
		bloqueiaCancelamento(form);
	}
	else if(atividadeAtual == taskAprovarCandidatoGestor){
		bloqueiaInicio(form);
		bloqueiaSelecao(form);
		bloqueiaAprovTeste(form);
		bloqueiaTestesReprovadosRH(form);
		bloqueiaAprovacao1(form);
		bloqueiaInformacoesComplementares(form);
		bloqueiaValidarDoc(form);
		bloqueiaAgendarExames(form)
		bloqueiaExames(form);
		bloqueiaAdmissao(form);
		bloqueiaCracha(form);
		bloqueiaSeguranca(form);
		bloqueiaCancelamento(form);
	}
	else if(atividadeAtual == taskAgendarExamesAdmissionais){
		bloqueiaInicio(form);
		bloqueiaSelecao(form);
		bloqueiaAprovTeste(form);
		bloqueiaTestesReprovadosRH(form);
		bloqueiaAprovacao1(form);
		bloqueiaAprovacao2(form);
		bloqueiaInformacoesComplementares(form);
		bloqueiaValidarDoc(form);
		bloqueiaExames(form);
		bloqueiaAdmissao(form);
		bloqueiaCracha(form);
		bloqueiaSeguranca(form);
	}
	else if(atividadeAtual == taskDocumentacaoPendente){
		bloqueiaInicio(form);
		bloqueiaSelecao(form);
		bloqueiaAprovTeste(form);
		bloqueiaTestesReprovadosRH(form);
		bloqueiaAprovacao1(form);
		bloqueiaAprovacao2(form);
		bloqueiaInformacoesComplementares(form);
		bloqueiaValidarDoc(form);
		bloqueiaAgendarExames(form)
		bloqueiaExames(form);
		bloqueiaAdmissao(form);
		bloqueiaCracha(form);
		bloqueiaSeguranca(form);
		bloqueiaCancelamento(form);
	}
	else if(atividadeAtual == taskRealizarExamesAdmissionais){
		bloqueiaInicio(form);
		bloqueiaSelecao(form);
		bloqueiaAprovTeste(form);
		bloqueiaTestesReprovadosRH(form);
		bloqueiaAprovacao1(form);
		bloqueiaAprovacao2(form);
		bloqueiaInformacoesComplementares(form);
		bloqueiaValidarDoc(form);
		bloqueiaAgendarExames(form)
		bloqueiaAdmissao(form);
		bloqueiaCracha(form);
		bloqueiaSeguranca(form);
	}
	else if(atividadeAtual == taskValidarDocumentacao){
		bloqueiaInicio(form);
		bloqueiaSelecao(form);
		bloqueiaAprovTeste(form);
		bloqueiaTestesReprovadosRH(form);
		bloqueiaAprovacao1(form);
		bloqueiaAprovacao2(form);
		bloqueiaInformacoesComplementares(form);
		bloqueiaAgendarExames(form)
		bloqueiaExames(form);
		bloqueiaAdmissao(form);
		bloqueiaCracha(form);
		bloqueiaSeguranca(form);
	}
	else if(atividadeAtual == taskAdmitirColaborador){
		bloqueiaInicio(form);
		bloqueiaSelecao(form);
		bloqueiaAprovTeste(form);
		bloqueiaTestesReprovadosRH(form);
		bloqueiaAprovacao1(form);
		bloqueiaAprovacao2(form);
		bloqueiaInformacoesComplementares(form);
		bloqueiaValidarDoc(form);
		bloqueiaAgendarExames(form)
		bloqueiaExames(form);
		bloqueiaCracha(form);
		bloqueiaSeguranca(form);
	}
	else if(atividadeAtual == taskEntregarCracha){
		bloqueiaInicio(form);
		bloqueiaSelecao(form);
		bloqueiaAprovTeste(form);
		bloqueiaTestesReprovadosRH(form);
		bloqueiaAprovacao1(form);
		bloqueiaAprovacao2(form);
		bloqueiaInformacoesComplementares(form);
		bloqueiaValidarDoc(form);
		bloqueiaAgendarExames(form)
		bloqueiaExames(form);
		bloqueiaAdmissao(form);
		bloqueiaSeguranca(form);
	}
	else if(atividadeAtual == taskTreinarColaborador){
		bloqueiaInicio(form);
		bloqueiaSelecao(form);
		bloqueiaAprovTeste(form);
		bloqueiaTestesReprovadosRH(form);
		bloqueiaAprovacao1(form);
		bloqueiaAprovacao2(form);
		bloqueiaInformacoesComplementares(form);
		bloqueiaValidarDoc(form);
		bloqueiaAgendarExames(form)
		bloqueiaExames(form);
		bloqueiaAdmissao(form);
		bloqueiaCracha(form);
	}else{
		bloqueiaInicio(form);
		bloqueiaSelecao(form);
		bloqueiaAprovTeste(form);
		bloqueiaTestesReprovadosRH(form);
		bloqueiaAprovacao1(form);
		bloqueiaAprovacao2(form);
		bloqueiaInformacoesComplementares(form);
		bloqueiaValidarDoc(form);
		bloqueiaAgendarExames(form)
		bloqueiaExames(form);
		bloqueiaCracha(form);
		bloqueiaSeguranca(form);
	}
}

function bloqueiaInicio(form){
	form.setEnabled("nomeSolicitante",false);
	form.setEnabled("dataSolicitacao",false);
	form.setEnabled("obraSetor",false);
	form.setEnabled("centroCusto",false);
	form.setEnabled("secao",false);
	form.setEnabled("funcao",false);
	form.setEnabled("nomeFaixa",false);
	form.setEnabled("salario",false);
	form.setEnabled("divulgacaoVaga",false);
}

function bloqueiaSelecao(form){
	form.setEnabled("numRequisicaoSelecao",false);
	form.setEnabled("nomeCandidato",false);
	form.setEnabled("cidade",false);
	form.setEnabled("dataContato",false);
	form.setEnabled("pis",false);
	form.setEnabled("dataChegada",false);
	form.setEnabled("dataPrevAdmissao",false);
	form.setEnabled("nomeAprovadorSelecao",false);
	form.setEnabled("aprovacaoSelecao",false);
	form.setEnabled("justificativaSelecao",false);
}

function bloqueiaAprovTeste(form){
	form.setEnabled("aprovTestesValida",false);
	form.setEnabled("observacoesTestesValida",false);
}

function bloqueiaTestesReprovadosRH(form){
	form.setEnabled("aprovTestesReprovados",false);
}

function bloqueiaAprovacao1(form){
	form.setEnabled("nomeAprovador",false);
	form.setEnabled("dataAprovacao",false);
	form.setEnabled("aprovacao",false);
	form.setEnabled("justificativa",false);
}

function bloqueiaAprovacao2(form){
	form.setEnabled("nomeAprovador2",false);	
	form.setEnabled("dataAprovacao2",false);
	form.setEnabled("aprovacao2",false);
	form.setEnabled("justificativa2",false);
}

function bloqueiaInformacoesComplementares(form){
	form.setEnabled("alimentacao",false);
	form.setEnabled("tipoConta",false);
	form.setEnabled("cestaBasica",false);
	form.setEnabled("mobiDesmobilizacao",false);
	form.setEnabled("planoSaude",false);
	form.setEnabled("viagens",false);
	form.setEnabled("periodo",false);
	form.setEnabled("localidade",false);
	form.setEnabled("horario",false);
	form.setEnabled("indiceHorario",false);
	form.setEnabled("equipeSEO",false);
	form.setEnabled("experiencia",false);
	form.setEnabled("contratoExp",false);
	form.setEnabled("alojado",false);
	form.setEnabled("descAlojamento",false);
	form.setEnabled("indicacao",false);
	form.setEnabled("observacao",false);
	form.setEnabled("contaCorrente",false);
	form.setEnabled("agencias",false);
	form.setEnabled("bancario",false);
	form.setEnabled("botaoAddDependente",false);
	
	var indexes = form.getChildrenIndexes("tbdependentes");
	 for ( var i in indexes) {
	    var sufixoNome = '___' + indexes[i];
		form.setEnabled('nomeDependente' + sufixoNome, false);
		form.setEnabled('sexoDependente' + sufixoNome, false);
		form.setEnabled('grauDependente' + sufixoNome, false);
		form.setEnabled('cpfDependente' + sufixoNome, false);
		form.setEnabled('civilDependente' + sufixoNome, false);
		form.setEnabled('dtNascimentoDepend' + sufixoNome, false);
		form.setEnabled('localNascimento' + sufixoNome, false);
		form.setEnabled('ckcartaoVacina' + sufixoNome, false);
		form.setEnabled('ckcomprovante' + sufixoNome, false);
	 }
	form.setEnabled("deficienciaFisica",false);
	form.setEnabled("deficienciaAuditiva",false);
	form.setEnabled("deficienciaFala",false);
	form.setEnabled("deficienciaVisual",false);
	form.setEnabled("deficienciaMental",false);
	form.setEnabled("deficienciaIntelectual",false);
	form.setEnabled("deficienciaReabilitado",false);
	form.setEnabled("cotaPCD",false);
}  
function bloqueiaValidarDoc(form){
	form.setEnabled("nomeAprovadorDoc",false);
	form.setEnabled("dataAprovacaoDoc",false);
	form.setEnabled("aprovacaoDoc",false);
	form.setEnabled("justificativaDoc",false);
	form.setEnabled("dataEmissaoASO",false);
	form.setEnabled("situacaoASO",false);
}

function bloqueiaAgendarExames(form){
	form.setEnabled("nomeAgendarExames",false);
	form.setEnabled("dataAgendarExames",false);
}

function bloqueiaExames(form){
	form.setEnabled("nomeAprovadorMedicina",false);
	form.setEnabled("dataAprovacaoMedicina",false);
	form.setEnabled("aprovacaoMedicina",false);
	form.setEnabled("justificativaMedicina",false);
}

function bloqueiaAdmissao(form){
	form.setEnabled("nomeAprovadorAdmissao",false);
	form.setEnabled("dataAprovacaoAdmissao",false);
	form.setEnabled("aprovacaoAdmissao",false);
	form.setEnabled("justificativaAdmissao",false);
}

function bloqueiaCracha(form){
	form.setEnabled("responsavel",false);
	form.setEnabled("dataCracha",false);
	form.setEnabled("dataSolicCracha",false);
	form.setEnabled("dataLiberaCracha",false);
}

function bloqueiaSeguranca(form){
	form.setEnabled("nomeAprovadorSeguranca",false);
	form.setEnabled("dataAprovacaoSeguranca",false);
	form.setEnabled("treinamento",false);
	//form.setEnabled("entregueEPI",false);
	form.setEnabled("dataTreinaMIP",false);
	form.setEnabled("dataTreinaCliente",false);
	form.setEnabled("justificativaSeguranca",false);
}

function bloqueiaCancelamento(form){
	form.setEnabled("statusCancelamento",false);
	form.setEnabled("justificativaCancelamento",false);
}