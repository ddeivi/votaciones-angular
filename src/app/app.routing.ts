// importar los modulos del router
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';


// importar los componentes
import { LoginComponent } from './components/login/login.component';
import { VerCandidatosComponent } from './components/ver-candidatos/ver-candidatos.component';
import { RegisterCandidateComponent } from './components/register-candidate/register-candidate.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListComponent } from './components/list/list.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { EditCandidateComponent } from './components/edit-candidate/edit-candidate.component';
import { VotesComponent } from './components/votes/votes.component';
import { CertificateComponent } from './components/certificate/certificate.component';
import { IdentityGuard } from './services/identity.guard';


// array de rutas
const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'candidates/:id', component: VerCandidatosComponent, canActivate: [IdentityGuard]},
    { path: 'registerCandidates', component: RegisterCandidateComponent, canActivate: [IdentityGuard]},
    { path: 'inicio', component: InicioComponent, canActivate: [IdentityGuard]},
    { path: 'list', component: ListComponent, canActivate: [IdentityGuard]},
    { path: 'edit-list/:id', component: EditListComponent, canActivate: [IdentityGuard]},
    { path: 'edit-candidate/:id', component: EditCandidateComponent, canActivate: [IdentityGuard]},
    { path: 'votes', component: VotesComponent, canActivate: [IdentityGuard]},

    { path: 'votes/:id', component: VotesComponent, canActivate: [IdentityGuard]},

    { path: 'certificate', component: CertificateComponent, canActivate: [IdentityGuard]},




    { path: '**', component: LoginComponent }


];


// exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


