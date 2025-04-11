//Funcoes genericas referentes a zoom.

/**
 * Bloqueia ou desbloqueia um campo do tipo novo zoom.
 * @param $el: Objeto JQuery do campo.
 * @param enabled: true para desbloquear e false para bloquear.
 * @returns void.
 */
function enableZoom($el, enabled){
	if((typeof window['data-zoom_'+$el.attr('name')])  == "undefined"){
		setTimeout(function(){
			enableZoom($el, enabled);
		}, 500);
	}
	else window[$el.attr('name')].disable(!enabled);
}

//NOVO ZOOM

/**
 * Permite atribuir um valor a um campo do tipo zoom (novo).
 * Chamar no $(document).ready.
 * 
 * @returns void.
 */
function jQueryZoomPrototype(){
	$.fn.extend({
		zoomVal: function(value){
					if(value == '') return;
					var name = $(this.selector).attr('name');
					window[name].setValue(value);
		}
	});
}