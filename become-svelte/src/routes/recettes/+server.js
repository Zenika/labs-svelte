
import { json } from '@sveltejs/kit';
import recettes from "./recettes.json";

export function GET() {
	return json(recettes.map(({ ingredients, steps, url, ...rest }) => rest));
}