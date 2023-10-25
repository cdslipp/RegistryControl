<!-- FILEPATH: /Users/cdslipp/Code/RegistryHub/src/routes/+layout.svelte -->
<script>
	import Nav from "$lib/Nav.svelte";
    import "../app.css";
</script>

<div id="wrapper">
    <div id="main-content">
        
        <header>
            <Nav/>
        </header>
        
        <section>
            <slot/>
        </section>
      
    </div>
</div>

<footer>
    <p>Made with ❤️ by Cameron Slipp</p>
</footer>