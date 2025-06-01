import React from 'react';

export default function Linkedin({color}: any) {
	return (
		<svg
			viewBox="0 0 24 24"
			preserveAspectRatio="xMidYMid meet"
			width="100%"
			height="100%"
		>
			<path
				d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 18H5V8h3v10zM6.5 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM19 18h-2.7v-5.1c0-3.06-3.6-2.82-3.6 0V18H10V8h2.7v1.6a3.42 3.42 0 016.3 2.26V18z"
				fill={color === 'currentColor' ? '#2867B2' : 'currentColor'}
				fillRule="evenodd"
			/>
		</svg>
	);
}
