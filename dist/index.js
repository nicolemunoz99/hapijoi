"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Hapi = __importStar(require("@hapi/hapi"));
var joi_1 = __importDefault(require("@hapi/joi"));
var HapiSwagger = __importStar(require("hapi-swagger"));
var inert_1 = __importDefault(require("@hapi/inert"));
var vision_1 = __importDefault(require("@hapi/vision"));
var validate_1 = require("./joi/validate");
var users = [];
var id = 1;
var authUsers = [
    { username: 'nicole', scope: 'admin' },
    { username: 'jon', scope: 'self' }
];
var init = function () { return __awaiter(void 0, void 0, void 0, function () {
    var server;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                server = Hapi.server({
                    port: 4000,
                    host: 'localhost',
                    routes: { cors: true }
                });
                return [4 /*yield*/, server.register(swaggerPlugins)];
            case 1:
                _a.sent();
                return [4 /*yield*/, server.start()];
            case 2:
                _a.sent();
                console.log('Server running at:', server.info.uri);
                server.route({
                    method: 'GET',
                    path: '/',
                    options: {
                        description: 'gets all users',
                        notes: 'returns an array of users',
                        tags: ['api'],
                        response: {
                            schema: validate_1.outgoingAllUsersStruct,
                        }
                    },
                    handler: function () {
                        return users;
                    },
                });
                server.route({
                    method: 'GET',
                    path: '/user/{id}',
                    options: {
                        description: 'returns a single user having identifier "id"',
                        notes: 'posts a user',
                        tags: ['api'],
                        validate: {
                            params: joi_1.default.object({ id: joi_1.default.number().required().description('The id for the user') })
                        },
                        response: {
                            schema: validate_1.outgoingSingleUserStruct,
                        }
                    },
                    handler: function (request) {
                        var id = request.params.id;
                        var target = users.find(function (user) { return user.id === id; });
                        return target;
                    },
                });
                server.route({
                    method: 'POST',
                    path: '/',
                    options: {
                        description: 'adds a new user with salary',
                        notes: 'posts a user',
                        tags: ['api'],
                        validate: {
                            payload: validate_1.singleUserStruct
                        },
                        response: {
                            schema: validate_1.outgoingSingleUserStruct,
                        }
                    },
                    handler: function (request) {
                        var newUser = {
                            id: id,
                            data: request.payload
                        };
                        id++;
                        users = __spreadArrays(users, [newUser]);
                        return newUser;
                    },
                });
                server.route({
                    method: 'POST',
                    path: '/signin/{username}',
                    options: {
                        description: 'signs in user',
                        tags: ['api'],
                        validate: {
                            params: joi_1.default.object({ id: joi_1.default.string().required().description('The username of person signing in') })
                        },
                    },
                    handler: function (request) {
                        return 2;
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
// ... options, plugins ...
var swaggerOptions = {
    info: {
        title: 'Hapi Joi playground doc'
    }
};
var swaggerPlugins = [
    {
        plugin: inert_1.default
    },
    {
        plugin: vision_1.default
    },
    {
        plugin: HapiSwagger,
        options: swaggerOptions
    },
];
init();
