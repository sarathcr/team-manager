// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: {
    userService: 'https://api.dev.abp.thinkoeducation.com/user-service',
    projectService: 'https://api.dev.abp.thinkoeducation.com/project-service',
    curriculumService:
      'https://api.dev.abp.thinkoeducation.com/curriculum-service',
    imgUpload: 'https://api.dev.abp.thinkoeducation.com/uploads/',
  },
  googleId:
    '339066244978-j4e1oo8296374f1v6s8nn7ctkned11vf.apps.googleusercontent.com',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
