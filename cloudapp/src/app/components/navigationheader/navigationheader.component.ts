import { Component, Input, OnInit } from '@angular/core';
import { AlmaUser } from '../../model/almauser.model';

@Component({
  selector: 'app-navigationheader',
  templateUrl: './navigationheader.component.html',
  styleUrls: ['./navigationheader.component.scss']
})
export class NavigationheaderComponent implements OnInit {

  @Input() title: string;
  @Input() currentAlmaUser: AlmaUser;
  @Input() showBackButton: boolean;


  constructor(

  ) { }

  ngOnInit(): void {

  }

  navigateBack(): void {
    window.history.back();
  }

}
