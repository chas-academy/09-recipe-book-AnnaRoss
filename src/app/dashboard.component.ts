import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <li *ngFor="let list of lists">
      <a [routerLink]="['/', user.alias, 'lists', list]" class="nav-link">
        <span class="nav-text">{{list}}</span>
      </a>
    </li>
  `
})
export class DashboardComponent implements OnInit {
  public user;
  public lists;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.fetchUserById(1).subscribe(result => {
      this.user = result;
      this.lists = result.listsById;
    });
  }
}
