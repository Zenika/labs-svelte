<script>
 let poid = 0;
 let taille = 0;

 function onPoidChange(event) {
  poid = event.target.value
 }

 function onTailleChange(event) {
  taille = parseFloat(event.target.value)
 }
</script>

<form>
  <label> Poid ({poid} kg) :
    <input type="range" min="10" max="200" step="5" on:input={onPoidChange} />
  </label>

  <label> Taille ({taille.toFixed(2)} m) :
    <input type="range" min="0.5" max="2.5" step="0.01" on:input={onTailleChange}/>
  </label>
</form>