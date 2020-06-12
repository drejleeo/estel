import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ParkingsComponent } from './parkings/parkings.component';
import { ParkingDetailComponent } from './parking-detail/parking-detail.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationCreateComponent } from './reservation-create/reservation-create.component';
import { ContactComponent } from './contact/contact.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'stations', component: ParkingsComponent, canActivate: [AuthGuard] },
  { path: 'stations/:id', component: ParkingDetailComponent, canActivate: [AuthGuard] },

  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuard] },
  { path: 'reservations/add', component: ReservationCreateComponent, canActivate: [AuthGuard] },
  // { path: 'reservations/:id', component: , },
  // { path: 'reservations/:id/edit', component: EditReservationComponent, },

  { path: 'companies', component: CompaniesComponent},
  { path: 'companies/:id', component: CompanyDetailComponent, },
  // { path: 'companies/:breadcrumb', component: CompanyDetailComponent, },
  // { path: 'companies/:id/edit', component: EditCompanyComponent, },
  
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
