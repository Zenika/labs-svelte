import { derived, writable } from 'svelte/store'

export const storePoids = writable(80)
export const storeTaille = writable(1.8)

export const storeImc = derived([storePoids, storeTaille], ([$poids, $taille]) => {
  return ($poids / $taille ** 2).toFixed(2)
})
