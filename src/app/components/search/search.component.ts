import { Component, OnInit, Input } from '@angular/core';
import { StateService } from '../../services/state.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() search;
  private search_image_src: string;

  constructor(private stateService: StateService, 
    private searchService: SearchService) 
  { }

  ngOnInit() {
    this.search_image_src = "../../../../assets/images/profile.jpg"
  }

  goProfile() {
    this.searchService.clear();
    this.stateService.go(`u/${this.search.userId}`)
  }

}
