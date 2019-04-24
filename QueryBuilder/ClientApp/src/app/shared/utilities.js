"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replacer(key, value) {
    if (key == "arrayOwner")
        return undefined;
    else if (key == "conditions" && !!value && value.length == 0)
        return undefined;
    else
        return value;
}
exports.replacer = replacer;
//# sourceMappingURL=utilities.js.map