import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCategoryByName } from '../../redux/categoriesRedux';
import PostList from '../features/PostList';

const CategoryShow = () => {
	const { categoryName } = useParams();
	const category = useSelector((state) => getCategoryByName(state, categoryName));

	if (!category) return <Navigate to='/categories' />;
	return (
		<>
			<h1>Category: {category.name}</h1>
			<PostList category={category.name} />
		</>
	);
};

export default CategoryShow;
