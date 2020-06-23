import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = true
  isLoggedIn$: Observable<boolean>
  isLoggedOut$: Observable<boolean>

  constructor(public translateService: TranslateService, private titleService: Title) {
    // ngx-translate
    translateService.addLangs(['en', 'es'])
    translateService.setDefaultLang('en')
    const browserLang = translateService.getBrowserLang()
    translateService.use(browserLang.match(/en|es/) ? browserLang : 'en')
  }

  ngOnInit(): void {
    this.translateService.get('GENERAL.platform_title_tab').subscribe(name => {
      this.setTitle(name)
    })
  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle)
  }
}
