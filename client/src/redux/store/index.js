import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';

const middleware = [];

if (process.env.NODE_ENV !== 'production') {
  // Add logger to log redux in dev version
	const { createLogger } = require('redux-logger');
	const logger = createLogger({
		collapsed: true,
		duration: true
	});
	middleware.push(logger);
}

const configureStore = (initialState) => {
    //initialize Store and applyMiddleware
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk, ...middleware));
	return store;
};


export default configureStore;
