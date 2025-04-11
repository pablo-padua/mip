function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("CODCOLIGADA");
	dataset.addColumn("IDMOV");
	dataset.addColumn("STATUS");
	dataset.addColumn("NSEQITMMOV");
	dataset.addColumn("CODTMV");
	dataset.addColumn("NUMEROMOV");
	dataset.addColumn("QUANTIDADETOTAL");
	dataset.addColumn("CODUND");
	dataset.addColumn("NOME_MOVIMENTO");
	dataset.addColumn("STATUS_APROV");
	dataset.addColumn("DATACRIACAO");
	dataset.addColumn("DATAENTREGA");
	dataset.addColumn("DTREPROGRAMADA");

	var coligada = ''; 
	var idMovim = '';
	var numSeq = '';
	
	for (var i = 0; i < constraints.length; i++) {
		if (constraints[i].fieldName == 'CODCOLIGADA') {
			coligada = constraints[i].initialValue;
		}
		if (constraints[i].fieldName == 'IDMOV') {
			idMovim = constraints[i].initialValue;
		}
		if (constraints[i].fieldName == 'NUMSEQITM') {
			numSeq = constraints[i].initialValue;
		}
	}
	
	var codSentenca = 'WS.112';
	var codColigada = 0;
	var codAplicacao = 'G';
	
	var campos = new Array("CODCOLIGADA", "IDMOV", "STATUS", "NSEQITMMOV", "CODTMV", "NUMEROMOV", "QUANTIDADETOTAL", "CODUND", "NOME_MOVIMENTO", "STATUS_APROV", "DATACRIACAO", "DATAENTREGA", "DTREPROGRAMADA");

	var c1 = DatasetFactory.createConstraint("CODSENTENCA", codSentenca, codSentenca, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODAPLICACAO", codAplicacao, codAplicacao, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("COLIGADA_I", coligada, coligada, ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint("IDMOV", idMovim, idMovim, ConstraintType.MUST);
	var c6 = DatasetFactory.createConstraint("SEQMOV", numSeq, numSeq, ConstraintType.MUST);
	
	var arrayConstraints = new Array(c1, c2, c3, c4, c5, c6);	
	var datasetRM = DatasetFactory.getDataset("ds_generic_rm_sql", campos, arrayConstraints, null);
	
	if (datasetRM == null || datasetRM == undefined) {
		throw "Ocorreu um erro ao executar a consulta ao RM. Favor entrar em contato com a equipe de TI.";
	} else if (datasetRM.rowsCount < 1) {
		throw "Não foram encontrados resultados para sua pesquisa.";
	} else {
		for (var i = 0; i < datasetRM.rowsCount; i++) {					
			var CODCOLIGADA = datasetRM.getValue(i, "CODCOLIGADA");
			var IDMOV = datasetRM.getValue(i, "IDMOV");
			var STATUS = datasetRM.getValue(i, "STATUS");
			var NSEQITMMOV = datasetRM.getValue(i, "NSEQITMMOV");
			var CODTMV = datasetRM.getValue(i, "CODTMV");
			var NUMEROMOV = datasetRM.getValue(i, "NUMEROMOV");
			var QUANTIDADETOTAL = datasetRM.getValue(i, "QUANTIDADETOTAL");
			var CODUND = datasetRM.getValue(i, "CODUND");
			var NOME_MOVIMENTO = datasetRM.getValue(i, "NOME_MOVIMENTO");
			var STATUS_APROV = datasetRM.getValue(i, "STATUS_APROV");
			var DATACRIACAO = datasetRM.getValue(i, "DATACRIACAO");
			var DATAENTREGA = datasetRM.getValue(i, "DATAENTREGA");
			var DTREPROGRAMADA = datasetRM.getValue(i, "DTREPROGRAMADA");

				dataset.addRow(new Array(CODCOLIGADA, IDMOV, STATUS, NSEQITMMOV, CODTMV, NUMEROMOV, QUANTIDADETOTAL, CODUND, NOME_MOVIMENTO, STATUS_APROV, DATACRIACAO, DATAENTREGA, DTREPROGRAMADA));			
		}
		return dataset;
	}
	return null;
}