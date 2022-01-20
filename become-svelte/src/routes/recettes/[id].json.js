import recettes from "./recette.json";

export function get({ params }) {
	return {
        body: recettes[params.id]
    };
}