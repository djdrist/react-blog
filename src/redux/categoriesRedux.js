const createActionName = (actionName) => `app/categories/${actionName}`;

//selectors

export const getCategories = (state) => state.categories;
export const getCategoryByName = ({ categories }, categoryName) => categories.find((category) => category.name.toLowerCase() === categoryName.toLowerCase());

// actions

// action creators

const categoriesReducer = (statePart = [], action) => {
	switch (action.type) {
		default:
			return statePart;
	}
};

export default categoriesReducer;
