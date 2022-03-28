import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private keycloakService: KeycloakService
  ) {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      remember: new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    // this.keycloakService.login(o).then(res => {
    //   console.log('RES: ', res);
    // }).catch(err => {
    //   console.log('ERR: ', err);
    // })

    this.authService.logIn(this.loginForm.value['user'], this.loginForm.value['password']).subscribe(
      (result) => {
        console.log('component: ', result);
      },
      (error) => {
        console.log('component error: ', error);
      }
    )
  }

}
