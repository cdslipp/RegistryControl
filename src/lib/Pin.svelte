<script>
	import { onMount } from 'svelte';
	import { toggleShowMode } from './db/showmode';
	import { goto } from '$app/navigation';

	let pin = ''; // The current PIN
	const testPin = '1234'; // Hardcoded test PIN

	function appendToPin(num) {
		pin += num;
		if (pin.length === 4) {
			submitPin();
		}
	}

	function deleteFromPin() {
		pin = pin.slice(0, -1); // remove the last digit
	}

	function submitPin() {
		// Here you can implement the logic to authenticate against your "pins" collection
		if (pin === testPin) {
			// Handle correct PIN
			console.log('PIN correct');
			toggleShowMode();
			goto('/');
		} else {
			// Handle incorrect PIN
			console.log('PIN incorrect');
		}

		pin = ''; // Reset pin after submit attempt
	}

	onMount(() => {
		// your initialization code, if any
	});
</script>

<div class="pin-container">
	<img src="lock.svg" alt="Lock icon" />
	<div class="pin-display">
		<h2>Enter pin to unlock</h2>
		<div class="pin-dots">
			{#each Array(4) as _, i}
				<span class="dot">{i < pin.length ? '*' : ''}</span>
			{/each}
		</div>
	</div>
	<div class="custom-keyboard">
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as num}
			<button class="key" on:click={() => appendToPin(num)}>{num}</button>
		{/each}
		<button class="key delete" on:click={deleteFromPin}>⌫</button>
		<button class="key" on:click={() => appendToPin('0')}>0</button>
	</div>
</div>

<style>
	.pin-container {
		display: grid;
		grid-template-rows: auto 1fr;
		width: 100%;
		justify-items: center;
		align-content: center;
		background-color: var(--primary-bg);
	}

	.pin-display {
		text-align: center;
	}

	.pin-dots {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	.dot {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: var(--SliderColor);
		margin: 0 5px;
		display: inline-block;
	}

	.custom-keyboard {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 14px;
		width: 80%;
		margin-top: 30px;
	}

	.key {
		aspect-ratio: 1/1;
		font-size: 1.5rem;
		color: var(--button-text);
		background-color: var(--default-buttons);
		border: none;
		border-radius: var(--border-radius);
		touch-action: manipulation;
		transition: background-color 0.2s;
	}

	.delete {
		aspect-ratio: 2/1;
	}

	.key:hover {
		background-color: var(--OnColor);
	}

	.delete {
		grid-column: span 2;
	}

	label {
		display: block;
		color: var(--primary-text);
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
</style>
