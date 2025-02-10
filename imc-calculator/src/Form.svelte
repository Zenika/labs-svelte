<script>
  import { imcStore } from "./stores.svelte";
  const { onsubmit } = $props();
</script>

<form {onsubmit}>
  <label>
    Poids ({imcStore.poids} kg) :
    <input
      name="poids"
      type="range"
      min="10"
      max="200"
      step="5"
      bind:value={imcStore.poids}
    />
  </label>

  <label>
    Taille ({imcStore.taille.toFixed(2)} m) :
    <input
      name="taille"
      type="range"
      min="0.5"
      max="2.5"
      step="0.01"
      bind:value={imcStore.taille}
    />
  </label>
  <button type="submit">Calculer</button>
</form>
