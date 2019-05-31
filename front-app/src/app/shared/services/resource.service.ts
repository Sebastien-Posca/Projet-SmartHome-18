import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {IncidentModel} from "../models/Incident";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {UserModel} from "../models/User";
import {LocationModel} from "../models/Location";
import {Consts} from "../consts";
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class ResourceService {

  private userList: BehaviorSubject<UserModel[]>;
  private locationList : BehaviorSubject<LocationModel[]>;


  constructor(private http: HttpClient) {
      this.userList = new BehaviorSubject<UserModel[]>([]);
      this.locationList = new BehaviorSubject<LocationModel[]>([]);
  }

  getUserName(id: number){
    return this.userList.value[id].userName;
  }

  getUserPictureUrl(id: number){
    return Consts.API_SERVER_ADDRESS + this.userList.value[id].userPictureUrl;

  }

  getLocationName(id: number){
    return this.locationList.value[id].locationName;
  }

  getLocationPictureUrl(id: number) {
    return Consts.API_SERVER_ADDRESS + this.locationList.value[id].locationPictureUrl;
  }


  update(){
      this.http.get<UserModel[]>(Consts.HTTP_API_SERVER_ADDRESS+'/members')
                .subscribe((data) => {
                    this.userList.next(data);

                  }
                );

      this.http.get<LocationModel[]>(Consts.HTTP_API_SERVER_ADDRESS+'/locations')
        .subscribe((data) => {
            this.locationList.next(data);

          }
        );
  }


}
