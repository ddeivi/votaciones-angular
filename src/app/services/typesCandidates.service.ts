import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { global } from './global';



@Injectable()
export class TypesService{
    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }


  
   
    getTypes(): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'types', { headers: headers });


    }

   



}