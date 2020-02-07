<script>
 import Imc from './Imc.svelte'
 let name = "World";
</script>

<main>
	<h1>Hello {name}!</h1>
	<Imc poid=100 taille=1.9 />
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