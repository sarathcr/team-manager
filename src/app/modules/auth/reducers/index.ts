import { ActionReducerMap } from '@ngrx/store'

export const authFeatureKey = 'auth'

export interface AuthState {
  user: string
}

export const reducers: ActionReducerMap<AuthState> = {
  user: undefined,
}
