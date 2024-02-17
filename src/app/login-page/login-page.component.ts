import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  durationInSeconds = 3;

  // Inject AngularFireAuth
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  login(): void {
    this.afAuth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        console.log('Login successful', user);
        // Display success message with snackbar
        this._snackBar.open('Login successful!', 'Close', {
          duration: this.durationInSeconds * 1000,
        });
        // Optionally, redirect the user to another page after successful login
        // this.router.navigate(['/home']); // Adjust the route as needed
      })
      .catch((error) => {
        console.error('Login failed', error);
        // Optionally, display an error message using the snackbar
        this._snackBar.open('Login failed: ' + error.message, 'Close', {
          duration: this.durationInSeconds * 1000,
        });
      });
  }
  goToSignUp() {
    this.router.navigate(['/signup']); // Adjust the route as needed
  }
}
