var underline = "___";
var indice = -1;

function setSelectedZoomItem(selectedItem){
	
	var arraySelectedItem = selectedItem.inputName.split("___");
	if (arraySelectedItem != null && arraySelectedItem != undefined
			&& arraySelectedItem.length > 1) {
		indice = arraySelectedItem[1];
	}
	
	switch (selectedItem.inputName) {	
	case "obraSetor":		
		$("[name=codColigada]").val(selectedItem["codColigada"]);
		$("[name=codCCObraSetor]").val(selectedItem["codCentroCusto"]);
		
		buscaCCSolicitante(selectedItem["codCentroCusto"]);
		
		$("[name=codAprovador]").val('Pool:Role:' + selectedItem["codAprovador"]);
		$("[name=codAprovadorDiretor]").val('Pool:Role:' + selectedItem["codAprovadorDiretor"]);
		$("[name=codAprovadorPresid]").val(selectedItem["codAprovadorPresid"]);
		$("[name=codDP]").val('Pool:Role:' + selectedItem["codDP"]);
		$("[name=codRH]").val('Pool:Role:' + selectedItem["codRH"]);
		$("[name=codMedicina]").val('Pool:Role:' + selectedItem["codMedicina"]);
		$("[name=codSeguranca]").val('Pool:Role:' + selectedItem["codSeguranca"]);
		if(validaUsusrioPapel(selectedItem["codTI"])){
			$("[name=codTI]").val('Pool:Role:' + selectedItem["codTI"]);
		}else{
			$("[name=codTI]").val('Pool:Role:' + selectedItem["codLogistica"]);
		}

		$("[name=codLogistica]").val('Pool:Role:' + selectedItem["codLogistica"]);
		$("[name=codAdm]").val('Pool:Role:' + selectedItem["codAdm"]);
		$("[name=codFinanceiro]").val('Pool:Role:' + selectedItem["codFinanceiro"]);
		$("[name=tipo]").val(selectedItem["tipo"]);
					
		if(selectedItem["processoDesligamento"] != 'on'){
			window["obraSetor"].clear();	
			FLUIGC.toast({
				title : '',
				message : "A Obra/Setor selecionada n\u00e3o possui Al\u00e7ada de Aprova\u00e7\u00e3o configurada para este processo. Favor contatar a TI.",
				type : 'danger'
			});			
		}
		if($("[name=cargoSolicitante]").val() != "Gerente"){
			reloadZoomFilterValues("funcionario", "CODCOLIGADA," + selectedItem["codColigada"] + ",CHAPA," + $("[name=chapaSolicitante]").val() + ",CODCCUSTO," + selectedItem["codCentroCusto"] + ",ESTABILIDADE,'',GESTAO,0");
		}else{
			reloadZoomFilterValues("funcionario", "CODCOLIGADA," + selectedItem["codColigada"] + ",CHAPA," + $("[name=chapaSolicitante]").val() + ",CODCCUSTO," + selectedItem["codCentroCusto"]);
		}
		break;	
		
	case "funcionario":		
		if ($("[name=codColigada]").val() != ""){

			if(verificaDuplicidade($("[name=codColigada]").val(), selectedItem["CHAPA"]) == false){
				
				var CHAPA = selectedItem["CHAPA"];
				$("[name=chapa]").val(CHAPA);
				$("[name=nomeFunc]").val(selectedItem["NOME"]);			
				$("[name=codPessoaSolic]").val(selectedItem["CODPESSOA"]);			
				$("[name=chapaFuncionario]").val(selectedItem["CHAPA"]);			
				$("[name=funcao]").val(selectedItem["FUNCAO"]);
				$("[name=codFuncao]").val(selectedItem["CODFUNCAO"]);
				$("[name=dataAdmissao]").val(converteDataBanco(selectedItem["DATAADMISSAO"]));
				$("[name=secao]").val(selectedItem["SECAO"]);
				var CODSECAO = selectedItem["CODSECAO"];
				$("[name=codSecao]").val(CODSECAO);
				$("[name=centroCusto]").val(selectedItem["CODCCUSTO"]);
				$("[name=estabilidade]").val(selectedItem["ESTABILIDADE"]);
				$("[name=gestao]").val(selectedItem["GESTAO"]);
				var AVISO_AFASTAMENTO = selectedItem["AVISO_AFASTAMENTO"];
				$("[name=avisoAfastamento]").val(AVISO_AFASTAMENTO);
				
				
				if(AVISO_AFASTAMENTO == '1'){
					window["funcionario"].clear();	
					FLUIGC.toast({
						title : '',
						message : 'Funcion&aacute;rio se encontra afastado, Favor verificar junto ao Departamento de Pessoal os afastamentos lançados no RM.',
						type : 'danger'
					});
				}
				
				var CARGO = selectedItem["CARGO"];
				$("[name=cargoFunc]").val(CARGO);
	
				if(CARGO == "Coordenador" || CARGO == "Engenheiro" || CARGO == "Gerente")
					$("[name=atribuicaoEntrevista]").val("Pool:Role:28"); // WRH - Sede - Recursos Humanos
				else
					$("[name=atribuicaoEntrevista]").val($("[name=codRH]").val()); 
	
				$("[name=aprovador1Alcada]").val(selectedItem["APROVADOR1"]);
				$("[name=aprovador2Alcada]").val(selectedItem["APROVADOR2"]);
				$("[name=SolicitanteChefeSupervisor]").val(selectedItem["CHEFESUPERVISOR"]);

				//validarSolicitAbertaAprov(CHAPA, CODSECAO);

				validarAberturaEspecialDP();
					
				changeFuncionario();
				changeMotivoDemissao();
				aprovadores();
				$("#divMotivoDemissao").show();

				retornaPerguntas(selectedItem["CHAPA"]);
				
				if(selectedItem["CODTIPO"] == "T"){ // Estagiário					
					$("#avisoPrevioNao").prop("checked", true);	
					$("[name=avisoPrevio]:checked").val("nao");
					clickAviso();
					$("#avisoPrevioSim").prop("disabled", true);
				}else
					$("#avisoPrevioSim").prop("disabled", false);
				
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
	
	case "eventoCalculoObra" +underline+indice:
		$("#codEvento"+underline+indice).val(selectedItem["CODIGO"]);
		break;
		
	}
	
}

function removedZoomItem(removedItem) {

	switch (removedItem.inputName) {
		
	case "obraSetor":
		$("[name=codColigada]").val("");
		$("#foto").attr('src', "foto-padrao.jpeg");
		$("[name=chapa]").val("");
		$("[name=funcao]").val("");
		$("[name=dataAdmissao]").val("");
		$("[name=secao]").val("");
		$("[name=centroCusto]").val("");
		window["funcionario"].clear();
		break;	
		
	case "funcionario":		
		$("#foto").attr('src', "foto-padrao.jpeg");
		$("[name=chapa]").val("");
		$("[name=funcao]").val("");
		$("[name=dataAdmissao]").val("");
		$("[name=secao]").val("");
		$("[name=centroCusto]").val("");
		$(".estabilidade").hide();
		$(".avisoAfastamento").hide();
		$(".tbAvaliacao").hide();
		var numPerguntas = $("[name^=perguntas___]").length;
		while(numPerguntas > 0) {
			$("#btDeletePerguntas___" + numPerguntas).trigger('click');
			numPerguntas --;
		}
		break;	
	
	}
	
}

function getValorMonetario(valor) {
	var retorno = valor.split(".");
	var reais = retorno[0];
	var centavos = retorno[1].substring(0,2);
	var valorFormatado = reais + "." + centavos;
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
				msg += "Foi encontrado um processo em aberto no FLUIG para a CHAPA " + CHAPA + ". <br> É necessário cancelar ou concluir o processo antes de realizar uma nova solicitação.<br>";
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