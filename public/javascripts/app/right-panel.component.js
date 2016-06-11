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
var core_1 = require("@angular/core");
var primeng_1 = require('primeng/primeng');
var user_service_1 = require("./user.service");
var challenges_reverse_pipe_1 = require("./challenges-reverse.pipe");
var RightPanelComponent = (function () {
    function RightPanelComponent(_userService) {
        this._userService = _userService;
        this.questionAnswer = [{ question: '', answer: '', id: '' }];
        this.display = false;
    }
    RightPanelComponent.prototype.editShow = function (index, id) {
        this.display = true;
        this.index = index;
        for (var i = 0; i < this.questionAnswer.length; i++) {
            if (this.questionAnswer[i]._id === id) {
                this.id = i;
            }
        }
    };
    RightPanelComponent.prototype.remove = function (index, id) {
        var _this = this;
        var realIndex;
        for (var i = 0; i < this.questionAnswer.length; i++) {
            if (this.questionAnswer[i]._id === id) {
                realIndex = i;
            }
        }
        var reversedArr = this.questionAnswer.slice().reverse();
        reversedArr.splice(index, 1);
        // console.log(reversedArr);
        this.questionAnswer = reversedArr.slice().reverse();
        this._userService.deleteAnswer(realIndex)
            .subscribe(function (error) { return _this.errorMessage = error; });
    };
    RightPanelComponent.prototype.editSubmit = function () {
        var _this = this;
        var reversedArr = this.questionAnswer.slice().reverse();
        var index;
        this.display = false;
        index = this.index;
        reversedArr[index].answer = this.editedAnswer;
        this._userService.updateAnswer(this.editedAnswer, this.id)
            .subscribe(function (error) { return _this.errorMessage = error; });
        this.editedAnswer = '';
    };
    RightPanelComponent.prototype.deleteAll = function () {
        var _this = this;
        this.questionAnswer = [];
        this._userService.deleteHistory()
            .subscribe(function (error) { return _this.errorMessage = error; });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], RightPanelComponent.prototype, "questionAnswer", void 0);
    RightPanelComponent = __decorate([
        core_1.Component({
            selector: 'mrpanel',
            templateUrl: 'templates/right-panel.html',
            directives: [primeng_1.Panel, primeng_1.Fieldset, primeng_1.Dialog, primeng_1.Button, primeng_1.InputText],
            pipes: [challenges_reverse_pipe_1.ChallengesReversePipe]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], RightPanelComponent);
    return RightPanelComponent;
}());
exports.RightPanelComponent = RightPanelComponent;
//# sourceMappingURL=right-panel.component.js.map