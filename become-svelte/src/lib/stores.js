import { derived, writable } from 'svelte/store'

export const poids = writable(80)
export const taille = writable(1.8)

export const imc = derived([poids, taille], ([$poids, $taille]) => {
  return ($poids / $taille ** 2).toFixed(2)
})
