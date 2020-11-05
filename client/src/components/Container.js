import React from 'react';
import styled from 'styled-components';

// For Wrapper the ALl Components
const ContainerWrapper = styled.div`
	max-width: 1220px;
	margin: auto;
	height: auto;
	width: 100%;
	background-color: transparent;
	margin-top: 10px;
	margin-bottom: 10px;
`;

const Container = ({ children }) => {
	return <ContainerWrapper>{children}</ContainerWrapper>;
};

export default Container;
