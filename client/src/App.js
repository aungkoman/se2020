import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductListing from './Pages/ProductListing';
import Add from './Pages/AddProduct';
import Edit from './Pages/EditProduct';
import Detail from './Pages/ProductDetail';
import { useDispatch } from 'react-redux';
import { login } from './redux/action/login';
function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(login());
	}, []);
	return (
		<Router>
			<Route exact path="/" component={ProductListing} />
			<Route exact path="/add-product" component={Add} />
			<Route exact path="/edit-product/:id" component={Edit} />
			<Route exact path="/detail/:id" component={Detail} />
		</Router>
	);
}

export default App;
