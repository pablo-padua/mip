function cancelaRequisicao(justificativaCancelamento){
	
	var idReq = hAPI.getCardValue("numRequisicaoSelecao");
	var codColigada = hAPI.getCardValue("codColigada");
	var usuario = getUsuarioRM(getValue("WKUser"));
	justificativa = "Requisição cancelada via FLUIG:\n" + justificativaCancelamento;
	
	try{
		
		cancelaRequisicaoRM(codColigada, idReq, usuario.codUsuario, usuario.codColigada, usuario.chapa, justificativa);

	} catch (e){
		var erro = "<br><br><b>Erro ao tentar cancelar a Requisição (" + codColigada + ";" + idReq + ") no TOTVS RM: " + e + "</b><br><br>";
		log.error(erro);
		throw erro;
	}
	
}

function cancelaRequisicaoRM(codColigada, idReq, usuarioContexto, codColigadaSolicitante, chapa, justificativa){
	var NOME_SERVICO = "wsDataServer";
    var CAMINHO_SERVICO = "com.totvs.WsDataServer";
    var CHAPA_DEMITIDO = hAPI.getCardValue("chapa");
	var connect = DatasetFactory.getDataset("ds_connector", null, null, null);
	var user = connect.getValue(0, "INTEGRADOR");
	var password = connect.getValue(0, "SENHA");
	
	apagarQuestionario(user, password, NOME_SERVICO, CAMINHO_SERVICO, usuarioContexto, codColigada, CHAPA_DEMITIDO);
	apagarAvaliacoes(user, password, NOME_SERVICO, CAMINHO_SERVICO, user, codColigada, CHAPA_DEMITIDO);
	
	var xml = getXML(codColigada, idReq, usuarioContexto, codColigadaSolicitante, chapa, justificativa);	
	var response = WsProcess_executeWithXmlParams('RhuCancelarRequisicaoProcess', xml, user, password);
	if( response == null ){
		throw "Ocorreu um erro na comunicação com o RM. Verifique o serviço RM.Host.Service.";
		
	} else{

		if( response != "1" && response.indexOf("está Cancelada") == 0 ){
			throw response;
		}

		
		hAPI.setCardValue("solicitCancelada", 'sim');
	}
}

function apagarQuestionario (user, password, NOME_SERVICO, CAMINHO_SERVICO, usuarioContexto, codColigada, CHAPA_DEMITIDO){
	var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	var ws = instancia.getRMIwsDataServer();	
	var codSistema = "G";	
	var contexto = "codusuario=" + usuarioContexto + ";codsistema=" + codSistema + ";codcoligada=" + codColigada;	
	var serviceHelper = servico.getBean();
	var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", user, password);

	var c1 = DatasetFactory.createConstraint("COLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", CHAPA_DEMITIDO, CHAPA_DEMITIDO, ConstraintType.MUST);
	var constraints = new Array(c1, c2);

	var dataset = DatasetFactory.getDataset("ds_ConsultaRM_WS119_RetornaRespostasQuestionaDesligamento", null, constraints, null);
	if (dataset.rowsCount > 0) {
		for (var x = 0; x < dataset.rowsCount; x++) {
			var CODIGO_QUESTIONARIO = dataset.getValue(x, "CODIGO_QUESTIONARIO");
			var CODIGO_QUESTAO = dataset.getValue(x, "CODIGO_QUESTAO");
			var CODUSUARIO = dataset.getValue(x, "CODUSUARIO");
			var RESPOSTA = dataset.getValue(x, "RESPOSTA");
if(CODIGO_QUESTIONARIO != "" && CODIGO_QUESTAO != "" && CODUSUARIO != "" && RESPOSTA != ""){
	var contexto = 'CODCOLIGADA=' + codColigada + ';CODUSUARIO=' + usuarioContexto+';CODSISTEMA=G'; 
	var pk = codColigada+";"+CHAPA_DEMITIDO.toString()+";"+CODIGO_QUESTAO.toString()+";"+CODIGO_QUESTIONARIO.toString()+";"+CODUSUARIO.toString()+";"+RESPOSTA.toString();
	//log.info("cancelaRequisicao desligamento - contexto "+contexto);
	//log.info("cancelaRequisicao desligamento - pk "+pk);
	var result = authService.deleteRecordByKey('RMSPRJ4982784Server', pk, contexto);
	//log.info("cancelaRequisicao desligamento - RMSPRJ4982784Server result "+result);
}
		
			
			
		}
	}	
}

