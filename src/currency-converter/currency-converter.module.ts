import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { CurrencyConverterComponent } from './container/currency-converter.component';
import { ConversionComponent } from './components/conversion/conversion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { currencyConverterReducer } from './reducers/currency-converter.reducer';
import { CurrencyConverterEffects } from './effetcs/currency-converter.effects';

const currencyRoutes: Routes = [
  { path: '', redirectTo: '/currency-converter/conversion', pathMatch: 'full' },
  { path: 'conversion', component: CurrencyConverterComponent },
  { path: 'disclaimer', component: CurrencyConverterComponent }
];
@NgModule({
  declarations: [
    CurrencyConverterComponent,
    ConversionComponent,
    DisclaimerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(currencyRoutes),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('currencyConverter', currencyConverterReducer),
    EffectsModule.forFeature([CurrencyConverterEffects])
  ]
})
export class CurrencyConverterModule {}
