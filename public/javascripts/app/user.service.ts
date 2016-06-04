import { Injectable } from '@angular/core';
import { Observable } from  'rxjs/Observable'
import {Http, Response} from '@angular/http';

@Injectable()
export class UserService {
    private _userUrl = '/api/user';
    constructor(private http:Http) { }

    getUsers(): Observable<any> {

        return this.http.get(this._userUrl)
            .map((res:Response) => <any>res.json())
            // .do(data => console.log('data: ' + JSON.stringify(data)))
            .catch(this.handleError)
        // .subscribe(
        //     data => {
        //         this.challenges = data, this.panelLevel = data.level
        //     },
        //     err => console.error(err)
        // );
        }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}