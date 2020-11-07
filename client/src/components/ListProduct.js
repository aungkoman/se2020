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
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Checkbox, IconButton, Tooltip } from '@material-ui/core';
import { productList } from '../redux/action/productList';
import { productDelete, productDeleteMultiple } from '../redux/action/productDelete';
import { BASE_URL } from '../utils/baseURL';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Size, Color, Warehouse, Category } from '../utils/data';
import AlertBox from './AlertBox';
import ImageModal from './ImageModal';
import { PaginationItem } from '@material-ui/lab';

// For Query Params to use pagnitaion
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

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
	height: 60px;
`;
const Image = styled.img`
	width: 100%;
	height: 100%;
`;
const EditButton = styled(Button)`
	background-color: #00ff45 !important;
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
const NoDataText = styled.p`
	text-align: center;
	font-size: 1.5em;
	font-weight: 700;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
const ListProduct = (props) => {
	let query = useQuery();
	const getQuery = query.get('p');
	const dispatch = useDispatch();
	const history = useHistory();
	const [selected, setSelected] = useState([]);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [page, setPage] = getQuery && parseInt(getQuery) !== 0 ? useState(getQuery) : useState(1);
	const [deleteSelect, setDeleteSelect] = useState(false);
	const [deleteSelectId, setDeleteSelectId] = useState();
	const [imageClick, setImageClick] = useState(false);
	const [getImageOnClick, setGetImageOnClick] = useState(false);
	// Get Data From Reducer
	const listProduct = useSelector((state) => state.productListingReducer);

	// Get data from listProduct
	const productData = listProduct && listProduct.product && listProduct.product && listProduct.product.data;

	//Delete Handler when accepted
	const handleAction = (value) => {
		// To Delete Single Product
		if (value === true) {
			let id = deleteSelectId;
			if (!isEmpty(id)) {
				dispatch(productDelete({ id }));
				setTimeout(() => {
					dispatch(productList());
				}, 1000);
				history.push(`/`);
			}

			// To Delete Multiple Product
			if (!isEmpty(selected)) {
				let multiIds = selected;
				dispatch(productDeleteMultiple({ multiIds }));
				setTimeout(() => {
					dispatch(productList());
				}, 1000);
				history.push(`/`);
			}
			setDeleteSelect('');
		}
	};

	//Handler for All Select
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = productData.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};
	// Handler for Each Select
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

	// Count Total Pagination
	const PaginationCount =
		productData && productData.length > 9
			? Math.floor(parseInt(listProduct && listProduct.product && listProduct.product.msg + 1) / 10)
			: 0;
	console.log(PaginationCount);
	// Handle Paginate onClick
	const handlePaginate = (page) => {
		setPage(page);
		// console.log(value);
		let limit = 10;
		let last_id = page;
		dispatch(productList(limit, last_id));
	};

	// Edit Handler
	const handleEdit = (id) => {
		history.push(`/edit-product/${id}`);
	};
	// Detail Handler
	const handleDetail = (id) => {
		history.push(`/detail/${id}`);
	};

	//To Know wich product select
	const isSelected = (id) => selected && selected.indexOf(id) !== -1;

	return (
		<ProductListingContainer>
			<TableContainer>
				<Table aria-label="product table">
					<TableHead>
						<TableRow hover>
							<TableCell padding="checkbox"></TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Image</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Size</TableCell>
							<TableCell>Color</TableCell>
							<TableCell component="th" scope="row" style={{ width: 110 }}>
								Price (MMK)
							</TableCell>
							<TableCell component="th" scope="row" style={{ width: 120 }}>
								Stock Availability
							</TableCell>
							<TableCell>Warehouse</TableCell>
							<TableCell>Category</TableCell>

							<TableCell>
								<Tooltip title="Select All">
									<Checkbox
										style={isEmpty(productData) ? { color: 'gray' } : { color: 'blue' }}
										disabled={isEmpty(productData) ? true : false}
										onChange={handleSelectAllClick}
										inputProps={{ 'aria-label': 'select all product' }}
									/>
								</Tooltip>
								<Tooltip title="Delete Selected Product">
									<IconButton
										disabled={isEmpty(selected) ? true : false}
										aria-label="delete"
										onClick={handleDeleteMultiple}
									>
										<FontAwesomeIcon
											style={isEmpty(selected) ? { color: 'gray' } : { color: 'red' }}
											icon={faTrash}
										/>
									</IconButton>
								</Tooltip>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!isEmpty(productData) &&
							productData.map((data) => {
								const img = `${BASE_URL}${data && data.image}`;
								const size = Size(data.size);
								const color = Color(data.color);
								const warehouse = Warehouse(data.warehouse);
								const category = Category(data.category);
								const isItemSelected = isSelected(data.id);
								const handleImageClick = (value) => {
									setImageClick(true);
									setGetImageOnClick(value);
								};

								return (
									<TableRow key={data.id} hover>
										<TableCell padding="checkbox">
											<Tooltip title="Select">
												<Checkbox
													style={{ color: 'red' }}
													checked={isItemSelected}
													onChange={(event) => handleSelectEachClick(event, data.id)}
													// inputProps={{ 'aria-labelledby': labelId }}
												/>
											</Tooltip>
										</TableCell>

										<TableCell component="th" scope="row" style={{ width: 80 }}>
											{data.name}
										</TableCell>
										<TableCell component="th" scope="row" style={{ width: 80 }}>
											<ImageContainer>
												<Image src={img} onClick={() => handleImageClick(img)} />
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
											<Tooltip title="Product Detail">
												<DetailButton variant="contained" onClick={() => handleDetail(data.id)}>
													Detail
												</DetailButton>
											</Tooltip>
											<Tooltip title="Product Edit">
												<EditButton variant="contained" onClick={() => handleEdit(data.id)}>
													<FontAwesomeIcon icon={faEdit} style={{ width: 12 }} />
												</EditButton>
											</Tooltip>
											<Tooltip title="Product Delete">
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
											</Tooltip>
										</TableCell>
									</TableRow>
								);
							})}
						{isEmpty(productData) ? <NoDataText>No Product Data</NoDataText> : null}
					</TableBody>
				</Table>
			</TableContainer>
			{!isEmpty(productData) ? (
				<PaginationWrapper>
					<Pagination
						page={parseInt(page)}
						variant="outlined"
						color="primary"
						count={PaginationCount + 1}
						onChange={(e, page) => handlePaginate(page)}
						renderItem={(item) => (
							<PaginationItem
								component={Link}
								to={`/${item.page === 1 ? '' : `?p=${item.page}`}`}
								{...item}
							/>
						)}
					/>
				</PaginationWrapper>
			) : null}
			{isEmpty(productData) &&
			listProduct &&
			listProduct.product &&
			listProduct.product.msg >= 10 &&
			parseInt(page) > 1 ? (
				<PaginationWrapper>
					<Pagination
						page={parseInt(page)}
						variant="outlined"
						color="primary"
						count={PaginationCount + 1}
						onChange={(e, page) => handlePaginate(page)}
						renderItem={(item) => (
							<PaginationItem
								component={Link}
								to={`/${item.page === 1 ? '' : `?p=${item.page}`}`}
								{...item}
							/>
						)}
					/>
				</PaginationWrapper>
			) : null}
			{imageClick ? (
				<ImageModal image={getImageOnClick} openModal={imageClick} closeModal={setImageClick} />
			) : null}
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
