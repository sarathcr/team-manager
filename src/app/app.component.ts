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

  constructor(public TranslateService: TranslateService) {
    // ngx-translate
    TranslateService.addLangs(['en', 'es'])
    TranslateService.setDefaultLang('en')
    const browserLang = TranslateService.getBrowserLang();
    TranslateService.use(browserLang.match(/en|es/) ? browserLang : 'en')
  }
}
