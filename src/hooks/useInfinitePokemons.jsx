import axios from "axios";
import { useInfiniteQuery } from "react-query";

const useInfinitePokemons = () => {
	let {
		data,
		isLoading: infinteQueryLoading,
		error: infinteQueryError,
		isError: isInfinteQueryError,
		fetchNextPage,
		isFetching,
	} = useInfiniteQuery({
		queryKey: ["fetchedpokemons"],
		queryFn: ({ pageParam = 0 }) => axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${pageParam}`).then((res) => res.data),
		getNextPageParam: (lastPage, allPages) => {
			return allPages.length * 10;
		},
	});

	return { data, isInfinteQueryError, isFetching, fetchNextPage, infinteQueryError, infinteQueryLoading };
};

export default useInfinitePokemons;
