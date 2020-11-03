import axios from '../../api/axiosCreate';
import qs from 'qs';
import { getCookie } from '../../utils/cookie';
export const productDeleteStart = () => {
	return {
		type: 'PRODUCT_DELETE_START'
	};
};
export const productDeleteSuccess = (result) => {
	return {
		type: 'PRODUCT_DELETE_SUCCESS',
		data: result
	};
};
export const productDeleteError = (err) => {
	return {
		type: 'PRODUCT_DELETE_ERROR',
		err
	};
};

// To Delete Product
export const productDelete = ({ id }) => {
	const token = getCookie('token');
	const data = qs.stringify({
		ops_type: 'delete',
		id: id,
		jwt: token
	});
	// Return promise with success and failure actions
	return async (dispatch) => {
		dispatch(productDeleteStart());
		try {
			const res = await axios.post('/api/v1/product/', data);
			console.log(res);
			if (res && res.data) {
				dispatch(productDeleteSuccess(res.data));
			} else {
				dispatch(productDeleteError(res));
			}
		} catch (error) {
			if (error.response) {
				dispatch(productDeleteError(error.response));
			} else {
				dispatch(productDeleteError(error));
			}
		}
	};
};

export const productDeleteMultiple = ({ multiIds }) => {
	console.log(multiIds);
	const token = getCookie('token');
	var ids = JSON.stringify(multiIds);
	console.log(ids);
	let data = new FormData();
	// const data = qs.stringify({
	// 	ops_type: 'delete_multiple',
	// 	ids: [ids],
	// 	jwt: token
	// });
	data.append('ops_type', 'delete_multiple');
	data.append('ids', ids);
	data.append('jwt', token);
	console.log(data);
	// Return promise with success and failure actions
	return async (dispatch) => {
		dispatch(productDeleteStart());
		try {
			const res = await axios.post('/api/v1/product/', data);
			if (res && res.data) {
				dispatch(productDeleteSuccess(res.data));
			} else {
				dispatch(productDeleteError(res));
			}
		} catch (error) {
			if (error.response) {
				dispatch(productDeleteError(error.response));
			} else {
				dispatch(productDeleteError(error));
			}
		}
	};
};
