import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  departmentList: AngularFireList<any>;
  array = [];

  constructor(private _firebase: AngularFireDatabase) {
    this.departmentList = this._firebase.list('departments');
    // convert list to observable by using snapshotChanges()
    this.departmentList.snapshotChanges().subscribe((list) => {
      this.array = list.map((item) => {
        return {
          $key: item.key,
          ...item.payload.val(), // will only give code and name
        };
      });
    });
  }

  getDepartmentName($key) {
    if ($key == '0') return '';
    else {
      return _.find(this.array, (obj) => {
        return obj.$key == $key;
      })['name'];
    }
  }
}
