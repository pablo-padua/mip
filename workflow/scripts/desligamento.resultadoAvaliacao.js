function resultadoAvaliacao(){
	
	var semRestricao = hAPI.getCardValue("hiddenSemRestricao");
	var justaCausa = hAPI.getCardValue("hiddenJustaCausa");
	var regraDeOuro = hAPI.getCardValue("hiddenRegraDeOuro");
	var assiduidade = hAPI.getCardValue("hiddenAssiduidade");
	var pontualidade = hAPI.getCardValue("hiddenPontualidade");
	var produtividade = hAPI.getCardValue("hiddenProdutividade");
	var comprometimento = hAPI.getCardValue("hiddenComprometimento");
	var indisciplina = hAPI.getCardValue("hiddenIndisciplina");
	var seguranca = hAPI.getCardValue("hiddenSeguranca");
	
	if(semRestricao == "1")
		return "Apto";
	else if(comprometimento == "1" || seguranca == "1" || regraDeOuro == "1" || justaCausa == "1")
		return "Inapto";
	else if(assiduidade == "1" || pontualidade == "1" || produtividade == "1" || indisciplina == "1")
		return "Apto com restrições";
	else
		return "";
	
}