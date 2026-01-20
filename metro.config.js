const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Ignore tests in bundling
config.resolver.blockList = [
  /.*\/__tests__\/.*/,
  /.*\.(test|spec)\.(js|jsx|ts|tsx)$/,
];

module.exports = withNativeWind(config, { input: "./global.css" });
