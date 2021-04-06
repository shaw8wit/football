import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
  @Input() player: any;
  @Output() close = new EventEmitter<void>();
  stats: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.player);
    this.stats = this.player.statistics[0];
  }

  onClose() {
    this.close.emit();
  }

  getUrl() {
    return "url('" + this.player.player.photo + "')";
  }
}
