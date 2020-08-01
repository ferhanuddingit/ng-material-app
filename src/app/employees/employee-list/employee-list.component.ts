import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/shared/department.service';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NotificationService } from '../../shared/notification.service';
import { EmployeeComponent } from '../employee/employee.component';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styles: [],
})
export class EmployeeListComponent implements OnInit {
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'fullName',
    'email',
    'mobile',
    'city',
    'departmentName',
    'actions',
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(
    public _employeeService: EmployeeService,
    private _departmentService: DepartmentService,
    private _dialog: MatDialog,
    private _notificationService: NotificationService,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this._employeeService.getEmployees().subscribe((list) => {
      let array = list.map((item) => {
        let departmentName = this._departmentService.getDepartmentName(
          item.payload.val()['department']
        );
        return {
          $key: item.key,
          departmentName,
          ...item.payload.val(),
        };
      });

      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some((ele) => {
          return (
            ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1
          );
        });
      };
    });
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  onCreate() {
    this._employeeService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this._dialog.open(EmployeeComponent, dialogConfig);
  }

  onEdit(row) {
    this._employeeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this._dialog.open(EmployeeComponent, dialogConfig);
  }

  onDelete($key: string) {
    this._dialogService
      .openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this._employeeService.deleteEmployee($key);
          this._notificationService.warn('! Deleted successfully');
        }
      });
  }
}
