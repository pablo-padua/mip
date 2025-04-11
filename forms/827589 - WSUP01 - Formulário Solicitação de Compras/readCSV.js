var linhasERRO = [];
$(document).ready(function(){
    $("#file").on('change', handleFileSelect);
});

// FUNÇÃO QUE VALIDA ARQUIVO
function handleFileSelect(evt) {

    $("#itensImportadosExel").val("sim");

    var files = evt.target.files;
    var file = files[0];
    var r =  /\.(MIP)$/;
    
    if(r.test(file.name.toUpperCase())){
        readfile(file);
      
    }else{
    	
    	FLUIGC.message.alert(
				{
					message : "Obrigatório anexar um arquivo no formato (.mip)",
					title : "Aten\u00e7\u00e3o",
					label : 'OK'
				}, function(el, ev) {
					location.reload(true);
		});
    	
        //FLUIGC.toast({title: 'Por Favor:', message: 'Envie um arquivo no formato (.mip)', type: 'warning'});
        //window.location.reload(true);
    }
}



// FAZ LEITURA CSV
function readfile(file){
    var reader = new FileReader();
    reader.readAsText(file,'windows-1252');
    reader.onload = function(event){
        var csv = event.target.result;
        adicionaPrevs(csv);
        
        setTimeout(function() {
        	if(linhasERRO.length > 0){
        		FLUIGC.message.alert(
						{
							message : "Existe campo obrigat&oacute;rio n&atilde;o preenchido no arquivo importado!!! linha 's': "+ linhasERRO.toString() +"",
							title : "Aten\u00e7\u00e3o",
							label : 'OK'
						}, function(el, ev) {
							location.reload(true);
				});
            	
            }
        }, 2000);
        
    };
}

// REALIZA TRATAMENTO DAS INFORMAÇÕES
function adicionaPrevs(arr){
	var jsonObj = [];
	var numGedDefault = $("#numGedDefault").val();
	
	
	var phisicalFile= '';
	var dataset;
	var childs = [];
	var fields = ['relatedFieles'];
	var constraints = [];
	var constraint = DatasetFactory.createConstraint('documentPK.documentId', numGedDefault, numGedDefault, ConstraintType.MUST);	
	constraints.push(constraint);
	constraint = DatasetFactory.createConstraint('activeVersion', true,true, ConstraintType.MUST);
	constraints.push(constraint);
	dataset = DatasetFactory.getDataset("document", null, constraints, null);
	
	for(var i=0; i<dataset.values.length; i++){
		phisicalFile = dataset.values[i].phisicalFile;
	}

    var aLine = arr.split(/\r?\n|\r/);  
    var headers = aLine[0].split(";"); 

for(var i = 1; i < aLine.length; i++) {
	if(aLine[i] != "" && aLine[i] != undefined){
		 var data = aLine[i].split(';');
		  var obj = {};
		  
		  for(var j = 0; j < data.length; j++) {
			
				  obj[headers[j]] = data[j];
			
		    
		  }
		 var stringVER_PLAN = obj.VER_PLAN;
		 var stringPhisicalFile = phisicalFile;
		 
		  
		  if( stringVER_PLAN.replaceAll(/ /g,'') == stringPhisicalFile.replaceAll(/ /g,'')){
		
			  if(obj.DESCRICAO != '' && obj.QUANTINDADE != '' && obj.UNID != '' && obj.DATA_NECESSIDADE != '' && obj.DOC_ORIGEM != '' && obj.REV_DOC != '' && obj.ITEM_PQ != ''){
				  jsonObj.push(obj);
			  }else{
					 linhasERRO.push(i);	
			  } 
		  }else{
				FLUIGC.message.alert(
						{
							message : "Arquivo importado não está na mesma versão do arquivo default disponibilizado no processo ",
							title : "Aten\u00e7\u00e3o",
							label : 'OK'
						}, function(el, ev) {
							location.reload(true);
				});
		  }
		  
		
		  
		  
		}
	}
 
	JSON.stringify(jsonObj);

    for(var k = 0; k < jsonObj.length; k++) {
    	 addPrevs(jsonObj[k]);
	  }

}

// PREENCHE CAMPO COM AS INFORMAÇÕES DO CSV
function addPrevs(obj){
        let id = wdkAddChild('tableItens');
        
        $("#indicePaiFilhoItem___"+id).val(id);
        $("#numItemDocMat___"+id).val(obj.NUM_ITEM_DOC);
        $("#qtdItem___"+id).val(obj.QUANTINDADE);
        $("#unidOrigem___"+id).val(obj.UNIDADE);
        $("#docOrigem___"+id).val(obj.DOC_ORIGEM);
       // $("#codMatOrigem___"+id).val(obj.COD_MAT_ORIG);
        $("#revDocMatOrigem___"+id).val(obj.REV_DOC);
        $("#descMatOrigem___"+id).val(obj.DESCRICAO);
        $("#dtNecessidadeMatOrigem___"+id).val(obj.DATA_NECESSIDADE);
        $("#itemPQ___"+id).val(obj.ITEM_PQ);
        $("#codPetrobras___"+id).val(obj.COD_PETROBRAS);
        $("#codProjetista___"+id).val(obj.COD_PROJETISTA);
}


