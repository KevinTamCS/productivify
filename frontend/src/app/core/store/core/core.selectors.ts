import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CoreState } from 'src/app/core/store/core/core.reducer';


export const selectCoreState = createFeatureSelector<CoreState>('core');

export const selectIsSidenavOpen = createSelector(
  selectCoreState,
  (state: CoreState) => state.isSidenavOpen
);
