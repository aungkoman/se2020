const initialState = {
	data: {},
	loading: false,
	error: {}
};
const productEditReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PRODUCT_EDIT_START':
			return {
				...state,
				loading: true
			};
		case 'PRODUCT_EDIT_SUCCESS':
			return {
				...state,
				loading: false,
				data: action.data
			};

		case 'PRODUCT_EDIT_ERROR':
			return {
				error: action.err
			};
		default:
			return state;
	}
};
export default productEditReducer;
