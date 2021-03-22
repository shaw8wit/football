import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/global/search.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    console.log(this.searchService.teamInfo);
    // add subscription
  }

}
