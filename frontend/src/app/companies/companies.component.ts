import { Component, OnInit, Pipe } from '@angular/core';
import { Company } from '../_models/company';
import { CompaniesService } from '../_services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  companies: Company[];
  maximumLength = 80;
  width = 180;
  height = 180;
  buttons = ['Read more'];

  constructor(private compService: CompaniesService) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.compService.getCompanies()
    .subscribe(
      data => {
        this.companies = data['results'];
      }
    );
  }

  truncate(text) {
    if (text.length > this.maximumLength) {
      return `${text.slice(0, this.maximumLength)}...`;
    } else {
      return text;
    }
  }
}
