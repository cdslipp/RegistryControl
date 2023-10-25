<script context="module">
  import HelpArticle from '$lib/HelpArticle.svelte';
  
  export async function load({ params }) {
    return { props: { article: params.article } };
  }
</script>

<script>
  export let article;
  import { onMount } from 'svelte';
  
  onMount(() => {
    console.log("article:", article);
  });
</script>

<HelpArticle {article} />
