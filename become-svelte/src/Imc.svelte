<script>
 import { poids, taille, imc } from './stores'

 import { fly, fade } from 'svelte/transition';
</script>

<svelte:head>
  <title>Votre IMC : {$imc}</title>
</svelte:head>

<div class:thin={$imc < 18} class:bold={$imc > 35}>
  Votre IMC ({$poids}/{$taille}<sup>2</sup>) est de {$imc}
</div>
{#if $imc < 18}
  <div class="souspoids" in:fly="{{ y: 200, duration: 2000 }}" out:fade>Vous êtes en sous poids</div>
{:else if $imc > 35}
  <div class="surpoids" in:fly="{{ y: 200, duration: 2000 }}" out:fade>Vous êtes en sur poids</div>
{:else}
  <div class="normal" in:fly="{{ y: 200, duration: 2000 }}" out:fade>Quel corps svelte !</div>
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
