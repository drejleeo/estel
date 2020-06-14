import { Component, OnInit, Injectable } from '@angular/core';
import { ReservationService } from '../_services/reservation.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ParkingService } from '../_services/parking.service';
import { Parking } from '../_models/parking';
import { MatSnackBar } from '@angular/material';
import { NgbTimeAdapter, NgbTimeStruct, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';


const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;
@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {
  fromModel(value: string| null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }


  toModel(time: NgbTimeStruct | null): string | null {
    return time != null ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : '';
  }
}


@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css'],
  providers: [
    {provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class ReservationCreateComponent implements OnInit {

  reservForm: FormGroup;
  isLoadingResults = true;
  availableParkings: Parking[];
  date: '0000-00-00';
  time = '00:00:00';

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
      regime: ['', Validators.required],
    });

    this.parkingServ.getParkings()
      .subscribe(
        res => {
          // Filter results so that we get only available parkings
          this.availableParkings = res.results;
          for(let i=0; i<this.availableParkings.length; i++) {
            if (this.availableParkings[i].is_full) {
              this.availableParkings.splice(i, 1);
            }
          }
        }
      );
  }

  onFormSubmit(formData: NgForm) {
    formData.start_date = `${this.date}T${this.time}.000Z`;
    this.isLoadingResults = true;
    this.resService.addReservation(formData).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(['/reservations']);
        this.snackBarRef.open('Reservation created');
      },
      err => {
        this.snackBarRef.open('Something went wrong! Please review your details.');
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
