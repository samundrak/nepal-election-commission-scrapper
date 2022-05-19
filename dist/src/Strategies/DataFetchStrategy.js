"use strict";
exports.__esModule = true;
exports.DataFetchStrategy = void 0;
var DataFetchStrategy = /** @class */ (function () {
    function DataFetchStrategy(strategy) {
        this.strategy = strategy;
    }
    DataFetchStrategy.prototype.fetch = function (em, data) {
        return this.strategy.fetch(em, data);
    };
    DataFetchStrategy.prototype.save = function (em, data) {
        return this.strategy.save(em, data);
    };
    return DataFetchStrategy;
}());
exports.DataFetchStrategy = DataFetchStrategy;
