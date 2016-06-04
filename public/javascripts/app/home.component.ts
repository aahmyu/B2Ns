import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {IChallenge} from "./challenges";
import {ChallengeService} from "./challenge.service";
import {UserService} from "./user.service";
import {TabView} from 'primeng/primeng';
import {TabPanel} from 'primeng/primeng';
import {Messages} from 'primeng/primeng';
import {ProfileComponent} from "./profile.component";

@Component ({
    templateUrl: 'templates/home.html',
    directives: [ROUTER_DIRECTIVES, TabView, TabPanel, ProfileComponent, Messages]
})
export class HomeComponent implements OnInit{
    challenges: IChallenge[];
    challenge: string;
    firstName: string;
    fullName: string;
    email: string;
    level: string = 'Choose a level please';
    panelLevel: string;
    questionNumber: number;
    answer: string = '';
    isFilled : boolean = false;
    errorMessage: string;
    @Output() submitted = new EventEmitter<any>();
    msgs: any[] = [];
    questionAnswer: any[] = [];

    constructor(private _challengeService : ChallengeService, private _userService : UserService) {

    }

    ngOnInit() {
        this._challengeService.getChallenges()
            .subscribe(challenges => this.challenges = challenges,
                        error => this.errorMessage = <any>error);
        this._userService.getUsers()
            .subscribe(users => {this.firstName = users.user.facebook.firstName,
                        this.fullName = users.user.facebook.fullName, this.email = users.user.facebook.email},
                        error => this.errorMessage = <any>error);
    }

    setLevel(level) {
        this.level = level;
        return;
    }

    start(){
        if(this.level == 'Choose a level please'){
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Erorr:', detail:'Choose a level please'});
        }else if(this.level == 'easy'){
            this.challenge = this.challenges[0].question;
            this.panelLevel = 'easy';
            this.questionNumber = 1;
        }else{
            this.challenge = this.challenges[6].question;
            this.panelLevel = 'hard';
            this.questionNumber = 7;
        }
    }

    reset(){
        this.challenge = '';

    }

    submit(value: string){
        if(value.length > 0){
            if(this.challenge !== 'Thank you for answering the questions click reset to restart'){
                this.questionAnswer.push({question: this.challenge, answer: value});
            }
            this.answer = '';
            this.displayCh();
            this.onKeyUp();
            this.level = this.panelLevel;

        }else {
            console.log('empty')
        }
    }

    displayCh(){
        let value = this.questionNumber;
        if(this.challenges[value + 1]){
            this.challenge = this.challenges[value + 1].question;
            this.questionNumber++;
            this.panelLevel = this.challenges[value+1].level;
        }else {
            this.challenge = 'Thank you for answering the questions click reset to restart';
        }

    }

    onKeyUp(){
        if (this.answer != '' && this.challenge){
            this.isFilled = true;
        }else {
            this.isFilled = false;
        }
    }
}