function incluiXmlBancarioFCFO(){
	log.info("#### incluiXmlBancarioFCFO INICIO");
	var NOME_SERVICO = "wsDataServer";
    var CAMINHO_SERVICO = "com.totvs.WsDataServer";
 
	var connect = DatasetFactory.getDataset("ds_connector", null, null, null);
	var user = connect.getValue(0, "INTEGRADOR");
	var password = connect.getValue(0, "SENHA");
	var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	var ws = instancia.getRMIwsDataServer();
	var codSistema = "F";
	var coligada = hAPI.getCardValue("codColigada");
	var contexto = "codusuario=" + user + ";codsistema=" + codSistema + ";codcoligada=" + coligada;
	var serviceHelper = servico.getBean();
	var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", user, password);
	var xml = createXmlBancario();
	log.info("#### FinDadosPgtoDataBR XML: " + xml);
	log.info("#### contexto: " + contexto);
	var tipoConta = hAPI.getCardValue("tipoConta");
	if (xml != ""){
		var result = authService.saveRecord("FinDadosPgtoDataBR", xml, contexto); //data server	
		log.info("--- RESULT WS Bancario: " + result.toString());
		if(isError(result.toString())){
			log.error("--- FinDadosPgtoDataBR Erro: " + result);
			throw "Erro de negocio: " + result;
		}
		else {
			return result.toString();
		}
	}
   function iserros(result){
   }
 
	function isError(result) {
		return isNaN(result.substring(0,1));
	}
 
	function createXmlBancario() {		
		var nomeCandidato = hAPI.getCardValue("nomeCandidato");
		var cpf = hAPI.getCardValue("cpfCandidato");
		var c1 = DatasetFactory.createConstraint("PARAM_CPF", cpf, cpf,ConstraintType.MUST);
		var constraints = new Array(c1);
		var dataset_codcfo = DatasetFactory.getDataset("ds_RM_WS214_RH_CPF_CODCFO", null, constraints, null);
		
		if (dataset_codcfo.getValue(0, "CODCFO") != ""){
			var codcfo = dataset_codcfo.getValue(0, "CODCFO");		
			log.info("#### Impressão do CODCFO: " + codcfo);
			var c2 = DatasetFactory.createConstraint("PARAM_CODCFO", codcfo, codcfo,ConstraintType.MUST);
			var constraints1 = new Array(c2);
			var dataset_IDPGT = DatasetFactory.getDataset("ds_RM_WS215_RH_IDPGTO", null, constraints1, null);
			var idPgto = dataset_IDPGT.getValue(0, "IDPGTO");
			log.info("#### Impressão do idPgto: " + idPgto);

		    var varContaCorrente = hAPI.getCardValue("contaCorrente");
			log.info("#### Impressão conta corrente hAPI: " + varContaCorrente);
		    var contaSemDig = varContaCorrente.slice(0, -1);
		    var ultimoCaracter = varContaCorrente.slice(-1);
		    log.info("#### Impressão conta corrente sem dig: " + contaSemDig);
		    var formaPag = "";
		    var banco = hAPI.getCardValue("codBanco");
		    log.info("#### Impressão do Banco: " + banco);
		    if (banco == "237"){
		    	formaPag = "Y";
		    } else{
		    	formaPag = "T";
		    }
		    var tipoConta = hAPI.getCardValue("tipoConta");
		    log.info("#### Impressão do tipo de conta: " + tipoConta);
		    var xml = ""; 
		    if(tipoConta == "corrente" || tipoConta == "poupanca"){
				var codBanco = hAPI.getCardValue("codBanco");
				var agencias = hAPI.getCardValue("agencias");
				log.info("#### Impressão das Variaveis Bancarias: " + "   " + varContaCorrente + "   " + codBanco + "   " + agencias);
				var c1 = DatasetFactory.createConstraint("PARAM_CONTAPAGAMENTO", varContaCorrente, varContaCorrente, ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("PARAM_CODBANCOPAGTO", codBanco, codBanco, ConstraintType.MUST);
				var c3 = DatasetFactory.createConstraint("PARAM_CODAGENCIAPAGTO", agencias,agencias, ConstraintType.MUST);
				var c4 = DatasetFactory.createConstraint("PARAM_CODCFO", codcfo, codcfo, ConstraintType.MUST);
				var constraints = new Array(c1, c2, c3, c4);
				var dataset = DatasetFactory.getDataset("ds_RM_WS220_RH_VALIDA_BANCARIO", null, constraints, null);
		    	if (dataset != undefined) {
					var quantidade;
					if (dataset.rowsCount == 1) {
						quantidade = dataset.getValue(0, "Quantidade");
					}
					if (quantidade == 0) {
						xml += createNode("FDadosPgto");
							xml += setNode("CODCOLIGADA","0");
							xml += setNode("CODCOLCFO","0");
							xml += setNode("CODCFO", codcfo);
							xml += setNode("IDPGTO",idPgto);
							xml += setNode("DESCRICAO", hAPI.getCardValue("bancario"));
							xml += setNode("NUMEROBANCO", hAPI.getCardValue("codBanco"));
							xml += setNode("CODIGOAGENCIA", hAPI.getCardValue("agencias"));
							xml += setNode("CONTACORRENTE",contaSemDig); 
							xml += setNode("DIGITOCONTA",ultimoCaracter);
							xml += setNode("FORMAPAGAMENTO",formaPag);
							xml += setNode("FAVORECIDO", hAPI.getCardValue("nomeCandidato"));  
							var cpfCandidatoMascara = cpf.substr(0, 3) + "." + cpf.substr(3, 3) + "." + cpf.substr(6, 3) + "-" + cpf.substr(9, 2);
							xml += setNode("CGCFAVORECIDO", cpfCandidatoMascara);
							xml += setNode("ATIVO","1");
						xml += createNode("/FDadosPgto");
					}
		    	}
		    }
		    return xml;
		}else{
			throw "Não foi encontrado o cliente fornecedor para o candidato selecionado";
		}
	}
}