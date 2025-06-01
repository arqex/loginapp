import React from 'react';

export default function ICloud() {
	return (
		<svg viewBox="0 0 24 24">
			<defs>
				<radialGradient
					cx="51.04%"
					cy="100%"
					fx="51.04%"
					fy="100%"
					r="105.84%"
					gradientTransform="matrix(0 -1 .91423 0 -.4 1.51)"
					id="icloud-a-gradient"
				>
					<stop stopColor="#1D94F9" offset="0%" />
					<stop stopColor="#75E7FF" stopOpacity=".46" offset="63.85%" />
					<stop stopColor="#4DBCFE" stopOpacity="0" offset="100%" />
				</radialGradient>
				<linearGradient
					x1="100%"
					y1="70.33%"
					x2="0%"
					y2="70.33%"
					id="icloud-b-gradient"
				>
					<stop stopColor="#005CF2" offset="0%" />
					<stop stopColor="#86E0FE" offset="100%" />
				</linearGradient>
			</defs>
			<g transform="translate(1 5)" fill="none" fillRule="evenodd">
				<path
					d="M12.69.02c3.27 0 5.96 2.5 6.28 5.68a4.22 4.22 0 013.06 4.25V10l-.01.13c-.06.68-.28 1.3-.62 1.85-.7 1.15-1.93 2-3.56 2H4.46c-.14 0-.28 0-.42-.02a4.27 4.27 0 01-3.36-2.07 4.46 4.46 0 012-6.47A3.21 3.21 0 017.4 2.88 6.3 6.3 0 0112.69.02z"
					fill="url(#icloud-b-gradient)"
				/>
				<circle
					fillOpacity=".7"
					fill="#86B3FE"
					opacity=".4"
					cx="17.81"
					cy="9.76"
					r="4.22"
				/>
				<circle
					fillOpacity=".7"
					fill="#86D6FE"
					opacity=".4"
					cx="12.69"
					cy="6.33"
					r="6.31"
				/>
				<circle
					fillOpacity=".4"
					fill="#D5FFE6"
					opacity=".4"
					cx="5.89"
					cy="5.73"
					r="3.22"
				/>
				<circle
					fillOpacity=".4"
					fill="#D5FFE6"
					opacity=".4"
					cx="4.46"
					cy="9.52"
					r="4.46"
				/>
				<path
					d="M12.69.02c3.27 0 5.96 2.5 6.28 5.68a4.22 4.22 0 013.06 4.25V10l-.01.13c-.06.68-.28 1.3-.62 1.85-.7 1.15-1.93 2-3.56 2H4.46c-.14 0-.28 0-.42-.02a4.27 4.27 0 01-3.36-2.07 4.46 4.46 0 012-6.47A3.21 3.21 0 017.4 2.88 6.3 6.3 0 0112.69.02z"
					fill="url(#icloud-a-gradient)"
				/>
			</g>
		</svg>
	);
}
