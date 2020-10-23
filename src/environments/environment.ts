// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prd.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'dev',
  apiUrl: {
    userService: 'https://api.dev.abp.thinkoeducation.com/user-service',
    projectService: 'https://api.dev.abp.thinkoeducation.com/project-service',
    curriculumService:
      'https://api.dev.abp.thinkoeducation.com/curriculum-service',
    imgUpload: 'https://api.dev.abp.thinkoeducation.com/uploads/',
  },
  googleId:
    '331724195625-san881tgsb37476n1ujcfvs2u98gic1p.apps.googleusercontent.com',
  googleAPIKey: 'AIzaSyC-NmISTEj4Tc0WXbgV_r5QpUORQqV24GU',
  googleLoginOptions: {
    scope: 'https://www.googleapis.com/auth/drive',
    discoveryDocs: 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  },
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
