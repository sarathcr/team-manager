import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FieldConfig } from 'src/app/shared/constants/field.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  public onClose: Subject<string>;


  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.onClose.next('delete');
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next('cancel');
    this.bsModalRef.hide();
  }

}
