import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


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
    private http: HttpClient,
    private router: Router
  ) { }

  login() {

    this.http.post<any>('http://localhost:3000/admin/login', {
      email: this.email,
      password: this.password
    })
      .subscribe({

        next: (res) => {

          localStorage.setItem('adminToken', res.token);

          this.router.navigate(['/admin']);

        },

        error: () => {

          this.error = 'Invalid email or password';

        }

      });

  }
}
