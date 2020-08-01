import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employeeList: AngularFireList<any>;

  constructor(
    private _fb: FormBuilder,
    private _firebase: AngularFireDatabase,
    private _datePipe: DatePipe
  ) {}

  form: FormGroup = this._fb.group({
    $key: [null],
    fullName: ['', Validators.required],
    email: ['', Validators.email],
    mobile: ['', [Validators.required, Validators.minLength(8)]],
    city: [''],
    gender: ['1'],
    department: [0],
    hireDate: [''],
    isPermanent: [false],
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false,
    });
  }

  getEmployees() {
    this.employeeList = this._firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }

  insertEmployee(employee: any) {
    this.employeeList.push({
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireDate:
        employee.hireDate == ''
          ? ''
          : this._datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      isPermanent: employee.isPermanent,
    });
  }

  updateEmployee(employee: any) {
    this.employeeList.update(employee.$key, {
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireDate:
        employee.hireDate == ''
          ? ''
          : this._datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      isPermanent: employee.isPermanent,
    });
  }

  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }

  populateForm(employee: any) {
    this.form.setValue(_.omit(employee, 'departmentName'));
  }
}
