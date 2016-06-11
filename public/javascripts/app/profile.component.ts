import { Component, Input } from '@angular/core';
import {Panel} from 'primeng/primeng';
import {ChallengesReversePipe} from "./challenges-reverse.pipe";

@Component ({
    selector: 'myprofile',
    templateUrl: 'templates/profile.html',
    directives: [Panel],
    pipes: [ChallengesReversePipe]
})
export class ProfileComponent {
    @Input() email: string;
    @Input() firstName: string;
    @Input() fullName: string;
    @Input() questionAnswer: any = [{question: '', answer: ''}];
}
