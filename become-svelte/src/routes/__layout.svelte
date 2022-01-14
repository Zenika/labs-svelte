<script>
</script>
<header>
	<nav>
		<a href="/">Accueil</a>
		<a href="/recettes">Recettes</a>
		<a href="/about">A propos</a>
	</nav>
</header>
<main>
	<h1>Devenir Svelte avec Svelte</h1>
	<slot></slot>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>