import useFetchDetails from "../hooks/useFetchDetails";
import { capitalizeAll } from "../../utils/helpers";
import useInfinitePokemons from "../hooks/useInfinitePokemons";
import RefreshIcon from "../assets/RefreshIcon";
const SearchBar = (props) => {
	let { data: pokemons } = useInfinitePokemons();
	let pokemonsUrls = pokemons?.pages?.map(({ results }) => results).flat();

	let { data: locations } = useFetchDetails(["locations"], "https://pokeapi.co/api/v2/location-area/?offset=0&limit=100");
	let { data: abilities } = useFetchDetails(["abilities"], "https://pokeapi.co/api/v2/ability/?offset=0&limit=100");
	let { data: shapes } = useFetchDetails(["shapes"], "https://pokeapi.co/api/v2/pokemon-shape");
	let { data: colors } = useFetchDetails(["colors"], "https://pokeapi.co/api/v2/pokemon-color");
	let { data: habitats } = useFetchDetails(["habitats"], "https://pokeapi.co/api/v2/pokemon-habitat");
	let { data: groups } = useFetchDetails(["groups"], "https://pokeapi.co/api/v2/egg-group");

	let datalists = {
		pokemon: pokemonsUrls,
		"location-area": locations?.results,
		"pokemon-shape": shapes?.results,
		"pokemon-habitat": habitats?.results,
		"egg-group": groups?.results,
		"pokemon-color": colors?.results,
		ability: abilities?.results,
	};

	return (
		<div className='mx-auto flex flex-col items-center justify-center  max-sm:flex-wrap'>
			<div
				className={`${
					props.className ?? ""
				} relative flex w-full max-w-lg items-center justify-between rounded-full  bg-transparent px-2 shadow-md `}>
				<input
					id='searchbar'
					type='search'
					className='w-full bg-transparent px-2 py-2.5 outline-none placeholder:font-normal placeholder:text-gray-500'
					placeholder='Enter pokemon name, color, shape'
					value={props.searchTerm}
					list={props.category}
					onChange={props.handleOnInput}
				/>
				{Object.entries(datalists)?.map(([id, values]) => {
					return (
						<datalist id={id} key={id}>
							{values?.map((value) => (
								<option key={value.name} value={value.name}></option>
							))}
						</datalist>
					);
				})}
				<button
					onClick={props.handleOnSearch}
					className='my-1 mr-1 rounded-full  border-[1.5px] border-transparent bg-red-600 px-4 py-1.5  text-white transition-colors duration-100  focus-visible:outline focus-visible:outline-amber-500 active:scale-[0.98] '>
					Search
				</button>
			</div>
			<div className='mb-4 flex flex-wrap items-center gap-4 p-2'>
				<select
					name='category'
					aria-label='Filter pokemons'
					onChange={props.handleOnSelectingCategory}
					id='category'
					className='relative m-1 rounded-full border border-gray-200 px-4 py-1.5 pr-2 font-semibold'>
					<option value='pokemon'>Pokemon</option>
					<option value='pokemon-color'>Color</option>
					<option value='pokemon-shape'>Shape</option>
					<option value='pokemon-habitat'>Habitat</option>
					<option value='location-area'>Location</option>
					<option value='egg-group'>Group</option>
					<option value='ability'>Abilities</option>
				</select>
				<select
					name='Sub-category'
					aria-label={`List of ${props.category}`}
					onChange={props.handleOnInput}
					id='idk'
					className=' m-1 rounded-full border border-gray-200 px-4 py-1.5 '>
					<option value='select'>{"Select " + props.category.replace("pokemon-", "")}</option>
					{datalists[props.category]?.map((value) => (
						<option value={value?.name} key={value?.name}>
							{capitalizeAll(value?.name?.substring(0, 20))}
						</option>
					))}
				</select>
				<div onClick={props.reset} className='group relative h-fit cursor-pointer'>
					<p className='absolute inset-0 -left-1/3 -top-[0.85rem] hidden text-xs font-semibold group-hover:inline-block'>Refresh</p>
					<RefreshIcon className='w-6 cursor-pointer stroke-red-500' />
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
