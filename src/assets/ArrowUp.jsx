function ArrowUp(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='evenodd'
			fill='none'
			strokeLinecap='round'
			strokeLinejoin='round'
			{...props}>
			<path d='M0 0h24v24H0z' stroke='none' />
			<path
				d='M10.586 3L4 9.586a2 2 0 00-.434 2.18l.068.145A2 2 0 005.414 13H8v5a1 1 0 001 1h6l.117-.007A1 1 0 0016 18l-.001-5h2.587A2 2 0 0020 9.586L13.414 3a2 2 0 00-2.828 0zM15 20a1 1 0 01.117 1.993L15 22H9a1 1 0 01-.117-1.993L9 20h6z'
				fill='currentColor'
				stroke='none'
			/>
		</svg>
	);
}

export default ArrowUp;
