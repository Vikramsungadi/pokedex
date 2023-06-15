import { useEffect, useState } from "react";
import ArrowUp from "../assets/ArrowUp";

const ScrollToTop = (className, ...props) => {
	let [scrolledBeyondScreen, setScrolledBeyondScreen] = useState(false);
	function scrollToStart() {
		window.scrollTo(0, 0);
	}
	useEffect(() => {
		document.addEventListener("scroll", (e) => {
			if (e.target.scrollingElement.scrollTop > e.target.scrollingElement.clientHeight) {
				setScrolledBeyondScreen(true);
			} else {
				setScrolledBeyondScreen(false);
			}
		});
	}, []);
	return (
		<div
			onClick={scrollToStart}
			{...props}
			className={`fixed right-6 top-[88vh] z-50 grid aspect-square w-12 cursor-pointer place-items-center rounded-lg bg-pokemonYellow ${
				className ?? ""
			} ${!scrolledBeyondScreen && "hidden"}`}>
			<ArrowUp className='w-6 stroke-pokemonBlue' />
		</div>
	);
};

export default ScrollToTop;
