export const environment = {
  production: true,
  name: 'prd',
  apiUrl: {
    userService: 'https://api.abp.thinkoeducation.com/user-service',
    projectService: 'https://api.abp.thinkoeducation.com/project-service',
    curriculumService: 'https://api.abp.thinkoeducation.com/curriculum-service',
    imgUpload: 'https://api.abp.thinkoeducation.com/uploads/',
  },
  googleId:
    '339066244978-j4e1oo8296374f1v6s8nn7ctkned11vf.apps.googleusercontent.com',
  googleAPIKey: 'AIzaSyAqWYDpv0auQ2Jbzd1SmJpY3FDOqDedEXE',
  googleLoginOptions: {
    scope: 'https://www.googleapis.com/auth/drive',
    discoveryDocs: 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  },
}
