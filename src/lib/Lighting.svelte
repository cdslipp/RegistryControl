<script>
	import { toggleShowMode } from '$lib/db/showmode';
	import LxSlider from './ui/LxSlider.svelte';
	import { onMount } from 'svelte';
	import { activeSliders } from '$lib/lx/lxStores';
	import { fetchLightLevels } from '$lib/lx/lxApi';
	import { get, writable } from 'svelte/store';
	import CompanionButton from '$lib/companion/CompanionButton.svelte';
	import Nav from './Nav.svelte';

	const lightLevels = writable({});

	onMount(() => {
		const interval = setInterval(() => {
			const sliders = get(activeSliders);
			if (sliders.length > 0) {
				fetchLightLevels()
					.then((levels) => {
						lightLevels.set(levels);
					})
					.catch((error) => {
						console.error('Failed to fetch light levels:', error);
					});
			}
		}, 5000); // Poll every 5 seconds
		return () => clearInterval(interval);
	});
</script>

<Nav />
<section id="main-grid">
	<a href="/" id="back-button" class="nav-button default-button">
		<div>
            <h2>←</h2>
		</div>
	</a>
		<CompanionButton page={1} button={2} label="CENTRE STAGE SPOT" />
		<CompanionButton page={1} button={3} label="RESTORE BOARD CONTROL" />
		<LxSlider lightSetName="front" label="FRONT LIGHT" bind:level={$lightLevels.front} />
		<LxSlider lightSetName="side" label="SIDE LIGHTS" bind:level={$lightLevels.side} />
		<LxSlider lightSetName="top" label="TOP LIGHTS" bind:level={$lightLevels.top} />

</section>

<style>
	#main-grid {
		display: grid;
		margin: auto;
		padding: 0.2rem;
		width: 100%;
		min-height: 60vh;
		max-height: 70vh;
		grid-template-rows: repeat(3, 1fr);
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 0.8em;
	}

	#main-grid a {
		text-decoration: none; /* Remove default link styling */
	}

	#main-grid a > div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 1.5rem;
		padding: 0.2rem;
		position: relative;
		height: 100%; /* Ensure the div fills the a element for the clickable area */
		box-sizing: border-box; /* So padding doesn't affect the final size */
	}

	#showModeButton {
		grid-column: 1 / span 2;
		font-size: 3rem;
		background-color: var(--orange);
		border-radius: var(--border-radius);
	}

	.nav-button {
		border-radius: var(--border-radius);
		text-decoration: none;
	}

	.nav-button h2 {
		color: var(--button-text);
	}

    .default-button {
        background-color: var(--default-buttons);
    }

	#lighting-button {
		background-color: var(--blue);
		border-radius: var(--border-radius);
		grid-column: 1 / span 2;
	}

	#help-button {
		background-color: var(--yellow);
	}

	#video-button {
		background-color: var(--blue);
	}
</style>
