import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {FormService} from '../shared/services/form.service';
import { LoginService } from '../shared/services/login.service';
import {IncidentModel} from "../shared/models/Incident";
import {invalidProviderError} from "@angular/core/src/di/reflective_errors";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  reporterId : number;
  locationId : number;
  incidentTypes: any = {};
  locations: any = {};

  constructor(private formService: FormService, private loginService: LoginService , private http: Http, private router: Router) {
    this.reporterId= this.loginService.getUserId();
    this.getIncidentTypes();
    this.getLocations();
    console.log(this.loginService.getUserId());

  }

  ngOnInit(){
    if(this.loginService.getUserId() == undefined){
      this.loginService.reset();
    }
    document.forms["topnav"]["name"].set
  }



  check() {
    var ok = true;
    var x = document.forms["form"]["title"].value;
    var y = document.forms["form"]["type"].value;
    var z = document.forms["form"]["imp"].value;
    if (x == "" ) {
      document.forms["form"]["title"].style.border = "2px solid red";
      ok = false;
    }
    if (y == ""){
      document.forms["form"]["type"].style.border = "2px solid red";
      ok = false;
    }
    if (z == "") {
      document.getElementsByName("impName").item(0).style.color="red";
      ok = false;
    }

    if(ok == false){
      return false;
    }
  }

  clear(){
    document.forms["form"]["title"].style.border = "1px solid black";
    document.forms["form"]["type"].style.border = "1px solid black";
    document.getElementsByName("impName").item(0).style.color="black";
    document.forms["form"].reset();
  }

  send(event,date,hour,location,title,descri,type){
    var importance = document.forms["form"]["imp"].value;

    if( this.check() == false){
      return false;
    }
    else if (confirm('Envoyer ?')) {
      console.log(this.reporterId);

    this.formService.send(new IncidentModel(-1,date,hour,location,importance,this.reporterId,title,descri,type)).subscribe(data => {this.clear();  this.router.navigate(['/list',1]);} ,error => document.getElementById('failure').style.display='block' );
  }
}

  getIncidentTypes(){
    this.http.get('http://localhost:3000/types/').map((res: Response) => res.json()).subscribe(data =>{
      console.log(data);
      this.incidentTypes=data
    })
  }

  getLocations(){
    this.http.get('http://localhost:3000/locations/').map((res: Response) => res.json()).subscribe(data =>{
      console.log(data);
      this.locations=data
    })
  }

}
