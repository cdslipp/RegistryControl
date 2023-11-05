<script>
    export let on = false;
    export let onToggle = (on) => {};

    const handleClick = () => {
        on = !on;
        onToggle(on);
    };
</script>

<button on:click={handleClick} class:active={on}>
    {#if on}
        <span>ON</span>
    {:else}
        <span>OFF</span>
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
    }
    button.active {
        background-color: green;
    }
</style>
