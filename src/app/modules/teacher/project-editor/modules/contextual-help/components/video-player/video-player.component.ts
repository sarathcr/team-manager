import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'

import '@devmobiliza/videojs-vimeo/dist/videojs-vimeo.cjs'
import videojs from 'video.js'
import 'videojs-youtube'

import { VideoOptions } from 'src/app/common-shared/constants/model/video.model'

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  player: videojs.Player
  @ViewChild('target', { static: true }) target: ElementRef
  @Input() videoOptions: VideoOptions

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.initPlayer()
  }

  initPlayer(): void {
    this.player = videojs(
      this.target.nativeElement,
      this.videoOptions,
      function onPlayerReady(): void {}
    )
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose() // destroy player
    }
  }
}
