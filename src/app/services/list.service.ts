import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { global } from './global';
import { List } from 'src/app/models/list';


@Injectable()
export class ListService{
    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }


  
   
    getLists(): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'lists', { headers: headers });


    }
    getListsVotes(): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'lists/votes', { headers: headers });


    }

    getListById(id): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'list/' + id, { headers: headers });


    }

    create(token, list): Observable<any> {

        let json = JSON.stringify(list);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.post(this.url + 'register/list', params, { headers: headers });


    }

    update(token, list, id): Observable<any> {

        let json = JSON.stringify(list);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.put(this.url + 'edit/list/' + id, params, { headers: headers });


    }

    delete(token, id): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.delete(this.url + 'delete/list/' + id, { headers: headers });


    }

    votar(token, vote, id): Observable<any> {

        let json = JSON.stringify(vote);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.put(this.url + 'vote/' + id, params, { headers: headers });

    }

    
    

   



}