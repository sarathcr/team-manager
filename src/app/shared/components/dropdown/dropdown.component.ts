import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, OnDestroy } from '@angular/core'

import { IDropdownSettings } from 'ng-multiselect-dropdown'
import { Observable } from 'rxjs'

// Interfaces
import { DropDownConfig, Option } from '../../constants/field.model'

import { SubSink } from '../../utility/subsink.utility'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit, OnDestroy {
  @Output() dropdownSelect: EventEmitter<any> = new EventEmitter()
  @Input() config: DropDownConfig
  @Input() selectedItems$: Observable<Option[]>
  @Input() data$: Observable<any>
  @Input() placeholder: string
  @Input() label: string
  active = false
  dropdownSettings: IDropdownSettings = {}
  initialSelectedItems: Option[]
  subscriptions = new SubSink()
  init

  constructor() { }

  ngOnInit(): void {
    this.dropdownSettings = {
      ...this.config.settings,
      itemsShowLimit: 3,
      closeDropDownOnSelection: true,
      maxHeight: 265,
      enableCheckAll: false
    }
    this.dropdownInit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  dropdownInit(): void {
    if (this.data$) {
      this.subscriptions.sink = this.data$.subscribe(data => {
        if (data) {
          if (Array.isArray(data)) {
            if (data.length) {
              this.config.selectedItems = [...data]
              this.handleDataChange()
            }
          } else {
            this.config.selectedItems = [{ ...data }]
            this.handleDataChange()
          }
        }
      })
    }
  }

  onItemSelect(item: any): void {
    this.active = true
    this.handleDataChange(true)
  }

  onItemDeSelect(item: any): void {
    this.active = true
    this.handleDataChange(true)
  }

  onDropDownClose(): void {
    this.active = false
  }

  handleDataChange(updated: boolean = false): void {
    const status = this.config.selectedItems.length ? 'INPROCESS' : 'PENDING'
    this.dropdownSelect.emit({ controller: this.config.name, val: this.config.selectedItems, updated, status })
  }
}
