import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatDatepickerModule, MatSortModule, MatTableModule,
  MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatNativeDateModule, MatCheckboxModule,
  MatSidenavModule, MatSnackBarModule, MatTabsModule,
} from '@angular/material';
import {
  IgxAvatarModule, IgxButtonModule, IgxIconModule, IgxCardModule, IgxDividerModule, IgxRippleModule, IgxChipsModule,
  IgxSliderModule, IgxListModule, IgxExpansionPanelModule,
} from 'igniteui-angular';
import { NgSelectModule } from '@ng-select/ng-select';


export const MAT_MODULES = [
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatDatepickerModule, MatSortModule, MatTableModule,
  MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatNativeDateModule, MatCheckboxModule,
  MDBBootstrapModule, NgSelectModule, MatSidenavModule, MatSortModule, MatSnackBarModule, MatTabsModule,
];
export const IGX_MODULES = [
  IgxAvatarModule, IgxButtonModule, IgxIconModule, IgxCardModule, IgxDividerModule, IgxRippleModule, IgxChipsModule,
  IgxSliderModule, IgxListModule, IgxExpansionPanelModule
];
