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
            path: 'stepOne',
            component: StepOneComponent,
          },
          {
            path: 'stepTwo',
            component: StepTwoComponent,
          }, {
            path: 'stepThree',
            component: StepThreeComponent,
          }, {
            path: 'stepFour',
            component: StepFourComponent,
          }, {
            path: 'stepFive',
            component: StepFiveComponent,
          }, {
            path: 'stepSix',
            component: StepSixComponent,
          },
          {
            path: 'stepSeven',
            component: StepSevenComponent,
          },
          {
            path: 'stepEight',
            component: StepEightComponent,
          },
          {
            path: 'stepNine',
            component: StepNineComponent,
          },
          {
            path: 'stepTen',
            component: StepTenComponent,
          },
          {
            path: '**',
            redirectTo: 'stepOne'
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
