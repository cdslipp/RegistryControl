<script>
    import { onMount } from 'svelte';
    import SvelteMarkdown from 'svelte-markdown';
    
    export let article = "";
  
    let content = "";
  
    $: if (article) {
      (async () => {
        try {
            console.log("Loading markdown:", article);
          const response = await fetch(`/markdown/help/${article}.md`);
          if (response.ok) {
            content = await response.text();
          } else {
            console.error("Failed to load markdown. HTTP Status:", response.status);
            content = "Error loading content.";
          }
        } catch (error) {
          console.error("Failed to load markdown:", error);
          content = "Error loading content.";
        }
      })();
    }
</script>
  
<SvelteMarkdown source={content} />
