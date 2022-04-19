import { searchRecipes, MarmitonQueryBuilder } from 'marmiton-api'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
    const body = await request.json()
    const qb = new MarmitonQueryBuilder();
    const query = qb
    .withTitleContaining(body.query)
    .build()
    const recipes = await searchRecipes(query, { limit: 6 })

    return {
        body: recipes
    };
}
