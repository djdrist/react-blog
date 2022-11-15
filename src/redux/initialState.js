const initialState = {
	posts: [
		{
			id: '1',
			title: 'Article title',
			shortDescription: 'Short description of the article...',
			content: 'Main content of the article',
			publishedDate: new Date('02-02-2022'),
			author: 'John Doe',
		},
		{
			id: '2',
			title: 'New article',
			shortDescription: 'All the best news',
			content: 'lorem lorem',
			publishedDate: new Date('02-05-2022'),
			author: 'Martin X',
		},
		{
			id: '3',
			title: 'Best thing',
			shortDescription: 'Best news',
			content: 'lorem lorem ipsum',
			publishedDate: new Date('02-05-2022'),
			author: 'Janet K',
		},
	],
};

export default initialState;
