import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchService } from 'src/app/global/search.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
  @Input() player: any;
  @Output() close = new EventEmitter<void>();
  stats: any;
  achievements: any[] = [];
  transfers: any[] = [];
  sidelined: any[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    const id = this.player.player.id;
    this.searchService.fetchTrophies(id).subscribe(
      responseData => this.achievements = responseData['response']
    );
    this.searchService.fetchTransfers(id).subscribe(
      responseData => {
        const temp = responseData['response'][0];
        if (temp) this.transfers = temp['transfers'];
      }
    );
    this.searchService.fetchSidelined(id).subscribe(
      responseData => this.sidelined = responseData['response']
    )
    this.stats = this.player.statistics[0];
  }

  onClose() {
    this.close.emit();
  }

  getUrl() {
    return "url('" + this.player.player.photo + "')";
  }
}
