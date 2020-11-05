import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContainerWrapper from '../components/Container';
import AddProduct from '../components/AddProduct';
import ListProduct from '../components/ListProduct';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import { Backdrop, Button, CircularProgress, Tooltip } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Link, useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { productList } from '../redux/action/productList';
import { login } from '../redux/action/login';
const Header = styled.h1`
	text-align: center;
	font-size: 25px;
`;

const HeaderWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const SearchWrapper = styled.div`
	padding: 2px 4px;
	display: flex;
	align-items: 'center';
	width: 350px;
	height: 38px;
	box-shadow: 0 0 10px #c8d2ff;
	/* justify-content: center; */

	margin: 0 auto;
	background-color: #fff;
`;
const SearchInput = styled(InputBase)`
	flex: 1 !important;
	margin-left: 10px !important;
`;

const ButtonWrapper = styled.div`
	/* flex-direction: row; */
`;
const ButtonStyled = styled(Button)`
	border-radius: 10px !important ;
	background-color: transparent !important;
	min-height: 30px !important;
	min-width: 70px !important;
	color: black !important;
	height: 38px !important;
	align-items: center !important;
	background-color: #1da0ff !important;
	&:hover {
		opacity: 3;
		color: white !important;
		cursor: ${({ valid }) => valid && `no-drop !important`};
	}
`;
const Image = styled.img`
	width: 100%;
	height: 100%;
	display: block;
`;
const ImageContainer = styled.div`
	width: 10%;
	margin-bottom: 10px;
	margin: 0 auto;
	@media (max-width: 768px) {
		width: 100%;
		height: 300px;
	}
`;
const ProductListing = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [search, setSearch] = useState('');
	const [loading, setLoading] = React.useState(false);
	const listProduct = useSelector((state) => state.productListingReducer);

	// if loading from reducer is true
	useEffect(() => {
		if (listProduct && listProduct.loading === true) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [listProduct.loading]);

	// Calling data when screen loaded
	useEffect(() => {
		//Calling the Product List
		dispatch(productList());
		dispatch(login());
	}, []);

	//handle search
	const handleSearch = (e) => {
		e.preventDefault();
		let limit = 10;
		let lastId = 0;
		if (!isEmpty(search)) {
			dispatch(productList(limit, lastId, search));
		}
	};
	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};
	const handleAddProduct = () => history.push('/add-product');
	if (listProduct && listProduct.loading === true) {
		return (
			<Backdrop open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	} else {
		return (
			<ContainerWrapper>
				<Header>
					<ImageContainer>
						<Image src={process.env.PUBLIC_URL + '/logo.png'} />
					</ImageContainer>
				</Header>
				<HeaderWrapper>
					<Avatar>A</Avatar>
					<SearchWrapper>
						<SearchInput placeholder="Search Here" value={search} onChange={handleSearchChange} />
						<Tooltip title="Product Search">
							<IconButton onClick={handleSearch}>
								<FontAwesomeIcon icon={faSearch} />
							</IconButton>
						</Tooltip>
					</SearchWrapper>
					<ButtonWrapper>
						<ButtonStyled onClick={handleAddProduct}> ADD PRODUCT </ButtonStyled>
					</ButtonWrapper>
				</HeaderWrapper>
				<ListProduct />
			</ContainerWrapper>
		);
	}
};

export default ProductListing;
