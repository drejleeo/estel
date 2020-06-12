import { JwtInterceptor } from './_interceptors/wt.interceptor';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { COMPONENTS } from './zz-imports/components';
import { FORMS } from './zz-imports/forms';
import { BROWSER_ANIMATIONS } from './zz-imports/http-animations';
import { MAT_MODULES, IGX_MODULES } from './zz-imports/material-modules';
import { API_KEY } from './zz-imports/agmkey';

import { AppRoutingModule } from './app-routing.module';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmCoreModule } from '@agm/core';
import { AgmOverlays } from 'agm-overlays';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { TimeagoModule } from 'ngx-timeago';


@NgModule({
  declarations: [ AppComponent, COMPONENTS ],
  imports: [
    // Material
    MAT_MODULES, IGX_MODULES,
    FORMS,
    BROWSER_ANIMATIONS,
    FontAwesomeModule,
    AppRoutingModule,

    // Timeago
    TimeagoModule.forRoot(),

    // Google maps
    AgmJsMarkerClustererModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: API_KEY,
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
  ],
  bootstrap: [ AppComponent, ]
})
export class AppModule {
}
