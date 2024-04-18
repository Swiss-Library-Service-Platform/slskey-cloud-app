import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CloudAppEventsService, Entity, AlertService, CloudAppRestService } from '@exlibris/exl-cloudapp-angular-lib';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { SlskeyGroup } from '../model/slskeygroup.model';
import { AlmaUser } from '../model/almauser.model';

/**
 * Service which is responsible for all outgoing API calls in this cloud app
 *
 * @export
 * @class SlskeyAPIService
 */
@Injectable({
  providedIn: 'root'
})
export class SlskeyAPIService {

  public slskeyGroups: Array<SlskeyGroup> = [];
  private readonly _slskeyGroupsObject = new BehaviorSubject<Array<SlskeyGroup>>(new Array<SlskeyGroup>());

  private selectedUser: AlmaUser;
  private readonly _selectedUserObject = new BehaviorSubject<AlmaUser>(new AlmaUser());

  private selectedSlskeyGroup: SlskeyGroup;
  private readonly _selectedSlskeyGroupObject = new BehaviorSubject<SlskeyGroup>(new SlskeyGroup());
  
  private initData: Object
  private baseUrl: string = 'https://slskey-test.swisscovery.network/api/v1/cloudapp';
  httpOptions: {};

  constructor(
    private http: HttpClient,
    private eventsService: CloudAppEventsService,
    private alert: AlertService,
    private translate: TranslateService,
    private restService: CloudAppRestService,
  ) { }

  /**
   * Initializes service
   * Gets the Alma Auth Token and defined HTTPOptions
   *
   * @return {*}  {Promise<void>}
   * @memberof LibraryManagementService
   */
  async init(initData: Object): Promise<void> {
    this.initData = initData;
    let authToken = await this.eventsService.getAuthToken().toPromise();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };
  }

  getSlskeyGroupsObject(): Observable<Array<SlskeyGroup>> {
    return this._slskeyGroupsObject.asObservable();
  }


  private _setObservableSlskeyGroupsObject(slskeyGroups: Array<SlskeyGroup>): void {
    this._slskeyGroupsObject.next(slskeyGroups);
  }

  /**
 * Get the user object as observable
 *
 * @return {*}  {Observable<User>}
 * @memberof LibraryManagementService
 */
  getSelectedUserObject(): Observable<AlmaUser> {
    return this._selectedUserObject.asObservable();
  }

  /**
   * Sets the observable user object so that listeners get notified
   *
   * @private
   * @param {User} user
   * @memberof LibraryManagementService
   */
  private _setObservableSelectedUserObject(user: AlmaUser): void {
    this._selectedUserObject.next(user);
  }

  /**
   * Get the slskey group object as observable
   *
   * @return {*}  {Observable<SlskeyGroup>}
   * @memberof LibraryManagementService
   */
  getSelectedSlskeyGroupObject(): Observable<SlskeyGroup> {
    return this._selectedSlskeyGroupObject.asObservable();
  }

  /**
   * Sets the observable slskey group object so that listeners get notified
   *
   * @private
   * @param {SlskeyGroup} slskeyGroup
   * @memberof LibraryManagementService
   */
  private _setObservableSelectedSlskeyGroupObject(slskeyGroup: SlskeyGroup): void {
    this._selectedSlskeyGroupObject.next(slskeyGroup);
  }

  async isUserAllowed(): Promise<boolean> {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + '/verify', this.httpOptions).subscribe(
        (data: any) => {
          resolve(true);
        },
        error => {
          console.log(error);
          resolve(false);
        },
      );
    });
  }

  async getUserByPrimaryId(link: string): Promise<boolean> {
    return new Promise(resolve => {
      this.restService.call<any>(link)
      .subscribe(
        result => {
          this.selectedUser = new AlmaUser(result);
          this._setObservableSelectedUserObject(this.selectedUser);
          resolve(true);
        },
        error => {
          this.alert.error('Failed to retrieve entity: ' + error.message);
          resolve(false);
        }
      );
    });
  }

  async getAvailableSlskeyGroupsForSelectedUser(): Promise<boolean> {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + '/user/' + this.selectedUser.primaryId + '/activate', this.httpOptions).subscribe(
        (data: any) => {
          this.slskeyGroups = data.map((group: any) => new SlskeyGroup(group));
          this._setObservableSlskeyGroupsObject(this.slskeyGroups);
          resolve(true);
        },
        error => {
          console.log(error);
          resolve(false);
        },
      );
    });
  }

  async activateCurrentSlskeyUserForCurrentSlskeyGroup(remark: String): Promise<[boolean,string]> {
    const payload = {
      primary_id: this.selectedUser.primaryId,
      slskey_code: this.selectedSlskeyGroup.value,
      remark: remark
    };
    return new Promise(resolve => {
      this.http.post(this.baseUrl + '/user/' + this.selectedUser.primaryId + '/activate', payload, this.httpOptions).subscribe(
        (data: any) => {
          resolve([true, data]);
        },
        error => {
          resolve([false, error.error]);
        },
      );
    });
  }

  selectSlskeyGroup(slskeyCode: string): void {
    this.selectedSlskeyGroup = this.slskeyGroups.find(group => group.value === slskeyCode);
    this._setObservableSelectedSlskeyGroupObject(this.selectedSlskeyGroup);
  }

}
