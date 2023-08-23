import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainNavComponent} from '../_components/main-nav.component';
import {AgentModule} from '../../agent/_modules/agent.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from '../../app-routing.module';
import {MatMenuModule} from '@angular/material/menu';
import {AppModule} from '../../app.module';



@NgModule({
  declarations: [
    MainNavComponent
  ],
  exports: [
    MainNavComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
  ]
})
export class MainNavModule { }
