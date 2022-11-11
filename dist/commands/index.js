"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommand = exports.PingCommand = void 0;
const tslib_1 = require("tslib");
const ping_1 = tslib_1.__importStar(require("./ping"));
exports.PingCommand = ping_1.default;
const create_1 = tslib_1.__importStar(require("./create"));
exports.CreateCommand = create_1.default;
exports.default = [
    ping_1.getData,
    create_1.getData
];
//# sourceMappingURL=index.js.map