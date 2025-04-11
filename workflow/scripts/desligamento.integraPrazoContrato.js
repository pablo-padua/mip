function integraPrazoContrato(){
	log.info("#### INICIO integraPrazoContrato : ");
	var dataAdmissao = hAPI.getCardValue("dataAdmissao");
	dataAdmissao = new Date(dataAdmissao.split("/")[2], dataAdmissao.split("/")[1] - 1, dataAdmissao.split("/")[0]);

	if(hAPI.getCardValue("dataDemissao") == "")
		var dataDemissao = hAPI.getCardValue("dataPrevistaDemissao");
	else
		var dataDemissao = hAPI.getCardValue("dataDemissao");
		
	dataDemissao = new Date(dataDemissao.split("/")[2], dataDemissao.split("/")[1] - 1, dataDemissao.split("/")[0]);
	// Se o desligamento ocorrer até 90 dias após a admissão, realiza atualização na Data Final do Contrato 
	if(dataDemissao < addDays(dataAdmissao, 90)){
		log.info("####  integraPrazoContrato ENTROU NO IFFFFFF TH :");
		var codColigada = hAPI.getCardValue("codColigada");
		var chapa = hAPI.getCardValue("chapa");
		
		var c1 = DatasetFactory.createConstraint("PARAM_CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("PARAM_CHAPA", chapa, chapa, ConstraintType.MUST);
		var constraints = new Array(c1, c2);
		log.info("####  integraPrazoContrato constraints :"+constraints);
		var dataset = DatasetFactory.getDataset("ds_RM_WS206_WRH03_PrazoContratoExperiencia", null, constraints, null);
		if(dataset != null){
			log.info("####  integraPrazoContrato dataset.getValue(0, CHAPA) :"+dataset.getValue(0, "CHAPA"));
			if(dataset.getValue(0, "CHAPA") == ""){
				
				throw "Erro ao consultar (ds_RM_WS206_WRH03_PrazoContratoExperiencia)";
				
			}else{
				
				/* Se Contrato com Prazo e Tipo igual a Experiencia, realiza atualização na Data Final do Contrato */
				if(dataset.getValue(0, "TEMPRAZOCONTR") == "1" && dataset.getValue(0, "TIPOCONTRATOPRAZO") == "E"){
					
					var NOME_SERVICO = "wsDataServer";
				    var CAMINHO_SERVICO = "com.totvs.WsDataServer";
				    
					var connect = DatasetFactory.getDataset("ds_connector", null, null, null);
					var user = connect.getValue(0, "INTEGRADOR");
					var password = connect.getValue(0, "SENHA");
					
					var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
					var instancia = servico.instantiate(CAMINHO_SERVICO);
					var ws = instancia.getRMIwsDataServer();
					
					var codSistema = "V";
					var coligada = hAPI.getCardValue("codColigada");
					
					var contexto = "codusuario=" + user + ";codsistema=" + codSistema + ";codcoligada=" + coligada;
					
					var serviceHelper = servico.getBean();
					
					var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", user, password);
					
					var xml = createXmlFuncionario();		  
					log.info("#### integraPrazoContrato() FopFuncData XML: " + xml);
					var result = authService.saveRecord("FopFuncData", xml, contexto);
					log.info("--- integraPrazoContrato() RESULT WS: " + result.toString());
					if(isError(result.toString())){
						log.error("--- integraPrazoContrato() Erro: " + result);
						throw "Erro de negocio integraPrazoContrato(): " + result;
					}
					else {
						return result.toString();
					}
					
				}
				
			}

		}else{
			
			throw "Erro ao consultar (ds_RM_WS206_WRH03_PrazoContratoExperiencia)";

		}
		
	}
	return true;
}

function isError(result) {
	return isNaN(result.substring(0,1));
}

function createXmlFuncionario() {

	var xml = "";		
	
	xml += createNode("Funcionario");
	xml = createPFUNC(xml);
	xml += createNode("/Funcionario");
	
	
	return xml;
}

function createPFUNC(xml){
	
	xml += createNode("PFUNC");
	xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
	xml += setNode("CHAPA", hAPI.getCardValue("chapa"));
	xml += setNode("FIMPRAZOCONTR", calculaFimPrazo());	
	xml += createNode("/PFUNC");
	
	return xml;
}

function calculaFimPrazo(){
	
	var dataAdmissao = hAPI.getCardValue("dataAdmissao");
	dataAdmissao = new Date(dataAdmissao.split("/")[2], dataAdmissao.split("/")[1] - 1, dataAdmissao.split("/")[0]);

	if(hAPI.getCardValue("dataDemissao") == "")
		var dataDemissao = hAPI.getCardValue("dataPrevistaDemissao");
	else
		var dataDemissao = hAPI.getCardValue("dataDemissao");
		
	dataDemissao = new Date(dataDemissao.split("/")[2], dataDemissao.split("/")[1] - 1, dataDemissao.split("/")[0]);	

	if(dataDemissao < addDays(dataAdmissao, 45))
		var contratoExp = 45;
	else
		var contratoExp = 90;
	
	var fimPrazo = dataAdmissao;
	fimPrazo.setDate(fimPrazo.getDate() + (contratoExp - 1));
	fimPrazo = new Date(fimPrazo);
	fimPrazo = ajusteData(fimPrazo.getDate() + "/" + (fimPrazo.getMonth() + 1) + "/" + fimPrazo.getFullYear());
	
	return fimPrazo;
}