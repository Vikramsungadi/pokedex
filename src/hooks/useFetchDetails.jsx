import axios from "axios";
import { useQuery } from "react-query";
/**
 * @param {string[]} key
 * @param {string} url
 * @description Takes key and url return RTK Query Object.
 */
const useFetchDetails = (key, url) => {
	return useQuery({
		queryKey: key,
		queryFn: () => {
			return axios.get(url).then((res) => res.data);
		},
	});
};

export default useFetchDetails;
