import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AddProduct from '../components/AddProduct';

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
const Add = () => {
	const history = useHistory();
	// To handle Logo to go back main page
	const logoHandaler = () => {
		history.push(`/`);
	};
	return (
		<ContainerWrapper>
			<Header>
				<ImageContainer>
					<Image
						style={{ cursor: 'pointer' }}
						src={process.env.PUBLIC_URL + '/logo.png'}
						onClick={logoHandaler}
					/>
				</ImageContainer>
			</Header>
			<AddProduct />
		</ContainerWrapper>
	);
};

export default Add;
