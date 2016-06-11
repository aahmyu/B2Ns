import {Component, Input} from "@angular/core";
import {Panel, Fieldset, Dialog, Button, InputText} from 'primeng/primeng';
import {UserService} from "./user.service";
import {ChallengesReversePipe} from "./challenges-reverse.pipe";

@Component({
    selector: 'mrpanel',
    templateUrl: 'templates/right-panel.html',
    directives: [Panel, Fieldset, Dialog, Button, InputText],
    pipes: [ChallengesReversePipe]
})

export class RightPanelComponent {
    @Input() questionAnswer: any[] = [{question: '', answer: '', id: ''}];
    display: boolean = false;
    id: number;
    index: number;
    editedAnswer: string;
    errorMessage: string;

    constructor(private _userService : UserService) {

    }

    editShow(index, id): void {
        this.display = true;
        this.index = index;
        for(let i = 0; i < this.questionAnswer.length; i++){
            if(this.questionAnswer[i]._id === id){
                this.id = i;
            }
        }
    }

    remove(index, id): void {
        let realIndex: number;
        for(let i = 0; i < this.questionAnswer.length; i++){
            if(this.questionAnswer[i]._id === id){
                realIndex = i;
            }
        }
        let reversedArr = this.questionAnswer.slice().reverse();
        reversedArr.splice(index, 1);
        // console.log(reversedArr);
        this.questionAnswer = reversedArr.slice().reverse();
        this._userService.deleteAnswer(realIndex)
            .subscribe(
                error => this.errorMessage = <any>error);
    }
    
    editSubmit(): void {
        let reversedArr = this.questionAnswer.slice().reverse();
        let index: number;
        this.display = false;
        index = this.index;
        reversedArr[index].answer= this.editedAnswer;
        this._userService.updateAnswer(this.editedAnswer, this.id)
            .subscribe(
                error => this.errorMessage = <any>error);
        this.editedAnswer = '';
    }

    deleteAll(): void {
        this.questionAnswer = [];
        this._userService.deleteHistory()
            .subscribe(
                error => this.errorMessage = <any>error
            );
    }
}