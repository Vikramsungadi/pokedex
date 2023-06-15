const StatCard = (props) => (
	<div className='max-sm:mx-auto max-sm:text-center'>
		<h3
			className={`mb-6 w-fit rounded-md bg-white/50 p-2 text-center text-xl font-bold shadow-inner shadow-black/30 backdrop-blur max-sm:mx-auto  max-sm:text-center ${
				props.className ?? ""
			}`}>
			{props.heading ?? "Characterstic"}
		</h3>
		{props.children ?? ""}
	</div>
);

export default StatCard;
