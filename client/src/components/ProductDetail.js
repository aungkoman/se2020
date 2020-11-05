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
const TextBox = styled(TextField)`
	> * {
		color: #333 !important;
	}

	&& [class*='MuiInputBase-root .Mui-disabled'] {
		color: black !important;
	}
`;
const FormControlLabelStyled = styled(FormControlLabel)`
	> * {
		color: #333 !important;
	}
`;

const FormControlStyled = styled(FormControl)`
	> * {
		color: #333 !important;
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

	const getProduct = useSelector((state) => state.productDetailReducer);

	useEffect(() => {
		dispatch(productDetail({ id }));
	}, []);
	useEffect(() => {
		const data = getProduct && getProduct.product && getProduct.product.data;
		const img = `${BASE_URL}${data && data.image}`;

		setProductName(data && data.name);
		setDescription(data && data.description);
		setSize(data && data.size);
		setColor(data && data.color);
		setPrice(data && data.price);
		setStock(data && data.stock);
		setWarehouse(data && data.warehouse);
		setCategory(data && data.category);
		setImage(img);
		console.log(data && data.image);
	}, [getProduct]);

	const handleBack = () => history.push('/');
	return (
		<InputContainer>
			<HeaderContainer>
				<ImageContainer style={{ border: 'black' }}>
					<label htmlFor="upload-button">
						{/* {image ? (
								<Image src={image} />
							) : (
								<h4 style={{ textAlign: 'center' }}>Click Here to add Image</h4>
							)} */}
						<Image src={image} />
					</label>
				</ImageContainer>
				<HeadTextAreaContainer>
					<TextBox label="Product Name" variant="outlined" value={productName} disabled fullWidth />
					<TextBox
						label="Product Description"
						variant="outlined"
						value={description}
						style={{ marginTop: 10 }}
						multiline
						rows={5}
						disabled
						fullWidth
					/>
				</HeadTextAreaContainer>
			</HeaderContainer>

			<RadioContainer aria-label="size" name="size" value={size}>
				<FormControlLabelStyled value="1" control={<Radio disabled />} label="Free Size" />
				<FormControlLabelStyled value="2" control={<Radio disabled />} label="S Size" />
				<FormControlLabelStyled value="3" control={<Radio disabled />} label="M Size" />
				<FormControlLabelStyled value="4" control={<Radio disabled />} label="L Size" />
				<FormControlLabelStyled value="5" control={<Radio disabled />} label="XL Size" />
			</RadioContainer>

			<FormControlStyled style={{ marginTop: 12 }} variant="outlined" fullWidth>
				<InputLabel>Color</InputLabel>
				<Select labelId="color-select" label="Color" disabled value={color}>
					<MenuItem value={1}>Black</MenuItem>
					<MenuItem value={2}>Green</MenuItem>
					<MenuItem value={3}>Yellow</MenuItem>
					<MenuItem value={4}>White</MenuItem>
					<MenuItem value={5}>Grey</MenuItem>
					<MenuItem value={6}>Red</MenuItem>
				</Select>
			</FormControlStyled>

			<TextBox
				style={{ marginTop: 12 }}
				label="Price"
				variant="outlined"
				type="number"
				value={price}
				disabled
				fullWidth
			/>
			<TextBox
				style={{ marginTop: 12 }}
				label="Stock Availability"
				variant="outlined"
				value={stock}
				disabled
				fullWidth
			/>

			<FormControlStyled style={{ marginTop: 12 }} variant="outlined" fullWidth>
				<InputLabel>Warehouse</InputLabel>
				<Select labelId="color-select" label="Warehouse" value={warehouse} disabled>
					<MenuItem value={1}>A</MenuItem>
					<MenuItem value={2}>B</MenuItem>
					<MenuItem value={3}>C</MenuItem>
				</Select>
			</FormControlStyled>
			<FormControlStyled style={{ marginTop: 12 }} variant="outlined" fullWidth>
				<InputLabel>Category</InputLabel>
				<Select labelId="color-select" label="Category" value={category} disabled>
					<MenuItem value={1}>Man</MenuItem>
					<MenuItem value={2}>Woman</MenuItem>
				</Select>
			</FormControlStyled>

			<BackButtonStyled fullWidth onClick={handleBack}>
				Back
			</BackButtonStyled>
		</InputContainer>
	);
};

export default EditProduct;
