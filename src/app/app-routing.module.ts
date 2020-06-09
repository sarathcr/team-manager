import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'editor',
    loadChildren: () => import('./modules/project-editor/project-editor.module').then(m => m.ProjectEditorModule)
  },
  { path: '**', redirectTo: 'editor' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
