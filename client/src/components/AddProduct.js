import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
	TextField,
	Button,
	RadioGroup,
	FormControlLabel,
	Radio,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	StepLabel,
	FormLabel,
	CircularProgress,
	FormHelperText
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { productAdd } from '../redux/action/productAdd';
import { productList } from '../redux/action/productList';
import { useHistory } from 'react-router-dom';
import AlertBox from './AlertBox';
import { isEmpty } from 'lodash';
const InputContainer = styled.div`
	margin-top: 5px;
	padding: 20px 20px;
	box-shadow: 0 0 10px #c8d2ff;
	/* justify-content: center; */
	border-radius: 15px;
	background-color: #fff;
`;
const HeaderContainer = styled.div`
	display: flex;
	margin: 10px;
	padding: 10px;
	@media (max-width: 768px) {
		display: inline-block;
		margin: 0 auto;
		padding: 0px;
		width: 100%;
	}
`;
const ImageContainer = styled.div`
	width: 30%;
	height: 205px;
	margin-bottom: 10px;

	@media (max-width: 768px) {
		width: 100%;
		height: 300px;
		margin-bottom: 20px;
	}
`;
const HeadTextAreaContainer = styled.div`
	width: 70%;
	margin: 10px;
	@media (max-width: 768px) {
		width: 100%;
		margin: 0 auto;
	}
`;
const Image = styled.img`
	width: 100%;
	height: 100%;

	aspect-ratio: attr(width) / attr(height);

	display: block;
`;
const RadioContainer = styled(RadioGroup)`
	display: flex !important;
	flex-direction: row !important;
	align-items: center !important;
	justify-content: space-around;
	color: ${({ valid }) => valid && `red !important`};
	margin: 10px;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;
const ButtonStyled = styled(Button)`
	border-radius: 10px !important ;
	background-color: #1da0ff !important;
	background-color: ${({ valid }) => valid && `gray !important`};
	color: black !important;
	height: 48px !important;
	margin-top: 25px !important;
	align-items: center !important;
	&:hover {
		opacity: 3;
		/* cursor: ${({ valid }) => valid && `no-drop !important`}; */
	}
`;
const BackButtonStyled = styled(Button)`
	border-radius: 10px !important ;
	background-color: transparent !important;
	color: black !important;
	height: 48px !important;
	margin-top: 25px !important;
	align-items: center !important;
	&:hover {
		opacity: 3;
	}
`;

const TouchableOpacity = styled.div`
	background-color: transparent !important;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100% !important;
	height: 100% !important;
	border-color: ${({ valid }) => valid && `red !important`};
	cursor: pointer;
	border-style: solid;
	border-width: 1px;
	&:hover {
		opacity: 3;
		background-color: rgb(3, 255, 150, 0.2) !important;
	}
`;
const ProgressContainer = styled.div`
	margin-right: 10px;
	margin-top: 5px;
