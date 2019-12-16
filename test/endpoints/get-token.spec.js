"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var _this = this;
exports.__esModule = true;
var nock_1 = __importDefault(require("nock"));
var ava_1 = __importDefault(require("ava"));
var get_token_1 = __importDefault(require("../../endpoints/get-token"));
var simple_response_1 = require("../simple-response");
ava_1["default"]('should succeed when valid request', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var req, authToken, res, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req = {
                    headers: {
                        'x-auth-id': 'myId',
                        'x-auth-secret': 'mySecret'
                    }
                };
                authToken = 'si324u223njnpipuh2pu3n4if';
                setUpMockServers(authToken, 200);
                res = new simple_response_1.SimpleResponse();
                return [4 /*yield*/, get_token_1["default"](req, res)];
            case 1:
                result = _a.sent();
                t.is(result, authToken);
                return [2 /*return*/];
        }
    });
}); });
ava_1["default"]('should return 500 and throw when bad request', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var req, authToken, res, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req = {
                    headers: {
                        'x-auth-id': 'myId',
                        'x-auth-secret': 'mySecret'
                    }
                };
                authToken = 'si324u223njnpipuh2pu3n4if';
                setUpMockServers(authToken, 400);
                res = new simple_response_1.SimpleResponse();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, get_token_1["default"](req, res)];
            case 2:
                result = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                return [3 /*break*/, 4];
            case 4:
                t.is(res.code, 500);
                t.is(res.body.code, 'TOKEN_ERROR');
                t.is((!result), true);
                return [2 /*return*/];
        }
    });
}); });
ava_1["default"]('should return 500 and throw when server error', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var req, authToken, res, result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req = {
                    headers: {
                        'x-auth-id': 'myId',
                        'x-auth-secret': 'mySecret'
                    }
                };
                authToken = 'si324u223njnpipuh2pu3n4if';
                setUpMockServers(authToken, 504);
                res = new simple_response_1.SimpleResponse();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, get_token_1["default"](req, res)];
            case 2:
                result = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                return [3 /*break*/, 4];
            case 4:
                t.is(res.code, 500);
                t.is(res.body.code, 'TOKEN_ERROR');
                t.is((!result), true);
                return [2 /*return*/];
        }
    });
}); });
function setUpMockServers(token, tokenCode) {
    if (tokenCode === void 0) { tokenCode = 200; }
    nock_1["default"]('https://account.demandware.com')
        .post('/dw/oauth2/access_token')
        .reply(tokenCode, {
        access_token: token,
        expires_in: 2303208
    });
}