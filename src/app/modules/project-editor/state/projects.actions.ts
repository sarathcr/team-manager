import { createAction, props } from '@ngrx/store';
import {Update} from '@ngrx/entity';
import { Project } from 'src/app/shared/models/project.model';

// export const createProject = createAction(
//     "[project editor component] create project",
//     props<{project: Project}>()
// )

export const loadAllProjects = createAction(
    "[Projects resolver] Load All Projects"
)
export const allProjectsLoaded = createAction(
    "[Load Projects Effect] All Projects Loaded",
    props<{ project: Project[] }>()
)
export const ProjectUpdated = createAction(
    "[Edit Course] Project Updated",
    props<{ update: Update<Project> }>()
);