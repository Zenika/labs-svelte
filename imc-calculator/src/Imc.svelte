<script>
  import { fade, fly } from "svelte/transition";
  import { imcStore } from "./stores.svelte";

  let thin = $derived(imcStore.imc < 18);
  let bold = $derived(imcStore.imc > 25);

  const flyOptions = { y: 200, duration: 2_000 };
</script>

<svelte:head>
  <title>Votre IMC : {imcStore.imc}</title>
</svelte:head>

<p class:thin class:bold>
  Votre IMC ({imcStore.poids}/{imcStore.taille}<sup>2</sup>) est de {imcStore.imc}
</p>
{#if thin}
  <p class="souspoids" in:fly|global={flyOptions} out:fade|global>
    Vous êtes maigre
  </p>
{:else if bold}
  <p class="surpoids" in:fly|global={flyOptions} out:fade|global>
    Vous êtes en surpoids
  </p>
{:else}
  <p class="normal" in:fly|global={flyOptions} out:fade|global>
    Vous êtes svelte !
  </p>
{/if}

<style>
  .normal {
    color: green;
  }
  .surpoids {
    color: red;
  }
  .souspoids {
    color: orange;
  }
  .thin {
    font-weight: 200;
    font-size: 0.875rem;
  }
  .bold {
    font-weight: 600;
    font-size: 1.125rem;
  }
</style>
