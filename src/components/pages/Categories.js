import { useSelector } from 'react-redux';
import { getCategories } from '../../redux/categoriesRedux';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Categories = () => {
	const categories = useSelector((state) => getCategories(state));
	return (
		<Container className='w-75'>
			<h1>All categories</h1>
			{categories.map((category) => (
				<Card key={category.id}>
					<Card.Body>
						<Link to={`/category/${category.name.toLowerCase()}`}>{category.name}</Link>
					</Card.Body>
				</Card>
			))}
		</Container>
	);
};

export default Categories;
