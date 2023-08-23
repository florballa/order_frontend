import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgentFormComponent} from '../_components/agent-form/agent-form.component';
import {AgentListComponent} from '../_components/agent-list/agent-list.component';
import {CostumerListComponent} from '../_components/costumer-list/costumer-list.component';
import {CostumerFormComponent} from '../_components/costumer-form/costumer-form.component';


const routes: Routes = [
  {path: 'list', component: AgentListComponent},
  {path: 'form', component: AgentFormComponent},
  {path: 'form/:id', component: AgentFormComponent},
  {path: 'costumers-list', component: CostumerListComponent},
  {path: 'costumer-form', component: CostumerFormComponent},
  {path: 'costumer-form/:id', component: CostumerFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AgentRoutingModule {
}
