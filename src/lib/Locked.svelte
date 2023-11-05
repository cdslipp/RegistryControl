<script>
	import Nav from './Nav.svelte';
</script>

<Nav mainHeader="Show in progress." />
<div class="locked-out">
	<img src="lock.svg" class="lock-icon" alt="Lock icon" />
	<h2>Show in progress.</h2>
	<div class="message">
		<p>Standard Rental</p>
		<p>Wed, Aug 8, 2023</p>
	</div>
	<button class="unlock-button">UNLOCK</button>
</div>

<style>
	.locked-out {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh; /* Full viewport height */
		background-color: black;
		color: white;
		font-family: 'Arial', sans-serif; /* Example font */
	}

	.lock-icon {
		margin-bottom: 1rem; /* Space below the lock icon */
	}

	.message {
		margin-bottom: 2rem; /* Space below the message */
	}

	.unlock-button {
		background-color: orange;
		border: none;
		padding: 1rem 2rem;
		font-size: 1.2rem;
		color: white;
		cursor: pointer;
		border-radius: 8px; /* Rounded corners */
	}

	/* Adjust button on hover */
	.unlock-button:hover {
		background-color: darkorange;
	}
</style>
