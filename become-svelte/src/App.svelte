<script>
 import Imc from './Imc.svelte'
 import Form from './Form.svelte'

	function calculerEvent(event) {
		console.log(event.detail)
	}

 let name = "World";
</script>

<main>
	<h1>Hello {name}!</h1>
	<Form on:calculer={calculerEvent}/>
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