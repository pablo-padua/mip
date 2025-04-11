function servicetask373() {

	try{
		integrarPessoa();
		incluiXmlBancarioFCFO();
	}catch(e){
		throw "Erro (integrarPessoa): " + e;
	}
	//throw "IDENTIFICADOR DE ERRO";
}