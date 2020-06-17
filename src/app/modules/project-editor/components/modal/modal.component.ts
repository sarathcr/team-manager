import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FieldConfig } from 'src/app/shared/constants/field.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {

  }



}
