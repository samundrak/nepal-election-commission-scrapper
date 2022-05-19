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
exports.ElectionCentreStrategy = void 0;
var ElectionCentre_1 = __importDefault(require("../entities/ElectionCentre"));
var Voter_1 = __importDefault(require("../entities/Voter"));
var JobTypEnum_1 = require("../enum/JobTypEnum");
var utils_1 = require("../utils");
var ElectionCentreStrategy = /** @class */ (function () {
    function ElectionCentreStrategy() {
    }
    ElectionCentreStrategy.prototype.fetch = function (em, data) {
        return __awaiter(this, void 0, void 0, function () {
            var api, typedData, payload, response, entitties;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        api = "https://voterlist.election.gov.np/bbvrs1/view_ward_1.php";
                        typedData = data;
                        payload = {
                            state: typedData.parent[JobTypEnum_1.JobTypeEnum.WARD].parent[JobTypEnum_1.JobTypeEnum.MUNCIPAL].parent[JobTypEnum_1.JobTypeEnum.DISTRICT
                            //@ts-expect-error
                            ].parent[JobTypEnum_1.JobTypeEnum.STATE].code,
                            district: typedData.parent[JobTypEnum_1.JobTypeEnum.WARD].parent[JobTypEnum_1.JobTypeEnum.MUNCIPAL].parent[JobTypEnum_1.JobTypeEnum.DISTRICT].value.code,
                            vdc_mun: typedData.parent[JobTypEnum_1.JobTypeEnum.WARD].parent[JobTypEnum_1.JobTypeEnum.MUNCIPAL].value
                                .code,
                            ward: typedData.parent[JobTypEnum_1.JobTypeEnum.WARD].value.code,
                            reg_centre: data.value.code
                        };
                        console.log("Fetching data ".concat(JobTypEnum_1.JobTypeEnum.LOCAL_CENTRE, " ").concat(data.code), payload);
                        return [4 /*yield*/, (0, utils_1.standardAPICall)(api, payload)];
                    case 1:
                        response = _b.sent();
                        console.log("Fetched data ".concat(JobTypEnum_1.JobTypeEnum.LOCAL_CENTRE, " ").concat(data.code), payload);
                        entitties = (0, utils_1.getVoterListFromRawHTML)(response.data, function (item) {
                            var voter = new Voter_1["default"]();
                            voter.age = item.age;
                            voter.spouseName = item.spouseName;
                            voter.gender = item.gender;
                            voter.fatherName = item.fatherName;
                            voter.motherName = item.motherName;
                            voter.voterId = item.voterId;
                            voter.voterName = item.voterName;
                            voter.stateId = payload.state;
                            voter.districtId = payload.district;
                            voter.wardId = payload.ward;
                            voter.ec_centreId = payload.reg_centre;
                            voter.municipalId = payload.vdc_mun;
                            return voter;
                        });
                        return [4 /*yield*/, em.persistAndFlush(entitties)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, {
                                next: null,
                                payload: {
                                    value: [],
                                    parent: (_a = {},
                                        _a[JobTypEnum_1.JobTypeEnum.LOCAL_CENTRE] = null,
                                        _a)
                                }
                            }];
                }
            });
        });
    };
    ElectionCentreStrategy.prototype.save = function (em, data) {
        return __awaiter(this, void 0, void 0, function () {
            var centreExist, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, em.findOne(ElectionCentre_1["default"], {
                            electionCentreId: data.value.code,
                            wardId: data.value.parent
                        })];
                    case 1:
                        centreExist = _a.sent();
                        if (centreExist) {
                            return [2 /*return*/, false];
                        }
                        state = new ElectionCentre_1["default"]();
                        state.name = data.value.name;
                        state.wardId = data.value.parent;
                        state.electionCentreId = data.value.code;
                        return [4 /*yield*/, em.persistAndFlush(state)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return ElectionCentreStrategy;
}());
exports.ElectionCentreStrategy = ElectionCentreStrategy;
