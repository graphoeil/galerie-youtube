// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import Vignette from './Vignette';

// Classe
class Galerie extends React.Component{

	// Render
	render(){
		return(
			<div className="galerie">
				{
					this.props.videoStore.videosDOM.map((video, index) => {
						return <Vignette key={ video.id.videoId } video={ video }/>
					})
				}
			</div>
		)
	};

	// Chargement initial
	componentDidMount(){
		this.props.videoStore.getVideoList();
	};

};

// Export
export default inject('videoStore')(observer(Galerie));