import { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import ReactQuill from 'react-quill';
import { useForm, Controller } from 'react-hook-form';
import { getCategories } from '../../redux/categoriesRedux';
import { useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';

const PostForm = ({ action, actionText, postData }) => {
	const categories = useSelector((state) => getCategories(state));

	const navigate = useNavigate();
	const [newPost, setNewPost] = useState({
		content: postData?.content || '',
		publishedDate: postData?.publishedDate || '',
		category: postData?.category || '',
	});

	const [contentError, setContentError] = useState(false);
	const [dateError, setDateError] = useState(false);
	const [categoryError, setCategoryError] = useState(false);

	const { title, content, publishedDate, author, category, shortDescription } = newPost;
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
			category: newPost.category,
		};
		setContentError(!content);
		setDateError(!publishedDate);
		setCategoryError(!categoryError);
		if (content && publishedDate && category) {
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
				controlId='category'>
				<Form.Label>Category</Form.Label>
				<Form.Select
					aria-label='Default select example'
					value={newPost.category}
					onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}>
					<option value=''>Select category</option>
					{categories.map((category) => (
						<option
							key={category.id}
							value={category.name}>
							{category.name}
						</option>
					))}
				</Form.Select>
				{categoryError && <small className='d-block form-text text-danger mt-2'>Please choose category</small>}
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
