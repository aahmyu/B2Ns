import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';   // Load all features
import { ROUTER_PROVIDERS, Routes, ROUTER_DIRECTIVES, Router } from '@angular/router';
import {LoginComponent} from "./login.component";
import {HomeComponent} from "./home.component";
import {ChallengeService} from "./challenge.service";
import {UserService} from "./user.service";

@Component({
    selector: 'my-app',
    template: `
       <div>
            <router-outlet></router-outlet>
       </div>
     `,
    directives: [ROUTER_DIRECTIVES, LoginComponent],
    providers: [HTTP_PROVIDERS,
                ROUTER_PROVIDERS,
                ChallengeService,
                UserService]
})
@Routes([
    { path: '/', component: LoginComponent },
    { path: '/home', component: HomeComponent }
])
export class AppComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {
        // this.router.navigate(['/login']);
    }
}
