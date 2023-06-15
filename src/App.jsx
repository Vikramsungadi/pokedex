import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./components/Navbar";
import PokemonsList from "./pages/PokemonsList";
import { Route, Routes } from "react-router-dom";
import PokemonDetail from "./pages/PokemonDetail";
import Bookmark from "./pages/Bookmark";
import ScrollToTop from "./components/ScrollToTop";

let queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ScrollToTop className='' />
			<Navbar />
			<Routes>
				<Route path='/' element={<PokemonsList />} />
				<Route path='/bookmarks' element={<Bookmark />} />
				<Route path='/pokemon/:name' element={<PokemonDetail />} />
			</Routes>
		</QueryClientProvider>
	);
}

export default App;
