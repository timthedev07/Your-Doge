"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeworkResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Homework_1 = require("../entity/Homework");
const isAuthMiddleWare_1 = require("../isAuthMiddleWare");
let AllHomeworkResponse = class AllHomeworkResponse {
};
__decorate([
    type_graphql_1.Field(() => [Homework_1.Homework]),
    __metadata("design:type", Array)
], AllHomeworkResponse.prototype, "homeworkList", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], AllHomeworkResponse.prototype, "count", void 0);
AllHomeworkResponse = __decorate([
    type_graphql_1.ObjectType()
], AllHomeworkResponse);
let HomeworkResolver = class HomeworkResolver {
    getAllHomework() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield Homework_1.Homework.findAndCount();
            return res[0];
        });
    }
    addHomework({ payload }, title, description, deadline) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload || !(payload === null || payload === void 0 ? void 0 : payload.userId)) {
                throw new Error("User not authenticated");
            }
            try {
                yield Homework_1.Homework.insert({
                    userId: parseInt(payload.userId),
                    title,
                    description,
                    deadline: deadline,
                    done: false,
                    enjoyed: null,
                    subjectId: null,
                    onTime: null,
                });
                return true;
            }
            catch (err) {
                console.log(err);
                throw new Error("Failed to add task, error: " + JSON.stringify(err));
            }
        });
    }
    getAllUserHomework({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload || !(payload === null || payload === void 0 ? void 0 : payload.userId)) {
                throw new Error("User not authenticated");
            }
            const res = yield Homework_1.Homework.findAndCount({
                where: { userId: payload.userId },
            });
            return {
                homeworkList: res[0],
                count: res[1],
            };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Homework_1.Homework]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeworkResolver.prototype, "getAllHomework", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuthMiddleWare_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("title")),
    __param(2, type_graphql_1.Arg("description")),
    __param(3, type_graphql_1.Arg("deadline")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], HomeworkResolver.prototype, "addHomework", null);
__decorate([
    type_graphql_1.Query(() => AllHomeworkResponse),
    type_graphql_1.UseMiddleware(isAuthMiddleWare_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomeworkResolver.prototype, "getAllUserHomework", null);
HomeworkResolver = __decorate([
    type_graphql_1.Resolver()
], HomeworkResolver);
exports.HomeworkResolver = HomeworkResolver;
//# sourceMappingURL=HomeworkResolver.js.map