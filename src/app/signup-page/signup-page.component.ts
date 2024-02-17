import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  durationInSeconds = 3;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  signUp() {
    if (this.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    this.afAuth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // Success
        const user = userCredential.user;
        // Display success message
        this._snackBar.open('Signup successful!', 'Close', {
          duration: this.durationInSeconds * 1000,
        });
        // Redirect or do something after successful signup, e.g., navigate to the login page or a welcome page
        this.router.navigate(['/login']); // Adjust as necessary
      })
      .catch((error) => {
        // Handle errors here
        alert(`Signup failed: ${error.message}`);
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
