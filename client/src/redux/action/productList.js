import axios from '../../api/axiosCreate';
import qs from 'qs';
import { getCookie } from '../../utils/cookie';
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
export const productList = (limit, last_id, search) => {
	const token = getCookie('token');
	const getLimit = limit ? parseInt(limit) : 10;
	// const getLastId = last_id ? last_id : 0;

	// For the Pagination
	const getLastId = last_id && parseInt(last_id) !== 0 ? parseInt(last_id - 1) * 10 : 0;

	const data = qs.stringify({
		ops_type: 'select',
		limit: getLimit,
		pagination: getLastId,
		search: search,
		jwt: token
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
