import React from 'react';

export default function X({color}: any) {
	return (
		<svg viewBox="0 0 24 24">
			<path
				fill={color === 'currentColor' ? 'var(--text-default)' : 'currentColor'}
				fillRule="nonzero"
				d="m14.3 10.2 9-10.2H21l-7.8 8.8L7.1 0H0l9.4 13.3L0 24h2.1l8.2-9.3L17 24H24l-9.7-13.8Zm-3 3.3-.9-1.4L3 1.6H6l6.1 8.5 1 1.3L21 22.5h-3.3l-6.4-9Z"
			/>
		</svg>
	);
}
