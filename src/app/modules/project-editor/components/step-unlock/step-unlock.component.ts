import { Component, OnInit } from '@angular/core';
import { buttonSubmitConfig } from '../../constants/form-config.data';

@Component({
  selector: 'app-step-unlock',
  templateUrl: './step-unlock.component.html',
  styleUrls: ['./step-unlock.component.scss']
})
export class StepUnlockComponent implements OnInit {

  buttonConfig = new buttonSubmitConfig
  
  constructor() { }

  ngOnInit(): void {
  }

}
