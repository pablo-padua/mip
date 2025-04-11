var underline = "___";
var indice = -1;

function setSelectedZoomItem(selectedItem){
	
	var arraySelectedItem = selectedItem.inputName.split("___");
	if (arraySelectedItem != null && arraySelectedItem != undefined
			&& arraySelectedItem.length > 1) {
		indice = arraySelectedItem[1];
	}
		
	switch (selectedItem.inputName) {
	
	case "periodo":
		$("[name=codPeriodo]").val(selectedItem["CODFOLGACAMPO"]);
		break;
	
	case "equipeSEO":
		$("[name=codEquipeSEO]").val(selectedItem["CODEQUIPE"]);
		break;

	case "cestaBasica":
		$("[name=codCestaBasica]").val(selectedItem["CODCLIENTE"]);
		break;

	case "planoSaude":
		$("[name=codPlanoSaude]").val(selectedItem["CODCLIENTE"]);
		break;
		
	case "civilDependente" +underline+indice:
		$("#CodCivi" +underline+indice).val(selectedItem["CODCLIENTE"]);
		break;
		
	case "grauDependente" +underline+indice:
		$("#CodGrau" +underline+indice).val(selectedItem["CODCLIENTE"]);
		break;
		
	case "horario":
		window["indiceHorario"].clear();
		$("[name=codHorario]").val(selectedItem["CODIGO"]);
		
		var codColigada = $("[name=codColigada]").val();
		var codHorario = $("[name=codHorario]").val();
		reloadZoomFilterValues("indiceHorario", "PARAM_CODCOLIGADA," + codColigada + ",PARAM_CODHORARIO," + codHorario);		
		
		break;
		
	case "bancario":
		$("[name=codBanco]").val(selectedItem["NUMBANCO"]);
		
		window["agencias"].clear();
		
		var codbancario = $("[name=codBanco]").val();
		reloadZoomFilterValues("agencias", "NUM_BANCO," + codbancario);	
			
		break;
		
	case "alojado":
		$("[name=codAlojado]").val(selectedItem["CODCLIENTE"]);
		break;

	case "indiceHorario":
		$("[name=codIndiceHorario]").val(selectedItem["INDINICIOHOR"]);
		break;
	}
	
}

function removedZoomItem(removedItem) {

	switch (removedItem.inputName) {
		
	case "periodo":
		$("[name=codPeriodo]").val("");
		break;
	
	case "equipeSEO":
		$("[name=codEquipeSEO]").val("");
		break;

	case "cestaBasica":
		$("[name=codCestaBasica]").val("");
		break;

	case "planoSaude":
		$("[name=codPlanoSaude]").val("");
		break;

	case "horario":
		window["indiceHorario"].clear();
		$("[name=codHorario]").val("");
		$("[name=codIndiceHorario]").val("");
		$("[name=indiceHorario]").val("");
		break;

	case "bancario": 		
		window["agencias"].clear();		
		$("[name=agencias]").val("");
		$("[name=codBanco]").val("");
		break;
		
	case "alojado":
		$("[name=codAlojado]").val("");
		break;

	case "indiceHorario":
		$("[name=codIndiceHorario]").val("");
		break;
		
	case "estadoCivil" +underline+indice: 
		$("[name=CodCivi]").val("");
		break;
		
	case "grauDependente" +underline+indice:
		$("[name=CodGrau]").val("");
		break;
		
	}
	
}