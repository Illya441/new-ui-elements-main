// import path from 'path';
// import { fileURLToPath } from 'url';
import webpack from 'webpack';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

/* const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
}; */

export default {
  mode: 'production',
  output: {
    // filename: '[name].js',
    // path: PATHS.build,
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false, // disable the behaviour
        },
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['lodash'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: 'maps/[name].js.map',
      exclude: ['vendor/vendor.js'],
    }),
    new LodashModuleReplacementPlugin(),
  ],
  optimization: {
    // minimize: false,
    runtimeChunk: 'single',
    chunkIds: 'named',
    moduleIds: 'named',
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor/vendor',
          priority: -10,
          reuseExistingChunk: true,
          enforce: true,
        },
        default: {
          // chunks: 'all',
          name: 'vendor/commons',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          // enforce: true,
        },
      },
    },
  },
};
