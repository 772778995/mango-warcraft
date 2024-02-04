const { windPreset } = require("can-can-need-bug");

windPreset.prefix = false;
windPreset.addUtilities = {
  preflight: "_",
};
windPreset.preflight = true;

module.exports = windPreset;
