import React from 'react';

export default function Facebook({color}: any) {
	return (
		<svg viewBox="0 0 24 24" width="100%" height="100%">
			<circle
				fill={color === 'currentColor' ? '#ffffff' : 'transparent'}
				cx="12"
				cy="12"
				r="11.9"
			/>
			<path
				fill={color === 'currentColor' ? '#0866FF' : 'currentColor'}
				fillRule="evenodd"
				d="M24 12A12 12 0 1 0 9.1 23.7v-8H6.6V12h2.5v-1.5c0-4.1 1.8-6 5.9-6 .7 0 2 .1 2.6.3V8h-1.4c-2 0-2.7.7-2.7 2.6V12h3.9l-.7 3.7h-3.2V24A12 12 0 0 0 24 12Z"
			/>
		</svg>
	);
}
