import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
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
