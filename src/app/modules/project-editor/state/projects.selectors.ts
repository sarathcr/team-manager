import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProjectsState} from './project.reducers';

import * as fromProjects from './project.reducers';


export const selectProjectsState =
    createFeatureSelector<ProjectsState>("projects");



export const selectAllProjects = createSelector(
    selectProjectsState,
    fromProjects.selectAll
);

// export const selectBeginnerCourses = createSelector(
//     selectAllCourses,
//     courses => courses.filter(course => course.category == 'BEGINNER')
// );

// export const selectAdvancedCourses = createSelector(
//     selectAllCourses,
//     courses => courses.filter(course => course.category == 'ADVANCED')
// );

// export const selectPromoTotal = createSelector(
//   selectAllCourses,
//   courses => courses.filter(course => course.promo).length
// );


export const areProjectsLoaded = createSelector(
    selectProjectsState,
    state => state.allProjectsLoaded
);