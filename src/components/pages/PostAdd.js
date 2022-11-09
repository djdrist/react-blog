import { Container } from 'react-bootstrap';
import AddPostForm from '../features/AddPostForm';

const PostAdd = () => {
	return (
		<Container className='w-75'>
			<h1>Add Post</h1>
			<AddPostForm />
		</Container>
	);
};

export default PostAdd;