function apagarAvaliacoes (user, password, NOME_SERVICO, CAMINHO_SERVICO, usuarioContexto, codColigada, CHAPA_DEMITIDO){

	var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	var ws = instancia.getRMIwsDataServer();	
	var codSistema = "G";	
	var contexto = "codusuario=" + usuarioContexto + ";codsistema=" + codSistema + ";codcoligada=" + codColigada;	
	var serviceHelper = servico.getBean();
	var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", user, password);

	
	var c1 = DatasetFactory.createConstraint("COLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CHAPA", CHAPA_DEMITIDO, CHAPA_DEMITIDO, ConstraintType.MUST);
	var constraints = new Array(c1, c2);

	var dataset = DatasetFactory.getDataset("ds_ConsultaRM_WS120_RetornaAvaliacoesDesligamento", null, constraints, null);
	if (dataset.rowsCount > 0) {
		for (var x = 0; x < dataset.rowsCount; x++) {
			var IDAVALIACAO = dataset.getValue(x, "IDAVALIACAO");
			log.info("cancelaRequisicao desligamento - IDAVALIACAO "+IDAVALIACAO);
if(IDAVALIACAO != ''){
	var contexto = 'CODCOLIGADA=' + codColigada + ';CODUSUARIO=' + usuarioContexto+';CODSISTEMA=G'; 
	var pk = codColigada+";"+IDAVALIACAO.toString();
	log.info("cancelaRequisicao desligamento - contexto "+contexto);
	log.info("cancelaRequisicao desligamento - pk "+pk);
	var result = authService.deleteRecordByKey('RMSPRJ3729152Server', pk, contexto);
	log.info("cancelaRequisicao desligamento - RMSPRJ3729152Server result "+result);

}
			
		}
	}	
}

