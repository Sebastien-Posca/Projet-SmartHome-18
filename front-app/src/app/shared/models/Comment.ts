export class CommentModel {

  public constructor(readonly commentId:number,
                     readonly incidentId:number,
                     readonly commentText:string,
                     readonly authorId:number,
                     readonly date:Date,
                     readonly hour:string){

  }


}
