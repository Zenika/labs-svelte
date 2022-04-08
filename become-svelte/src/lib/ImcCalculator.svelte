<script>
	import Imc from "./Imc.svelte";
	import Form from "./Form.svelte";

	const name = "World";
	let historique = [];

	function calculerEvent(event) {
		console.log(event)
		historique = [...historique, {
			date: event.target.date.value || new Date(),
			poids: event.target.poids.value,
			taille: event.target.taille.value,
			imc: event.target.poids.value / (event.target.taille.value * event.target.taille.value)
		}
	];
	}
</script>

<p>Bonjour {name} ! Calculez votre IMC (Indice de Masse Corporelle)</p>
<Form on:submit={calculerEvent}/>
<Imc />
<h3>Evolution de l'IMC</h3>
<ul>
	{#each historique as item}
		<li>{item.date.toString()}: {item.imc.toFixed(2)}</li>
	{/each}
</ul>
