import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

// Start of HubSpot Embed Code
if (environment.name === 'prd' || environment.name === 'pro') {
  const script = document.createElement('script')
  script.id = 'hs-script-loader'
  script.type = 'text/javascript'
  script.async = true
  script.defer = true
  script.src = '//js.hs-scripts.com/6022192.js'
  document.head.appendChild(script)
}
// End of HubSpot Embed Code

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err))
})
