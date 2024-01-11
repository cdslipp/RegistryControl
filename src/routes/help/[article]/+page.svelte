<script>
	import HelpArticle from '$lib/help/HelpArticle.svelte';
	export let data;
  console.log(data.article);

  console.log(data.article);
  // let article = props.article;

</script>

<HelpArticle>
  <svelte:component this={data.content} />

</HelpArticle>

