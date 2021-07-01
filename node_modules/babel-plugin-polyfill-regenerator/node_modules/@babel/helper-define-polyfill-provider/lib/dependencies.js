"use strict";

exports.__esModule = true;
exports.has = has;
exports.logMissing = logMissing;
exports.laterLogMissing = laterLogMissing;

var _resolve = _interopRequireDefault(require("resolve"));

var _lodash = _interopRequireDefault(require("lodash.debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function has(basedir, name) {
  try {
    _resolve.default.sync(name, {
      basedir
    });

    return true;
  } catch {
    return false;
  }
}

function logMissing(missingDeps) {
  if (missingDeps.size === 0) return;
  const deps = Array.from(missingDeps).sort().join(" ");
  console.warn("\nSome polyfills have been added but are not present in your dependencies.\n" + "Please run one of the following commands:\n" + `\tnpm install --save ${deps}\n` + `\tyarn add ${deps}\n`);
  process.exitCode = 1;
}

let allMissingDeps = new Set();
const laterLogMissingDependencies = (0, _lodash.default)(() => {
  logMissing(allMissingDeps);
  allMissingDeps = new Set();
}, 1000);

function laterLogMissing(missingDeps) {
  missingDeps.forEach(name => allMissingDeps.add(name));
  laterLogMissingDependencies();
}