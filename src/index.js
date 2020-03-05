import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import 'react-app-polyfill/ie9'; 
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
    serviceWorker.unregister();

