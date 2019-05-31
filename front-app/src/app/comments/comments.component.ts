import {Component, Input, OnInit} from '@angular/core';
import {IncidentModel} from "../shared/models/Incident";
import {CommentModel} from "../shared/models/Comment";
import {HttpClient} from "@angular/common/http";
import {ListService} from "../shared/services/list.service";
import {ResourceService} from "../shared/services/resource.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
  @Input() incident:IncidentModel;

  private static readonly IMPORTANCE_COLOR_STYLE_MAP = {0:"", 1:"w3-green", 2:"w3-orange", 3:"w3-red"};

  private comments:CommentModel[]=[];

  constructor(private listService: ListService, private resourceService:ResourceService) {
  }

  public display(){

    //requests the comments to the service
    this.getComments();


    //UI modification
    document.getElementById('comments').style.display='block';
    document.getElementById('title').innerHTML = "Commentaires : "+this.incident.title;
    this.applyColor();
    window.localStorage.setItem("incidentID", this.incident.incidentId.toString());
  }

  ngOnInit() {
  }

  getComments(){
    this.listService.getComments(this.incident.incidentId);
    this.listService.getCommentList().subscribe(
        (comments) => {
            console.log("SUB");
            this.comments = comments;
            this.displayContentComment();
        }
    );
  }

  postComment(msg:string){
      document.getElementById('comments').style.display = 'none';
      console.log("user =" + this.incident.incidentId);
      this.listService.postComment(parseInt(window.localStorage.getItem("incidentID")), parseInt(window.localStorage.getItem("userId")), msg);
  }

  displayContentComment(){


    let html="<ul>";

    this.comments.forEach((comment, index) => {
        if(index<4) {
          html += "<li style=\"background-color: aliceblue;margin-bottom: 1vh;list-style-type: none;max-height: 12vh; display=block;\" " +
            "'> <div style='position: relative;left: 1vw;top: 1vh; margin: 0;'> <img style=\"width: 4vw; \" src=\"http://" +
            this.resourceService.getUserPictureUrl(comment.authorId - 1) + "\"><p>" +this.resourceService.getUserName(comment.authorId - 1) +"</p></div> <div style='position:relative;left: 6vw;top: -9vh; margin: 0;'><p>" +
            comment.commentText +
            "</p><p style='font-size:12px;'>"+ this.displayDate(comment.date, comment.hour) +"</p></div></li>";
        }
    });

    html+="</ul>";

    document.getElementById('commentsContent').innerHTML = html;

  }
  public displayIncidentTitle(){
    return this.incident.title;
  }

  public displayDate(date:Date,hour:string){
    return (new Date(date)).toDateString()+" "+hour;

  }

  public applyColor(){
    document.getElementById("header").classList.add(
      CommentsComponent.IMPORTANCE_COLOR_STYLE_MAP[this.incident.importance]
    );
  }

}
