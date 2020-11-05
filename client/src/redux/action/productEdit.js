import axios from '../../api/axiosCreate';
import qs from 'qs';
import { getCookie } from '../../utils/cookie';
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
export const productEdit = ({ id, name, description, image, size, color, price, stock, warehouse, category }) => {
	const token = getCookie('token');
	const data = qs.stringify({
		ops_type: 'update',
		jwt: token,
		id: id,
		name: name,
		description: description,
		image: image,
		size: size,
		color: color,
		price: price,
		stock: stock,
		warehouse: warehouse,
		category: category
	});
	console.log(data);
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
