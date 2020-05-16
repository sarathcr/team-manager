import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';


export interface AppState {

}

export const appReducers: ActionReducerMap<AppState> = {
 router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = [];