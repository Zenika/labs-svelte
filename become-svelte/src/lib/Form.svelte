<script>
  import { poids, taille } from "./stores";
</script>

<form on:submit|preventDefault>
  <label> Poids ({$poids} kg) :
      <input name="poids" type="range" min="10" max="200" step="5" bind:value={$poids} />
  </label>

  <label> Taille ({$taille.toFixed(2)} m) :
      <input name="taille" type="range" min="0.5" max="2.5" step="0.01" bind:value={$taille} />
  </label>

  <label> Date :
    <input name="date" type="date" />
  </label>
  <button type="submit">Enregistrer</button>
</form>