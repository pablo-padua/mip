function executarProcessoExclusaoItem(TMOV_CODCOLIGADA, IDMOV, NSEQITMMOV) {
	log.info("-INICIO- executarProcessoExclusaoItem: "+getValue("WKNumProces")+"/IDMOV ="+IDMOV+ "NSEQITMMOV= "+NSEQITMMOV);
		var NOME_SERVICO_PROCESS = "wsProcess";
		var CAMINHO_SERVICO_PROCESS = "com.totvs.WsProcess";
		
		var connect = DatasetFactory.getDataset("ds_mip_connector", null, null, null);
		var user = connect.getValue(0, "INTEGRADOR");
		var password = connect.getValue(0, "SENHA");
		
		var servicoProcess = ServiceManager.getService(NOME_SERVICO_PROCESS);
		var instanciaProcess = servicoProcess.instantiate(CAMINHO_SERVICO_PROCESS);
		var wsProcess = instanciaProcess.getRMIwsProcess();	

		var codUsuario = "totvs.tbc";
		var codSistema = "T";
		var coligada = TMOV_CODCOLIGADA;	
		var contexto = "codcoligada=" + coligada +";codusuario=" + codUsuario + ";codsistema=" + codSistema;

		var serviceHelperProcess = servicoProcess.getBean();
		var authServiceProcess = serviceHelperProcess.getBasicAuthenticatedClient(wsProcess, "com.totvs.IwsProcess", user, password);
		log.info("--- Autenticacao OK");	
	
	
		var NOME_PROCESS = "MovEstornoItemFatParcProc";
		
		var xml = getXMLMovEstornoItemFatParcProc(codUsuario, coligada, IDMOV, NSEQITMMOV);

		log.info("-- executarProcessoExclusaoItem: "+getValue("WKNumProces")+"/IDMOV ="+IDMOV+ "NSEQITMMOV= "+NSEQITMMOV+"----xml----:"+xml);
		var result = authServiceProcess.executeWithXmlParams(NOME_PROCESS, xml);
		log.info("-RESULT - executarProcessoExclusaoItem: "+getValue("WKNumProces")+"/IDMOV ="+IDMOV+ "NSEQITMMOV= "+NSEQITMMOV+"----result----:"+result);
		
		if(isNaN(result) || result != '1') {
    		log.error('======ERRO ======Evento executarProcessoExclusaoItem WSUP01 diz:: Erro de Integracao  result : - '+result);
    
			return false; 
    	}else{
    		log.info(" ##################################-executarProcessoExclusaoItem WSUP01: #######################");
    		return true; 
    }
	
}


