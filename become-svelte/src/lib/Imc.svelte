<script>
  import { storePoids, storeTaille, storeImc } from "./stores";
  import { fly, fade } from 'svelte/transition';
  $: thin = $storeImc < 18
  $: bold = $storeImc > 25
</script>

<svelte:head>
<title>Votre IMC : {$storeImc}</title>
</svelte:head>

<p class:thin class:bold data-testid="imc">
  Votre IMC ({$storePoids}/{$storeTaille}<sup>2</sup>) est de {$storeImc}
</p>
{#if thin}
<p class="souspoids" in:fly="{{ y: 200, duration: 2000 }}" out:fade>Vous êtes maigre</p>
{:else if bold}
<p class="surpoids"  in:fly="{{ y: 200, duration: 2000 }}" out:fade>Vous êtes en surpoids</p>
{:else}
<p class="normal"  in:fly="{{ y: 200, duration: 2000 }}" out:fade>Vous êtes svelte !</p>
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
  font-size: .875rem;
}
.bold {
  font-weight: 600;
  font-size: 1.125rem;
}
</style>