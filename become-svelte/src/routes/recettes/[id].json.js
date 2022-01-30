import recettes from "./recettes.json";

export function get({ params }) {
	return {
        body: recettes[params.id]
    };
}