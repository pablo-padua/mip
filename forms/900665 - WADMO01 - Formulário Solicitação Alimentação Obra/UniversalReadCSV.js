var aIdsGerentes = [];
var arrayCpfTerc = new Array;
var reader = null;
$(document).ready(function(){
	reader = null;
    $("#fileCSVTerc").on('change', handleFileSelectTerc);
});

//FUNÇÃO QUE VALIDA ARQUIVO
function handleFileSelectTerc(evt) {

    $("#itensImportadosExel").val("sim");

    var files = evt.target.files;
    var file = files[0];
    var r =  /\.(CSV)$/;
    
    if(r.test(file.name.toUpperCase())){
        readfileTerc(file);
    }else{
        FLUIGC.toast({title: 'Por Favor:', message: 'Envie um arquivo no formato CSV (.csv)', type: 'warning'});
    }
}


//FAZ LEITURA CSV 
function readfile(file){
	
    var reader = new FileReader();
    reader.readAsText(file,'windows-1252');
    reader.onload = function(event){
        var csv = event.target.result;
        adicionaPrevs(csv);
    };

}

//REALIZA TRATAMENTO DAS INFORMAÇÕES
function adicionaPrevs(arr){
	var jsonObj = [];
    var aLine = arr.split(/\r?\n|\r/);  
    var headers = aLine[0].split(";"); 
	var contTerc = 0;

	for(var i = 1; i < aLine.length; i++) {
		if(aLine[i] != ""){
			 var data = aLine[i].split(';');
			  var obj = {};
			  for(var j = 0; j < data.length; j++) {
			     obj[headers[j].trim()] = data[j].trim();
			  }
			  if(obj.CPF != '' && obj.NOME != ''){
				 
				  jsonObj.push(obj);
				  
			  }else{
				  $(".fileCSVTerc").hide();				  
				  contTerc ++;
					FLUIGC.message
					.alert(
							{
								message : "Existe campo obrigat&oacute;rio n&otilde;o preenchido no arquivo importado!!! linha: "+i+"",
								title : "Aten\u00e7\u00e3o",
								label : 'OK'
							}, function(el, ev) {
					});
		
			  }
			}
		}
	
	if(contTerc == 0){
		JSON.stringify(jsonObj);

    for(var k = 0; k < jsonObj.length; k++) {
    	 addPrevs(jsonObj[k]);
	  }
	}
}

