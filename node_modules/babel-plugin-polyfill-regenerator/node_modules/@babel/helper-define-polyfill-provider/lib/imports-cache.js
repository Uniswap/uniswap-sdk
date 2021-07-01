"use strict";

exports.__esModule = true;
exports.default = void 0;

var _core = require("@babel/core");

class ImportsCache {
  constructor() {
    this._imports = new WeakMap();
    this._anonymousImports = new WeakMap();
    this._lastImports = new WeakMap();
  }

  storeAnonymous(programPath, url, getVal) {
    const key = this._normalizeKey(programPath, url, "");

    const imports = this._ensure(this._anonymousImports, programPath, Set);

    if (imports.has(key)) return;
    const node = getVal(programPath.node.sourceType === "script", _core.types.stringLiteral(url));
    imports.add(key);

    this._injectImport(programPath, node);
  }

  storeNamed(programPath, url, name, getVal) {
    const key = this._normalizeKey(programPath, url, name);

    const imports = this._ensure(this._imports, programPath, Map);

    if (!imports.has(key)) {
      const {
        node,
        name: id
      } = getVal(programPath.node.sourceType === "script", _core.types.stringLiteral(url), _core.types.identifier(name));
      imports.set(key, id);

      this._injectImport(programPath, node);
    }

    return _core.types.identifier(imports.get(key));
  }

  _injectImport(programPath, node) {
    let lastImport = this._lastImports.get(programPath);

    if (lastImport && lastImport.node) {
      lastImport = lastImport.insertAfter(node);
    } else {
      lastImport = programPath.unshiftContainer("body", node);
    }

    lastImport = lastImport[lastImport.length - 1];

    this._lastImports.set(programPath, lastImport);
  }

  _ensure(map, programPath, Collection) {
    let collection = map.get(programPath);

    if (!collection) {
      collection = new Collection();
      map.set(programPath, collection);
    }

    return collection;
  }

  _normalizeKey(programPath, url, name) {
    return `${programPath.node.sourceType}::${url}::${name}`;
  }

}

exports.default = ImportsCache;