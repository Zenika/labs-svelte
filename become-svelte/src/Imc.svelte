<script>
 import { poid, taille, imc } from './stores'
</script>

<div>Votre IMC ({$poid}/{$taille}<sup>2</sup>) est de {$imc}</div>
{#if $imc < 18}
  <div class="souspoid">Vous êtes en sous poids</div>
{:else if $imc > 35}
  <div class="surpoid">Vous êtes en sur poids</div>
{:else}
  <div class="normal">Quel corps svelte !</div>
{/if}

<style>
  .normal {
    color: green
  }

  .surpoid, .souspoid {
    color: orange;
  }

</style>