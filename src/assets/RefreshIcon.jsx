function RefreshIcon(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='icon icon-tabler icon-tabler-refresh'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='evenodd'
			fill='none'
			strokeLinecap='round'
			strokeLinejoin='round'
			{...props}>
			<path d='M0 0h24v24H0z' stroke='none' />
			<path d='M20 11A8.1 8.1 0 004.5 9M4 5v4h4M4 13a8.1 8.1 0 0015.5 2m.5 4v-4h-4' />
		</svg>
	);
}

export default RefreshIcon;
