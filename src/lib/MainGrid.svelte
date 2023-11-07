<script>
	import ToggleButton from './ui/ToggleButton.svelte';
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
	<button id="showModeButton" on:click={toggleShowMode}>
		<h2>SHOW MODE</h2>
	</button>
	<CompanionButton page={1} button={1} isToggle={true} />
	<a href="/lights" class="nav-button" id="lighting-button">
		<div>
			<h2>LIGHTING</h2>
		</div>
	</a>
	<LxSlider lightSetName="house" label="HOUSE LIGHTS" />
	<a href="/help" id="help-button" class="nav-button">
		<div>
			<h2>HELP</h2>
		</div>
	</a>
	<a href="/video" id="video-button" class="nav-button">
		<div>
			<h2>VIDEO</h2>
		</div>
	</a>
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
