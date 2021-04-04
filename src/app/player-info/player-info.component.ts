import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
  @Input() player: any;
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.player);
  }

  onClose() {
    this.close.emit();
  }
}
