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
  exceptions = ['Fouls', 'Offsides', 'Yellow Cards', 'Red Cards']

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.fetchFixtureStats(this.fixtureId).subscribe(
      responseBody => {
        this.team1 = responseBody['response'][0];
        this.team2 = responseBody['response'][1];
      }
    );
  }

  comp(i: number, type1: boolean): string {
    if (this.team1.statistics[i].value === this.team2.statistics[i].value) return 'is-dark';
    let original_comparison = this.team1.statistics[i].value > this.team2.statistics[i].value;
    if (this.exceptions.includes(this.team1.statistics[i].type)) original_comparison = !original_comparison;
    if (original_comparison && type1 || !original_comparison && !type1) return 'is-success';
    return 'is-warning';
  }

  onClose() {
    this.close.emit();
  }
}