function getXML(codColigada, idReq, usuarioContexto, codColigadaSolicitante, chapa, justificativa){
	
//	var timeElapsed = Date.now();
//	var ScheduleDateTime = new Date(timeElapsed).toISOString();


		newJustCancelamento = justificativa.replace(/\n/g, "&#xD;&#xA;");
	
	

	var xml = '';
	
	xml += '<RhuParecerParamsProcess z:Id="i1" xmlns="http://www.totvs.com.br/RM/" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:z="http://schemas.microsoft.com/2003/10/Serialization/">';
	xml += ' <ActionModule xmlns="http://www.totvs.com/">V</ActionModule>';
	xml += '  <ActionName xmlns="http://www.totvs.com/">RhuCancelarRequisicaoActionProc</ActionName>';
	xml += '  <CanParallelize xmlns="http://www.totvs.com/">true</CanParallelize>';
	xml += '  <CanSendMail xmlns="http://www.totvs.com/">false</CanSendMail>';
	xml += '  <CanWaitSchedule xmlns="http://www.totvs.com/">false</CanWaitSchedule>';
//	xml += '  <CodUsuario xmlns="http://www.totvs.com/">' + codUsuario + '</CodUsuario>';
	xml += '  <ConnectionId i:nil="true" xmlns="http://www.totvs.com/" />';
	xml += '  <ConnectionString i:nil="true" xmlns="http://www.totvs.com/" />';
	xml += '  <Context z:Id="i2" xmlns="http://www.totvs.com/" xmlns:a="http://www.totvs.com.br/RM/">';
	xml += '    <a:_params xmlns:b="http://schemas.microsoft.com/2003/10/Serialization/Arrays">';
	xml += '      <b:KeyValueOfanyTypeanyType>';
	xml += '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODCOLIGADA</b:Key>';
	xml += '        <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">' + codColigada + '</b:Value>';
	xml += '      </b:KeyValueOfanyTypeanyType>';
	xml += '      <b:KeyValueOfanyTypeanyType>';
	xml += '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODSISTEMA</b:Key>';
	xml += '        <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">V</b:Value>';
	xml += '      </b:KeyValueOfanyTypeanyType>';
//	xml += '      <b:KeyValueOfanyTypeanyType>';
//	xml += '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODUSUARIO</b:Key>';
//	xml += '        <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">' + codUsuario + '</b:Value>';
//	xml += '      </b:KeyValueOfanyTypeanyType>';
	xml += '      <b:KeyValueOfanyTypeanyType>';
	xml += '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CHAPAFUNCIONARIO</b:Key>';
	xml += '        <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">' + chapa + '</b:Value>';
	xml += '      </b:KeyValueOfanyTypeanyType>';
	xml += '    </a:_params>';
	xml += '    <a:Environment>DotNet</a:Environment>';
	xml += '  </Context>';
	xml += '  <PrimaryKeyList xmlns="http://www.totvs.com/" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays">';
	xml += '    <a:ArrayOfanyType>';
	xml += '      <a:anyType i:type="b:short" xmlns:b="http://www.w3.org/2001/XMLSchema">' + codColigada + '</a:anyType>';
	xml += '      <a:anyType i:type="b:int" xmlns:b="http://www.w3.org/2001/XMLSchema">' + idReq + '</a:anyType>';
	xml += '    </a:ArrayOfanyType>';
	xml += '  </PrimaryKeyList>';
	xml += '  <PrimaryKeyNames xmlns="http://www.totvs.com/" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays">';
	xml += '    <a:string>CODCOLREQUISICAO</a:string>';
	xml += '    <a:string>IDREQ</a:string>';
	xml += '  </PrimaryKeyNames>';
	xml += '  <PrimaryKeyTableName xmlns="http://www.totvs.com/">VReqDesligamento</PrimaryKeyTableName>';
	xml += '  <ProcessName xmlns="http://www.totvs.com/">Cancelar Requisição</ProcessName>';
	xml += '  <QuantityOfSplits xmlns="http://www.totvs.com/">0</QuantityOfSplits>';
	xml += '  <SaveLogInDatabase xmlns="http://www.totvs.com/">true</SaveLogInDatabase>';
	xml += '  <SaveParamsExecution xmlns="http://www.totvs.com/">false</SaveParamsExecution>';
//	xml += '  <ScheduleDateTime xmlns="http://www.totvs.com/">' + ScheduleDateTime + '</ScheduleDateTime>';
	xml += '  <Scheduler xmlns="http://www.totvs.com/">JobMonitor</Scheduler>';
	xml += '  <SendMail xmlns="http://www.totvs.com/">false</SendMail>';
	xml += '  <ServerName xmlns="http://www.totvs.com/">RhuCancelarRequisicaoProcess</ServerName>';
	xml += '  <ServiceInterface i:type="b:RuntimeType" z:FactoryType="c:UnitySerializationHolder" xmlns="http://www.totvs.com/" xmlns:a="http://schemas.datacontract.org/2004/07/System" xmlns:b="-mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089-System-System.RuntimeType" xmlns:c="-mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089-System-System.UnitySerializationHolder">';
	xml += '    <Data i:type="d:string" xmlns="" xmlns:d="http://www.w3.org/2001/XMLSchema">RM.Rhu.Requisicao.IRhuParecerProcess</Data>';
	xml += '    <UnityType i:type="d:int" xmlns="" xmlns:d="http://www.w3.org/2001/XMLSchema">4</UnityType>';
	xml += '    <AssemblyName i:type="d:string" xmlns="" xmlns:d="http://www.w3.org/2001/XMLSchema">RM.Rhu.Requisicao.Intf, Version=12.1.28.146, Culture=neutral, PublicKeyToken=null</AssemblyName>';
	xml += '  </ServiceInterface>';
	xml += '  <ShouldParallelize xmlns="http://www.totvs.com/">false</ShouldParallelize>';
	xml += '  <ShowReExecuteButton xmlns="http://www.totvs.com/">true</ShowReExecuteButton>';
	xml += '  <StatusMessage i:nil="true" xmlns="http://www.totvs.com/" />';
	xml += '  <SuccessMessage xmlns="http://www.totvs.com/">Verifique o log!</SuccessMessage>';
	xml += '  <SyncExecution xmlns="http://www.totvs.com/">false</SyncExecution>';
	xml += '  <UseJobMonitor xmlns="http://www.totvs.com/">true</UseJobMonitor>';
//	xml += '  <UserName xmlns="http://www.totvs.com/">' + codUsuario + '</UserName>';
	xml += '  <WaitSchedule xmlns="http://www.totvs.com/">false</WaitSchedule>';
	xml += '  <CodColigada>' + codColigada + '</CodColigada>';
	xml += '  <CodSistema>V</CodSistema>';
	xml += '  <StrContext i:nil="true" />';
	xml += '  <ColigadaContexto>' + codColigada + '</ColigadaContexto>';
	xml += '  <DataSet i:type="a:RhuReqParecer" xmlns:a="-RM.Rhu.Requisicao.Intf, Version=12.1.28.146, Culture=neutral, PublicKeyToken=null-RM.Rhu.Requisicao-RM.Rhu.Requisicao.RhuReqParecer">';
	xml += '    <xs:schema id="RhuReqParecer" targetNamespace="http://tempuri.org/RhuReqParecer.xsd" attributeFormDefault="qualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:mstns="http://tempuri.org/RhuReqParecer.xsd" xmlns="http://tempuri.org/RhuReqParecer.xsd" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" xmlns:msprop="urn:schemas-microsoft-com:xml-msprop">';
	xml += '      <xs:element name="RhuReqParecer" msdata:IsDataSet="true" msdata:Locale="pt-BR" msdata:EnforceConstraints="False">';
	xml += '        <xs:complexType>';
	xml += '          <xs:choice minOccurs="0" maxOccurs="unbounded">';
	xml += '            <xs:element name="VReqParecer" msprop:_x0024_Modified="True" msprop:_x0024_Caption="Parecer" msprop:_x0024_Id="IDPARECER;SOLICITANTE">';
	xml += '              <xs:complexType>';
	xml += '                <xs:sequence>';
	xml += '                  <xs:element name="CODCOLREQUISICAO" msdata:Caption="Responsável" msprop:_x0024_Visible="False" type="xs:int" default="' + codColigada + '" minOccurs="0" />';
	xml += '                  <xs:element name="IDREQ" msprop:_x0024_Visible="False" type="xs:int" default="' + idReq + '" minOccurs="0" />';
	xml += '                  <xs:element name="PARECER" msdata:Caption="Justificativa" msprop:_x0024_AllowFilter="False">';
	xml += '                    <xs:simpleType>';
	xml += '                      <xs:restriction base="xs:string">';
	xml += '                        <xs:maxLength value="2147483647" />';
	xml += '                      </xs:restriction>';
	xml += '                    </xs:simpleType>';
	xml += '                  </xs:element>';
//	xml += '                  <xs:element name="DATAPARECER" msdata:ReadOnly="true" msdata:Caption="Emitido em" msprop:_x0024_Format="dd/MM/yyyy HH:mm" type="xs:dateTime" default="' + ScheduleDateTime + '" />';
	xml += '                  <xs:element name="CODCOLSOLICITANTE" msdata:Caption="Responsável" msprop:_x0024_AllowFilter="False" type="xs:int" default="' + codColigadaSolicitante + '" />';
	xml += '                  <xs:element name="CHAPASOLICITANTE" msdata:Caption="Responsável" default="' + chapa + '">';
	xml += '                    <xs:simpleType>';
	xml += '                      <xs:restriction base="xs:string">';
	xml += '                        <xs:maxLength value="16" />';
	xml += '                      </xs:restriction>';
	xml += '                    </xs:simpleType>';
	xml += '                  </xs:element>';
//	xml += '                  <xs:element name="FILIALFUNCAO" msdata:ReadOnly="true" msdata:Caption="Filial / Função" msprop:_x0024_AllowFilter="False" type="xs:string" default="1 - Sede / ANALISTA DE SISTEMA PLENO" minOccurs="0" />';
//	xml += '                  <xs:element name="EMAILSOLICITANTE" msdata:ReadOnly="true" msdata:Caption="E-mail" msprop:_x0024_AllowFilter="False" type="xs:string" default="vinicius.garcia@mip.com.br" minOccurs="0" />';
//	xml += '                  <xs:element name="REQUISICAO" msdata:ReadOnly="true" msdata:Caption="Requisição para Cancelamento" msprop:_x0024_Visible="True" type="xs:string" default="' + idReq + ' - Aumento de Quadro" minOccurs="0" />';
	xml += '                  <xs:element name="IDREQPAI" type="xs:int" minOccurs="0" />';
	xml += '                  <xs:element name="STATUSPAI" msdata:ReadOnly="true" msdata:Caption="Status Atual" type="xs:string" default="" minOccurs="0" />';
	xml += '                  <xs:element name="REQPAI" msdata:ReadOnly="true" msdata:Caption="Requisição de origem (Pai)" type="xs:string" default=" - " minOccurs="0" />';
	xml += '                  <xs:element name="IDREQFILHA" type="xs:int" minOccurs="0" />';
	xml += '                  <xs:element name="STATUSFILHA" msdata:ReadOnly="true" msdata:Caption="Status Atual" type="xs:string" default="" minOccurs="0" />';
	xml += '                  <xs:element name="REQFILHA" msdata:ReadOnly="true" msdata:Caption="Requisição dependente (Filha)" type="xs:string" default=" - " minOccurs="0" />';
	xml += '                  <xs:element name="STATUSREQ" type="xs:int" minOccurs="0" />';
	xml += '                  <xs:element name="CODSTATUS" msdata:Caption="Status" msprop:_x0024_Visible="True" msprop:_x0024_AllowFilter="False" msprop:_x0024_ControlVisible="False" type="xs:int" default="6" minOccurs="0" />';
	xml += '                </xs:sequence>';
	xml += '              </xs:complexType>';
	xml += '            </xs:element>';
	xml += '          </xs:choice>';
	xml += '        </xs:complexType>';
	xml += '        <xs:unique name="VReqParecerKey">';
	xml += '          <xs:selector xpath=".//mstns:VReqParecer" />';
	xml += '          <xs:field xpath="mstns:CODCOLREQUISICAO" />';
	xml += '          <xs:field xpath="mstns:IDREQ" />';
	xml += '        </xs:unique>';
	xml += '      </xs:element>';
	xml += '    </xs:schema>';
	xml += '    <diffgr:diffgram xmlns:diffgr="urn:schemas-microsoft-com:xml-diffgram-v1" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">';
	xml += '      <RhuReqParecer xmlns="http://tempuri.org/RhuReqParecer.xsd">';
	xml += '        <VReqParecer diffgr:id="VReqParecer1" msdata:rowOrder="0" diffgr:hasChanges="inserted">';
	xml += '          <CODCOLREQUISICAO>' + codColigada + '</CODCOLREQUISICAO>';
	xml += '          <IDREQ>' + idReq + '</IDREQ>';
	xml += '          <PARECER>' + newJustCancelamento + '</PARECER>';
//	xml += '          <DATAPARECER>2020-10-30T14:16:37.6765531-03:00</DATAPARECER>';
	xml += '          <CODCOLSOLICITANTE>' + codColigadaSolicitante + '</CODCOLSOLICITANTE>';
	xml += '          <CHAPASOLICITANTE>' + chapa + '</CHAPASOLICITANTE>';
//	xml += '          <FILIALFUNCAO>1 - Sede / ANALISTA DE SISTEMA PLENO</FILIALFUNCAO>';
//	xml += '          <EMAILSOLICITANTE>vinicius.garcia@mip.com.br</EMAILSOLICITANTE>';
	xml += '          <REQUISICAO>' + idReq + ' - Desligamento</REQUISICAO>';
	xml += '          <STATUSPAI />';
	xml += '          <REQPAI> - </REQPAI>';
	xml += '          <STATUSFILHA />';
	xml += '          <REQFILHA> - </REQFILHA>';
	xml += '          <CODSTATUS>6</CODSTATUS>';
	xml += '        </VReqParecer>';
	xml += '      </RhuReqParecer>';
	xml += '    </diffgr:diffgram>';
	xml += '  </DataSet>';
//	xml += '  <DtConclusao>0001-01-01T00:00:00</DtConclusao>';
	xml += '  <IdRequisicoes i:nil="true" />';
	xml += '  <IncluirFilha>false</IncluirFilha>';
	xml += '  <TipoRequisicao>Desligamento</TipoRequisicao>';
	xml += '  <UsuarioContexto>' + usuarioContexto + '</UsuarioContexto>';
	xml += '</RhuParecerParamsProcess>';

	return xml;
}

