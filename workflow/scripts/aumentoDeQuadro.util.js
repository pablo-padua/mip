function getIndexes(fieldReference){
	var regex = new RegExp(fieldReference+'___');
	var map = hAPI.getCardData(parseInt(getValue('WKNumProces')));
	var iterator = map.keySet().iterator();
	var indexes = new java.util.TreeSet();	
	
	while(iterator.hasNext()){
		var id = iterator.next();
		
		if(id.match(regex) == null) continue;
		else indexes.add(id.split('___')[1]);
	}
	
	return indexes;
}

function setNode(node, valor) {
	var line = createNode(node) + valor + createNode("/" + node);
	return line;
}

function createNode(node) {
	return "<" + node + ">";
}

function deleteNode(node) {
	return "<" + node + ">";
}

function buscarData() {
	return new Date();
}

function buscarDiaAtual() {
	return buscarData().getDate().toString();
}

function buscarMesAtual() {
	return (buscarData().getMonth() + 1).toString();
}

function buscarAnoAtual() {
	return buscarData().getFullYear().toString();
}

function buscarDataAtualSistema() {
	return formatarData(buscarDiaAtual(), buscarMesAtual(), buscarAnoAtual());
}

function formatarData(dia, mes, ano) {
	if (dia.length == 1)
		dia = 0 + dia;
	if (mes.length == 1)
		mes = 0 + mes;
	return dia + "/" + mes + "/" + ano;
}

function getValor(valor) {
	var valorNumero = valor.toString().replace("R$ ", "");
	var valorSemPonto = valorNumero.replace(".", "");
	return valorSemPonto;
}

function stringToDate(dateString) {

	//var today = new java.util.Date();
	var format = new java.text.SimpleDateFormat("dd/MM/yyyy");
	var date = format.parse(dateString);
	format = new java.text.SimpleDateFormat("yyyy-MM-dd");
	var data = format.format(date);
	data += "T00:00:00";

	return data;
}

function ajusteData(dataWeb){
    if(dataWeb == "") return "";
    
    var data = dataWeb;
    
    if(dataWeb.indexOf("/") > -1){
          data = dataWeb.split("/");
          data = data[2]+"-"+data[1]+"-"+data[0]+"T00:00:00";
    }else{
          data = dataWeb+"T00:00:00";
    }
    return data;
}
/*
function getTabSalarial(codColigada, codSecao, codFuncao){
	
	var tabela = new Object();
	
	try{
		var coligada = codColigada;
		var secao = codSecao;
		var funcao = codFuncao;
		
		if (funcao != "" && coligada != "" && secao != ""){
			
			var c1 = DatasetFactory.createConstraint("CODSECAO", secao, secao, ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
			var c3 = DatasetFactory.createConstraint("CODFUNCAO", funcao, funcao, ConstraintType.MUST);	
			var constraints = new Array(c1, c2, c3);
			var dataset = DatasetFactory.getDataset("ds_RM_retorna_salario", null, constraints, null);
			
			log.info("dataset.getValue(0, 'SALARIO'): " + dataset.getValue(0, "SALARIO"));
			
			tabela.salario = dataset.getValue(0, "SALARIO");
			tabela.salario = tabela.salario.replace(".", ",");
			
			log.info("getValor(tabela.salario): " + tabela.salario);
			
			tabela.codTabela = dataset.getValue(0, "CODTABELA");
			tabela.faixa = dataset.getValue(0, "FAIXA");
			tabela.codFilial = dataset.getValue(0, "CODFILIAL");
			
			if (tabela.salario == "" || tabela.salario == null || tabela.salario == undefined)
				throw "O dataset (ds_RM_retorna_salario) não retornou o valor do salário.";
		}
		else
			throw "Não foi possível consultar dados na Tabela Salarial. Verique campos: coligada, secao e funcao.";
	}
	catch(e){
		
		throw "Erro ao tentar consultar o dataset (ds_RM_retorna_salario): " + e;
		
	}
	
	return tabela;
		
}
*/
function getProcessName(processId){
	processName = "";
	var fields = null;
	var constraints = [];
	var order = null;

	constraints.push(DatasetFactory.createConstraint("processDefinitionPK.processId",processId,processId,ConstraintType.MUST));

	var dataset = DatasetFactory.getDataset("processDefinition",fields,constraints,order);
	
	if(dataset != null && dataset.rowsCount > 0){
		processName = dataset.getValue(0,"processDescription");
	}
	
	return processName;
}

function loginFluig(){

	try{
		
		var connect = DatasetFactory.getDataset('ds_mip_connector', null, null, null);
		
		var usuario = new Object();
		usuario.login = connect.getValue(0, 'USUARIOECM');
		usuario.senha = connect.getValue(0, 'SENHAECM');
		
		return usuario;
		
	}catch(e){
		
		throw "Erro dataset (ds_mip_connector): " + e;
		
	}
	
}

function ajustarDataServidor(data){
	if (data != ""){
		data = data.split("T");
		var dataFinal = data[0];
		var split = dataFinal.split('-');
		return split[2] + '/' + split[1] + '/' + split[0];
	} else {
		return "";
	}
}