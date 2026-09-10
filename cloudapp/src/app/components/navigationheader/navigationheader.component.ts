import { Component, Input, OnInit } from '@angular/core';
import { AlmaUser } from '../../model/almauser.model';
import { Router } from '@angular/router';
import { SlskeyAPIService } from '../../services/slskey.api.service';

@Component({
  selector: 'app-navigationheader',
  templateUrl: './navigationheader.component.html',
  styleUrls: ['./navigationheader.component.scss']
})
export class NavigationheaderComponent implements OnInit {

  @Input() title: string;
  @Input() currentAlmaUser: AlmaUser;
  @Input() showBackButton: boolean;
  @Input() onBackButtonClicked: () => void;


  constructor(
    private slskeyService: SlskeyAPIService
  ) { }

  ngOnInit(): void {

  }

  navigateBack(): void {
    if (this.onBackButtonClicked) {
      this.onBackButtonClicked();
    }
  }

  getExternalUserUrl(): string {
    const baseUrl = this.slskeyService.getBaseUrl();
    return baseUrl + '/users/' + encodeURIComponent(String(this.currentAlmaUser.primary_id));
  }

}
