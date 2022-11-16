import { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import ReactQuill from 'react-quill';
import { useForm, Controller } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';

const PostForm = ({ action, actionText, postData }) => {
	const navigate = useNavigate();
	const [newPost, setNewPost] = useState({
		content: postData?.content || '',
		publishedDate: postData?.publishedDate || '',
	});

	const [contentError, setContentError] = useState(false);
	const [dateError, setDateError] = useState(false);

	const { title, shortDescription, content, publishedDate, author } = newPost;
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: postData?.title || '',
			shortDescription: postData?.shortDescription || '',
			author: postData?.author || '',
		},
	});

	const handleFormSubmit = (data) => {
		const payload = {
			id: postData?.id || shortid.generate(),
			author: data.author,
			title: data.title,
			shortDescription: data.shortDescription,
			content: newPost.content,
			publishedDate: newPost.publishedDate,
		};
		setContentError(!content);
		setDateError(!publishedDate);
		if (content && publishedDate) {
			action(payload);
			navigate('/');
		}
	};

	return (
		<Form onSubmit={handleSubmit(handleFormSubmit)}>
			<Form.Group
				className='mb-3 w-50'
				controlId='title'>
				<Form.Label>Title</Form.Label>
				<Controller
					name='title'
					control={control}
					rules={{ required: true, minLength: 3 }}
					render={({ field }) => (
						<Form.Control
							type='text'
							placeholder='Enter title'
							value={title}
							{...field}
						/>
					)}
				/>
				{errors.title && <small className='d-block form-text text-danger mt-2'>This field is required (min: 3)</small>}
			</Form.Group>
			<Form.Group
				className='mb-3 w-50'
				controlId='author'>
				<Form.Label>Author</Form.Label>
				<Controller
					name='author'
					control={control}
					rules={{ required: true, minLength: 3 }}
					render={({ field }) => (
						<Form.Control
							type='text'
							placeholder='Enter author'
							value={author}
							{...field}
						/>
					)}
				/>
				{errors.author && <small className='d-block form-text text-danger mt-2'>This field is required (min: 3)</small>}
			</Form.Group>
			<Form.Group
				className='mb-3 w-50'
				controlId='published'>
				<Form.Label>Published</Form.Label>
				<DatePicker
					selected={publishedDate}
					onChange={(date) => setNewPost({ ...newPost, publishedDate: date })}
				/>
				{dateError && <small className='d-block form-text text-danger mt-2'>Date can't be empty</small>}
			</Form.Group>
			<Form.Group
				className='mb-3 w-100'
				controlId='description'>
				<Form.Label>Short description</Form.Label>
				<Controller
					name='shortDescription'
					control={control}
					rules={{ required: true, minLength: 20 }}
					render={({ field }) => (
						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Enter short description'
							value={shortDescription}
							{...field}
						/>
					)}
				/>
				{errors.shortDescription && <small className='d-block form-text text-danger mt-2'>This field is required (min: 20)</small>}
			</Form.Group>
			<Form.Group
				className='mb-3 w-100'
				controlId='content'>
				<Form.Label>Main content</Form.Label>
				<ReactQuill
					theme='snow'
					value={content}
					onChange={(content) => setNewPost({ ...newPost, content: content })}
				/>
				{contentError && <small className='d-block form-text text-danger mt-2'>Content can't be empty</small>}
			</Form.Group>
			<Button
				type='submit'
				variant='primary'>
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
