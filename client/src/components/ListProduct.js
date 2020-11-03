import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Checkbox, IconButton, Tooltip } from '@material-ui/core';
import { productList } from '../redux/action/productList';
import { productDelete, productDeleteMultiple } from '../redux/action/productDelete';
import { login } from '../redux/action/login';
import { BASE_URL } from '../utils/baseURL';
import { useHistory } from 'react-router-dom';
import { Size, Color, Warehouse, Category } from '../utils/data';
import AlertBox from './AlertBox';

const ProductListingContainer = styled.div`
	margin-top: 10px;
	padding: 20px 20px;
	box-shadow: 0 0 10px #c8d2ff;
	/* justify-content: center; */
	border-radius: 15px;
	background-color: #fff;
`;
const ImageContainer = styled.div`
	width: 100%;
`;
const Image = styled.img`
	width: 100%;
	height: 100%;
`;
const EditButton = styled(Button)`
	margin-bottom: 10px !important;
`;
const DetailButton = styled(Button)`
	margin-bottom: 10px !important;
	font-size: 10px !important;
	width: 12px !important;
	height: 25px !important;
	margin-right: 10px !important;
`;
const DeleteButton = styled(Button)``;
const PaginationWrapper = styled.div`
	padding: 15px 15px;
	margin: 30px 0px;
	align-items: flex-end;
`;
const ListProduct = (props) => {
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(1);
	const [deleteSelect, setDeleteSelect] = useState(false);
	const [deleteSelectId, setDeleteSelectId] = useState();

	const dispatch = useDispatch();
	const history = useHistory();
	// Get Data From Reducer
	const listProduct = useSelector((state) => state.productListingReducer);
	const productData = listProduct && listProduct.product && listProduct.product.data;
	console.log(listProduct);
	useEffect(() => {
		//Calling the Product List
		dispatch(productList());
		dispatch(login());
	}, []);

	//Delete Handler when accepted
	const handleAction = (value) => {
		console.log(value);

		// setAgree(value);
		if (value === true) {
			let id = deleteSelectId;
			if (!isEmpty(id)) {
				dispatch(productDelete({ id }));
				setTimeout(() => {
					dispatch(productList());
				}, 1000);
			}
			if (!isEmpty(selected)) {
				let multiIds = selected;
				// console.log(ids);
				dispatch(productDeleteMultiple({ multiIds }));
				setTimeout(() => {
					dispatch(productList());
				}, 1000);
				history.push(`/`);
			}
			setDeleteSelect('');
		}
	};
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = productData.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};
	const handleSelectEachClick = (event, id) => {
		// To Handle the Each Select Action
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	};
	// To delte multiple product for calling alert box
	const handleDeleteMultiple = () => {
		setDeleteSelect(true);
	};

	const PaginationCount = Math.floor(parseInt(productData && productData.length + 1) / 10);
	console.log(PaginationCount);
	const handlePaginate = (page) => {
		setPage(page);
		console.log(page);
		let limit = 10;
		let last_id = page;
		dispatch(productList(limit, last_id));
	};

	const handleEdit = (id) => {
		history.push(`/edit-product/${id}`);
	};
	const handleDetail = (id) => {
		history.push(`/detail/${id}`);
	};
	const isSelected = (id) => selected && selected.indexOf(id) !== -1;
	return (
		<ProductListingContainer>
			<TableContainer>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow hover>
							<TableCell padding="checkbox"></TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Image</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Size</TableCell>
							<TableCell>Color</TableCell>
							<TableCell>Price</TableCell>
							<TableCell style={{ width: 108 }}>Stock Availability</TableCell>
							<TableCell>Warehouse</TableCell>
							<TableCell>Category</TableCell>

							<TableCell>
								<Checkbox
									// indeterminate={numSelected > 0 && numSelected < rowCount}
									// checked={rowCount > 0 && numSelected === rowCount}
									onChange={handleSelectAllClick}
									inputProps={{ 'aria-label': 'select all product' }}
								/>

								<Tooltip title="Delete">
									<IconButton aria-label="delete" onClick={handleDeleteMultiple}>
										<FontAwesomeIcon icon={faTrash} />
									</IconButton>
								</Tooltip>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{productData &&
							productData.map((data) => {
								const img = `${BASE_URL}${data && data.image}`;
								const size = Size(data.size);
								const color = Color(data.color);
								const warehouse = Warehouse(data.warehouse);
								const category = Category(data.category);
								const isItemSelected = isSelected(data.id);

								return (
									<TableRow key={data.id} hover>
										<TableCell padding="checkbox">
											<Checkbox
												checked={isItemSelected}
												onChange={(event) => handleSelectEachClick(event, data.id)}
												// inputProps={{ 'aria-labelledby': labelId }}
											/>
										</TableCell>

										<TableCell component="th" scope="row" style={{ width: 80 }}>
											{data.name}
										</TableCell>
										<TableCell component="th" scope="row" style={{ width: 80 }}>
											<ImageContainer>
												<Image src={img} />
											</ImageContainer>
										</TableCell>
										<TableCell component="th" scope="row" style={{ width: 80 }}>
											{data.description}
										</TableCell>
										<TableCell component="th" scope="row" style={{ width: 80 }}>
											{size}
										</TableCell>
										<TableCell component="th" scope="row" style={{ width: 80 }}>
											{color}
										</TableCell>
										<TableCell component="th" scope="row" style={{ width: 80 }}>
											{data.price}
										</TableCell>
										<TableCell component="th" scope="row" style={{ width: 80 }}>
											{data.stock}
										</TableCell>
										<TableCell component="th" scope="row" style={{ width: 80 }}>
											{warehouse}
										</TableCell>
										<TableCell component="th" scope="row" style={{ width: 80 }}>
											{category}
										</TableCell>
										<TableCell component="th" scope="row">
											<DetailButton variant="contained" onClick={() => handleDetail(data.id)}>
												Detail
											</DetailButton>
											<EditButton variant="contained" onClick={() => handleEdit(data.id)}>
												<FontAwesomeIcon icon={faEdit} style={{ width: 12 }} />
											</EditButton>
											<DeleteButton
												variant="contained"
												color="secondary"
												onClick={() => {
													// handleDelete(data.id);
													setDeleteSelectId(data.id);
													setDeleteSelect(true);
												}}
											>
												<FontAwesomeIcon icon={faTrash} />
											</DeleteButton>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<PaginationWrapper>
				<Pagination
					page={parseInt(page)}
					onChange={(e, page) => handlePaginate(page)}
					count={PaginationCount + 1}
					variant="outlined"
					color="primary"
				/>
			</PaginationWrapper>
			{deleteSelect ? (
				<AlertBox
					agreeText={'Confirm'}
					closeText={'Cancle'}
					title={'Are You Sure?'}
					description={'This Item(s) Will be Delete Permanetly'}
					trigger={true}
					cancleAction={setDeleteSelect}
					handleAction={handleAction}
				/>
			) : null}
		</ProductListingContainer>
	);
};

export default ListProduct;
