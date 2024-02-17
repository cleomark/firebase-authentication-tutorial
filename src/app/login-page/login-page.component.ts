import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  // Inject AngularFireAuth
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  login(): void {
    this.afAuth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        console.log('Login successful', user);
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  }
  goToSignUp() {
    this.router.navigate(['/signup']); // Adjust the route as needed
  }
}
