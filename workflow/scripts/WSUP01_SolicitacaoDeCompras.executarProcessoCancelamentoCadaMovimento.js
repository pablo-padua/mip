function executarProcessoCancelamentoCadaMovimento(TMOV_CODCOLIGADA, IDMOV, NUMEROMOV) {
	log.info("-- INICIO -executarProcessoCancelamentoCadaMovimento--"+getValue("WKNumProces")+"--integracao processo cancelar -----");

	var NOME_SERVICO_PROCESS = "wsProcess";
	var CAMINHO_SERVICO_PROCESS = "com.totvs.WsProcess";
	var connect = DatasetFactory.getDataset("ds_mip_connector", null, null, null);
	var user = connect.getValue(0, "INTEGRADOR");
	var password = connect.getValue(0, "SENHA");
	var servicoProcess = ServiceManager.getService(NOME_SERVICO_PROCESS);
	var instanciaProcess = servicoProcess.instantiate(CAMINHO_SERVICO_PROCESS);
	var wsProcess = instanciaProcess.getRMIwsProcess();	
	var codUsuario = user;
	var codSistema = "T";
	var coligada = TMOV_CODCOLIGADA;	
	var contexto = "codcoligada=" + coligada +";codusuario=" + codUsuario + ";codsistema=" + codSistema;
	var serviceHelperProcess = servicoProcess.getBean();
	var authServiceProcess = serviceHelperProcess.getBasicAuthenticatedClient(wsProcess, "com.totvs.IwsProcess", user, password);
	
	try{	
	var NOME_PROCESS = "MovCancelMovProc";
		
	log.info("-executarProcessoCancelamentoCadaMovimento--"+getValue("WKNumProces")+"--integracao processo cancelar getXMLMovCancelMovProc codUsuario-----codUsuario:"+ codUsuario);
	log.info("-executarProcessoCancelamentoCadaMovimento--"+getValue("WKNumProces")+"--integracao processo cancelar getXMLMovCancelMovProc executarProcessoCancelamentoCadaMovimento coligada-----coligada:"+ coligada);
	log.info("-executarProcessoCancelamentoCadaMovimento--"+getValue("WKNumProces")+"--integracao processo cancelar getXMLMovCancelMovProc IDMOV-----IDMOV:"+ IDMOV);
	log.info("-executarProcessoCancelamentoCadaMovimento--"+getValue("WKNumProces")+"--integracao processo cancelar getXMLMovCancelMovProc executarNUMEROMOV: "+ NUMEROMOV);
	

	
	var xml = getXMLMovCancelMovProc(codUsuario, coligada, IDMOV, NUMEROMOV, 'SC Cancelada através do processo WSUP01');
	log.info("--"+getValue("WKNumProces")+"---integracao processo cancelar movimento executarProcessoCancelamentoCadaMovimento WSUP01-----xml:"+ xml);
	var result = authServiceProcess.executeWithXmlParams(NOME_PROCESS, xml);
	log.info("--"+getValue("WKNumProces")+"- RESULT processo cancelar movimento executarProcessoCancelamentoCadaMovimento  WSUP01 :"+IDMOV+ "Diz:" + result);
	
	
	
		if(isNaN(result) || result != '1') {
			log.error('======ERRO ======Evento executarProcessoCancelamentoCadaMovimento WSUP01 diz:: Erro de Integracao  result : - '+result);
			
			throw "Ocorreu um erro ao executar o cancelar Movimento no RM. ERROR: " +e;
			return false; 
			
		}else{
			log.info(" ##################################-executarProcessoCancelamentoCadaMovimento WSUP01: #######################");
			return true; 
		}

	} catch(e) {
	throw "Ocorreu um erro ao executar o cancelar Movimento no RM. ERROR: " +e;
	}
}


