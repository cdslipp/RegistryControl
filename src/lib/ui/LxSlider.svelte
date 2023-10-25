<script>
    import { writable } from 'svelte/store';

    const percentage = writable(0);
    let containerHeight = 0;
    let contentHeight = 0;
    let scrollY = 0;

    /**
     * @typedef {UIEvent & { currentTarget: HTMLDivElement }} ScrollEvent
     */

    /**
     * @param {ScrollEvent} event
     */
    function onScroll(event) {
        const scrolled = event.currentTarget.scrollTop;
        const maxScroll = contentHeight - containerHeight;
        $percentage = (scrolled / maxScroll) * 100;
    }

    /** @type {string} */
    export let label;
</script>

<svelte:window bind:scrollY />

<div class="slider-container" on:scroll={onScroll} bind:clientHeight="{containerHeight}">
	<div class="slider-labels">
		<h3>{label}</h3>
		<span>{$percentage.toFixed(0)}%</span>
	</div>
    <div class="slider-content" bind:clientHeight="{contentHeight}">
        <div class="slider-fill" style="height: {Math.max(1, $percentage)}%"></div>
    </div>
    
</div>

<style>
    .slider-container {
        position: relative;
        overflow-y: auto;
        height: 400px;
        width: 100%;
        background-color: var(--SliderColor);
        border-radius: 1.5rem;
    }

	.slider-container::-webkit-scrollbar{
		display: none;
	}

    .slider-content {
        position: relative;
        height: 800px; /* This determines how much the user can scroll */
    }

    .slider-fill {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: var(--OnColor);
    }

	.slider-labels {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;  /* Ensures labels stay on top */
        color: white;
        pointer-events: none;
    }

    /* Other existing styles remain unchanged */
</style>
