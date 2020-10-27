const initialState = {
	data: {},
	loading: false,
	error: {}
};
const productAddReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PRODUCT_ADD_START':
			return {
				...state,
				loading: true
			};
		case 'PRODUCT_ADD_SUCCESS':
			return {
				...state,
				loading: false,
				data: action.data
			};

		case 'PRODUCT_ADD_ERROR':
			return {
				error: action.err
			};
		default:
			return state;
	}
};
export default productAddReducer;
