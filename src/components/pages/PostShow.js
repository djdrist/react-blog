import { Container, Button, Modal } from 'react-bootstrap';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPostById, deletePost } from '../../redux/postsRedux';
import { useState } from 'react';

const PostShow = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const post = useSelector((state) => getPostById(state, id));
	const dispatch = useDispatch();

	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);
	const handleDeletePost = () => {
		dispatch(deletePost(post.id));
		setShowModal(false);
	};

	if (!post) return <Navigate to='/' />;
	else
		return (
			<>
				<Modal
					show={showModal}
					onHide={handleCloseModal}>
					<Modal.Header closeButton>
						<Modal.Title>Are You sure?</Modal.Title>
					</Modal.Header>
					<Modal.Body>You are about to remove this post from the app!</Modal.Body>
					<Modal.Footer>
						<Button
							variant='secondary'
							onClick={handleCloseModal}>
							Cancel
						</Button>
						<Button
							variant='danger'
							onClick={handleDeletePost}>
							Remove
						</Button>
					</Modal.Footer>
				</Modal>
				<Container className='w-50'>
					<div className='d-flex my-3'>
						<div className='me-auto'>
							<h2>{post.title}</h2>
						</div>
						<div>
							<Button
								className='mx-1'
								variant='outline-info'
								onClick={() => navigate(`/post/edit/${post.id}`)}>
								Edit
							</Button>
							<Button
								className='mx-1'
								variant='outline-danger'
								onClick={handleShowModal}>
								Delete
							</Button>
						</div>
					</div>
					<p className='my-0 fw-bold'>
						Author: <span>{post.author}</span>
					</p>
					<p className='fw-bold'>
						Published: <span>{post.publishedDate}</span>
					</p>
					<p>{post.content}</p>
				</Container>
			</>
		);
};

export default PostShow;
