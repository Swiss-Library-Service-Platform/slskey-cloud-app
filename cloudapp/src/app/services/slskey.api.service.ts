import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CloudAppEventsService, Entity, AlertService, CloudAppRestService, InitData } from '@exlibris/exl-cloudapp-angular-lib';
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
  private baseUrlProd: string = 'https://slskey2.swisscovery.network';
  private baseUrlTest: string = 'https://slskey2-test.swisscovery.network';
  private cloudAppPath: string = '/api/v1/cloudapp';

  private testInstitutions: Array<string> = ['41SLSP_UBS'];
  private isTestEnvironment: boolean = false;
  private readonly _isTestEnvironmentObject = new BehaviorSubject<boolean>(false);

  httpOptions: {};

  constructor(
    private http: HttpClient,
    private eventsService: CloudAppEventsService,
    private alert: AlertService,
    private restService: CloudAppRestService,
  ) { }

  /**
   * Initializes service
   * Gets the Alma Auth Token and defined HTTPOptions
   *
   * @return {*}  {Promise<void>}
   * @memberof LibraryManagementService
   */
  async init(initData: InitData): Promise<void> {
    this.initData = initData;
    let authToken = await this.eventsService.getAuthToken().toPromise();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };
    if (this.testInstitutions.includes(initData.instCode)) {
      this.isTestEnvironment = true;
      this._isTestEnvironmentObject.next(true);
    }
  }

  getBaseUrl(): string {
    return this.isTestEnvironment ? this.baseUrlTest : this.baseUrlProd;
  }

  getCloudAppPath(): string {
    return this.getBaseUrl() + this.cloudAppPath;
  }

  getIsTestEnvironmentObject(): Observable<boolean> {
    return this._isTestEnvironmentObject.asObservable();
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

  async authenticateAndCheckIfUserAllowed(): Promise<boolean> {
    return new Promise(resolve => {
      this.http.get(this.getCloudAppPath() + '/authenticate', this.httpOptions).subscribe(
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
      this.http.get(this.getCloudAppPath() + '/user/' + this.selectedUser.primary_id + '/activate', this.httpOptions).subscribe(
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

  async activateCurrentSlskeyUserForCurrentSlskeyGroup(remark: String, isMemberEducationInstitution: boolean = false): Promise<[boolean, string]> {
    const payload = {
      primary_id: this.selectedUser.primary_id,
      slskey_code: this.selectedSlskeyGroup.value,
      remark: remark,
      member_of_education_institution: isMemberEducationInstitution,
      alma_user: this.selectedUser.data
    };
    return new Promise(resolve => {
      this.http.post(this.getCloudAppPath() + '/user/' + this.selectedUser.primary_id + '/activate', payload, this.httpOptions).subscribe(
        (data: any) => {
          resolve([true, data]);
        },
        error => {
          // error message either
          let errorMsg = error.error.message || error.error
          resolve([false, errorMsg]);
        },
      );
    });
  }

  selectSlskeyGroup(slskeyCode: string): void {
    this.selectedSlskeyGroup = this.slskeyGroups.find(group => group.value === slskeyCode);
    this._setObservableSelectedSlskeyGroupObject(this.selectedSlskeyGroup);
  }

}
