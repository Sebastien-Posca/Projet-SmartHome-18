import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {IncidentModel} from "../models/Incident";
import {Observable} from 'rxjs/Observable';
import { Response } from '@angular/http';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {errorHandler} from "@angular/platform-browser/src/browser";
import {CommentModel} from "../models/Comment";
import {Consts} from "../consts";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class ListService {

  private declaredIncidentList: BehaviorSubject<IncidentModel[]>;
  private assignedIncidentList:BehaviorSubject<IncidentModel[]>;
  private commentList: BehaviorSubject<CommentModel[]>;

  private static readonly NOT_RESOLVED_STATUS_MASK = "&statusMask=3";

  constructor(private http: HttpClient) {
    this.declaredIncidentList = new BehaviorSubject([]);
    this.assignedIncidentList = new BehaviorSubject([]);
    this.commentList = new BehaviorSubject([]);
  }

  getDeclaredIncidents(userId: number, rowNumber: number, onlyNotComplete: boolean = false) {

    let statusMask = onlyNotComplete ? ListService.NOT_RESOLVED_STATUS_MASK : "";

    this.http.get<IncidentModel[]>(Consts.HTTP_API_SERVER_ADDRESS+'/declaredIncidents?userId='
      +userId+'&rowNumber='+rowNumber+statusMask)
      .subscribe((incidents) =>
        this.declaredIncidentList.next(incidents)
      );

  }

  getAssignedIncidents(userId: number, rowNumber: number, onlyNotComplete: boolean = false){

    let statusMask = onlyNotComplete ? ListService.NOT_RESOLVED_STATUS_MASK : "";

    this.http.get<IncidentModel[]>(Consts.HTTP_API_SERVER_ADDRESS+'/assignedIncidents?userId='
      +userId+'&rowNumber='+rowNumber+statusMask)
      .subscribe((incidents) =>
        this.assignedIncidentList.next(incidents)
      );

  }

  getComments(incidentId: number){
    return this.http.get<CommentModel[]>(Consts.HTTP_API_SERVER_ADDRESS+"/comments?incidentId="+incidentId)
      .subscribe((comments) =>
        this.commentList.next(comments)
      );
  }

  postComment(incidentId: number, authorId: number, commentText:string){
    this.http.post(Consts.HTTP_API_SERVER_ADDRESS+'/comments',
      JSON.stringify({
        "incidentId": incidentId,
        "authorId": authorId,
        "commentText": commentText
      }),
      httpOptions)
      .catch(this.errorHandler).subscribe(data => false);
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error")
  }

  public getDeclaredIncidentList() {
    return this.declaredIncidentList;
  }

  public getAssignedIncidentList() {
    return this.assignedIncidentList;
  }

  public getCommentList(){
    return this.commentList;
  }

}
