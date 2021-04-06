import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  @Input() players: any;
  displayedPlayer: any = null;

  constructor() { }

  ngOnInit(): void {
  }

  togglePlayerDisplay(p: any = null) {
    this.displayedPlayer = p;
  }
}
