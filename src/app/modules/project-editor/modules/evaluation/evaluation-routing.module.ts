import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EvaluationEditorComponent } from './containers/evaluation-editor/evaluation-editor.component'
import { EvaluationComponent } from './evaluation.component'

const routes: Routes = [
  {
    path: '',
    component: EvaluationComponent,
    children: [
      {
        path: '',
        component: EvaluationEditorComponent,
      },
      { path: '**', redirectTo: './not-found' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationRoutingModule {}
