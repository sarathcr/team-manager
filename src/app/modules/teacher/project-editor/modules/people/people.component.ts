import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { EditorService } from '../../services/editor/editor.service'

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  loaded$: Observable<boolean>

  constructor(public editor: EditorService) {}

  ngOnInit(): void {
    this.loaded$ = this.editor.loaded$
  }
}
