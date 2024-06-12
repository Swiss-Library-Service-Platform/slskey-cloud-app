import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CloudAppEventsService, Request, HttpMethod,
  Entity, PageInfo, EntityType
} from '@exlibris/exl-cloudapp-angular-lib';
import { MatRadioChange } from '@angular/material/radio';
import { SlskeyAPIService } from '../../services/slskey.api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  loading = false;
  isAutoSelect: string;
  isUserAllowed: boolean = false;
  isUserCheckDone: boolean = false;

  entities$: Observable<Entity[]> = this.eventsService.entities$
    .pipe(
     tap(() => this.clear()),
      map(entities => {
        return entities.filter(e => e.type == EntityType.USER);
      }),
    )

  constructor(
    private eventsService: CloudAppEventsService,
    private _slskeyService: SlskeyAPIService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnDestroy(): void {
  }

  onPageLoad = (pageInfo: PageInfo) => {
  }

  async ngOnInit() {
    this.loading = true;
    let initData = await this.eventsService.getInitData().toPromise();
    await this._slskeyService.init(initData);

    this.isUserAllowed = await this._slskeyService.authenticateAndCheckIfUserAllowed();
    this.isUserCheckDone = true;

    if (this.route.snapshot.params.isAutoSelect == 'true') {
      this.entities$.subscribe(async (availableEntities) => {
        if (availableEntities.length == 1) {
          await this.setUser(availableEntities[0]);
        }
        this.loading = false;
      });
    } else {
      this.loading = false;
    }

  }


  async entitySelected(event: MatRadioChange) {
    const value = event.value as Entity;
    this.loading = true;
    await this.setUser(value);
    this.loading = false;
  }

  async setUser(entity: Entity) {
    // Get PrimaryId from entity
    const isUserFound = await this._slskeyService.getUserByPrimaryId(entity.link);
    const isGroupsFound = await this._slskeyService.getAvailableSlskeyGroupsForSelectedUser();
    if (isGroupsFound) {
      this.router.navigate(['activationpreview']);
    } else {
      // TODO: error handling
    }
  }

  clear() {

  }


}