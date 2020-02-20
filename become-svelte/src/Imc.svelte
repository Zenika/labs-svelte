<script>
 import { poid, taille, imc } from './stores'

 import { fly, fade } from 'svelte/transition';
</script>

<svelte:head>
  <title>Votre IMC : {$imc}</title>
</svelte:head>

<div>Votre IMC ({$poid}/{$taille}<sup>2</sup>) est de {$imc}</div>
{#if $imc < 18}
  <div class="souspoid" in:fly="{{ y: 200, duration: 2000 }}" out:fade>Vous êtes en sous poids</div>
{:else if $imc > 35}
  <div class="surpoid" in:fly="{{ y: 200, duration: 2000 }}" out:fade>Vous êtes en sur poids</div>
{:else}
  <div class="normal" in:fly="{{ y: 200, duration: 2000 }}" out:fade>Quel corps svelte !</div>
{/if}

<style>
  .normal {
    color: green
  }

  .surpoid {
    color: red;
  }

  .souspoid {
    color: orange;
  }

</style>
