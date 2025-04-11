function inputFields(form){

	acertaFormatoData(form, "dataSolicitacao");
	acertaFormatoData(form, "dataAdmissao");
	acertaFormatoData(form, "dataPrevistaDemissao");
	acertaFormatoData(form, "dataAviso");
	acertaFormatoData(form, "dataInicioAviso");
	acertaFormatoData(form, "dataDemissaoPrevista");
	acertaFormatoData(form, "dataDemissao");
	acertaFormatoData(form, "dataAprovacao");
	acertaFormatoData(form, "dataAprovacao2");
	acertaFormatoData(form, "dataVerificarAvaliacao");
	acertaFormatoData(form, "dataAprovacaoSede");
	acertaFormatoData(form, "dataAprovacaoRH");
	acertaFormatoData(form, "dataEntrevista");
	acertaFormatoData(form, "dataTI");
	acertaFormatoData(form, "dataEPI");
	acertaFormatoData(form, "dataADM");	
	acertaFormatoData(form, "dataFIN");
	acertaFormatoData(form, "dataExames");
	acertaFormatoData(form, "dataAgendamento");
	acertaFormatoData(form, "dataLimiteAtestado");
	acertaFormatoData(form, "dataCalculoObra");
	acertaFormatoData(form, "dataCalculoSede");
	acertaFormatoData(form, "dataPgtoObra");
	acertaFormatoData(form, "dataValidacaoObra");
	acertaFormatoData(form, "dataPgtoSede");
	acertaFormatoData(form, "dataValidacaoSede");
	acertaFormatoData(form, "dataFechamento");
	acertaFormatoData(form, "dataPagamento");
	acertaFormatoData(form, "dataHomologa");
	acertaFormatoData(form, "dataAssinatura");
	
}

function acertaFormatoData(form, campo){
	
	var regEx = /^\d{4}-\d{2}-\d{2}$/;

	var data = form.getValue(campo);
	
	if (data.match(regEx)) {
		
		var split = form.getValue(campo).split('-');
		form.setValue(campo, split[2] + '/' + split[1] + '/' + split[0]);

	}	
	
}