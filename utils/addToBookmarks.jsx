function addToBookmarks(name) {
	let savedPokemons;
	let locallySavedPokemons = localStorage.getItem("savedPokemons");
	if (locallySavedPokemons) {
		savedPokemons = JSON.parse(locallySavedPokemons);
	} else {
		savedPokemons = new Set();
	}
	let Pokemons = new Set(savedPokemons);

	if (Pokemons.has(name)) {
		Pokemons.delete(name);
	} else {
		Pokemons.add(name);
	}
	localStorage.setItem("savedPokemons", JSON.stringify([...new Set(Pokemons)]));
}

export default addToBookmarks;
