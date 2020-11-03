import React, { useState } from 'react';
import styled from 'styled-components';
import ContainerWrapper from '../components/Container';
import AddProduct from '../components/AddProduct';
import ListProduct from '../components/ListProduct';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Link, useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import { productList } from '../redux/action/productList';
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
	border: 1px solid green !important;
	background-color: transparent !important;
	min-height: 30px !important;
	min-width: 70px !important;
	color: black !important;
	height: 38px !important;
	border-color: green !important;
	align-items: center !important;
	&:hover {
		opacity: 3;
		background-color: cadetblue !important;
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
	return (
		<ContainerWrapper>
			{/* <Header>ADD PRODUCT</Header>
    <AddProduct /> */}
			<Header>
				<ImageContainer>
					<Image src={process.env.PUBLIC_URL + '/logo.png'} />
					{/* <Header>ADD PRODUCT</Header> */}
				</ImageContainer>
			</Header>
			<HeaderWrapper>
				<Avatar>A</Avatar>
				<SearchWrapper>
					<SearchInput placeholder="Search Here" value={search} onChange={handleSearchChange} />
					<IconButton onClick={handleSearch}>
						<FontAwesomeIcon icon={faSearch} />
					</IconButton>
				</SearchWrapper>
				<ButtonWrapper>
					<ButtonStyled onClick={handleAddProduct}> ADD PRODUCT </ButtonStyled>
				</ButtonWrapper>
			</HeaderWrapper>
			<ListProduct />
		</ContainerWrapper>
	);
};

export default ProductListing;
