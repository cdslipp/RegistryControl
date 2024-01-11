export async function load({ params }) {
    const article = params.article;

    const articleModule = await import(`../markdown/${params.article}.md`);
    console.log("articleModule", articleModule);

    let content = articleModule.default;

    console.log(article);
    return {article, content};
}
