<script>
    import { onMount } from 'svelte';
    let pin = ''; // The current PIN
    let name = ''; // Name for the modal
    let modal; // The modal element
    let intendedRoute = '';
    let requiredPermission = 3;

    function appendToPin(num) {
        pin += num;
    }

    function deleteFromPin() {
        pin = pin.slice(0, -1); // remove the last digit
    }

    function submitPin() {
        // Implement your fetch call here
    }

    let isOpen = false;

    onMount(() => {
        // your initialization code, if any
    });
</script>

{#if isOpen}
<div bind:this={modal} class="modal" class:hidden={!isOpen}>
    <div class="modal-content">
        <label for="pin">Enter PIN:</label>
        <span class="close" on:click={() => isOpen = false}>×</span>
        <input pattern="[0-9]*" type="password" bind:value={pin} inputmode="numeric" class="pin-input">
        <h2>{name}</h2>
        <button on:click={submitPin}>Submit</button>
        <div class="custom-keyboard">
            {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as num}
                <button class="key" on:click={() => appendToPin(num)}>{num}</button>
            {/each}
            <button class="key delete" on:click={deleteFromPin}>⌫</button>
            <button class="key" on:click={() => appendToPin('0')}>0</button>
        </div>
    </div>
</div>
{/if}

<style>
    .modal {
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  left: 25%;
  top: 0;
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  /* Could be more or less, depending on screen size */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.backdrop {
  background: rgba(0, 0, 0, 0.5);
}

.pin-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  touch-action: manipulation;
}

.pin-prompt input {
  font-size: 1.5em;
  padding: 10px 20px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
}

.pin-prompt button {
  font-size: 1.5em;
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #333;
  color: #ddd;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}
   .custom-keyboard {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    margin-top: 10px;
}

.key {
    padding: 30px;
    font-size: 18px;
    font-weight: bold;
    background-color: #333;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s;
    border-radius: 10%;
    max-width: 250px;
    touch-action: manipulation;
    /* Makes the button circular */
}

.key:hover {
    background-color: #444;
}

.delete,
.clear {
    grid-column: span 2;
}

#pinForm button[type='submit'] { 
    display: none; 
}

</style>
