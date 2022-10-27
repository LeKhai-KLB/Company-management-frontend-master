const { override, useBabelRc, addWebpackModuleRule } = require("customize-cra");
const path = require("path");
const sassAlias = require("sass-alias");

module.exports = override(
  // eslint-disable-next-line
  useBabelRc(),
  addWebpackModuleRule({
    test: /s[ac]ss/i,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
      },
      {
        loader: "sass-loader",
        options: {
          sassOptions: {
            importer: new sassAlias({
              "~styles": path.join(__dirname, "./src/assets/styles"),
            }).getImporter(),
          },
        },
      },
    ],
  }),
);
