<script>
	import { rentalType } from "$lib/stores"

    export let mainHeader = "Welcome to the Registry"; // Default value if not provided

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
    rentalType.subscribe(value => {
        currentRentalType = value;
    });
</script>

<div id="logo-container">
  <img src="/registry_logo.png" alt="Theatre Logo" id="theatre-logo">
</div>
<h1>{mainHeader}</h1> <!-- Use the mainHeader prop here -->
<div id="header-info">
    <p>{currentRentalType}</p>
    <p>{currentDate}</p>
</div>

<style>
  #theatre-logo {
    width: 150px;
    height: auto;
    object-fit: contain;
  }
</style>
