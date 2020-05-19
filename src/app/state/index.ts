import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';

export interface AppState {

}

export const appReducers: ActionReducerMap<AppState> = {
    router: routerReducer
};

// it triggers befor mail reducer
export function logger(reducer: ActionReducer<any>)
    : ActionReducer<any> {
    return (state, action) => {
        console.log("state before: ", state);
        console.log("action", action);
        return reducer(state, action);
    }
}

export const metaReducers: MetaReducer<AppState>[] =
    !environment.production ? [logger] : [];