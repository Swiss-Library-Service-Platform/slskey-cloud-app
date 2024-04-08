import { Component, OnInit } from '@angular/core';
import { SlskeyAPIService } from '../../services/slskey.api.service';
import { Subscription } from 'rxjs';
import { SlskeyGroup } from '../../model/slskeygroup.model';
import { Router } from '@angular/router';
import { AlmaUser } from '../../model/almauser.model';

@Component({
  selector: 'app-activationinput',
  templateUrl: './activationinput.component.html',
  styleUrls: ['./activationinput.component.scss']
})
export class ActivationinputComponent implements OnInit {

  loading: boolean = false;
  subscriptionSelectedSlskeyGroup: Subscription;
  subscriptionAlmaUser: Subscription;
  currentSelectedSlskeyGroup: SlskeyGroup;
  currentAlmaUser: AlmaUser;
  inputRemark: String;

  constructor(
    private _slskeyService: SlskeyAPIService,
    private router: Router  
  ) { }

  ngOnInit(): void {
    this.subscriptionSelectedSlskeyGroup = this._slskeyService.getSelectedSlskeyGroupObject().subscribe(
      res => {
        this.currentSelectedSlskeyGroup = res;
        this.inputRemark = this.currentSelectedSlskeyGroup.activation?.remark || '';
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
    this.subscriptionAlmaUser = this._slskeyService.getSelectedUserObject().subscribe(
      res => {
         this.currentAlmaUser = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  async activateSlskeyUserForSlskeyGroup(): Promise<void> {
    this.loading = true;
    await this._slskeyService.activateCurrentSlskeyUserForCurrentSlskeyGroup(this.inputRemark);
    this.loading = false;
    this.router.navigate(['activationpreview']);
  }
}
