import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { CurrencyConverterComponent } from '../currency-converter/container/currency-converter.component';
import { HomeComponent } from '../core/components/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'currency-converter',
    loadChildren: () =>
      import('../currency-converter/currency-converter.module').then(
        m => m.CurrencyConverterModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
