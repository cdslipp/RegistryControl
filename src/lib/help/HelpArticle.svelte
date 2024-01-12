<script>
</script>

<div id="article-wrapper">
	<slot />
</div>

<style>
	/* Article Wrapper Styles */
	#article-wrapper {
		background: #333333; /* Adjusted lighter grey */
		padding: 1rem;
		font-family: 'Inter', sans-serif; /* Using Inter */
		color: var(--primary-text); /* Consistent text color */
		line-height: 1.6; /* Improved line height for readability */
		max-width: 800px; /* Optimal reading width */
		margin: auto; /* Center align the wrapper */
	}
</style>
