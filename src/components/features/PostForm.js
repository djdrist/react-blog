import { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PostForm = ({ action, actionText, postData }) => {
	const navigate = useNavigate();
	const [newPost, setNewPost] = useState({
		id: postData?.id || shortid.generate(),
		title: postData?.title || '',
		shortDescription: postData?.shortDescription || '',
		content: postData?.content || '',
		publishedDate: postData?.publishedDate || '',
		author: postData?.author || '',
	});

	const { title, shortDescription, content, publishedDate, author } = newPost;

	const handleFormSubmit = (e) => {
		e.preventDefault();
		action(newPost);
		navigate('/');
	};

	return (
		<Form>
			<Form.Group
				className='mb-3 w-50'
				controlId='title'>
				<Form.Label>Title</Form.Label>
				<Form.Control
					type='text'
					placeholder='Enter title'
					value={title}
					onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
				/>
			</Form.Group>
			<Form.Group
				className='mb-3 w-50'
				controlId='author'>
				<Form.Label>Author</Form.Label>
				<Form.Control
					type='text'
					placeholder='Enter author'
					value={author}
					onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
				/>
			</Form.Group>
			<Form.Group
				className='mb-3 w-50'
				controlId='published'>
				<Form.Label>Publilshed</Form.Label>
				<Form.Control
					type='text'
					placeholder='Enter date'
					value={publishedDate}
					onChange={(e) => setNewPost({ ...newPost, publishedDate: e.target.value })}
				/>
			</Form.Group>
			<Form.Group
				className='mb-3 w-100'
				controlId='description'>
				<Form.Label>Short description</Form.Label>
				<Form.Control
					as='textarea'
					rows={5}
					placeholder='Enter short description'
					value={shortDescription}
					onChange={(e) => setNewPost({ ...newPost, shortDescription: e.target.value })}
				/>
			</Form.Group>
			<Form.Group
				className='mb-3 w-100'
				controlId='content'>
				<Form.Label>Main content</Form.Label>
				<Form.Control
					as='textarea'
					rows={15}
					placeholder='Enter post content'
					value={content}
					onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
				/>
			</Form.Group>
			<Button
				type='submit'
				variant='primary'
				onClick={handleFormSubmit}>
				{actionText}
			</Button>
		</Form>
	);
};

export default PostForm;

PostForm.propTypes = {
	action: PropTypes.func.isRequired,
	actionText: PropTypes.string.isRequired,
};
