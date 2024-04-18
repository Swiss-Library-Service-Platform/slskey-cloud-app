import { Component, OnInit } from '@angular/core';
import { SlskeyAPIService } from '../../services/slskey.api.service';
import { Subscription } from 'rxjs';
import { SlskeyGroup } from '../../model/slskeygroup.model';
import { Router } from '@angular/router';
import { AlmaUser } from '../../model/almauser.model';
import { AlertService } from '@exlibris/exl-cloudapp-angular-lib';

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
    private alert: AlertService,
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
    const [success, message] = await this._slskeyService.activateCurrentSlskeyUserForCurrentSlskeyGroup(this.inputRemark);
    const isGroupsFound = await this._slskeyService.getAvailableSlskeyGroupsForSelectedUser();
    this.loading = false;

    if (isGroupsFound) {
      this.router.navigate(['activationpreview']);
    } else {
      // TODO: error handling
    }
    if (success) {
      this.alert.success(message, { autoClose: false });
    }
    else {
      this.alert.error(message, { autoClose: false });
    }
  }

  async onBackButtonClicked(): Promise<void> {
    this.router.navigate(['activationpreview']);
  }

}
