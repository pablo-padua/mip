function integrarPessoa(){

	var NOME_SERVICO = "wsDataServer";
    var CAMINHO_SERVICO = "com.totvs.WsDataServer";

	var connect = DatasetFactory.getDataset('ds_connector', null, null, null);
	var user = connect.getValue(0, 'INTEGRADOR');
	var password = connect.getValue(0, 'SENHA');

	var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	var ws = instancia.getRMIwsDataServer();

	var codSistema = "V";
	var coligada = hAPI.getCardValue("codColigada");
	var contexto = "codsistema=" + codSistema + ";codcoligada=" + coligada;

	var serviceHelper = servico.getBean();
	var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", user, password);
		
	var pessoa = getPessoa();
	var xml = createXmlPessoa(pessoa);

//	log.info("createXmlPessoa: " + xml);
				  
	var result = authService.saveRecord("RhuPessoaData", xml, contexto);
		
//	log.info("--- RESULT WS RhuPessoaData: " + result.toString());
				
	if(result != pessoa.CODIGO){
		log.error('--- integrarPessoa Erro: ' + result);
		throw '--- integrarPessoa Erro: ' + result;
	}
	
}

function getPessoa(){
	
	var pessoa = new Object();
	
	pessoa.CODIGO = hAPI.getCardValue("codPessoa");
	pessoa.DEFICIENTEFISICO = getDeficiencia("deficienciaFisica");
	pessoa.DEFICIENTEAUDITIVO = getDeficiencia("deficienciaAuditiva");
	pessoa.DEFICIENTEFALA = getDeficiencia("deficienciaFala");
	pessoa.DEFICIENTEVISUAL = getDeficiencia("deficienciaVisual");
	pessoa.DEFICIENTEMENTAL = getDeficiencia("deficienciaMental");
	pessoa.DEFICIENTEINTELECTUAL = getDeficiencia("deficienciaIntelectual");
	pessoa.BRPDH = getDeficiencia("deficienciaReabilitado");
	
	return pessoa;
	
}

function createXmlPessoa(pessoa){

	var xml = "";

	xml += createNode("PPESSOA");
	xml += setNode("CODIGO", pessoa.CODIGO);
	xml += setNode("DEFICIENTEFISICO", pessoa.DEFICIENTEFISICO);
	xml += setNode("DEFICIENTEAUDITIVO", pessoa.DEFICIENTEAUDITIVO);
	xml += setNode("DEFICIENTEFALA", pessoa.DEFICIENTEFALA);
	xml += setNode("DEFICIENTEVISUAL", pessoa.DEFICIENTEVISUAL);
	xml += setNode("DEFICIENTEMENTAL", pessoa.DEFICIENTEMENTAL);
	xml += setNode("DEFICIENTEINTELECTUAL", pessoa.DEFICIENTEINTELECTUAL);
	xml += setNode("BRPDH", pessoa.BRPDH);
	xml += createNode("/PPESSOA");
	
	return xml;

}

function getDeficiencia(campo){
	
	if(hAPI.getCardValue(campo) == "on"){
	
		if(campo == "deficienciaFisica")
			return 1;
		if(campo == "deficienciaAuditiva")
			return 2;
		if(campo == "deficienciaFala")
			return 3;
		if(campo == "deficienciaVisual")
			return 4;
		if(campo == "deficienciaMental")
			return 5;
		if(campo == "deficienciaIntelectual")
			return 6;
		if(campo == "deficienciaReabilitado")
			return 7;
	}
	else
		return 0;
	
}