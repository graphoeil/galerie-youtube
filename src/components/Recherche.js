// Imports
import React from 'react';
import { inject } from 'mobx-react';
import $ from 'jquery';

// Classe
class Recherche extends React.Component{

	// Constructor
	constructor(props){
		super(props);
		this.state = { recherche:'', rechercheOuverte:false };
		this.rechercheRef = React.createRef();
	};

	// Render
	render(){
		return(
			<React.Fragment>

				{/* Bouton loupe */}
				<div className={ this.state.rechercheOuverte ? 'boutonLoupe ouvert' : 'boutonLoupe' } onClick={ this.afficheRecherche.bind(this) }>
					<div className="innerLoupe">
						{
							this.state.rechercheOuverte ? <i className="far fa-search-minus"></i> : <i className="far fa-search"></i>
						}
					</div>
				</div>
				{/* Bouton loupe */}

				{/* Champ recherche */}
				<div ref={ this.rechercheRef } className="innerRecherche">
					<div className="champRecherche">
						<span onClick={ this.resetRecherche.bind(this) }><i className="far fa-times"></i></span>
						<input type="text" placeholder="Votre recherche ?" value={ this.state.recherche }
							onChange={ this.handleChange.bind(this) } onKeyUp={ this.handleKeyUp.bind(this) }/>
						<button onClick={ this.envoiRecherche.bind(this) }><i className="far fa-search"></i></button>
					</div>
				</div>
				{/* Champ recherche */}

			</React.Fragment>
		)
	};

	// Affiche la recherche
	afficheRecherche(){
		var $champRecherche = $(this.rechercheRef.current);
		var $input = $champRecherche.find('input');
		if (this.state.rechercheOuverte){
			this.setState({ rechercheOuverte:false });
			$champRecherche.fadeOut('fast');
		} else {
			this.setState({ rechercheOuverte:true });
			$champRecherche.fadeIn(function(){
				$input[0].focus();
			});
		}
	};
	
	// Reset du champ recherche
	resetRecherche(){
		this.setState({ recherche:'' });
	};

	// MAJ du texte de la recherche
	handleChange(e){
		this.setState({ recherche:e.target.value });
	};

	// Validation de la recherche au clavier
	handleKeyUp(e){
		if (e.keyCode === 13){
			this.envoiRecherche();
		}
	};

	// Envoi de la recherche vers le store
	envoiRecherche(){
		var $champRecherche = $(this.rechercheRef.current);
		if (this.state.recherche !== ''){
			this.setState({ rechercheOuverte:false });
			$champRecherche.fadeOut('fast', function(){
				this.props.videoStore.setRequestRecherche(this.state.recherche);
				this.setState({ recherche:'' });
			}.bind(this));
		};
	};

};

// Export
export default inject('videoStore')(Recherche);