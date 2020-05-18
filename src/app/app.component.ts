import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public TranslateService: TranslateService) {
    // ngx-translate
    TranslateService.addLangs(['en', 'es']);
    TranslateService.setDefaultLang('en');
    const browserLang = TranslateService.getBrowserLang();
    TranslateService.use(browserLang.match(/en|es/) ? browserLang : 'en');
  }
  title = 'thinko-creator';
}
