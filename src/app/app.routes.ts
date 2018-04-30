import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './authentication/AuthGuard';
import { ProfessionalInformationComponent } from './pages/professional-information/professional-information.component';
import { PersonalInformationComponent } from './pages/personal-information/personal-information.component';
import { PracticeInformationComponent } from './pages/practice-information/practice-information.component';
import { RegistrationInformationComponent } from './pages/registration-information/registration-information.component';
import { AffiliationsComponent } from './pages/affiliations/affiliations.component';
import { EducationAndTrainingComponent } from './pages/education-and-training/education-and-training.component';
import { AvailabilityComponent } from './pages/availability/availability.component';
import { HomeComponent } from './pages/home/home.component';

export const AppRoutes = [
  { path: '', redirectTo: 'login',  pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'errorPage', component: ErrorPageComponent },
  // required login
  { path: 'home', component: HomeComponent,
  //  data: { requiresLogin: true },
    canActivate: [AuthGuard],
    children: [
      { path: ''     , redirectTo: '/home/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'available', component: AvailabilityComponent },
      { path: 'professional', component: ProfessionalInformationComponent  },
      { path: 'Personal', component: PersonalInformationComponent },
      { path: 'Practice', component: PracticeInformationComponent },
      { path: 'Registration', component: RegistrationInformationComponent },
      { path: 'Affiliations', component: AffiliationsComponent },
      { path: 'Education', component: EducationAndTrainingComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes);