import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface User {
  name: string;
  firstName:string;
}

/**
 * @title Display value autocomplete
 */
@Component({
  selector: 'autocomplete-display-example',
  templateUrl: 'autocomplete-display-example.html',
  styleUrls: ['autocomplete-display-example.css'],
})
export class AutocompleteDisplayExample implements OnInit {
  myControl = new FormControl();
  options: User[] = [{ name: 'Mary', firstName: 'aa' }, { name: 'Shelley', firstName: 'bb' }, { name: 'Igor', firstName: 'cc' }];
  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name + value.firstName),
        map(name => name.length>2 ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name + ' '+ user.firstName : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    //const filterValue1 =firstName.toLowerCase();

    return this.options.filter(option => (option.name.toLowerCase() || option.firstName).includes(filterValue));
  }
}


/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */