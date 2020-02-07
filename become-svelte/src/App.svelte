<script>
 import Imc from './Imc.svelte'
 import Form from './Form.svelte'
 let name = "World";

 let poid = 80;
 let taille = 1.8;
</script>

<main>
	<h1>Hello {name}!</h1>
	<Form bind:poid bind:taille/>
	<Imc {poid} {taille} />
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