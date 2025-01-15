module.exports = {
  apps: [
    {
      name: "mls-egypt-system",
      port: "9020",
      exec_mode: "cluster",
      script: "./.output/server/index.mjs",
    },
  ],
};
