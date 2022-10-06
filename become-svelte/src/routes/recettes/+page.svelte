<script>
	export let data;
	$: recettes = data.recettes;
	let query;

	async function submitForm() {
		const submit = await fetch('/recettes/search', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ query }),
		})
		const data = await submit.json()

		recettes = data
	}
</script>
<form on:submit|preventDefault={submitForm}>
	<label for="query">
	<span class="sr-only">Recherche sur marmiton.org</span>
	</label>
	<input
	    id="query"
	    aria-label="Recherche sur Marmiton.org"
		type="search"
		name="query"
		placeholder="Recherche sur marmiton.org"
		required
		bind:value={query}
	/>
	<input type="submit" value="Rechercher" />
</form>
<section class="recettes">
    {#each recettes as item, index (item.name)}
        <article>
			<div>
				<h2><a data-sveltekit-prefetch href="{item.url ?? `/recettes/${index}`}">{item.name}</a></h2>
				<p>⏱ {item.totalTime} min 👨‍🍳 {['', 'Très Facile', 'Facile', 'Moyenne', 'Difficile'][item.difficulty || 0]} € {['', 'Bon marché', 'Moyen', 'Assez cher'][item.budget||0]} 😋 {item.people} Personnes</p>
			</div>
            {#if item.image}
               <img src={item.image} alt={item.name}>
            {/if}
        </article>
    {/each}
</section>