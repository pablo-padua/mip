function vincularTabelaSalarial(tipoAcao){
	
	var NOME_SERVICO = "wsDataServer";
	var CAMINHO_SERVICO = "com.totvs.WsDataServer";
	var connect = DatasetFactory.getDataset('ds_connector', null, null, null);
	var user = connect.getValue(0, 'INTEGRADOR');
	var password = connect.getValue(0, 'SENHA');

	var xml = createXmlVincularTabelaSalarial(tipoAcao, user);
	var response = WsProcess_executeWithXmlParams('RhuAssistVinculacaoTabelaSalarialServerProcess', xml, user, password);
	
	return response;
    
}

function createXmlVincularTabelaSalarial(tipoAcao, user) {

	var xml = '';
	
	xml += '<RhuAssistVinculacaoTabelaSalarialProcessParams z:Id="i1" xmlns="http://www.totvs.com.br/RM/" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:z="http://schemas.microsoft.com/2003/10/Serialization/">' +
	  '<ActionModule xmlns="http://www.totvs.com/">V</ActionModule>' +
	  '<ActionName xmlns="http://www.totvs.com/">RhuAssistVinculacaoTabelaSalarialProcessAction</ActionName>' +
	  '<CanParallelize xmlns="http://www.totvs.com/">true</CanParallelize>' +
	  '<CanSendMail xmlns="http://www.totvs.com/">false</CanSendMail>' +
	  '<CanWaitSchedule xmlns="http://www.totvs.com/">false</CanWaitSchedule>' +
	  '<CodUsuario xmlns="http://www.totvs.com/">totvs.tbc</CodUsuario>' +
	  '<ConnectionId i:nil="true" xmlns="http://www.totvs.com/" />' +
	  '<ConnectionString i:nil="true" xmlns="http://www.totvs.com/" />' +
	  '<Context z:Id="i2" xmlns="http://www.totvs.com/" xmlns:a="http://www.totvs.com.br/RM/">' +
	    '<a:_params xmlns:b="http://schemas.microsoft.com/2003/10/Serialization/Arrays">' +
	      '<b:KeyValueOfanyTypeanyType>' +
	        '<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODCOLIGADA</b:Key>' +
	        '<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">' + hAPI.getCardValue("codColigada") + '</b:Value>' +
	      '</b:KeyValueOfanyTypeanyType>' +
	      '<b:KeyValueOfanyTypeanyType>' +
	        '<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODSISTEMA</b:Key>' +
	        '<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">V</b:Value>' +
	      '</b:KeyValueOfanyTypeanyType>' +
	      '<b:KeyValueOfanyTypeanyType>' +
	        '<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODUSUARIO</b:Key>' +
	        '<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">' + user + '</b:Value>' +
	      '</b:KeyValueOfanyTypeanyType>' +
	    '</a:_params>' +
	    '<a:Environment>DotNet</a:Environment>' +
	  '</Context>' +
	  '<PrimaryKeyList xmlns="http://www.totvs.com/" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays" />' +
	  '<PrimaryKeyNames i:nil="true" xmlns="http://www.totvs.com/" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays" />' +
	  '<PrimaryKeyTableName i:nil="true" xmlns="http://www.totvs.com/" />' +
	  '<CodColigada>' + hAPI.getCardValue("codColigada") + '</CodColigada>' +
	  '<CodSistema>V</CodSistema>' +
	  '<StrContext i:nil="true" />' +
	  '<Elementos>' +
	  createElementos(tipoAcao) +
	  '</Elementos>' +
	  '<UsaLotacaoTabSalarial>1</UsaLotacaoTabSalarial>' +
	  '<UsaTabSalarial>true</UsaTabSalarial>' +
	'</RhuAssistVinculacaoTabelaSalarialProcessParams>';	
	
	
	log.info("tabelaSalarial - vinculat Tabelas Salariais -----xml=="+xml);
	return xml;
}

function createElementos(tipoAcao) {
	
	var xml = "";
	
	if (tipoAcao == "alterar"){	
		var indexes = getIndexes('codNivelFuncNova');
		var iterator = indexes.iterator();
		while (iterator.hasNext()) {
			var index = iterator.next();
			xml += '<RhuVinculacaoTabelaSalarialUtils.Elemento>';
			xml += '<GeOrigem>lotacao</GeOrigem>';
			xml += setNode("GetCodColigada", hAPI.getCardValue("codColigada"));
			xml += setNode("GetFuncao", hAPI.getCardValue("codNivelFuncNova___" + index));
			xml += setNode("GetNivel", hAPI.getCardValue("codNivelFuncNova___" + index));
			xml += setNode("GetSecao", hAPI.getCardValue("codSecaoFuncNova___" + index));				
			xml += setNode("GetStatus", "adicionar");
			xml += setNode("GetTabela", hAPI.getCardValue("codTabela"));
			xml += '</RhuVinculacaoTabelaSalarialUtils.Elemento>';
			
		}
		
	} else if (tipoAcao == "incluir"){
		var indexes = getIndexes('codNivelFuncTabelaNova');
		var iterator = indexes.iterator();
		while (iterator.hasNext()) {
			var index = iterator.next();
			xml += '<RhuVinculacaoTabelaSalarialUtils.Elemento>';
			xml += '<GeOrigem>lotacao</GeOrigem>';
			xml += setNode("GetCodColigada", hAPI.getCardValue("codColigada"));
			xml += setNode("GetFuncao", hAPI.getCardValue("codNivelFuncTabelaNova___" + index));
			xml += setNode("GetNivel", hAPI.getCardValue("codNivelFuncTabelaNova___" + index));
			xml += setNode("GetSecao", hAPI.getCardValue("codSecaoFuncTabelaNova___" + index));	
			xml += setNode("GetStatus", "adicionar");
			xml += setNode("GetTabela", hAPI.getCardValue("codNovaTabela"));
			xml += '</RhuVinculacaoTabelaSalarialUtils.Elemento>';
		}
	}	
	
	return xml;
}