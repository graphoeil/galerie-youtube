// Imports
import React from 'react';
import { inject } from 'mobx-react';
import he from 'he';

// Classe
class Vignette extends React.Component{

	// Constructeur
	constructor(props){
		super(props);
		this.state = { isVisible:false };
	};

	// Render
	render(){
		// Variables
		const { video } = this.props;
		const titreVideo = he.decode(video.snippet.title);
		// Return
		return(
			<a className={ `vignetteVideo ${this.state.isVisible ? 'visible' : ''}` } href={ `https://www.youtube.com/watch?v=${video.id.videoId}` } onClick={ this.handleClick.bind(this) }>
				<img src={ video.snippet.thumbnails.high.url } alt={ video.snippet.channelTitle } onLoad={ this.handleLoad.bind(this) }/>
				<div className="videoTexte">
					<h3>{ `${titreVideo.charAt(0).toUpperCase()}${titreVideo.slice(1).toLowerCase()}` }</h3>
				</div>
			</a>
		)
	};

	// Click sur la vignette, affichage du player
	handleClick(e){
		e.preventDefault();
		this.props.videoStore.setVideoEnCoursID(this.props.video.id.videoId);
	};

	// Image chargée, vignette suivante
	handleLoad(){
		this.setState({ isVisible:true }, function(){
			this.props.videoStore.afficheVideoSuivante();
		});
	};

};

// Export
export default inject('videoStore')(Vignette);