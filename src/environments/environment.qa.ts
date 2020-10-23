export const environment = {
  production: true,
  name: 'qa',
  apiUrl: {
    userService: 'https://api.qa.abp.thinkoeducation.com/user-service',
    projectService: 'https://api.qa.abp.thinkoeducation.com/project-service',
    curriculumService:
      'https://api.qa.abp.thinkoeducation.com/curriculum-service',
    imgUpload: 'https://api.qa.abp.thinkoeducation.com/uploads/',
  },
  googleId:
    '331724195625-san881tgsb37476n1ujcfvs2u98gic1p.apps.googleusercontent.com',
  googleAPIKey: 'AIzaSyC-NmISTEj4Tc0WXbgV_r5QpUORQqV24GU',
  googleLoginOptions: {
    scope: 'https://www.googleapis.com/auth/drive',
    discoveryDocs: 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  },
}
