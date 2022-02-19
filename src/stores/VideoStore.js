// Imports
import { observable, makeObservable, action, runInAction } from 'mobx';
import $ from 'jquery';

// Variables
// YouTube
const URL_FLUX = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

// Classe
class VideoStore{

	// Constructeur
	constructor(){
		// Variables et actions observables
		makeObservable(this, {
			// Recherche
			initRecherche:observable,
			// Galerie
			videos:observable,
			videosDOM:observable,
			quotaJournalierAtteint:observable,
			// Player
			videoEnCoursID:observable,
			playerVisible:observable
		});
	};

	// Variables
	//
	// Recherche
	initRecherche = false;
	recherche = 'init';
	recherchePrecedente = '';
	apiRecherche = {};
	// Galerie
	requestData = {
		'format':'jsonp',
		'maxResults':'50',
		'part':'snippet',
		'type':'video',
		'q':'',
		'key':API_KEY
	};
	videos = [];
	videosDOM = [];
	videoEnCours = 0;
	nombreDeVideos = 0;
	quotaJournalierAtteint = false;
	// Player Video
	videoEnCoursID = 'eogpIG53Cis';
	playerVisible = false;

	// Méthodes
	//
	// Recherche
	setRequestRecherche = action((texte) => {
		this.initRecherche = true;
		this.recherche = texte;
		this.requestData = {
			'format':'jsonp',
			'maxResults':'50',
			'part':'snippet',
			'type':'video',
			'q':texte,
			'key':API_KEY
		};
		this.getVideoList();
	});
	// Galerie
	getVideoList = action(() => {
		if (this.recherche !== this.recherchePrecedente){
			this.recherchePrecedente = this.recherche;
			if (!this.apiRecherche[this.recherche]){
				this.apiRecherche[this.recherche] = $.getJSON(URL_FLUX,this.requestData);
			}
			this.apiRecherche[this.recherche].done((data) => {
				runInAction(() => {
					this.videos = data.items;
					this.videosDOM = data.items.slice(0,1);
					this.videoEnCours = 0;
					this.nombreDeVideos = data.items.length;
				});
			}).fail((error) => {
				runInAction(() => {
					this.quotaJournalierAtteint = true;
				});
			});
		}
	});
	afficheVideoSuivante = action(() => {
		if (this.videoEnCours < this.nombreDeVideos - 1){
			this.videoEnCours++;
			this.videosDOM.push(this.videos[this.videoEnCours]);
		}
	});
	// Player
	hideShowPlayer = action(() => {
		this.playerVisible = !this.playerVisible;
	});
	setVideoEnCoursID = action((id) => {
		this.videoEnCoursID = id;
		this.hideShowPlayer();
	});

};

// Export
export default VideoStore;