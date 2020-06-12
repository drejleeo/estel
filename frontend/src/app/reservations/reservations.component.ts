import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../_services/reservation.service';
import { ReservationPublic } from '../_models/reservation';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  public displayedColumns: string[] = ['position', 'address', 'spot', 'start_date', 'duration', 'company', 'created_on'];
  public myRes: ReservationPublic[];

  public dataSource = new MatTableDataSource<ReservationPublic>(this.myRes);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private reservationService: ReservationService,
  ) { }

  ngOnInit() {
    this.getReservations();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getReservations(): void {
    this.reservationService.getReservations()
    .subscribe(
      res => {
        this.dataSource.data = res.results as ReservationPublic[];
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

