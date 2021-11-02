/**
 * Appear
 */

(function() {

	"use strict";

	var targets = $('[data-appear="true"]');
	var brand = $('.navbar-brand a');
	var history = [];

	function appeared( el ) {
		var st = $( window ).scrollTop();
		var ot = el.offset().top;
		var h = el.height();

		if( st >= ot && st <= (ot + h) ) {
			return true;
		}
		return false;
	}

	function appear( el ) {
		var target = el.data( 'appear-target' );
		var state = el.data( 'appear-target-class' );
		var label = el.data( 'appear-label' );
		var href = el.data( 'appear-href' );

		if( target && state ) {
			$( target ).addClass( state );
		}

		if( label && href ) {
			brand
				.attr( 'href', href )
				.text( label );
		}
	}

	function disappear( el ) {
		var target = el.data( 'appear-target' );
		var state = el.data( 'appear-target-class' );

		if( target && state ) {
			$( target ).removeClass( state );
		}
	}

	function handleOnScrol() {
		targets.each(function( i, el ){
			var _el = $( el );

			if( !history[i] && appeared( _el ) ) {
				appear( _el );
				history[i] = _el;
			}

			if( history[i] && !appeared( history[i] ) ) {
				disappear( _el );
				delete history[i];
			}
		});
	}

	$( window ).on( 'scroll', handleOnScrol );

})();

