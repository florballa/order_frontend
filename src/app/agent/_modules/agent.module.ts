import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgentFormComponent} from '../_components/agent-form/agent-form.component';
import {AgentListComponent} from '../_components/agent-list/agent-list.component';
import {AgentRoutingModule} from './agent-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CostumerListComponent} from '../_components/costumer-list/costumer-list.component';
import {CostumerFormComponent} from '../_components/costumer-form/costumer-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AgentFormComponent,
    AgentListComponent,
    CostumerListComponent,
    CostumerFormComponent,
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class AgentModule {
}
