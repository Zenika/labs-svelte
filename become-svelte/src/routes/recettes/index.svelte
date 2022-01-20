<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		const url = `/recettes.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					recettes: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>
<script>
    export let recettes = [];
</script>

<section class="recettes">
    {#each recettes as item, index}
        <article>
            <h2><a href="/recettes/{index}">{item.name}</a></h2>
            <h3>⏱ {item.totalTime} min 👨‍🍳 {['', 'Très Facile', 'Facile', 'Moyenne', 'Difficile'][item.difficulty || 0]} € {['', 'Bon marché', 'Moyen', 'Assez cher'][item.budget||0]} 😋 {item.people} Personnes</h3>
            <img src={item.image} alt={item.name}>
        </article>
    {/each}
</section>