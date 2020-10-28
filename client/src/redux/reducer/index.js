import { combineReducers } from 'redux';
import productAddReducer from './productAddReducer';
import productListingReducer from './productListingReducer';
import productEditReducer from './productEditReducer';
import productDeleteReducer from './productDeleteReducer';
// Initalize rootReducer to combile All the reducer
const rootReducer = combineReducers({
	productAddReducer,
	productListingReducer,
	productEditReducer,
	productDeleteReducer
});

export default rootReducer;
