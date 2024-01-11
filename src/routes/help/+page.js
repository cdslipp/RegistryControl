export const load = async ({ fetch }) => {
	const response = await fetch(`/api/help`);
	const articles = await response.json();

	return {
		articles
	};
};