import axios from '../../api/axiosCreate';
import qs from 'qs';
export const productAddStart = () => {
	return {
		type: 'PRODUCT_ADD_START'
	};
};
export const productAddSuccess = (result) => {
	return {
		type: 'PRODUCT_ADD_SUCCESS',
		data: result
	};
};
export const productAddError = (err) => {
	return {
		type: 'PRODUCT_ADD_ERROR',
		err
	};
};

export const productAdd = ({ name }) => {
	const data = qs.stringify({
		ops_type: 'insert',
		name: name
	});
	// Return promise with success and failure actions
	return async (dispatch) => {
		dispatch(productAddStart());
		try {
			const res = await axios.post('/api/v1/product/', data);
			console.log(res);
			if (res && res.data) {
				dispatch(productAddSuccess(res.data));
			} else {
				dispatch(productAddError(res));
			}
		} catch (error) {
			if (error.response) {
				dispatch(productAddError(error.response));
			} else {
				dispatch(productAddError(error));
			}
		}
	};
};
