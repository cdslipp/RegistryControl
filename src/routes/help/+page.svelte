<script>
	import Help from "$lib/help/Help.svelte";

	export let data

	let articles = data.articles;
	console.log(data.articles);

</script>
<Help {articles}/>