function validarStatusCandidato(){
	var NumProces = hAPI.getCardValue("NumProces");
	var retorno = '';	
	log.info("INICIO validarStatusCandidato NumProces : " + NumProces);
try{
		
		var idReq = hAPI.getCardValue("numRequisicaoSelecao");
		var coligada = hAPI.getCardValue("codColigada");

		log.info(" validarStatusCandidato idReq : " + idReq);
		log.info(" validarStatusCandidato coligada : " + coligada);
		
		var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("IDREQ", idReq, idReq, ConstraintType.MUST);
		var constraints = new Array(c1,c2);
		var dataset = DatasetFactory.getDataset("ds_RM_retorna_candidato", null, constraints, null);	
		var mensagem = "";
		log.info(" validarStatusCandidato dataset.values.length : " + dataset.values.length);
		
		if(dataset.values.length != 1){
			retorno = true;		
		}
		
		for(var i=0; i < dataset.values.length; i++) {
			var NOME = dataset.getValue(i, "NOME");
			if (NOME  != ""){
				log.info(" validarStatusCandidato NOME : " + NOME);
				var EX_CHAPA = dataset.getValue(i, "EX_CHAPA");		
				var EX_DATADEMISSAO = dataset.getValue(i, "EX_DATADEMISSAO");		
				var EX_CODCOLIGADA = dataset.getValue(i, "EX_CODCOLIGADA");		
				var EX_CODSITUACAO = dataset.getValue(i, "EX_CODSITUACAO");		
				var EX_CARGO = dataset.getValue(i, "EX_CARGO");	
				var CPF = dataset.getValue(i, "CPF");		
				
				log.info(" validarStatusCandidato CPF : " + CPF);
				log.info(" validarStatusCandidato hAPI.getCardValue(cpfCandidato) : " + hAPI.getCardValue("cpfCandidato"));
				log.info(" validarStatusCandidato CPF != hAPI.getCardValue(cpfCandidato) : " + CPF != hAPI.getCardValue("cpfCandidato"));
				if(CPF != hAPI.getCardValue("cpfCandidato")){
					retorno = true;	
				}
				
				var candidatoAtivoMesmaColigada = (EX_CHAPA != "" && EX_DATADEMISSAO == "" && EX_CODCOLIGADA == coligada && EX_CODSITUACAO != "D");
				var candidatoAtivoOutraColigada = (EX_CHAPA != "" && EX_DATADEMISSAO == "" && EX_CODCOLIGADA != coligada && EX_CODSITUACAO != "D" && EX_CODSITUACAO != "C");
				
				log.info(" validarStatusCandidato candidatoAtivoMesmaColigada : " + candidatoAtivoMesmaColigada);
				log.info(" validarStatusCandidato candidatoAtivoOutraColigada : " + candidatoAtivoOutraColigada);
				
				log.info(" validarStatusCandidato EX_CARGO.toUpperCase() : " + EX_CARGO.toUpperCase());
				if(EX_CARGO.toUpperCase() != 'MEDICO'){
					if(candidatoAtivoMesmaColigada == true || candidatoAtivoOutraColigada == true){
						log.info("45 -  validarStatusCandidato retorno : true");
						retorno = true;					
					}  
				}
			} else {
				retorno = true;	
			}
		}
	} catch(e){
		retorno = true;	
	} finally {
		log.info("62 -  validarStatusCandidato finally retorno : "+retorno);
		if(retorno == true){
			log.info("62 -  validarStatusCandidato FIM TRUE : ");
			return true;	
		}else{
			log.info("65 -  validarStatusCandidato FIM FALSE  : ");
			return false;
		}
	}
}