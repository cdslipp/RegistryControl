<script>
    import { onMount } from 'svelte';
  
    let pin = ''; // The current PIN
    const testPin = '1234'; // Hardcoded test PIN
  
    function appendToPin(num) {
        pin += num;
        if (pin.length === 4) {
            submitPin();
        }
    }
  
    function deleteFromPin() {
        pin = pin.slice(0, -1); // remove the last digit
    }
  
    function submitPin() {
        // Here you can implement the logic to authenticate against your "pins" collection
        if (pin === testPin) {
            // Handle correct PIN
            console.log('PIN correct');
        } else {
            // Handle incorrect PIN
            console.log('PIN incorrect');
        }
  
        pin = ''; // Reset pin after submit attempt
    }
  
    onMount(() => {
        // your initialization code, if any
    });
  </script>
  
  <div class="pin-container">
      <div class="pin-display">
          <label for="pin">Enter pin to unlock</label>
          <div class="pin-dots">
              {#each Array(4) as _, i}
                  <span class="dot">{i < pin.length ? '*' : ''}</span>
              {/each}
          </div>
      </div>
      <div class="custom-keyboard">
          {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as num}
              <button class="key" on:click={() => appendToPin(num)}>{num}</button>
          {/each}
          <button class="key delete" on:click={deleteFromPin}>⌫</button>
          <button class="key" on:click={() => appendToPin('0')}>0</button>
      </div>
  </div>
  
  <style>
    .pin-container {
      display: grid;
      grid-template-rows: auto 1fr;
      height: 80vh;
      width:80vw;
      justify-items: center;
      align-content: center;
      background-color: var(--primary-bg);
    }
  
    .pin-display {
      text-align: center;
    }
  
    .pin-dots {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  
    .dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--SliderColor);
      margin: 0 5px;
      display: inline-block;
    }
  
    .custom-keyboard {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      max-width: 300px;
      margin-top: 30px;
    }
  
    .key {
      padding: 20px;
      font-size: 1.5rem;
      color: var(--primary-text);
      background-color: var(--default-buttons);
      border: none;
      border-radius: 10%;
      touch-action: manipulation;
      transition: background-color 0.2s;
    }
  
    .key:hover {
      background-color: var(--OnColor);
    }
  
    .delete {
      grid-column: span 2;
    }
  
    label {
      display: block;
      color: var(--primary-text);
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  </style>
  