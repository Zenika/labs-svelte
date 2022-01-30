import recettes from "./recettes.json";

export function get() {
	return {
        body: recettes.map(({ ingredients, steps, url, ...rest }) => rest)
    };
}