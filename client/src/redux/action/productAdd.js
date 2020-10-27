import axios from '../../api/axiosCreate';
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
	const ops_type = 'insert';
	console.log(name);
	// Return promise with success and failure actions
	return async (dispatch) => {
		dispatch(productAddStart());
		try {
			const res = await axios.post('/api/v1/product/', { ops_type, name });
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
