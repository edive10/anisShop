import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('adminToken');

  if (token) {
    return true;
  }

  router.navigate(['/admin/login']);
  return false;
};
