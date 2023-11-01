<script>
	import { onMount, onDestroy} from 'svelte';
	import { writable } from 'svelte/store';

	export let lightSetName;

	let unsubscribe;

	onMount(() => {
		console.log('mounted');
		// No need to change this if it doesn't involve direct lxApi calls
	});

	onDestroy(() => {
		console.log(`[onDestroy] Cleanup code for ${lightSetName}`);
		// No need to change this if it doesn't involve direct lxApi calls
	});

	const percentage = writable(0);
	let containerHeight = 0;
	let contentHeight = 0;
    let scrollY = 0;

	onMount(async () => {
		if (lightSetName) {
			try {
				const response = await fetch('/lights/dimmer', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						action: 'getLightLevel',
						lightSetName
					})
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
	});

	async function updateLightLevel(level) {
		try {
			const response = await fetch('/lights/dimmer', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					action: 'setLightLevel',
					channels: lightSetName,
					level
				})
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
		} catch (error) {
			console.error('Error setting light level:', error);
		}
	}

	$: if (lightSetName) {
		updateLightLevel($percentage);
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
		if (difference > 10) {
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

	/** @type {string} */
	export let label;
</script>

<svelte:window bind:scrollY />

<div class="slider-container" on:scroll={onScroll} on:click={() => updateFill($percentage === 0 ? 100 : 0)} bind:clientHeight={containerHeight} role=slider>
	<div class="slider-labels">
		<h3>{label}</h3>
		<span>{$percentage.toFixed(0)}%</span>
	</div>
	<div class="slider-content" bind:clientHeight={contentHeight}>
		<div class="slider-fill" style="height: {Math.max(1, $percentage)}%" />
	</div>
</div>

<style>
	.slider-container {
		position: relative;
		overflow-y: auto;
		height: 400px;
		width: 100%;
		background-color: var(--SliderColor);
		border-radius: 1.5rem;
	}

	.slider-container::-webkit-scrollbar {
		display: none;
	}

	.slider-content {
		position: relative;
		height: 425px; /* This determines how much the user can scroll */
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
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10; /* Ensures labels stay on top */
		color: white;
		pointer-events: none;
	}

	/* Other existing styles remain unchanged */
</style>
