import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {FormService} from './shared/services/form.service';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { AppRoutingModule } from './/app-routing.module';
import { CommentsComponent } from './comments/comments.component';
import { LoginService } from './shared/services/login.service';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule, MatTableModule} from "@angular/material";
import { NavbarComponent } from './navbar/navbar.component';
import {ResourceService} from "./shared/services/resource.service";
import {CardComponent} from "./card/card.component";
import {IotHandlingComponent} from "./iotHandling/iotHandling.component";
import {IotService} from "./shared/services/iot.service";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatCardModule

],
  declarations: [
    AppComponent,
    FormComponent,
    LoginComponent,
    ListComponent,
    CommentsComponent,
    NavbarComponent,
    CardComponent,
    IotHandlingComponent

  ],
  bootstrap: [ AppComponent ],
  providers: [ FormService, LoginService, ResourceService, IotService ]
})

export class AppModule { }
