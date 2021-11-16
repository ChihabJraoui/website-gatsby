const path = require(`path`);
const {slash} = require(`gatsby-core-utils`);

exports.createPages = async ({graphql, actions}) =>
{
	const {createPage} = actions;

	const result = await graphql(`
		query {
			allWordpressPost {
				edges {
					node {
						id
						slug
					}
				}
			}
		}
	`);

	const postTemplate = path.resolve(`./src/templates/post.js`);

	result.data.allWordpressPost.edges.forEach(edge =>
	{
		createPage({
			path: edge.node.slug,
			component: slash(postTemplate),
			context: {
				id: edge.node.id,
			},
		});
	});
}
