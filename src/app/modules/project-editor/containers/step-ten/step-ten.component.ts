import { Component, OnInit } from '@angular/core'
import { EditorService } from '../../services/editor/editor.service'

@Component({
  selector: 'app-step-ten',
  templateUrl: './step-ten.component.html',
  styleUrls: ['./step-ten.component.scss']
})
export class StepTenComponent implements OnInit {

  constructor(private editor: EditorService) { }

  ngOnInit(): void {
    this.formInit()
  }

  formInit(): void {
    this.editor.getStepData(10)
  }

}
