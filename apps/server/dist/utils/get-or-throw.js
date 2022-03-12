"use strict";
exports.__esModule = true;
var getOrThrow = function (value, name) {
    if (!value) {
        throw new Error("Undefined environment variable: ".concat(name));
    }
    return value;
};
exports["default"] = getOrThrow;
//# sourceMappingURL=get-or-throw.js.map