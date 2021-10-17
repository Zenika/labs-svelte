<script>
	import Imc from "./Imc.svelte";
	import Form from "./Form.svelte";

	const name = "World";

	function calculerEvent(event) {
		console.log(event)
	}
</script>

<main>
	<h1>Calculateur IMC</h1>
	<p>Bonjour {name} ! Calculez votre IMC (Indice de Masse Corporelle)</p>
	<Form on:submit={calculerEvent}/>
	<Imc />
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