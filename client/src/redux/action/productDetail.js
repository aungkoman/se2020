import axios from '../../api/axiosCreate';
import qs from 'qs';
import { getCookie } from '../../utils/cookie';
export const productDetailStart = () => {
	return {
		type: 'PRODUCT_DETAIL_START'
	};
};
export const productDetailSuccess = (result) => {
	return {
		type: 'PRODUCT_DETAIL_SUCCESS',
		data: result
	};
};
export const productDetailError = (err) => {
	return {
		type: 'PRODUCT_DETAIL_ERROR',
		err
	};
};

// For Product DETAIL
export const productDetail = ({ id }) => {
	const token = getCookie('token');
	const data = qs.stringify({
		ops_type: 'detail',
		id: id,
		jwt: token
	});
	console.log(data);
	// Return promise with success and failure actions
	return async (dispatch) => {
		dispatch(productDetailStart());
		try {
			const res = await axios.post('/api/v1/product/', data);
			console.log(res);
			if (res && res.data) {
				dispatch(productDetailSuccess(res.data));
			} else {
				dispatch(productDetailError(res));
			}
		} catch (error) {
			if (error.response) {
				dispatch(productDetailError(error.response));
			} else {
				dispatch(productDetailError(error));
			}
		}
	};
};
