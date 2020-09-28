import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EditorComponent } from './containers/editor/editor.component'
import { ExperiencesComponent } from './containers/experiences/experiences.component'
import { HomeComponent } from './containers/home/home.component'
import { InspirationsComponent } from './containers/inspirations/inspirations.component'
import { StepEightComponent } from './containers/step-eight/step-eight.component'
import { StepFiveComponent } from './containers/step-five/step-five.component'
import { StepFourComponent } from './containers/step-four/step-four.component'
import { StepNineComponent } from './containers/step-nine/step-nine.component'
import { StepOneComponent } from './containers/step-one/step-one.component'
import { StepSevenComponent } from './containers/step-seven/step-seven.component'
import { StepSixDidacticUnitComponent } from './containers/step-six-didactic-unit/step-six-didactic-unit.component'
import { StepSixComponent } from './containers/step-six/step-six.component'
import { StepThreeComponent } from './containers/step-three/step-three.component'
import { StepTwoComponent } from './containers/step-two/step-two.component'
import { StepsComponent } from './containers/steps/steps.component'
import { ProjectEditorComponent } from './project-editor.component'

const routes: Routes = [
  {
    path: 'projects',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ExperiencesComponent,
      },
      {
        path: 'inspirate',
        component: InspirationsComponent,
      },
    ],
  },
  {
    path: '',
    component: ProjectEditorComponent,
    children: [
      {
        path: '',
        redirectTo: '/editor/projects',
        pathMatch: 'full',
      },
      {
        path: 'project/:id',
        component: EditorComponent,
        children: [
          {
            path: '',
            component: StepsComponent,
            children: [
              {
                path: '1',
                component: StepOneComponent,
              },
              {
                path: '2',
                component: StepTwoComponent,
              },
              {
                path: '3',
                component: StepThreeComponent,
              },
              {
                path: '4',
                component: StepFourComponent,
              },
              {
                path: '5',
                component: StepFiveComponent,
              },
              {
                path: '6',
                component: StepSixComponent,
              },
              {
                path: '7',
                component: StepSevenComponent,
              },
              {
                path: '8',
                component: StepEightComponent,
              },
              {
                path: '9',
                component: StepNineComponent,
              },
              { path: '', redirectTo: '1' },
            ],
          },
          {
            path: 'activities',
            pathMatch: 'full',
            loadChildren: () =>
              import('./modules/activity/activity.module').then(
                (m) => m.ActivityModule
              ),
            data: { preload: true },
          },
          {
            path: 'evaluation',
            pathMatch: 'full',
            loadChildren: () =>
              import('./modules/evaluation/evaluation.module').then(
                (m) => m.EvaluationModule
              ),
            data: { preload: true },
          },
        ],
      },
      {
        path: 'project/:id/activity',
        loadChildren: () =>
          import('./modules/activity/activity.module').then(
            (m) => m.ActivityModule
          ),
        data: { preload: true },
      },
      {
        path: 'didactic-unit/:id/activity',
        loadChildren: () =>
          import('./modules/activity/activity.module').then(
            (m) => m.ActivityModule
          ),
        data: { preload: true },
      },
      {
        path: 'didactic-unit/:id',
        component: EditorComponent,
        children: [
          {
            path: '',
            component: StepsComponent,
            children: [
              {
                path: '1',
                component: StepOneComponent,
              },
              {
                path: '2',
                component: StepTwoComponent,
              },
              {
                path: '3',
                component: StepThreeComponent,
              },
              {
                path: '4',
                component: StepFourComponent,
              },
              {
                path: '5',
                component: StepFiveComponent,
              },
              {
                path: '6',
                component: StepSixDidacticUnitComponent,
              },
              { path: '', redirectTo: '1' },
            ],
          },
          {
            path: 'activities',
            pathMatch: 'full',
            loadChildren: () =>
              import('./modules/activity/activity.module').then(
                (m) => m.ActivityModule
              ),
            data: { preload: true },
          },
          {
            path: 'evaluation',
            pathMatch: 'full',
            loadChildren: () =>
              import('./modules/evaluation/evaluation.module').then(
                (m) => m.EvaluationModule
              ),
            data: { preload: true },
          },
        ],
      },
      { path: '**', redirectTo: './not-found' },
    ],
  },
  { path: '**', redirectTo: './not-found' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectEditorRoutingModule {}
