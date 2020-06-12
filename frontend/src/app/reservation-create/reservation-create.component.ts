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

    this.parkingServ.getParkings({is_full: true})
      .subscribe(
        res => {
          console.log(res);
          this.availableParkings = res.results;
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
    term = term.toLocaleLowerCase();
    return (item.location.country.toLocaleLowerCase().indexOf(term) || item.location.region.toLocaleLowerCase().indexOf(term)) > -1 ||
     (item.location.country.toLocaleLowerCase().includes(term) || item.location.region.toLocaleLowerCase().includes(term));
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
