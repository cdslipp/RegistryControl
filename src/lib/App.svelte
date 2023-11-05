<script>
  import { showMode } from '$lib/stores';
  import { toggleShowMode } from '$lib/db/showmode';
	import Locked from './Locked.svelte';
	import MainGrid from './MainGrid.svelte';

  console.log("showMode: ", $showMode);
</script>

{#if $showMode}
  <Locked />
{:else}
<MainGrid />
{/if}


