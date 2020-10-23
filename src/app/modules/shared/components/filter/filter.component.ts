import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { cloneDeep } from 'lodash'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { FilterOptions } from '../../constants/model/filter.model'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() filterOption: FilterOptions
  @Input() filterSum: number
  @Input() userType: 'TEACHER' | 'STUDENT' = 'TEACHER'
  @Output() filter = new EventEmitter()
  @ViewChild('filterModal') filterModal: TemplateRef<any>
  searchText: string
  modalRef: BsModalRef
  oneAtATime = true
  filterData: FilterOptions

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}
  // Modal View Open Common
  openFilterModal(): void {
    this.searchText = ''
    this.filterData = cloneDeep(this.filterOption)
    this.modalRef = this.modalService.show(this.filterModal, {
      class: 'modal-dialog-right',
    })
  }

  handleSearch(event: any): void {
    this.searchText = event
  }
  declineModal(event: any): void {
    this.modalRef.hide()
  }
  confirmModal(): void {
    this.modalRef.hide()
    this.filter.emit(this.filterData)
  }
}
