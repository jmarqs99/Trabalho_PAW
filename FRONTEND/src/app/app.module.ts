import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuardService } from './auth-guard-service.service';
import { JwtInterceptorService } from './jwt-interceptor-service.service';
import { PedidosComponent } from './pedidos/pedidos.component';
import { TestesComponent } from './testes/testes.component';
import { UtilizadoresComponent } from './utilizadores/utilizadores.component';
import { TecnicosComponent } from './tecnicos/tecnicos.component';
import { AdminsComponent } from './admins/admins.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'LogIn' }
  },
  {
    path: 'home',
    component: HomepageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'testes',
    component: TestesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'utilizadores',
    component: UtilizadoresComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tecnicos',
    component: TecnicosComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admins',
    component: AdminsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    PedidosComponent,
    TestesComponent,
    UtilizadoresComponent,
    TecnicosComponent,
    AdminsComponent,
    ChangePasswordComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})

  
export class AppModule { }
