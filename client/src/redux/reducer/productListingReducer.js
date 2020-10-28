const initialState = {
	product: {},
	loading: false,
	error: {}
};
const productListingReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PRODUCT_LISTING_START':
			return {
				...state,
				loading: true
			};
		case 'PRODUCT_LISTING_SUCCESS':
			return {
				...state,
				loading: false,
				product: action.data
			};

		case 'PRODUCT_LISTING_ERROR':
			return {
				error: action.err
			};
		default:
			return state;
	}
};
export default productListingReducer;
