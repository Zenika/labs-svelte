<script>
 import { poids, taille } from './stores'
 import { createEventDispatcher } from 'svelte';

 const dispatch = createEventDispatcher();

 function handleSubmit() {
  dispatch('submit', {
    poids: $poids,
    taille: $taille
	});
 }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label> Poids ({$poids} kg) :
    <input type="range" min="10" max="200" step="5" bind:value={$poids} />
  </label>

  <label> Taille ({$taille.toFixed(2)} m) :
    <input type="range" min="0.5" max="2.5" step="0.01" bind:value={$taille} />
  </label>

    <button type="submit">Calculer</button>
</form>
