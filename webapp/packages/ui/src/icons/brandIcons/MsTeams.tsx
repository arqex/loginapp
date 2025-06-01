import React from 'react';

export default function MsTeams() {
	return (
		<svg viewBox="0 0 24 24">
			<defs>
				<linearGradient
					x1="17.37%"
					y1="-6.51%"
					x2="82.63%"
					y2="106.51%"
					id="ms-teams-gradient"
				>
					<stop stopColor="#5A62C3" offset="0%" />
					<stop stopColor="#4D55BD" offset="50%" />
					<stop stopColor="#3940AB" offset="100%" />
				</linearGradient>
			</defs>
			<g transform="translate(0 1)" fillRule="nonzero" fill="none">
				<path
					d="M16.74 8.25h6.2c.59 0 1.06.47 1.06 1.04v5.57a3.87 3.87 0 01-3.9 3.84h-.02a3.87 3.87 0 01-3.9-3.84V8.8c0-.3.25-.55.56-.55z"
					fill="#5059C9"
				/>
				<ellipse fill="#5059C9" cx="20.93" cy="4.67" rx="2.51" ry="2.47" />
				<ellipse fill="#7B83EB" cx="13.12" cy="3.58" rx="3.63" ry="3.58" />
				<path
					d="M17.95 8.25H7.72c-.58.01-1.04.49-1.02 1.06v6.34A6.24 6.24 0 0012.84 22a6.24 6.24 0 006.14-6.35V9.31a1.04 1.04 0 00-1.03-1.06z"
					fill="#7B83EB"
				/>
				<path
					d="M1 5h10a1 1 0 011 1v10a1 1 0 01-1 1H1a1 1 0 01-1-1V6a1 1 0 011-1z"
					fill="url(#ms-teams-gradient)"
				/>
				<path fill="#FFF" d="M8.83 8.79H6.8v5.49h-1.3v-5.5H3.44V7.73h5.38z" />
			</g>
		</svg>
	);
}
