import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axiosCreate from '../api/axiosCreate';
import { productEdit } from '../redux/action/productEdit';
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(axiosCreate);
const store = mockStore();
const postsList = [
	{
		name: 'Bogolanfini (Mud Cloths)',
		description: 'West Africa traditional design',
		image: 'R2tBcTZxNUxZdzZGd25NV1BZbkVPQT09.png',
		size: '1',
		color: '1',
		price: '35000',
		stock: '10',
		warehouse: '1',
		category: '2'
	}
];
describe('Product Add Actions', () => {
	beforeEach(() => {
		store.clearActions();
	});

	it('dispatches PRODUCT_ADD_SUCCESS after a successfull API requets', () => {
		mock.onPost('/api/v1/product/').reply(201, {
			response: {
				name: 'Bogolanfini (Mud Cloths)'
			}
		});
		// eslint-disable-next-line jest/valid-expect-in-promise
		store.dispatch(productEdit()).then(() => {
			let expectedActions = [
				{ type: 'PRODUCT_EDIT_START' },
				{ type: 'PRODUCT_EDIT_SUCCESS', product: postsList }
			];
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('dispatches POST_TODO_FAILURE after a FAILED API requets', () => {
		mock.onPost('/api/v1/product/').reply(400, { response: { status: false } });
		// eslint-disable-next-line jest/valid-expect-in-promise
		store.dispatch(productEdit()).then(() => {
			let expectedActions = [
				{ type: 'PRODUCT_EDIT_START' },
				{
					type: 'PRODUCT_EDIT_ERROR',
					payload: { error: { status: false } }
				}
			];
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
