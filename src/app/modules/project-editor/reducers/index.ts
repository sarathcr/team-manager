import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import { Project } from 'src/app/shared/models/project.model';
import * as projectEditorActions from './project-editor.actions'

export const projectEditorFeatureKey = 'projectEditor';

export interface projecEditortState {
  projects: Project
}

export const initialProjectEditorState: projecEditortState = {
  projects: undefined
}

export const projecEditortReducer = createReducer(
  initialProjectEditorState,
  on(projectEditorActions.createProject, (state, action) => {
    return{
      projects: action.project
    }
  })
)
// export const reducers: ActionReducerMap<projectState> = {

// };

