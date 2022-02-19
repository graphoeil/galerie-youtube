// Imports
import React from 'react';

// Classe
class Quota extends React.Component{

	// Render
	render(){
		return(
			<div className="quota">
				<div className="innerQuota">
					<h3>Quota journalier atteint !</h3>
					<p>Désolé mais cette application a atteint le quota journalier de 100 recherches différentes fixé par YouTube, revenez dans 24h pour pouvoir l'utiliser de nouveau.</p>
					<a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i> YouTube</a>
				</div>
			</div>
		)
	};

};

// Export
export default Quota;