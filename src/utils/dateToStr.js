const dateToStr = (date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return `${month}/${day}/${year}`;
};

export default dateToStr;
