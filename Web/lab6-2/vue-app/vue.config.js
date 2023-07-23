const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true

  /*chainWebpack(config) {
    config.resolve.symlinks(false);
    config.resolve.alias.set("vue", path.resolve("./node_modules/vue"));
  },*/
})
