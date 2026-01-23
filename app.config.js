export default ({ config }) => ({
  ...config,
  extra: {
    ...(config.extra || {}),
    API_BASE: process.env.VITE_API_BASE,
  },
});
