<script>
	import { onMount } from 'svelte';
	import { showMode } from "$lib/stores";
	import { page } from '$app/stores';
	import Locked from '$lib/Locked.svelte';
	import MainGrid from '$lib/MainGrid.svelte';
	
	let previousShowMode = $showMode;
	
	$: if ($showMode !== previousShowMode) {
	  startTransition();
	  previousShowMode = $showMode;
	}
  
	async function startTransition() {
	  if (document.startViewTransition) {
		await new Promise((resolve) => {
		  document.startViewTransition(async () => {
			// force Svelte to re-render the DOM by invalidating the page store
			page.set($page);
			resolve();
		  });
		});
	  }
	}
  </script>
  

{#if $showMode}
  <Locked />
{:else if !$showMode}
<MainGrid />
{/if}
