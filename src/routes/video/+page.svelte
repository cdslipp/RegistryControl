<script>
	import Nav from '$lib/Nav.svelte';

</script>

<Nav headerLine1="Projector or Cams?" headerLine2=""/>
<section id="main-grid">
	<a href="/video/projector" class="nav-button default-button">
		<div>
			<h2>Projector</h2>
		</div>
	</a>
	<a href="/video/cameras" class="nav-button default-button">
		<div>
			<h2>Cameras</h2>
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

	:global(#house-slider) {
		grid-column: 3;
	}

</style>
