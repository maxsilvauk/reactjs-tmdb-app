import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import movieApp from './reducers';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {MovieContainer, MovieDetail} from './containers';
import {DisplayMsg} from './components';

import './assets/css/global.css';
import './assets/css/fade.css';

const routeMiddleware = routerMiddleware(browserHistory);
let store = createStore(movieApp, composeWithDevTools(applyMiddleware(thunkMiddleware, routeMiddleware)));

ReactDOM.render(<Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MovieContainer}/>
      <Route path="/movie/:id" component={MovieDetail}/>
      <Route path="/search/:keyword" component={MovieContainer}/>
      <Route path="*" component={DisplayMsg}/>
    </Route>
  </Router>
</Provider>, document.getElementById('root'));
