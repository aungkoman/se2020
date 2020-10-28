import React from 'react';
import styled from 'styled-components';

// For Wrapper the ALl Components
const ContainerWrapper = styled.div`
	max-width: 750px;
	margin: auto;
	height: auto;
	width: 100%;
	background-color: transparent;
`;

const Container = ({ children }) => {
	return <ContainerWrapper>{children}</ContainerWrapper>;
};

export default Container;
