<script>
	import Nav from './Nav.svelte';
</script>

<Nav headerLine1="Show in progress." headerLine2="" />
<div class="locked-out">
	<img src="lock.svg" class="lock-icon" alt="Lock icon" />
	<a href="/pin" class="unlock-button">UNLOCK</a>
</div>

<style>
	.locked-out {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 60dvh; /* Full viewport height */
		color: white;
		font-family: 'Arial', sans-serif; /* Example font */
	}

	.lock-icon {
		margin-bottom: 1rem; /* Space below the lock icon */
	}

	.message {
		margin-bottom: 2rem; /* Space below the message */
		text-align: center;
	}

	.unlock-button {
		background-color: orange;
		text-align: center;
		text-decoration: none;
		border: none;
		padding: 2rem;
		width: 30%;
		font-size: 1.2rem;
		color: white;
		cursor: pointer;
		border-radius: var(--border-radius); /* Rounded corners */
	}

	/* Adjust button on hover */
	.unlock-button:hover {
		background-color: darkorange;
	}
</style>
