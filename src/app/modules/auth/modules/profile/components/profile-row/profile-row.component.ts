import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-profile-row',
  templateUrl: './profile-row.component.html',
  styleUrls: ['./profile-row.component.scss'],
})
export class ProfileRowComponent {
  constructor() {}
  @Input() label: string
  @Input() data: string
}
