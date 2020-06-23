import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = true
  isLoggedIn$: Observable<boolean>
  isLoggedOut$: Observable<boolean>

  constructor(public translateService: TranslateService) {
    // ngx-translate
    translateService.addLangs(['en', 'es'])
    translateService.setDefaultLang('en')
    const browserLang = translateService.getBrowserLang()
    translateService.use(browserLang.match(/en|es/) ? browserLang : 'en')
  }
}
