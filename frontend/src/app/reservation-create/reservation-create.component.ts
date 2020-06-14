import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../_services/reservation.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ParkingService } from '../_services/parking.service';
import { Parking } from '../_models/parking';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent implements OnInit {

  reservForm: FormGroup;
  isLoadingResults = true;
  availableParkings: Parking[];

  constructor(
    private resService: ReservationService,
    private parkingServ: ParkingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBarRef: MatSnackBar,
  ) { }

  ngOnInit() {
    this.reservForm = this.formBuilder.group({
      parking: ['', Validators.required],
      description: [''],
      start_date: ['', Validators.required],
      start_time: ['', Validators.required],
      regime: ['', Validators.required],
    });

    this.parkingServ.getParkings()
      .subscribe(
        res => {
          // Filter results so that we get only available parkings
          this.availableParkings = res.results;
          for(let i=0; i<this.availableParkings.length; i++) {
            console.log(this.availableParkings[i].is_full);
            if (this.availableParkings[i].is_full) {
              this.availableParkings.splice(i, 1);
            }
          }
          console.log(this.availableParkings);
        }
      );
  }

  onFormSubmit(formData: NgForm) {
    this.isLoadingResults = true;
    this.resService.addReservation(formData).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(['/reservations']);
        this.snackBarRef.open('Reservation created');
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  searchf(term: string, item: any) {
    term = term.toLowerCase();
    return !item.is_full && (
      item.location.country.toLowerCase().indexOf(term) > -1 ||
      item.location.region.toLowerCase().indexOf(term) > -1 ||
      item.location.country.toLowerCase().includes(term) ||
      item.location.region.toLowerCase().includes(term)
    );
  }

  getRegion(item: any) {
    return item.location.region;
  }

  getBadgeClass(station) {
    const percentage = station.available_spots * 100 / station.total_spots;
    if (percentage > 30) {
      return 'badge badge-success';
    } else if (percentage !== 0) {
      return 'badge badge-warning';
    } else {
      return 'badge badge-danger';
    }
  }
}