function getXMLMovCancelMovProc(codUsuario, coligada, IDMOV, NUMEROMOV, justificativaCancelamento){
	var codUsuarioRM = hAPI.getCardValue("codUsuarioRM");
	var dataAtual = ajusteData(buscarDataAtualSistema());

	
	var IdExercicioFiscal = '';
	var codFilial = hAPI.getCardValue("TMOV_CODFILIAL");
	
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

XML +='<MovCancelMovProcParams z:Id="i1" xmlns="http://www.totvs.com.br/RM/" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:z="http://schemas.microsoft.com/2003/10/Serialization/">';
XML +='<ActionModule xmlns="http://www.totvs.com/">T</ActionModule>';
XML +='<ActionName xmlns="http://www.totvs.com/">MovCancelMovProcAction</ActionName>';
XML +='<CanParallelize xmlns="http://www.totvs.com/">true</CanParallelize>';
XML +='<CanSendMail xmlns="http://www.totvs.com/">false</CanSendMail>';
XML +='<CanWaitSchedule xmlns="http://www.totvs.com/">false</CanWaitSchedule>';
XML +='<CodUsuario xmlns="http://www.totvs.com/">'+codUsuario+'</CodUsuario>';
XML +='<ConnectionId i:nil="true" xmlns="http://www.totvs.com/" />';
XML +='<ConnectionString i:nil="true" xmlns="http://www.totvs.com/" />';
XML +='<Context z:Id="i2" xmlns="http://www.totvs.com/" xmlns:a="http://www.totvs.com.br/RM/">';
XML +='<a:_params xmlns:b="http://schemas.microsoft.com/2003/10/Serialization/Arrays">';
XML +='<b:KeyValueOfanyTypeanyType>';
XML +='<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$EXERCICIOFISCAL</b:Key>';
XML +='<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">'+IdExercicioFiscal+'</b:Value>';
XML +='</b:KeyValueOfanyTypeanyType>';
XML +='<b:KeyValueOfanyTypeanyType>';
XML +='<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODLOCPRT</b:Key>';
XML +='<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value>';
XML +='</b:KeyValueOfanyTypeanyType>';
XML +='<b:KeyValueOfanyTypeanyType>';
XML +='<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODTIPOCURSO</b:Key>';
XML +='<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value>';
XML +='</b:KeyValueOfanyTypeanyType>';
XML +='<b:KeyValueOfanyTypeanyType>';
XML +='<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$EDUTIPOUSR</b:Key>';
XML +='<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value>';
XML +='</b:KeyValueOfanyTypeanyType>';
XML +='<b:KeyValueOfanyTypeanyType>';
XML +='<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODUNIDADEBIB</b:Key>';
XML +='<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value>';
XML +='</b:KeyValueOfanyTypeanyType>';
XML +='<b:KeyValueOfanyTypeanyType>';
XML +='<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODCOLIGADA</b:Key>';
XML +='<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">'+coligada+'</b:Value>';
XML +='</b:KeyValueOfanyTypeanyType>';
XML +='<b:KeyValueOfanyTypeanyType>';
XML +='<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$RHTIPOUSR</b:Key>';
XML +='<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">01</b:Value>';
XML +='</b:KeyValueOfanyTypeanyType>';
XML +='<b:KeyValueOfanyTypeanyType>';
XML +='<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODIGOEXTERNO</b:Key>';
XML +='<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value>';
XML +='</b:KeyValueOfanyTypeanyType>';
XML +='<b:KeyValueOfanyTypeanyType>';
XML +='<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODSISTEMA</b:Key>';
XML +='<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">T</b:Value>';
XML +='</b:KeyValueOfanyTypeanyType>';
XML +='<b:KeyValueOfanyTypeanyType>';
XML +='<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODUSUARIOSERVICO</b:Key>';
XML +='<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema" />';
XML +='</b:KeyValueOfanyTypeanyType>';
XML +='<b:KeyValueOfanyTypeanyType>';
XML +='<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODUSUARIO</b:Key>';
XML +='<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">'+codUsuario+'</b:Value>';
XML +='</b:KeyValueOfanyTypeanyType>';
XML +='<b:KeyValueOfanyTypeanyType>';
XML +='<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$IDPRJ</b:Key>';
XML +='<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value>';
XML +='</b:KeyValueOfanyTypeanyType>';
XML +='<b:KeyValueOfanyTypeanyType>';
XML +='<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CHAPAFUNCIONARIO</b:Key>';
XML +='<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">01015496</b:Value>';
XML +='</b:KeyValueOfanyTypeanyType>';
XML +='<b:KeyValueOfanyTypeanyType>';
XML +='<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODFILIAL</b:Key>';
XML +='<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">'+codFilial+'</b:Value>';
XML +='</b:KeyValueOfanyTypeanyType>';
XML +='</a:_params>';
XML +='<a:Environment>DotNet</a:Environment>';
XML +='</Context>';
XML +='<PrimaryKeyList xmlns="http://www.totvs.com/" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays">';
XML +='<a:ArrayOfanyType>';
XML +='<a:anyType i:type="b:short" xmlns:b="http://www.w3.org/2001/XMLSchema">'+coligada+'</a:anyType>';
XML +='<a:anyType i:type="b:int" xmlns:b="http://www.w3.org/2001/XMLSchema">'+IDMOV+'</a:anyType>';
XML +='</a:ArrayOfanyType>';
XML +='</PrimaryKeyList>';
XML +='<PrimaryKeyNames xmlns="http://www.totvs.com/" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays">';
XML +='<a:string>CODCOLIGADA</a:string>';
XML +='<a:string>IDMOV</a:string>';
XML +='</PrimaryKeyNames>';
XML +='<PrimaryKeyTableName xmlns="http://www.totvs.com/">TMOV</PrimaryKeyTableName>';
XML +='<ProcessName xmlns="http://www.totvs.com/">Cancelamento do Movimento</ProcessName>';
XML +='<QuantityOfSplits xmlns="http://www.totvs.com/">0</QuantityOfSplits>';
XML +='<SaveLogInDatabase xmlns="http://www.totvs.com/">true</SaveLogInDatabase>';
XML +='<SaveParamsExecution xmlns="http://www.totvs.com/">false</SaveParamsExecution>';
XML +='<ScheduleDateTime xmlns="http://www.totvs.com/">2022-04-18T17:51:05.2911207-03:00</ScheduleDateTime>';
XML +='<Scheduler xmlns="http://www.totvs.com/">JobMonitor</Scheduler>';
XML +='<SendMail xmlns="http://www.totvs.com/">false</SendMail>';
XML +='<ServerName xmlns="http://www.totvs.com/">MovCancelMovProc</ServerName>';
XML +='<ServiceInterface i:nil="true" xmlns="http://www.totvs.com/" xmlns:a="http://schemas.datacontract.org/2004/07/System" />';
XML +='<ShouldParallelize xmlns="http://www.totvs.com/">false</ShouldParallelize>';
XML +='<ShowReExecuteButton xmlns="http://www.totvs.com/">true</ShowReExecuteButton>';
XML +='<StatusMessage i:nil="true" xmlns="http://www.totvs.com/" />';
XML +='<SuccessMessage xmlns="http://www.totvs.com/">Processo executado com sucesso</SuccessMessage>';
XML +='<SyncExecution xmlns="http://www.totvs.com/">false</SyncExecution>';
XML +='<UseJobMonitor xmlns="http://www.totvs.com/">true</UseJobMonitor>';
XML +='<UserName xmlns="http://www.totvs.com/">'+codUsuario+'</UserName>';
XML +='<WaitSchedule xmlns="http://www.totvs.com/">false</WaitSchedule>';
XML +='<MovimentosACancelar>';
XML +='<MovimentosCancelar z:Id="i3">';
XML +='<ApagarMovRelac>false</ApagarMovRelac>';
XML +='<CancelarMovimentosGeradosSimultFaturamento>false</CancelarMovimentosGeradosSimultFaturamento>';
XML +='<CancelarMovimentosGeradosSimultReabriCotacao>false</CancelarMovimentosGeradosSimultReabriCotacao>';
XML +='<CodColigada>'+coligada+'</CodColigada>';
XML +='<CodSistemaLogado>T</CodSistemaLogado>';
XML +='<CodUsuarioLogado>'+codUsuario+'</CodUsuarioLogado>';
XML +='<DataCancelamento>'+dataAtual+'</DataCancelamento>';
XML +='<ExcluirItensDaCotacao>true</ExcluirItensDaCotacao>';
XML +='<IdExercicioFiscal>'+IdExercicioFiscal+'</IdExercicioFiscal>';
XML +='<IdMov>'+IDMOV+'</IdMov>';
XML +='<MotivoCancelamento>'+justificativaCancelamento+'</MotivoCancelamento>';
XML +='<NumeroMov>'+NUMEROMOV+'</NumeroMov>';
XML +='</MovimentosCancelar>';
XML +='</MovimentosACancelar>';
XML +='</MovCancelMovProcParams>';

	return XML;
}