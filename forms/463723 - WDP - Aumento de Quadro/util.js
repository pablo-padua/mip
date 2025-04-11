function setCamposObrigatorios(arrayCampos){
	for(var i = 0; i < arrayCampos.length; i++){
		setCampoObrigatorio(arrayCampos[i]);
	}
}

function setCampoObrigatorio(id){
	$("#lbl_" + id).addClass('required');
}

function removeCampoObrigatorio(id){
	$("#lbl_" + id).removeClass('required');
}

function buscarAtividadeAtual() {
	return getValue("WKNumState");
}

/**
 * Funcao para retornar o indice do elemento obj dentro de um pai x filho
 * @param obj
 * @returns
 */
function getIndice(obj){
	var nomeCampo = obj.id;
	var arrayNomeCampo = nomeCampo.split("___");
	if(arrayNomeCampo != null && arrayNomeCampo != undefined && arrayNomeCampo.length > 1){
		return parseInt(arrayNomeCampo[1]);
	}
	return -1;
}

function getIndex(id){
	var arrayNomeCampo = id.split("___");
	if(arrayNomeCampo != null && arrayNomeCampo != undefined && arrayNomeCampo.length > 1){
		return parseInt(arrayNomeCampo[1]);
	}
	return -1;
}

/**
 * Retorna o email de um usuário dada a matricula
 * @param matricula
 * @returns email
 */
function getEmail(matricula) {
	var dsColleagues = null;
	
	var c1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
	dsColleagues = DatasetFactory.getDataset("colleague", null, new Array(c1, c2), null);
	if (dsColleagues != null && dsColleagues != undefined && dsColleagues.values.length > 0) {
		return dsColleagues.values[0]["mail"];
	}
	return null;
}

/**
 * Retorna o nome de um usuário dada a matricula
 * @param matricula
 * @returns nome
 */
function getNome(matricula){
	var dsColleagues = null;
	
	var c1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
	dsColleagues = DatasetFactory.getDataset("colleague", null, new Array(c1, c2), null);
	if (dsColleagues != null && dsColleagues != undefined && dsColleagues.values.length > 0) {
		return dsColleagues.values[0]["colleagueName"];
	}
	return null;
}

function buscarUsuarioLogado() {
	return getValue("WKUser");
}

function existeUsuarioFluig(login){
	var dsColleagues = null;
	
	var c1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("login", login, login, ConstraintType.MUST);
	dsColleagues = DatasetFactory.getDataset("colleague", null, new Array(c1, c2), null);
	if (dsColleagues != null && dsColleagues != undefined && dsColleagues.values.length > 0) {
		return true;
	}
	return false;
}

function removeErrorClassZoomPaiFilho(campo){
	if($("#" + campo).closest('.has-error')){
		$("#" + campo).closest('.has-error').removeClass("has-error");
	}
}

function removeErrorClass(campo){
	if($("#" + campo).parent().hasClass("has-error")){
		$("#" + campo).parent().removeClass("has-error");
	}
}

function addErrorClass(campo){
	if(!($("#" + campo).parent().hasClass("has-error"))){
		$("#" + campo).parent().addClass("has-error");
	}
}

function addRadioErrorClass(campo){
	var radio = $('input[name=' + campo + ']');
	if(!(radio.parent().parent().hasClass("has-error"))){
		radio.parent().parent().addClass("has-error");
	}
}

function removeRadioErrorClass(campo){
	var radio = $('input[name=' + campo + ']');
	if((radio.parent().parent().hasClass("has-error"))){
		radio.parent().parent().removeClass("has-error");
	}
}

function temValor(campo){
	if(campo != null && campo != undefined && campo != "")
		return true;
	else
		return false;
}

function hasValue(campo){
	var campoValue = $("#" + campo).val();
	if(campoValue != null && campoValue != undefined && campoValue != "")
		return true;
	else
		return false;
}

function hasArrayValue(arrayField){
	if(arrayField != null && arrayField != undefined && arrayField.length > 0)
		return true;
	else
		return false;
}

function getValor(valor){
	var valorNumero = valor.toString().replaceAll("R$ ", "");
	var valorSemPonto = valorNumero.replaceAll(".", "");
	var valorFinal = valorSemPonto.replaceAll(",", ".");
	return valorFinal;
}

function arredonda(num, numCasaDecimais) {
	return +(Math.round(num + "e+" + numCasaDecimais) + "e-" + numCasaDecimais);
}

/**
 * formatNumber(number, n, x, s, c)
 * 
 * @param number: numero que se deseja formatar
 * @param integer n: quantidade de casas decimais
 * @param integer x: quantidade de casas milhar
 * @param mixed   s: separador de milhar
 * @param mixed   c: separador decimal
 */
function formatNumber(number, n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')', num = parseFloat(number).toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
}

function getDataAmericana(data){
	var arrayData = data.split("/");
	var dia = arrayData[0];
	var mes = arrayData[1];
	var ano = arrayData[2];
	
	return ano + "/" + mes + "/" + dia;
}

function buscarData(){
	return new Date();
}

function buscarDiaAtual(){
	return buscarData().getDate().toString();
}

function buscarMesAtual(){
	return (buscarData().getMonth()+1).toString();
}

function buscarAnoAtual(){
	return buscarData().getFullYear().toString();
}

function buscarDataAtualSistema(){
	return formatarData(buscarDiaAtual(), buscarMesAtual(), buscarAnoAtual());
}

function formatarData(dia, mes, ano){
	if(dia.length == 1)
		dia = 0+dia;	
	if(mes.length == 1)
		mes = 0+mes;	
	return dia+"/"+mes+"/"+ano;
}

//FUNCOES RELACIONADAS AOS CAMPOS DE DATAS
function aplicarMascaraCampos(){
    $('.data').mask('00/00/0000');
}

function ativarChangeValidarDt() {
    $(".data").change(
            function() {
                var data = this.value;
                if (data != "") {
                    var qtdCaracter = this.value.length;
                    if (qtdCaracter < 10 || !validaData(data)) {
                        FLUIGC
                        .toast({
                            title : '',
                            message : "Data Informada Não é Válida.",
                            type : 'danger'
                        });
                        $("#" + this.id).val("");
                    }
                }
            });
}

function validaData(valor) {
    var date = valor;
    var ardt = new Array;
    var ExpReg = new RegExp(
            "(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
    ardt = date.split("/");
    erro = false;
    if (date.search(ExpReg) == -1) {
        erro = true;
    } else if (((ardt[1] == 4) || (ardt[1] == 6) || (ardt[1] == 9) || (ardt[1] == 11))
            && (ardt[0] > 30))
        erro = true;
    else if (ardt[1] == 2) {
        if ((ardt[0] > 28) && ((ardt[2] % 4) != 0))
            erro = true;
        if ((ardt[0] > 29) && ((ardt[2] % 4) == 0))
            erro = true;
    }
    if (erro) {

 

        return false;
    }
    return true;
}