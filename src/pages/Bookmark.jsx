import Card from "../components/Card";
import pokeball from "../assets/pokeball.svg";
import useFetchBulk from "../hooks/useFetchBulk";
import Pokeball from "../components/Pokeball";

const Bookmark = () => {
	let bookmarkedPokemons = JSON.parse(localStorage.getItem("savedPokemons"));

	if (!bookmarkedPokemons || bookmarkedPokemons.length === 0) {
		return (
			<section className='mt-32'>
				<figure>
					<figcaption className='font-pokemon text-4xl'>No Saved Pokemons</figcaption>
					<img src={pokeball} className='h-48 w-48' alt='pokeball' />
				</figure>
			</section>
		);
	}
	document.body.style.setProperty("--bg-color", "white");
	// eslint-disable-next-line react-hooks/rules-of-hooks
	let data = useFetchBulk(bookmarkedPokemons.map((name) => ({ name: name })));

	let loading = data?.some(({ isLoading }) => isLoading === true);

	let Pokemons = data?.map(({ data }) => data);

	return (
		<section className='mx-auto w-full '>
			{loading && <Pokeball />}
			{!loading && (
				<div className='mx-auto grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]  justify-center justify-items-center gap-6 lg:w-full  lg:grid-cols-[repeat(auto-fit,minmax(0,22rem))] max-lg:[&>*]:mx-4'>
					{Pokemons?.map((pokemon) => (
						<Card
							isBookmarked={true}
							key={pokemon?.id}
							id={pokemon?.id}
							image={pokemon?.sprites?.other?.dream_world.front_default ?? pokemon?.sprites?.other["official-artwork"]["front_default"]}
							name={pokemon?.name}
						/>
					))}
				</div>
			)}
		</section>
	);
};

export default Bookmark;
