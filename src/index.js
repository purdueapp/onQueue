import React from 'react';
import { AppContainer } from 'react-hot-loader'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import './product-sans.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { ConnectedRouter } from 'connected-react-router';
//const render = () => {

ReactDOM.render(
  <AppContainer>
    <Provider store={configureStore()}>
      <ConnectedRouter history={history} basename={process.env.PUBLIC_URL}>
        <App />
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
