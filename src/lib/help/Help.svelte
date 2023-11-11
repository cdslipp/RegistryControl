<script>
    // Sample help topics for demonstration purposes
    const helpTopics = [
        { title: 'Topic 1', content: 'Content for topic 1' },
        { title: 'Topic 2', content: 'Content for topic 2' },
        // ... Add more topics as needed
    ];

    function showHelpArticle(topic) {
        // Here you can display the article in a modal or another component
        alert(topic.content);
    }
</script>

<style>
    #help-dashboard {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #contact-info {
        margin-bottom: 2rem;
    }

    #help-grid {
        display: grid;
        width: 80vw;
        max-height: 80vh;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 0.3em;
    }

    #help-grid button {
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 0.2rem;
        align-items: center;
        justify-content: center;
        border-radius: 1.5rem;
        background-color: var(--default-buttons);
    }
</style>

<div id="help-dashboard">
    <div id="contact-info">
        <h2>Contact Information:</h2>
        <p>Cameron Slipp</p>
        <p>(506) 425-0651</p>
        <p>atd@registrytheatre.com</p>
    </div>

    <div id="help-grid">
        {#each helpTopics as topic}
            <button on:click={() => showHelpArticle(topic)}>
                <h3>{topic.title}</h3>
            </button>
        {/each}
    </div>
</div>
