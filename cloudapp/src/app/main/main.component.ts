import { forkJoin, iif, Observable, of, Subscription  } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CloudAppRestService, CloudAppEventsService, Request, HttpMethod, 
  Entity, RestErrorResponse, AlertService, PageInfo, EntityType } from '@exlibris/exl-cloudapp-angular-lib';
import { MatRadioChange } from '@angular/material/radio';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isThisTypeNode } from 'typescript';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  loading = false;
  selectedEntity: Entity;
  apiResult: any;
  activationDone: boolean;
  private pageLoad$: Subscription;
  authToken: string;
  httpOptions: {};

  entities$: Observable<Entity[]> = this.eventsService.entities$
  .pipe(
    tap(() => this.clear()),
    map(entities => {
      return entities.filter(e=>e.type==EntityType.USER);
    }),
    )

  constructor(
    private restService: CloudAppRestService,
    private eventsService: CloudAppEventsService,
    private alert: AlertService,
    private http: HttpClient,
    
  ) { }


  ngOnInit() {
    this.pageLoad$ = this.eventsService.onPageLoad(this.onPageLoad);
    this.eventsService.getAuthToken()
      .subscribe(authToken => this.authToken = authToken);
    this.httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'text/plain',
          'Content-Type':  'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${this.authToken}`
        }), 
        responseType: "text" as 'json',
        withCredentials: true
      };
  }

  ngOnDestroy(): void {
    this.pageLoad$.unsubscribe();
  }

  onPageLoad = (pageInfo: PageInfo) => {
    console.log("Retrieved onPageLoad event", pageInfo);
  }

  entitySelected(event: MatRadioChange) {
    const value = event.value as Entity;
    this.loading = true;
    this.restService.call<any>(value.link)
    .pipe(finalize(()=>this.loading=false))
    .subscribe(
      result => this.apiResult = result,
      error => this.alert.error('Failed to retrieve entity: ' + error.message)
    );
  }

  clear() {
    this.apiResult = null;
    this.selectedEntity = null;
    this.activationDone = false;
  }

  /** Calls the PURA Login URL to get a authorized session */
  loginPuraBackend() {
      var body = "onlyTextResponse=" + true;
      this.loading = true;
      this.http.post('https://pura.swisscovery.network/login', body, this.httpOptions)
        .subscribe(
          (result) => this.activateUser(),
          (error) => {
            if (error.status == 403) {
              this.alert.error("Wrong username/password for PURA backend");
            } else {
              this.alert.error(error.message)
            }
          }
        );
  }

  /** Calls the PURA AlephNrEntry URL to activate publishers for a specific user */
  activateUser() {      
    var requestUrl = "https://pura.swisscovery.network/purauser/alephnrentry/" + this.apiResult?.primary_id;
    var body = "onlyTextResponse=" + true;
    this.http.post<any>(requestUrl, body, this.httpOptions)
      .pipe(
        map(response => {
          this.alert.success(this.apiResult?.full_name + ' - ' + response);
        }),
        finalize(() => {
          this.loading = false;
          this.activationDone = true;
        })
      )
      .subscribe(
        (result) => {},
        (error) => { 
          if (error.status == 404) {
            this.alert.error("Error: Could not find this user.");
          } else {
            this.alert.error(error.message);
          }
        },
        () => {}
      );
  }
}