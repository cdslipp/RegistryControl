<script>
    import LxSlider from '$lib/ui/LxSlider.svelte';
import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
  
    const dimmerStatuses = writable([]);
    const error = writable(null);
  
    async function getDimmerStatuses() {
      try {
        const response = await fetch('/lights/getLevels');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dimmerStatuses.set(data);
      } catch (err) {
        console.error('Failed to fetch dimmer statuses:', err);
        error.set(err.message);
      }
    }
  
    onMount(() => {
      getDimmerStatuses();
    });
  </script>

<section id="main-grid">
    <LxSlider lightSetName="house" label="House Lights" />
  <LxSlider lightSetName="front" label="Front Lights" />
  <LxSlider lightSetName="sides" label="Side Lights" />
  <LxSlider lightSetName="tops" label="Top Lights" />
    
  </section>

  

  <h1>Dimmer Statuses</h1>
  {#if $error}
    <p>Error: {$error}</p>
  {:else}
    <button on:click={getDimmerStatuses}>Refresh</button>
    <ul>
      {#each $dimmerStatuses as { udn, level }}
        <li>{udn}: {level}</li>
      {/each}
    </ul>
  {/if}
  