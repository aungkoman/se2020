import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axiosCreate from '../api/axiosCreate';
import { productDelete } from '../redux/action/productDelete';
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(axiosCreate);
const store = mockStore();

describe('Product Delect Actions', () => {
	beforeEach(() => {
		store.clearActions();
	});

	it('dispatches PRODUCT_DELETE_SUCCESS after a successfull API requets', () => {
		mock.onPost('/api/v1/product/').reply(200, {
			id: 'VVowSzFpZnBBYmwydGs2aXBJcEJRdz09'
		});
		// eslint-disable-next-line jest/valid-expect-in-promise
		store.dispatch(productDelete()).then(() => {
			let expectedActions = [
				{ type: 'PRODUCT_DELETE_START' },
				{ type: 'PRODUCT_DELETE_SUCCESS', product: { status: true } }
			];
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('dispatches PRODUCT_DELETE_ERROR after a FAILED API requets', () => {
		mock.onPost('/api/v1/product/').reply(400, { response: { status: false } });
		// eslint-disable-next-line jest/valid-expect-in-promise
		store.dispatch(productDelete()).then(() => {
			let expectedActions = [
				{ type: 'PRODUCT_DELETE_START' },
				{
					type: 'PRODUCT_DELETE_ERROR',
					payload: { error: { status: false } }
				}
			];
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
