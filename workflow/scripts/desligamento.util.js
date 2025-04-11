function setNode(node, valor) {
	var line = createNode(node) + valor + createNode("/" + node);
	return line;
}

function createNode(node) {
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
	var valorSemPonto = valor.replace(",", ".");
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

function retorna2Caracteres( texto ){	
	return ( texto.length < 2 ) ? "0" + texto: texto;
}

function removePontuacao( texto ){
	return String( texto ).split(".").join("");
}

function getDadosServer(){
	var dataset = DatasetFactory.getDataset('ds_mip_connector', null, null, null);
	
	if( dataset.getRowsCount() == 0 ){
		 throw "Ocorreu um erro ao buscar os parametros do Fluig.";
		 
	}
	
	return dataset;
}

function getNivelAlcadaAtual(){
	var nivelAlcadaAtual = hAPI.getCardValue("nivelAlcadaAtual");
	
	if( nivelAlcadaAtual == "" ){
		hAPI.setCardValue("nivelAlcadaAtual", "1");
		
		return parseInt( 1 );
		
	} else{
		return parseInt( nivelAlcadaAtual );
		
	}
}

function converteCalcParaMoeda( numero, decimais ) {
    var numero = parseFloat( numero ).toFixed( decimais ).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

function converteMoedaBrParaCalc( moedaBr ){
	var valor = retiraPontoString( moedaBr.toString() );	
	valor = valor.replace(",", ".");

	if(valor != ''){
		return parseFloat(valor);
	} else{
		return parseFloat(0);
	}
}

function retiraPontoString( string ){
	string = string.replace(".", "");
	
	if( string.indexOf(".") >= 0 ){
		string = retiraPontoString( string );
		
	}
	
	return string;
}

function buscarNomeUsuario(user) {
	var userName = "";
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
	if (dataset.rowsCount == 1) {
		return dataset.getValue(0, "colleagueName");
	}

	return userName;
}

function diaHoraAtual() {
	var data = new Date();
	var dia = data.getDate();

	if (dia.toString().length == 1) {
		dia = "0" + dia;
	}

	var mes = data.getMonth() + 1;

	if (mes.toString().length == 1) {
		mes = "0" + mes;
	}

	var ano = data.getFullYear();

	var hora = data.getHours();
	if (hora.toString().length == 1) {
		hora = "0" + hora;
	}
	
	var min  = data.getMinutes();
	if (min.toString().length == 1) {
		min = "0" + min;
	}	
	
	return dia + "/" + mes + "/" + ano + " " + hora + ":" + min;
}



/**
 * Verifica se o retorno do RM eh erro de negocio.
 * 
 * @param result: Retorno do RM.
 * @returns boolean.
 */
function isError(result) {
	return isNaN(result.substring(0,1));
}

function getLogin(matricula){
	var login = "";
    var c1 = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("colleague", ["login"], [c1,c2], null);

    if (dataset.rowsCount > 0) {
    	login = dataset.getValue(0, "login");
    }

    return login;
}

// Formata a data com máscara 
function formatDateMaskRM(strDate) {
  if (strDate != null && strDate != '' && strDate != 'undefined') {
    try {
      var arrAux = strDate.split('T');
      var arrDate = arrAux[0].toString().split('-');
      var yyyy = arrDate[0].toString();
      var mm = arrDate[1].toString();
      var dd = arrDate[2].toString();

      return dd + '/' + mm + '/' + yyyy;
    } catch (e) {
      log.error('Erro ao formatar Data: ' + e.message);
      return '';
    }
  } else return '';
}

//Formata a data com máscara 
function formatDateMaskRMSemT(strDate) {
  if (strDate != null && strDate != '' && strDate != 'undefined') {
    try {
      var arrAux = strDate.split(" ");
      var arrDate = arrAux[0].toString().split('-');
      var yyyy = arrDate[0].toString();
      var mm = arrDate[1].toString();
      var dd = arrDate[2].toString();

      return dd + '/' + mm + '/' + yyyy;
    } catch (e) {
      log.error('Erro ao formatar Data: ' + e.message);
      return '';
    }
  } else return '';
}

function formataValor(vlrEntrada){
	var valor = vlrEntrada+'';
	var val = valor.split(".");
	var real = val[0];
	var cent = val[1].substring(0,2);
	return "R$ " + real +","+ cent;
}

function addDays(date, days) {
	log.info("#### addDays date : " + date);
	log.info("#### addDays days : " + days);
	var result = new Date(date);
	log.info("#### addDays result : " + result);
	result.setDate(result.getDate() + days);
	log.info("#### addDays date result: " + result);
	return result;
}