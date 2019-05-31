import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Consts} from "../consts";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin' : '*'
  })
};

@Injectable()
export class IotService{
  constructor(private http: HttpClient) {

  }

  openGarageDoor(){
    return this.http.get("http://localhost:1880/open-garage").subscribe();
  }

  closeGarageDoor(){
    return this.http.get("http://localhost:1880/close-garage").subscribe();
  }

  openWindows(){
   return this.http.get("http://localhost:1880/open-windows").subscribe();
  }

  garageMode(){
    return this.http.get("http://localhost:1880/garage-mode").subscribe();
   }

  secureHome(){
    return this.http.get("http://localhost:1880/secure-home").subscribe();
  }

  turnOffAlarm(){
    return this.http.get("http://localhost:1880/disable-alarm").subscribe();
  }

  getGarageDoorState(){
    return this.http.get("http://localhost:1880/garage-state",httpOptions);
  }

  getAlarmState(){
    return this.http.get("http://localhost:1880/alarm-state",httpOptions);
  }

}
