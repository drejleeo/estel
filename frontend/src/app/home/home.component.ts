import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../_services/companies.service';
import { Company } from '../_models/company';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  limitSuggestedComp = 5;
  offset = 0;
  suggestedCompanies: Company[];

  constructor(private compService: CompaniesService) { }

  ngOnInit() {
    this.getSuggestedCompanies(this.limitSuggestedComp, this.offset);
  }

  getSuggestedCompanies(limit, offset) {
    this.compService.getCompanies({limit, offset})
    .subscribe(
      data => {
        this.suggestedCompanies = data['results'];
      }
    );
  }

}
