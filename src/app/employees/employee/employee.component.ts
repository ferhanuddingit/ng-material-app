import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { EmployeeService } from 'src/app/shared/employee.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: [],
})
export class EmployeeComponent implements OnInit {
  constructor(
    public _employeeService: EmployeeService,
    public _departmentService: DepartmentService,
    private _notificationService: NotificationService,
    private _dialogRef: MatDialogRef<EmployeeComponent>
  ) {}

  ngOnInit() {
    this._employeeService.getEmployees();
  }

  onClear() {
    this._employeeService.form.reset();
    this._employeeService.initializeFormGroup();
  }

  onSubmit() {
    if (this._employeeService.form.valid) {
      if (!this._employeeService.form.get('$key').value)
        this._employeeService.insertEmployee(this._employeeService.form.value);
      else
        this._employeeService.updateEmployee(this._employeeService.form.value);
      this._employeeService.form.reset();
      this._employeeService.initializeFormGroup();
      this._notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose() {
    this._employeeService.form.reset();
    this._employeeService.initializeFormGroup();
    this._dialogRef.close();
  }
}
