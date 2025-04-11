function validateForm(form){
	
	var atividade = buscarAtividadeAtual();

	var Errors = [];
	var msg = '';
	
	if (atividade == INICIO_0 || atividade == INICIO){
		
		valida("txt_projeto", i18n.translate("text.projeto"));
		valida("fornecedor", i18n.translate("text.fornecedor"));
		valida("contrato", i18n.translate("text.contrato"));
		valida("dtVoucher", i18n.translate("text.dtVoucher"));
		valida("contatoSolicitante", i18n.translate("text.contatoSolicitante"));

				
		var indexFuncionarios = form.getChildrenIndexes('tablenameFuncionarios');
		var indexTerceiros = form.getChildrenIndexes('tablenameTerceiros');
		if (indexFuncionarios.length + indexTerceiros.length == 0){
			Errors.push("\u00c9 necess\u00e1rio inserir pelo menos um Funcionário ou Terceiro");
		}
		/*
		if (index.length < parseInt(form.getValue( "qtdItensDescontos" ))){
			Errors.push("Quantidade de Funcionários informada e menor que a quantidade de Descontos concedidos");
		}
		if (index.length < parseInt(form.getValue( "qtdItensDescontos" ))){
			Errors.push("Quantidade de Funcionários informada e menor que a quantidade de Acrécimos informado");
		}
		*/
		validaPaiFilho("tablenameFuncionarios" , "funcionario", i18n.translate("text.funcionario"));
		validaPaiFilho("tablenameTerceiros" , "cpfTerceiro", i18n.translate("text.cpfTerceiro"));
		
		validaPaiFilhoVoucher("tablenameFuncionarios" , "vlrVoucher", "Favor conferir o valor do Voucher");
		validaPaiFilhoVoucher("tablenameTerceiros" , "vlrVoucherTerc", "Favor conferir o valor do Voucher");
		
		validaPaiFilhoFuncionarios();
		validaPaiFilhoTerceiros();
	
	}else if(atividade == VALIDAR_CONCLUSAO){
		valida("aprovacao", i18n.translate("text.aprovacao"));
		
		if( form.getValue( "aprovacao" ) == "nao" ){
			valida("justificativaAprov", i18n.translate("text.justificativaAprov"));
			
		}
		
		
	}
		
	for (var i=0; i<Errors.length; i++){		
		msg+= "\n" + Errors[i];		
	}
	
	if (msg != ''){		
		throw "Os seguintes campos devem ser preenchidos: \n\n<b>" + msg +"</b>\n\n\n";
	}
	
	function valida(campo, mensagem) {    
	    if(form.getValue(campo) == '') {        
	        Errors.push("- "+mensagem);
	    }
	}

	function validaSelect(campo, mensagem) {    
	    if(form.getValue(campo) == 0) {        
	        Errors.push("- " + mensagem);
	    }
	}

	function validaPaiFilho(nomeTabela, campo, mensagem) {
	    var tablename = form.getChildrenIndexes(nomeTabela);
	    tablename.forEach(function(i) {
	        
	        var value = form.getValue(campo + '___' + i);
	        
	        if(value == '' || value == 0) {
	            
	            Errors.push("- " + mensagem + " da linha " + i);
	        }
	    });
	}
	
	function validaPaiFilhoVoucher(nomeTabela, campo, mensagem) {
	    var tablename = form.getChildrenIndexes(nomeTabela);
	    tablename.forEach(function(i) {
	        
	        var value = form.getValue(campo + '___' + i);
	        
	        if(value == '' || value == 0 || value == "0,00") {
	            
	            Errors.push("- " + mensagem + " da linha " + i);
	        }
	        
	    });
	}
	
	function validaPaiFilhoFuncionarios() {
	    var tablename = form.getChildrenIndexes("tablenameFuncionarios");
	    tablename.forEach(function(i) {
	        
	    	var valueCafe = form.getValue("valorPreAprovCafe");
	    	var valueAlmoco = form.getValue("valorPreAprovAlmoco");
	    	var valueAlmocoPequeno = form.getValue("valorPreAprovAlmocoPequeno");
	    	var valueJantar = form.getValue("valorPreAprovJantar");
	    	var valueJantarPequeno = form.getValue("valorPreAprovJantarPequeno");

	    	if( (valueCafe == '' || valueCafe == 0 || valueCafe == "0,00") && form.getValue("hidden_checkboxCafe" + '___' + i) == "sim")
	    		Errors.push("- Funcionários - Café da Manhã com valor R$0,00 está marcado da linha " + i);
	    	
	    	if( (valueAlmoco == '' || valueAlmoco == 0 || valueAlmoco == "0,00") && form.getValue("hidden_checkboxAlmoco" + '___' + i) == "sim")
	    		Errors.push("- Funcionários - Almoço com valor R$0,00 está marcado da linha " + i);
	    	
	    	if( (valueAlmocoPequeno == '' || valueAlmocoPequeno == 0 || valueAlmocoPequeno == "0,00") && form.getValue("hidden_checkboxAlmocoPequeno" + '___' + i) == "sim")
	    		Errors.push("- Funcionários - Almoço Pequeno com valor R$0,00 está marcado da linha " + i);
	    	
	    	if( (valueJantar == '' || valueJantar == 0 || valueJantar == "0,00") && form.getValue("hidden_checkboxJantar" + '___' + i) == "sim")
	    		Errors.push("- Funcionários - Jantar com valor R$0,00 está marcado da linha " + i);    	

	    	if( (valueJantarPequeno == '' || valueJantarPequeno == 0 || valueJantarPequeno == "0,00") && form.getValue("hidden_checkboxJantarPequeno" + '___' + i) == "sim")
	    		Errors.push("- Funcionários - Jantar Pequeno com valor R$0,00 está marcado da linha " + i);
	    	
	    	
	        if(form.getValue("hidden_checkboxAlmoco" + '___' + i) == "sim" && form.getValue("hidden_checkboxAlmocoPequeno" + '___' + i) == "sim")
	            Errors.push("- Funcionários - Almoço e Almoço Pequeno estão marcados da linha " + i);
	        
	        if(form.getValue("hidden_checkboxJantar" + '___' + i) == "sim" && form.getValue("hidden_checkboxJantarPequeno" + '___' + i) == "sim")
	            Errors.push("- Funcionários - Jantar e Jantar Pequeno estão marcados da linha " + i);
	        
	    });
	}
	
	function validaPaiFilhoTerceiros() {
	    var tablename = form.getChildrenIndexes("tablenameTerceiros");
	    tablename.forEach(function(i) {
	    	
	    	var valueCafe = form.getValue("valorPreAprovCafe");
	    	var valueAlmoco = form.getValue("valorPreAprovAlmoco");
	    	var valueAlmocoPequeno = form.getValue("valorPreAprovAlmocoPequeno");
	    	var valueJantar = form.getValue("valorPreAprovJantar");
	    	var valueJantarPequeno = form.getValue("valorPreAprovJantarPequeno");

	    	if( (valueCafe == '' || valueCafe == 0 || valueCafe == "0,00") && form.getValue("hidden_checkboxCafeTerc" + '___' + i) == "sim")
	    		Errors.push("- Terceiros - Café da Manhã com valor R$0,00 está marcado da linha " + i);
	    	
	    	if( (valueAlmoco == '' || valueAlmoco == 0 || valueAlmoco == "0,00") && form.getValue("hidden_checkboxAlmocoTerc" + '___' + i) == "sim")
	    		Errors.push("- Terceiros - Almoço com valor R$0,00 está marcado da linha " + i);
	    	
	    	if( (valueAlmocoPequeno == '' || valueAlmocoPequeno == 0 || valueAlmocoPequeno == "0,00") && form.getValue("hidden_checkboxAlmocoTercPeq" + '___' + i) == "sim")
	    		Errors.push("- Terceiros - Almoço Pequeno com valor R$0,00 está marcado da linha " + i);
	    	
	    	if( (valueJantar == '' || valueJantar == 0 || valueJantar == "0,00") && form.getValue("hidden_checkboxJantarTerc" + '___' + i) == "sim")
	    		Errors.push("- Terceiros - Jantar com valor R$0,00 está marcado da linha " + i);    	

	    	if( (valueJantarPequeno == '' || valueJantarPequeno == 0 || valueJantarPequeno == "0,00") && form.getValue("hidden_checkboxJantarTercPeq" + '___' + i) == "sim")
	    		Errors.push("- Terceiros - Jantar Pequeno com valor R$0,00 está marcado da linha " + i);
	    	

	        if(form.getValue("hidden_checkboxAlmocoTerc" + '___' + i) == "sim" && form.getValue("hidden_checkboxAlmocoTercPeq" + '___' + i) == "sim")
	            Errors.push("- Terceiros - Almoço e Almoço Pequeno estão marcados da linha " + i);

	        if(form.getValue("hidden_checkboxJantarTerc" + '___' + i) == "sim" && form.getValue("hidden_checkboxJantarTercPeq" + '___' + i) == "sim")
	            Errors.push("- Terceiros - Jantar e Jantar Pequeno estão marcados da linha " + i);
	        
	    });
	}

}