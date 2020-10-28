const initialState = {
	data: {},
	loading: false,
	error: {}
};
const productDeleteReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PRODUCT_DELETE_START':
			return {
				...state,
				loading: true
			};
		case 'PRODUCT_DELETE_SUCCESS':
			return {
				...state,
				loading: false,
				data: action.data
			};

		case 'PRODUCT_DELETE_ERROR':
			return {
				error: action.err
			};
		default:
			return state;
	}
};
export default productDeleteReducer;
