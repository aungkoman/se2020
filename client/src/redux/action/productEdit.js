import axios from '../../api/axiosCreate';
import qs from 'qs';
export const productEditStart = () => {
	return {
		type: 'PRODUCT_EDIT_START'
	};
};
export const productEditSuccess = (result) => {
	return {
		type: 'PRODUCT_EDIT_SUCCESS',
		data: result
	};
};
export const productEditError = (err) => {
	return {
		type: 'PRODUCT_EDIT_ERROR',
		err
	};
};

// For Editing the Product
export const productAdd = ({ name, id }) => {
	const data = qs.stringify({
		ops_type: 'update',
		id: id,
		name: name
	});
	// Return promise with success and failure actions
	return async (dispatch) => {
		dispatch(productEditStart());
		try {
			const res = await axios.post('/api/v1/product/', data);
			if (res && res.data) {
				dispatch(productEditSuccess(res.data));
			} else {
				dispatch(productEditError(res));
			}
		} catch (error) {
			if (error.response) {
				dispatch(productEditError(error.response));
			} else {
				dispatch(productEditError(error));
			}
		}
	};
};
