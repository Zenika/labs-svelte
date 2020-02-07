<script>
  export let poid = 80;
  export let taille = 1.80;

  let imc = (poid / taille ** 2).toFixed(2)
</script>

<div>Votre IMC est de {imc}</div>
{#if imc < 18}
  <div>Vous êtes en sous poids</div>
{:else if imc > 35}
  <div>Vous êtes en sur poids</div>
{:else}
  <div>Quel corps svelte !</div>
{/if}