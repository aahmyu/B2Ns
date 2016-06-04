import { Injectable } from '@angular/core';
import {IChallenge} from "./challenges";
import { Observable } from  'rxjs/Observable'
import {Http, Response} from '@angular/http';

@Injectable()
export class ChallengeService {
    private _challengeUrl ='/challenge';
    constructor(private http:Http) { }

    getChallenges(): Observable<IChallenge[]> {
        if (this._challengeUrl != null) {
            return this.http.get(this._challengeUrl)
                .map((res:Response) => <IChallenge[]>res.json())
                // .do(data => console.log('data: ' + JSON.stringify(data)))
                .catch(this.handleError)
                // .subscribe(
                //     data => {
                //         this.challenges = data, this.panelLevel = data.level
                //     },
                //     err => console.error(err)
                // );
        } else {
            // this.challenges[0].question = 'Please select a level';
        }
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}