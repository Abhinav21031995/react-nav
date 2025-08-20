const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: ["./src/bootstrap.tsx", "./src/index.tsx"],
  mode: "development",
  devServer: {
    port: 3002,
    open: false,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    client: {
      webSocketURL: {
        hostname: "localhost",
      },
    },
    allowedHosts: "all",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "reactnav",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
        "./assets/logo": "./public/Passport-logo-RGB.svg"
      },
      shared: {
        "react": {
          singleton: true,
          requiredVersion: ">=18.2.0", 
          eager: process.env.NODE_ENV === 'development',
          strictVersion: false
        },
        "react-dom": {
          singleton: true,
          requiredVersion: ">=18.2.0",
          eager: process.env.NODE_ENV === 'development',
          strictVersion: false
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: "assets",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: process.env.NODE_ENV === 'development' ? 'auto' : 'http://localhost:3002/',
  },
};
