export const environment = {
  production: true,
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
