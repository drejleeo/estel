import { Component, OnInit } from '@angular/core';
import { Parking } from '../_models/parking';
import { ParkingService } from '../_services/parking.service';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';

@Component({
  selector: 'app-parkings',
  templateUrl: './parkings.component.html',
  styleUrls: ['./parkings.component.scss']
})
export class ParkingsComponent implements OnInit {

  stations: Parking[];
  centerLatitude = 10.910635;
  centerLongitude = -26.963320;
  // appearence = Appearance.OUTLINE;

  constructor(
    private parkService: ParkingService
  ) { }

  ngOnInit() {
    this.getStations();
    try {
      this.centerLatitude = this.stations[0].location.latitude;
      this.centerLongitude = this.stations[0].location.longitude;
    } catch (indexError) {
      console.log(indexError);
    }
  }

  recenterMap(newLatitude, newLongitude) {
    this.centerLatitude = newLatitude;
    this.centerLongitude = newLongitude;
  }


  getStations() {
    this.parkService.getParkings()
    .subscribe(
      data => {
        this.stations = data.results;
      }
    );
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.centerLatitude = location.latitude;
    this.centerLongitude = location.longitude;
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
