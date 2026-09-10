import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, CloudAppTranslateModule, AlertModule } from '@exlibris/exl-cloudapp-angular-lib';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './components/main/main.component';
import { ActivationpreviewComponent } from './components/activationpreview/activationpreview.component';
import { ActivationinputComponent } from './components/activationinput/activationinput.component';
import { NavigationheaderComponent } from './components/navigationheader/navigationheader.component';
import { MomentFormatPipe } from './moment.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ActivationpreviewComponent,
    ActivationinputComponent,
    NavigationheaderComponent,
    MomentFormatPipe
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule,
    CloudAppTranslateModule.forRoot(),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
