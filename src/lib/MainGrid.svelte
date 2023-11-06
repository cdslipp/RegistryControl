<script>
	import ToggleButton from './ui/ToggleButton.svelte';
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
	<button id="showModeButton">
		<h2>SHOW MODE</h2>
	</button>
	<CompanionButton
		page={1}
		button={1}
		isToggle={true}
	/>
	<button id="projector-button">
		<h2>Projector</h2>
	</button>
	<LxSlider lightSetName="house" label="House Lights" />
	<button id="video-button">
		<a href="/video"><h3>Video</h3></a>
	</button>
	<button id="help-button">
		<a href="/help"><h3>Help</h3></a>
	</button>
</section>

<style>
#main-grid {
    display: grid;
    margin: auto;
    padding: 0.2rem;
    width: 100%;
    height: 70dvh;
    grid-template-rows: repeat(3, 1fr);
    /* 3 rows of equal height */
    grid-template-columns: repeat(3, 1fr);
    /* 3 columns of equal width */
    grid-gap: 0.8em;
    /* Space between grid items */
}

#main-grid button {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0.2rem;
    align-items: center;
    justify-content: center;
    border-radius: 1.5rem;
}

#showModeButton {
    grid-column: 1 / span 2;
    font-size: 3rem;
    background-color: var(--orange);
}

/* Grid positioning */

#projector-button {
    grid-column: 1 / span 2;
    background-color: var(--blue);
    /* Span across 2 columns */
}

#help-button {
    background-color: var(--yellow);
}

#lx-button {
    background-color: var(--blue);
}
</style>