function getXMLMovEstornoItemFatParcProc(codUsuario, coligada, IDMOV, NSEQITMMOV){
	var codUsuarioRM = hAPI.getCardValue("codUsuarioRM");
	var dataEmissao = ajusteData(buscarDataAtualSistema());
	var codFilial = hAPI.getCardValue("TMOV_CODFILIAL");
	var dataEmissao = ajusteData(buscarDataAtualSistema());
	var IdExercicioFiscal = '';
	
	
	var c1 = DatasetFactory.createConstraint("COLIGADA",coligada, coligada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("FILIAL", codFilial, codFilial,ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("ds_ConsultaRM_WS183_RetornaExercicioFiscalPorColigadaFilial", null, new Array(c1, c2), null);
	IdExercicioFiscal = dataset.getValue(0, "ID_EXERCICIO");
	if(IdExercicioFiscal == ''){
		log.error("--- processarMovimento diz: Erro de negocio: Não foi localizado IdExercicioFiscal");
		throw "processarMovimento diz: Erro de negocio:  ERROR: Não foi localizado IdExercicioFiscal";
		return false;
	}
	
var XML = "";
XML +='<MovEstornoItemFatParcProcParams xmlns:i="http://www.w3.org/2001/XMLSchema-instance" z:Id="i1" xmlns:z="http://schemas.microsoft.com/2003/10/Serialization/" xmlns="http://www.totvs.com.br/RM/">';
XML +='<Context xmlns:d2p1="http://www.totvs.com.br/RM/" z:Id="i2" xmlns="http://www.totvs.com/">';
XML +='<d2p1:_params xmlns:d3p1="http://schemas.microsoft.com/2003/10/Serialization/Arrays">';
XML +='<d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:Key xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">$EXERCICIOFISCAL</d3p1:Key>';
XML +='<d3p1:Value xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:int">8</d3p1:Value>';
XML +='</d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:Key xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">$CODLOCPRT</d3p1:Key>';
XML +='<d3p1:Value xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:int">-1</d3p1:Value>';
XML +='</d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:Key xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">$CODTIPOCURSO</d3p1:Key>';
XML +='<d3p1:Value xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:int">-1</d3p1:Value>';
XML +='</d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:Key xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">$EDUTIPOUSR</d3p1:Key>';
XML +='<d3p1:Value xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">-1</d3p1:Value>';
XML +='</d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:Key xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">$CODUNIDADEBIB</d3p1:Key>';
XML +='<d3p1:Value xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:int">-1</d3p1:Value>';
XML +='</d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:Key xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">$CODCOLIGADA</d3p1:Key>';
XML +='<d3p1:Value xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:int">'+coligada+'</d3p1:Value>';
XML +='</d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:Key xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">$RHTIPOUSR</d3p1:Key>';
XML +='<d3p1:Value xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">-1</d3p1:Value>';
XML +='</d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:Key xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">$CODIGOEXTERNO</d3p1:Key>';
XML +='<d3p1:Value xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">-1</d3p1:Value>';
XML +='</d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:Key xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">$CODSISTEMA</d3p1:Key>';
XML +='<d3p1:Value xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">T</d3p1:Value>';
XML +='</d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:Key xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">$CODUSUARIOSERVICO</d3p1:Key>';
XML +='<d3p1:Value xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string"></d3p1:Value>';
XML +='</d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:Key xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">$IDPRJ</d3p1:Key>';
XML +='<d3p1:Value xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:int">-1</d3p1:Value>';
XML +='</d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:Key xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">$CHAPAFUNCIONARIO</d3p1:Key>';
XML +='<d3p1:Value xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">-1</d3p1:Value>';
XML +='</d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:KeyValueOfanyTypeanyType>';
XML +='<d3p1:Key xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:string">$CODFILIAL</d3p1:Key>';
XML +='<d3p1:Value xmlns:d5p1="http://www.w3.org/2001/XMLSchema" i:type="d5p1:int">1</d3p1:Value>';
XML +='</d3p1:KeyValueOfanyTypeanyType>';
XML +='</d2p1:_params>';
XML +='<d2p1:Environment>WebServices</d2p1:Environment>';
XML +='</Context>';
XML +='<PrimaryKeyList xmlns:d2p1="http://schemas.microsoft.com/2003/10/Serialization/Arrays" xmlns="http://www.totvs.com/">';
XML +='<d2p1:ArrayOfanyType>';
XML +='<d2p1:anyType xmlns:d4p1="http://www.w3.org/2001/XMLSchema" i:type="d4p1:int">0</d2p1:anyType>';
XML +='</d2p1:ArrayOfanyType>';
XML +='<d2p1:ArrayOfanyType>';
XML +='<d2p1:anyType xmlns:d4p1="http://www.w3.org/2001/XMLSchema" i:type="d4p1:decimal">0</d2p1:anyType>';
XML +='</d2p1:ArrayOfanyType>';
XML +='<d2p1:ArrayOfanyType>';
XML +='<d2p1:anyType xmlns:d4p1="http://www.w3.org/2001/XMLSchema" i:type="d4p1:string">TEXTO</d2p1:anyType>';
XML +='</d2p1:ArrayOfanyType>';
XML +='<d2p1:ArrayOfanyType>';
XML +='<d2p1:anyType xmlns:d4p1="http://www.w3.org/2001/XMLSchema" i:type="d4p1:dateTime">2021-06-24T00:00:00-03:00</d2p1:anyType>';
XML +='</d2p1:ArrayOfanyType>';
XML +='</PrimaryKeyList>';
XML +='<PrimaryKeyNames xmlns:d2p1="http://schemas.microsoft.com/2003/10/Serialization/Arrays" xmlns="http://www.totvs.com/">';
XML +='<d2p1:string>COLUNAPK</d2p1:string>';
XML +='</PrimaryKeyNames>';
XML +='<movMovEstornoItemFatParcFat xmlns:d2p1="http://www.totvs.com/">';
XML +='<d2p1:MovMovEstornoItemFatParcPar z:Id="i3">';
XML +='<d2p1:InternalId i:nil="true" />';
XML +='<d2p1:InternalId i:nil="true" />';
XML +='<CodColigada>'+coligada+'</CodColigada>';
XML +='<CodSistemaLogado i:nil="true" />';
XML +='<CodUsuarioLogado i:nil="true" />';
XML +='<IdExercicioFiscal i:nil="true" />';
XML +='<IdMov>'+IDMOV+'</IdMov>';
XML +='<listaMovItemEstorno>';
XML +='<MovItemEstorno z:Id="i4">';
XML +='<d2p1:InternalId i:nil="true" />';
XML +='<Checked>1</Checked>';
XML +='<CodColigada>'+coligada+'</CodColigada>';
XML +='<IdMov>'+IDMOV+'</IdMov>';
XML +='<NSeqItmMov>'+NSEQITMMOV+'</NSeqItmMov>';
XML +='</MovItemEstorno>';
XML +='</listaMovItemEstorno>';
XML +='</d2p1:MovMovEstornoItemFatParcPar>';
XML +='</movMovEstornoItemFatParcFat>';
XML +='	</MovEstornoItemFatParcProcParams>';

	return XML;
}

function gravarCamposFilhos(iProcessInt, matricula){
	var indexes = getIndexes("indicePaiFilhoItem");
	var iterator = indexes.iterator();
	while(iterator.hasNext()){
		 index = iterator.next();
		var matricDePara = hAPI.getCardValue("matricRespDePara___" + index);
		if(hAPI.getCardValue("numSolicDePara___"+index) == "" && matricDePara == matricula){
			//log.info("-iniciarProcessoFilho---ANTES GRAVANDO NUMSOLICITAÇÃO ABERTA NO PAI X FILHO matricDePara2:= " + matricDePara);

			hAPI.setCardValue("numSolicDePara___" + index, iProcessInt);
			hAPI.setCardValue("statusSolFilha___" + index, "aberta");
			
			//log.info("-iniciarProcessoFilho---DEPOIS GRAVANDO NUMSOLICITAÇÃO ABERTA NO PAI X FILHO matricDePara2:= " + matricDePara);
		}
	}
}


