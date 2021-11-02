/**
 * Video
 */

(function() {

	"use strict";

	var container = $( '.video' );
	var video = container.find( 'video' );
	var btn = container.find( '.video_play' );

	var _video = {
		// Return video play state.
		getState: function() {
			return !video.get(0).paused;
		},
		// Set video play state.
		setState: function( state ) {
			if( state ) {
				container.addClass( '__playing' );
				video.get( 0 ).play();
			} else {
				container.removeClass( '__playing' );
				video.get( 0 ).pause();
			}
		}
	}

	function handleBtnClick() {
		if( !_video.getState() ) {
			_video.setState( true );
		}
	}

	function handleVideoClick() {
		if( _video.getState() ) {
			_video.setState( false );
		}
	}

	function handleVideoEnd() {
		_video.setState( false );
	}

	video.on( 'click', handleVideoClick )
		 .on( 'ended', handleVideoEnd );
	btn.on( 'click', handleBtnClick );

})();

