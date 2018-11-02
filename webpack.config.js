//const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const GenerateJsonPlugin = require("generate-json-webpack-plugin");
const ZipWebpackPlugin = require("zip-webpack-plugin");
const {getIfUtils, removeEmpty} = require("webpack-config-utils");
const manifest = require("./src/manifest.json");


manifest["content_security_policy"] = "script-src 'self'; object-src 'self'";


module.exports = (env, argv) => {
	const {ifProduction, ifNotProduction} = getIfUtils(argv.mode);

	return {
		devtool: ifProduction() ? "source-map" : "eval-sourcemap",
		entry: {
//			"js/devtools": "./src/js/devtools.js",
			"js/index": "./src/js/index.js"
		},
		module: {
			rules: [
//				{
//					test: /\.css$/,
//					use: ["style-loader", "css-loader"]
//				},
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: ["babel-loader"]
				}
			]
		},
		resolve: {
			extensions: ["*", ".js", ".jsx"]
		},
		output: {
			path: __dirname + "/dist",
			filename: "[name].bundle.js"
		},
		plugins: removeEmpty([
			new CleanWebpackPlugin(["dist"]),
			new CopyWebpackPlugin(removeEmpty([
				ifNotProduction({ from: "./src/manifest.json", to: "." }),
				{ from: "./src/devtools.html", to: "." },
				{ from: "./src/js/devtools.js", to: "js" },
				{ from: "./src/css/", to: "css" },
				{ from: "./src/img/", to: "img" }
			])),
//			new webpack.ContextReplacementPlugin(
//				/moment[\/\\]locale$/,
//				/^$/
//			),
			new HtmlWebpackPlugin({
				template: "./src/panel.html",
				filename: "panel.html",
				chunks: ["js/index"]
			}),
			ifProduction(new GenerateJsonPlugin("manifest.json",
				manifest, null, "\t")),
			ifProduction(new ZipWebpackPlugin({
				path: "../release",
				filename: "Devtools Network Timestamps.zip"
			}))
		])
	}
};
