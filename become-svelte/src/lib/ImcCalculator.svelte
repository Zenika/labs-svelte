<script>
	import Imc from "./Imc.svelte";
	import Form from "./Form.svelte";

	const name = "World";

	function calculerEvent(event) {
		console.log(event)
	}
</script>

<p>Bonjour {name} ! Calculez votre IMC (Indice de Masse Corporelle)</p>
<Form on:submit={calculerEvent}/>
<Imc />