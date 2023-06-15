import pokeball from "../assets/pokeball.svg";

const Pokeball = ({ className, ...props }) => {
	return (
		<div {...props} className={`mt-24 grid h-full w-full place-items-center ${className ?? ""}`}>
			<img
				src={pokeball}
				style={{
					height: props.size ?? "8rem",
				}}
				className={` ${!props.animation ? "animate-spin" : "animate-bounce"} ${className ?? ""} max-sm:h-20 ${
					props.margin === "sm" ? "mt-16" : "mt-24"
				}`}
			/>
		</div>
	);
};

export default Pokeball;
