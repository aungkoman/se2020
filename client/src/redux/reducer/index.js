import { combineReducers } from 'redux';
import productAddReducer from './productAddReducer';
import productListingReducer from './productListingReducer';
import productEditReducer from './productEditReducer';
import productDeleteReducer from './productDeleteReducer';
import productDetailReducer from './productDetailReducer';
import loginReducer from './loginReducer';
// Initalize rootReducer to combile All the reducer
const rootReducer = combineReducers({
	productAddReducer,
	productListingReducer,
	productEditReducer,
	productDeleteReducer,
	productDetailReducer,
	loginReducer
});

export default rootReducer;
