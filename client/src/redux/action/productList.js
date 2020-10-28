import axios from '../../api/axiosCreate';
import qs from 'qs';
export const productListingStart = () => {
	return {
		type: 'PRODUCT_LISTING_START'
	};
};
export const productListingSuccess = (result) => {
	return {
		type: 'PRODUCT_LISTING_SUCCESS',
		data: result
	};
};
export const productListingError = (err) => {
	return {
		type: 'PRODUCT_LISTING_ERROR',
		err
	};
};

// For Product Listing
export const productList = () => {
	const data = qs.stringify({
		ops_type: 'select'
	});
	// Return promise with success and failure actions
	return async (dispatch) => {
		dispatch(productListingStart());
		try {
			const res = await axios.post('/api/v1/product/', data);
			if (res && res.data) {
				dispatch(productListingSuccess(res.data));
			} else {
				dispatch(productListingError(res));
			}
		} catch (error) {
			if (error.response) {
				dispatch(productListingError(error.response));
			} else {
				dispatch(productListingError(error));
			}
		}
	};
};
