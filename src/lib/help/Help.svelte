<script>
</script>

<section class="grid-layout">
	<a href="/" class="nav-button default-button" id="back-button">
		<div>
			<h2>←</h2>
		</div>
	</a>

	<div class="default-button tile">
		<h2>Contact Information</h2>
		<p>Cameron Slipp</p>
		<p>(506) 425-0651</p>
		<p>atd@registrytheatre.com</p>
	</div>
</section>

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
