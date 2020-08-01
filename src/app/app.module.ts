import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './../app/material/material.module';
import { DatePipe } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { environment } from '../environments/environment';
import { EmployeeService } from './shared/employee.service';
import { DepartmentService } from './shared/department.service';
import { DialogService } from './shared/dialog.service';
import { NotificationService } from './shared/notification.service';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    MatConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    EmployeeService,
    DepartmentService,
    NotificationService,
    DialogService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
  entryComponents: [EmployeeComponent, MatConfirmDialogComponent],
})
export class AppModule {}
