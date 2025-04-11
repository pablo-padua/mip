function integrarRegistroPreliminar(){
	
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
		
	var xml = createXmlRegistroPreliminar();

//	log.info("createXmlRegistroPreliminar: " + xml);
				  
	var result = authService.saveRecord("FopRegistroPreliminarData", xml, contexto);
		
//	log.info("--- RESULT WS FopRegistroPreliminarData: " + result.toString());
				
	if(isError(result.toString())){
		log.error('--- integrarRegistroPreliminar Erro: ' + result);
		throw '--- integrarRegistroPreliminar Erro: ' + result;
	}else{
		
		var WKNumProces = getValue ("WKNumProces");
		var WKUser = getValue ("WKUser");
		hAPI.setTaskComments(WKUser, WKNumProces,  0, "Registro Preliminar foi criado no TOTVS RM: " + result);

	}
		
	function isError(result) {
	return isNaN(result.substring(0,1));
	}

	function createXmlRegistroPreliminar(){
	
		var xml = "";
		var dtAdmissaoPreliminar = getDataAdmissao();
	
		xml += createNode("PFUNCPRELIMINAR");
		xml += setNode("IDREGISTRO", "-1");
		xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
		xml += setNode("CODPESSOA", hAPI.getCardValue("codPessoa"));
		xml += setNode("DATAADMISSAO", dtAdmissaoPreliminar);
		xml += setNode("CODCATEGORIAESOCIAL", getCategoriaESOCIAL());
		xml += setNode("ESOCIALNATATIVIDADE", "1");
		xml += setNode("CODRECEBIMENTO", "M");		
		xml += setNode("CODFUNCAO", hAPI.getCardValue("codFuncao"));
		xml += setNode("SALARIO", hAPI.getCardValue("salario"));
		
		var contratoExp = hAPI.getCardValue("contratoExp");
				
			if(contratoExp == "30" || contratoExp == "45"){
				
				xml += setNode("TEMPRAZOCONTR", "1");
				xml += setNode("TIPOCONTRATOPRAZO", "E");
				
				dtAdmissaoPreliminar = dtAdmissaoPreliminar.substr(0, 10);		
				var dataAdmissao = new Date(dtAdmissaoPreliminar.split("-")[0], dtAdmissaoPreliminar.split("-")[1] - 1, dtAdmissaoPreliminar.split("-")[2]);
				
				var fimPrazo = dataAdmissao;
				fimPrazo.setDate(fimPrazo.getDate() + (contratoExp - 1));
				fimPrazo = new Date(fimPrazo);
				fimPrazo = ajusteData(fimPrazo.getDate() + "/" + (fimPrazo.getMonth() + 1) + "/" + fimPrazo.getFullYear());
				
				xml += setNode("FIMPRAZOCONTR", fimPrazo);
				
			}
		
		xml += createNode("/PFUNCPRELIMINAR");
		
		log.info("--- xml: " + xml);
		
		return xml;
	
	}
	
	function getDataAdmissao(){
	
		var fields = null;
		var constraints = [];
		var order = null;
	
		var dataset = DatasetFactory.getDataset("ds_RM_WS083_DataRegPreliminar",fields,constraints,order);
		
		if(dataset != null && dataset.rowsCount > 0){
			var data = dataset.getValue(0, "DATA");
		}
		
		return data;
	}
	
	function getCategoriaESOCIAL(){
		
		var nomeFuncao = hAPI.getCardValue("funcao");
		var CODCATEGORIAESOCIAL;

		nomeFuncao = nomeFuncao.toLowerCase();

		if(nomeFuncao.indexOf("estagiario") != -1 || nomeFuncao.indexOf("estagiário") != -1)
			CODCATEGORIAESOCIAL = "901";
		else if(nomeFuncao.indexOf("aprendiz") != -1)
			CODCATEGORIAESOCIAL = "103";
		else if(nomeFuncao.indexOf("diretor ") != -1 || nomeFuncao == "diretor")
			CODCATEGORIAESOCIAL = "722";
		else
			CODCATEGORIAESOCIAL = "101";
		
		return CODCATEGORIAESOCIAL;
		
	}

}