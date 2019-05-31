import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Http, Response} from "@angular/http";
import { error } from 'util';
import { ErrorHandler } from '@angular/core';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import {Consts} from "../consts";
import {isPlatformBrowser} from "@angular/common";
import {ResourceService} from "./resource.service";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class LoginService {

  private username: string;
  private userId: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient,
              private router: Router, private resourceService:ResourceService) {

      this.resourceService.update();
      if (isPlatformBrowser(this.platformId)) {
        let userId = window.localStorage.getItem("userId");
        let username = window.localStorage.getItem("username");

        if(userId != null && username != null)
          this.goToList(parseInt(userId),username);
      }

  }

  send(username: string, password: string){
    const data = {'username': username, 'password': password};

    return this.http.post(Consts.HTTP_API_SERVER_ADDRESS+'/login', JSON.stringify(data), httpOptions)
                    .catch(this.errorHandler);
  }

  setUserId(userId: number){
    this.userId=userId;
  }

  getUserId(){
    return this.userId;
  }


  setUserName(username: string){
    this.username = username;
  }

  getUserName(){
    return this.username;
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error")
  }

  reset(){
    this.router.navigate(['/', 'login']);
    sessionStorage.clear();
  }

  public goToList(userId: number, username: string){
    this.userId = userId;
    this.username = username;
    this.router.navigate(['/list',1]);

  }

  public removeSessionData(){
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("username");
  }

}
