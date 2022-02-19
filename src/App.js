// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import './css/displayMain.css';
import Home from './components/Home';
import Recherche from './components/Recherche';
import Galerie from './components/Galerie';
import Quota from './components/Quota';
import Player from './components/Player';

// Classe
class App extends React.Component{

	// Render
	render(){
		return(
			<React.Fragment>

				{/* Home */}
				{
					this.props.videoStore.initRecherche && <Home/>
				}
				{/* Home */}

				{/* Recherche */}
				<Recherche/>
				{/* Recherche */}

				{/* Galerie */}
				{
					this.props.videoStore.quotaJournalierAtteint ? <Quota/> : <Galerie/>
				}
				{/* Galerie */}

				{/* Player */}
				{
					this.props.videoStore.playerVisible && <Player/>
				}
				{/* Player */}

			</React.Fragment>
		)
	};

};

// Export
export default inject('videoStore')(observer(App));