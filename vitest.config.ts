// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vitest/config";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: [
//       { find: /^react-native$/, replacement: "react-native-web" },
//       { find: /^react-native\/(.*)$/, replacement: "react-native-web/$1" },
//     ],
//   },
//   test: {
//     environment: "jsdom",
//     globals: true,
//     setupFiles: ["./components/setup.tsx"],
//   },
// });
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^react-native$/, replacement: "react-native-web" },
      { find: /^react-native\/(.*)$/, replacement: "react-native-web/$1" },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./components/setup.tsx"], // your setup file
  },
});

