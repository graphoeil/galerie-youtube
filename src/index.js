// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import $ from 'jquery';

// Store MobX
import VideoStore from './stores/VideoStore';
import { Provider } from 'mobx-react';
const videoStore = new VideoStore();
const stores = { videoStore };

// ReactDOM
ReactDOM.render(<Provider { ...stores } ><App/></Provider>, $('#root')[0]);