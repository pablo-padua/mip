function lotacaoNova(){
	
	var index = getIndexes("codNivelFuncTabelaNova");
	var arrIndex = index.toArray();
	var i = 0;

	while(arrIndex[i])
		i++;
	
	var index2 = getIndexes("codNivelFuncNova");
	var arrIndex2 = index2.toArray();
	var j = 0;
	
	while(arrIndex2[j])
		j++;
	
	if(i == 0 && j == 0)
		return "nao";
	else
		return "sim";
	
}