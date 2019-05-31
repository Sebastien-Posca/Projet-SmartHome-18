import {ListService} from "../shared/services/list.service";
import {Component, OnInit} from "@angular/core";
import {IotService} from "../shared/services/iot.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-iot',
  templateUrl: './iotHandling.component.html',
  styleUrls: ['./iotHandling.component.css'],
})
export class IotHandlingComponent implements OnInit {

  garageState:string;
  alarmState:string;


  static readonly BUTTON_NOTIF_MAP = {
    "garage-mode":"Mode garage activé",
    "open-garage" : "La porte du garage s'est correctement ouverte",
    "close-garage" : "La porte du garage s'est correctement fermée",
    "open-windows" : "Les volets et les fenêtres se sont ouvertes",
    "secure-home" : "l'alarme a été activée et les volets et fenêtres ont été fermés",
    "turnoff-alarm" : "l'alarme a été désactivée"
  };



  ngOnInit(): void {
  }

  constructor(private iotService : IotService){
    setInterval(function() {
       iotService.getGarageDoorState().subscribe((data : string[]) => this.garageState = data['state']);
       iotService.getAlarmState().subscribe((data : string[]) => this.alarmState = data['state']);
      IotHandlingComponent.printNotif(this.garageState,this.alarmState);
    }, 1000);
  }



  garageMode(){
    this.iotService.garageMode();

  }

  openGarageDoor(){
    this.iotService.openGarageDoor();

  }

  closeGarageDoor(){
    this.iotService.closeGarageDoor();
  }

  openWindows(){
    this.iotService.openWindows();
  }

  secureHome(){
    this.iotService.secureHome();
  }

  turnoffAlarm(){
    this.iotService.turnOffAlarm();
  }


  static printNotif(text1: string, text2: string){
      document.getElementById("stateDoor").innerHTML = text1;
      document.getElementById("stateFire").innerHTML = text2

        }




}
