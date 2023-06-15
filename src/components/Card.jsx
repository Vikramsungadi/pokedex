import React, { useState } from "react";
import { capitalize } from "../../utils/helpers";
import { Link } from "react-router-dom";
import addToBookmarks from "../../utils/addToBookmarks";

const Card = React.forwardRef(function Card(props, ref) {
	let [isBookmarked, setIsBookmarked] = useState(props.isBookmarked);

	function handleAddToBookmark(name) {
		return () => {
			setIsBookmarked((prev) => !prev);
			addToBookmarks(name);
		};
	}

	return (
		<div
			ref={ref}
			className={`group relative m-3 flex w-full max-w-[22rem] flex-col rounded-lg bg-[#7c8282] text-zinc-950 shadow transition-[transform,background-color] [clip-path:polygon(100%_0,100%_100%,20%_100%,0_80%,0_0);] before:absolute before:-z-10  before:h-full before:w-full before:-translate-y-1 before:translate-x-1  before:overflow-hidden before:rounded-[inherit]  before:bg-[#e2e5e4] before:[clip-path:polygon(100%_0,100%_100%,20%_100%,0_80%,0_0);]${
				props?.className ?? ""
			} ${props.name === "Loading..." && "animate-pulse opacity-50"}`}>
			<div className='mx-auto mb-2 space-x-2'>
				<span className='inline-block h-[0.4rem] w-[0.4rem] rounded-full  border-[0.5px] border-black bg-red-600 transition-transform duration-500 [--delay:0s] group-hover:scale-[1.4] group-hover:animate-blink'></span>
				<span className='inline-block h-[0.4rem]  w-[0.4rem] rounded-full border-[0.5px] border-black bg-red-600 transition-transform duration-500 [--delay:0.5s] group-hover:scale-[1.4] group-hover:animate-blink'></span>
			</div>
			<Link
				to={`/pokemon/${props?.name}`}
				aria-label={`Navigate to ${props?.name} page`}
				className='mx-auto grid aspect-video w-9/12 place-items-center rounded border border-gray-900 bg-white '>
				<img
					className={`mx-auto my-auto aspect-video w-[75%] object-contain p-1 text-center font-pokemon text-xl font-semibold tracking-widest transition-transform duration-300  group-hover:animate-float ${
						!props.image && "animate-pulse"
					}`}
					src={props?.image}
					alt={capitalize(props?.name ?? "")}
				/>
			</Link>
			<div className='mx-auto mb-8 mt-6 flex w-full max-w-[70%] items-center justify-between'>
				<div onClick={handleAddToBookmark(props?.name)} className='group/bookmark relative shrink-0 group-hover:animate-pulse'>
					<p className='absolute -left-3/4 -top-[80%]  hidden  text-xs group-hover/bookmark:inline-block '>
						{isBookmarked ? "Bookmarked" : "Bookmark"}
					</p>
					<span
						className={`inline-block h-5  w-5 cursor-pointer rounded-full ${
							isBookmarked ? "bg-pokemonYellow outline-pokemonBlue" : "bg-red-600 outline-black"
						}  shadow-inner shadow-zinc-600 outline outline-2 `}></span>
				</div>
				<Link
					to={`/pokemon/${props?.name}`}
					aria-label={`Navigate to ${props?.name} page`}
					className='mx-2 origin-left text-center font-pokemon text-xl font-semibold tracking-wider transition-colors group-hover:text-pokemonYellow group-hover:[-webkit-text-stroke:0.5px_#0b0a6e] group-hover:[text-stroke:0.5px_#0b0a6e] '>
					<h3>{capitalize(props?.name)}</h3>
				</Link>
				<div className='flex flex-col gap-1'>
					<span className='inline-block h-1 w-20 rounded-md bg-gray-700 [--delay:0.3s] group-hover:animate-pulseDelay'></span>
					<span className='inline-block h-1 w-20 rounded-md bg-gray-700 [--delay:0.6s] group-hover:animate-pulseDelay'></span>
					<span className='inline-block h-1 w-20 rounded-md bg-gray-700 [--delay:0.9s] group-hover:animate-pulseDelay'></span>
					<span className='inline-block h-1 w-20 rounded-md bg-gray-700 [--delay:1.2s] group-hover:animate-pulseDelay'></span>
				</div>
			</div>
		</div>
	);
});

export default Card;
