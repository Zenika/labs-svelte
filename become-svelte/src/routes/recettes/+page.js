import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ fetch }) {
	const url = `/recettes.json`;
	const res = await fetch(url);

	if (res.ok) {
		return {
			recettes: await res.json()
		};
	}

	throw error(500, `Could not load ${url}`);
}
