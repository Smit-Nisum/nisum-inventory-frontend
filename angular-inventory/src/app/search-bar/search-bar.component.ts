import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/shared/services/search.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  filterText = '';
  category = '';
  selectedValue = 'all';
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  handleChange(event: any) {
    this.searchService.setSearchText(event.target.value);

    // console.log(this.searchService.getSearchText());
  }

  handleDropdown(event: any) {
    this.searchService.setCategory(event.target.value);
    console.log(event.target.value);
  }
}
