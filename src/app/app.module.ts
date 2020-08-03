import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { ChartsModule } from 'ng2-charts';

import { UserService } from './services/user.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { VerCandidatosComponent } from './components/ver-candidatos/ver-candidatos.component';
import { RegisterCandidateComponent } from './components/register-candidate/register-candidate.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListComponent } from './components/list/list.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { EditCandidateComponent } from './components/edit-candidate/edit-candidate.component';
import { VotesComponent } from './components/votes/votes.component';
import { CertificateComponent } from './components/certificate/certificate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VerCandidatosComponent,
    RegisterCandidateComponent,
    InicioComponent,
    ListComponent,
    EditListComponent,
    EditCandidateComponent,
    VotesComponent,
    CertificateComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    ChartsModule
  ],
  providers: [
  appRoutingProviders,
  UserService

  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
