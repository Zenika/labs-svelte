import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params, fetch }) {
	const url = `/recettes/${params.id}`;
	const res = await fetch(url);

	if (res.ok) {
		return {
			recette: await res.json()
		};
	}

	throw error(500, `Could not load ${url}`);
}
