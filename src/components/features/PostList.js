import { Card, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/postsRedux';
import { useNavigate } from 'react-router-dom';
import dateToStr from '../../utils/dateToStr';
import { getPostsByCategory } from '../../redux/postsRedux';
import styles from './PostList.module.scss';

const PostList = (props) => {
	const navigate = useNavigate();
	const posts = useSelector((state) => {
		if (!props.category) {
			return getAllPosts(state);
		} else {
			return getPostsByCategory(state, props.category);
		}
	});
	return (
		<>
			{props.category && posts.length === 0 && <p>No posts in this category...</p>}
			<Row
				sm={1}
				md={2}
				lg={3}
				className='g-4'>
				{posts.map((post) => (
					<Col
						key={post.id}
						sm={12}
						md={6}
						lg={4}>
						<Card>
							<Card.Body>
								<Card.Title>{post.title}</Card.Title>
								<Card.Subtitle className='my-1'>
									Author:<span>{post.author}</span>
								</Card.Subtitle>
								<Card.Subtitle className='my-1'>
									Published:<span>{dateToStr(post.publishedDate)}</span>
								</Card.Subtitle>
								<Card.Subtitle className='my-1'>
									Category:<span>{post.category}</span>
								</Card.Subtitle>
								<Card.Text>{post.shortDescription}</Card.Text>
								<Button
									variant='primary'
									onClick={() => navigate(`/post/${post.id}`)}>
									Read more
								</Button>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</>
	);
};
export default PostList;
