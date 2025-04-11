var ativPosInicial = 128;

function afterTaskSave(colleagueId,nextSequenceId,userList){	
	if (nextSequenceId == ativPosInicial) {
		preencherIdentificador();
	}	
}

function preencherIdentificador() {	
	var tipo = hAPI.getCardValue("hiddenTipoAcao");
	var centrocusto = hAPI.getCardValue("obraSetor");
	var dataAlteracao = hAPI.getCardValue("dataAlteracao");
	if (tipo == "alterar"){
		hAPI.setCardValue("campoIdentificador", "Alterar Tabela - " + dataAlteracao + " - " + centrocusto);
	} else if (tipo == "incluir"){
		hAPI.setCardValue("campoIdentificador", "Criar Nova Tabela - " + centrocusto);
	}
}