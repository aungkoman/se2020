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
	CircularProgress
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { productAdd } from '../redux/action/productAdd';
import { productList } from '../redux/action/productList';
import { useHistory } from 'react-router-dom';
import AlertBox from './AlertBox';
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
		cursor: ${({ valid }) => valid && `no-drop !important`};
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
	const [description, setDescription] = useState('');
	const [size, setSize] = useState('');
	const [color, setColor] = useState('');
	const [price, setPrice] = useState('');
	const [stock, setStock] = useState('');
	const [warehouse, setWarehouse] = useState('');
	const [category, setCategory] = useState('');
	const [image, setImage] = useState();
	const [file, setFile] = useState();
	const [openAlertBox, setOpenAlerBox] = useState(false);
	const valid = () => {
		return productName && description && size && color && price && stock && warehouse && category && image;
	};
	const getProduct = useSelector((state) => state.productAddReducer);
	const productStatus = getProduct && getProduct.data && getProduct.data.status;
	const isLoading = getProduct && getProduct.loading;
	console.log(getProduct);
	console.log(productStatus);
	const photosChangeHandler = () => (event) => {
		setImage();
		let { files } = event.target;
		readAndAddPreview(files[0]);
		setFile(files[0]);
	};
	const readAndAddPreview = (file) => {
		let reader = new FileReader();
		if (file) {
			reader.onloadend = () => {
				console.log(reader);
				setImage(reader && reader.result);
				return reader && reader.result;
			};
			reader && reader.readAsDataURL(file);
		}
	};

	const handleChange = (e) => {
		setProductName(e.target.value);
	};
	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};
	const handleSizeChange = (e) => {
		setSize(e.target.value);
	};
	const handleColorChange = (e) => {
		setColor(e.target.value);
	};
	const handlePriceChange = (e) => {
		setPrice(e.target.value);
	};
	const handleStockChange = (e) => {
		setStock(e.target.value);
	};
	const handleWarehouseChange = (e) => {
		setWarehouse(e.target.value);
	};
	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
	};

	// To Submit Product to Reducer
	const handleAdd = (e) => {
		e.preventDefault();
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
						<TouchableOpacity>
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
					/>
				</HeadTextAreaContainer>
			</HeaderContainer>

			<RadioContainer aria-label="size" name="size" onChange={handleSizeChange} value={size}>
				<FormLabel style={{ color: 'black' }}>Size : </FormLabel>
				<FormControlLabel value="1" control={<Radio />} label="F" />
				<FormControlLabel value="2" control={<Radio />} label="S" />
				<FormControlLabel value="3" control={<Radio />} label="M" />
				<FormControlLabel value="4" control={<Radio />} label="L" />
				<FormControlLabel value="5" control={<Radio />} label="XL" />
				<FormControlLabel value="6" control={<Radio />} label="XXL" />
			</RadioContainer>

			<FormControl style={{ marginTop: 12 }} variant="outlined" fullWidth>
				<InputLabel>Color</InputLabel>
				<Select labelId="color-select" label="Color" onChange={handleColorChange} value={color}>
					<MenuItem value={1}>Black</MenuItem>
					<MenuItem value={2}>Green</MenuItem>
					<MenuItem value={3}>Yellow</MenuItem>
					<MenuItem value={4}>White</MenuItem>
					<MenuItem value={5}>Grey</MenuItem>
					<MenuItem value={6}>Red</MenuItem>
				</Select>
			</FormControl>

			<TextField
				style={{ marginTop: 12 }}
				label="Price"
				variant="outlined"
				type="number"
				value={price}
				onChange={handlePriceChange}
				fullWidth
			/>
			<TextField
				style={{ marginTop: 12 }}
				label="Stock Availability"
				type="number"
				variant="outlined"
				value={stock}
				onChange={handleStockChange}
				fullWidth
			/>

			<FormControl style={{ marginTop: 12 }} variant="outlined" fullWidth>
				<InputLabel>Warehouse</InputLabel>
				<Select labelId="color-select" label="Warehouse" value={warehouse} onChange={handleWarehouseChange}>
					<MenuItem value={1}>A</MenuItem>
					<MenuItem value={2}>B</MenuItem>
					<MenuItem value={3}>C</MenuItem>
				</Select>
			</FormControl>
			<FormControl style={{ marginTop: 12 }} variant="outlined" fullWidth>
				<InputLabel>Category</InputLabel>
				<Select labelId="color-select" label="Category" value={category} onChange={handleCategoryChange}>
					<MenuItem value={1}>Man</MenuItem>
					<MenuItem value={2}>Woman</MenuItem>
				</Select>
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
		</InputContainer>
	);
};

export default AddProduct;
