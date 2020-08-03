import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { global } from './global';
import { User } from '../models/user';


@Injectable()
export class UserService{
    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }


  
   
    signup(user, gettoken = null): Observable<any> {

        if (gettoken != null) {
            user.gettoken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'login', params, { headers: headers });

    }



    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity && identity != null && identity != undefined && identity != "undefined"){
            this.identity = identity;

        }else{
            this.identity = null;
        }
        return this.identity;

    }
    getToken(){
        let token = localStorage.getItem('token');

        if (token && token != null && token != undefined && token != "undefined"){
            this.token = token;

        }else{
            this.token = null;
        }
        return this.token;


    }
    getUsers():Observable<any>{

        return this._http.get(this.url + 'users');

    }
    getUser(userId):Observable<any>{

        return this._http.get(this.url + 'user/' + userId);

    }
    voteTrue(token, vote): Observable<any> {

        let json = JSON.stringify(vote);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.put(this.url + 'edit/user', params, { headers: headers });

    }
}