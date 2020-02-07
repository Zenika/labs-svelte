import { derived, writable } from 'svelte/store'

export const poid = writable(80)
export const taille = writable(1.8)

export const imc = derived([poid, taille], ([$poid, $taille]) => {
  return ($poid / $taille ** 2).toFixed(2)
})
