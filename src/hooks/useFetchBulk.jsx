import { useQueries } from "react-query";
import { fetchPokemon } from "../../utils/fetchPokemon";
/**
 * @param {Object[]} pokemonsUrls
 * @description Takes Array of Object { name: pokemon-name or id }.
 */
const useFetchBulk = (pokemonsUrls) => {
	return useQueries(
		pokemonsUrls?.map((pokemon) => ({
			queryKey: [pokemon?.name],
			queryFn: () => fetchPokemon(pokemon?.name),
		}))
	);
};

export default useFetchBulk;
