"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var node_html_parser_1 = require("node-html-parser");
var voter_content_1 = __importDefault(require("./voter_content"));
var html_table_to_json_1 = __importDefault(require("html-table-to-json"));
function getVoterListFromRawHTML(html) {
    var dom = (0, node_html_parser_1.parse)(html);
    var data = html_table_to_json_1["default"].parse(dom.querySelector("#tbl_data").outerHTML);
    return data.results.flat().map(function (data) {
        var _a;
        var _b = Object.values(data), sn = _b[0], voterId = _b[1], voterName = _b[2], age = _b[3], gender = _b[4], spouseName = _b[5], parentsName = _b[6];
        var _c = (_a = (parentsName || "")) === null || _a === void 0 ? void 0 : _a.split("/"), fatherName = _c[0], motherName = _c[1];
        return {
            voterId: voterId,
            voterName: voterName,
            age: age,
            gender: gender,
            spouseName: spouseName,
            fatherName: fatherName,
            motherName: motherName
        };
    });
}
console.log(getVoterListFromRawHTML(voter_content_1["default"]));
