import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import PostShow from './components/pages/PostShow';
import PostAdd from './components/pages/PostAdd';
import PostEdit from './components/pages/PostEdit';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import { Container } from 'react-bootstrap';
import Header from './components/views/Header';
import Footer from './components/views/Footer';
import Categories from './components/pages/Categories';
import CategoryShow from './components/pages/CategoryShow';

function App() {
	return (
		<Container>
			<Header />
			<Routes>
				<Route
					path='/'
					exact
					element={<Home />}
				/>
				<Route
					path='/post/:id'
					element={<PostShow />}
				/>
				<Route
					path='/post/add'
					element={<PostAdd />}
				/>
				<Route
					path='/post/edit/:id'
					element={<PostEdit />}
				/>
				<Route
					path='/categories'
					element={<Categories />}
				/>
				<Route
					path='/category/:categoryName'
					element={<CategoryShow />}
				/>
				<Route
					path='/about'
					element={<About />}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
			<Footer />
		</Container>
	);
}

export default App;
