require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
import App from './app/App.js';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setUpStore } from './app/store'
const preloadedState = {}
const store = setUpStore(preloadedState);
const root = createRoot(document.getElementById("root"));

root.render(<React.StrictMode><Provider store={store}><App /></Provider></React.StrictMode>);