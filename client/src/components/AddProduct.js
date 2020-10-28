import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { productAdd } from '../redux/action/productAdd';
import { productList } from '../redux/action/productList';
const InputContainer = styled.div`
	margin-top: 5px;
	padding: 20px 20px;
	box-shadow: 0 0 10px #c8d2ff;
	/* justify-content: center; */
	border-radius: 15px;
	background-color: #fff;
`;

const ButtonStyled = styled(Button)`
	border-radius: 10px !important ;
	background-color: cadetblue !important;
	color: black !important;
	height: 48px !important;
	margin-top: 25px !important;
	align-items: center !important;
	&:hover {
		opacity: 3;
		cursor: ${({ valid }) => valid && `no-drop !important`};
	}
`;

const AddProduct = () => {
	const dispatch = useDispatch();
	const [productName, setProductName] = useState('');

	const valid = () => {
		return productName;
	};
	const handleChange = (e) => {
		setProductName(e.target.value);
	};
	// To Submit Product to Reducer
	const handleAdd = (e) => {
		e.preventDefault();
		if (!valid()) return false;
		let name = productName;
		dispatch(productAdd({ name }));
		dispatch(productList());
	};

	return (
		<InputContainer>
			<TextField
				label="Add Product Name"
				variant="outlined"
				value={productName}
				onChange={handleChange}
				fullWidth
			/>
			<ButtonStyled valid={!valid() ? 1 : 0} fullWidth onClick={handleAdd}>
				ADD PRODUCT
			</ButtonStyled>
		</InputContainer>
	);
};

export default AddProduct;
