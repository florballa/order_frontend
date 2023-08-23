import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AgentService} from '../../_services/agent.service';
import {User} from '../../agent';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.css']
})
export class AgentFormComponent implements OnInit {

  isCreate = true;
  chosenUser: User[];
  userFormGroup: FormGroup;
  userId = null;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private agentService: AgentService) {
  }

  ngOnInit(): void {

    this.userFormGroup = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      password: [''],
      active: ['']
    });


    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.userId);
    if (this.userId) {
      this.isCreate = false;
      this.getChosenUser(this.userId);
    }


  }

  getChosenUser(userId) {
    this.agentService.getSingleUser(userId).subscribe(response => {
      this.userFormGroup.patchValue(response);
    });
  }


  saveUser() {
    if (this.isCreate) {
      return this.agentService.postUser(this.userFormGroup.value).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('agents/list');
      }, error => {
        console.log(error);
      });
    } else {
      return this.agentService.putUser(this.userId, this.userFormGroup.value).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('agents/list');
      }, error => {
        console.log(error);
      });
    }
  }

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

}
