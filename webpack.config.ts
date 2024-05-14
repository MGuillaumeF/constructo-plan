/**
 * Node imports
 */
import path from "path";

/**
 * WebPack Plugins import
 */
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

enum WebPackMode {
    DEV = "development",
    PROD = "production"
}
enum LogTheme {
    CLEAN = "CLEAN",
    INITIALISATION = "INITIALISATION"
}
enum LogLevel {
    DEBUG = "debug",
    ERROR = "error",
    INFO = "info",
    WARNING = "warning"
}

/**
 * 
 * @param level 
 * @param theme 
 * @param message 
 */
function trace(level : LogLevel, theme : LogTheme, ...message : any[]) {
  if (message.length !== 0) {
    let call = console.info;
    switch (level) {
        case LogLevel.DEBUG:
            call = console.debug;
            break;
        case LogLevel.INFO:
            call = console.info;
            break;
        case LogLevel.WARNING:
            call = console.warn;
            break;
        case LogLevel.ERROR:
            call = console.error;
            break;
    }

    call(
      `[${level}]`.padEnd(6, " "),
      theme.padEnd(25, " "),
      ...message
    );
  }
}

export default () => {
  /**
   * save webpack mode
   * development or production
   */
  const MODE = process.env['NODE_ENV'];

  trace(LogLevel.INFO, LogTheme.INITIALISATION, "Webpack configuration run...");

  const config = {
    mode: MODE,
    entry: "./src/index.tsx",
    cache: false,
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: MODE === WebPackMode.DEV ? "/" : process.env['PUBLIC_PATH'] || ".",
      filename:
        MODE === WebPackMode.DEV  ? "[name].bundle.js" : "[name].[prod].bundle.js"
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [
        ".ts",
        ".tsx",
        ".js",
        ".scss",
        ".svg",
        ".png",
        ".gif",
        ".jpg",
        ".jpeg"
      ]
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MODE === WebPackMode.DEV  ?"style-loader" : MiniCssExtractPlugin.loader, 
            {
              loader: "@teamsupercell/typings-for-css-modules-loader",
              options: {
                formatter: "prettier"
              }
            },
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            },
            // prefix for css rules
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "autoprefixer",
                      {
                        // Options
                      }
                    ]
                  ]
                }
              }
            },
            // Compiles Sass to CSS
            "sass-loader"
          ]
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader"
            }
          ],
          exclude: [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, "dist"),
            path.resolve(__dirname, "test")
          ]
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: "head",
        title: "Constructo Plan",
        template: path.resolve(__dirname, "public/index.html"),
        //favicon: path.resolve(__dirname, "../../resources/icon/cpp-coso/cpp-coso.svg"),
        filename: "index.html"
      }), ...(MODE === WebPackMode.PROD ? [new MiniCssExtractPlugin()] : [])
    ],
    devServer : {
      historyApiFallback: true,
      client: {
        overlay: {
          errors: true,
          warnings: false
        }
      },
      //static: [path.join(__dirname, "dist")],
      //compress: true,
      port: 3000,
      hot: true
    }
  };
  return config;
};