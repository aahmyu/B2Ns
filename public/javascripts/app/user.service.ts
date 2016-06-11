import { Injectable } from '@angular/core';
import { Observable } from  'rxjs/Observable'
import {Http, Response, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class UserService {
    private _userUrl = '/api/user';
    constructor(private http:Http) { }

    getUsers(): Observable<any> {
        return this.http.get(this._userUrl)
            .map((res:Response) => <any>res.json())
            // .do(data => console.log('data: ' + JSON.stringify(data)))
            .catch(this.handleError);
        }

    getUserHistory() {
        return this.http.get('/api/user/history')
            .map((res:Response) => res.json())
            // .do(data => console.log('data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    postAnswers(question: string, answer: string) {
        let body = JSON.stringify({ question, answer });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/submit', body, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    updateAnswer(answer, id){
        let body = JSON.stringify({ answer, id });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put('/api/user/history/update', body, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    deleteAnswer(id: number){
        let body = JSON.stringify({ id });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put('/api/user/history/delete', body, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    deleteHistory(){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.delete('/api/user/history/clearhistory')
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}