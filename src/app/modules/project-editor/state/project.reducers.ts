import {compareProjects, Project} from 'src/app/shared/models/project.model';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {ProjectEditorActions} from './projects-action-types';


export interface ProjectsState extends EntityState<Project> {
    allProjectsLoaded: boolean
}


export const adapter = createEntityAdapter<Project>({
    sortComparer: compareProjects
});


export const initialProjectsState = adapter.getInitialState({
    allProjectsLoaded:false
});


export const projectsReducer = createReducer(

    initialProjectsState,

    on(ProjectEditorActions.allProjectsLoaded,
        (state, action) => adapter.addAll(
            action.project,
            {...state,
                allProjectsLoaded:true
            })),


    on(ProjectEditorActions.ProjectUpdated, (state, action) =>
        adapter.updateOne(action.update, state) )

);


export const {
    selectAll
} = adapter.getSelectors();