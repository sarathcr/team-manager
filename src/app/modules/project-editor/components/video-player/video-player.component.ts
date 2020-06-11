import { Component, OnInit, ViewEncapsulation, OnDestroy, ElementRef, ViewChild, Input } from '@angular/core';
import videojs from 'video.js';
import '@devmobiliza/videojs-vimeo/dist/videojs-vimeo.cjs';
import 'videojs-youtube';
import { VideoOptions } from 'src/app/shared/constants/video.model';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  player: videojs.Player;
  @ViewChild('target', {static: true}) target: ElementRef;
  @Input() videoOptions: VideoOptions

  constructor( private elementRef: ElementRef,) { }

  ngOnInit(): void {
    this.player = videojs(this.target.nativeElement, this.videoOptions, function onPlayerReady() {});
  }

  ngOnDestroy() {

    if (this.player) {
      this.player.dispose(); // destroy player
    }
  }
}
