import PostList from '../features/PostList';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className='d-flex my-3'>
				<div className='me-auto'>
					<h2>All posts</h2>
				</div>
				<div>
					<Button
						variant='outline-info'
						onClick={() => navigate('post/add')}>
						Add Post
					</Button>
				</div>
			</div>
			<PostList />
		</>
	);
};

export default Home;
