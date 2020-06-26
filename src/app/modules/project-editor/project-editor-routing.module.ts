import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './containers/home/home.component'
import { EditorComponent } from './containers/editor/editor.component'
import { ProjectEditorComponent } from './project-editor.component'
import { StepOneComponent } from './containers/step-one/step-one.component'
import { StepTwoComponent } from './containers/step-two/step-two.component'
import { StepThreeComponent } from './containers/step-three/step-three.component'
import { StepFourComponent } from './containers/step-four/step-four.component'
import { StepFiveComponent } from './containers/step-five/step-five.component'
import { StepSixComponent } from './containers/step-six/step-six.component'
import { StepSevenComponent } from './containers/step-seven/step-seven.component'
import { StepEightComponent } from './containers/step-eight/step-eight.component'
import { StepNineComponent } from './containers/step-nine/step-nine.component'
import { StepTenComponent } from './containers/step-ten/step-ten.component'

const routes: Routes = [
  {
    path: '',
    component: ProjectEditorComponent,
    children: [
      {
        path: 'projects',
        component: HomeComponent
      },
      {
        path: 'project/:id',
        component: EditorComponent,
        children: [
          {
            path: '1',
            component: StepOneComponent,
          },
          {
            path: '2',
            component: StepTwoComponent,
          }, {
            path: '3',
            component: StepThreeComponent,
          }, {
            path: '4',
            component: StepFourComponent,
          }, {
            path: '5',
            component: StepFiveComponent,
          }, {
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
          {
            path: '10',
            component: StepTenComponent,
          },
          {
            path: '**',
            redirectTo: '1'
          },
        ]
      },
      { path: '**', redirectTo: 'projects' }
    ]
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectEditorRoutingModule { }
