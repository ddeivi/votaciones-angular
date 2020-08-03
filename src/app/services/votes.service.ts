import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { global } from './global';


@Injectable()
export class VotesService{
    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }


    vote(token, vote, id): Observable<any> {

        let json = JSON.stringify(vote);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.put(this.url + 'vote/' + id, params, { headers: headers });


    }


    
    getVoteById(id): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'get/vote/' + id, { headers: headers });


    }

   
   

    getVotesByList(id): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'votes/' + id, { headers: headers });


    }

    

   



}