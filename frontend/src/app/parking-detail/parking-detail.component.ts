import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../_services/parking.service';
import { Parking } from '../_models/parking';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parking-detail',
  templateUrl: './parking-detail.component.html',
  styleUrls: ['./parking-detail.component.css']
})
export class ParkingDetailComponent implements OnInit {
  parking: Parking;

  constructor(
    private parkService: ParkingService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getSelectedParking(id);
  }

  getSelectedParking(id): void {
    this.parkService.getOneParking(id)
    .subscribe(
      park => {
        this.parking = park;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

}
