import recettes from "../recettes.json";

export function GET({ params }) {
	return new Response(JSON.stringify(recettes[params.id]));
}