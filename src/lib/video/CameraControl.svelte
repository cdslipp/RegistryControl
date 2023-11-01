<script>
    import { onMount } from 'svelte';
    import { cameraStatus, toggleCamera } from '$lib/video/cameraApi';
    import ToggleButton from '$lib/ui/ToggleButton.svelte';
  
    let status = false;
  
    onMount(() => {
      const unsubscribe = cameraStatus.subscribe((value) => {
        status = value;
      });
      
      return () => {
        unsubscribe();
      };
    });
  
    const handleCameraToggle = async () => {
      await toggleCamera();
      console.log(`Camera is now ${status ? 'ON' : 'OFF'}`);
    };
</script>
  
<section>
    <ToggleButton {status} onToggle={handleCameraToggle} />
</section>
  
<style>
    section {
      margin: 1rem;
      text-align: center;
    }
</style>
