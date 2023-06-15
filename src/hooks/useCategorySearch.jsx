import axios from "axios";

import { useQuery } from "react-query";

const useCategorySearch = (category, searchTerm, enabled) => {
	let {
		data: searched,
		error: searchError,
		isError: isSearchError,
		isLoading: seachQueryLoading,
	} = useQuery({
		queryKey: [category, searchTerm],
		queryFn: () => axios.get(`https://pokeapi.co/api/v2/${category}/${searchTerm}`),
		enabled: enabled,
	});

	return { searched, searchError, isSearchError, seachQueryLoading };
};

export default useCategorySearch;
