<script>
	import { rentalType } from '$lib/stores';

	export let headerLine1 = 'Welcome'; // Default value if not provided
	export let headerLine2 = 'to the Registry.'; // Default value if not provided

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
	<div id="header-text">
		<h1>{headerLine1}</h1>
	<h1>{headerLine2}</h1>
	</div>
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
		width: auto;
		background-color: var(--primary-bg);
	}

	#header-text{
		align-items: left;
		width: 100%;
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
		width: 80px;
		height: auto;
		object-fit: contain;
	}
</style>
