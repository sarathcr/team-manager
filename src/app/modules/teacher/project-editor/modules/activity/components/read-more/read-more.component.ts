import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
})
export class ReadMoreComponent implements OnInit {
  @Input() text: string
  @Input() maxCharacters: number
  @Input() showText = 'Mostar más'
  @Input() hideText = 'Mostrar menos'
  showMore = false
  charactersToShow: number

  ngOnInit(): void {
    this.charactersToShow = this.maxCharacters
  }

  toggleShowMore(): void {
    this.showMore = !this.showMore
    this.charactersToShow = this.showMore
      ? this.text.length
      : this.maxCharacters
  }
}
