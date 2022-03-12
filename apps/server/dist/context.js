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
exports.__esModule = true;
var client_1 = require("@prisma/client");
var auth0_1 = require("auth0");
var jwt_1 = require("./jwt");
var utils_1 = require("./utils");
var apollo_server_1 = require("apollo-server");
var prisma = new client_1.PrismaClient();
var auth0 = new auth0_1.ManagementClient({
    domain: (0, utils_1.getOrThrow)(process.env.AUTH0_DOMAIN, 'AUTH0_DOMAIN'),
    clientId: (0, utils_1.getOrThrow)(process.env.AUTH0_CLIENT_ID, 'AUTH0_CLIENT_ID'),
    clientSecret: (0, utils_1.getOrThrow)(process.env.AUTH0_CLIENT_SECRET, 'AUTH0_CLIENT_SECRET'),
    scope: 'read:users'
});
function makeContext(params) {
    return function createContext(expressContext) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var authHeader, payload_1, _c, membership, error_1;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        authHeader = "".concat(expressContext.req.headers['authorization']);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, , 7]);
                        if (!authHeader) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, jwt_1.verify)(authHeader)];
                    case 2:
                        _c = _d.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _c = null;
                        _d.label = 4;
                    case 4:
                        payload_1 = _c;
                        return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                                var membership_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(payload_1 === null || payload_1 === void 0 ? void 0 : payload_1.sub)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, params.prisma.membership.findFirst({
                                                    where: { userId: payload_1.sub },
                                                    orderBy: { createdAt: 'asc' },
                                                    select: { id: true, userId: true, organizationId: true }
                                                })];
                                        case 1:
                                            membership_1 = _a.sent();
                                            return [2 /*return*/, membership_1];
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); })()];
                    case 5:
                        membership = _d.sent();
                        return [2 /*return*/, {
                                auth0: auth0,
                                prisma: prisma,
                                membershipId: membership === null || membership === void 0 ? void 0 : membership.id,
                                userId: (_a = membership === null || membership === void 0 ? void 0 : membership.userId) !== null && _a !== void 0 ? _a : undefined,
                                organizationId: (_b = membership === null || membership === void 0 ? void 0 : membership.organizationId) !== null && _b !== void 0 ? _b : undefined
                            }];
                    case 6:
                        error_1 = _d.sent();
                        console.error(error_1);
                        if (error_1 instanceof apollo_server_1.AuthenticationError) {
                            throw new apollo_server_1.AuthenticationError(error_1.message);
                        }
                        else if (error_1 instanceof apollo_server_1.ApolloError) {
                            throw new apollo_server_1.ApolloError(error_1.message);
                        }
                        else {
                            throw new apollo_server_1.ApolloError('Unknown error');
                        }
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
}
exports["default"] = {
    makeDefaultContext: function () { return makeContext({ prisma: prisma, auth0: auth0 }); }
};
//# sourceMappingURL=context.js.map