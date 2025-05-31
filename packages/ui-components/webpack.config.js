const path = require('path');

module.exports = {
	mode: 'development',
	entry: './index.js',
	output: {
		path: __dirname + '../lib',
		filename: '[name].js',
		libraryTarget: 'commonjs2',
	},
	resolve: {
		modules: [path.resolve(__dirname, './src'), 'node_modules'],
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|mjs|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
						plugins: ['@babel/plugin-transform-class-properties'],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								auto: true,
								namedExport: false,
								exportLocalsConvention: 'dashesOnly',
							},
						},
					},
					'postcss-loader',
				],
			},
		],
	},
};
