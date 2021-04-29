import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchService } from 'src/app/global/search.service';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {
  @Input() fixtureId: string;
  @Output() close = new EventEmitter<void>();
  team1: any;
  team2: any;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.fetchFixtureStats(this.fixtureId).subscribe(
      responseBody => {
        this.team1 = responseBody['response'][0];
        this.team2 = responseBody['response'][1];
      }
    );
  }

  onClose() {
    this.close.emit();
  }
}
