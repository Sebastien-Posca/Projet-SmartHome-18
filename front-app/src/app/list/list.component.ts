import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IncidentModel} from "../shared/models/Incident";
import {ListService} from "../shared/services/list.service";
import {MatTableDataSource} from "@angular/material";
import { LoginService } from '../shared/services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentsComponent} from "../comments/comments.component";
import {MatCardModule} from '@angular/material/card';
import { element } from 'protractor';
import {ResourceService} from "../shared/services/resource.service";


const DEFAULT_ROW_NUMBER = 5;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListService]
})
export class ListComponent implements OnInit {

  public incidentList: IncidentModel[] = [];
  private sub: any;
  private id:number;
  private title:string;
  private isInUnresolvedIncidentsMode: boolean = false;


  constructor(private listService : ListService, private loginService: LoginService,  private router: Router,  private route: ActivatedRoute,private resourceService:ResourceService){
    route.params.subscribe(val => {
      this.ngOnInit();
    });
  }

  getDeclaredIncidents(){
    this.sub =this.listService.getDeclaredIncidentList().subscribe(
      (incidentList) => this.incidentList = incidentList
    );
    this.listService.getDeclaredIncidents(this.loginService.getUserId(), DEFAULT_ROW_NUMBER, this.isInUnresolvedIncidentsMode);
  }

  getAssignedIncidents(){
    this.sub =this.listService.getAssignedIncidentList().subscribe(
      (incidentList) => this.incidentList = incidentList
    );
    this.listService.getAssignedIncidents(this.loginService.getUserId(), DEFAULT_ROW_NUMBER, this.isInUnresolvedIncidentsMode);
  }


  ngOnInit(){
    if(this.loginService.getUserId() == undefined){
      this.loginService.reset();
    }
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    if(this.id == 1){
      this.getDeclaredIncidents();
      this.title = "Mes incidents déclarés";
    }
    else if (this.id == 2){
      this.getAssignedIncidents();
      this.title = "Mes incidents assignés";
    }
  }

  public getMoreIncidents(){
    if(this.id == 1){
      this.listService.getDeclaredIncidents(this.loginService.getUserId(), this.incidentList.length + DEFAULT_ROW_NUMBER)
    }
    else if (this.id == 2){
      this.listService.getAssignedIncidents(this.loginService.getUserId(), this.incidentList.length + DEFAULT_ROW_NUMBER)
    }
  }

  public displayTitle(){
    return this.title;
  }



  displayHelp(){
    var x =  document.getElementById('help');
    if (x.style.display === 'none') {
      x.style.display = "block";
    } else {
      x.style.display = 'none';
    }
  }

  switchUnresolvedIncidentsMode(){
      this.isInUnresolvedIncidentsMode = !this.isInUnresolvedIncidentsMode;
      this.ngOnInit();
  }


}
