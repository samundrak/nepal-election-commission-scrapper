"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.myQueue = exports.redisConnection = exports.queueName = exports.serverAdapter = void 0;
var bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
var express_1 = require("@bull-board/express");
var api_1 = require("@bull-board/api");
var ioredis_1 = __importDefault(require("ioredis"));
var bullmq_1 = require("bullmq");
exports.serverAdapter = new express_1.ExpressAdapter();
exports.queueName = "dataFetching";
exports.redisConnection = new ioredis_1["default"](9002);
exports.myQueue = new bullmq_1.Queue(exports.queueName, {
    connection: exports.redisConnection
});
var scheduler = new bullmq_1.QueueScheduler(exports.queueName, {
    connection: exports.redisConnection
});
(0, api_1.createBullBoard)({
    queues: [new bullMQAdapter_1.BullMQAdapter(exports.myQueue)],
    serverAdapter: exports.serverAdapter
});
