import { NgModule } from '@angular/core'
import {
  TranslateModule,
  TranslateService,
  TranslateLoader,
  TranslateCompiler
} from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader'
import { TranslateCut } from '../pipe/translate-cut.pipe'
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): any {
  return new MultiTranslateHttpLoader(http, [
    { prefix: 'assets/i18n/project-editor/', suffix: '.json' },
    { prefix: 'assets/i18n/auth/', suffix: '.json' }
  ])
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
    TranslateModule
  ],
  declarations: [TranslateCut],
  exports: [TranslateCut]
})
export class StorybookTranslateModule {
  constructor(translateService: TranslateService) {
    translateService.setDefaultLang('en')
    translateService.use('en')
  }
}
