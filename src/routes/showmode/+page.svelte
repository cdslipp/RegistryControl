<script>
	import { toggleShowMode } from '$lib/db/showmode';
    import { showMode } from '$lib/stores'; // Update the path to include the main store

    // No need to create a local state, you can use `showMode` directly in your markup
    // since it's a Svelte store and hence reactive by nature.
</script>

<button on:click="{toggleShowMode}">
    {#if $showMode} <!-- Notice the use of the $ prefix to access store's value directly -->
        Turn Off Show Mode
    {:else}
        Turn On Show Mode
    {/if}
</button>
