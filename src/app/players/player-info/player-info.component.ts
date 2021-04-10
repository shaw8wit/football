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

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.fetchTrophies(this.player.player.id).subscribe(
      responseData => this.achievements = responseData['response']
    );
    this.stats = this.player.statistics[0];
  }

  onClose() {
    this.close.emit();
  }

  getUrl() {
    return "url('" + this.player.player.photo + "')";
  }
}
