import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule
  ]
})
export class SharedModule {
}
