<script>
 export let poid;
 export let taille;
</script>

<form>
  <label> Poid ({poid} kg) :
    <input type="range" min="10" max="200" step="5" bind:value={poid} />
  </label>

  <label> Taille ({taille.toFixed(2)} m) :
    <input type="range" min="0.5" max="2.5" step="0.01" bind:value={taille} />
  </label>
</form>