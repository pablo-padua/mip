/**
 * Objeto com funcionalidade de gerenciar o conteudo do identificador
 * 
 * @param strungCriticidade
 *            Informar a string da Criticidade;
 * @param stringUnidade
 *            Informar a string da Unidade;
 * @param stringDataInicial
 *            Informar a string da DataInicial;
 * @param outrosId
 *            Informar os demais parametros e gravar em um obj do tipo array;
 * 
 */
var objIdentificador = function(strCriticidade, strUnidade){ 

	var nomeCampo = 'campoIdentificador';
	var separador = ' - ';
	var tipoCriticidade = '';
	var nomeUnidade = '';
	var dataInicial = '';
	var listParametros = '';

	/**
	 * Retonar o tipoCriticidade
	 * 
	 * @returns tipoCriticidade Retonar o tipo de Criticidade
	 */
	this.getTipoCriticidade = function() {
		return tipoCriticidade;
	};
	/**
	 * Retornar o nomeUnidade
	 * 
	 * @returns nomeUnidade Retonar a Unidade
	 */
	this.getNomeUnidade = function() {
		return nomeUnidade;
	};
	/**
	 * Retornar a dataInicial
	 * 
	 * @returns dataInicial Retornar a Data Inicial
	 */
	this.getDataInicial = function() {
		return dataInicial;
	};

	var setParametro = function(nomeParametro) {
		if (nomeParametro != "") {
			listParametros += (listParametros != "") ? separador : '';
			listParametros += nomeParametro;
		}
	};

	var getStrIdentificador = function() {
		return listParametros;
	};

	var setIdentificador = function() {
		hAPI.setCardValue(nomeCampo, listParametros);
	};
	__construct = function(strCriticidade, strUnidade) {
		setParametro(strCriticidade);
		setParametro(strUnidade);

		setIdentificador();

		getStrIdentificador();

	}(strCriticidade, strUnidade);
};