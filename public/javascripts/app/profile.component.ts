import { Component, Input } from '@angular/core';
import {Panel} from 'primeng/primeng';

@Component ({
    selector: 'myprofile',
    templateUrl: 'templates/profile.html',
    directives: [Panel]
})
export class ProfileComponent {
    @Input() email: string;
    @Input() firstName: string;
    @Input() fullName: string;
    @Input() questionAnswer: any = [{question: '', answer: ''}];
}