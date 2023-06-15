import { useParams } from "react-router-dom";
import { capitalize, capitalizeAll } from "../../utils/helpers";
import addToBookmarks from "../../utils/addToBookmarks";
import useFetchDetails from "../hooks/useFetchDetails";
import BookmarkIcon from "../assets/BookmarkIcon";
import StatCard from "../components/StatCard";
import { useState } from "react";
import pokeball from "../assets/pokeball.svg";

const PokemonDetail = () => {
	const { name } = useParams();
	const { data: pokemon, isLoading } = useFetchDetails([name], `https://pokeapi.co/api/v2/pokemon/${name}`);
	const { data } = useFetchDetails(["color", name], `https://pokeapi.co/api/v2/pokemon-species/${name}`);
	const { data: descriptions } = useFetchDetails(["characterstic", name], `https://pokeapi.co/api/v2/characteristic/${name}`);
	const { data: encounters } = useFetchDetails(["encounters", name], `https://pokeapi.co/api/v2/pokemon/${name}/encounters`);
	if (encounters?.length > 8) {
		encounters?.splice(8);
	}
	let characterstic = descriptions?.descriptions?.find(({ language: { name } }) => name === "en");
	let bookmarks = JSON.parse(localStorage.getItem("savedPokemons")) ?? [];
	let [isBookmarked, setIsBookmarked] = useState(bookmarks?.includes(name));

	document.body.style.setProperty("--bg-color", data?.color?.name);

	function handleAddToBookmark(name) {
		return () => {
			addToBookmarks(name);
			setIsBookmarked((prev) => !prev);
		};
	}
	if (isLoading) return <img src={pokeball} className='mx-auto mt-24 h-48 w-48 animate-spin' alt='' />;

	return (
		<section className={` relative w-full bg-[var(--color)] p-2 transition-colors  `}>
			<div
				onClick={handleAddToBookmark(name)}
				className={`absolute right-0 top-0  m-4 aspect-square w-6 origin-center animate-pingOnce  cursor-pointer transition-transform active:scale-90 sm:m-6 sm:w-12`}>
				<BookmarkIcon className={`${isBookmarked && "fill-pokemonYellow"}`} />
			</div>
			<div className='flex w-full justify-around gap-4 max-md:flex-wrap md:mt-6 lg:justify-evenly '>
				<figure>
					<img
						className='aspect-square w-[16rem] max-sm:mt-3 sm:w-[20rem] lg:w-[22rem]  '
						src={pokemon?.sprites?.other?.dream_world.front_default ?? pokemon?.sprites?.other["official-artwork"]["front_default"]}
						alt={pokemon.name}
					/>
					<figcaption className='my-4 flex flex-col items-center text-center font-pokemon text-3xl font-semibold tracking-widest sm:text-5xl md:mt-10'>
						{capitalize(pokemon.name)}
					</figcaption>
				</figure>
				<ul className='my-auto flex  flex-col gap-4 rounded-md bg-white/30 p-6  pb-16 shadow backdrop-blur-sm '>
					<li className='text-center'>Stats</li>
					{pokemon.stats.map((stat) => (
						<li className='grid  grid-cols-[auto_minmax(7rem,9rem)] items-center gap-4 ' key={stat.stat.name}>
							<div className='mr-auto text-sm  '>{capitalizeAll(stat.stat.name)}</div>
							<div
								style={{
									"--width": (stat.base_stat / 120) * 100 + "%",
									"--color":
										(stat.base_stat / 120) * 100 > 80 ? "rgb(34 197 94)" : (stat.base_stat / 120) * 100 > 50 ? "rgb(251 191 36)" : "rgb(239 68 68)",
								}}
								className={`relative inline-block h-1.5 w-full overflow-hidden rounded-lg  bg-gray-200 before:absolute before:h-full before:w-[var(--width)] before:origin-left before:animate-scaleX before:bg-[var(--color)]`}></div>
						</li>
					))}
				</ul>
			</div>
			<div className='mt-8 flex gap-16 max-sm:flex-wrap'>
				<StatCard heading='Abilities'>
					<ul className='flex flex-wrap gap-4 max-sm:flex-wrap'>
						{pokemon?.abilities?.map((item) => (
							<li key={item.ability.name} className='list-none rounded-md  bg-white/50 p-3 font-semibold shadow backdrop-blur-lg'>
								{capitalizeAll(item.ability.name)}
							</li>
						))}
					</ul>
				</StatCard>

				{characterstic?.description && (
					<StatCard heading='Characterstic'>
						<p className='list-none rounded-md bg-white/50 p-3 font-semibold shadow backdrop-blur-lg'>{characterstic?.description}</p>
					</StatCard>
				)}
				{encounters?.length > 0 && (
					<StatCard heading='Encounters'>
						<ul className='flex flex-wrap gap-4 max-sm:flex-wrap'>
							{encounters?.map((item) => (
								<li key={item?.location_area?.name} className='list-none rounded-md  bg-white/50 p-3 font-semibold shadow backdrop-blur-lg'>
									{capitalizeAll(item?.location_area?.name)}
								</li>
							))}
						</ul>
					</StatCard>
				)}
			</div>
		</section>
	);
};

export default PokemonDetail;
