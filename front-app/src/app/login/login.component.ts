import {Component, Input, OnInit, AfterViewInit, Inject} from '@angular/core';
import {LoginService} from '../shared/services/login.service';
import {ResourceService} from "../shared/services/resource.service";
import {invalidProviderError} from "@angular/core/src/di/reflective_errors";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { error } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  send(event, username, password){

    this.loginService.send(username, password).subscribe(
        data => {
                console.log(data);

                //save data in local storage
                window.localStorage.setItem("userId", data["userId"].toString());
                window.localStorage.setItem("username", username);
                console.log("id="+this.loginService.getUserId());
                this.loginService.goToList(data["userId"], username);

        },
        error => {this.errorRed(); }
    );

  }


  errorRed(){
    document.getElementById("username").style.border = "2px solid red";
    document.getElementById("password").style.border = "2px solid red";
  }

}
