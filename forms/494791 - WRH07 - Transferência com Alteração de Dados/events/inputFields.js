function inputFields(form){
	
	acertaFormatoData(form, "dataSolicitacao");
	acertaFormatoData(form, "dataAdmissao");
	acertaFormatoData(form, "dataPromocao");
	acertaFormatoData(form, "dataAlteracao");
	acertaFormatoData(form, "dataAprovacaoTransferencia");
	acertaFormatoData(form, "dataAprovacaoTestes");
	acertaFormatoData(form, "dataGerSede");
	acertaFormatoData(form, "dataAprovTestesValida");	
	acertaFormatoData(form, "dataAprov");
	acertaFormatoData(form, "dataAprovDiretoria");
	acertaFormatoData(form, "dataAprovPresidente");
	acertaFormatoData(form, "dataAprovExames");
	acertaFormatoData(form, "dataValidDadosObra");
	acertaFormatoData(form, "dataValidarSalario");
	acertaFormatoData(form, "dataEfetivar");
	acertaFormatoData(form, "dataAtualizarCadastro");
	
}

function acertaFormatoData(form, campo){
	
	var regEx = /^\d{4}-\d{2}-\d{2}$/;

	var data = form.getValue(campo);
	
	if (data.match(regEx)) {
		
		var split = form.getValue(campo).split('-');
		form.setValue(campo, split[2] + '/' + split[1] + '/' + split[0]);

	}	
	
}