const withTM = require('next-transpile-modules')(['ui-components']);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true
});
