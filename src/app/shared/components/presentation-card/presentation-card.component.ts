import { Component, Input, OnInit } from '@angular/core'
import { PresentationCardvariant } from '../../constants/model/presentation-card.model'

@Component({
  selector: 'app-presentation-card',
  templateUrl: './presentation-card.component.html',
  styleUrls: ['./presentation-card.component.scss'],
})
export class PresentationCardComponent implements OnInit {
  @Input() variant: PresentationCardvariant = 'default'
  @Input() imageURL: string
  @Input() title: string
  @Input() isPremium = false
  constructor() {}

  ngOnInit(): void {}
}
