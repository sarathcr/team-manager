import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { SubSink } from '../../../../shared/utility/subsink.utility'
import { EditorService } from '../../services/editor/editor.service'

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  loaded$: Observable<boolean>
  subscriptions = new SubSink()
  constructor(public editor: EditorService) {}

  ngOnInit(): void {
    this.loaded$ = this.editor.loaded$
  }
}
