import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../services/editor/editor.service';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.scss']
})
export class StepFiveComponent implements OnInit {

  constructor(private editor: EditorService) { }

  ngOnInit(): void {
    this.formInit()
  }

  formInit() {
    this.editor.getStepData('stepFive')
  }

}
