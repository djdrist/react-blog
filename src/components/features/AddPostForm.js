import { addPost } from '../../redux/postsRedux';
import { useDispatch } from 'react-redux';
import PostForm from './PostForm';

const AddPostForm = () => {
	const dispatch = useDispatch();

	const handleAddPost = (newPost) => {
		dispatch(addPost(newPost));
	};
	return (
		<PostForm
			action={handleAddPost}
			actionText='Add post'
		/>
	);
};

export default AddPostForm;
