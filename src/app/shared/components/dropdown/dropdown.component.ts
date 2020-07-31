import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core'

import { IDropdownSettings } from 'ng-multiselect-dropdown'
import { Observable } from 'rxjs'

// Interfaces
import { DropDownConfig, Option } from '../../constants/model/form-elements.model'

import { SubSink } from '../../utility/subsink.utility'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() config: DropDownConfig
  @Input() data$: Observable<any>
  @Input() placeholder: string
  @Input() label: string
  @Input() canDeselect = true
  @Input() getInitialData: boolean
  @Output() dropdownSelect: EventEmitter<any> = new EventEmitter()
  active = false
  dropdownSettings: IDropdownSettings = {}
  initialSelectedItems: any
  subscriptions = new SubSink()
  @ViewChild('dropdown') dropdownRef: ElementRef

  constructor() { }

  ngOnInit(): void {
    this.dropdownSettings = {
      ...this.config.settings,
      closeDropDownOnSelection: true,
      enableCheckAll: false,
    }
    this.dropdownInit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.adjustMaxheight()
  }

  adjustMaxheight(): void {
    const scrollHeight = document.documentElement.scrollHeight
    const bottom = this.dropdownRef.nativeElement.getBoundingClientRect().bottom
    if ((bottom + this.config.settings.maxHeight) > scrollHeight) {
      const diff = ((bottom + this.config.settings.maxHeight) - scrollHeight) + 15
      this.dropdownSettings.maxHeight = this.dropdownSettings.maxHeight - diff
      this.dropdownSettings = { ...this.dropdownSettings }
    }
  }

  dropdownInit(): void {
    if (this.data$) {
      this.subscriptions.sink = this.data$.subscribe(data => {
        if (data) {
          if (Array.isArray(data)) {
            if (data.length) {
              this.config.selectedItems = [...data]
              this.initialSelectedItems = [...data]
              this.handleDataChange()
            }
          } else {
            this.config.selectedItems = [{ ...data }]
            this.initialSelectedItems = [{ ...data }]
            this.handleDataChange()
          }
        }
      })
    }
  }

  selectedValue(): any {
    if (this.getInitialData && this.initialSelectedItems?.length) {
      return this.config.selectedItems.map(item => {
        return this.initialSelectedItems.find(selected => selected.id === item.id) || { ...item }
      })
    }
    return [...this.config.selectedItems]
  }

  onItemSelect(): void {
    this.active = true
    this.handleDataChange(true)
  }

  onItemDeSelect(item: Option): void {
    if (this.canDeselect) {
      this.active = true
      this.handleDataChange(true)
    }
    else {
      this.config.selectedItems = [{ ...item }]
    }
  }

  onDropDownClose(): void {
    this.active = false
  }

  handleDataChange(updated: boolean = false): void {
    const val = this.selectedValue()
    this.config.status = this.config.selectedItems.length ? 'INPROCESS' : 'PENDING'
    this.dropdownSelect.emit({ controller: this.config.name, val, updated })
  }
}
