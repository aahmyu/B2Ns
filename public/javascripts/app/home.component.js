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
var profile_component_1 = require("./profile.component");
var right_panel_component_1 = require("./right-panel.component");
var HomeComponent = (function () {
    function HomeComponent(_challengeService, _userService) {
        this._challengeService = _challengeService;
        this._userService = _userService;
        this.filterEasy = [];
        this.filterHard = [];
        this.level = 'easy';
        this.answer = '';
        this.isFilled = false;
        // @Output() submitted = new EventEmitter<any>();
        this.questionAnswer = [];
        this.msgs = [];
        this.welcomeHidden = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._challengeService.getChallenges()
            .subscribe(function (challenges) {
            _this.challenges = challenges;
            _this.filterEasy = challenges.filter(function (obj) { return obj.level == 'easy'; });
            _this.filterHard = challenges.filter(function (obj) { return obj.level == 'hard'; });
        }, function (error) { return _this.errorMessage = error; }, function () { return console.log('done'); });
        this._userService.getUsers()
            .subscribe(function (users) {
            _this.firstName = users.user.facebook.firstName,
                _this.fullName = users.user.facebook.fullName, _this.email = users.user.facebook.email;
        }, function (error) { return _this.errorMessage = error; });
        this._userService.getUserHistory()
            .subscribe(function (data) { return _this.questionAnswer = data; }, function (error) { return _this.errorMessage = error; });
    };
    HomeComponent.prototype.setLevel = function (level) {
        this.level = level;
        if (level == "easy") {
            this.challenges = this.filterEasy;
        }
        else {
            this.challenges = this.filterHard;
        }
    };
    HomeComponent.prototype.start = function () {
        this.welcomeHidden = true;
        if (this.level == 'easy') {
            this.challenges = this.filterEasy;
            this.panelLevel = 'easy';
            this.questionNumber = 1;
        }
        else {
            this.challenges = this.filterHard;
            this.panelLevel = 'hard';
            this.questionNumber = 1;
        }
        this.challenge = this.challenges[0].question;
    };
    HomeComponent.prototype.hint = function () {
        if (this.questionNumber) {
            if (this.level == 'easy') {
                this.msgs.push({ severity: 'info', summary: 'Hint', detail: this.filterEasy[this.questionNumber - 1].hint });
                console.log(this.filterEasy[this.questionNumber - 1].answer);
            }
            else {
                this.msgs.push({ severity: 'info', summary: 'Hint', detail: this.filterHard[this.questionNumber - 1].hint });
                console.log(this.filterHard[this.questionNumber - 1].answer);
            }
        }
        // console.log(this.questionAnswer);
    };
    HomeComponent.prototype.submit = function (value) {
        var _this = this;
        if (value.toLocaleLowerCase() === this.challenges[this.questionNumber - 1].answer.toLocaleLowerCase()) {
            console.log('right');
        }
        else {
            console.log('wrong');
        }
        // console.log(this.id);
        this._userService.postAnswers(this.challenge, value)
            .subscribe(function (data) { return _this.questionAnswer = data; }, function (error) { return _this.errorMessage = error; });
        if (value.length > 0) {
            if (this.challenge !== 'Thank you for answering the questions click reset to restart') {
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
        if (this.challenges[value]) {
            this.challenge = this.challenges[value].question;
            this.questionNumber++;
            this.panelLevel = this.challenges[value].level;
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
    HomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'templates/home.html',
            directives: [router_1.ROUTER_DIRECTIVES, primeng_1.TabView, primeng_1.TabPanel, profile_component_1.ProfileComponent, primeng_1.Growl, primeng_1.Panel, right_panel_component_1.RightPanelComponent]
        }), 
        __metadata('design:paramtypes', [challenge_service_1.ChallengeService, user_service_1.UserService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map