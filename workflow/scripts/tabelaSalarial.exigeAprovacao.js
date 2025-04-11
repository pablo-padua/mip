function exigeAprovacao(){
	
	if(houveInclusaoFuncao())
		return true;
	else if(houveAlteracaoSalario())
		return true;
	else
		return false;
}

function houveInclusaoFuncao(){
	
	var indexes = getIndexes('codNivelFuncTabelaNova');
	var iterator = indexes.iterator();
	var cont = 0;
	
	while (iterator.hasNext()) {
		
		var index = iterator.next();
		cont++;

	}
	
	var indexes = getIndexes('codNivelFuncNova');
	var iterator = indexes.iterator();
	while (iterator.hasNext()) {
		
		var index = iterator.next();
		
		if(hAPI.getCardValue("isFuncNova___" + index) == "1")		
			cont++;

	}
	
	if(cont == 0)
		return false;
	else
		return true;
}

function houveAlteracaoSalario(){
	
	var indexes = getIndexes('codFuncaoExistente');
	var iterator = indexes.iterator();
	var cont = 0;
	
	while (iterator.hasNext()) {
		
		var index = iterator.next();

		var salarioFuncExiste = hAPI.getCardValue("salarioFuncExiste___" + index);
		salarioFuncExiste = parseFloat((salarioFuncExiste).replace(".","").replace(",","."));
		
		var novoSalario = hAPI.getCardValue("novoSalario___" + index);
		novoSalario = parseFloat((novoSalario).replace(".","").replace(",","."));
		
		if (salarioFuncExiste != novoSalario)
			cont ++;

	}

	if(cont == 0)
		return false;
	else
		return true;

}