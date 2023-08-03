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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var createJobs_1 = require("./createJobs");
it('should create jobs sucessfully', function () {
    var jobs = (0, createJobs_1.createJobs)();
    expect(Array.isArray(jobs)).toBe(true);
    expect(jobs[0]).toBeInstanceOf(Function);
    expect(typeof jobs[0].errorOut === 'boolean').toBeTruthy();
});
it('should not create jobs when rate is invalid', function () {
    expect(function () {
        (0, createJobs_1.createJobs)(1, { errorRate: 5 });
    }).toThrow('errorRate must be between 0 and 1');
});
it('should create jobs sucessfully with correct error rate of 0.5', function () {
    var jobs = (0, createJobs_1.createJobs)(10, { errorRate: 0.5 });
    expect(jobs.reduce(function (acc, curr) { return acc + Number(curr.errorOut); }, 0)).toBe(5);
});
it('should create jobs sucessfully with correct error rate of 1', function () {
    var jobs = (0, createJobs_1.createJobs)(10, { errorRate: 1 });
    expect(jobs.reduce(function (acc, curr) { return acc + Number(curr.errorOut); }, 0)).toBe(10);
});
it('should execute and throw errors (all jobs)', function () { return __awaiter(void 0, void 0, void 0, function () {
    var jobs, _i, jobs_1, job;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jobs = (0, createJobs_1.createJobs)(2, { errorRate: 1, timeLimit: 0.1 });
                _i = 0, jobs_1 = jobs;
                _a.label = 1;
            case 1:
                if (!(_i < jobs_1.length)) return [3 /*break*/, 4];
                job = jobs_1[_i];
                return [4 /*yield*/, expect(job()).rejects.toBe(undefined)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); });
it('should execute and throw errors (half of the jobs)', function () { return __awaiter(void 0, void 0, void 0, function () {
    var jobs, errorCount, _i, jobs_2, job, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jobs = (0, createJobs_1.createJobs)(4, { errorRate: 0.5, timeLimit: 0.1 });
                errorCount = 0;
                _i = 0, jobs_2 = jobs;
                _b.label = 1;
            case 1:
                if (!(_i < jobs_2.length)) return [3 /*break*/, 6];
                job = jobs_2[_i];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, job()];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                _a = _b.sent();
                errorCount++;
                return [3 /*break*/, 5];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6:
                expect(errorCount).toBe(2);
                return [2 /*return*/];
        }
    });
}); });
it('should execute and return an id', function () { return __awaiter(void 0, void 0, void 0, function () {
    var jobs, job, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jobs = (0, createJobs_1.createJobs)(1, { timeLimit: 0.1 });
                job = jobs[0];
                return [4 /*yield*/, job()];
            case 1:
                id = _a.sent();
                expect(id).resolves.toBe(1);
                return [2 /*return*/];
        }
    });
}); });
