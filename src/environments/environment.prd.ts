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
    '82953797377-j1obcv7hblqbvlq5lo10lsfdmecsbt8n.apps.googleusercontent.com',
  googleAPIKey: 'AIzaSyB7XlVPpkBO5tiLnFHqod3RAq6TT7eHa4A',
  googleLoginOptions: {
    scope: 'https://www.googleapis.com/auth/drive',
    discoveryDocs: 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  },
}
