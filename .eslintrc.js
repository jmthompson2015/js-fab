module.exports = {
  env: {
    browser: true,
  },
  extends: ["airbnb", "prettier"],
  globals: {
    QUnit: true,
    R: true,
  },
  rules: {
    "import/extensions": ["error", { js: "always" }],
    "max-len": ["error", { code: 100, ignoreUrls: true }],
  },
};
