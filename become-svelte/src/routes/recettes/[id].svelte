<script>
import { page } from '$app/stores';
import recettes from "./recette.json";

$: recette = recettes[$page.params.id]
</script>

<section class="recette">
    <img src={recette.image} alt={recette.titre}>
    <h2>{recette.titre}</h2>
    <h3>⏱ {recette.temps} 👨‍🍳 {recette.difficulte} € {recette.prix} 😋 {recette.personnes} Personnes</h3>
    
    <ul>
        {#each recette.ingredients as ingredient}
            <li>{ingredient}</li>
        {/each}
    </ul>
    <dl>
        {#each recette.etapes as etape, index}
            <dt>Etape {index+1}</dt>
            <dd>{etape}</dd>
        {/each}
    </dl>
</section>
{#if $page.params.id > 0}
<a href="/recettes/{Number($page.params.id) - 1}">Précédent</a>
{/if}
{#if $page.params.id < recettes.length - 1}
<a href="/recettes/{Number($page.params.id) + 1}">Suivant</a>
{/if}