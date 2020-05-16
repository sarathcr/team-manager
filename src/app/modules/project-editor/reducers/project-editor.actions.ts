import { createAction, props } from '@ngrx/store';
import { Project } from 'src/app/shared/models/project.model';

export const createProject = createAction(
    "[project editor component] create project",
    props<{project: Project}>()
)