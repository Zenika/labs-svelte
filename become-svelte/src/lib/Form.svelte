<script>
  import { createEventDispatcher } from 'svelte';
  import { storePoids, storeTaille } from "./stores";

  const dispatch = createEventDispatcher();

  function handleSubmit(event) {
    dispatch('sauvegarder', event.target.poids.value / (event.target.taille.value * event.target.taille.value));
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label> Poids ({$storePoids} kg) :
      <input name="poids" type="range" min="10" max="200" step="5" bind:value={$storePoids} />
  </label>

  <label> Taille ({$storeTaille.toFixed(2)} m) :
      <input name="taille" type="range" min="0.5" max="2.5" step="0.01" bind:value={$storeTaille} />
  </label>
  <button type="submit">Sauvegarder</button>
</form>