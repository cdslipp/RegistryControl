<!-- FILEPATH: /Users/cdslipp/Code/RegistryHub/src/routes/+layout.svelte -->
<script>
	import '../app.css';
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div id="wrapper">
	<div id="main-content">
		<section>
			<slot />
		</section>
	</div>
</div>
