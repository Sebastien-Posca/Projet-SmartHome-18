import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import {FormComponent} from './form/form.component';
import {LoginComponent} from './login/login.component';
import{CommentsComponent} from './comments/comments.component';
import {IotHandlingComponent} from "./iotHandling/iotHandling.component";


const routes: Routes = [
  { path: 'list/:id', component: ListComponent },
  { path: 'form', component: FormComponent },
  { path: 'login', component: LoginComponent},
  { path: 'iot', component: IotHandlingComponent},
  { path: 'comments', component: CommentsComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports:[ RouterModule.forRoot(routes)]
})

export class AppRoutingModule {

}
