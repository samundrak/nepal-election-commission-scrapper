"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
var core_1 = require("@mikro-orm/core");
var CustomBaseEntity_1 = require("./CustomBaseEntity");
var Voter = /** @class */ (function (_super) {
    __extends(Voter, _super);
    function Voter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, core_1.Property)(),
        __metadata("design:type", String)
    ], Voter.prototype, "voterId");
    __decorate([
        (0, core_1.Property)(),
        __metadata("design:type", String)
    ], Voter.prototype, "voterName");
    __decorate([
        (0, core_1.Property)(),
        __metadata("design:type", String)
    ], Voter.prototype, "age");
    __decorate([
        (0, core_1.Property)(),
        __metadata("design:type", String)
    ], Voter.prototype, "spouseName");
    __decorate([
        (0, core_1.Property)(),
        __metadata("design:type", String)
    ], Voter.prototype, "fatherName");
    __decorate([
        (0, core_1.Property)(),
        __metadata("design:type", String)
    ], Voter.prototype, "motherName");
    __decorate([
        (0, core_1.Property)(),
        __metadata("design:type", String)
    ], Voter.prototype, "gender");
    __decorate([
        (0, core_1.Property)(),
        __metadata("design:type", String)
    ], Voter.prototype, "stateId");
    __decorate([
        (0, core_1.Property)(),
        __metadata("design:type", String)
    ], Voter.prototype, "districtId");
    __decorate([
        (0, core_1.Property)(),
        __metadata("design:type", String)
    ], Voter.prototype, "municipalId");
    __decorate([
        (0, core_1.Property)(),
        __metadata("design:type", String)
    ], Voter.prototype, "wardId");
    __decorate([
        (0, core_1.Property)(),
        __metadata("design:type", String)
    ], Voter.prototype, "ec_centreId");
    Voter = __decorate([
        (0, core_1.Entity)()
    ], Voter);
    return Voter;
}(CustomBaseEntity_1.CustomBaseEntity));
exports["default"] = Voter;
