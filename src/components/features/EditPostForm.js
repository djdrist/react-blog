import { editPost } from '../../redux/postsRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import PostForm from './PostForm';
import { getPostById } from '../../redux/postsRedux';

const EditPostForm = () => {
	const { id } = useParams();
	const post = useSelector((state) => getPostById(state, id));
	const dispatch = useDispatch();

	const handleEditPost = (newPost) => {
		dispatch(editPost(newPost));
	};
	if (!post) return <Navigate to='/' />;
	else
		return (
			<PostForm
				action={handleEditPost}
				actionText='Edit post'
				postData={post}
			/>
		);
};

export default EditPostForm;
