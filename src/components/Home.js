// Imports
import React from 'react';
import { inject } from 'mobx-react';

// Classe
class Home extends React.Component{

	// Render
	render(){
		return(
			<React.Fragment>

				{/* Bouton Home */}
				<div className="home" onClick={ this.goHome.bind(this) }>
					<div className="innerHome">
						<i className="far fa-home"></i>
					</div>
				</div>
				{/* Bouton Home */}

			</React.Fragment>
		)
	};

	// Home, affiche les videos par défaut
	goHome(){
		this.props.videoStore.setRequestRecherche('');
	};

};

// Export
export default inject('videoStore')(Home);