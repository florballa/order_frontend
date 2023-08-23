import {Component, OnInit} from '@angular/core';
import {User} from '../../agent';
import {Router} from '@angular/router';
import {AgentService} from '../../_services/agent.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'username', 'update', 'delete'];
  dataSource: MatTableDataSource<User>;

  constructor(private agentService: AgentService, private router: Router) {
  }

  ngOnInit(): void {
    this.getUsersFromServer();
  }

  getUsersFromServer() {
    this.agentService.getUsers().subscribe(response => {
      this.users = response;
      this.dataSource = new MatTableDataSource<User>(response);
    });
  }

  navigateToUserForm(userId?) {
    if (userId) {
      this.router.navigateByUrl(`agents/form/${userId}`);
    } else {
      this.router.navigateByUrl(`agents/form`);
    }
  }

  deleteUser(userId) {
    this.agentService.deleteUser(userId).subscribe(response => {
      console.log(response);
      this.getUsersFromServer();
    }, error => {
      console.log(error);
    });
  }

}
