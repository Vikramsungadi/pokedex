import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import BookmarkText from "../assets/BookmarkText";

const Navbar = () => {
	return (
		<header
			className={`sticky top-0 z-[999999] mx-auto flex h-fit w-full items-center justify-between px-5  py-4 backdrop-blur-3xl  max-sm:shadow sm:py-4`}>
			<Link to='/' aria-label='Navigate to home' className='shrink-0'>
				<img src={logo} className='h-8 sm:h-12' alt='' />
			</Link>

			<nav role='navigation' className={`flex w-full items-center  gap-8 font-semibold  text-slate-700/90 dark:text-zinc-300`}>
				<div className='ml-auto'>
					<Link
						to='/bookmarks'
						aria-label='Navigate to bookmarks'
						className='relative cursor-pointer stroke-slate-900 font-pokemon text-3xl text-pokemonYellow transition-colors  [text-shadow:2.5px_-2px_navy] max-sm:text-sm'>
						<BookmarkText className='h-6 sm:h-8' />
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
