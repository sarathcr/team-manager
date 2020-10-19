export class DriveFile {
  fileExtension: string
  fullFileExtension: string
  id: string
  mimyType: string
  name: string
  parentId: string
  pro: boolean
  selfLink: string
  thumbnaillink: string
  webContentLink: string
  webViewLink: string
  embedLink: string
  type?: string
}

export class DriveFileStoreData {
  id: string
  fileList: DriveFile[]
}
