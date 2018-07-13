import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
