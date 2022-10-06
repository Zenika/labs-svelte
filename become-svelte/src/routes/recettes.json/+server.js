
import recettes from "../recettes/recettes.json";

export function GET() {
	return new Response(JSON.stringify(recettes.map(({ ingredients, steps, url, ...rest }) => rest)));
}