import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  email: string = ''; // Initialize properties
  password: string = '';
  confirmPassword: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

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
        // Redirect or do something after successful signup, e.g., navigate to the login page or a welcome page
        this.router.navigate(['/welcome']); // Adjust as necessary
      })
      .catch((error) => {
        // Handle errors here
        alert(`Signup failed: ${error.message}`);
      });
  }

  goToLogin() {
    this.router.navigate(['/login']); // Adjust the path as necessary
  }
}