function WsProcess_executeWithXmlParams(ProcessServerName, strXmlParams, userName, Password){

	var CAMINHO_SERVICO_PROCESS = "com.totvs.WsProcess";
	var NOME_SERVICO_PROCESS = "wsProcess";
    var servicoProcess = ServiceManager.getService(NOME_SERVICO_PROCESS);
	var instanciaProcess = servicoProcess.instantiate(CAMINHO_SERVICO_PROCESS);
	var wsProcess = instanciaProcess.getRMIwsProcess();
	var serviceHelperProcess = servicoProcess.getBean();
	var authServiceProcess = serviceHelperProcess.getBasicAuthenticatedClient(wsProcess, "com.totvs.IwsProcess", userName, Password);	

	try{
		var response = authServiceProcess.executeWithXmlParams(ProcessServerName, strXmlParams);
	}catch(e){
		
		throw "executeWithXmlParams = " + e;
	}
	
	return response;	
}

function getUsuarioRM(USER_CODE){
	
	usuario = new Object();	
	
	try{
		
		var c1 = DatasetFactory.createConstraint("USER_CODE", USER_CODE, USER_CODE, ConstraintType.MUST);
		var constraints = new Array(c1);
		var ds = DatasetFactory.getDataset("ds_RM_retorna_chapa", null, constraints, null);
												
		usuario.userCode = USER_CODE;							
		usuario.codColigada = ds.getValue(0, "CODCOLIGADA");
		usuario.chapa = ds.getValue(0, "CHAPA");
		usuario.codUsuario = ds.getValue(0, "CODUSUARIO");
		
		return usuario;

	}catch(e){

		var erro = "<br><br><b>Erro ao tentar recuperar a chapa: " + e + "</b><br><br>";
		log.error(erro);
		throw erro;
	}
}