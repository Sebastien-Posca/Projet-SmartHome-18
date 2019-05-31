import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {IncidentModel} from "../shared/models/Incident";
import {ListService} from "../shared/services/list.service";
import {ResourceService} from "../shared/services/resource.service";
import {log} from "util";
import {CommentsComponent} from "../comments/comments.component";



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  @ViewChild (CommentsComponent) comments:CommentsComponent;
  @Input() incident:IncidentModel;
  @Input() nbCard:number;

  private static readonly DATE_FORMAT_OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


  ngOnInit(): void {
  }

  public constructor(private resourceService : ResourceService){
  }

  public displayStatus(n:number){
    switch (n){
      case 0 : return "visibility_off";
      case 1 : return "visibility";
      case 2 : return "schedule";
      case 3 : return "done";
    }
  }

  public displayDate(date:Date){
    return (new Date(date)).toLocaleDateString("fr-FR", CardComponent.DATE_FORMAT_OPTIONS);

  }



  setUserPicture(id:number){
    //console.log("USER : http://"+this.resourceService.getUserPictureUrl(id));
    return "http://"+this.resourceService.getUserPictureUrl(id-1);
  }

  setLocationPicture(id:number){
    return "http://"+this.resourceService.getLocationPictureUrl(id-1);
  }

  public displayType(n:number){
    switch (n){
      case 1 : return "Autre";
      case 2 : return "Courses";
      case 3 : return "Panne appareil";
      case 4 : return "Catastrophe"
    }
  }


  public displayImp(n:number){
    const card = document.getElementsByName("card").item(this.nbCard);

    switch (n){

      case 0 : break; // Faible
      case 1 : card.style.borderColor="green";
        break;// Moyenne
      case 2 : card.style.borderColor="orange";
        break;//Forte
      case 3 : card.style.borderColor="red";
        break;//Urgente

    }
  }

  displayRepName(id:number){
    return this.resourceService.getUserName(id-1);
  }


  diplayComment(incident: IncidentModel){
    console.log(incident);
    this.comments.display();

  }

  displayEmergency(n:number){
    switch (n){

      case 0 : return "faible"
      case 1 : return "moyenne";
      case 2 : return "forte";
      case 3 : return "urgente";

    }
  }

}