`;
const AddProduct = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [productName, setProductName] = useState('');
	const [productNameValid, setProductNameValid] = useState(false);
	const [description, setDescription] = useState('');
	const [descriptionValid, setDescriptionValid] = useState(false);
	const [size, setSize] = useState('');
	const [sizeValid, setSizeValid] = useState(false);
	const [color, setColor] = useState('');
	const [colorValid, setColorValid] = useState(false);
	const [price, setPrice] = useState('');
	const [priceValid, setPriceValid] = useState(false);
	const [stock, setStock] = useState('');
	const [stockValid, setStockValid] = useState(false);
	const [warehouse, setWarehouse] = useState('');
	const [warehouseValid, setWareHouseValid] = useState(false);
	const [category, setCategory] = useState('');
	const [categoryValid, setCategoryValid] = useState(false);
	const [image, setImage] = useState();
	const [imageValid, setImageValid] = useState(false);
	const [file, setFile] = useState();
	const [openAlertBox, setOpenAlerBox] = useState(false);
	const [fileValid, setFileValid] = useState(false);
	const valid = () => {
		return productName && description && size && color && price && stock && warehouse && category && image;
	};
	const getProduct = useSelector((state) => state.productAddReducer);

	const productStatus = getProduct && getProduct.data && getProduct.data.status;
	const isLoading = getProduct && getProduct.loading;

	const photosChangeHandler = () => (event) => {
		setImage();
		const { files } = event.target;
		if (files && !files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
			setImageValid(true);
			setFileValid(true);
		} else {
			readAndAddPreview(files[0]);
			setFile(files[0]);
			setFileValid(false);
			setImageValid(false);
		}
	};
	const readAndAddPreview = (file) => {
		let reader = new FileReader();
		if (file) {
			reader.onloadend = () => {
				setImage(reader && reader.result);
				setImageValid(false);
				return reader && reader.result;
			};
			reader && reader.readAsDataURL(file);
		}
	};

	// OnChange Handler for the Product Fields
	const handleChange = (e) => {
		setProductName(e.target.value);
		setProductNameValid(false);
	};
	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
		setDescriptionValid(false);
	};
	const handleSizeChange = (e) => {
		setSize(e.target.value);
		setSizeValid(false);
	};
	const handleColorChange = (e) => {
		setColor(e.target.value);
		setColorValid(false);
	};
	const handlePriceChange = (e) => {
		setPrice(e.target.value);
		setPriceValid(false);
	};
	const handleStockChange = (e) => {
		setStock(e.target.value);
		setStockValid(false);
	};
	const handleWarehouseChange = (e) => {
		setWarehouse(e.target.value);
		setWareHouseValid(false);
	};
	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
		setCategoryValid(false);
	};

	// To Submit Product to Reducer
	const handleAdd = (e) => {
		e.preventDefault();
		if (isEmpty(productName)) {
			setProductNameValid(true);
		}
		if (isEmpty(description)) {
			setDescriptionValid(true);
		}
		if (isEmpty(size)) {
			setSizeValid(true);
		}
		if (color === '') {
			setColorValid(true);
		}
		if (isEmpty(price)) {
			setPriceValid(true);
		}
		if (isEmpty(stock)) {
			setStockValid(true);
		}
		if (warehouse === '') {
			setWareHouseValid(true);
		}
		if (category === '') {
			setCategoryValid(true);
		}
		if (isEmpty(image)) {
			setImageValid(true);
		}
		if (!valid()) return false;
		let name = productName;
		dispatch(productAdd({ name, description, size, color, price, stock, warehouse, category, image }));
		setOpenAlerBox(true);
	};
	// if (getProduct && getProduct.data && getProduct.data.status === true) {

	// }

	const handleAction = (value) => {
		if (value === true) {
			history.push('/add-product');

			window.location.reload();
		}
	};
	const handleFileValidAction = (value) => {
		// setAgree(value);
		if (value === true) {
			setFileValid(false);
		}
	};
	const handleBackAction = (value) => {
		if (value === true) {
			history.push('/');
			window.location.reload();
		}
	};

	const handleBack = () => history.push('/');
	return (
		<InputContainer>
			<HeaderContainer>
				<ImageContainer>
					<label htmlFor="upload-button">
						<TouchableOpacity valid={imageValid ? 1 : 0}>
							{image ? <Image src={image} loading="lazy" /> : <h5>ADD PHOTO</h5>}
						</TouchableOpacity>
					</label>

					<input
						style={{ display: 'none' }}
						accept="image/*"
						id="upload-button"
						type="file"
						onChange={photosChangeHandler()}
					/>
				</ImageContainer>
				<HeadTextAreaContainer>
					<TextField
						label="Add Product Name"
						variant="outlined"
						value={productName}
						onChange={handleChange}
						fullWidth
						error={productNameValid ? true : false}
						helperText={productNameValid ? 'Product Name Required' : null}
					/>

					<TextField
						label="Add Product Description"
						variant="outlined"
						value={description}
						style={{ marginTop: 10 }}
						multiline
						rows={5}
						onChange={handleDescriptionChange}
						fullWidth
						error={descriptionValid ? true : false}
						helperText={descriptionValid ? 'Product Description Required' : null}
					/>
				</HeadTextAreaContainer>
			</HeaderContainer>

			<RadioContainer
				aria-label="size"
				name="size"
				onChange={handleSizeChange}
				value={size}
				valid={sizeValid ? true : false}
			>
				<FormLabel style={{ color: 'black' }}>Size : </FormLabel>
				<FormControlLabel value="1" control={<Radio />} label="F" />
				<FormControlLabel value="2" control={<Radio />} label="S" />
				<FormControlLabel value="3" control={<Radio />} label="M" />
				<FormControlLabel value="4" control={<Radio />} label="L" />
				<FormControlLabel value="5" control={<Radio />} label="XL" />
				<FormControlLabel value="6" control={<Radio />} label="XXL" />
			</RadioContainer>

			<FormControl style={{ marginTop: 12 }} variant="outlined" fullWidth error={colorValid ? true : false}>
				<InputLabel>Color</InputLabel>
				<Select labelId="color-select" label="Color" onChange={handleColorChange} value={color}>
					<MenuItem value={1}>Black</MenuItem>
					<MenuItem value={2}>Green</MenuItem>
					<MenuItem value={3}>Yellow</MenuItem>
					<MenuItem value={4}>White</MenuItem>
					<MenuItem value={5}>Grey</MenuItem>
					<MenuItem value={6}>Red</MenuItem>
				</Select>
				{colorValid ? <FormHelperText>Color Required</FormHelperText> : null}
			</FormControl>

			<TextField
				style={{ marginTop: 12 }}
				label="Price"
				variant="outlined"
				type="number"
				value={price}
				onChange={handlePriceChange}
				fullWidth
				error={priceValid ? true : false}
				helperText={priceValid ? 'Product Price Required' : null}
			/>
			<TextField
				style={{ marginTop: 12 }}
				label="Stock Availability"
				type="number"
				variant="outlined"
				value={stock}
				onChange={handleStockChange}
				fullWidth
				error={stockValid ? true : false}
				helperText={stockValid ? 'Stock Required' : null}
			/>

			<FormControl style={{ marginTop: 12 }} variant="outlined" fullWidth error={warehouseValid ? true : false}>
				<InputLabel>Warehouse</InputLabel>
				<Select labelId="color-select" label="Warehouse" value={warehouse} onChange={handleWarehouseChange}>
					<MenuItem value={1}>A</MenuItem>
					<MenuItem value={2}>B</MenuItem>
					<MenuItem value={3}>C</MenuItem>
				</Select>
				{warehouseValid ? <FormHelperText>Need to Choose Warehouse</FormHelperText> : null}
			</FormControl>
			<FormControl style={{ marginTop: 12 }} variant="outlined" fullWidth error={categoryValid ? true : false}>
				<InputLabel>Category</InputLabel>
				<Select labelId="color-select" label="Category" value={category} onChange={handleCategoryChange}>
					<MenuItem value={1}>Man</MenuItem>
					<MenuItem value={2}>Woman</MenuItem>
				</Select>
				{categoryValid ? <FormHelperText>Need to Choose Category</FormHelperText> : null}
			</FormControl>
			<ButtonStyled valid={!valid() ? 1 : 0} fullWidth onClick={handleAdd}>
				{isLoading === true ? (
					<ProgressContainer>
						<CircularProgress size={15} color={'inherit'} />
					</ProgressContainer>
				) : null}
				ADD PRODUCT
			</ButtonStyled>
			<BackButtonStyled fullWidth onClick={handleBack} color="primary">
				Back
			</BackButtonStyled>
			{openAlertBox && productStatus ? (
				<AlertBox
					agreeText={'Add New'}
					closeText={'OK'}
					title={`Prodcut Name: ${productName}`}
					description={'has been created successfully'}
					trigger={true}
					handleAction={handleAction}
					handleBackAction={handleBackAction}
				/>
			) : null}
			{fileValid === true ? (
				<AlertBox
					agreeText={'OK'}
					title={`Please select valid image`}
					description={'File Must Be PNG or JPG'}
					trigger={true}
					handleAction={handleFileValidAction}
				/>
			) : null}
			{productStatus === false ? (
				<AlertBox
					agreeText={'OK'}
					title={`Error!!!`}
					description={'Something is wrong !!! Pls Try Again '}
					trigger={true}
					handleAction={handleAction}
				/>
			) : null}

			{getProduct && !isEmpty(getProduct.error) ? (
				<AlertBox
					agreeText={'OK'}
					title={`Error!!!`}
					description={'Network Error !!! Pls Try Again '}
					trigger={true}
					handleAction={handleBackAction}
				/>
			) : null}
		</InputContainer>
	);
};

export default AddProduct;
