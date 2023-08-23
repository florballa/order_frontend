import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AgentModule} from './agent/_modules/agent.module';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './login/_services/auth.guard';
import {LoginComponent} from './login/_components/login.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'agents',
    loadChildren: () => import('../app/agent/_modules/agent.module').then(m => AgentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('../app/order/_modules/order.module').then(m => m.OrderModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('../app/product/_modules/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
