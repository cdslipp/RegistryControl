<script>
    import ToggleButton from './ui/ToggleButton.svelte';
    import LxSlider from './ui/LxSlider.svelte';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation'; // for SvelteKit
  
    onMount(() => {
      // Check show mode status on page load (similar to DOMContentLoaded)
      fetch('/get_show_mode')
        .then(response => response.json());
    });
  
    function enableShowMode() {
      // Logic to enable show mode
    }
  
    function goToProjector() {
      // Logic to go to projector
    }
  </script>
  

      <section id="main-grid">
        <button id="showModeButton" on:click={enableShowMode}>
          <h2>Show Mode</h2>
        </button>
        <ToggleButton />
        <button id="projector-button" on:click={goToProjector}>
          <h2>Projector</h2>
        </button>
        <LxSlider label="House Lights" />
        <button id="help-button">
          <a href=/help><h3>Help</h3></a>
        </button>
        <button id="lx-button">
          <h3>More Lx</h3>
        </button>
      </section>
  