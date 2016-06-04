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
var http_1 = require('@angular/http');
require('rxjs/Rx'); // Load all features
var router_1 = require('@angular/router');
var login_component_1 = require("./login.component");
var home_component_1 = require("./home.component");
var challenge_service_1 = require("./challenge.service");
var user_service_1 = require("./user.service");
var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
    }
    AppComponent.prototype.ngOnInit = function () {
        // this.router.navigate(['/login']);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n       <div>\n            <router-outlet></router-outlet>\n       </div>\n     ",
            directives: [router_1.ROUTER_DIRECTIVES, login_component_1.LoginComponent],
            providers: [http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                challenge_service_1.ChallengeService,
                user_service_1.UserService]
        }),
        router_1.Routes([
            { path: '/', component: login_component_1.LoginComponent },
            { path: '/home', component: home_component_1.HomeComponent }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map