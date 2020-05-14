const replace = require('rollup-plugin-replace');
const buble = require('rollup-plugin-buble');
const json = require('rollup-plugin-json');
const banner = require('./banner');
const pack = require('../package.json');
const babel = require('rollup-plugin-babel');
function toUpper (_, c) {
  return c ? c.toUpperCase() : '';
}

const classifyRE = /(?:^|[-_/])(\w)/g;
function classify (str) {
  return str.replace(classifyRE, toUpper);
}
const moduleName = classify(pack.name);

const entries = {
  commonjs: {
    entry: 'src/index.js',
    dest: `dist/${pack.name}.common.js`,
    format: 'cjs',
    banner
  },
  production: {
    entry: 'src/index.js',
    dest: `dist/${pack.name}.min.js`,
    format: 'umd',
    env: 'production',
    moduleName,
    banner
  },
  development: {
    entry: 'src/index.js',
    dest: `dist/${pack.name}.js`,
    format: 'umd',
    env: 'development',
    moduleName,
    banner
  }
};

function genConfig (opts) {
  const config = {
    entry: opts.entry,
    dest: opts.dest,
    format: opts.format,
    banner: opts.banner,
    exports: 'named',
    moduleName,
    plugins: [
      json(),
      buble(),
      babel()
    ]
  };

  if (opts.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }));
  }

  return config;
}

exports.getEntry = name => genConfig(entries[name]);
exports.getAllEntries = () => Object.keys(entries).map(name => genConfig(entries[name]));
