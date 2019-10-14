import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthLoginGuard } from './guards/auth-login/auth-login.guard';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [AuthLoginGuard] },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'chat-a', loadChildren: './pages/chat-a/chat-a.module#ChatAPageModule', canActivate: [AuthGuard] },
  { path: 'chat-b', loadChildren: './pages/chat-b/chat-b.module#ChatBPageModule', canActivate: [AuthGuard] },
  /* { path: 'popover', loadChildren: './pages/popover/popover.module#PopoverPageModule' }, */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
