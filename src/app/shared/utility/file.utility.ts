const videoFormats = [
  'mp4',
  'mov',
  'webm',
  'mpg',
  'mpeg',
  'mpe',
  'mpv',
  'ogg',
  'gif',
  'qt',
  'vob',
  'ogv',
  'drc',
  'rm',
  'yuv',
  'm4p',
  'm4v',
  'avi',
  'wmv',
  '.mov',
  'flv',
  'swf',
  'avchd',
  'mkv',
  '3gp',
  'gifv',
  'svi',
  'm2v',
  'viv',
  'nsv',
]

const imageFormats = [
  'jpeg',
  'tiff',
  'gif',
  'bmp',
  'png',
  'webp',
  'svg',
  'cgm',
  'bat',
  'exif',
  'jpg',
]

const documentFormats = [
  'doc',
  'docx',
  'odt',
  'ott',
  'fodt',
  'uot',
  'dotx',
  'xml',
  'rtf',
  'pdf',
]

const presentationTypes = [
  'ppt',
  'pptx',
  'odp',
  'otp',
  'fodp',
  'ppsx',
  'potx',
  'pot',
  'pps',
  'uos',
  'txt',
]

const tableTypes = [
  'ods',
  'ots',
  'fods',
  'uos',
  'xlsx',
  'xltx',
  'xls',
  'xlt',
  'dif',
  'dbf',
  'csv',
  'xlsm',
  'slk',
]

const compressionTypes = [
  '7z',
  'zip',
  'tar',
  'rar',
  'zipx',
  'war',
  'iso',
  'jar',
  's7z',
]

export const getFileType = (type: string): Promise<string> => {
  return new Promise((resolve) => {
    const fileType = type.toLowerCase().split('/')
    const fileTypeFormat = fileType[fileType.length - 1]
    let returnType = ''
    if (
      presentationTypes.includes(fileTypeFormat) ||
      fileTypeFormat.includes('vnd.google-apps.presentation')
    ) {
      returnType = 'PRESENTATION'
    } else if (
      documentFormats.includes(fileTypeFormat) ||
      fileTypeFormat.includes('vnd.google-apps.document')
    ) {
      returnType = 'DOCUMENT'
    } else if (
      tableTypes.includes(fileTypeFormat) ||
      fileTypeFormat.includes('vnd.google-apps.spreadsheet')
    ) {
      returnType = 'SHEET'
    } else if (
      videoFormats.includes(fileTypeFormat) ||
      fileType[0].toLowerCase().includes('video')
    ) {
      returnType = 'VIDEO'
    } else if (
      imageFormats.includes(fileTypeFormat) ||
      fileType[0].toLowerCase().includes('image')
    ) {
      returnType = 'IMAGE'
    } else if (fileTypeFormat.includes('WEB')) {
      returnType = 'WEB'
    } else if (compressionTypes.includes(fileTypeFormat)) {
      returnType = 'OTHER'
    }
    resolve(returnType)
  })
}
