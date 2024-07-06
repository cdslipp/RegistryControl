<script>
	import { onMount } from 'svelte';
	import { sendCompanionCommand } from '$lib/companion/companion.js';

	export let page;
	export let label = 'Click me';
	export let button;
	export let isToggle = false;
	export let on = false;

	const handlePress = async () => {
		if (isToggle) {
			on = !on;
		}
		await sendCompanionCommand(page, button);
	};

	// If needed, you could set up a listener here to listen for
	// changes in the button state from the Companion server.
	onMount(() => {
		// Some initialization if necessary.
	});
</script>

<button on:click={handlePress} class:active={isToggle && on}>
	{#if isToggle}
		<h4>WORK LIGHTS</h4>
		<h2>{on ? 'ON' : 'OFF'}</h2>
	{:else}
		<span>{label}</span>
	{/if}
</button>

<style>
	button {
		background-color: var(--OffColor);
		border: none;
		padding: 8px 16px;
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: background-color 0.3s;
	}
	button.active {
		background-color: var(--OnColor);
	}
</style>
