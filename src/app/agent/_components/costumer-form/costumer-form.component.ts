import {Component, OnInit} from '@angular/core';
import {Costumer} from '../../agent';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AgentService} from '../../_services/agent.service';

@Component({
  selector: 'app-costumer-form',
  templateUrl: './costumer-form.component.html',
  styleUrls: ['./costumer-form.component.css']
})
export class CostumerFormComponent implements OnInit {

  isCreate = true;
  costumerFormGroup: FormGroup;
  costumerId = null;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private agentService: AgentService) {
  }

  ngOnInit(): void {

    this.costumerFormGroup = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      company_name: ['']
    });

    this.costumerId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.costumerId);
    if (this.costumerId) {
      this.isCreate = false;
      this.getChosenCostumer(this.costumerId);
    }
  }

  getChosenCostumer(costumerId) {
    this.agentService.getSingleCostumer(costumerId).subscribe(response => {
      this.costumerFormGroup.patchValue(response);
    });
  }

  saveCostumer() {
    if (this.isCreate) {
      return this.agentService.postCostumer(this.costumerFormGroup.value).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('agents/costumers-list');
      }, error => {
        console.log(error);
      });
    } else {
      return this.agentService.putCostumer(this.costumerId, this.costumerFormGroup.value).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('agents/costumers-list');
      }, error => {
        console.log(error);
      });
    }
  }

}
