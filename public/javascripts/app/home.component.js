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
var router_1 = require('@angular/router');
var challenge_service_1 = require("./challenge.service");
var user_service_1 = require("./user.service");
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var primeng_3 = require('primeng/primeng');
var profile_component_1 = require("./profile.component");
var HomeComponent = (function () {
    function HomeComponent(_challengeService, _userService) {
        this._challengeService = _challengeService;
        this._userService = _userService;
        this.level = 'Choose a level please';
        this.answer = '';
        this.isFilled = false;
        this.submitted = new core_1.EventEmitter();
        this.msgs = [];
        this.questionAnswer = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._challengeService.getChallenges()
            .subscribe(function (challenges) { return _this.challenges = challenges; }, function (error) { return _this.errorMessage = error; });
        this._userService.getUsers()
            .subscribe(function (users) {
            _this.firstName = users.user.facebook.firstName,
                _this.fullName = users.user.facebook.fullName, _this.email = users.user.facebook.email;
        }, function (error) { return _this.errorMessage = error; });
    };
    HomeComponent.prototype.setLevel = function (level) {
        this.level = level;
        return;
    };
    HomeComponent.prototype.start = function () {
        if (this.level == 'Choose a level please') {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Erorr:', detail: 'Choose a level please' });
        }
        else if (this.level == 'easy') {
            this.challenge = this.challenges[0].question;
            this.panelLevel = 'easy';
            this.questionNumber = 1;
        }
        else {
            this.challenge = this.challenges[6].question;
            this.panelLevel = 'hard';
            this.questionNumber = 7;
        }
    };
    HomeComponent.prototype.reset = function () {
        this.challenge = '';
    };
    HomeComponent.prototype.submit = function (value) {
        if (value.length > 0) {
            if (this.challenge !== 'Thank you for answering the questions click reset to restart') {
                this.questionAnswer.push({ question: this.challenge, answer: value });
            }
            this.answer = '';
            this.displayCh();
            this.onKeyUp();
            this.level = this.panelLevel;
        }
        else {
            console.log('empty');
        }
    };
    HomeComponent.prototype.displayCh = function () {
        var value = this.questionNumber;
        if (this.challenges[value + 1]) {
            this.challenge = this.challenges[value + 1].question;
            this.questionNumber++;
            this.panelLevel = this.challenges[value + 1].level;
        }
        else {
            this.challenge = 'Thank you for answering the questions click reset to restart';
        }
    };
    HomeComponent.prototype.onKeyUp = function () {
        if (this.answer != '' && this.challenge) {
            this.isFilled = true;
        }
        else {
            this.isFilled = false;
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HomeComponent.prototype, "submitted", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'templates/home.html',
            directives: [router_1.ROUTER_DIRECTIVES, primeng_1.TabView, primeng_2.TabPanel, profile_component_1.ProfileComponent, primeng_3.Messages]
        }), 
        __metadata('design:paramtypes', [challenge_service_1.ChallengeService, user_service_1.UserService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map