<script>
	import { rentalType } from '$lib/stores';

	export let mainHeader = 'Welcome to the Registry'; // Default value if not provided

	let dateObj = new Date();
	/** @type {Intl.DateTimeFormatOptions} */
	let options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	let currentDate = new Intl.DateTimeFormat('en-US', options)
		.format(dateObj)
		.split(',')
		.slice(0, 2)
		.join(', ');

	let currentRentalType;
	rentalType.subscribe((value) => {
		currentRentalType = value;
	});
</script>

<header>
	<div id="logo-container">
		<img src="/registry_logo.png" alt="Theatre Logo" id="theatre-logo" />
	</div>
	<h1>{mainHeader}</h1>
	<!-- Use the mainHeader prop here -->
	<div id="header-info">
		<p>{currentRentalType}</p>
		<p>{currentDate}</p>
	</div>
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 0px;
		padding: 1rem 1rem 0 1rem;
		width: 75vw;
		background-color: var(--primary-bg);
	}

	#header-info {
		width: 100%;
		font-size: medium;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-bottom: 0px;
	}

	#theatre-logo {
		width: 5dvw;
		height: auto;
		object-fit: contain;
	}
</style>
