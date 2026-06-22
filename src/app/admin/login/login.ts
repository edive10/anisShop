import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('LOGIN RESPONSE', res);
        
        localStorage.setItem('adminToken', res.token);
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.error = 'Invalid email or password';
      }
    });
  }
}
