import React from 'react';
import styled from 'styled-components';
import AddProduct from '../components/AddProduct';
const Add = () => {
	const Header = styled.h1`
		text-align: center;
		font-size: 25px;
	`;
	const ContainerWrapper = styled.div`
		max-width: 850px;
		margin: auto;
		height: auto;
		width: 100%;
		background-color: transparent;
		margin-top: 10px;
		margin-bottom: 10px;
	`;
	const Image = styled.img`
		width: 100%;
		height: 100%;
		display: block;
	`;
	const ImageContainer = styled.div`
		width: 20%;
		margin-bottom: 10px;
		margin: 0 auto;
		@media (max-width: 768px) {
			width: 100%;
			height: 300px;
		}
	`;
	return (
		<ContainerWrapper>
			{/* <Header>ADD PRODUCT</Header> */}
			<Header>
				<ImageContainer>
					<Image src={process.env.PUBLIC_URL + '/logo.png'} />
					{/* <Header>ADD PRODUCT</Header> */}
				</ImageContainer>
			</Header>
			<AddProduct />
		</ContainerWrapper>
	);
};

export default Add;
