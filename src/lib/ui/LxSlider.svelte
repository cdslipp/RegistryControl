<script>
	import { onMount, onDestroy } from 'svelte';
	import { writable, get } from 'svelte/store';
	import debounce from 'lodash-es/debounce';

	export let lightSetName;

	/** @type {string} */
	export let label;

	const debouncedUpdateLightLevel = debounce(updateLightLevel, 200); // Adjust the delay as needed

	// A reactive statement at the top level of your script, not inside onMount
	$: if (lightSetName && typeof window !== 'undefined') {
		debouncedUpdateLightLevel($percentage);
		console.log(`[onMount] Setting up light level for ${lightSetName}`);
	}

	onDestroy(() => {
		debouncedUpdateLightLevel.cancel(); // Cancel any pending debounced calls
		console.log(`[onDestroy] Cleanup code for ${lightSetName}`);
		// No need to change this if it doesn't involve direct lxApi calls
	});

	const percentage = writable(0);
	let containerHeight = 0;
	let contentHeight = 0;
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
			percentage.set(data.averageLevel);
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

	function onScroll(event) {
		const scrolled = event.currentTarget.scrollTop;
		const maxScroll = contentHeight - containerHeight;
		const newPercentage = (scrolled / maxScroll) * 100;
		percentage.set(newPercentage);
	}

	function updateFill(newPercentage) {
		const currentPercentage = $percentage;
		const difference = Math.abs(currentPercentage - newPercentage);

		// If the jump is significant, animate the transition
		if (difference > 5) {
			const duration = 500; // Duration of the animation in milliseconds
			const start = Date.now();

			const animate = () => {
				const timePassed = Date.now() - start;
				const progress = timePassed / duration;

				if (progress < 1) {
					const updatedPercentage =
						currentPercentage + (newPercentage - currentPercentage) * progress;
					percentage.set(updatedPercentage);
					requestAnimationFrame(animate);
				} else {
					percentage.set(newPercentage);
				}
			};

			requestAnimationFrame(animate);
		} else {
			percentage.set(newPercentage);
		}
	}
</script>

<svelte:window bind:scrollY />

<div class="slider-wrapper">
	<div class="slider-labels">
		<h3>{label}</h3>
		<span>{$percentage.toFixed(0)}%</span>
	</div>
	<div
		class="slider-container"
		on:scroll={onScroll}
		on:click={() => updateFill($percentage === 0 ? 100 : 0)}
		bind:clientHeight={containerHeight}
		role="slider"
	>
		<div class="slider-content" bind:clientHeight={contentHeight}>
			<div class="slider-fill" style="height: {Math.max(1, $percentage)}%" />
		</div>
	</div>
</div>

<style>
	.slider-wrapper{
		
	}
	.slider-container {
		position: relative;
		overflow-y: scroll;
		grid-column: 3;
		grid-row: 2 / span 2;
		height: 100%;
		width: 100%;
		background-color: var(--SliderColor);
		border-radius: 1.5rem;
	}

	.slider-container::-webkit-scrollbar {
		display: none;
	}

	.slider-content {
		position: relative;
		border: 20px solid;
		height: 150%;
	}

	.slider-fill {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: var(--OnColor);
	}

	.slider-labels {
		position: absolute;
		background-color: orange;
		width: 100%;
		height: 100%;
		z-index: 10; /* Ensures labels stay on top */
		color: white;
		pointer-events: none;
	}

	.slider-labels h3 {
		color: var(--button-text);
		font-family: sans-serif;
		scroll-behavior: none;
	}

	/* Other existing styles remain unchanged */
</style>
