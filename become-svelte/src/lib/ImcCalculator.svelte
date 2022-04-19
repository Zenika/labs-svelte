<script>
	import Imc from "./Imc.svelte";
	import Form from "./Form.svelte";

	const name = "World";
	let historique = [];

	function sauvegarderIMC(event) {
		historique = [...historique, event.detail];
	}
</script>

<p>Bonjour {name} ! Calculez votre IMC (Indice de Masse Corporelle)</p>
<Form on:sauvegarder={sauvegarderIMC}/>
<Imc />
<h3>Evolution de l'IMC</h3>
<ul>
	{#each historique as item, index}
		<li>{index + 1}: {item.toFixed(2)}</li>
	{/each}
</ul>
