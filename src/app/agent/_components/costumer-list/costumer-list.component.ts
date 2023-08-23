import {Component, OnInit} from '@angular/core';
import {AgentService} from '../../_services/agent.service';
import {Costumer, User} from '../../agent';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-costumer-list',
  templateUrl: './costumer-list.component.html',
  styleUrls: ['./costumer-list.component.css']
})
export class CostumerListComponent implements OnInit {

  costumers: Costumer[] = [];
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'company_name', 'update', 'delete'];
  dataSource: MatTableDataSource<Costumer>;

  constructor(private agentService: AgentService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCostumersFromServer();
  }


  getCostumersFromServer() {
    this.agentService.getCostumers().subscribe(response => {
      this.costumers = response;
      this.dataSource = new MatTableDataSource<Costumer>(response);
    });
  }

  navigateToCostumerForm(costumerId?) {
    if (costumerId) {
      this.router.navigateByUrl(`agents/costumer-form/${costumerId}`);
    } else {
      this.router.navigateByUrl(`agents/costumer-form`);
    }
  }

  deleteCostumer(costumerId) {
    this.agentService.deleteUser(costumerId).subscribe(response => {
      console.log(response);
      this.getCostumersFromServer();
    }, error => {
      console.log(error);
    });
  }


}
