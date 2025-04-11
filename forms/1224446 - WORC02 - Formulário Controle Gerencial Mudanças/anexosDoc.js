function loadUploadDoc(obj) {
		
	var numeroCgm = $("#numeroCgm").val();
	var numeroObra = $("#numeroObra").val();
	var nomeObra = $("#DESCRICAO").val();
	

if(numeroCgm == "" || numeroObra == "" || nomeObra == ""){
	FLUIGC.message
	.alert(
			{
				message : "Obrigatório informar dados da Obra",
				title : "Aten\u00e7\u00e3o",
				label : 'Ciente'
			}, function(el, ev) {
			});
	}else{
 
	var indexPaiFilho = obj.name.substring(obj.name.lastIndexOf("_") + 1, obj.name.length);
	$("input[name^='vl_filesDoc___']").fileupload({

		dataType : 'json',
		done : function(e, data) {
			$.each(
				data.result.files,
				function(index, file) {

					console.log('>>>> file');
					console.log(file);

					if ($("#numDocGed___"+ indexPaiFilho).val() != "") {
						FLUIGC.toast({
							title : '',
							message : "Já possui arquivo anexado para este lançamento.",
							type : 'danger'
						});
					} else {
						$.ajax({
							async : false,
							type : "POST",
							contentType : "application/json",
							url : '/api/public/ecm/document/createDocument',
							data : JSON
							.stringify({
								"description" : file.name,
								"parentId" : pegarNumDoc(),//'1127354',
								"InheritSecurity": true,
								"attachments" : [ {
									"fileName" : file.name
								} ],
							}),
							error : function() {
								FLUIGC.toast({
									title : '',
									message : "Falha ao enviar",
									type : 'danger'
								});
							},
							success : function(data) {
								idDoDocumento = data.content.id;
								if (idDoDocumento != "") {
									FLUIGC.toast({
										title : '',
										message : "Carregado com Sucesso",
										type : 'success'
									});
									$("#numDocGed___"+ indexPaiFilho).val(idDoDocumento);
									$("#controleAddDocAtiv").val(idDoDocumento);
									var type = file.name.split(".");

									$("#nm_arquivoDoc___"+ indexPaiFilho).val(file.name);
									$("#vl_tparquivoDoc___"+ indexPaiFilho).val(type[type.length - 1]);
									$("#vl_tamanhoDoc___"+ indexPaiFilho).val(file.size);

									criarLinkDoc(indexPaiFilho,	idDoDocumento);
								}
							},
						});
					}
				}
			);
		}
	});
	}
}

function getDownloadURL(id) {
	$.ajax({
		async : false,
		type : "GET",
		contentType : "application/json",
		url : '/api/public/ecm/document/downloadURL/' + id,
		error : function(e) {
			console.error(e);
		},
		success : function(data) {
			// appendAttachment(data.content);
		},
	});
}

function deleteDoGedDoc(obj) {
	var elemento = $(obj).parent("td").siblings().children("input")[0]
	if(elemento === undefined){
	var indexPaiFilho = obj.id.substring(obj.id.lastIndexOf("_") + 1,
			obj.id.length);
	}else{
	var indexPaiFilho = elemento.id.substring(elemento.id.lastIndexOf("_") + 1,
			elemento.id.length);	
	}
	
	var idDoc = $("#numDocGed___" + indexPaiFilho).val();
	$.ajax({
		async : false,
		type : "POST",
		contentType : "application/json",
		url : '/api/public/ecm/document/remove',
		data : JSON.stringify({
			"id" : idDoc,
		}),
		error : function(e) {
			var attachments = parent.WKFViewAttachment.attachmentsDocs;
			var aindaEstaAnexo = false;
			if (aindaEstaAnexo == false) {
				$("#numDocGed___" + indexPaiFilho).val("");
			}

		},
		success : function(data) {
			console.info("Documento " + idDoc + " removido com sucesso");
			FLUIGC.toast({
				title : '',
				message : "Documento " + idDoc + " removido com sucesso",
				type : 'success'
			});
			$("#controleAddDocAtiv").val('');
			$("#numDocGed___" + indexPaiFilho).val("");
			$("#nm_arquivoDoc___"+ indexPaiFilho).val("");
			$("#vl_tparquivoDoc___"+ indexPaiFilho).val("");
			$("#vl_tamanhoDoc___"+ indexPaiFilho).val("");
			$("#visualizarFileDoc___" + indexPaiFilho).hide();
		},
	});
}

function criarLinkDoc(indexPaiFilho, idDoDocumento) {	
	$("#visualizarFileDoc___" + indexPaiFilho).show();
	$("#deleteFileDoc___" + indexPaiFilho).show();
	var link = parent.WCMAPI.serverURL;

	var linkComplemento = "/portal/p/1/ecmnavigation?app_ecm_navigation_doc="
			+ idDoDocumento;
	var linkCompleto = link + linkComplemento;
	$("#hidden_LinkDoc___" + indexPaiFilho).val(linkCompleto);
}

function clickVisualizarFileDoc(obj){
	var elemento = $(obj).parent("td").siblings().children("input")[0]
	var indexPaiFilho = elemento.id.substring(elemento.id.lastIndexOf("_") + 1,
			elemento.id.length);
	window.open($("#hidden_LinkDoc___" + indexPaiFilho).val());
}

function pegarNumDoc(){
	
	//var pastaPaiGED = '1127354'; // AMBIENTE DE TESTE 
	var pastaPaiGED = '1224339'; // AMBIENTE DE PRODUÇÃO
	var numeroCgm = $("#numeroCgm").val();
	var numeroObra = $("#numeroObra").val();
	var nomeObra = $("#DESCRICAO").val();
	
	// PASTA PAI ONDE SERÁ CRIADO AS PASTAS QUE RECEBERÃO OS RECIBOS
	var pastaDoc = 0;
	
	//Cria pasta para anexo
	var c1 = DatasetFactory.createConstraint("pastaPaiGED", pastaPaiGED, pastaPaiGED, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("numeroCgm", numeroCgm, numeroCgm, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("numeroObra", numeroObra, numeroObra, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("nomeObra", nomeObra, nomeObra, ConstraintType.MUST);
	
	
	var constraints = new Array(c1,c2,c3,c4);
	var dataset = DatasetFactory.getDataset("dsConsultaeCriaPastaGedWORC02", null, constraints, null);
	for(var i=0; i < dataset.values.length; i++) {
		pastaDoc = dataset.values[i].PASTA;	
		} 
	return pastaDoc;
}