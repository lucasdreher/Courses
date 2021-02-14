const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'cheap-eval-source-map',
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'app.js',
		publicPath: '/public/'
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ [ '@babel/preset-env', { targets: 'defaults' } ] ]
					}
				}
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	}
};
