"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verify = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwks_rsa_1 = __importDefault(require("jwks-rsa"));
var utils_1 = require("./utils");
var AUTH0_DOMAIN = (0, utils_1.getOrThrow)(process.env.AUTH0_DOMAIN, "AUTH0_DOMAIN");
var client = (0, jwks_rsa_1["default"])({
    jwksUri: "https://".concat(AUTH0_DOMAIN, "/.well-known/jwks.json")
});
var getKey = function (header, callback) {
    client.getSigningKey(header.kid, function (_, key) {
        var signingKey = key
            ? "publicKey" in key
                ? key.publicKey
                : key.rsaPublicKey
            : undefined;
        callback(null, signingKey);
    });
};
function verify(authHeader) {
    return __awaiter(this, void 0, void 0, function () {
        var bearerToken_1, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!authHeader) return [3 /*break*/, 2];
                    bearerToken_1 = authHeader.split(" ");
                    return [4 /*yield*/, new Promise(function (resolve) {
                            jsonwebtoken_1["default"].verify(bearerToken_1[1], getKey, {
                                audience: process.env.API_IDENTIFIER,
                                issuer: "https://".concat(AUTH0_DOMAIN, "/"),
                                algorithms: ["RS256"]
                            }, function (error, decoded) {
                                if (error) {
                                    resolve({ error: error });
                                }
                                if (decoded) {
                                    resolve({ decoded: decoded });
                                }
                            });
                        })];
                case 1:
                    result = _a.sent();
                    if (result.error) {
                        console.error(result.error.message, { context: { error: result.error } });
                    }
                    return [2 /*return*/, result.decoded];
                case 2: throw new Error("No token provided");
            }
        });
    });
}
exports.verify = verify;
//# sourceMappingURL=jwt.js.map