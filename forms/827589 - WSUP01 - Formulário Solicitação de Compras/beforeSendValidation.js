var beforeSendValidate = function(numState, nextState) {
	var qtdEditada = 0;
	
if((numState == ACOMPANHAR_SOLICITACAO_REVISAO) && (nextState == EXCLUSIVO_ACOMPANHAR_REV)){
	$("input[name^='indicePaiFilhoTbItem___']").each(function(){
		qtdEditada++;	
	});
	
	if(qtdEditada == qtdItemEditIni){
		if(versaoInicial == ''){
			$("#numeroRevSC").val('0');
		}else{
			$("#numeroRevSC").val(versaoInicial);
		}
		
		$("#hidden_TempRev").val('');
	}
}

}