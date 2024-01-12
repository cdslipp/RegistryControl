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
	let initialFillBottom = 0;
	let scrollY = 0;

	onMount(async () => {
		if (lightSetName) {
			getLightLevels(lightSetName);
		}
		initialFillBottom = calculateInitialFillBottom();
		console.log('Height calculation:', { containerHeight, contentHeight, initialFillBottom });
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
		console.log('Scroll position:', scrolled);
		const scrollableHeight = (contentHeight - containerHeight) * 2; // Total scrollable height
		console.log('Scrollable height:', scrollableHeight);
		const newPercentage = Math.min(100, Math.max(0, (scrolled / scrollableHeight) * 100));
		percentage.set(newPercentage);
	}

	function calculateInitialFillBottom() {
		// Calculate the initial position based on the actual heights
		return contentHeight - containerHeight; // Adjust this calculation as needed
	}

	function updateFill(newPercentage) {
    const duration = 500; // Duration of the animation in milliseconds
    const start = Date.now();

    const scrollableHeight = (contentHeight - containerHeight) * 2;
    const targetScrollTop = (newPercentage / 100) * scrollableHeight;
    const currentScrollTop = document.querySelector('.slider-container').scrollTop;
    const distanceToScroll = targetScrollTop - currentScrollTop;

    const animateScroll = () => {
        const timePassed = Date.now() - start;
        const progress = Math.min(timePassed / duration, 1); // Ensure progress doesn't exceed 1

        const scrollTop = currentScrollTop + (distanceToScroll * progress);
        document.querySelector('.slider-container').scrollTop = scrollTop;

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        } else {
            percentage.set(newPercentage); // Update the percentage at the end of the animation
        }
    };

    requestAnimationFrame(animateScroll);
}


</script>

<svelte:window bind:scrollY />

<div id="{lightSetName}-slider" class="slider-wrapper">
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
			<div
				class="slider-fill"
				style="height: {containerHeight}px; bottom: -{initialFillBottom}px"
			/>
		</div>
	</div>
</div>

<style>
	.slider-wrapper {
		position: relative;
		grid-row: 2 / span 2;
		height: 100%;
		width: 100%;
		border-radius: 1.5rem;
		background-color: var(--SliderColor);
	}
	.slider-container {
		overflow-y: scroll;
		/* overflow: visible; */
		height: 100%;
		width: 100%;
		scroll-behavior: smooth;
		border-radius: 1.5rem;
		padding: 0px;
	}

	.slider-container::-webkit-scrollbar {
		display: none;
	}

	.slider-content {
		overflow: visible;
		border: solid orange;
		position: relative;
		scroll-behavior: smooth;
		height: 150%;
		padding: 0px;
		border: solid orange;
	}

	.slider-fill {
		position: absolute;
		/* bottom: -193px; */
		left: 0;
		right: 0;
		padding: 0px;
		background-color: var(--OnColor);
	}

	.slider-labels {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 10; /* Ensures labels stay on top */
		color: white;
		pointer-events: none;
		scroll-behavior: none;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.slider-labels h3 {
		color: var(--button-text);
		font-family: var(--main-font);
		font-size: 2rem;
		scroll-behavior: none;
		text-align: center;
	}

	.slider-labels span {
		color: var(--button-text);
		font-family: var(--main-font);
		font-weight: 200;
		font-size: 3.2rem;
		padding-bottom: 1rem;
	}
</style>
