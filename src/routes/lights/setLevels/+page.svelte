<script>
    async function turnOn() {
      try {
        const response = await fetch('/lights/houseOn', { method: 'POST' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Lights turned on');
      } catch (error) {
        console.error('Error turning on lights:', error);
      }
    }
  
    async function turnOff() {
      try {
        const response = await fetch('/lights/houseOff', { method: 'POST' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Lights turned off');
      } catch (error) {
        console.error('Error turning off lights:', error);
      }
    }
    async function releaseLights() {
    try {
      const response = await fetch('/lights/releaseAll', { method: 'POST' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Lights released');
    } catch (error) {
      console.error('Error releasing lights:', error);
    }
  }
</script>

<button on:click={turnOn}>Turn On</button>
<button on:click={turnOff}>Turn Off</button>
<button on:click={releaseLights}>Release</button>







  