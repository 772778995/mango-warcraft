const { defineConfig } = require("@vue/cli-service");
const { windPreset } = require("can-can-need-bug");

windPreset.prefix = false;
windPreset.addUtilities = {
  preflight: "_",
};
windPreset.preflight = true;

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    windicss: windPreset,
  },
});
