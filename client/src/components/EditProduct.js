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
	InputLabel
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { productEdit } from '../redux/action/productEdit';
import { productDetail } from '../redux/action/productDetail';
import { useHistory, useParams } from 'react-router-dom';
import { BASE_URL } from '../utils/baseURL';
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
	margin-bottom: 10px;
	@media (max-width: 768px) {
		width: 100%;
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
const BackButtonStyled = styled(Button)`
	border-radius: 10px !important ;
	background-color: #99e91b !important;
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

	width: 100% !important;
	height: 100% !important;
	cursor: pointer;
	&:hover {
		opacity: 3;
		background-color: rgb(3, 255, 150, 0.2) !important;
	}
`;

const EditProduct = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();
	const [productName, setProductName] = useState('');
	const [description, setDescription] = useState('');
	const [size, setSize] = useState('');
	const [color, setColor] = useState('');
	const [price, setPrice] = useState('');
	const [stock, setStock] = useState('');
	const [warehouse, setWarehouse] = useState('');
	const [category, setCategory] = useState('');
	const [image, setImage] = useState();
	const [img, setImg] = useState();
	const [file, setFile] = useState();
	const [openAlertBox, setOpenAlerBox] = useState(false);
	const valid = () => {
		return productName && description && size && color && price && stock && warehouse && category && (img || image);
	};
	const getProduct = useSelector((state) => state.productDetailReducer);

	useEffect(() => {
		dispatch(productDetail({ id }));
	}, []);
	console.log(description);
	useEffect(() => {
		const data = getProduct && getProduct.product && getProduct.product.data;
		console.log(data);
		const img = `${BASE_URL}${data && data.image}`;
		setProductName(data && data.name);
		setDescription(data && data.description);
		setSize(data && data.size);
		setColor(data && data.color);
		setPrice(data && data.price);
		setStock(data && data.stock);
		setWarehouse(data && data.warehouse);
		setCategory(data && data.category);
		setImg(img);
		// setImage(img);
	}, [getProduct]);
	const photosChangeHandler = () => (event) => {
		setImage();
		let { files } = event.target;
		readAndAddPreview(files[0]);
		setFile(files[0]);
	};
	const readAndAddPreview = (file) => {
		let reader = new FileReader();
		reader.onloadend = () => {
			setImage(reader && reader.result);
			return reader && reader.result;
		};
		reader && reader.readAsDataURL(file);
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
		dispatch(productEdit({ id, name, description, size, color, price, stock, warehouse, category, image }));
		setOpenAlerBox(true);
	};
	const handleAction = (value) => {
		console.log(value);

		// setAgree(value);
		if (value === true) {
			history.push('/');
		}
	};

	const handleBack = () => history.push('/');
	return (
		<InputContainer>
			<HeaderContainer>
				<ImageContainer style={{ border: 'black' }}>
					<label htmlFor="upload-button">
						<TouchableOpacity>
							{/* {image ? (
								<Image src={image} />
							) : (
								<h4 style={{ textAlign: 'center' }}>Click Here to add Image</h4>
							)} */}
							<Image src={image ? image : img} />
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
						label="Product Name"
						variant="outlined"
						value={productName}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						label="Product Description"
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
				<FormControlLabel value="1" control={<Radio />} label="Free Size" />
				<FormControlLabel value="2" control={<Radio />} label="S Size" />
				<FormControlLabel value="3" control={<Radio />} label="M Size" />
				<FormControlLabel value="4" control={<Radio />} label="L Size" />
				<FormControlLabel value="5" control={<Radio />} label="XL Size" />
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
				Update PRODUCT
			</ButtonStyled>
			<BackButtonStyled fullWidth onClick={handleBack}>
				Back
			</BackButtonStyled>
			{openAlertBox ? (
				<AlertBox
					agreeText={'OK'}
					title={`Prodcut Name: ${productName}`}
					description={'has been updated'}
					trigger={true}
					handleAction={handleAction}
				/>
			) : null}
		</InputContainer>
	);
};

export default EditProduct;
