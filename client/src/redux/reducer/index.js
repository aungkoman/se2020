import { combineReducers } from 'redux';
import productAddReducer from './productAddReducer'


// Initalize rootReducer to combile All the reducer 
const rootReducer = combineReducers({
  productAddReducer
});

export default rootReducer;