//PREENCHE CAMPO COM AS INFORMAÇÕES DO CSV
async function addPrevsTerc(obj){
  try {
    var CPF = obj.CPF;
    CPF = CPF.replace(/[^0-9]/g, "").toString();
    CPF = addZeroEsqueda(CPF, 11);

    var arrayFuncionarios = [];
    $("input[name^='hidden_CPF___']").each(function () {
      var index = this.id.split("___")[1];
      arrayFuncionarios.push($("#hidden_CPF___" + index).val());
    });

    var constraints = new Array();
    constraints.push(
      DatasetFactory.createConstraint("FILTRO", CPF, CPF, ConstraintType.MUST)
    );
    var params = getDatasetParam(
      "ds_RM_QUERY_SELECT_ValidarCpfBaseRm",
      null,
      constraints,
      null
    );

    const result = await $.ajax({
      url: "/api/public/ecm/dataset/datasets",
      data: JSON.stringify(params),
      dataType: "json",
      type: "POST",
      contentType: "application/json",
      async: true,
    });

    if (result.content.values.length > 0) {
      var retornoCPF = result.content.values[0]["CPF"];
      var NOMEFANTASIA = result.content.values[0]["NOMEFANTASIA"];
      var DATADEMISSAO = result.content.values[0]["DATADEMISSAO2"];
      var newDATADEMISSAO = "";
      var newDatavoucher = "";

      if (DATADEMISSAO != "") {
        var datavoucher = $("#dtVoucher").val();

        var DATADEMISSAOSplit = DATADEMISSAO.split("/");
        var datavoucherSplit = datavoucher.split("/");

        newDATADEMISSAO = new Date(
          DATADEMISSAOSplit[2],
          DATADEMISSAOSplit[1] - 1,
          DATADEMISSAOSplit[0]
        );
        newDatavoucher = new Date(
          datavoucherSplit[2],
          datavoucherSplit[1] - 1,
          datavoucherSplit[0]
        );
      }

      if (DATADEMISSAO == "" || newDATADEMISSAO > newDatavoucher) {
        if (validarExistenciaFunc(arrayFuncionarios, retornoCPF)) {
          arrayFuncionarios.push(retornoCPF);
          let index = wdkAddChild("tablenameFuncionarios");
          carregaNumeracaoFuncionario();

          window["funcionario___" + index].setValue(
            result.content.values[0]["NOMEFANTASIA"]
          );
          $("#hidden_indexFuncionario___" + index).val(index);
          $("#hidden_FuncCODCCUSTO___" + index).val(
            result.content.values[0]["CODCCUSTO"]
          );
          $("#hidden_FuncCODSECAO___" + index).val(
            result.content.values[0]["CODSECAO"]
          );
          $("#hidden_FuncCODFUNCAO___" + index).val(
            result.content.values[0]["CODFUNCAO"]
          );
          $("#hidden_nomeFuncionario___" + index).val(
            result.content.values[0]["NOME"]
          );
          $("#hidden_matriculaFuncionario___" + index).val(
            result.content.values[0]["CHAPA"]
          );
          $("#cargoFuncionario___" + index).val(
            result.content.values[0]["NOME_FUNCAO"]
          );
          $("#hidden_CPF___" + index).val(retornoCPF);
          $("#hidden_DATA_CARTAO_REFEIC___" + index).val(
            result.content.values[0]["DATA_CARTAO_REFEIC"]
          );
          $("#vlrVoucherDesconto___" + index).val("");
          $("#vlrVoucherAcrescimo___" + index).val("");

          if (obj.LOCAL_ENTREGA != "") {
            $("#localEntrega___" + index).val(obj.LOCAL_ENTREGA);
          }

          if (obj.CAFE_MANHA.toUpperCase() == "X") {
            $("#checkboxCafe___" + index).prop("checked", true);
            $("#hidden_checkboxCafe___" + index).val("sim");
          }
          if (obj.ALMOCO.toUpperCase() == "X") {
            $("#checkboxAlmoco___" + index).prop("checked", true);
            $("#hidden_checkboxAlmoco___" + index).val("sim");
          }
          if (obj.ALMOCO_PEQUENO.toUpperCase() == "X") {
            $("#checkboxAlmocoPequeno___" + index).prop("checked", true);
            $("#hidden_checkboxAlmocoPequeno___" + index).val("sim");
          }
          if (obj.JANTAR.toUpperCase() == "X") {
            $("#checkboxJantar___" + index).prop("checked", true);
            $("#hidden_checkboxJantar___" + index).val("sim");
          }
          if (obj.JANTAR_PEQUENO.toUpperCase() == "X") {
            $("#checkboxJantarPequeno___" + index).prop("checked", true);
            $("#hidden_checkboxJantarPequeno___" + index).val("sim");
          }
          /*
				if(obj.AGUA.toUpperCase() == 'X'){
					$("#checkboxAgua___"+index).prop('checked', true);
					$("#hidden_checkboxAgua___"+index).val('sim');
				}
				*/
        } else {
          FLUIGC.message.alert(
            {
              message:
                " Funcion&aacute;rio: " +
                retornoCPF +
                " - " +
                NOMEFANTASIA +
                " em duplicidade. Apenas o primeiro registro foi considerado. ",
              title: "Aten\u00e7\u00e3o",
              label: "Ciente",
            },
            function (el, ev) {}
          );
        }
      } else {
        FLUIGC.message.alert(
          {
            message:
              " Funcion&aacute;rio: " +
              retornoCPF +
              " - " +
              NOMEFANTASIA +
              " foi demitido na Data: " +
              DATADEMISSAO +
              ", Como a solicitação do Voucher é para Data: " +
              datavoucher +
              " a alimentação deverá ser realizada como terceiro.",
            title: "Aten\u00e7\u00e3o",
            label: "Ciente",
          },
          function (el, ev) {}
        );
      }
    } else {
      FLUIGC.message.alert(
        {
          message:
            "CPF: " + CPF + " - Não foi localizada na base de dados do RM",
          title: "Aten\u00e7\u00e3o",
          label: "OK",
        },
        function (el, ev) {}
      );

      //limparDadosTbItens();
    }
    aplicarManscaraCampos();
    ativarChangeDescontosFunc();
    ativarChangeAcrescimosFunc();
    recalcularValoresFuncionario();

    validarEntregaCartao();
    $(".fileCSV").hide();

    var NOME = obj.NOME;
    var arrayCpfTerc = [];
    if (validacaoCPF(CPF)) {
      $("input[name^='hidden_CPF_TERC___']").each(function () {
        var index = this.id.split("___")[1];
        arrayCpfTerc.push($("#hidden_CPF_TERC___" + index).val());
      });

      if (validarExistenciaTerc(arrayCpfTerc, CPF)) {
        //BUSCAR VALORES DO OPTION DOSELECT
        var constraints = new Array();
        constraints.push(
          DatasetFactory.createConstraint(
            "FILTRO",
            CPF,
            CPF,
            ConstraintType.MUST
          )
        );
        var params = getDatasetParam(
          "ds_RM_QUERY_SELECT_ValidarCpfBaseRmFuncEmAdmissao",
          null,
          constraints,
          null
        );

        const result = await $.ajax({
          url: "/api/public/ecm/dataset/datasets",
          data: JSON.stringify(params),
          dataType: "json",
          type: "POST",
          contentType: "application/json",
          async: true,
        });

        if (
          result.content?.values?.length == 0 &&
          !arrayFuncionarios.includes(CPF)
        ) {
          //Se nao encontrar o CPF na base de funcionarios e o CPF nao estiver na lista de funcionarios
          arrayCpfTerc.push(CPF);

          let index = wdkAddChild("tablenameTerceiros");
          carregaNumeracaoTerceiro();

          $("#hidden_indexTerceiro___" + index).val(index);
          $("#cpfTerceiro___" + index).val(CPF);
          $("#hidden_CPF_TERC___" + index).val(CPF);
          $("#nomeEmpresaTerceiro___" + index).val(NOME);

          if (obj.LOCAL_ENTREGA != "") {
            $("#localEntregaTerc___" + index).val(obj.LOCAL_ENTREGA);
          }

          if (obj.CAFE_MANHA.toUpperCase() == "X") {
            $("#checkboxCafeTerc___" + index).prop("checked", true);
            $("#hidden_checkboxCafeTerc___" + index).val("sim");
          }
          if (obj.ALMOCO.toUpperCase() == "X") {
            $("#checkboxAlmocoTerc___" + index).prop("checked", true);
            $("#hidden_checkboxAlmocoTerc___" + index).val("sim");
          }
          if (obj.ALMOCO_PEQUENO.toUpperCase() == "X") {
            $("#checkboxAlmocoTercPeq___" + index).prop("checked", true);
            $("#hidden_checkboxAlmocoTercPeq___" + index).val("sim");
          }
          if (obj.JANTAR.toUpperCase() == "X") {
            $("#checkboxJantarTerc___" + index).prop("checked", true);
            $("#hidden_checkboxJantarTerc___" + index).val("sim");
          }
          if (obj.JANTAR_PEQUENO.toUpperCase() == "X") {
            $("#checkboxJantarTercPeq___" + index).prop("checked", true);
            $("#hidden_checkboxJantarTercPeq___" + index).val("sim");
          }
          $("#vlrVoucherDescontoTerc___" + index).val("");
          $("#vlrVoucherAcrescimoTerc___" + index).val("");
        }
      } else {
        FLUIGC.message.alert(
          {
            message:
              "CPF: " +
              CPF +
              " em duplicidade. Apenas o primeiro registro foi considerado.",
            title: "Aten\u00e7\u00e3o",
            label: "Ciente",
          },
          function (el, ev) {}
        );
      }

      aplicarManscaraCampos();
      ativarChangeDescontosTerc();
      ativarChangeAcrescimosTerc();
      recalcularValoresTerceiro();

      $(".fileCSVTerc").hide();
    } else {
      FLUIGC.message.alert(
        {
          message: "Favor corrigir O CPF Informado:: " + CPF + "",
          title: "Aten\u00e7\u00e3o",
          label: "OK",
        },
        function (el, ev) {}
      );
    }
  } catch (error) {
    console.log("Erro: " + error);
  }
}

function addZeroEsqueda(number, size){
    var s = String(number);
    while (s.length < size) {
        s = "0" + s;
    }
    return s;
}

function getDatasetParam (name, fields, constraints, order) {
	return {
		"name" : name,
		"fields" : fields,
		"constraints" : constraints,
		"order" : order
	};
}

