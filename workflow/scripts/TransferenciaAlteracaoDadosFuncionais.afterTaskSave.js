var ativPosInicial = 58;
var gatewayAprovarTransferencia = 62;
var ativEfetivarTransferencia = 117;

function afterTaskSave(colleagueId,nextSequenceId,userList){
	
	if (nextSequenceId == ativPosInicial) {
		preencherIdentificador();
		hAPI.setCardValue("idFluig", getValue("WKNumProces"));
		getGerSede();
	}else if(nextSequenceId == gatewayAprovarTransferencia) {
		
		getGerSede();
	}else if(nextSequenceId == ativEfetivarTransferencia) {
		
		verificaStatusReq();
	}
	
}

function preencherIdentificador() {	
	var obraSetor = hAPI.getCardValue("obraSetorOrigem");
	var chapa = hAPI.getCardValue("chapa");
	var nome = hAPI.getCardValue("nomeFunc");
	hAPI.setCardValue("campoIdentificador", obraSetor +" - "+ chapa +" - "+ nome);
}

function getGerSede(){
	
	var codColigada = hAPI.getCardValue("codColigadaDestino");
	var codFuncaoProposto = hAPI.getCardValue("codFuncaoProposto");
	
	var c1 = DatasetFactory.createConstraint("COLIGADA_I", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODFUNCAO", codFuncaoProposto, codFuncaoProposto, ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	var dataset = DatasetFactory.getDataset("ds_RM_WS136_AprovadorPromocao", null, constraints, null);
	
	hAPI.setCardValue("exigeAprovacaoSede", dataset.getValue(0, "EXIGEAPROVACAOSEDE"));
	hAPI.setCardValue("atribuicaoGerSede", dataset.getValue(0, "APROVADOR"));

}

function verificaStatusReq(){
	
	var codColigada = hAPI.getCardValue("codColigadaOrigem");
	var idReq = hAPI.getCardValue("idReq");
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDREQ", idReq, idReq, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset("ds_RM_retorna_statusReqAlteracaoDados", null, constraints, null);	
	
	try{
	
		hAPI.setCardValue("statusReq", dataset.getValue(0, "CODSTATUS"));
		hAPI.setCardValue("alteracaoEfetivada", dataset.getValue(0, "STATUSREQ"));	
		
	} catch (e) {
		
		hAPI.setCardValue("statusReq", "");
		hAPI.setCardValue("alteracaoEfetivada", "");
		
	}	
	
}