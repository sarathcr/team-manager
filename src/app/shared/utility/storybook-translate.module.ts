import { HttpClient } from '@angular/common/http'
import { NgModule } from '@angular/core'
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader'
import { TranslateCut } from '../pipe/translate-cut.pipe'
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): any {
  return new MultiTranslateHttpLoader(http, [
    { prefix: 'assets/i18n/project-editor/', suffix: '.json' },
    { prefix: 'assets/i18n/activities/', suffix: '.json' },
    { prefix: 'assets/i18n/auth/', suffix: '.json' },
    { prefix: 'assets/i18n/shared/', suffix: '.json' },
  ])
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler,
      },
    }),
    TranslateModule,
  ],
  declarations: [TranslateCut],
  exports: [TranslateCut],
})
export class StorybookTranslateModule {
  constructor(translateService: TranslateService) {
    translateService.addLangs(['en', 'es'])
    translateService.setDefaultLang('en')
    const browserLang = translateService.getBrowserLang()
    translateService.use(browserLang.match(/en|es/) ? browserLang : 'en')
  }
}
