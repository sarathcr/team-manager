export interface VideoOptions {
  fluid: boolean
  techOrder: string[]
  aspectRatio: string
  autoplay: boolean
  controls: boolean
  muted: boolean
  sources: {
    src: string
    type: string
  }[]
  poster?: string
  youtube?: object
  customVars?: object
  vimeo?: object
}
