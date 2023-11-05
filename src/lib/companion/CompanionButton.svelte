<script>
    import { onMount } from 'svelte';
    import { sendCompanionCommand } from '$lib/companion/companion.js';

    export let page;
    export let button;
    export let isToggle = false;
    export let on = false;

    const handlePress = async () => {
        if (isToggle) {
            on = !on;
        }
        await sendCompanionCommand(page, button);
    };
    
    // If needed, you could set up a listener here to listen for
    // changes in the button state from the Companion server.
    onMount(() => {
        // Some initialization if necessary.
    });
</script>

<button on:click={handlePress} class:active={isToggle && on}>
    {#if isToggle}
        <span>{on ? 'ON' : 'OFF'}</span>
    {:else}
        <span>PRESS</span>
    {/if}
</button>

<style>
    button {
        background-color: red;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    button.active {
        background-color: green;
    }
</style>
