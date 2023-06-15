import axios from "axios";

export async function fetchPokemon(pokemon) {
	return axios
		.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
		.then((res) => {
			return res.data;
		})
		.catch(() => {
			console.log(pokemon + " not found");
		});
}
