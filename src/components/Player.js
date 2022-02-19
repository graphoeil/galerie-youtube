// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import $ from 'jquery';

// Variables
const YOUTUBE_URL = 'https://www.youtube-nocookie.com/embed/'

// Classe
class Player extends React.Component{

	// Constructeur
	constructor(props){
		super(props);
		this.playerRef = React.createRef();
	};

	// Render
	render(){
		return(
			<div className="player" ref={ this.playerRef }>
				<iframe src={`${YOUTUBE_URL}${this.props.videoStore.videoEnCoursID}?autoplay=0`} 
					frameBorder="0" title="Video" allow="autoplay; encrypted-media" allowFullScreen></iframe>
				<div className="playerClose" onClick={ this.closePlayer.bind(this) }>
					<i className="far fa-times"></i>
				</div>
			</div>
		)
	};

	// Fermeture de player
	closePlayer(){
		let $player = $(this.playerRef.current);
		$player.fadeOut('slow', function(){
			$player.children('iframe').attr('src','');
			this.props.videoStore.hideShowPlayer();
		}.bind(this));
	};

	// Le player est monté
	componentDidMount(){
		let $player = $(this.playerRef.current);
		$player.fadeIn(1000);
	};

};

// Export
export default inject('videoStore')(observer(Player));