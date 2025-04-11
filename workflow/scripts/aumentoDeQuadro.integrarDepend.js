function integrarDepend(){
	
	var NOME_SERVICO = "wsDataServer";
    var CAMINHO_SERVICO = "com.totvs.WsDataServer";
    
	try
	{
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
		
		var indexes = getIndexes("nomeDependente");
		var iterator = indexes.iterator();
		while (iterator.hasNext()) {
			
			var index = iterator.next();
			var xml = createXmlPFDEPEND(index); 
			
			log.info("#### FopDependData - integrarDepend - XML: " + xml);
			log.info("#### contexto: " + contexto);
			var result = authService.saveRecord("FopDependData", xml, contexto); 			
			
			log.info("--- RESULT WS: " + result.toString());
					
			if(isError(result.toString())){
				log.error("--- integrarDepend Erro: " + result);
				throw "Erro de negocio: " + result;
			}
		}
	}
	
    catch (e) 
    {
    	log.error("--- integrarDepend Erro na chamada WS do RM: " + e);
    	return false;
	}
    
    return true;
}

function createXmlPFDEPEND(index){
	log.info("#### Entrou na createXmlPFDEPEND: ");
	var xml = "";
	
	var coligada = hAPI.getCardValue("codColigada");
	
	var chapa = hAPI.getCardValue("chapaFunc");
	
	var cpf = hAPI.getCardValue("hidden_CPF_DEP___" + index);
	
	var nome = hAPI.getCardValue("nomeDependente___" + index);
	
	var cartaoVacina = hAPI.getCardValue("ckcartaoVacina___" + index);  

	var comprovante = hAPI.getCardValue("ckcomprovante___" + index);
	
	log.info("#### Variavel coligada: "  + coligada);
	log.info("#### Variavel chapa: "  + chapa);
	log.info("#### Variavel nome: "  + nome);
	log.info("#### Variavel cpf: "  + cpf);
	
	var c1 = DatasetFactory.createConstraint("PARAM_CODCOLIGADA", coligada,coligada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("PARAM_CHAPA", chapa, chapa,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("PARAM_CPF", cpf, cpf,ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("PARAM_NOME", nome, nome,ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3, c4);
	var datasetRM = DatasetFactory.getDataset("ds_RM_WS217_RH_VALIDA_CPF_DEPEND", null, constraints, null);	
	
	var nroDepend = datasetRM.getValue(0, "NRODEPEND");	
	log.info("#### NRODEPEND: " + nroDepend);
	
	xml += createNode("Dependente");

			xml += createNode("PFDepend");
				xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
				xml += setNode("CHAPA", hAPI.getCardValue("chapaFunc"));
				xml += setNode("NRODEPEND", nroDepend);
				xml += setNode("NOME",hAPI.getCardValue("nomeDependente___" + index));
				xml += setNode("CPF",hAPI.getCardValue("hidden_CPF_DEP___" + index));
				xml += setNode("SEXO",hAPI.getCardValue("sexoDependente___" + index));
				xml += setNode("ESTADOCIVIL",hAPI.getCardValue("CodCivi___" + index));
				xml += setNode("GRAUPARENTESCO",hAPI.getCardValue("CodGrau___" + index));
				xml += setNode("DTNASCIMENTO",hAPI.getCardValue("dtNascimentoDepend___" + index));
				xml += setNode("LOCALNASCIMENTO",hAPI.getCardValue("localNascimento___" + index));
				if(cartaoVacina == "on"){
					xml += setNode("CARTAOVACINA","1");
				} else{
					xml += setNode("CARTAOVACINA","0");
				}
				if(comprovante == "on"){
					xml += setNode("FREQESCOLAR","1");
				} else{
					xml += setNode("FREQESCOLAR","0");
				}
			xml += createNode("/PFDepend");

			xml += createNode("PFDEPENDCOMPL");
				xml += setNode("CODCOLIGADA", hAPI.getCardValue("codColigada"));
				xml += setNode("CHAPA", hAPI.getCardValue("chapaFunc"));
				xml += setNode("NRODEPEND", nroDepend);
				xml += setNode("CUSTO_PLANO_SAUDE", "1");
				xml += setNode("PLANODESAUDE", "N/A");
				xml += setNode("PLANODONTOLOGICO", "N/A");
			xml += createNode("/PFDEPENDCOMPL");

	xml += createNode("/Dependente");
	log.info("#### NRODEPEND XML: " + xml);
	return xml;

}

function isError(result) {
	return isNaN(result.substring(0,1));
}

function deletarDepend(){
	
	var NOME_SERVICO = "wsDataServer";
    var CAMINHO_SERVICO = "com.totvs.WsDataServer";
    
	try
	{
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
		
		var xml = deleteXmlPFDEPEND();
		
		if(xml != ""){
		
			log.info("#### FopDependData - deletarDepend - XML: " + xml);
			log.info("#### contexto: " + contexto);
			var result = authService.deleteRecord("FopDependData", xml, contexto);
			
			log.info("--- RESULT WS: " + result.toString());
						
			if(result.toString().substr(0, 45) != "Exclusão de registro(s) realizado com sucesso"){
				log.error("--- deletarDepend Erro: " + result);
				throw "Erro de negocio: " + result;
			}
		}

	}
	
    catch (e) 
    {
    	log.error("--- deletarDepend Erro na chamada WS do RM: " + e);
    	return false;
	}
    
    return true;
}

function deleteXmlPFDEPEND(){
	
	var codColigada = hAPI.getCardValue("codColigada");
	var chapaFunc = hAPI.getCardValue("chapaFunc");
	
	var c1 = DatasetFactory.createConstraint("PARAM_CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("PARAM_CHAPA", chapaFunc, chapaFunc, ConstraintType.MUST);
	
	var constraints = new Array(c1, c2);
	var datasetRM = DatasetFactory.getDataset("ds_RM_WS221_Dependentes", null, constraints, null);
	
	var xml = "";
	
	if(datasetRM != null && datasetRM.rowsCount > 0) {
		
		if( datasetRM.getValue(0, "CODCOLIGADA") != "" ){
		
			xml += createNode("FopDependData");		 
			
			for (var i = 0; i < datasetRM.rowsCount; i++) {
				
				xml += createNode("PFDepend");			
				xml += setNode("CODCOLIGADA", datasetRM.getValue(i, "CODCOLIGADA"));
				xml += setNode("CHAPA", datasetRM.getValue(i, "CHAPA")); 	
				xml += setNode("NRODEPEND", datasetRM.getValue(i, "NRODEPEND"));
				xml += createNode("/PFDepend");			
				
			}
			
			xml += createNode("/FopDependData");
		}
		
	}
	
	return xml;

}