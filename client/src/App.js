import styled from 'styled-components';
import ContainerWrapper from './components/Container';
import AddProduct from './components/AddProduct';
import ListProduct from './components/ListProduct';
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
				<ListProduct />
			</ContainerWrapper>
		</>
	);
}

export default App;
