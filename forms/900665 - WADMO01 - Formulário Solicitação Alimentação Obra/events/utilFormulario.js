function buscarIdSolicitacao() {
	return getValue("WKNumProces");
}

function buscarAtividadeAtual() {
	return getValue("WKNumState");
}

function buscarEmpresa() {
	return getValue("WKCompany");
}

function buscarMatriculaUsuarioLogado() {
	//var user = getValue('WKReplacement') != null ? getValue('WKReplacement') : getValue('WKUser');
	var user = getValue('WKUser');
	return user;
}

function buscaDataAtual(){
	var data = new Date();
	var dia = data.getDate().toString();
	var mes = (data.getMonth()+1).toString();
	var ano = data.getFullYear().toString();
	//ano = ano.substring(2);
	if(dia.length == 1)
		dia = 0+dia;	
	if(mes.length == 1)
		mes = 0+mes;	
	return dia+"/"+mes+"/"+ano;
}


function buscarNomeUsuario() {
	var user = buscarMatriculaUsuarioLogado();
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleague", null, [ c1 ], null);
	if (dataset.rowsCount == 1) {
		userName = dataset.getValue(0, "colleagueName");
	}
	return userName;
}



