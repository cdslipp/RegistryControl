<script>
	import { onMount, onDestroy } from 'svelte';
	import { writable, get } from 'svelte/store';
	import debounce from 'lodash-es/debounce';
	import FillSlider from './FillSlider.svelte';

	export let lightSetName;

	/** @type {string} */
	export let label;

	const debouncedUpdateLightLevel = debounce(updateLightLevel, 200); // Adjust the delay as needed

	// A reactive statement at the top level of your script, not inside onMount
	$: if (lightSetName && typeof window !== 'undefined') {
		debouncedUpdateLightLevel(percentage);
		console.log(`[onMount] Setting up light level for ${lightSetName}`);
	}

	onDestroy(() => {
		debouncedUpdateLightLevel.cancel(); // Cancel any pending debounced calls
		console.log(`[onDestroy] Cleanup code for ${lightSetName}`);
		// No need to change this if it doesn't involve direct lxApi calls
	});

	let percentage = 0;
	let containerHeight = 0;
	let contentHeight = 0;
	let initialFillBottom = 0;
	let scrollY = 0;

	onMount(async () => {
		if (lightSetName) {
			getLightLevels(lightSetName);
		}
	});

	// Function to fetch the initial light levels from the server
	async function getLightLevels(lightSetName) {
		try {
			const response = await fetch('/lights/getLevels', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ lightSetName })
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			percentage = data.averageLevel;
		} catch (error) {
			console.error('Error fetching light level:', error);
		}
	}

	async function updateLightLevel(level) {
		try {
			console.log(`Updating light level for ${lightSetName} to ${level}`);
			const response = await fetch('/lights/setLevels', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					channels: lightSetName, // Assuming `lightSetName` contains the channels
					level
				})
			});

			const result = await response.json();
			if (response.ok) {
				// Handle success
				console.log(result);
			} else {
				// Handle the error response from the server
				throw new Error(result.error || 'An error occurred while setting the light level');
			}
		} catch (error) {
			console.error('Error setting light level:', error);
		}
	}

</script>

<div id="{lightSetName}-slider" class=slider-wrapper>
	<FillSlider label="House Lights" bind:percentage/>
</div>

<style>
	.slider-wrapper {
		grid-row: 2 / span 2;
	}

</style>

