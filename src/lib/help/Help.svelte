<script>
	export let articles;
</script>

<div id="help-dashboard">
	<div id="contact-info">
		<h2>Contact Information:</h2>
		<p>Cameron Slipp</p>
		<p>(506) 425-0651</p>
		<p>atd@registrytheatre.com</p>
	</div>

	<div id="help-grid">
		{#each articles as topic}
			<a href={topic.path} class="tile">
				<h3>{topic.meta.title}</h3>
			</a>
		{/each}
	</div>
</div>

<style>
	#help-dashboard {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#contact-info {
		margin-bottom: 2rem;
	}

	#help-grid {
		display: grid;
		width: 80vw;
		max-height: 80vh;
		grid-template-rows: repeat(3, 1fr);
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 0.3em;
	}

	#help-grid .tile {
		text-decoration: none;
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 0.2rem;
		align-items: center;
		justify-content: center;
		border-radius: 1.5rem;
		background-color: var(--default-buttons);
	}
</style>
