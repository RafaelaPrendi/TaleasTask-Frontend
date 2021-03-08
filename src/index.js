import React, { useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import axios from 'axios'
Amplify.configure(awsconfig);

// add authorization token to each call
axios.interceptors.request.use(
  async function (config) {
    const token =(await Auth.currentSession()).getIdToken().getJwtToken();
    axios.defaults.headers.common['Authorization'] =  token;
    return config;
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
