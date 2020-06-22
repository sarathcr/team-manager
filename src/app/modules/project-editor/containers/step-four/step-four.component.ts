import { Component, OnInit } from '@angular/core'
import { EditorService } from '../../services/editor/editor.service'

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent implements OnInit {

  constructor(private editor: EditorService) { }

  ngOnInit(): void {
    this.formInit()
  }

  formInit() {
    this.editor.getStepData('stepFour')
  }

}
