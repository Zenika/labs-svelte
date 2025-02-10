class IMC {
    poids = $state(80)
    taille = $state(1.8)
    imc = $derived((this.poids / this.taille ** 2).toFixed(2))
}

export const imcStore = new IMC()