/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

import useFetchBulk from "../hooks/useFetchBulk";
import useInfinitePokemons from "../hooks/useInfinitePokemons";
import useCategorySearch from "../hooks/useCategorySearch";
import useObserveElement from "../hooks/useObserveElement";
import Pokeball from "../components/Pokeball";

const PokemonsList = () => {
	let bookmarkedPokemons = new Set(JSON.parse(localStorage.getItem("savedPokemons")) ?? []);

	// STATES
	let [search, setSearch] = useState(false);
	let [category, setCategory] = useState("pokemon");
	let [searchTerm, setSearchTerm] = useState("");

	// Queries
	let { data, isInfinteQueryError, isFetching, fetchNextPage, infinteQueryError, infinteQueryLoading } = useInfinitePokemons();
	let { searched, searchError, isSearchError, seachQueryLoading } = useCategorySearch(category, searchTerm, search);

	let loading = infinteQueryLoading || seachQueryLoading;

	let pokemonsUrls = [];
	if (!search) {
		pokemonsUrls = data?.pages?.map(({ results }) => results).flat();
	} else {
		if (category === "pokemon") {
			pokemonsUrls = [searched?.data];
		} else if (category === "location-area") {
			pokemonsUrls = searched?.data?.pokemon_encounters?.map((item) => item?.pokemon);
		} else if (category === "ability") {
			pokemonsUrls = searched?.data?.pokemon?.map((item) => item?.pokemon);
		} else {
			pokemonsUrls = searched?.data?.pokemon_species;
		}
	}
	pokemonsUrls = pokemonsUrls ?? [];

	const pokemonsData = useFetchBulk(pokemonsUrls);
	let pokemons = pokemonsData.map(({ data }) => data);
	let lastPokemon = useObserveElement(infinteQueryError || search, fetchNextPage, infinteQueryLoading);

	// HANDLERS
	function handleOnInput(e) {
		setSearchTerm(e.target.value.split(" ").join("-").toLowerCase());
		setSearch(false);
	}
	function handleOnSelectingCategory(e) {
		setCategory(e.target.value);
		setSearch(false);
	}
	function handleOnSearch() {
		if (!!searchTerm.trim() && category) {
			setSearch(true);
		}
	}

	function reset() {
		setCategory("pokemon");
		setSearchTerm("");
		setSearch(false);
	}

	useEffect(() => {
		window.addEventListener("keypress", (e) => {
			if (e.key == "Enter" || e.code == "13") {
				handleOnSearch();
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	document.body.style.setProperty("--bg-color", "white");

	if (isInfinteQueryError || isSearchError) {
		return (
			<div className='flex flex-col gap-4'>
				<Pokeball animation='bounce' size='13rem' className='mt-4 translate-y-16' />
				<div className='grid place-items-center gap-6'>
					<h2 className='mt-16  text-center font-pokemon text-5xl text-red-500 sm:text-8xl'>
						{(infinteQueryError?.response?.data ?? infinteQueryError?.message) || (searchError?.response?.data ?? infinteQueryError?.message)}
					</h2>
					<button className=' rounded-md px-4 py-1 font-pokemon text-3xl text-black shadow' onClick={reset}>
						Go home
					</button>
				</div>
			</div>
		);
	}

	return (
		<section className='mx-auto w-full '>
			<SearchBar
				{...{ handleOnSearch, reset, searchTerm, handleOnSelectingCategory, handleOnInput, category }}
				className='mb-2 mt-8 max-sm:mx-2 sm:my-8 '
			/>
			{loading && <Pokeball />}
			{!loading && !infinteQueryError && (
				<div className='mx-auto grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]  justify-center justify-items-center gap-6 lg:w-full  lg:grid-cols-[repeat(auto-fit,minmax(0,22rem))] max-lg:[&>*]:mx-4'>
					{pokemons?.length !== 0 &&
						pokemons?.map((pokemon, index) => {
							if (pokemon?.name)
								return (
									<Card
										isBookmarked={bookmarkedPokemons?.has(pokemon?.name?.toString())}
										ref={index === pokemons.length - 6 ? lastPokemon : null}
										key={pokemon?.name}
										id={pokemon?.id}
										image={pokemon?.sprites?.other?.dream_world.front_default ?? pokemon?.sprites?.other["official-artwork"]["front_default"]}
										name={pokemon?.name ?? "Loading..."}
									/>
								);
						})}
					{isFetching && <Pokeball className='mt-16' />}
				</div>
			)}
			{!isFetching && !loading && category !== "pokemon" && <h4 className='mb-6 mt-16 text-center  font-pokemon text-5xl '>Reached End</h4>}
		</section>
	);
};

export default PokemonsList;
