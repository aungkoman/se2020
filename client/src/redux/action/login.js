import axios from '../../api/axiosCreate';
import { setCookie } from '../../utils/cookie';
import qs from 'qs';
export const loginStart = () => {
	return {
		type: 'LOGIN_START'
	};
};
export const loginSuccess = (result) => {
	return {
		type: 'LOGIN_SUCCESS',
		data: result
	};
};
export const loginError = (err) => {
	return {
		type: 'LOGIN_ERROR',
		err
	};
};

export const login = () => {
	const data = qs.stringify({
		ops_type: 'login',
		name: 'admin',
		password: 'admin'
	});
	// Return promise with success and failure actions
	return async (dispatch) => {
		dispatch(loginStart());
		try {
			const res = await axios.post('/api/v1/product/', data);
			if (res && res.data) {
				await setCookie('token', res.data && res.data.data && res.data.data.jwt);
				await dispatch(loginSuccess(res.data));
			} else {
				dispatch(loginError(res));
			}
		} catch (error) {
			if (error.response) {
				dispatch(loginError(error.response));
			} else {
				dispatch(loginError(error));
			}
		}
	};
};
