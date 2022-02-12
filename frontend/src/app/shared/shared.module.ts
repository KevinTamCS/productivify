import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { NavItemsComponent } from './nav-items/nav-items.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MobileSidenavComponent } from './mobile-sidenav/mobile-sidenav.component';


@NgModule({
  declarations: [
    NavItemsComponent,
    NavbarComponent,
    MobileSidenavComponent
  ],
  exports: [
    NavbarComponent,
    MobileSidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule
  ]
})
export class SharedModule {
}
