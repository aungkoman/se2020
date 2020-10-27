import ContainerWrapper from './components/Container';
import AddProduct from './components/AddProduct';
import styled from 'styled-components';

const Header = styled.h1`
	text-align: center;
	font-size: 25px;
`;
function App() {
	return (
		<>
			<ContainerWrapper>
				<Header>ADD PRODUCT</Header>
				<AddProduct />
			</ContainerWrapper>
		</>
	);
}

export default App;
