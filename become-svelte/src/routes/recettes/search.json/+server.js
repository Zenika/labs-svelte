import { json as json$1 } from '@sveltejs/kit';
import { searchRecipes, MarmitonQueryBuilder } from 'marmiton-api'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
    const body = await request.json()
    const qb = new MarmitonQueryBuilder();
    const query = qb
    .withTitleContaining(body.query)
    .build()
    const recipes = await searchRecipes(query, { limit: 6 })

    return new Response(JSON.stringify(recipes));
}
