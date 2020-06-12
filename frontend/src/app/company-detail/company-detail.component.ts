import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../_services/companies.service';
import { Company } from '../_models/company';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  company = new Company();

  constructor(
    private compService: CompaniesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.compService.getCompany(this.route.snapshot.params['id']).subscribe(
      data => (this.company = data)
    );
  };

}
