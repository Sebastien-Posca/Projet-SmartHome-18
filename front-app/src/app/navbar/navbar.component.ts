import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private loginService: LoginService, private router: Router ) { }

  ngOnInit() {
  }

  goToIotHandling(){
    this.router.navigate(['/iot']);
  }
  goToAssignedList(){
    this.router.navigate(['/list',2]);
  }

  goToDeclaredList(){
    this.router.navigate(['/list',1]);
  }
  logOut(){
    this.loginService.removeSessionData();
    this.router.navigate(["/login"]);
  }



}
