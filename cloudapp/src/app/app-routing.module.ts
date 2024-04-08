import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ActivationpreviewComponent } from './components/activationpreview/activationpreview.component';
import { ActivationinputComponent } from './components/activationinput/activationinput.component';

const routes: Routes = [
  { path: '', redirectTo: 'root/true', pathMatch: 'full' },
  { path: 'root/:isAutoSelect', component: MainComponent },
  { path: 'activationpreview', component: ActivationpreviewComponent },
  { path: 'activationinput', component: ActivationinputComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
