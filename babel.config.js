module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  plugins.push("react-native-worklets/plugin");
  plugins.push([
    "module-resolver",
    {
      alias: {
        "@": ".",
        "@/src": "./src",
        "@/features": "./src/features",
        "@/components": "./components",
        "@/lib": "./lib",
        "@/hooks": "./hooks",
        "@/constants": "./constants",
      },
    },
  ]);

  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
    plugins,
  };
};
