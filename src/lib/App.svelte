<script>
    import ToggleButton from './ui/ToggleButton.svelte';
    import LxSlider from './ui/LxSlider.svelte';
    import { onMount } from 'svelte';
    import { activeSliders } from '$lib/lx/lxStores';
    import { fetchLightLevels } from '$lib/lx/lxApi';
	import { get, writable } from 'svelte/store';
  
    const lightLevels = writable({});

  onMount(() => {
    const interval = setInterval(() => {
      const sliders = get(activeSliders);
      if (sliders.length > 0) {
        fetchLightLevels().then(levels => {
          lightLevels.set(levels);
        }).catch(error => {
          console.error('Failed to fetch light levels:', error);
        });
      }
    }, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  });
  </script>
  

      <section id="main-grid">
        <button id="showModeButton">
          <h2>Show Mode</h2>
        </button>
        <ToggleButton />
        <button id="projector-button">
          <h2>Projector</h2>
        </button>
        <LxSlider lightSetName="house" label="House Lights" />
        <button id="video-button">
            <a href=/video><h3>Video</h3></a>
          </button>
        <button id="help-button">
          <a href=/help><h3>Help</h3></a>
        </button>
        <button id="lx-button">
          <h3>More Lx</h3>
        </button>
      </section>
  