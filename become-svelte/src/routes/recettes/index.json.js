import recettes from "./recette.json";

export function get() {
	return {
        body: recettes.map(({ ingredients, steps, url, ...rest }) => rest)
    };
}