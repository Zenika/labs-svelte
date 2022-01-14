<script>
    import recettes from "./recette.json";
</script>

<section class="recettes">
    {#each recettes as item, index}
        <article>
            <h2><a href="/recettes/{index}">{item.titre}</a></h2>
            <h3>⏱ {item.temps} 👨‍🍳 {item.difficulte} € {item.prix} 😋 {item.personnes} Personnes</h3>
            <img src={item.image} alt={item.titre}>
        </article>
    {/each}
</section>