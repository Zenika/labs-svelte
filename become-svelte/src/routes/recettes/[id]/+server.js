import { json, error } from '@sveltejs/kit';
import recettes from "../recettes.json";

export function GET({ params }) {
	if (params.id < 0 || params.id >= recettes.length) {
		throw error(404, 'Not found');
	}
	return json(recettes[params.id]);
}