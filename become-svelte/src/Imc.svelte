<script>
 import { poids, taille, imc } from './stores'

 import { fly, fade } from 'svelte/transition';
</script>

<svelte:head>
  <title>Votre IMC : {$imc}</title>
</svelte:head>

<p class:thin={$imc < 18} class:bold={$imc > 25}>
  Votre IMC ({$poids}/{$taille}<sup>2</sup>) est de {$imc}
</p>
{#if $imc < 18}
  <p class="souspoids" in:fly="{{ y: 200, duration: 2000 }}" out:fade>Vous êtes maigre</p>
{:else if $imc > 25}
  <p class="surpoids" in:fly="{{ y: 200, duration: 2000 }}" out:fade>Vous êtes en surpoids</p>
{:else}
  <p class="normal" in:fly="{{ y: 200, duration: 2000 }}" out:fade>Vous êtes svelte !</p>
{/if}

<style>
  .normal {
    color: green
  }

  .surpoids {
    color: red;
  }

  .souspoids {
    color: orange;
  }
  .thin {
    font-weight: 200;
    font-size: .875rem;
  }
  .bold {
    font-weight: 600;
    font-size: 1.125rem;
  }
</style>
