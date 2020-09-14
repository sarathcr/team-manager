import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { EditorService } from '../../services/editor/editor.service'

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],
})
export class EvaluationComponent implements OnInit {
  loaded$: Observable<boolean>

  constructor(public editor: EditorService) {}

  ngOnInit(): void {
    this.loaded$ = this.editor.loaded$
  }
}
