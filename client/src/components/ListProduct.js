import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-ui/core';
import { productList } from '../redux/action/productList';
import { productDelete } from '../redux/action/productDelete';
const ProductListingContainer = styled.div`
	margin-top: 5px;
	padding: 20px 20px;
	box-shadow: 0 0 10px #c8d2ff;
	/* justify-content: center; */
	border-radius: 15px;
	background-color: #fff;
`;
const EditButton = styled(Button)`
	margin-right: 10px !important;
`;
const DeleteButton = styled(Button)``;

const ListProduct = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		//Calling the Product List
		dispatch(productList());
	}, []);
	// Get Data From Reducer
	const listProduct = useSelector((state) => state.productListingReducer);
	const productData = listProduct && listProduct.product && listProduct.product.data;

	//Delete Handler
	const handleDelete = (id) => {
		dispatch(productDelete({ id }));
		dispatch(productList());
	};
	return (
		<ProductListingContainer>
			<TableContainer>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Name</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{productData &&
							productData.map((data) => (
								<TableRow key={data.id} hover>
									<TableCell component="th" scope="row">
										{data.id}
									</TableCell>
									<TableCell component="th" scope="row">
										{data.name}
									</TableCell>
									<TableCell component="th" scope="row">
										<EditButton variant="contained">
											<FontAwesomeIcon icon={faEdit} />
										</EditButton>
										<DeleteButton
											variant="contained"
											color="secondary"
											onClick={() => handleDelete(data.id)}
										>
											<FontAwesomeIcon icon={faTrash} />
										</DeleteButton>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</ProductListingContainer>
	);
};

export default ListProduct;
