import { Component, OnInit } from '@angular/core';
import { SlskeyAPIService } from '../../services/slskey.api.service';
import { SlskeyGroup } from '../../model/slskeygroup.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlmaUser } from '../../model/almauser.model';


@Component({
  selector: 'app-activationpreview',
  templateUrl: './activationpreview.component.html',
  styleUrls: ['./activationpreview.component.scss']
})
export class ActivationpreviewComponent implements OnInit {

  constructor(
    private _slskeyService: SlskeyAPIService,
    private router: Router,
  ) { }
  subscriptionSlskeyGroups: Subscription;
  subscriptionAlmaUser: Subscription;
  currentSlskeyGroups: Array<SlskeyGroup> = [];
  currentAlmaUser: AlmaUser;

  ngOnInit(): void {
    this.subscriptionSlskeyGroups = this._slskeyService.getSlskeyGroupsObject().subscribe(
      res => {
        this.currentSlskeyGroups = res;
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

  ngOnDestroy(): void {
    this.subscriptionSlskeyGroups.unsubscribe();
  }

  selectSlskeyGroup(slskeyCode): void {
    this._slskeyService.selectSlskeyGroup(slskeyCode);
    this.router.navigate(['activationinput']);
  }

}
