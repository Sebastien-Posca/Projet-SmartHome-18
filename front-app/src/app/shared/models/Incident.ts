export class IncidentModel {
  title : string;
  type : number;
  importance : number;
  reporterId : number;
  description: string;
  date : string;
  hour : string;
  locationId : number;
  status:number;

  public constructor(readonly incidentId: number, date:string,hour:string,locId:number,imp:number,repId:number,title:string,descr:string,type:number){
    this.title=title;
    this.type=type;
    this.description=descr;
    this.importance=imp;
    this.reporterId=repId;
    this.date=date;
    this.hour=hour;
    this.locationId=locId;
  }


}
