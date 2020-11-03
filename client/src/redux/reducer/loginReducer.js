const initialState = {
	data: {},
	loading: false,
	error: {}
};
const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_START':
			return {
				...state,
				loading: true
			};
		case 'LOGIN_SUCCESS':
			return {
				...state,
				loading: false,
				data: action.data
			};

		case 'LOGIN_ERROR':
			return {
				error: action.err
			};
		default:
			return state;
	}
};
export default loginReducer;
