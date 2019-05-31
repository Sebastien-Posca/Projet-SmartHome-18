import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {IncidentModel} from "../models/Incident";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Consts} from "../consts";


@Injectable()
export class FormService {

  constructor(private http: HttpClient) { }

  send(incident: IncidentModel) {

    const data = {
      'incidentDate': incident.date, 'incidentHour': incident.hour,
      'locationID': incident.locationId, 'importance': incident.importance,
      'reporterID': incident.reporterId, 'title': incident.title,
      'description': incident.description, 'typeId': incident.type
    };

    return this.http.post(Consts.HTTP_API_SERVER_ADDRESS+'/declaredIncidents', JSON.stringify(data),  {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'
    }).catch(this.errorHandler);

  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error")
  }

}
