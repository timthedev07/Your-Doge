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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Homework = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let Homework = class Homework extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Homework.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], Homework.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    typeorm_1.Column("int", { nullable: true }),
    __metadata("design:type", Object)
], Homework.prototype, "subjectId", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Homework.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Homework.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Homework.prototype, "done", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Homework.prototype, "deadline", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Object)
], Homework.prototype, "enjoyed", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Object)
], Homework.prototype, "onTime", void 0);
Homework = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("homework")
], Homework);
exports.Homework = Homework;
//# sourceMappingURL=Homework.js.map