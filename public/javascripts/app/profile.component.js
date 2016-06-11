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
var core_1 = require('@angular/core');
var primeng_1 = require('primeng/primeng');
var challenges_reverse_pipe_1 = require("./challenges-reverse.pipe");
var ProfileComponent = (function () {
    function ProfileComponent() {
        this.questionAnswer = [{ question: '', answer: '' }];
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ProfileComponent.prototype, "email", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ProfileComponent.prototype, "firstName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ProfileComponent.prototype, "fullName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ProfileComponent.prototype, "questionAnswer", void 0);
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'myprofile',
            templateUrl: 'templates/profile.html',
            directives: [primeng_1.Panel],
            pipes: [challenges_reverse_pipe_1.ChallengesReversePipe]
        }), 
        __metadata('design:paramtypes', [])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map