import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { coreReducer } from './store/core/core.reducer';
import { authReducer } from './store/auth/auth.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      core: coreReducer,
      auth: authReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true
    })
  ]
})
export class CoreModule {

}
