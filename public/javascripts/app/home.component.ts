import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {IChallenge} from "./challenges";
import {ChallengeService} from "./challenge.service";
import {UserService} from "./user.service";
import {TabView , TabPanel, Growl, Panel} from 'primeng/primeng';
import {ProfileComponent} from "./profile.component";
import {RightPanelComponent} from "./right-panel.component";

@Component ({
    templateUrl: 'templates/home.html',
    directives: [ROUTER_DIRECTIVES, TabView, TabPanel, ProfileComponent, Growl, Panel, RightPanelComponent]
})
export class HomeComponent implements OnInit {
    challenges: IChallenge[];
    challenge: string;
    filterEasy: IChallenge[] = [];
    filterHard: IChallenge[] = [];
    firstName: string;
    fullName: string;
    email: string;
    level: string = 'easy';
    panelLevel: string;
    questionNumber: number;
    answer: string = '';
    isFilled : boolean = false;
    errorMessage: string;
    // @Output() submitted = new EventEmitter<any>();
    questionAnswer: any[] = [];
    msgs: any[] = [];
    welcomeHidden: boolean = false;

    constructor(private _challengeService : ChallengeService, private _userService : UserService) {

    }

    ngOnInit() {
        this._challengeService.getChallenges()
            .subscribe(challenges => {  this.challenges = challenges;
                                        this.filterEasy = challenges.filter((obj)=> obj.level == 'easy');
                                        this.filterHard = challenges.filter((obj)=> obj.level == 'hard')},
                                        error => this.errorMessage = <any>error,
                                        () => console.log('done'));
        this._userService.getUsers()
            .subscribe(users => {this.firstName = users.user.facebook.firstName,
                        this.fullName = users.user.facebook.fullName, this.email = users.user.facebook.email},
                        error => this.errorMessage = <any>error);

        this._userService.getUserHistory()
            .subscribe(data => this.questionAnswer = data,
                    error => this.errorMessage = <any>error);

    }

    setLevel(level) {
        this.level = level;
        if(level == "easy"){
            this.challenges = this.filterEasy;
        }else {
            this.challenges = this.filterHard;
        }
    }

    start(){
        this.welcomeHidden = true;
        if(this.level == 'easy'){
            this.challenges = this.filterEasy;
            this.panelLevel = 'easy';
            this.questionNumber = 1;
        }else {
            this.challenges = this.filterHard;
            this.panelLevel = 'hard';
            this.questionNumber = 1;
        }
        this.challenge = this.challenges[0].question;
    }

    hint(){
        if(this.questionNumber){
            if(this.level == 'easy'){
                this.msgs.push({severity:'info', summary:'Hint', detail: this.filterEasy[this.questionNumber-1].hint});
                console.log(this.filterEasy[this.questionNumber-1].answer)
            }else {
                this.msgs.push({severity:'info', summary:'Hint', detail:this.filterHard[this.questionNumber-1].hint});
                console.log(this.filterHard[this.questionNumber-1].answer)
            }
        }
        // console.log(this.questionAnswer);
    }

    submit(value: string){
        if(value.toLocaleLowerCase() === this.challenges[this.questionNumber-1].answer.toLocaleLowerCase()){
            console.log('right');
        }else {
            console.log('wrong');
        }
        // console.log(this.id);
        this._userService.postAnswers(this.challenge, value)
            .subscribe(
                data => this.questionAnswer = data,
                error => this.errorMessage = <any>error);
        if(value.length > 0){
            if(this.challenge !== 'Thank you for answering the questions click reset to restart'){
                // this.questionAnswer.push({question: this.challenge, answer: value});
            }
            this.answer = '';
            this.displayCh();
            this.onKeyUp();
            this.level = this.panelLevel;
            // console.log(this.questionAnswer);
        }else {
            console.log('empty')
        }
    }

    displayCh(){
        let value = this.questionNumber;
        if(this.challenges[value]){
            this.challenge = this.challenges[value].question;
            this.questionNumber++;
            this.panelLevel = this.challenges[value].level;
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