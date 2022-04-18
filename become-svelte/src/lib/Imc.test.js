import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte'
import Imc from './Imc'

describe('Imc', () => {
    it('should display default imc', () => {
        // Chargement du composant.
        const { getByTestId } = render(Imc)
        // Sélectionne le <p> affichant l'Imc et récupère le contenu textuel.
        const displayImc = getByTestId('imc').textContent;
        // Le texte attendu, avec l'imc calculé grâce aux valeurs par défaut.
        const expectedImc = 'Votre IMC (80/1.82) est de 24.69';
        // La vérification.
        expect(displayImc).toBe(expectedImc);
    });
});

