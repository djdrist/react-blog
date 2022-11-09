import { Container } from 'react-bootstrap';
import EditPostForm from '../features/EditPostForm';

const PostEdit = () => {
	return (
		<Container className='w-75'>
			<h1>Edit Post</h1>
			<EditPostForm />
		</Container>
	);
};

export default PostEdit;
