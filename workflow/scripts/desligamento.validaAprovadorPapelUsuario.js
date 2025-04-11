function validaAprovadorPapelUsuario(usuario, aprovador){

	var retorno = null;

	if(usuario != "" && usuario == aprovador){
		return true;
	}else{
		
		if(usuario != "" && usuario.indexOf("Role") == -1 && aprovador.indexOf("Role") > -1){

			var aprovadorSplit = aprovador.split(":");
			//log.info(" - validaAprovadorPapelUsuario = aprovador: "+aprovadorSplit);
			var codPapel = aprovadorSplit[2];
			//log.info(" - validaAprovadorPapelUsuario = aprovador: "+codPapel);
			/*
			 * Função verifica se usuário está dentro de determinado grupo;
			 * A consulta é feita no dataset colleagueGroup;
			 * O filtro é o nome do grupo e matrícula;
			 */
	
			   var filter = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", codPapel, codPapel, ConstraintType.MUST);
			   var filter2 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", usuario, usuario, ConstraintType.MUST);
			   var constraints = new Array(filter,filter2);
			   var datasetRole = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);
			   if(datasetRole.rowsCount > 0){
				   return true;
			   }else{	 
				   return false;		 
			   }
		}
		
		}	

	return false;
}

function pularAprovacaoCoordenacao(){

	var matrSolicitante = hAPI.getCardValue("matrSolicitante");
	var aprovador1Alcada = hAPI.getCardValue("aprovador1Alcada");	
	var aprovador2Alcada = hAPI.getCardValue("aprovador2Alcada");
	var atribuicaoVerAval = hAPI.getCardValue("atribuicaoVerAval");
	
	if(validaAprovadorPapelUsuario(matrSolicitante, aprovador1Alcada) == true)
		return true;
	
	if(validaAprovadorPapelUsuario(matrSolicitante, aprovador2Alcada) == true)
		return true;
	
	if(validaAprovadorPapelUsuario(matrSolicitante, atribuicaoVerAval) == true)
		return true;
	
	return false;
	
}

function pularAprovacaoFinal(){

	var matrSolicitante = hAPI.getCardValue("matrSolicitante");
	var aprovadorCoordenacao = hAPI.getCardValue("aprovadorCoordenacao");	
	var aprovador2Alcada = hAPI.getCardValue("aprovador2Alcada");
	var atribuicaoVerAval = hAPI.getCardValue("atribuicaoVerAval");
	
	if(validaAprovadorPapelUsuario(matrSolicitante, aprovador2Alcada) == true)
		return true;
	
	if(validaAprovadorPapelUsuario(matrSolicitante, atribuicaoVerAval) == true)
		return true;

	if(validaAprovadorPapelUsuario(aprovadorCoordenacao, aprovador2Alcada) == true)
		return true;

	if(validaAprovadorPapelUsuario(aprovadorCoordenacao, atribuicaoVerAval) == true)
		return true;
	
	return false;
	
}

function pularVerificarAvaliacao(){

	var matrSolicitante = hAPI.getCardValue("matrSolicitante");
	var aprovadorCoordenacao = hAPI.getCardValue("aprovadorCoordenacao");	
	var aprovadorFinal = hAPI.getCardValue("aprovadorFinal");
	var atribuicaoVerAval = hAPI.getCardValue("atribuicaoVerAval");
	
	if(validaAprovadorPapelUsuario(matrSolicitante, atribuicaoVerAval) == true)
		return true;
	
	if(validaAprovadorPapelUsuario(aprovadorCoordenacao, atribuicaoVerAval) == true)
		return true;

	if(validaAprovadorPapelUsuario(aprovadorFinal, atribuicaoVerAval) == true)
		return true;
	
	return false;
	
}

/*
function validaAprovadorPapelUsuario(){

	var retorno = null;
	var aprovador1Alcada = hAPI.getCardValue("aprovador1Alcada");
	var aprovador2Alcada = hAPI.getCardValue("aprovador2Alcada");

	if(aprovador1Alcada == aprovador2Alcada){
		return true;
	}else{
		
		if(aprovador1Alcada.indexOf("Role") == -1 && aprovador2Alcada.indexOf("Role") > -1){
			//:
			var aprovador2AlcadaSplit = aprovador2Alcada.split(":");
			//log.info(" - validaAprovadorPapelUsuario = aprovador2Alcada: "+aprovador2AlcadaSplit);
			var codPapel = aprovador2AlcadaSplit[2];
			//log.info(" - validaAprovadorPapelUsuario = aprovador2Alcada: "+codPapel);
			/*
			 * Função verifica se usuário está dentro de determinado grupo;
			 * A consulta é feita no dataset colleagueGroup;
			 * O filtro é o nome do grupo e matrícula;
			 */ /*
	
			   var filter = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", codPapel, codPapel, ConstraintType.MUST);
			   var filter2 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", aprovador1Alcada, aprovador1Alcada, ConstraintType.MUST);
			   var constraints   = new Array(filter,filter2);
			   var datasetRole = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);
			   if(datasetRole.rowsCount > 0){
				   return true;
			   }else{	 
				   return false;		 
			   }
		}
		
		}	

	return false;
}
*/