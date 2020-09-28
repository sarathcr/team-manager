import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { SidebarVariant } from '../../constants/model/sidebar-menu.model'

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  @Input() icon: string
  @Input() text: string
  @Input() link: string
  @Input() updated = false
  @Input() variant: SidebarVariant

  constructor(public router: Router) {}

  ngOnInit(): void {}
}
