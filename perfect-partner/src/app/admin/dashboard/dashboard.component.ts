import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: string = '';

  constructor(
    private keycloackService: KeycloakService
  ) { }

  ngOnInit(): void {
    this.initializeUserOptions();
  }

  initializeUserOptions() {
    this.user = this.keycloackService.getUsername();
  }

  logout() {
    this.keycloackService.logout();
  }

}
